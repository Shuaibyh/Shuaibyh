/** Longitud de la subsecuencia común más larga, O(mn) tiempo y O(n) memoria. */
export function longestCommonSubsequence(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string') throw new TypeError('Se requieren dos cadenas');
  const a = Array.from(left);
  const b = Array.from(right);
  let previous = new Array(b.length + 1).fill(0);
  for (const char of a) {
    const current = new Array(b.length + 1).fill(0);
    for (let j = 1; j <= b.length; j++) {
      current[j] = char === b[j - 1] ? previous[j - 1] + 1 : Math.max(previous[j], current[j - 1]);
    }
    previous = current;
  }
  return previous[b.length];
}
