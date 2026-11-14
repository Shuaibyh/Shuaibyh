import assert from 'node:assert/strict';
import test from 'node:test';
import { powerBigInt } from '../algoritmos/power-bigint.mjs';
import { modularPower } from '../algoritmos/modular-power.mjs';
import { extendedGcd } from '../algoritmos/extended-gcd.mjs';
import { primeFactors } from '../algoritmos/prime-factors.mjs';
import { binomial } from '../algoritmos/binomial.mjs';
import { horner } from '../algoritmos/horner.mjs';

test('exponenciación entera exacta y exponentes cero', () => {
  assert.equal(powerBigInt(2n, 100n), 1267650600228229401496703205376n);
  assert.equal(powerBigInt(-2n, 3n), -8n);
  assert.equal(powerBigInt(0n, 0n), 1n);
  assert.throws(() => powerBigInt(2n, -1n), TypeError);
});
test('potencias modulares con bases negativas y módulo 1', () => {
  assert.equal(modularPower(2n, 10n, 1000n), 24n);
  assert.equal(modularPower(-2n, 3n, 5n), 2n);
  assert.equal(modularPower(23n, 0n, 1n), 0n);
  assert.throws(() => modularPower(2n, 2n, 0n), RangeError);
});
test('Euclides extendido satisface identidad de Bézout', () => {
  for (const [a, b] of [[240n, 46n], [-99n, 78n], [0n, 8n], [0n, 0n]]) {
    const result = extendedGcd(a, b);
    assert.equal(a * result.x + b * result.y, result.gcd);
    assert.ok(result.gcd >= 0n);
  }
});
test('factorización prima ordenada y entrada inválida', () => {
  assert.deepEqual(primeFactors(2), [2]);
  assert.deepEqual(primeFactors(360), [2, 2, 2, 3, 3, 5]);
  assert.deepEqual(primeFactors(97), [97]);
  assert.throws(() => primeFactors(1), RangeError);
});
test('coeficientes binomiales exactos y simétricos', () => {
  assert.equal(binomial(5, 2), 10n);
  assert.equal(binomial(100, 0), 1n);
  assert.equal(binomial(30, 17), binomial(30, 13));
  assert.throws(() => binomial(4, 5), RangeError);
});
test('Horner evalúa polinomios de grado cero y grado dos', () => {
  assert.equal(horner([5], 7), 5);
  assert.equal(horner([1, 2, 3], 2), 17);
  assert.equal(horner([1, 0, 1], -2), 5);
  assert.throws(() => horner([], 3), TypeError);
});
