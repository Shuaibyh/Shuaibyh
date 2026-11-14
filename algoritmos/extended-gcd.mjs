/** Identidad de Bézout: gcd(a,b) = a*x + b*y. */
export function extendedGcd(a, b) {
  if (typeof a !== 'bigint' || typeof b !== 'bigint') throw new TypeError('Se esperan BigInt');
  let oldR = a; let r = b;
  let oldS = 1n; let s = 0n;
  let oldT = 0n; let t = 1n;
  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
    [oldT, t] = [t, oldT - q * t];
  }
  if (oldR < 0n) return { gcd: -oldR, x: -oldS, y: -oldT };
  return { gcd: oldR, x: oldS, y: oldT };
}
