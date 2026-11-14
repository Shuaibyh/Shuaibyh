/** Rota un array a la derecha sin mutarlo; admite pasos negativos. */
export function rotateArray(items, steps = 1) {
  if (!Array.isArray(items) || !Number.isSafeInteger(steps)) {
    throw new TypeError('Array y pasos enteros seguros requeridos');
  }
  const n = items.length;
  if (n === 0) return [];
  const shift = ((steps % n) + n) % n;
  return shift === 0 ? [...items] : items.slice(n - shift).concat(items.slice(0, n - shift));
}
