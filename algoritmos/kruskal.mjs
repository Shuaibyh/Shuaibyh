import { UnionFind } from './union-find.mjs';

/** Bosque de expansión mínima por Kruskal. Si es conexo, es árbol. O(E log E). */
export function kruskal(vertices, edges) {
  if (!Array.isArray(vertices) || !Array.isArray(edges)) throw new TypeError('Se requieren dos arrays');
  const unique = [...new Set(vertices)];
  const known = new Set(unique);
  const sorted = [];
  for (const edge of edges) {
    if (!edge || !known.has(edge.from) || !known.has(edge.to) || !Number.isFinite(edge.weight)) {
      throw new TypeError('Arista o vértices inválidos');
    }
    sorted.push(edge);
  }
  sorted.sort((a, b) => a.weight - b.weight);
  const sets = new UnionFind(unique);
  const selected = [];
  let weight = 0;
  for (const edge of sorted) {
    if (sets.union(edge.from, edge.to)) {
      selected.push({ from: edge.from, to: edge.to, weight: edge.weight });
      weight += edge.weight;
    }
  }
  return { edges: selected, weight, connected: unique.length <= 1 || sets.componentCount === 1 };
}
