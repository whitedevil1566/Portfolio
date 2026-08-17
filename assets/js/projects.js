(async () => {
  const mount = document.querySelector('[data-project-list]');
  if (!mount) return;
  try {
    const data = await fetch('../assets/data/projects.json').then(r => r.json());
    mount.innerHTML = data.map(p => `
      <article class="directory-card">
        <div><span>${p.index}</span><small>${p.type}</small><h2>${p.name}</h2><p>${p.summary}</p></div>
        <div class="directory-meta"><span>${p.stack.join(' · ')}</span><a class="button button-primary button-small" href="${p.caseStudy}">Case study ↗</a><a href="${p.url}" target="_blank" rel="noopener">Live ↗</a></div>
      </article>`).join('');
  } catch { mount.innerHTML = '<p>Projects are temporarily unavailable. Please use the homepage links.</p>'; }
})();
