import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { validateCatalog, checkCatalog } from './check-project-catalog.mjs';

function validData() {
  return {
    schema_version: 1,
    projects: [{
      id: 'ejemplo',
      name: 'Proyecto ejemplo',
      repository: 'https://github.com/Shuaibyh/ejemplo',
      status: 'prototype',
      summary: 'Ejemplo sintético para probar reglas.',
      technologies: ['React', 'TypeScript'],
      demo: null,
      case_study: 'casos/EJEMPLO.md',
      evidence: ['https://github.com/Shuaibyh/ejemplo/blob/main/README.md'],
    }],
  };
}

function errorsAfter(change) {
  const data = validData();
  change(data);
  return validateCatalog(data);
}

test('acepta un catálogo válido con datos sintéticos', () => {
  assert.deepEqual(validateCatalog(validData()), []);
});

test('rechaza versiones desconocidas y catálogos vacíos', () => {
  assert.match(errorsAfter(d => { d.schema_version = 2; }).join(' '), /schema_version/);
  assert.match(errorsAfter(d => { d.projects = []; }).join(' '), /no vacía/);
});

test('detecta identificadores duplicados', () => {
  assert.match(errorsAfter(d => { d.projects.push({ ...d.projects[0] }); }).join(' '), /id está duplicado/);
});

test('detecta repositorios duplicados aunque se escriba barra final', () => {
  assert.match(errorsAfter(d => {
    d.projects.push({ ...d.projects[0], id: 'otro', repository: d.projects[0].repository + '/' });
  }).join(' '), /repository está duplicado/);
});

test('rechaza repositorios ajenos a Shuaibyh', () => {
  assert.match(errorsAfter(d => {
    d.projects[0].repository = 'https://github.com/otra-cuenta/ejemplo';
  }).join(' '), /repositorio HTTPS/);
});

test('exige un enlace HTTPS para las demos públicas', () => {
  assert.match(errorsAfter(d => {
    d.projects[0].status = 'public-demo';
  }).join(' '), /demo es obligatorio/);
  assert.match(errorsAfter(d => {
    d.projects[0].demo = 'http://example.org/';
  }).join(' '), /demo debe ser HTTPS/);
});

test('rechaza un estado desconocido y etiquetas técnicas duplicadas', () => {
  assert.match(errorsAfter(d => {
    d.projects[0].status = 'production-ready';
    d.projects[0].technologies.push('react');
  }).join(' '), /status es desconocido/);
  assert.match(errorsAfter(d => {
    d.projects[0].technologies.push('react');
  }).join(' '), /technologies contiene duplicados/);
});

test('impide rutas ascendentes o casos fuera de la carpeta esperada', () => {
  assert.match(errorsAfter(d => {
    d.projects[0].case_study = '../privado.md';
  }).join(' '), /case_study/);
});

test('requiere evidencia de GitHub', () => {
  assert.match(errorsAfter(d => {
    d.projects[0].evidence = ['https://example.org/prueba'];
  }).join(' '), /evidence/);
});

test('comprueba que el estudio de caso existe en disco', async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'portfolio-catalog-'));
  try {
    const file = path.join(dir, 'projects.json');
    await writeFile(file, JSON.stringify(validData()));
    const missing = await checkCatalog(file, dir);
    assert.match(missing.errors.join(' '), /Falta el estudio de caso/);
    await mkdir(path.join(dir, 'casos'));
    await writeFile(path.join(dir, 'casos', 'EJEMPLO.md'), '# Ejemplo\n');
    const ready = await checkCatalog(file, dir);
    assert.deepEqual(ready, { errors: [], count: 1 });
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('rechaza casos de estudio compartidos sin querer entre proyectos distintos', () => {
  const findings = errorsAfter(d => {
    d.projects.push({
      ...d.projects[0],
      id: 'segundo',
      repository: 'https://github.com/Shuaibyh/segundo',
      evidence: ['https://github.com/Shuaibyh/segundo/blob/main/README.md'],
    });
  });
  assert.match(findings.join(' '), /case_study está duplicado/);
});

test('impide que la evidencia apunte por error a otro repositorio', () => {
  const findings = errorsAfter(d => {
    d.projects[0].evidence = ['https://github.com/Shuaibyh/otro-proyecto/blob/main/README.md'];
  });
  assert.match(findings.join(' '), /evidence/);
});
