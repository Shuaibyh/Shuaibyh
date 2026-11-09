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
