/** Deduplica valores adyacentes de un array ordenado, O(n). */
export function uniqueSorted(sorted) {
  if (!Array.isArray(sorted)) throw new TypeError('Se requiere array ordenado');
  const result = [];
  for (const value of sorted) {
    if (result.length === 0 || !Object.is(value, result.at(-1))) result.push(value);
  }
  return result;
}
