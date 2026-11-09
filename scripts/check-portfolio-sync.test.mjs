import assert from 'node:assert/strict';
import test from 'node:test';
import { validatePortfolioSync } from './check-portfolio-sync.mjs';

const project = {
  id: 'ejemplo',
  name: 'Proyecto Ejemplo',
  repository: 'https://github.com/Shuaibyh/ejemplo',
  case_study: 'casos/EJEMPLO.md',
};
const index = `# Portafolio

## Proyectos seleccionados

| Proyecto | Descripción |
| --- | --- |
| [Proyecto Ejemplo](https://github.com/Shuaibyh/ejemplo) | Ejemplo |

## Estudios de caso

| Estudio | Tema |
| --- | --- |
| [Ejemplo](casos/EJEMPLO.md) | Calidad |

## Más información
`;

test('acepta catálogo e índice sincronizados', () => {
  assert.deepEqual(validatePortfolioSync({ projects: [project] }, index), []);
});

test('identifica un proyecto ausente del índice', () => {
  const broken = index.replace('[Proyecto Ejemplo]', '[Nombre Incorrecto]');
  assert.match(validatePortfolioSync({ projects: [project] }, broken).join(' '), /nombre distinto/);
});

test('identifica un estudio de caso no enlazado', () => {
  const broken = index.replace('casos/EJEMPLO.md', 'casos/OTRO.md');
  assert.match(validatePortfolioSync({ projects: [project] }, broken).join(' '), /Falta estudio de caso/);
});

test('detecta filas sin entrada en el catálogo', () => {
  const broken = index.replace(
    '| [Proyecto Ejemplo]',
    '| [Proyecto sin registrar](https://github.com/Shuaibyh/otro) | Extra |\n| [Proyecto Ejemplo]',
  );
  assert.match(validatePortfolioSync({ projects: [project] }, broken).join(' '), /sin entrada/);
});

test('detecta filas repetidas y secciones faltantes', () => {
  const repeated = index.replace(
    '| [Proyecto Ejemplo]',
    '| [Proyecto Ejemplo](https://github.com/Shuaibyh/ejemplo) | Duplicado |\n| [Proyecto Ejemplo]',
  );
  assert.match(validatePortfolioSync({ projects: [project] }, repeated).join(' '), /duplicados/);
  assert.match(validatePortfolioSync({ projects: [project] }, '# Nada').join(' '), /Falta la sección/);
});
