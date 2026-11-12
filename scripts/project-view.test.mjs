import assert from 'node:assert/strict';
import test from 'node:test';
import { cardModel, safeHttpsUrl } from '../web/project-view.mjs';

test('permite direcciones HTTPS sin credenciales', () => {
  assert.equal(safeHttpsUrl('https://github.com/Shuaibyh/auligma'), 'https://github.com/Shuaibyh/auligma');
  assert.equal(safeHttpsUrl('javascript:alert(1)'), null);
  assert.equal(safeHttpsUrl('http://example.org'), null);
  assert.equal(safeHttpsUrl('https://user:password@example.org'), null);
});

test('una ficha de prototipo no muestra demo inexistente', () => {
  const card = cardModel({
    name: 'Academia', summary: 'Prototipo', status: 'prototype',
    technologies: ['Java'], repository: 'https://github.com/Shuaibyh/academia', demo: null,
  });
  assert.equal(card.links.length, 1);
  assert.equal(card.status, 'Prototipo');
});

test('convierte valores del catálogo en datos y no en HTML', () => {
  const card = cardModel({
    name: '<img src=x onerror=alert(1)>', summary: '<script>alert(1)</script>',
    status: 'developing', technologies: ['React'],
    repository: 'https://github.com/Shuaibyh/example', demo: 'javascript:alert(1)',
  });
  assert.match(card.title, /<img/);
  assert.equal(card.links.length, 1);
  assert.equal(card.summary, '<script>alert(1)</script>');
});

test('incluye el estudio de caso válido como enlace local', () => {
  const card = cardModel({
    name: 'AULIGMA', summary: 'Aprendizaje', status: 'developing',
    repository: 'https://github.com/Shuaibyh/auligma',
    demo: null, case_study: 'casos/AULIGMA.md',
  });
  assert.deepEqual(card.links.at(-1), {label: 'Estudio de caso', href: '../casos/AULIGMA.md'});
});

test('rechaza rutas de caso maliciosas o fuera de la carpeta permitida', () => {
  for (const case_study of ['../README.md', 'casos/../../.env', 'https://example.com', 'casos/a.md?x=1']) {
    const card = cardModel({
      name:'Demo', summary:'Demo', status:'prototype',
      repository:'https://github.com/Shuaibyh/demo', demo:null, case_study,
    });
    assert.equal(card.links.some(link => link.label === 'Estudio de caso'), false);
  }
});

test('bloquea direcciones relativas y esquemas no HTTPS', () => {
  for (const url of ['', '//example.org/path', '/docs', 'ftp://example.org', 'https://user@example.org']) {
    assert.equal(safeHttpsUrl(url), null, url);
  }
  assert.equal(safeHttpsUrl(null), null);
});

test('ofrece valores por defecto para fichas incompletas', () => {
  assert.deepEqual(cardModel({}), {
    title: '', summary: '', status: 'Estado por confirmar', technologies: [], links: [],
  });
});

test('admite casos de estudio seguros con números y guiones', () => {
  const valid = cardModel({ case_study: 'casos/REVISION-2026.md' });
  assert.deepEqual(valid.links, [{ label: 'Estudio de caso', href: '../casos/REVISION-2026.md' }]);
  for (const value of ['casos/a_b.md', 'casos/%2e%2e.md', 'casos/índice.md']) {
    assert.deepEqual(cardModel({ case_study: value }).links, []);
  }
});

test('mantiene el orden de enlaces y omite tecnologías no textuales', () => {
  const card = cardModel({
    name: 'Proyecto', summary: 'Ejemplo', status: 'public-demo',
    repository: 'https://github.com/Shuaibyh/example',
    demo: 'https://example.org/demo', case_study: 'casos/PROYECTO.md',
    technologies: ['React', 123, null, 'TypeScript'],
  });
  assert.deepEqual(card.technologies, ['React', 'TypeScript']);
  assert.deepEqual(card.links.map(link => link.label), [
    'Código en GitHub', 'Ver demostración', 'Estudio de caso',
  ]);
});
