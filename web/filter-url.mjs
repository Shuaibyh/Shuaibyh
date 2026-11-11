import { sortModes } from './project-sort.mjs';

const states = new Set(['all', 'public-demo', 'prototype', 'developing']);

export function parseFilterUrl(search = '') {
  const params = new URLSearchParams(search);
  const query = (params.get('q') ?? '').slice(0, 120);
  const state = params.get('estado') ?? 'all';
  const sort = params.get('orden') ?? 'original';
  return {
    query,
    status: states.has(state) ? state : 'all',
    sort: sortModes.includes(sort) ? sort : 'original',
  };
}

export function buildFilterUrl(current, options = {}) {
  const url = new URL(current);
  for (const key of ['q', 'estado', 'orden']) url.searchParams.delete(key);
  const query = String(options.query ?? '').trim().slice(0, 120);
  if (query) url.searchParams.set('q', query);
  if (states.has(options.status) && options.status !== 'all') url.searchParams.set('estado', options.status);
  if (sortModes.includes(options.sort) && options.sort !== 'original') url.searchParams.set('orden', options.sort);
  return url.pathname + url.search + url.hash;
}
