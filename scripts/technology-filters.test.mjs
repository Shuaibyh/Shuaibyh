import assert from 'node:assert/strict';
import test from 'node:test';
import { technologyOptions, hasTechnology, technologyKey } from '../web/technology-filters.mjs';

const projects = [
  {technologies:['React','TypeScript','react','  ']},
  {technologies:['Java','React']},
  {technologies:['Matemática','TypeScript']},
  {technologies:[]},
];
test('normaliza tildes, mayúsculas y espacios', () => {
  assert.equal(technologyKey('  Matemática  '),'matematica');
  assert.equal(technologyKey('REACT'),'react');
});
test('produce opciones con conteos por proyecto y orden natural', () => {
  assert.deepEqual(technologyOptions(projects), [
    {value:'java',label:'Java',count:1},
    {value:'matematica',label:'Matemática',count:1},
    {value:'react',label:'React',count:2},
    {value:'typescript',label:'TypeScript',count:2},
  ]);
});
test('filtra por tecnología exacta, no por coincidencias parciales', () => {
  assert.equal(hasTechnology(projects[0],'react'),true);
  assert.equal(hasTechnology(projects[1],'act'),false);
  assert.equal(hasTechnology(projects[2],'MATEMATICA'),true);
  assert.equal(hasTechnology(projects[3],'all'),true);
});

test('omite tecnologías vacías y valores no textuales sin fallar', () => {
  const data = [{ technologies: null }, { technologies: ['  ', 7, null, 'Java'] }, {}];
  assert.deepEqual(technologyOptions(data), [{ value: 'java', label: 'Java', count: 1 }]);
});
