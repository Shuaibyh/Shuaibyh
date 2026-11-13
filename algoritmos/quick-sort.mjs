/** Quicksort iterativo con pivote central. O(n log n) promedio, O(n^2) peor caso. */
export function quickSort(items, compare = (a, b) => a - b) {
  if (!Array.isArray(items) || typeof compare !== 'function') throw new TypeError('Array y comparador requeridos');
  const output = [...items];
  if (output.length < 2) return output;
  const pending = [[0, output.length - 1]];
  while (pending.length) {
    const [low, high] = pending.pop();
    let i = low;
    let j = high;
    const pivot = output[low + Math.floor((high - low) / 2)];
    while (i <= j) {
      while (compare(output[i], pivot) < 0) i++;
      while (compare(output[j], pivot) > 0) j--;
      if (i <= j) {
        [output[i], output[j]] = [output[j], output[i]];
        i++;
        j--;
      }
    }
    if (low < j) pending.push([low, j]);
    if (i < high) pending.push([i, high]);
  }
  return output;
}
