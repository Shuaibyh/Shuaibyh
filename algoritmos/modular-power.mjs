/** Exponenciación modular eficiente, O(log exponent) multiplicaciones BigInt. */
export function modularPower(base, exponent, modulus) {
  if ([base, exponent, modulus].some(value => typeof value !== 'bigint') ||
      exponent < 0n || modulus <= 0n) {
    throw new RangeError('Se esperan BigInt, exponente no negativo y módulo positivo');
  }
  let result = 1n % modulus;
  let factor = ((base % modulus) + modulus) % modulus;
  let n = exponent;
  while (n > 0n) {
    if (n & 1n) result = (result * factor) % modulus;
    factor = (factor * factor) % modulus;
    n >>= 1n;
  }
  return result;
}
