/** Máximo común divisor por Euclides; devuelve BigInt no negativo. */
export function gcd(a, b) {
  if (typeof a !== 'bigint' || typeof b !== 'bigint') {
    throw new TypeError('gcd requiere dos valores BigInt');
  }
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}
