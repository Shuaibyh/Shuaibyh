import { sortModes } from './project-sort.mjs';
import { technologyKey } from './technology-filters.mjs';

const states = new Set(['all', 'public-demo', 'prototype', 'developing']);

export function parseFilterUrl(search = '') {
  const params = new URLSearchParams(search);
  const query = (params.get('q') ?? '').slice(0, 120);
  const state = params.get('estado') ?? 'all';
  const sort = params.get('orden') ?? 'original';
  const rawTechnology = params.get('tec') ?? '';
  const technology = rawTechnology.length > 80 ? 'all' : (technologyKey(rawTechnology) || 'all');
  return {
    query,
    status: states.has(state) ? state : 'all',
    sort: sortModes.includes(sort) ? sort : 'original',
    technology,
  };
}

export function buildFilterUrl(current, options = {}) {
  const url = new URL(current);
  for (const key of ['q', 'estado', 'orden', 'tec']) url.searchParams.delete(key);
  const query = String(options.query ?? '').trim().slice(0, 120);
  if (query) url.searchParams.set('q', query);
  if (states.has(options.status) && options.status !== 'all') url.searchParams.set('estado', options.status);
  if (sortModes.includes(options.sort) && options.sort !== 'original') url.searchParams.set('orden', options.sort);
  const technology = technologyKey(options.technology);
  if (technology && technology !== 'all' && technology.length <= 80) url.searchParams.set('tec', technology);
  return url.pathname + url.search + url.hash;
}
