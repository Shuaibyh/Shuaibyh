/** Componentes conexas de grafo no dirigido Map<nodo, nodo[]>; O(V+E). */
export function connectedComponents(graph) {
  if (!(graph instanceof Map)) throw new TypeError('Se requiere un grafo Map');
  const nodes = new Set(graph.keys());
  for (const adjacent of graph.values()) {
    if (!Array.isArray(adjacent)) throw new TypeError('Adyacencias deben ser arrays');
    for (const node of adjacent) nodes.add(node);
  }
  const seen = new Set();
  const components = [];
  for (const start of nodes) {
    if (seen.has(start)) continue;
    const component = [];
    const pending = [start];
    seen.add(start);
    while (pending.length) {
      const node = pending.pop();
      component.push(node);
      for (const next of graph.get(node) ?? []) {
        if (!seen.has(next)) {
          seen.add(next);
          pending.push(next);
        }
      }
    }
    components.push(component);
  }
  return components;
}
