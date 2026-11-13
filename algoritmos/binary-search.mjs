/** Índice de la primera aparición en una lista numérica ascendente, O(log n). */
export function binarySearch(sorted, target) {
  if (!Array.isArray(sorted) || !Number.isFinite(target)) throw new TypeError('Se espera array y objetivo numérico');
  let left = 0;
  let right = sorted.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (sorted[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left < sorted.length && sorted[left] === target ? left : -1;
}
