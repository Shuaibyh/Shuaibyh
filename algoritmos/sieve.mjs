/** Criba de Eratóstenes hasta limit inclusive: O(n log log n). */
export function sieve(limit) {
  if (!Number.isSafeInteger(limit) || limit < 0 || limit > 1000000) {
    throw new RangeError('limit debe estar entre 0 y 1000000');
  }
  if (limit < 2) return [];
  const marked = new Uint8Array(limit + 1);
  const primes = [];
  for (let n = 2; n <= limit; n++) {
    if (marked[n]) continue;
    primes.push(n);
    if (n * n <= limit) {
      for (let composite = n * n; composite <= limit; composite += n) marked[composite] = 1;
    }
  }
  return primes;
}
