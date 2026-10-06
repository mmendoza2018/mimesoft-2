/* ==========================================================================
   nav.js — Header que colapsa, menú móvil, tema, barra CTA fija y anclas.
   Sustituye a Alpine.js: no hace falta una librería para esto.
   ========================================================================== */

import { scrollTo } from './scroll.js';

const THEME_KEY = 'mimesoft-theme';

/* --- Tema ---------------------------------------------------------------- */
export function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) document.documentElement.dataset.theme = stored;

  document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem(THEME_KEY, next);
  });
}

/* --- Header y barra CTA --------------------------------------------------
   El header se esconde al bajar y reaparece al subir, en lugar de colapsar
   de forma permanente: colapsarlo deja la navegación con pointer-events:none
   y el usuario se queda sin forma de saltar entre secciones.

   La barra CTA fija aparece en cuanto el hero sale de vista.
   ------------------------------------------------------------------------- */
export function initHeader() {
  const header = document.querySelector('.header');
  const ctaBar = document.querySelector('.cta-bar');
  const hero   = document.querySelector('.hero');
  const { ScrollTrigger } = window;

  if (!header) return;

  ScrollTrigger.create({
    start: 'top top',
    end: 'max',
    onUpdate(self) {
      const scrolled = self.scroll() > 80;
      header.classList.toggle('is-stuck', scrolled);

      // Nunca escondemos el header con el menú móvil abierto.
      const hide = scrolled && self.direction === 1 && !document.body.classList.contains('nav-open');
      header.classList.toggle('is-hidden', hide);
    },
  });

  if (hero && ctaBar) {
    ScrollTrigger.create({
      trigger: hero,
      start: 'bottom 20%',
      onEnter:     () => ctaBar.classList.add('is-visible'),
      onLeaveBack: () => ctaBar.classList.remove('is-visible'),
    });
  }
}

/* --- Menú móvil ---------------------------------------------------------- */
export function initMobileNav() {
  const burger = document.querySelector('.header__burger');
  if (!burger) return;

  const close = () => {
    document.body.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.header__nav a').forEach((a) => a.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) close();
  });
}

/* --- Anclas internas a través de Lenis ----------------------------------- */
export function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;

    a.addEventListener('click', (e) => {
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      scrollTo(target);
      history.replaceState(null, '', id);
    });
  });
}
