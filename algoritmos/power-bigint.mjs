/** Potencia entera exacta por exponenciación binaria; O(log exponent). */
export function powerBigInt(base, exponent) {
  if (typeof base !== 'bigint' || typeof exponent !== 'bigint' || exponent < 0n) {
    throw new TypeError('Se requieren BigInt y exponente no negativo');
  }
  let result = 1n;
  let factor = base;
  let n = exponent;
  while (n > 0n) {
    if (n & 1n) result *= factor;
    n >>= 1n;
    if (n > 0n) factor *= factor;
  }
  return result;
}
