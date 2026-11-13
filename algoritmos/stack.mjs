/** Pila LIFO con operaciones O(1) amortizadas. */
export class Stack {
  #items = [];
  get size() { return this.#items.length; }
  get isEmpty() { return this.#items.length === 0; }
  push(value) { this.#items.push(value); return this.#items.length; }
  pop() { return this.#items.pop(); }
  peek() { return this.#items.at(-1); }
  clear() { this.#items.length = 0; }
  toArray() { return [...this.#items]; }
}
