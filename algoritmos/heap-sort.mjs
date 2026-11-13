/** Heapsort ascendente sobre copia, O(n log n), no estable. */
export function heapSort(items, compare = (a, b) => a - b) {
  if (!Array.isArray(items) || typeof compare !== 'function') throw new TypeError('Array y comparador requeridos');
  const result = [...items];
  function siftDown(start, end) {
    let root = start;
    while (2 * root + 1 <= end) {
      let child = root * 2 + 1;
      if (child + 1 <= end && compare(result[child], result[child + 1]) < 0) child++;
      if (compare(result[root], result[child]) >= 0) return;
      [result[root], result[child]] = [result[child], result[root]];
      root = child;
    }
  }
  for (let i = Math.floor(result.length / 2) - 1; i >= 0; i--) siftDown(i, result.length - 1);
  for (let end = result.length - 1; end > 0; end--) {
    [result[0], result[end]] = [result[end], result[0]];
    siftDown(0, end - 1);
  }
  return result;
}
