/** Factorización prima de enteros seguros, por división de prueba. */
export function primeFactors(n) {
  if (!Number.isSafeInteger(n) || n < 2) throw new RangeError('n debe ser entero seguro >= 2');
  const factors = [];
  let remaining = n;
  for (let factor = 2; factor <= remaining / factor; factor += factor === 2 ? 1 : 2) {
    while (remaining % factor === 0) {
      factors.push(factor);
      remaining /= factor;
    }
  }
  if (remaining > 1) factors.push(remaining);
  return factors;
}
