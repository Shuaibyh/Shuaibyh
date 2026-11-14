import assert from 'node:assert/strict';
import test from 'node:test';
import { lowerBound } from '../algoritmos/lower-bound.mjs';
import { upperBound } from '../algoritmos/upper-bound.mjs';
import { binomial } from '../algoritmos/binomial.mjs';
import { modularPower } from '../algoritmos/modular-power.mjs';
import { primeFactors } from '../algoritmos/prime-factors.mjs';
import { kruskal } from '../algoritmos/kruskal.mjs';
import { bellmanFord } from '../algoritmos/bellman-ford.mjs';
import { dijkstra } from '../algoritmos/dijkstra.mjs';

test('los límites de búsqueda cuentan las apariciones de cada valor', () => {
  for (let length = 0; length < 30; length++) {
    const values = Array.from({ length }, (_, i) => Math.floor(i / 3));
    for (let target = -1; target <= 11; target++) {
      const count = values.filter(v => v === target).length;
      assert.equal(upperBound(values, target) - lowerBound(values, target), count);
    }
  }
});
test('coeficientes binomiales cumplen identidad de Pascal', () => {
  for (let n = 2; n < 20; n++) {
    for (let k = 1; k < n; k++) {
      assert.equal(binomial(n, k), binomial(n - 1, k - 1) + binomial(n - 1, k));
    }
  }
});
test('potencia modular coincide con potencia directa para exponentes pequeños', () => {
  for (let base = -5n; base <= 5n; base++) {
    for (let exponent = 0n; exponent <= 8n; exponent++) {
      assert.equal(modularPower(base, exponent, 17n),
        ((base ** exponent % 17n) + 17n) % 17n);
    }
  }
});
test('factorización produce nuevamente cada entero original', () => {
  for (let n = 2; n <= 150; n++) {
    assert.equal(primeFactors(n).reduce((product, factor) => product * factor, 1), n);
  }
});
test('Bellman-Ford coincide con Dijkstra en grafos no negativos', () => {
  const graph = new Map([['a', [{ to: 'b', weight: 8 }, { to: 'c', weight: 3 }]],
    ['b', [{ to: 'd', weight: 1 }]], ['c', [{ to: 'b', weight: 2 }, { to: 'd', weight: 9 }]],
    ['d', []]]);
  assert.deepEqual([...bellmanFord(graph, 'a')], [...dijkstra(graph, 'a')]);
});
test('Kruskal selecciona aristas sin modificar el origen', () => {
  const input = [{ from: 1, to: 2, weight: 2 }, { from: 2, to: 3, weight: 1 },
    { from: 1, to: 3, weight: 4 }];
  const before = JSON.stringify(input);
  assert.equal(kruskal([1, 2, 3], input).weight, 3);
  assert.equal(JSON.stringify(input), before);
});
