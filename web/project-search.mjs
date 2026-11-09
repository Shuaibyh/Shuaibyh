export const statusLabels = Object.freeze({
  'public-demo': 'Demostración pública',
  developing: 'En desarrollo',
  prototype: 'Prototipo',
});

export function normalizeQuery(input) {
  return String(input ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

export function filterProjects(projects, options = {}) {
  const query = normalizeQuery(options.query);
  const status = options.status ?? 'all';
  return projects.filter(project => {
    if (status !== 'all' && project.status !== status) return false;
    if (!query) return true;
    const haystack = normalizeQuery([
      project.name, project.summary, ...(project.technologies ?? []),
    ].join(' '));
    return haystack.includes(query);
  });
}

export function statusLabel(status) {
  return statusLabels[status] || 'Estado por confirmar';
}
