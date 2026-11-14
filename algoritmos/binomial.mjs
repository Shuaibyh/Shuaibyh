/** Coeficiente binomial n elige k, exacto con BigInt; O(min(k,n-k)). */
export function binomial(n, k) {
  if (!Number.isSafeInteger(n) || !Number.isSafeInteger(k) ||
      n < 0 || k < 0 || k > n || n > 100000) {
    throw new RangeError('Se requieren enteros con 0 <= k <= n <= 100000');
  }
  const count = Math.min(k, n - k);
  let result = 1n;
  for (let i = 1; i <= count; i++) {
    result = result * BigInt(n - count + i) / BigInt(i);
  }
  return result;
}
