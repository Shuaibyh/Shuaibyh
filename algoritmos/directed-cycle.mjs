/** Detecta ciclos dirigidos con coloreado DFS iterativo, O(V+E). */
export function hasDirectedCycle(graph) {
  if (!(graph instanceof Map)) throw new TypeError('Se requiere grafo Map');
  const color = new Map();
  const nodes = new Set(graph.keys());
  for (const adjacent of graph.values()) {
    if (!Array.isArray(adjacent)) throw new TypeError('Adyacencias deben ser arrays');
    for (const node of adjacent) nodes.add(node);
  }
  for (const start of nodes) {
    if (color.get(start)) continue;
    const stack = [{ node: start, index: 0 }];
    color.set(start, 1);
    while (stack.length) {
      const frame = stack.at(-1);
      const adjacent = graph.get(frame.node) ?? [];
      if (frame.index >= adjacent.length) {
        color.set(frame.node, 2);
        stack.pop();
        continue;
      }
      const neighbor = adjacent[frame.index++];
      const state = color.get(neighbor);
      if (state === 1) return true;
      if (!state) {
        color.set(neighbor, 1);
        stack.push({ node: neighbor, index: 0 });
      }
    }
  }
  return false;
}
