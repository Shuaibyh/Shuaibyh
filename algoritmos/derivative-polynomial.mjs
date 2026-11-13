/** Derivada de polinomio en coeficientes ascendentes: [c0,c1,...], O(n). */
export function derivativePolynomial(coefficients) {
  if (!Array.isArray(coefficients) || coefficients.length === 0 ||
    coefficients.some(value => !Number.isFinite(value))) {
    throw new TypeError('Se requieren coeficientes finitos');
  }
  if (coefficients.length === 1) return [0];
  return coefficients.slice(1).map((value, index) => value * (index + 1));
}
