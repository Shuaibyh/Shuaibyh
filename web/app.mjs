import { filterProjects } from './project-search.mjs';
import { cardModel } from './project-view.mjs';
import { sortProjects } from './project-sort.mjs';
import { buildFilterUrl, parseFilterUrl } from './filter-url.mjs';

const query = document.getElementById('query');
const status = document.getElementById('status');
const reset = document.getElementById('reset');
const sort = document.getElementById('sort');
const catalogNode = document.getElementById('catalog');
const count = document.getElementById('count');
const empty = document.getElementById('empty');
const error = document.getElementById('error');

let projects = [];

function restoreFromUrl() {
  const filters = parseFilterUrl(window.location.search);
  query.value = filters.query;
  status.value = filters.status;
  sort.value = filters.sort;
}
restoreFromUrl();

function externalLink({ label, href }) {
  const link = document.createElement('a');
  link.textContent = label;
  link.href = href;
  link.rel = 'noopener noreferrer';
  link.target = '_blank';
  return link;
}

function projectCard(project) {
  const model = cardModel(project);
  const card = document.createElement('article');
  card.className = 'project-card';
  const state = document.createElement('span');
  state.className = 'pill';
  state.textContent = model.status;

  const title = document.createElement('h3');
  title.textContent = model.title;
  const summary = document.createElement('p');
  summary.textContent = model.summary;
  const tags = document.createElement('ul');
  tags.className = 'tag-list';
  tags.setAttribute('aria-label', 'Tecnologías utilizadas');
  for (const item of model.technologies) {
    const tag = document.createElement('li');
    tag.textContent = item;
    tags.append(tag);
  }
  const links = document.createElement('div');
  links.className = 'project-links';
  for (const destination of model.links) links.append(externalLink(destination));

  card.append(state, title, summary, tags, links);
  return card;
}

function updateResults(writeUrl = false) {
  const results = sortProjects(filterProjects(projects, { query: query.value, status: status.value }), sort.value);
  if (writeUrl) {
    window.history.replaceState(null, '', buildFilterUrl(window.location.href, {
      query: query.value, status: status.value, sort: sort.value,
    }));
  }
  const nodes = results.map(projectCard);
  catalogNode.replaceChildren(...nodes);
  count.textContent = results.length + (results.length === 1 ? ' proyecto' : ' proyectos');
  empty.hidden = results.length > 0;
}

async function load() {
  try {
    const response = await fetch(new URL('../data/projects.json', import.meta.url), { cache: 'no-store' });
    if (!response.ok) throw new Error('No se pudo cargar el catálogo');
    const payload = await response.json();
    if (!Array.isArray(payload.projects)) throw new Error('Catálogo incompatible');
    projects = payload.projects;
    updateResults();
  } catch {
    error.hidden = false;
    count.textContent = 'Catálogo no disponible';
    reset.disabled = true;
    query.disabled = true;
    status.disabled = true;
    sort.disabled = true;
  }
}

query.addEventListener('input', () => updateResults(true));
status.addEventListener('change', () => updateResults(true));
sort.addEventListener('change', () => updateResults(true));
window.addEventListener('popstate', () => { restoreFromUrl(); if (!error.hidden) return; updateResults(); });
reset.addEventListener('click', () => {
  query.value = '';
  status.value = 'all';
  sort.value = 'original';
  updateResults(true);
  query.focus();
});

await load();
