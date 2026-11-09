import { statusLabel } from './project-search.mjs';

export function safeHttpsUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || !url.hostname) return null;
    return url.href;
  } catch {
    return null;
  }
}

export function cardModel(project) {
  const links = [];
  const repository = safeHttpsUrl(project.repository);
  if (repository) links.push({ label: 'Código en GitHub', href: repository });
  const demo = safeHttpsUrl(project.demo);
  if (demo) links.push({ label: 'Ver demostración', href: demo });
  return {
    title: String(project.name ?? ''),
    summary: String(project.summary ?? ''),
    status: statusLabel(project.status),
    technologies: Array.isArray(project.technologies)
      ? project.technologies.filter(t => typeof t === 'string')
      : [],
    links,
  };
}
