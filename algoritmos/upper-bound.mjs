/** Primera posición con valor > target en array numérico ordenado. */
export function upperBound(sorted, target) {
  if (!Array.isArray(sorted) || !Number.isFinite(target)) throw new TypeError('Array y target requeridos');
  let left = 0; let right = sorted.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (sorted[mid] <= target) left = mid + 1;
    else right = mid;
  }
  return left;
}
