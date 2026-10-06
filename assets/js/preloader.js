/* ==========================================================================
   preloader.js — Contador real + barrido de salida.

   El contador refleja carga de verdad (fuentes + imágenes del hero), no una
   animación decorativa: si la red va lenta se nota, y si va rápida el mínimo
   de 1.2s evita el parpadeo.
   ========================================================================== */

import { reduceMotion, startScroll, stopScroll } from './scroll.js';
import { playHero } from './reveal.js';

const MIN_MS = 1200;

/** Promesa que resuelve cuando fuentes e imágenes críticas están listas. */
function trackAssets(onProgress) {
  const jobs = [];

  jobs.push(document.fonts ? document.fonts.ready : Promise.resolve());

  const imgs = [...document.querySelectorAll('.hero img, .hero source')];
  imgs.forEach((img) => {
    if (img.complete) return;
    jobs.push(
      new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });  // un 404 no debe colgar la página
      })
    );
  });

  let done = 0;
  const total = jobs.length || 1;

  return Promise.all(
    jobs.map((p) =>
      p.then(() => {
        done += 1;
        onProgress(done / total);
      })
    )
  );
}

export function initPreloader() {
  const el = document.querySelector('.preloader');
  if (!el) return Promise.resolve();

  const countEl = el.querySelector('.preloader__count span');
  const barEl   = el.querySelector('.preloader__bar');
  const markEl  = el.querySelector('.preloader__mark svg');
  const { gsap } = window;

  if (reduceMotion) {
    el.remove();
    document.documentElement.classList.add('is-ready');
    playHero();
    return Promise.resolve();
  }

  stopScroll();

  const state = { shown: 0 };          // 0 → 1, lo que se ve
  let real = 0;                        // 0 → 1, lo que de verdad ha cargado

  const render = () => {
    const pct = Math.round(state.shown * 100);
    if (countEl) countEl.textContent = String(pct).padStart(3, '0');
    if (barEl) gsap.set(barEl, { scaleX: state.shown });
  };

  // El wordmark entra con la misma máscara que los titulares.
  if (markEl) gsap.from(markEl, { yPercent: 110, duration: 1.1, ease: 'expo.out' });

  const started = performance.now();

  const assets = trackAssets((p) => { real = p; });

  // El contador persigue al progreso real, nunca lo adelanta.
  const chase = gsap.to(state, {
    shown: 1,
    duration: 6,
    ease: 'none',
    onUpdate() {
      const cap = Math.max(real, 0.08);
      if (state.shown > cap) state.shown = cap;
      render();
    },
  });

  return assets
    .then(() => {
      const elapsed = performance.now() - started;
      return new Promise((r) => setTimeout(r, Math.max(0, MIN_MS - elapsed)));
    })
    .then(() => {
      chase.kill();

      return new Promise((resolve) => {
        gsap
          .timeline({
            onComplete: () => {
              el.remove();
              document.documentElement.classList.add('is-ready');
              startScroll();
              playHero();
              window.ScrollTrigger.refresh();
              resolve();
            },
          })
          .to(state, { shown: 1, duration: 0.4, ease: 'power2.out', onUpdate: render })
          .to(markEl, { yPercent: -110, duration: 0.7, ease: 'expo.inOut' }, '-=0.1')
          .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=0.45');
      });
    });
}
