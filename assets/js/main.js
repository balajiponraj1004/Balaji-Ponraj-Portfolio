/* ============================================================
   BALAJI PONRAJ — PORTFOLIO INTERACTIONS
   ============================================================ */

'use strict';

/* ── Loader ── */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1900);
  });
  document.body.style.overflow = 'hidden';
})();

/* ── Custom Cursor ── */
(function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.addEventListener('mousedown', () => dot.classList.add('clicking'));
  document.addEventListener('mouseup',   () => dot.classList.remove('clicking'));

  const hoverEls = document.querySelectorAll('a, button, [data-magnetic], .proj-card, .tl-card, .cred-card, .contact-link, .filter-btn, .skill-tag');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
  });

  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();

/* ── Scroll Progress ── */
(function initProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
})();

/* ── Navigation ── */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Active section link */
  const sections = document.querySelectorAll('.section-anchor');
  const links    = document.querySelectorAll('.nav-links a');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => obs.observe(s));

  /* Mobile nav */
  const burger = document.getElementById('nav-burger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-links a');

  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      document.body.style.overflow = open ? 'hidden' : '';
      const spans = burger.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    mobileLinks.forEach(l => {
      l.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
        const spans = burger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }
})();

/* ── Scroll Reveal ── */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => obs.observe(el));
})();

/* ── Counter Animations ── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const dur    = 1800;
      const start  = performance.now();
      const tick   = now => {
        const p    = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(ease * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
})();

/* ── Timeline Active State ── */
(function initTimeline() {
  const items = document.querySelectorAll('.tl-item');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      e.target.classList.toggle('active', e.isIntersecting);
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  items.forEach(item => obs.observe(item));
})();

/* ── Project Filter ── */
(function initFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.proj-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.opacity    = show ? '1' : '0.25';
        card.style.transform  = show ? '' : 'scale(0.97)';
        card.style.pointerEvents = show ? '' : 'none';
      });
    });
  });
})();

/* ── Smooth anchor scroll ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ── Hero parallax (subtle) ── */
(function initParallax() {
  const hero = document.getElementById('hero');
  const grid = hero && hero.querySelector('.hero-grid');
  if (!grid) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      grid.style.transform = `translateY(${y * 0.25}px)`;
    }
  }, { passive: true });
})();

/* ── Marquee duplicate ── */
(function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  track.innerHTML += track.innerHTML;
})();

/* ── Typed headline rotation ── */
(function initTyped() {
  const el = document.getElementById('hero-typed');
  if (!el) return;
  const phrases = [
    'Branding. Marketing. Motion.',
    'Strategy. Clarity. Impact.',
    'Design that drives results.',
    'Vision translated into visuals.'
  ];
  let idx = 0, charIdx = 0, deleting = false;
  const typeStep = () => {
    const cur = phrases[idx];
    if (!deleting) {
      el.textContent = cur.slice(0, charIdx++);
      if (charIdx > cur.length) { deleting = true; setTimeout(typeStep, 2200); return; }
    } else {
      el.textContent = cur.slice(0, charIdx--);
      if (charIdx < 0) { deleting = false; idx = (idx + 1) % phrases.length; charIdx = 0; setTimeout(typeStep, 400); return; }
    }
    setTimeout(typeStep, deleting ? 35 : 65);
  };
  setTimeout(typeStep, 2000);
})();

/* ── Contact form submission (mock) ── */
(function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const btn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#22C55E';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; form.reset(); }, 3000);
    }
  });
})();
