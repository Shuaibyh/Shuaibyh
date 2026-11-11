const weights = new Map([['public-demo', 0], ['developing', 1], ['prototype', 2]]);
const labels = new Intl.Collator('es', { sensitivity: 'base', numeric: true });

export const sortModes = Object.freeze(['original', 'name-asc', 'name-desc', 'status']);

export function sortProjects(projects, mode = 'original') {
  if (!sortModes.includes(mode)) return [...projects];
  const indexed = projects.map((project, index) => ({ project, index }));
  if (mode === 'original') return indexed.map(item => item.project);
  indexed.sort((a, b) => {
    let result = 0;
    if (mode === 'name-asc') result = labels.compare(a.project.name ?? '', b.project.name ?? '');
    if (mode === 'name-desc') result = labels.compare(b.project.name ?? '', a.project.name ?? '');
    if (mode === 'status') result = (weights.get(a.project.status) ?? 99) - (weights.get(b.project.status) ?? 99);
    return result || a.index - b.index;
  });
  return indexed.map(item => item.project);
}
