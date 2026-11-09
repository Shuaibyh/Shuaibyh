import assert from 'node:assert/strict';
import test from 'node:test';
import { imageAccessibilityIssues } from './check-markdown-images.mjs';

test('acepta imágenes Markdown y HTML con alternativas descriptivas', () => {
  const content = [
    '![Diagrama de componentes](assets/componentes.svg)',
    '<img src="./foto.png" alt="Jardín del restaurante" />',
  ].join('\n');
  assert.deepEqual(imageAccessibilityIssues(content), []);
});

test('informa imágenes Markdown sin descripción', () => {
  assert.match(imageAccessibilityIssues('![](foto.png)', 'README.md').join(' '), /README.md:1/);
  assert.match(imageAccessibilityIssues('![  ](foto.png)').join(' '), /sin texto alternativo/);
});

test('detecta HTML sin alt o con alt vacío no decorativo', () => {
  const findings = imageAccessibilityIssues('<img src="a.png">\n<img alt="" src="b.png">');
  assert.equal(findings.length, 2);
  assert.match(findings[0], /sin atributo alt/);
  assert.match(findings[1], /alt vacío/);
});

test('acepta una imagen marcada como puramente decorativa', () => {
  assert.deepEqual(imageAccessibilityIssues('<img src="decoracion.svg" alt="" role="presentation">'), []);
});

test('ignora ejemplos en código y comentarios HTML', () => {
  const content = [
    '<!-- <img src="ejemplo.png"> -->',
    '```html',
    '<img src="no-evaluar.png">',
    '```',
    '`![](ejemplo.png)`',
  ].join('\n');
  assert.deepEqual(imageAccessibilityIssues(content), []);
});
