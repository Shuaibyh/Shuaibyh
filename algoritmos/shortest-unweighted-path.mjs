/** Camino más corto por BFS en grafo no ponderado dirigido, O(V+E). */
export function shortestUnweightedPath(graph, start, goal) {
  if (!(graph instanceof Map)) throw new TypeError('Se requiere grafo Map');
  const parent = new Map([[start, null]]);
  const queue = [start];
  let head = 0;
  while (head < queue.length) {
    const node = queue[head++];
    if (Object.is(node, goal)) {
      const path = [];
      let current = node;
      while (current !== null) {
        path.push(current);
        current = parent.get(current);
      }
      return path.reverse();
    }
    const adjacent = graph.get(node) ?? [];
    if (!Array.isArray(adjacent)) throw new TypeError('Adyacencias deben ser arrays');
    for (const next of adjacent) {
      if (!parent.has(next)) {
        parent.set(next, node);
        queue.push(next);
      }
    }
  }
  return null;
}
