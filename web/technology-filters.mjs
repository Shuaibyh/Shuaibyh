const collator = new Intl.Collator('es', {sensitivity:'base',numeric:true});

export function technologyKey(value) {
  return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
}

export function technologyOptions(projects) {
  const count = new Map();
  for (const project of projects) {
    if (!Array.isArray(project.technologies)) continue;
    const used = new Set();
    for (const entry of project.technologies) {
      if (typeof entry !== 'string') continue;
      const key = technologyKey(entry);
      if (!key || used.has(key)) continue;
      used.add(key);
      const previous = count.get(key);
      count.set(key, {value:key, label:previous?.label ?? entry.trim(), count:(previous?.count ?? 0)+1});
    }
  }
  return [...count.values()].sort((a,b)=>collator.compare(a.label,b.label));
}

export function hasTechnology(project, selected) {
  if (!selected || selected === 'all') return true;
  if (!Array.isArray(project.technologies)) return false;
  const wanted = technologyKey(selected);
  return project.technologies.some(t => typeof t === 'string' && technologyKey(t) === wanted);
}
