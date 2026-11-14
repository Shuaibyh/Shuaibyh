/** Valida (), [] y {} ignorando caracteres no delimitadores; O(n). */
export function balancedBrackets(input) {
  if (typeof input !== 'string') throw new TypeError('Se espera texto');
  const matches = new Map([[')', '('], [']', '['], ['}', '{']]);
  const open = new Set(matches.values());
  const stack = [];
  for (const char of input) {
    if (open.has(char)) stack.push(char);
    else if (matches.has(char) && stack.pop() !== matches.get(char)) return false;
  }
  return stack.length === 0;
}
