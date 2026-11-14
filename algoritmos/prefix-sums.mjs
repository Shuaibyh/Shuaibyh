/** Sumas prefijas: rangos [start,end) en O(1) tras O(n) preparación. */
export function prefixSums(values) {
  if (!Array.isArray(values) || values.some(v => !Number.isFinite(v))) {
    throw new TypeError('Se requiere array de números finitos');
  }
  const sums = [0];
  for (const value of values) {
    const next = sums.at(-1) + value;
    if (!Number.isFinite(next)) throw new RangeError('Acumulación no finita');
    sums.push(next);
  }
  return sums;
}
export function rangeSum(prefix, start, end) {
  if (!Array.isArray(prefix) || !Number.isSafeInteger(start) ||
      !Number.isSafeInteger(end) || start < 0 || start > end || end >= prefix.length ||
      !Number.isFinite(prefix[start]) || !Number.isFinite(prefix[end])) {
    throw new RangeError('Rango de suma inválido');
  }
  return prefix[end] - prefix[start];
}
