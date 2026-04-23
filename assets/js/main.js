/* AnvithBizCap — main.js
   Navigation, scroll reveal, counters, mega-menu.
   All animations respect prefers-reduced-motion.
*/
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Scroll state for nav ----------
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle('is-scrolled', y > 12);
    lastScroll = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mega menu (click + hover) ----------
  document.querySelectorAll('.nav-links > li.has-mega').forEach((li) => {
    const btn = li.querySelector('button.nav-top');
    if (!btn) return;

    // Hover behaviour for desktop
    let hideTimeout;
    const open = () => {
      clearTimeout(hideTimeout);
      document.querySelectorAll('.nav-links > li.has-mega.is-open').forEach((x) => x !== li && x.classList.remove('is-open'));
      li.classList.add('is-open');
    };
    const close = (delay = 120) => {
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => li.classList.remove('is-open'), delay);
    };

    li.addEventListener('mouseenter', open);
    li.addEventListener('mouseleave', () => close(160));
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      li.classList.toggle('is-open');
    });
    btn.setAttribute('aria-haspopup', 'true');
  });

  // Close mega on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links')) {
      document.querySelectorAll('.nav-links > li.has-mega.is-open').forEach((li) => li.classList.remove('is-open'));
    }
  });

  // Close mega on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-links > li.has-mega.is-open').forEach((li) => li.classList.remove('is-open'));
      const drawer = document.querySelector('.mobile-drawer.is-open');
      if (drawer) drawer.classList.remove('is-open');
    }
  });

  // ---------- Mobile drawer ----------
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => drawer.classList.toggle('is-open'));
    drawer.querySelectorAll('[data-close]').forEach((el) =>
      el.addEventListener('click', () => drawer.classList.remove('is-open'))
    );
  }

  // ---------- Scroll reveal ----------
  if (!reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  }

  // ---------- Count-up for numbers with data-count ----------
  function animateNumber(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const duration = parseInt(el.getAttribute('data-duration') || '1400', 10);
    if (isNaN(target)) return;

    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const v = target * easeOut(progress);
      el.textContent = prefix + v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  if (!reduced && 'IntersectionObserver' in window) {
    const nio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateNumber(e.target);
            nio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll('[data-count]').forEach((el) => nio.observe(el));
  } else {
    document.querySelectorAll('[data-count]').forEach((el) => {
      const v = parseFloat(el.getAttribute('data-count'));
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      el.textContent = prefix + v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
    });
  }

  // ---------- Hero viz: animated pie/donut ----------
  const viz = document.querySelector('.hero-viz svg');
  if (viz) {
    // rings are already drawn via dash offset; animate stroke-dashoffset on load
    requestAnimationFrame(() => {
      viz.querySelectorAll('.ring').forEach((r) => {
        r.style.strokeDashoffset = r.getAttribute('data-offset-final');
      });
    });
  }

  // ---------- Smooth anchor scroll with offset ----------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    a.addEventListener('click', (e) => {
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY - 96;
      window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  // ---------- Form demo handler ----------
  document.querySelectorAll('[data-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Requesting callback…';
      setTimeout(() => {
        btn.innerHTML = '✓ Callback booked';
        const note = form.querySelector('[data-form-note]');
        if (note) {
          note.textContent = 'A relationship manager will call you within 4 business hours. Reference: ABC-' + Math.floor(Math.random() * 900000 + 100000);
          note.style.color = 'var(--success)';
        }
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = original;
          form.reset();
          if (form.querySelector('[data-form-note]')) form.querySelector('[data-form-note]').textContent = '';
        }, 5000);
      }, 900);
    });
  });

  // ---------- Current year ----------
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // ---------- Hero parallax (very subtle) ----------
  if (!reduced) {
    const vizWrap = document.querySelector('.hero-viz');
    if (vizWrap) {
      window.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        vizWrap.style.transform = `translate3d(${dx * 6}px, ${dy * 4}px, 0)`;
      }, { passive: true });
    }
  }

  // ---------- Tabs (if present) ----------
  document.querySelectorAll('[data-tabs]').forEach((wrap) => {
    const tabs = wrap.querySelectorAll('[data-tab]');
    const panels = wrap.querySelectorAll('[data-panel]');
    tabs.forEach((t) => {
      t.addEventListener('click', () => {
        const id = t.getAttribute('data-tab');
        tabs.forEach((x) => x.classList.toggle('is-active', x === t));
        panels.forEach((p) => p.classList.toggle('is-active', p.getAttribute('data-panel') === id));
      });
    });
  });

})();
