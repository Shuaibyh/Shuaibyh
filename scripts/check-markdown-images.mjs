#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const ignored = new Set(['.git', 'node_modules', 'dist', 'build']);

function stripExamples(text) {
  const noComments = text.replace(/<!--[\s\S]*?-->/g, match => match.replace(/[^\n]/g, ' '));
  let fence = null;
  return noComments.split('\n').map(line => {
    const opening = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (opening) {
      if (!fence) fence = { character: opening[1][0], length: opening[1].length };
      else if (fence.character === opening[1][0] && opening[1].length >= fence.length) fence = null;
      return '';
    }
    return fence ? '' : line;
  });
}

export function imageAccessibilityIssues(text, filename = 'documento.md') {
  const issues = [];
  const lines = stripExamples(text);
  for (const [lineNumber, original] of lines.entries()) {
    const line = original.replace(/`+[^`]*`+/g, '');
    for (const match of line.matchAll(/!\[([^\]]*)\]\((?:<[^>]+>|[^)]+)\)/g)) {
      if (!match[1].trim()) issues.push(filename + ':' + (lineNumber + 1) + ': imagen Markdown sin texto alternativo.');
    }
    for (const match of line.matchAll(/<img\b[^>]*>/gi)) {
      const tag = match[0];
      const alt = tag.match(/\balt\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
      const decorative = /\b(?:role\s*=\s*["']presentation["']|aria-hidden\s*=\s*["']true["'])/i.test(tag);
      if (!alt) {
        issues.push(filename + ':' + (lineNumber + 1) + ': elemento img sin atributo alt.');
      } else if (!(alt[1] ?? alt[2]).trim() && !decorative) {
        issues.push(filename + ':' + (lineNumber + 1) + ': imagen HTML con alt vacío sin marcarse decorativa.');
      }
    }
  }
  return issues;
}

async function collect(dir, result = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && !ignored.has(entry.name)) await collect(path.join(dir, entry.name), result);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) result.push(path.join(dir, entry.name));
  }
  return result;
}

export async function checkImages(directory = root) {
  const base = path.resolve(directory);
  const issues = [];
  let checked = 0;
  for (const file of await collect(base)) {
    issues.push(...imageAccessibilityIssues(await readFile(file, 'utf8'), path.relative(base, file)));
    checked += 1;
  }
  return { issues, checked };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  checkImages(process.env.DOCS_ROOT || root).then(({ issues, checked }) => {
    if (issues.length) {
      console.error(issues.join('\n'));
      process.exitCode = 1;
    } else {
      console.log('Alternativas de imagen verificadas en ' + checked + ' documentos Markdown.');
    }
  }).catch(error => {
    console.error('Error verificando imágenes:', error.message);
    process.exitCode = 1;
  });
}
