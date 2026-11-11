import assert from 'node:assert/strict';
import test from 'node:test';
import { parseFilterUrl, buildFilterUrl } from '../web/filter-url.mjs';

test('convierte filtros en URLs y permite recuperarlos', () => {
  const location = buildFilterUrl('http://localhost:4173/?x=1#proyectos', {
    query: 'Matemáticas', status: 'developing', sort: 'name-asc',
  });
  assert.match(location, /x=1/);
  assert.match(location, /q=Matem/);
  assert.ok(location.endsWith('#proyectos'));
  assert.deepEqual(parseFilterUrl(location.split('?')[1].split('#')[0]), {
    query: 'Matemáticas', status: 'developing', sort: 'name-asc',
  });
});
test('ignora valores no admitidos y conserva otros parámetros', () => {
  assert.deepEqual(parseFilterUrl('?estado=admin&orden=random&q='), {query:'', status:'all', sort:'original'});
  const result = buildFilterUrl('http://localhost/?tracking=1&q=vieja', {query:'', status:'all', sort:'original'});
  assert.equal(result, '/?tracking=1');
});
test('limita la longitud de consulta para evitar URLs excesivas', () => {
  assert.equal(parseFilterUrl('?q=' + 'x'.repeat(500)).query.length, 120);
  assert.equal(buildFilterUrl('http://localhost/', {query:'x'.repeat(500)}).length, 124);
});
