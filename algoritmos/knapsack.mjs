/** Máximo valor de mochila 0/1, O(items * capacity), espacio O(capacity). */
export function knapsack(weights, values, capacity) {
  if (!Array.isArray(weights) || !Array.isArray(values) || weights.length !== values.length ||
    !Number.isSafeInteger(capacity) || capacity < 0 || capacity > 100000) {
    throw new RangeError('Pesos, valores y capacidad inválidos');
  }
  if (weights.some(w => !Number.isSafeInteger(w) || w < 0) ||
      values.some(v => !Number.isFinite(v) || v < 0)) {
    throw new RangeError('Pesos y valores deben ser no negativos y finitos');
  }
  const best = new Array(capacity + 1).fill(0);
  for (let i = 0; i < weights.length; i++) {
    for (let c = capacity; c >= weights[i]; c--) {
      best[c] = Math.max(best[c], best[c - weights[i]] + values[i]);
    }
  }
  return best[capacity];
}
