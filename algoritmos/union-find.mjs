/** Conjuntos disjuntos con compresión de caminos y unión por rango. */
export class UnionFind {
  #parent = new Map();
  #rank = new Map();
  #count = 0;
  constructor(items = []) {
    for (const item of items) this.add(item);
  }
  add(item) {
    if (this.#parent.has(item)) return false;
    this.#parent.set(item, item);
    this.#rank.set(item, 0);
    this.#count++;
    return true;
  }
  get componentCount() { return this.#count; }
  find(item) {
    if (!this.#parent.has(item)) throw new RangeError('Elemento desconocido');
    const parent = this.#parent.get(item);
    if (parent !== item) this.#parent.set(item, this.find(parent));
    return this.#parent.get(item);
  }
  connected(a, b) { return this.find(a) === this.find(b); }
  union(a, b) {
    let left = this.find(a);
    let right = this.find(b);
    if (left === right) return false;
    if (this.#rank.get(left) < this.#rank.get(right)) [left, right] = [right, left];
    this.#parent.set(right, left);
    if (this.#rank.get(left) === this.#rank.get(right)) this.#rank.set(left, this.#rank.get(left) + 1);
    this.#count--;
    return true;
  }
}
