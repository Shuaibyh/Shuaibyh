/** Distancias mínimas con pesos negativos y detección de ciclos alcanzables. O(VE). */
export function bellmanFord(graph, start) {
  if (!(graph instanceof Map)) throw new TypeError('Se requiere grafo Map');
  const vertices = new Set([start]);
  const edges = [];
  for (const [from, adjacent] of graph) {
    vertices.add(from);
    if (!Array.isArray(adjacent)) throw new TypeError('Adyacencias inválidas');
    for (const edge of adjacent) {
      if (!edge || !Number.isFinite(edge.weight)) throw new TypeError('Peso no finito');
      vertices.add(edge.to);
      edges.push({ from, to: edge.to, weight: edge.weight });
    }
  }
  const distances = new Map([...vertices].map(v => [v, Infinity]));
  distances.set(start, 0);
  for (let pass = 1; pass < vertices.size; pass++) {
    let changed = false;
    for (const { from, to, weight } of edges) {
      const candidate = distances.get(from) + weight;
      if (candidate < distances.get(to)) {
        distances.set(to, candidate);
        changed = true;
      }
    }
    if (!changed) break;
  }
  for (const { from, to, weight } of edges) {
    if (distances.get(from) + weight < distances.get(to)) {
      throw new Error('Ciclo negativo alcanzable desde el origen');
    }
  }
  return distances;
}
