// Pure, dependency-free presentation utilities for the public portfolio catalog.

function projectsFrom(data) {
  if (!data || !Array.isArray(data.projects)) throw new TypeError('Se esperaba un catálogo con projects.');
  return data.projects;
}

function safeCell(value) {
  const s = String(value ?? '');
  // Avoid formula execution when someone opens a CSV in spreadsheet software.
  return /^[\t\r\n ]*[=+\-@]/.test(s) ? "'" + s : s;
}

export function csvCell(value) {
  const s = safeCell(value);
  return /[",\r\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
}

function projectRow(p) {
  return [
    p.name,
    p.status,
    p.repository,
    p.demo ?? '',
    Array.isArray(p.technologies) ? p.technologies.join('; ') : '',
    p.case_study,
  ];
}

export function toCsv(data) {
  const headings = ['Proyecto', 'Estado', 'Repositorio', 'Demo', 'Tecnologías', 'Estudio'];
  const lines = [headings, ...projectsFrom(data).map(projectRow)];
  return lines.map(row => row.map(csvCell).join(',')).join('\n') + '\n';
}

function mdCell(value) {
  return String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ').replaceAll('\r', ' ');
}

export function toMarkdown(data) {
  const header = '| Proyecto | Estado | Repositorio | Demo |\n| --- | --- | --- | --- |';
  const rows = projectsFrom(data).map(p => {
    const repo = typeof p.repository === 'string' ? p.repository : '';
    const name = mdCell(p.name).replaceAll(']', '\\]');
    const demo = p.demo ? '[Ver demo](' + p.demo + ')' : 'Sin demo pública';
    return '| [' + name + '](' + repo + ') | ' + mdCell(p.status) + ' | ' + mdCell(repo) + ' | ' + demo + ' |';
  });
  return [header, ...rows].join('\n') + '\n';
}

export function toPublicJson(data) {
  const items = projectsFrom(data).map(p => ({
    id: p.id,
    name: p.name,
    status: p.status,
    repository: p.repository,
    demo: p.demo ?? null,
    summary: p.summary,
    technologies: [...(p.technologies ?? [])],
    case_study: p.case_study,
  }));
  return JSON.stringify({ schema_version: 1, projects: items }, null, 2) + '\n';
}
