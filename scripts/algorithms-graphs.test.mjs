import assert from 'node:assert/strict';
import test from 'node:test';
import { connectedComponents } from '../algoritmos/connected-components.mjs';
import { shortestUnweightedPath } from '../algoritmos/shortest-unweighted-path.mjs';
import { hasDirectedCycle } from '../algoritmos/directed-cycle.mjs';
import { bellmanFord } from '../algoritmos/bellman-ford.mjs';
import { kruskal } from '../algoritmos/kruskal.mjs';

test('componentes conexas incluyen aislados', () => {
  const g = new Map([['a', ['b']], ['b', ['a']], ['c', []]]);
  assert.deepEqual(connectedComponents(g), [['a', 'b'], ['c']]);
});
test('BFS devuelve camino más corto o null', () => {
  const g = new Map([['a', ['b', 'c']], ['b', ['d']], ['c', ['d']], ['d', []]]);
  assert.deepEqual(shortestUnweightedPath(g, 'a', 'd'), ['a', 'b', 'd']);
  assert.deepEqual(shortestUnweightedPath(g, 'c', 'c'), ['c']);
  assert.equal(shortestUnweightedPath(g, 'd', 'a'), null);
});
test('ciclo dirigido se distingue de DAG y self-loop', () => {
  assert.equal(hasDirectedCycle(new Map([['a', ['b']], ['b', ['c']], ['c', []]])), false);
  assert.equal(hasDirectedCycle(new Map([['a', ['b']], ['b', ['a']]])), true);
  assert.equal(hasDirectedCycle(new Map([['a', ['a']]])), true);
});
test('Bellman-Ford maneja pesos negativos sin ciclos', () => {
  const g = new Map([['a', [{ to: 'b', weight: 4 }, { to: 'c', weight: 5 }]],
    ['b', [{ to: 'c', weight: -2 }]], ['c', []], ['z', []]]);
  const result = bellmanFord(g, 'a');
  assert.equal(result.get('c'), 2);
  assert.equal(result.get('z'), Infinity);
  assert.throws(() => bellmanFord(new Map([['a', [{ to: 'b', weight: -1 }]],
    ['b', [{ to: 'a', weight: -1 }]]]), 'a'), /Ciclo negativo/);
});
test('Kruskal construye bosque mínimo y detecta desconexión', () => {
  const edges = [{ from: 'a', to: 'b', weight: 5 }, { from: 'b', to: 'c', weight: 1 },
    { from: 'a', to: 'c', weight: 2 }];
  const tree = kruskal(['a', 'b', 'c'], edges);
  assert.equal(tree.connected, true);
  assert.equal(tree.weight, 3);
  assert.equal(tree.edges.length, 2);
  assert.equal(kruskal(['a', 'b', 'z'], [{ from: 'a', to: 'b', weight: 2 }]).connected, false);
  assert.throws(() => kruskal(['a'], [{ from: 'a', to: 'b', weight: 1 }]), TypeError);
});
