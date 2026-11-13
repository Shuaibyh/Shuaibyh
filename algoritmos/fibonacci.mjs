/** Enésimo Fibonacci (F0=0, F1=1), O(n) tiempo y O(1) espacio. */
export function fibonacci(n) {
  if (!Number.isSafeInteger(n) || n < 0 || n > 100000) {
    throw new RangeError('n debe ser un entero seguro entre 0 y 100000');
  }
  let previous = 0n;
  let current = 1n;
  for (let i = 0; i < n; i++) [previous, current] = [current, previous + current];
  return previous;
}
