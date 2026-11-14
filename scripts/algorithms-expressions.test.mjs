import assert from 'node:assert/strict';
import test from 'node:test';
import { balancedBrackets } from '../algoritmos/balanced-brackets.mjs';
import { derivativePolynomial } from '../algoritmos/derivative-polynomial.mjs';
import { horner } from '../algoritmos/horner.mjs';

test('delimitadores anidados válidos', () => {
  assert.equal(balancedBrackets('f({a:[1,2]})'), true);
  assert.equal(balancedBrackets(''), true);
  assert.equal(balancedBrackets('(([]))'), true);
});
test('delimitadores abiertos o desordenados se rechazan', () => {
  assert.equal(balancedBrackets('([)]'), false);
  assert.equal(balancedBrackets('(a+b'), false);
  assert.equal(balancedBrackets('a+b)'), false);
  assert.throws(() => balancedBrackets(null), TypeError);
});
test('derivar un polinomio se relaciona con su evaluación', () => {
  const poly = [7, -3, 4];
  const derivative = derivativePolynomial(poly);
  assert.deepEqual(derivative, [-3, 8]);
  assert.equal(horner(derivative, 2), 13);
});
