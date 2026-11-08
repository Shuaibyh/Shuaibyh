#!/usr/bin/env node
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
const excluded = new Set(['.git', 'node_modules', 'dist', 'build']);

async function markdownFiles(directory, output = []) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, item.name);
    if (item.isDirectory() && !excluded.has(item.name)) {
      await markdownFiles(fullPath, output);
    } else if (item.isFile() && item.name.toLowerCase().endsWith('.md')) {
      output.push(fullPath);
    }
  }
  return output.sort();
}

function readableLines(source) {
  const noComments = source.replace(/<!--[\s\S]*?-->/g, match => match.replace(/[^\n]/g, ''));
  let fence = null;
  return noComments.split('\n').map(line => {
    const match = line.match(/^ {0,3}(\x60{3,}|~{3,})/);
    if (match) {
      const mark = match[1];
      if (!fence) fence = { char: mark[0], length: mark.length };
      else if (mark[0] === fence.char && mark.length >= fence.length) fence = null;
      return '';
    }
    return fence ? '' : line;
  });
}

function extractLinks(source) {
  const result = [];
  for (const [index, line] of readableLines(source).entries()) {
    const withoutInlineCode = line.replace(/\x60+[^\x60]*\x60+/g, '');
    for (const match of withoutInlineCode.matchAll(/!?\[[^\]]*\]\((?:<([^>]+)>|([^\s)]+))(?:\s+['"][^'"]*['"])?\)/g)) {
      result.push({ target: match[1] || match[2], line: index + 1 });
    }
    for (const match of withoutInlineCode.matchAll(/\b(?:href|src)\s*=\s*['"]([^'"]+)['"]/g)) {
      result.push({ target: match[1], line: index + 1 });
    }
  }
  return result;
}

export function githubSlug(text) {
  const plain = text
    .replace(/!?\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\x60/g, '')
    .replace(/[*_~]/g, '')
    .toLowerCase();
  return plain.replace(/[^\p{L}\p{N}\p{M}\s-]/gu, '').trim().replace(/\s/g, '-');
}

function headingAnchors(source) {
  const lines = readableLines(source);
  const anchors = new Set();
  const occurrences = new Map();
  function addHeading(heading) {
    const base = githubSlug(heading);
    if (!base) return;
    const seen = occurrences.get(base) || 0;
    occurrences.set(base, seen + 1);
    anchors.add(seen ? base + '-' + seen : base);
  }
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const heading = line.match(/^ {0,3}#{1,6}[ \t]+(.+?)[ \t]*#*[ \t]*$/);
    if (heading) addHeading(heading[1]);
    else if (i + 1 < lines.length && line.trim() && /^ {0,3}(?:={3,}|-{3,})\s*$/.test(lines[i + 1])) {
      addHeading(line.trim());
    }
    for (const match of line.matchAll(/<(?:[a-z][\w:-]*)(?:\s+[^>]*?)?\s(?:id|name)\s*=\s*['"]([^'"]+)['"][^>]*>/gi)) {
      anchors.add(match[1]);
    }
  }
  return anchors;
}

function localAnchorPath(sourceFile, url, root) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(url)) return null;
  const hashIndex = url.indexOf('#');
  if (hashIndex < 0 || hashIndex === url.length - 1) return null;
  const before = url.slice(0, hashIndex).split('?')[0];
  let filename;
  let anchor;
  try {
    filename = decodeURIComponent(before);
    anchor = decodeURIComponent(url.slice(hashIndex + 1));
  } catch {
    return { error: 'fragmento URL mal codificado' };
  }
  if (!anchor) return null;
  if (filename && !filename.toLowerCase().endsWith('.md')) return null;
  const targetFile = filename
    ? path.resolve(filename.startsWith('/') ? root : path.dirname(sourceFile), filename.replace(/^\/+/, ''))
    : sourceFile;
  const relative = path.relative(root, targetFile);
  if (relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) {
    return { error: 'ruta fuera del repositorio' };
  }
  return { targetFile, anchor };
}

export async function validateAnchors(root = defaultRoot) {
  const directory = path.resolve(root);
  const files = await markdownFiles(directory);
  const cache = new Map();
  const errors = [];
  let checked = 0;
  for (const file of files) {
    for (const { target, line } of extractLinks(await readFile(file, 'utf8'))) {
      const resolved = localAnchorPath(file, target, directory);
      if (!resolved) continue;
      const label = path.relative(directory, file) + ':' + line;
      if (resolved.error) {
        errors.push(label + ': ' + resolved.error + ': ' + target);
        continue;
      }
      let anchors = cache.get(resolved.targetFile);
      if (!anchors) {
        try {
          if (!(await stat(resolved.targetFile)).isFile()) continue;
          anchors = headingAnchors(await readFile(resolved.targetFile, 'utf8'));
          cache.set(resolved.targetFile, anchors);
        } catch {
          continue; // Missing local files are covered by check-markdown-links.mjs.
        }
      }
      checked += 1;
      if (!anchors.has(resolved.anchor)) {
        errors.push(label + ': sección no encontrada: ' + target);
      }
    }
  }
  return { errors, checked, files: files.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  validateAnchors(process.env.DOCS_ROOT || defaultRoot).then(result => {
    if (result.errors.length) {
      console.error(result.errors.join('\n'));
      process.exitCode = 1;
    } else {
      console.log('Anclas locales correctas: ' + result.checked + '; archivos Markdown: ' + result.files + '.');
      console.log('No se comprueban enlaces externos, referencias indirectas ni archivos no Markdown.');
    }
  }).catch(error => {
    console.error('Error comprobando anclas: ' + error.message);
    process.exitCode = 1;
  });
}
