import assert from 'node:assert/strict';
import test from 'node:test';
import { prefixSums, rangeSum } from '../algoritmos/prefix-sums.mjs';
import { twoSum } from '../algoritmos/two-sum.mjs';
import { lowerBound } from '../algoritmos/lower-bound.mjs';
import { upperBound } from '../algoritmos/upper-bound.mjs';
import { rotateArray } from '../algoritmos/rotate-array.mjs';
import { uniqueSorted } from '../algoritmos/unique-sorted.mjs';

test('sumas prefijas: intervalos vacíos y completos', () => {
  const prefix = prefixSums([3, -2, 5, 7]);
  assert.deepEqual(prefix, [0, 3, 1, 6, 13]);
  assert.equal(rangeSum(prefix, 1, 3), 3);
  assert.equal(rangeSum(prefix, 0, 4), 13);
  assert.equal(rangeSum(prefix, 2, 2), 0);
  assert.throws(() => rangeSum(prefix, 4, 5), RangeError);
});
test('dos sumandos: no reutiliza un único índice', () => {
  assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
  assert.deepEqual(twoSum([3, 3], 6), [0, 1]);
  assert.equal(twoSum([3], 6), null);
  assert.throws(() => twoSum(['3'], 3), TypeError);
});
test('límites inferior y superior en secuencias ordenadas', () => {
  const values = [1, 2, 2, 2, 4];
  assert.equal(lowerBound(values, 2), 1);
  assert.equal(upperBound(values, 2), 4);
  assert.equal(lowerBound(values, 0), 0);
  assert.equal(upperBound(values, 99), 5);
  assert.equal(lowerBound([], 1), 0);
});
test('rotación preserva datos y acepta sentido inverso', () => {
  const data = [1, 2, 3, 4, 5];
  assert.deepEqual(rotateArray(data, 2), [4, 5, 1, 2, 3]);
  assert.deepEqual(rotateArray(data, -1), [2, 3, 4, 5, 1]);
  assert.deepEqual(rotateArray([], 999), []);
  assert.deepEqual(data, [1, 2, 3, 4, 5]);
});
test('deduplicación adyacente sin modificar origen', () => {
  const values = [1, 1, 2, 2, 2, 3];
  assert.deepEqual(uniqueSorted(values), [1, 2, 3]);
  assert.deepEqual(uniqueSorted([]), []);
  assert.deepEqual(values, [1, 1, 2, 2, 2, 3]);
});
