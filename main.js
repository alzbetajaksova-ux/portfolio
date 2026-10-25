import { jobs, projects } from './data.js';

const root = document.documentElement;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------------- Preferences (theme / palette / motion) ---------------- */
const prefs = (() => {
  try { return JSON.parse(localStorage.getItem('aj-prefs') || '{}'); } catch { return {}; }
})();
if (!prefs.motion && matchMedia('(prefers-reduced-motion: reduce)').matches) prefs.motion = 'off';

function applyPrefs() {
  root.dataset.theme = prefs.theme || root.dataset.theme || 'light';
  root.dataset.palette = prefs.palette || root.dataset.palette || 'sunset';
  root.dataset.motion = prefs.motion || 'on';
  $$('[data-set-theme]').forEach((b) => b.setAttribute('aria-checked', b.dataset.setTheme === root.dataset.theme));
  $$('[data-set-palette]').forEach((b) => b.setAttribute('aria-checked', b.dataset.setPalette === root.dataset.palette));
  $$('[data-set-motion]').forEach((b) => b.setAttribute('aria-checked', b.dataset.setMotion === root.dataset.motion));
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = getComputedStyle(root).getPropertyValue('--bg').trim();
}
function savePrefs() {
  try { localStorage.setItem('aj-prefs', JSON.stringify(prefs)); } catch {}
  applyPrefs();
}
applyPrefs();

const tuneBtn = $('.pill-tune');
const tuner = $('#tuner');
tuneBtn.addEventListener('click', () => {
  const open = tuner.hidden;
  tuner.hidden = !open;
  tuneBtn.setAttribute('aria-expanded', open);
});
document.addEventListener('click', (e) => {
  if (!tuner.hidden && !tuner.contains(e.target) && !tuneBtn.contains(e.target)) {
    tuner.hidden = true;
    tuneBtn.setAttribute('aria-expanded', false);
  }
});
tuner.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  if (b.dataset.setTheme) prefs.theme = b.dataset.setTheme;
  if (b.dataset.setPalette) prefs.palette = b.dataset.setPalette;
  if (b.dataset.setMotion) prefs.motion = b.dataset.setMotion;
  savePrefs();
});
const motionOn = () => root.dataset.motion !== 'off';

/* ---------------- Render experience ---------------- */
$('#jobs').innerHTML = jobs.map((j, i) => `
  <details class="job reveal">
    <summary data-cursor="Open">
      <span class="job-period">${esc(j.period)}</span>
      <span class="job-main">
        <span class="job-title">${esc(j.title)}${j.current ? ' <span class="chip chip-live"><span class="live-dot"></span>Current</span>' : ''}${j.badge ? ` <span class="chip chip-accent">↑ ${esc(j.badge)}</span>` : ''}</span>
        <span class="job-company"><img class="job-mini" src="${j.logo}" alt="" loading="lazy" />${esc(j.company)}</span>
      </span>
      <span class="job-loc">${esc(j.location)}</span>
      <span class="s-plus" aria-hidden="true"></span>
    </summary>
    <div class="job-body">
      <span aria-hidden="true"></span>
      <div>
        <p>${esc(j.description)}</p>
        <h4>Key Responsibilities</h4>
        <ul class="bullets">${j.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
      </div>
    </div>
  </details>`).join('');

/* ---------------- Render projects ---------------- */
$('#project-grid').innerHTML = projects.map((p, i) => `
  <article class="project reveal">
    <button class="project-card" type="button" data-project="${p.id}" data-cursor="View" aria-label="View details: ${esc(p.title)}">
      <span class="project-visual">
        <span class="project-num" aria-hidden="true">0${i + 1}</span>
        <img src="${p.logo}" alt="${esc(p.title)} logo" loading="lazy" />
        <span class="project-cta">View details ↗</span>
      </span>
    </button>
    <div class="project-meta">
      <h3>${esc(p.title)}</h3>
      <p class="project-role">${esc(p.role)}</p>
      <p class="muted">${esc(p.shortDescription)}</p>
    </div>
  </article>`).join('');

/* ---------------- Dialogs ---------------- */
const projDialog = $('#project-dialog');
function openProject(id) {
  const p = projects.find((x) => x.id === id);
  if (!p) return;
  $('.sheet-inner', projDialog).innerHTML = `
    <button class="sheet-close" type="button" data-close aria-label="Close">✕</button>
    <header class="sheet-hero project-hero">
      <img src="${p.logo}" alt="${esc(p.title)} logo" />
      <div>
        <h3 id="pd-title">${esc(p.title)}</h3>
        <p class="sheet-role">${esc(p.role)}</p>
      </div>
    </header>
    <div class="sheet-body">
      <h4>Project Overview</h4>
      <p>${esc(p.overview)}</p>
      <h4>Key Achievements</h4>
      <ul class="bullets">${p.achievements.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
      <h4>Technical Implementation</h4>
      <div class="tech-grid">${p.technicalDetails.map((t) => `<div><h5>${esc(t.title)}</h5><p>${esc(t.description)}</p></div>`).join('')}</div>
      ${p.githubLink ? `<a class="btn btn-ink" href="${p.githubLink}" target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>` : ''}
    </div>`;
  openDialog(projDialog);
}
function openDialog(d) {
  d.showModal();
  d.scrollTop = 0;
  document.body.classList.add('locked');
}
$$('dialog.sheet').forEach((d) => {
  d.addEventListener('click', (e) => {
    if (e.target === d || e.target.closest('[data-close]')) d.close();
  });
  d.addEventListener('close', () => document.body.classList.remove('locked'));
});
document.addEventListener('click', (e) => {
  const card = e.target.closest('[data-project]');
  if (card) openProject(card.dataset.project);
  const opener = e.target.closest('[data-open]');
  if (opener) openDialog(document.getElementById(opener.dataset.open));
});

/* ---------------- Small things: clock, year ---------------- */
const clock = $('.clock');
const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Bratislava' });
const tick = () => { clock.textContent = fmt.format(new Date()); };
tick();
setInterval(tick, 15000);
$('.year').textContent = new Date().getFullYear();

/* ---------------- Word-by-word headings ---------------- */
$$('[data-words], [data-scrub]').forEach((el) => {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w, i) => `<span class="w" style="--i:${i}"><span>${esc(w)}</span></span>`).join(' ');
});

/* ---------------- Reveal on scroll ---------------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    io.unobserve(en.target);
    const counter = en.target.querySelector?.('[data-count]');
    if (counter) $$('[data-count]', en.target).forEach(countUp);
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
$$('.reveal, [data-words], .lang-list').forEach((el) => io.observe(el));

function countUp(el) {
  const to = +el.dataset.count;
  if (!motionOn()) { el.textContent = to; return; }
  const t0 = performance.now();
  const step = (t) => {
    const k = Math.min(1, (t - t0) / 1200);
    el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------------- Floating pill appears after hero ---------------- */
const pill = $('.pill');
const hero = $('.hero');
new IntersectionObserver(([en]) => {
  pill.classList.toggle('show', !en.isIntersecting);
}, { threshold: 0.15 }).observe(hero);

/* ---------------- Pointer-driven motion ---------------- */
const art = $('.art');
const progress = $('.progress');
const drifters = $$('[data-drift]');
const scrubs = $$('[data-scrub]');
const cursor = $('.cursor');
const cursorLabel = $('.cursor-label');

const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
const smooth = { x: pointer.x, y: pointer.y };
const cur = { x: pointer.x, y: pointer.y };
let scrollY = 0;

addEventListener('pointermove', (e) => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  root.classList.add('has-pointer');
}, { passive: true });
addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

function frame() {
  const lerp = motionOn() ? 0.08 : 1;
  smooth.x += (pointer.x - smooth.x) * lerp;
  smooth.y += (pointer.y - smooth.y) * lerp;
  cur.x += (pointer.x - cur.x) * 0.35;
  cur.y += (pointer.y - cur.y) * 0.35;

  const nx = (smooth.x / innerWidth) * 2 - 1;
  const ny = (smooth.y / innerHeight) * 2 - 1;

  if (scrollY < innerHeight * 1.2) {
    hero.style.setProperty('--nx', motionOn() ? nx.toFixed(4) : 0);
    hero.style.setProperty('--ny', motionOn() ? ny.toFixed(4) : 0);
    const r = art.getBoundingClientRect();
    art.style.setProperty('--mx', `${((smooth.x - r.left) / r.width) * 100}%`);
    art.style.setProperty('--my', `${((smooth.y - r.top) / r.height) * 100}%`);
  }

  // Scroll-linked motion: progress bar, horizontal drift, word-by-word scrub
  const docH = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${docH > 0 ? scrollY / docH : 0})`;
  drifters.forEach((el) => {
    const r = el.parentElement.getBoundingClientRect();
    if (r.bottom < -200 || r.top > innerHeight + 200) return;
    const offset = Math.max(-innerHeight, Math.min(innerHeight, r.top + r.height / 2 - innerHeight / 2));
    el.style.transform = motionOn() ? `translate3d(${offset * +el.dataset.drift}px, 0, 0)` : '';
  });
  scrubs.forEach((el) => {
    const r = el.getBoundingClientRect();
    const k = motionOn() ? Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (innerHeight * 0.55))) : 1;
    const words = el.children;
    const lit = Math.round(k * words.length);
    for (let i = 0; i < words.length; i++) words[i].classList.toggle('lit', i < lit);
  });

  if (finePointer) {
    cursor.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

if (finePointer) {
  root.classList.add('fine');
  document.addEventListener('pointerover', (e) => {
    const t = e.target.closest('a, button, summary, [data-cursor]');
    cursor.classList.toggle('big', !!t);
    cursorLabel.textContent = t?.dataset.cursor || '';
    cursor.classList.toggle('labeled', !!t?.dataset.cursor);
  });
  document.addEventListener('pointerleave', () => cursor.classList.add('gone'));
  document.addEventListener('pointerenter', () => cursor.classList.remove('gone'));

  // Magnetic buttons
  $$('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      if (!motionOn()) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });

  // Tilt project cards toward the pointer
  $$('.project-card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      if (!motionOn()) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--rx', `${(0.5 - py) * 10}deg`);
      card.style.setProperty('--ry', `${(px - 0.5) * 12}deg`);
      card.style.setProperty('--sx', `${px * 100}%`);
      card.style.setProperty('--sy', `${py * 100}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}
