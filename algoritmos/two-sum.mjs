/** Encuentra primer par de índices cuya suma es target; O(n) promedio. */
export function twoSum(values, target) {
  if (!Array.isArray(values) || !Number.isFinite(target) ||
      values.some(v => !Number.isFinite(v))) {
    throw new TypeError('Se requieren números finitos');
  }
  const seen = new Map();
  for (let i = 0; i < values.length; i++) {
    const complement = target - values[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    if (!seen.has(values[i])) seen.set(values[i], i);
  }
  return null;
}
