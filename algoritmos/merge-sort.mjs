/** Merge sort estable; O(n log n), memoria O(n). */
export function mergeSort(items, compare = (a, b) => a - b) {
  if (!Array.isArray(items) || typeof compare !== 'function') throw new TypeError('Array y comparador requeridos');
  if (items.length <= 1) return [...items];
  const middle = Math.floor(items.length / 2);
  const left = mergeSort(items.slice(0, middle), compare);
  const right = mergeSort(items.slice(middle), compare);
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (compare(left[i], right[j]) <= 0) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}
