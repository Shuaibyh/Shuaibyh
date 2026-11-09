import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { exportProjects, parseOptions } from './export-projects.mjs';

const cli = fileURLToPath(new URL('./export-projects.mjs', import.meta.url));
const example = {
  projects: [{
    id: 'a', name: 'Demo', status: 'prototype',
    repository: 'https://github.com/Shuaibyh/a', demo: null,
    summary: 'Ejemplo', technologies: ['React'], case_study: 'casos/A.md',
  }],
};

test('la CLI ofrece ayuda y formatos explícitos', () => {
  assert.deepEqual(parseOptions([]), { format: 'csv' });
  assert.deepEqual(parseOptions(['--format', 'md']), { format: 'md' });
  assert.deepEqual(parseOptions(['--help']), { help: true });
  assert.throws(() => parseOptions(['--format', 'xml']), /Uso/);
  assert.throws(() => parseOptions(['--oops']), /Uso/);
});

test('los exportadores funcionan con archivos sintéticos y no sobrescriben el origen', async () => {
  const folder = mkdtempSync(path.join(os.tmpdir(), 'portfolio-export-'));
  try {
    const file = path.join(folder, 'projects.json');
    const payload = JSON.stringify(example);
    writeFileSync(file, payload);
    assert.match(await exportProjects(['--format', 'csv'], file), /Demo,prototype/);
    assert.match(await exportProjects(['--format', 'md'], file), /Sin demo pública/);
    const json = JSON.parse(await exportProjects(['--format', 'json'], file));
    assert.equal(json.projects.length, 1);
    assert.equal(execFileSync(process.execPath, [cli, '--help'], { encoding: 'utf8' }).includes('csv'), true);
    assert.equal(JSON.stringify(example), payload);
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
});

test('un formato inválido retorna error sin producir documento', () => {
  const result = spawnSync(process.execPath, [cli, '--format', 'inexistente'], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Uso:/);
  assert.equal(result.stdout, '');
});
