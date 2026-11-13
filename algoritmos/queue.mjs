/** Cola FIFO O(1) amortizado, sin Array.shift() por elemento. */
export class Queue {
  #items = [];
  #head = 0;
  get size() { return this.#items.length - this.#head; }
  get isEmpty() { return this.size === 0; }
  enqueue(value) { this.#items.push(value); return this.size; }
  peek() { return this.#items[this.#head]; }
  dequeue() {
    if (this.isEmpty) return undefined;
    const value = this.#items[this.#head++];
    if (this.#head >= 64 && this.#head * 2 >= this.#items.length) {
      this.#items = this.#items.slice(this.#head);
      this.#head = 0;
    }
    return value;
  }
  clear() { this.#items = []; this.#head = 0; }
  toArray() { return this.#items.slice(this.#head); }
}
