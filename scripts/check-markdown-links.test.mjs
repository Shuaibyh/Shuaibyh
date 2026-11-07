import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const checker = fileURLToPath(new URL('./check-markdown-links.mjs', import.meta.url));

function fixture(run) {
  const folder = mkdtempSync(path.join(os.tmpdir(), 'markdown-links-'));
  try {
    return run(folder);
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
}

function check(root) {
  return spawnSync(process.execPath, [checker], {
    encoding: 'utf8',
    env: { ...process.env, DOCS_ROOT: root },
  });
}

test('acepta archivos locales, imágenes, subcarpetas y URLs externas', () => fixture((root) => {
  mkdirSync(path.join(root, 'docs'));
  mkdirSync(path.join(root, 'assets'));
  writeFileSync(path.join(root, 'docs', 'guia.md'), '# Guía\n');
  writeFileSync(path.join(root, 'assets', 'hero.svg'), '<svg></svg>');
  writeFileSync(path.join(root, 'README.md'), [
    '# Inicio',
    '[Guía](docs/guia.md#detalles)',
    '<img src="./assets/hero.svg" alt="hero" />',
    '[Sitio](https://example.org)',
    '[Correo](mailto:ejemplo@example.org)',
    '```markdown',
    '[Texto no evaluado](no-existe.md)',
    '```',
  ].join('\n'));
  const result = check(root);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Enlaces locales correctos: 2/);
}));

test('rechaza un enlace relativo roto con la línea de origen', () => fixture((root) => {
  writeFileSync(path.join(root, 'README.md'), '# Inicio\n[Archivo](falta.md)\n');
  const result = check(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /README\.md:2/);
  assert.match(result.stderr, /falta\.md/);
}));

test('rechaza rutas que escapan fuera del repositorio', () => fixture((root) => {
  writeFileSync(path.join(root, 'README.md'), '[No permitido](../../privado.md)\n');
  const result = check(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /fuera del repositorio/);
}));

test('rechaza URL percent-encoding malformado', () => fixture((root) => {
  writeFileSync(path.join(root, 'README.md'), '[Roto](docs/%ZZ.md)\n');
  const result = check(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /percent-encoding inválido/);
}));
