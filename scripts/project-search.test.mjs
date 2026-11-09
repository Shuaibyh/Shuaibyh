import assert from 'node:assert/strict';
import test from 'node:test';
import { filterProjects, normalizeQuery, statusLabel } from './project-search.mjs';

const projects = [
  { name: 'AULIGMA', summary: 'Matemática con docentes', status: 'developing', technologies: ['React', 'SymPy'] },
  { name: 'Ensamble PC', summary: 'Visualización 3D', status: 'public-demo', technologies: ['Three.js'] },
  { name: 'Academia José', summary: 'Gestión académica', status: 'prototype', technologies: ['Java', 'PostgreSQL'] },
];

test('busca por nombre y tecnología ignorando tildes', () => {
  assert.equal(normalizeQuery('  MATEMÁTICA  '), 'matematica');
  assert.deepEqual(filterProjects(projects, { query: 'MATEMatica' }).map(p => p.name), ['AULIGMA']);
  assert.deepEqual(filterProjects(projects, { query: 'three.js' }).map(p => p.name), ['Ensamble PC']);
  assert.deepEqual(filterProjects(projects, { query: 'Jose' }).map(p => p.name), ['Academia José']);
});

test('filtra por estado sin modificar el catálogo original', () => {
  const result = filterProjects(projects, { status: 'public-demo' });
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Ensamble PC');
  assert.equal(projects.length, 3);
});

test('combina búsqueda y estado y permite resetear', () => {
  assert.equal(filterProjects(projects, { query: 'react', status: 'prototype' }).length, 0);
  assert.equal(filterProjects(projects, { query: '', status: 'all' }).length, 3);
});

test('traduce estados y utiliza fallback para estados desconocidos', () => {
  assert.equal(statusLabel('public-demo'), 'Demostración pública');
  assert.equal(statusLabel('unknown'), 'Estado por confirmar');
});
