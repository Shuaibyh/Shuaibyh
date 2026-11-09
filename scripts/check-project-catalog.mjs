#!/usr/bin/env node
import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const statuses = new Set(['developing', 'prototype', 'public-demo']);

function isHttpsUrl(value, host) {
  if (typeof value !== 'string') return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' && !parsed.username && !parsed.password &&
      Boolean(parsed.hostname) && (!host || parsed.hostname === host);
  } catch {
    return false;
  }
}

export function validateCatalog(data) {
  const issues = [];
  if (!data || typeof data !== 'object' || Array.isArray(data)) return ['La raíz debe ser un objeto JSON.'];
  if (data.schema_version !== 1) issues.push('schema_version debe ser 1.');
  if (!Array.isArray(data.projects) || data.projects.length === 0) {
    issues.push('projects debe ser una lista no vacía.');
    return issues;
  }

  const seenIds = new Set();
  const seenRepos = new Set();
  const seenCases = new Set();
  for (const [index, project] of data.projects.entries()) {
    const prefix = `projects[${index}]`;
    if (!project || typeof project !== 'object' || Array.isArray(project)) {
      issues.push(`${prefix} debe ser un objeto.`);
      continue;
    }
    if (typeof project.id !== 'string' || !/^[a-z][a-z0-9-]*$/.test(project.id)) {
      issues.push(`${prefix}.id no es un slug válido.`);
    } else if (seenIds.has(project.id)) {
      issues.push(`${prefix}.id está duplicado: ${project.id}.`);
    } else {
      seenIds.add(project.id);
    }
    for (const field of ['name', 'summary']) {
      if (typeof project[field] !== 'string' || !project[field].trim()) {
        issues.push(`${prefix}.${field} debe contener texto.`);
      }
    }
    if (!statuses.has(project.status)) issues.push(`${prefix}.status es desconocido.`);

    if (!isHttpsUrl(project.repository, 'github.com') ||
      !/^https:\/\/github\.com\/Shuaibyh\/[A-Za-z0-9._-]+\/?$/.test(project.repository)) {
      issues.push(`${prefix}.repository debe ser un repositorio HTTPS de Shuaibyh.`);
    } else if (seenRepos.has(project.repository.replace(/\/$/, ''))) {
      issues.push(`${prefix}.repository está duplicado.`);
    } else {
      seenRepos.add(project.repository.replace(/\/$/, ''));
    }

    if (project.demo !== null && !isHttpsUrl(project.demo)) {
      issues.push(`${prefix}.demo debe ser HTTPS o null.`);
    }
    if (project.status === 'public-demo' && project.demo === null) {
      issues.push(`${prefix}.demo es obligatorio para public-demo.`);
    }
    if (typeof project.case_study !== 'string' ||
      !/^casos\/[A-Za-z0-9-]+\.md$/.test(project.case_study)) {
      issues.push(`${prefix}.case_study debe apuntar a casos/*.md sin rutas ascendentes.`);
    } else if (seenCases.has(project.case_study)) {
      issues.push(`${prefix}.case_study está duplicado.`);
    } else {
      seenCases.add(project.case_study);
    }

    if (!Array.isArray(project.technologies) || project.technologies.length === 0 ||
      project.technologies.some(value => typeof value !== 'string' || !value.trim())) {
      issues.push(`${prefix}.technologies debe contener nombres válidos.`);
    } else if (new Set(project.technologies.map(x => x.trim().toLowerCase())).size !== project.technologies.length) {
      issues.push(`${prefix}.technologies contiene duplicados.`);
    }

    if (!Array.isArray(project.evidence) || project.evidence.length === 0 ||
      project.evidence.some(url => !isHttpsUrl(url, 'github.com') ||
        !url.startsWith((typeof project.repository === 'string' ? project.repository.replace(/\/$/, '') : '') + '/'))) {
      issues.push(`${prefix}.evidence requiere enlaces HTTPS de GitHub verificables manualmente.`);
    }
  }
  return issues;
}

export async function checkCatalog(catalogFile = path.join(root, 'data', 'projects.json'), baseDir = root) {
  const data = JSON.parse(await readFile(catalogFile, 'utf8'));
  const errors = validateCatalog(data);
  if (errors.length) return { errors, count: 0 };
  for (const project of data.projects) {
    const file = path.join(baseDir, project.case_study);
    try {
      await access(file, constants.R_OK);
    } catch {
      errors.push(`Falta el estudio de caso de ${project.id}: ${project.case_study}`);
    }
  }
  return { errors, count: data.projects.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = await checkCatalog();
    if (result.errors.length) {
      console.error(`Catálogo inválido:\n${result.errors.map(x => '- ' + x).join('\n')}`);
      process.exitCode = 1;
    } else {
      console.log(`Catálogo válido: ${result.count} proyectos y estudios de caso locales existentes.`);
      console.log('La verificación es estática: no comprueba la disponibilidad de URLs remotas.');
    }
  } catch (error) {
    console.error(`Error al verificar el catálogo: ${error.message}`);
    process.exitCode = 1;
  }
}
