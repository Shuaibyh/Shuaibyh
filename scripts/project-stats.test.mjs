import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { projectStats, formatStats, reportPortfolio } from './project-stats.mjs';

const sample = { projects: [
  { status: 'public-demo', demo: 'https://example.org/a', technologies: ['React', 'TypeScript'] },
  { status: 'prototype', demo: null, technologies: ['React', 'Java'] },
  { status: 'public-demo', demo: 'https://example.org/b', technologies: ['React', 'TypeScript'] },
] };

test('cuenta estados, demos y tecnologías de manera determinista', () => {
  const stats = projectStats(sample);
  assert.equal(stats.total, 3);
  assert.equal(stats.demos, 2);
  assert.deepEqual(stats.technologies[0], { name: 'React', count: 3 });
  assert.deepEqual(stats.statuses, [{ name: 'prototype', count: 1 }, { name: 'public-demo', count: 2 }]);
  assert.equal(projectStats(sample).total, 3);
});

test('cuenta cada tecnología una sola vez dentro de un mismo proyecto', () => {
  assert.deepEqual(projectStats({ projects: [{ technologies: ['React', 'React'], status: 'prototype' }] })
    .technologies, [{ name: 'React', count: 1 }]);
});

test('genera informe legible a partir de un archivo temporal', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'portfolio-stats-'));
  try {
    const filename = path.join(directory, 'projects.json');
    await writeFile(filename, JSON.stringify(sample));
    const text = await reportPortfolio(filename);
    assert.match(text, /Proyectos: 3/);
    assert.match(text, /React: 3/);
    assert.equal(text, formatStats(projectStats(sample)));
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
});

test('rechaza estructuras de datos inválidas', () => {
  assert.throws(() => projectStats({}), /projects/);
});
