/** Selection sort O(n^2) con mínimo intercambio, no estable. */
export function selectionSort(items, compare = (a, b) => a - b) {
  if (!Array.isArray(items) || typeof compare !== 'function') throw new TypeError('Array y comparador requeridos');
  const result = [...items];
  for (let i = 0; i < result.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < result.length; j++) {
      if (compare(result[j], result[min]) < 0) min = j;
    }
    if (min !== i) [result[i], result[min]] = [result[min], result[i]];
  }
  return result;
}
