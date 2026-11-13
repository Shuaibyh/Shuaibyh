import { gcd } from './gcd.mjs';

/** Mínimo común múltiplo exacto, con lcm(a,0)=0. */
export function lcm(a, b) {
  if (typeof a !== 'bigint' || typeof b !== 'bigint') {
    throw new TypeError('lcm requiere dos valores BigInt');
  }
  if (a === 0n || b === 0n) return 0n;
  const result = (a / gcd(a, b)) * b;
  return result < 0n ? -result : result;
}
