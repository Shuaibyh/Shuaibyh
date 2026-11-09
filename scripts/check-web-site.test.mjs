import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { checkSite, inspectSiteHtml } from './check-web-site.mjs';

const good = [
  '<!doctype html>',
  '<html lang="es"><head><meta name="viewport" content="width=device-width"></head>',
  '<body><a class="skip-link" href="#proyectos">Saltar</a>',
  '<main id="proyectos"><h1>Portafolio</h1>',
  '<label for="query">Buscar</label><input id="query">',
  ...['catalog', 'count', 'status', 'reset', 'empty', 'error'].map(id => '<div id="' + id + '"></div>'),
  '</main></body></html>',
].join('\n');

test('acepta estructura básica con accesibilidad y etiquetas', () => {
  assert.deepEqual(inspectSiteHtml(good), []);
});

test('detecta ids repetidos y etiquetas con destino inexistente', () => {
  const broken = good + '<div id="query"></div><label for="no-existe">Dato</label>';
  const issues = inspectSiteHtml(broken);
  assert.match(issues.join(' '), /duplicados/);
  assert.match(issues.join(' '), /Label sin control/);
});

test('rechaza carga de scripts externos e inline', () => {
  const issues = inspectSiteHtml(good + '<script>alert(1)</script><script src="https://example.org/a.js"></script>');
  assert.match(issues.join(' '), /scripts inline/);
  assert.match(issues.join(' '), /terceros/);
});

test('informa recursos locales ausentes', async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'portfolio-site-'));
  try {
    await mkdir(path.join(dir, 'web'));
    await writeFile(path.join(dir, 'web/index.html'), good);
    const issues = await checkSite(dir);
    assert.match(issues.join(' '), /Falta recurso/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
