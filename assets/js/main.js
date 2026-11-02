/* ===================================================
   main.js — Bản Sắc Việt website interactions
   =================================================== */
(function () {
  'use strict';

  /* ---------- SCROLL PROGRESS BAR ---------- */
  const progressBar = document.querySelector('.scroll-progress span');
  const header = document.getElementById('site-header');
  const toTopBtn = document.getElementById('to-top');

  function onScroll() {
    const scrolled = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';

    // Header shadow
    if (header) header.classList.toggle('scrolled', scrolled > 40);

    // Back-to-top button
    if (toTopBtn) toTopBtn.classList.toggle('visible', scrolled > 600);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Clean up any legacy saved theme preference
  try {
    localStorage.removeItem('bsv_theme');
  } catch (e) {}

  /* ---------- MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    const toggleIcon = navToggle.querySelector('i');

    function closeMenu() {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      if (toggleIcon) {
        toggleIcon.className = 'fa-solid fa-bars';
      }
      document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      if (toggleIcon) {
        toggleIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    // Close when window resized beyond mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* ---------- ACTIVE NAV LINK ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('#nav-links a');

  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-30% 0px -70% 0px' });

  sections.forEach(s => observerNav.observe(s));

  /* ---------- REVEAL ON SCROLL ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const observerReveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerReveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observerReveal.observe(el));

  /* ---------- BACK TO TOP ---------- */
  if (toTopBtn) {
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- YEAR IN FOOTER ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- SMOOTH ANCHOR CLICKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
