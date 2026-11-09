#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

function section(text, name) {
  const marker = `## ${name}`;
  const start = text.indexOf(marker);
  if (start === -1) return '';
  const remainder = text.slice(start + marker.length);
  const end = remainder.search(/^## /m);
  return (end === -1 ? remainder : remainder.slice(0, end)).trim();
}

export function validatePortfolioSync(catalog, portfolioText) {
  const errors = [];
  if (!Array.isArray(catalog?.projects)) return ['El catálogo no contiene projects.'];
  const list = section(portfolioText, 'Proyectos seleccionados');
  const cases = section(portfolioText, 'Estudios de caso');
  if (!list) errors.push('Falta la sección Proyectos seleccionados.');
  if (!cases) errors.push('Falta la sección Estudios de caso.');

  const listings = [...list.matchAll(/^\|\s*\[([^\]]+)\]\((https:\/\/github\.com\/[^\s)]+)\)\s*\|/gm)];
  const listedRepositories = listings.map(x => x[2].replace(/\/$/, ''));
  const expectedRepositories = catalog.projects.map(x => x.repository?.replace(/\/$/, ''));
  for (const [i, project] of catalog.projects.entries()) {
    const repository = expectedRepositories[i];
    if (!listings.some(x => x[2].replace(/\/$/, '') === repository && x[1] === project.name)) {
      errors.push(`Proyecto ausente o con nombre distinto en el índice: ${project.id}.`);
    }
    if (!cases.includes(`]\(${project.case_study}\)`)) {
      errors.push(`Falta estudio de caso en la sección correspondiente: ${project.id}.`);
    }
  }

  for (const repository of listedRepositories) {
    if (!expectedRepositories.includes(repository)) errors.push(`Repositorio sin entrada de catálogo: ${repository}.`);
  }
  if (listedRepositories.length !== new Set(listedRepositories).size) {
    errors.push('Existen repositorios duplicados en Proyectos seleccionados.');
  }
  return errors;
}

export async function checkPortfolioSync(baseDir = root) {
  const [catalog, portfolio] = await Promise.all([
    readFile(path.join(baseDir, 'data', 'projects.json'), 'utf8'),
    readFile(path.join(baseDir, 'PORTAFOLIO.md'), 'utf8'),
  ]);
  return validatePortfolioSync(JSON.parse(catalog), portfolio);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  checkPortfolioSync(process.env.DOCS_ROOT || root).then(errors => {
    if (errors.length) {
      console.error(errors.join('\n'));
      process.exitCode = 1;
    } else {
      console.log('Índice, proyectos y estudios de caso coinciden con data/projects.json.');
    }
  }).catch(error => {
    console.error('No se pudo comprobar el portafolio:', error.message);
    process.exitCode = 1;
  });
}
