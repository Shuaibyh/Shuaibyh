import assert from 'node:assert/strict';
import test from 'node:test';
import { csvCell, toCsv, toMarkdown, toPublicJson } from './lib/project-format.mjs';

const data = {
  projects: [
    { id: 'test', name: 'Proyecto "A, B"', status: 'prototype', repository: 'https://github.com/Shuaibyh/test',
      demo: null, technologies: ['React', 'Node.js'], case_study: 'casos/TEST.md',
      summary: 'Una demo', evidence: ['https://github.com/Shuaibyh/test/blob/main/README.md'] },
  ],
};

test('escapa comillas, comas y saltos de línea del CSV', () => {
  assert.equal(csvCell('Hola, "mundo"'), '"Hola, ""mundo"""');
  assert.equal(csvCell('a\nb'), '"a\nb"');
});

test('impide que campos potencialmente peligrosos inicien fórmulas', () => {
  for (const candidate of ['=1+1', '+SUM(1)', '-1+2', '@func', '\t=1+1']) {
    assert.ok(csvCell(candidate).includes("'"), candidate);
  }
  assert.equal(csvCell('Nombre normal'), 'Nombre normal');
});

test('genera exportación CSV determinista con encabezados y tecnologías', () => {
  const result = toCsv(data);
  assert.match(result, /^Proyecto,Estado,Repositorio,Demo,Tecnologías,Estudio\n/);
  assert.match(result, /"Proyecto ""A, B"""/);
  assert.match(result, /React; Node.js/);
  assert.ok(result.endsWith('\n'));
  assert.equal(toCsv(data), result);
});

test('construye tabla Markdown sin inventar demostraciones', () => {
  const result = toMarkdown(data);
  assert.match(result, /Sin demo pública/);
  assert.match(result, /\[Proyecto "A, B"\]\(https:\/\/github.com\/Shuaibyh\/test\)/);
});

test('produce JSON público con campos definidos y sin evidencias redundantes', () => {
  const result = JSON.parse(toPublicJson(data));
  assert.equal(result.schema_version, 1);
  assert.equal(result.projects[0].name, 'Proyecto "A, B"');
  assert.equal(result.projects[0].demo, null);
  assert.equal(Object.hasOwn(result.projects[0], 'evidence'), false);
});

test('rechaza un catálogo sin lista projects', () => {
  assert.throws(() => toCsv({}), /projects/);
  assert.throws(() => toMarkdown(null), /projects/);
  assert.throws(() => toPublicJson({ projects: {} }), /projects/);
});
