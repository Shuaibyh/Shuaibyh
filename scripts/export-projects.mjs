#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toCsv, toMarkdown, toPublicJson } from './lib/project-format.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
export const formats = Object.freeze({ csv: toCsv, md: toMarkdown, json: toPublicJson });

export function parseOptions(args) {
  if (args.length === 1 && args[0] === '--help') return { help: true };
  if (args.length === 0) return { format: 'csv' };
  if (args.length !== 2 || args[0] !== '--format' || !Object.hasOwn(formats, args[1])) {
    throw new Error('Uso: node scripts/export-projects.mjs [--format csv|md|json]');
  }
  return { format: args[1] };
}

export async function exportProjects(args, file = path.join(root, 'data', 'projects.json')) {
  const options = parseOptions(args);
  if (options.help) return 'Uso: node scripts/export-projects.mjs [--format csv|md|json]\n';
  const data = JSON.parse(await readFile(file, 'utf8'));
  return formats[options.format](data);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  exportProjects(process.argv.slice(2)).then(output => process.stdout.write(output)).catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
