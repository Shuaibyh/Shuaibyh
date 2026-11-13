/** Multiplicación de matrices rectangulares, O(rows(A)*cols(A)*cols(B)). */
export function matrixMultiply(a, b) {
  function shape(matrix) {
    if (!Array.isArray(matrix) || matrix.length === 0 ||
      !Array.isArray(matrix[0]) || matrix[0].length === 0 ||
      matrix.some(row => !Array.isArray(row) || row.length !== matrix[0].length ||
        row.some(value => !Number.isFinite(value)))) {
      throw new TypeError('Se requiere una matriz rectangular numérica no vacía');
    }
    return [matrix.length, matrix[0].length];
  }
  const [rows, inner] = shape(a);
  const [innerB, columns] = shape(b);
  if (inner !== innerB) throw new RangeError('Dimensiones incompatibles');
  const result = Array.from({ length: rows }, () => new Array(columns).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let k = 0; k < inner; k++) {
      for (let j = 0; j < columns; j++) result[i][j] += a[i][k] * b[k][j];
    }
  }
  return result;
}
