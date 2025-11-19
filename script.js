// ==============================
// Science Outreach Club — script.js
// - Sets copyright year
// - Enables smart dropdown behavior:
//   * desktop: hover opens menu (CSS handles it)
//   * mobile/touch: button click toggles menu (JS handles it)
// ==============================

document.addEventListener('DOMContentLoaded', () => {
  // Fill year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smart dropdown: attach click toggle to all dropdown-toggle buttons
  document.querySelectorAll('.dropdown').forEach(drop => {
    const btn = drop.querySelector('.dropdown-toggle');
    const menu = drop.querySelector('.dropdown-menu');

    if (!btn || !menu) return;

    // Toggle on click (for touch/mobile)
    btn.addEventListener('click', (e) => {
      // prevent the click from navigating if it's inside a link
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));

      // For small screens we'll toggle a class
      drop.classList.toggle('open');
      if (drop.classList.contains('open')) {
        menu.style.display = 'block';
      } else {
        menu.style.display = '';
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (ev) => {
      if (!drop.contains(ev.target)) {
        drop.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        menu.style.display = '';
      }
    });
  });

  // Optional: keyboard accessibility for dropdowns
  document.querySelectorAll('.dropdown-toggle').forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        btn.setAttribute('aria-expanded', 'false');
        const drop = btn.closest('.dropdown');
        if (drop) {
          drop.classList.remove('open');
          const menu = drop.querySelector('.dropdown-menu');
          if (menu) menu.style.display = '';
        }
      }
    });
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
