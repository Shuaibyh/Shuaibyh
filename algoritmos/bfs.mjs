/** Recorrido BFS en grafo Map<vertice, vertice[]>; O(V+E). */
export function bfs(graph, start) {
  if (!(graph instanceof Map)) throw new TypeError('El grafo debe ser Map');
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  let head = 0;
  while (head < queue.length) {
    const node = queue[head++];
    order.push(node);
    const next = graph.get(node) ?? [];
    if (!Array.isArray(next)) throw new TypeError('Las adyacencias deben ser arrays');
    for (const neighbor of next) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}
