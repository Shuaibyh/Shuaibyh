import assert from 'node:assert/strict';
import test from 'node:test';
import { sortProjects, sortModes } from '../web/project-sort.mjs';

const entries = [
  { name: 'Zeta 2', status: 'prototype' },
  { name: 'Águila', status: 'public-demo' },
  { name: 'Zeta 10', status: 'prototype' },
  { name: 'Beta', status: 'developing' },
];
test('ordena usando español, tildes y números naturales', () => {
  assert.deepEqual(sortProjects(entries, 'name-asc').map(x => x.name), ['Águila', 'Beta', 'Zeta 2', 'Zeta 10']);
  assert.deepEqual(sortProjects(entries, 'name-desc').map(x => x.name), ['Zeta 10', 'Zeta 2', 'Beta', 'Águila']);
});
test('prioriza demostraciones y conserva orden dentro de cada estado', () => {
  assert.deepEqual(sortProjects(entries, 'status').map(x => x.name), ['Águila', 'Beta', 'Zeta 2', 'Zeta 10']);
});
test('no modifica el catálogo fuente ni falla por modo desconocido', () => {
  const original = [...entries];
  assert.deepEqual(sortProjects(entries, 'original'), original);
  assert.deepEqual(sortProjects(entries, 'x'), original);
  assert.deepEqual(entries, original);
  assert.ok(sortModes.includes('status'));
});
