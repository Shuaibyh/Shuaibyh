/** Evalúa polinomios con coeficientes ascendentes; O(n). */
export function horner(coefficients, x) {
  if (!Array.isArray(coefficients) || coefficients.length === 0 ||
      coefficients.some(v => !Number.isFinite(v)) || !Number.isFinite(x)) {
    throw new TypeError('Se requieren coeficientes y x finitos');
  }
  let result = 0;
  for (let i = coefficients.length - 1; i >= 0; i--) result = result * x + coefficients[i];
  return result;
}
