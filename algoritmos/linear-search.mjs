/** Primera coincidencia según Object.is, O(n) y sin mutaciones. */
export function linearSearch(items, target) {
  if (!Array.isArray(items)) throw new TypeError('Se espera un array');
  for (let i = 0; i < items.length; i++) {
    if (Object.is(items[i], target)) return i;
  }
  return -1;
}
