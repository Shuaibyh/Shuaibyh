/** DFS iterativo en Map<vertice, vertice[]>; O(V+E). */
export function dfs(graph, start) {
  if (!(graph instanceof Map)) throw new TypeError('El grafo debe ser Map');
  const visited = new Set();
  const pending = [start];
  const order = [];
  while (pending.length) {
    const node = pending.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    const next = graph.get(node) ?? [];
    if (!Array.isArray(next)) throw new TypeError('Las adyacencias deben ser arrays');
    for (let i = next.length - 1; i >= 0; i--) {
      if (!visited.has(next[i])) pending.push(next[i]);
    }
  }
  return order;
}
