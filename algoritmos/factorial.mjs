/** Factorial iterativo O(n), exacto con BigInt. */
export function factorial(n) {
  if (!Number.isSafeInteger(n) || n < 0 || n > 100000) {
    throw new RangeError('n debe ser un entero seguro entre 0 y 100000');
  }
  let result = 1n;
  for (let i = 2; i <= n; i++) result *= BigInt(i);
  return result;
}
