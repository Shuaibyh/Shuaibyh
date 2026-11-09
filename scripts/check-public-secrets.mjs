#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const skippedDirectories = new Set(['.git', 'node_modules', 'dist', 'build', 'coverage']);

const rules = [
  { name: 'GitHub personal access token clásico', pattern: /\bghp_[A-Za-z0-9]{36}\b/g },
  { name: 'GitHub fine-grained token', pattern: /\bgithub_pat_[A-Za-z0-9_]{40,}\b/g },
  { name: 'GitLab access token', pattern: /\bglpat-[A-Za-z0-9_-]{20,}\b/g },
  { name: 'AWS access key ID', pattern: /\bAKIA[0-9A-Z]{16}\b/g },
  { name: 'Google API key', pattern: /\bAIza[0-9A-Za-z_-]{35}\b/g },
  { name: 'Bloque de clave privada', pattern: /-----BEGIN (?:RSA |EC |OPENSSH |ENCRYPTED )?PRIVATE KEY-----/g },
];

export function detectSensitiveContent(source, filename = 'archivo') {
  const findings = [];
  for (const rule of rules) {
    for (const match of source.matchAll(rule.pattern)) {
      const line = source.slice(0, match.index).split('\n').length;
      findings.push(filename + ':' + line + ': posible secreto: ' + rule.name + '.');
    }
  }
  return findings.sort();
}

async function collect(directory, output = []) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, item.name);
    if (item.isDirectory() && !skippedDirectories.has(item.name)) await collect(filename, output);
    else if (item.isFile() && /\.(?:md|json|ya?ml)$/i.test(item.name)) output.push(filename);
  }
  return output.sort();
}

export async function checkSensitiveContent(directory = root) {
  const base = path.resolve(directory);
  const findings = [];
  let checked = 0;
  for (const filename of await collect(base)) {
    findings.push(...detectSensitiveContent(await readFile(filename, 'utf8'), path.relative(base, filename)));
    checked += 1;
  }
  return { checked, findings };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  checkSensitiveContent(process.env.DOCS_ROOT || root).then(result => {
    if (result.findings.length) {
      console.error(result.findings.join('\n'));
      process.exitCode = 1;
    } else {
      console.log('Patrones de secretos revisados en ' + result.checked + ' documentos públicos.');
      console.log('Esta revisión heurística no garantiza que todos los secretos se detecten.');
    }
  }).catch(error => {
    console.error('No se pudieron revisar los documentos:', error.message);
    process.exitCode = 1;
  });
}
