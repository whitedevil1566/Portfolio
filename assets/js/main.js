(() => {
  window.scrollTo(0, 0);
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];
  const body = document.body;


  // Premium cursor + spotlight on fine pointers
  if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const cursor = document.createElement('div');
    const glow = document.createElement('div');
    cursor.className = 'cursor-dot'; glow.className = 'cursor-glow';
    document.body.append(cursor, glow);
    let mx = -100, my = -100, gx = -100, gy = -100;
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; document.documentElement.style.setProperty('--mx', `${e.clientX}px`); document.documentElement.style.setProperty('--my', `${e.clientY}px`); }, {passive:true});
    const tick = () => { gx += (mx-gx)*.14; gy += (my-gy)*.14; cursor.style.transform = `translate3d(${mx}px,${my}px,0)`; glow.style.transform = `translate3d(${gx}px,${gy}px,0)`; requestAnimationFrame(tick); };
    tick();
    qa('a,button,.project-card,.post-card').forEach(el => {
      el.addEventListener('pointerenter', () => document.body.classList.add('cursor-active'));
      el.addEventListener('pointerleave', () => document.body.classList.remove('cursor-active'));
    });
  }

  // Scroll UI
  const progress = q('#scrollProgress');
  const header = q('#siteHeader');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    header.classList.toggle('scrolled', scrollY > 10);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Reveal animation
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  qa('.reveal').forEach(el => io.observe(el));

  // Tilt card + spotlight
  const card = q('#tiltCard');
  const stage = q('.hero-stage');
  if (card && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect(); const x = (e.clientX-r.left)/r.width-.5; const y = (e.clientY-r.top)/r.height-.5;
      card.style.transform = `perspective(1200px) rotateX(${(-y*8).toFixed(2)}deg) rotateY(${(x*10).toFixed(2)}deg) translateZ(0)`;
    });
    stage.addEventListener('pointerleave', () => card.style.transform = '');
  }
  // Magnetic buttons
  if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    qa('.magnetic').forEach(btn => btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect(); const x = (e.clientX-r.left-r.width/2)/r.width; const y = (e.clientY-r.top-r.height/2)/r.height;
      btn.style.transform = `translate(${x*8}px, ${y*6}px)`;
    }));
    qa('.magnetic').forEach(btn => btn.addEventListener('pointerleave', () => btn.style.transform=''));
  }

  // GitHub public data
  const username = 'whitedevil1566';
  const ghAvatar = q('#ghAvatar'), ghName = q('#ghName'), ghBio = q('#ghBio'), ghRepos = q('#ghRepos'), ghFollowers = q('#ghFollowers'), ghFollowing = q('#ghFollowing'), repoList = q('#repoList');
  const loadGitHub = async () => {
    try {
      const [uRes, rRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, { headers: { Accept:'application/vnd.github+json' } }),
        fetch(`https://api.github.com/users/${username}/repos?per_page=6&sort=updated`, { headers: { Accept:'application/vnd.github+json' } })
      ]);
      if (!uRes.ok || !rRes.ok) throw new Error('GitHub API unavailable');
      const u = await uRes.json(); const repos = await rRes.json();
      ghAvatar.src = u.avatar_url; ghName.textContent = `${u.name || username} / ${username}`; ghBio.textContent = u.bio || 'Public GitHub profile';
      ghRepos.textContent = u.public_repos; ghFollowers.textContent = u.followers; ghFollowing.textContent = u.following;
      repoList.innerHTML = repos.length ? repos.map(r => `<article class="repo"><div><strong>${escapeHtml(r.name)}</strong><p>${escapeHtml(r.description || 'Public repository')}</p></div><a href="${r.html_url}" target="_blank" rel="noopener">Open ↗</a></article>`).join('') : '<div class="repo-placeholder">No public repositories found.</div>';
    } catch (err) {
      ghBio.textContent = 'GitHub data could not be loaded right now.';
      repoList.innerHTML = '<div class="repo-placeholder">See the public profile for the latest repositories.</div>';
    }
  };
  const escapeHtml = (s='') => s.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'}[c]));
  loadGitHub();

  // WhatsApp form
  const form = q('#contactForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const name = q('#name')?.value.trim() || '';
    const project = q('#project')?.value.trim() || '';
    const message = q('#message')?.value.trim() || '';
    const text = `Hi Abdullah!\n\nName: ${name}\nProject: ${project || 'Not specified'}\n\n${message}`;
    open(`https://wa.me/923278467464?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });

  // Command palette
  const overlay = q('#cmdOverlay'), input = q('#cmdInput'), items = qa('#cmdItems a');
  const closeCmd = () => { overlay.hidden = true; body.classList.remove('no-scroll'); };
  const openCmd = () => { overlay.hidden = false; body.classList.add('no-scroll'); setTimeout(() => input.focus(), 20); };
  q('#commandOpen')?.addEventListener('click', openCmd); q('#commandClose')?.addEventListener('click', closeCmd);
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeCmd(); });
  input?.addEventListener('input', () => { const term = input.value.toLowerCase().trim(); items.forEach(i => { i.hidden = term && !(i.textContent.toLowerCase().includes(term) || (i.dataset.keywords||'').includes(term)); }); });
  items.forEach(i => i.addEventListener('click', () => closeCmd()));
  addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase()==='k') { e.preventDefault(); openCmd(); } if (e.key==='Escape' && !overlay.hidden) closeCmd(); });

  // Mobile sheet
  const sheet = q('#mobileSheet');
  q('#mobileOpen')?.addEventListener('click', () => { sheet.hidden=false; body.classList.add('no-scroll'); });
  q('#mobileClose')?.addEventListener('click', () => { sheet.hidden=true; body.classList.remove('no-scroll'); });
  qa('#mobileSheet a').forEach(a => a.addEventListener('click', () => { sheet.hidden=true; body.classList.remove('no-scroll'); }));


  // Active navigation state
  const navAnchors = qa('.nav-links a[href^="#"]');
  const navSections = navAnchors.map(a => q(a.getAttribute('href'))).filter(Boolean);
  if (navSections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      });
    }, {rootMargin:'-35% 0px -55% 0px', threshold:0});
    navSections.forEach(sec => sectionObserver.observe(sec));
  }

  // Pointer spotlight for premium surfaces
  if (matchMedia('(pointer:fine)').matches) {
    qa('.project-card,.feature-project,.cap-item,.github-panel,.build-log,.post-card,.contact-panel').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX-r.left}px`);
        el.style.setProperty('--my', `${e.clientY-r.top}px`);
      }, {passive:true});
    });
  }

  // Lightweight page-transition feedback for internal navigation
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    qa('a[href]:not([target="_blank"])').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:') || a.hasAttribute('download')) return;
      a.addEventListener('click', e => {
        const url = new URL(href, location.href);
        if (url.origin !== location.origin) return;
        e.preventDefault();
        document.body.classList.add('page-leaving');
        setTimeout(() => { location.href = url.href; }, 170);
      });
    });
  }

  // Service worker for PWA/offline shell
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js').catch(()=>{});
})();
