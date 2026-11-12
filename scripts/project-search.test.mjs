import assert from 'node:assert/strict';
import test from 'node:test';
import { filterProjects, normalizeQuery, statusLabel } from '../web/project-search.mjs';

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

test('combina tecnología y estado con criterios exactos', () => {
  assert.deepEqual(filterProjects(projects, {technology:'react',status:'developing'}).map(p=>p.name), ['AULIGMA']);
  assert.deepEqual(filterProjects(projects, {technology:'java',status:'public-demo'}), []);
  assert.deepEqual(filterProjects(projects, {query:'3d',technology:'three.js'}).map(p=>p.name), ['Ensamble PC']);
});

test('un filtro de tecnología desconocida no devuelve resultados', () => {
  assert.deepEqual(filterProjects(projects, {technology:'lenguaje-inexistente'}), []);
});

test('normaliza caracteres combinados y entradas nulas de búsqueda', () => {
  assert.equal(normalizeQuery('  Jose\u0301  '), 'jose');
  assert.equal(normalizeQuery(null), '');
  assert.equal(normalizeQuery(undefined), '');
  assert.equal(normalizeQuery(42), '42');
});
