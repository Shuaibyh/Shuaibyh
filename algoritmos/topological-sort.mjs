/** Orden topológico de grafo dirigido acíclico Map<nodo, nodo[]>; O(V+E). */
export function topologicalSort(graph) {
  if (!(graph instanceof Map)) throw new TypeError('El grafo debe ser Map');
  const indegree = new Map();
  for (const [node, neighbors] of graph) {
    if (!Array.isArray(neighbors)) throw new TypeError('Adyacencias inválidas');
    if (!indegree.has(node)) indegree.set(node, 0);
    for (const neighbor of neighbors) indegree.set(neighbor, (indegree.get(neighbor) ?? 0) + 1);
  }
  const queue = [...indegree].filter(([, degree]) => degree === 0).map(([node]) => node);
  const order = [];
  let head = 0;
  while (head < queue.length) {
    const node = queue[head++];
    order.push(node);
    for (const neighbor of graph.get(node) ?? []) {
      const nextDegree = indegree.get(neighbor) - 1;
      indegree.set(neighbor, nextDegree);
      if (nextDegree === 0) queue.push(neighbor);
    }
  }
  if (order.length !== indegree.size) throw new Error('El grafo contiene un ciclo');
  return order;
}
