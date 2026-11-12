import assert from 'node:assert/strict';
import test from 'node:test';
import { parseFilterUrl, buildFilterUrl } from '../web/filter-url.mjs';

test('convierte filtros en URLs y permite recuperarlos', () => {
  const location = buildFilterUrl('http://localhost:4173/?x=1#proyectos', {
    query: 'Matemáticas', status: 'developing', sort: 'name-asc', technology:'React',
  });
  assert.match(location, /x=1/);
  assert.match(location, /q=Matem/);
  assert.ok(location.endsWith('#proyectos'));
  assert.deepEqual(parseFilterUrl(location.split('?')[1].split('#')[0]), {
    query: 'Matemáticas', status: 'developing', sort: 'name-asc', technology:'react',
  });
});
test('ignora valores no admitidos y conserva otros parámetros', () => {
  assert.deepEqual(parseFilterUrl('?estado=admin&orden=random&q='), {query:'', status:'all', sort:'original', technology:'all'});
  const result = buildFilterUrl('http://localhost/?tracking=1&q=vieja', {query:'', status:'all', sort:'original'});
  assert.equal(result, '/?tracking=1');
});
test('limita la longitud de consulta para evitar URLs excesivas', () => {
  assert.equal(parseFilterUrl('?q=' + 'x'.repeat(500)).query.length, 120);
  assert.equal(buildFilterUrl('http://localhost/', {query:'x'.repeat(500)}).length, 124);
});

test('tecnología se codifica sin perder parámetros y normaliza acentos', () => {
  const url = buildFilterUrl('http://localhost/?origen=github', {technology:'Matemática',status:'all',sort:'original'});
  assert.match(url,/tec=matematica/);
  assert.match(url,/origen=github/);
  assert.equal(parseFilterUrl('?tec=MATEM%C3%81TICA').technology,'matematica');
  assert.equal(parseFilterUrl('?tec=' + 'a'.repeat(100)).technology,'all');
});

test('codifica búsquedas con signos de consulta y conserva el fragmento', () => {
  const result = buildFilterUrl('https://example.org/portfolio?origen=web#lista', { query: 'React & TypeScript?' });
  assert.equal(result, '/portfolio?origen=web&q=React+%26+TypeScript%3F#lista');
  assert.equal(parseFilterUrl(result.split('?')[1]).query, 'React & TypeScript?');
});
