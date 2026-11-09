#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

export function projectStats(catalog) {
  if (!Array.isArray(catalog?.projects)) throw new TypeError('El catálogo requiere projects.');
  const statuses = new Map();
  const technologies = new Map();
  let demos = 0;
  for (const project of catalog.projects) {
    statuses.set(project.status, (statuses.get(project.status) ?? 0) + 1);
    if (project.demo) demos += 1;
    for (const technology of new Set(project.technologies ?? [])) {
      technologies.set(technology, (technologies.get(technology) ?? 0) + 1);
    }
  }
  return {
    total: catalog.projects.length,
    demos,
    statuses: [...statuses].sort(([a], [b]) => a.localeCompare(b, 'es'))
      .map(([name, count]) => ({ name, count })),
    technologies: [...technologies].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'es'))
      .map(([name, count]) => ({ name, count })),
  };
}

export function formatStats(stats) {
  const lines = [
    'Resumen del portafolio',
    'Proyectos: ' + stats.total,
    'Demos enlazadas: ' + stats.demos,
    'Estados:',
    ...stats.statuses.map(entry => '  ' + entry.name + ': ' + entry.count),
    'Tecnologías por número de proyectos:',
    ...stats.technologies.map(entry => '  ' + entry.name + ': ' + entry.count),
  ];
  return lines.join('\n') + '\n';
}

export async function reportPortfolio(filename = path.join(root, 'data', 'projects.json')) {
  const catalog = JSON.parse(await readFile(filename, 'utf8'));
  return formatStats(projectStats(catalog));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  reportPortfolio().then(output => process.stdout.write(output)).catch(error => {
    console.error('No se pudo generar el resumen:', error.message);
    process.exitCode = 1;
  });
}
