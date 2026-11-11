#!/usr/bin/env node
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const requiredIds = ['proyectos', 'catalog', 'count', 'query', 'status', 'technology', 'sort', 'reset', 'empty', 'error'];

export function inspectSiteHtml(html) {
  const issues = [];
  if (!/^\s*<!doctype html>/i.test(html)) issues.push('Falta el doctype HTML.');
  if (!/<html\b[^>]*\blang=["']es["']/i.test(html)) issues.push('Falta idioma español en html.');
  if (!/<meta\b[^>]*\bname=["']viewport["']/i.test(html)) issues.push('Falta viewport responsive.');
  if (!/<main\b/i.test(html) || !/<h1\b/i.test(html)) issues.push('Falta región main o título h1.');
  if (!/class=["']skip-link["']/.test(html)) issues.push('Falta enlace para saltar al contenido.');
  if (/<script\b(?![^>]*\bsrc=)[^>]*>/i.test(html)) issues.push('No usar scripts inline.');
  if (/<script\b[^>]*\bsrc=["']https?:\/\//i.test(html)) issues.push('No cargar scripts de terceros.');
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(x => x[1]);
  for (const id of requiredIds) if (!ids.includes(id)) issues.push('Falta el identificador #' + id + '.');
  if (new Set(ids).size !== ids.length) issues.push('Existen identificadores HTML duplicados.');
  for (const match of html.matchAll(/<label\b[^>]*\bfor=["']([^"']+)["']/g)) {
    if (!ids.includes(match[1])) issues.push('Label sin control relacionado: ' + match[1] + '.');
  }
  return issues;
}

export async function checkSite(directory = root) {
  const html = await readFile(path.join(directory, 'web/index.html'), 'utf8');
  const issues = inspectSiteHtml(html);
  const assets = ['web/styles.css', 'web/app.mjs', 'web/project-search.mjs', 'web/project-view.mjs', 'data/projects.json'];
  for (const file of assets) {
    try {
      if (!(await stat(path.join(directory, file))).isFile()) issues.push('No es archivo: ' + file);
    } catch {
      issues.push('Falta recurso: ' + file);
    }
  }
  return issues;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  checkSite(process.env.DOCS_ROOT || root).then(issues => {
    if (issues.length) {
      console.error(issues.join('\n'));
      process.exitCode = 1;
    } else {
      console.log('Estructura y recursos de la vista web verificados.');
    }
  }).catch(error => {
    console.error('Error de verificación de la vista:', error.message);
    process.exitCode = 1;
  });
}
