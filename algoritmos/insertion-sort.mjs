/** Ordenamiento por inserción estable, O(n^2), sobre una copia. */
export function insertionSort(items, compare = (a, b) => a - b) {
  if (!Array.isArray(items) || typeof compare !== 'function') throw new TypeError('Array y comparador requeridos');
  const result = [...items];
  for (let i = 1; i < result.length; i++) {
    const value = result[i];
    let j = i - 1;
    while (j >= 0 && compare(result[j], value) > 0) {
      result[j + 1] = result[j];
      j--;
    }
    result[j + 1] = value;
  }
  return result;
}
