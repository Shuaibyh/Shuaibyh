/** Test de primalidad por división hasta sqrt(n), O(sqrt(n)). */
export function isPrime(n) {
  if (!Number.isSafeInteger(n) || n < 0) throw new RangeError('n debe ser un entero seguro no negativo');
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let divisor = 3; divisor <= Math.floor(Math.sqrt(n)); divisor += 2) {
    if (n % divisor === 0) return false;
  }
  return true;
}
