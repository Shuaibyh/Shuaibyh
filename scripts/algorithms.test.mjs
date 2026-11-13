import assert from 'node:assert/strict';
import test from 'node:test';
import { factorial } from '../algoritmos/factorial.mjs';
import { fibonacci } from '../algoritmos/fibonacci.mjs';
import { gcd } from '../algoritmos/gcd.mjs';
import { lcm } from '../algoritmos/lcm.mjs';
import { isPrime } from '../algoritmos/is-prime.mjs';
import { sieve } from '../algoritmos/sieve.mjs';
import { binarySearch } from '../algoritmos/binary-search.mjs';
import { linearSearch } from '../algoritmos/linear-search.mjs';
import { insertionSort } from '../algoritmos/insertion-sort.mjs';
import { mergeSort } from '../algoritmos/merge-sort.mjs';
import { quickSort } from '../algoritmos/quick-sort.mjs';
import { heapSort } from '../algoritmos/heap-sort.mjs';
import { bubbleSort } from '../algoritmos/bubble-sort.mjs';
import { selectionSort } from '../algoritmos/selection-sort.mjs';
import { Stack } from '../algoritmos/stack.mjs';
import { Queue } from '../algoritmos/queue.mjs';
import { LinkedList } from '../algoritmos/linked-list.mjs';
import { bfs } from '../algoritmos/bfs.mjs';
import { dfs } from '../algoritmos/dfs.mjs';
import { dijkstra } from '../algoritmos/dijkstra.mjs';
import { topologicalSort } from '../algoritmos/topological-sort.mjs';
import { UnionFind } from '../algoritmos/union-find.mjs';
import { knapsack } from '../algoritmos/knapsack.mjs';
import { longestCommonSubsequence } from '../algoritmos/longest-common-subsequence.mjs';
import { editDistance } from '../algoritmos/edit-distance.mjs';
import { matrixMultiply } from '../algoritmos/matrix-multiply.mjs';
import { derivativePolynomial } from '../algoritmos/derivative-polynomial.mjs';

test('factorial exacto, base y rango', () => {
  assert.equal(factorial(0), 1n);
  assert.equal(factorial(10), 3628800n);
  assert.throws(() => factorial(-1), RangeError);
});
test('Fibonacci iterativo maneja bases y n grande', () => {
  assert.equal(fibonacci(0), 0n);
  assert.equal(fibonacci(1), 1n);
  assert.equal(fibonacci(10), 55n);
  assert.equal(fibonacci(100), 354224848179261915075n);
});
test('Euclides funciona con negativos y ceros', () => {
  assert.equal(gcd(-54n, 24n), 6n);
  assert.equal(gcd(0n, 0n), 0n);
  assert.throws(() => gcd(2, 4), TypeError);
});
test('MCM es exacto y maneja cero', () => {
  assert.equal(lcm(12n, -18n), 36n);
  assert.equal(lcm(0n, 5n), 0n);
});
test('primalidad cubre casos límite', () => {
  assert.equal(isPrime(0), false);
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(97), true);
  assert.equal(isPrime(100), false);
});
test('criba encuentra primos en rango', () => {
  assert.deepEqual(sieve(1), []);
  assert.deepEqual(sieve(12), [2, 3, 5, 7, 11]);
});
test('búsqueda binaria retorna primera coincidencia', () => {
  assert.equal(binarySearch([1, 2, 2, 2, 5], 2), 1);
  assert.equal(binarySearch([1, 3], 2), -1);
});
test('búsqueda lineal usa identidad exacta', () => {
  assert.equal(linearSearch([1, NaN, 3], NaN), 1);
  assert.equal(linearSearch([1, 2], 3), -1);
});
for (const [label, fn] of [
  ['inserción', insertionSort],
  ['mezcla', mergeSort],
  ['rápida', quickSort],
  ['heap', heapSort],
  ['burbuja', bubbleSort],
  ['selección', selectionSort],
]) {
  test('ordenamiento ' + label + ' no modifica entrada y ordena duplicados', () => {
    const input = [5, -1, 3, 3, 0];
    assert.deepEqual(fn(input), [-1, 0, 3, 3, 5]);
    assert.deepEqual(input, [5, -1, 3, 3, 0]);
    assert.deepEqual(fn([]), []);
  });
}
test('mezcla e inserción mantienen estabilidad por clave', () => {
  const input = [{ key: 1, id: 'a' }, { key: 1, id: 'b' }, { key: 0, id: 'c' }];
  for (const sort of [mergeSort, insertionSort, bubbleSort]) {
    assert.deepEqual(sort(input, (a, b) => a.key - b.key).map(x => x.id), ['c', 'a', 'b']);
  }
});
test('pila LIFO', () => {
  const s = new Stack();
  assert.equal(s.isEmpty, true);
  s.push('a'); s.push('b');
  assert.equal(s.peek(), 'b');
  assert.equal(s.pop(), 'b');
  assert.equal(s.size, 1);
});
test('cola FIFO y compactación', () => {
  const q = new Queue();
  for (let i = 0; i < 140; i++) q.enqueue(i);
  for (let i = 0; i < 130; i++) assert.equal(q.dequeue(), i);
  assert.equal(q.peek(), 130);
  assert.deepEqual(q.toArray(), Array.from({ length: 10 }, (_, i) => i + 130));
});
test('lista enlazada preserva orden y extremos', () => {
  const list = new LinkedList();
  list.append('a').append('b').append('c');
  assert.equal(list.remove('a'), true);
  assert.equal(list.remove('c'), true);
  assert.deepEqual(list.toArray(), ['b']);
  assert.equal(list.size, 1);
});
const graph = new Map([['a', ['b', 'c']], ['b', ['d']], ['c', []], ['d', []]]);
test('BFS recorre por niveles', () => assert.deepEqual(bfs(graph, 'a'), ['a', 'b', 'c', 'd']));
test('DFS sigue el orden de adyacencias', () => assert.deepEqual(dfs(graph, 'a'), ['a', 'b', 'd', 'c']));
test('Dijkstra encuentra rutas y deja inalcanzables en infinito', () => {
  const weighted = new Map([
    ['a', [{ to: 'b', weight: 4 }, { to: 'c', weight: 1 }]],
    ['c', [{ to: 'b', weight: 2 }]], ['b', []], ['z', []],
  ]);
  const distances = dijkstra(weighted, 'a');
  assert.equal(distances.get('b'), 3);
  assert.equal(distances.get('z'), Infinity);
  assert.throws(() => dijkstra(new Map([['a', [{ to: 'b', weight: -1 }]]]), 'a'), RangeError);
});
test('orden topológico satisface precedencias y detecta ciclos', () => {
  assert.deepEqual(topologicalSort(graph), ['a', 'b', 'c', 'd']);
  assert.throws(() => topologicalSort(new Map([['a', ['b']], ['b', ['a']]])), /ciclo/);
});
test('conjuntos disjuntos unen por equivalencia', () => {
  const sets = new UnionFind(['a', 'b', 'c']);
  assert.equal(sets.componentCount, 3);
  assert.equal(sets.union('a', 'b'), true);
  assert.equal(sets.connected('a', 'b'), true);
  assert.equal(sets.connected('a', 'c'), false);
  assert.equal(sets.componentCount, 2);
});
test('mochila 0/1 maximiza valor sin reutilizar artículos', () => {
  assert.equal(knapsack([2, 3, 4], [4, 5, 6], 5), 9);
  assert.equal(knapsack([], [], 0), 0);
  assert.throws(() => knapsack([1], [2], -1), RangeError);
});
test('LCS soporta Unicode', () => {
  assert.equal(longestCommonSubsequence('ABCBDAB', 'BDCABA'), 4);
  assert.equal(longestCommonSubsequence('😀a', '😀b'), 1);
});
test('distancia de edición considera inserción, borrado y sustitución', () => {
  assert.equal(editDistance('kitten', 'sitting'), 3);
  assert.equal(editDistance('😀', ''), 1);
});
test('multiplicación matricial valida dimensiones', () => {
  assert.deepEqual(matrixMultiply([[1, 2], [3, 4]], [[5], [6]]), [[17], [39]]);
  assert.throws(() => matrixMultiply([[1, 2]], [[1, 2]]), RangeError);
});
test('derivada de polinomios usa coeficientes ascendentes', () => {
  assert.deepEqual(derivativePolynomial([5, 3, 2]), [3, 4]);
  assert.deepEqual(derivativePolynomial([7]), [0]);
});
