/** Distancias mínimas desde start en grafo Map<nodo, {to,weight}[]>, pesos no negativos. O(V^2+E). */
export function dijkstra(graph, start) {
  if (!(graph instanceof Map)) throw new TypeError('El grafo debe ser Map');
  const nodes = new Set([start]);
  for (const [node, edges] of graph) {
    nodes.add(node);
    if (!Array.isArray(edges)) throw new TypeError('Adyacencias inválidas');
    for (const edge of edges) {
      if (!edge || !Number.isFinite(edge.weight) || edge.weight < 0) {
        throw new RangeError('Los pesos deben ser finitos y no negativos');
      }
      nodes.add(edge.to);
    }
  }
  const distance = new Map([...nodes].map(node => [node, Infinity]));
  distance.set(start, 0);
  const visited = new Set();
  while (visited.size < nodes.size) {
    let closest;
    let shortest = Infinity;
    for (const node of nodes) {
      if (!visited.has(node) && distance.get(node) < shortest) {
        closest = node;
        shortest = distance.get(node);
      }
    }
    if (closest === undefined) break;
    visited.add(closest);
    for (const { to, weight } of graph.get(closest) ?? []) {
      const candidate = shortest + weight;
      if (candidate < distance.get(to)) distance.set(to, candidate);
    }
  }
  return distance;
}
