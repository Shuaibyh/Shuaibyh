/** Lista simplemente enlazada con inserción al final O(1). */
export class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;
  get size() { return this.#size; }
  append(value) {
    const node = { value, next: null };
    if (this.#tail) this.#tail.next = node;
    else this.#head = node;
    this.#tail = node;
    this.#size++;
    return this;
  }
  remove(value) {
    let previous = null;
    let node = this.#head;
    while (node) {
      if (Object.is(node.value, value)) {
        if (previous) previous.next = node.next;
        else this.#head = node.next;
        if (node === this.#tail) this.#tail = previous;
        this.#size--;
        return true;
      }
      previous = node;
      node = node.next;
    }
    return false;
  }
  toArray() {
    const result = [];
    for (let node = this.#head; node; node = node.next) result.push(node.value);
    return result;
  }
}
