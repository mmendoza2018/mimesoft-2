/* ==========================================================================
   main.js — Orquestación. El orden de arranque no es arbitrario:

   1. i18n + render     primero el DOM definitivo, con el texto final…
   2. scroll            …luego Lenis y ScrollTrigger…
   3. reveal/parallax   …y sólo entonces se miden posiciones.

   Si se invierte, SplitText parte el texto equivocado y los triggers se
   calculan sobre alturas que van a cambiar.
   ========================================================================== */

import { initScroll } from './scroll.js';
import { initReveal, revertText, resplitText } from './reveal.js';
import { initParallax, initFloatFade } from './parallax.js';
import { initHorizontal } from './horizontal.js';
import { initPreloader } from './preloader.js';
import { initTheme, initHeader, initMobileNav, initAnchors } from './nav.js';
import { initI18n, fillBusiness } from './i18n.js';
import { renderAll } from './render.js';
import { initProjects, restoreProjects } from './projects.js';

function boot() {
  // 1 — contenido
  initI18n({ beforeApply: revertText, afterApply: onLanguageChange });
  fillBusiness();
  renderAll();

  // 2 — scroll
  initScroll();

  // 3 — animación
  initReveal();
  initParallax();
  initFloatFade();
  initHorizontal();

  // 4 — interfaz
  initProjects();
  initTheme();
  initHeader();
  initMobileNav();
  initAnchors();

  // 5 — entrada
  initPreloader();
}

/**
 * Se ejecuta DESPUÉS de escribir el texto traducido (revertText ya corrió
 * antes, desde el hook beforeApply). Aquí sólo queda repintar las listas,
 * volver a partir los titulares y recalcular posiciones.
 */
function onLanguageChange() {
  renderAll();
  restoreProjects();   // el repintado borra filtro, modo de vista y ficha abierta
  resplitText();
  requestAnimationFrame(() => window.ScrollTrigger.refresh());
}

// Las fuentes cambian las alturas de línea; sin este refresh los triggers
// quedan desplazados en la primera carga.
document.fonts?.ready.then(() => window.ScrollTrigger?.refresh());

document.documentElement.classList.remove('no-js');

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
