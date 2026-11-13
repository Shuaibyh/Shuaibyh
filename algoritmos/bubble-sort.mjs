/** Bubble sort estable con salida temprana, O(n^2), caso ordenado O(n). */
export function bubbleSort(items, compare = (a, b) => a - b) {
  if (!Array.isArray(items) || typeof compare !== 'function') throw new TypeError('Array y comparador requeridos');
  const result = [...items];
  for (let end = result.length - 1; end > 0; end--) {
    let swapped = false;
    for (let i = 0; i < end; i++) {
      if (compare(result[i], result[i + 1]) > 0) {
        [result[i], result[i + 1]] = [result[i + 1], result[i]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return result;
}
