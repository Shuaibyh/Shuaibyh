#!/usr/bin/env node
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(
  process.env.DOCS_ROOT || fileURLToPath(new URL('../', import.meta.url)),
);
const excludedDirs = new Set(['.git', 'node_modules', 'dist', 'build']);

async function collectMarkdown(directory, output = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory() && !excludedDirs.has(entry.name)) {
      await collectMarkdown(full, output);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      output.push(full);
    }
  }
  return output;
}

function extractTargets(source) {
  const text = source.replace(/<!--[\s\S]*?-->/g, '');
  const links = [];
  let fenced = false;
  for (const [index, originalLine] of text.split('\n').entries()) {
    const line = originalLine.trimStart();
    if (/^(`{3,}|~{3,})/.test(line)) {
      fenced = !fenced;
      continue;
    }
    if (fenced) continue;
    const withoutInlineCode = originalLine.replace(/`[^`]*`/g, '');
    // Markdown inline links and images. External URLs are intentionally ignored.
    for (const match of withoutInlineCode.matchAll(/!?\[[^\]]*\]\((?:<([^>]+)>|([^\s)]+))(?:\s+['"][^'"]*['"])?\)/g)) {
      links.push({ target: match[1] || match[2], line: index + 1 });
    }
    // Handles links embedded in HTML, including the profile banner SVG.
    for (const match of withoutInlineCode.matchAll(/\b(?:href|src)\s*=\s*['"]([^'"]+)['"]/g)) {
      links.push({ target: match[1], line: index + 1 });
    }
  }
  return links;
}

function resolveLocalTarget(origin, target) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(target)) return null;
  const rawPath = target.split(/[?#]/, 1)[0];
  if (!rawPath) return null;
  let decoded;
  try {
    decoded = decodeURIComponent(rawPath);
  } catch {
    return { error: 'URL percent-encoding inválido' };
  }
  const full = decoded.startsWith('/')
    ? path.resolve(projectRoot, `.${decoded}`)
    : path.resolve(path.dirname(origin), decoded);
  const relative = path.relative(projectRoot, full);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    return { error: 'ruta fuera del repositorio' };
  }
  return { full };
}

async function main() {
  const markdownFiles = await collectMarkdown(projectRoot);
  const errors = [];
  let checked = 0;
  for (const file of markdownFiles) {
    const content = await readFile(file, 'utf8');
    for (const { target, line } of extractTargets(content)) {
      const destination = resolveLocalTarget(file, target);
      if (!destination) continue;
      checked += 1;
      if (destination.error) {
        errors.push(`${path.relative(projectRoot, file)}:${line}: ${destination.error}: ${target}`);
        continue;
      }
      try {
        await stat(destination.full);
      } catch {
        errors.push(`${path.relative(projectRoot, file)}:${line}: enlace local inexistente: ${target}`);
      }
    }
  }
  if (errors.length) {
    console.error(`Se encontraron ${errors.length} enlace(s) locales problemáticos:\n${errors.join('\n')}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Enlaces locales correctos: ${checked}; archivos Markdown revisados: ${markdownFiles.length}.`);
  console.log('No se comprueban enlaces externos ni anclas de sección.');
}

main().catch((error) => {
  console.error('No se pudo completar la revisión:', error.message);
  process.exitCode = 1;
});
