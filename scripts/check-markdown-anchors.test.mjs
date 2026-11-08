import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { githubSlug, validateAnchors } from './check-markdown-anchors.mjs';

async function fixture(run) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'portfolio-anchors-'));
  try {
    return await run(root);
  } finally {
    await rm(root, { force: true, recursive: true });
  }
}

test('crea slugs de títulos con acentos, formato y signos', () => {
  assert.equal(githubSlug('Introducción a APIs: **React** y TypeScript!'), 'introducción-a-apis-react-y-typescript');
  assert.equal(githubSlug('¿Qué es AULIGMA?'), 'qué-es-auligma');
});

test('acepta anclas internas y documentos relativos con caracteres codificados', () => fixture(async root => {
  await mkdir(path.join(root, 'docs'));
  await writeFile(path.join(root, 'README.md'), [
    '# Inicio',
    '[Sección](#inicio)',
    '[Guía](docs/guia.md#gestión-de-aulas)',
    '[Codificada](docs/guia.md#gesti%C3%B3n-de-aulas)',
  ].join('\n'));
  await writeFile(path.join(root, 'docs', 'guia.md'), '# Gestión de aulas\n');
  const result = await validateAnchors(root);
  assert.deepEqual(result.errors, []);
  assert.equal(result.checked, 3);
}));

test('distingue encabezados repetidos y los sufijos de GitHub', () => fixture(async root => {
  await writeFile(path.join(root, 'README.md'), [
    '# Introducción',
    '## Repetido',
    '## Repetido',
    '[Primero](#repetido)',
    '[Segundo](#repetido-1)',
  ].join('\n'));
  const result = await validateAnchors(root);
  assert.deepEqual(result.errors, []);
  assert.equal(result.checked, 2);
}));

test('reconoce títulos Setext e identificadores HTML explícitos', () => fixture(async root => {
  await writeFile(path.join(root, 'README.md'), [
    'Introducción',
    '============',
    '<a id="mi-seccion"></a>',
    '[Introducción](#introducción)',
    '[Ir al ancla](#mi-seccion)',
  ].join('\n'));
  const result = await validateAnchors(root);
  assert.deepEqual(result.errors, []);
  assert.equal(result.checked, 2);
}));

test('reporta anclas inexistentes e incluye archivo y línea', () => fixture(async root => {
  await writeFile(path.join(root, 'README.md'), '# Presente\n[Perdido](#no-existe)\n');
  const result = await validateAnchors(root);
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /README\.md:2: sección no encontrada: #no-existe/);
}));

test('ignora URL externas, imágenes, bloques de código y código en línea', () => fixture(async root => {
  await writeFile(path.join(root, 'README.md'), [
    '# Raíz',
    '[Externo](https://example.org/#no-existe)',
    '[Imagen](assets/foto.png#fragmento)',
    '\x60[Inline](#inexistente)\x60',
    '\x60\x60\x60md',
    '[Bloque](#inexistente)',
    '\x60\x60\x60',
    '[Válido](#raíz)',
  ].join('\n'));
  const result = await validateAnchors(root);
  assert.deepEqual(result.errors, []);
  assert.equal(result.checked, 1);
}));

test('reporta codificación URL inválida, sin interrumpir otros enlaces', () => fixture(async root => {
  await writeFile(path.join(root, 'README.md'), '# Válido\n[Error](#%ZZ)\n[Bien](#válido)\n');
  const result = await validateAnchors(root);
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /fragmento URL mal codificado/);
  assert.equal(result.checked, 1);
}));

test('omite destino Markdown inexistente: lo detecta el otro verificador', () => fixture(async root => {
  await writeFile(path.join(root, 'README.md'), '[Ausente](docs/no-existe.md#titulo)\n');
  const result = await validateAnchors(root);
  assert.deepEqual(result.errors, []);
  assert.equal(result.checked, 0);
}));
