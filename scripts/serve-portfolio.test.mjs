import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createPortfolioServer, publicPath } from './serve-portfolio.mjs';

test('resuelve únicamente rutas públicas del portafolio', () => {
  const base = path.resolve('/tmp/portfolio-test');
  assert.equal(publicPath('/', base), path.join(base, 'web/index.html'));
  assert.equal(publicPath('/data/projects.json', base), path.join(base, 'data/projects.json'));
  assert.equal(publicPath('/.env', base), null);
  assert.equal(publicPath('/scripts/check-public-secrets.mjs', base), null);
  assert.equal(publicPath('/web/%00a.html', base), null);
  assert.equal(publicPath('/web/%ZZ', base), null);
});

test('sirve páginas locales y bloquea archivos privados o métodos mutables', async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'portfolio-preview-'));
  const server = createPortfolioServer(dir);
  try {
    await mkdir(path.join(dir, 'web'));
    await mkdir(path.join(dir, 'data'));
    await writeFile(path.join(dir, 'web', 'index.html'), '<!doctype html><title>Demo</title>');
    await writeFile(path.join(dir, 'web', 'styles.css'), 'body{}');
    await writeFile(path.join(dir, 'data', 'projects.json'), '{"projects":[]}');
    await writeFile(path.join(dir, '.env'), 'PRIVATE_TOKEN=secret');
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const url = 'http://127.0.0.1:' + server.address().port;
    const index = await fetch(url + '/');
    assert.equal(index.status, 200);
    assert.match(await index.text(), /Demo/);
    assert.match(index.headers.get('content-security-policy'), /default-src 'none'/);
    const catalog = await fetch(url + '/data/projects.json');
    assert.equal(catalog.status, 200);
    assert.deepEqual(await catalog.json(), { projects: [] });
    const hidden = await fetch(url + '/.env');
    assert.equal(hidden.status, 404);
    assert.doesNotMatch(await hidden.text(), /secret/);
    const post = await fetch(url + '/web/index.html', { method: 'POST' });
    assert.equal(post.status, 405);
    const head = await fetch(url + '/web/styles.css', { method: 'HEAD' });
    assert.equal(head.status, 200);
    assert.equal(await head.text(), '');
  } finally {
    await new Promise(resolve => server.close(resolve));
    await rm(dir, { recursive: true, force: true });
  }
});
