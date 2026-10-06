/* ==========================================================================
   reveal.js — Las tres recetas de revelado de la referencia.

   1. [data-lines]  líneas enmascaradas  yPercent 108 → 0, 1.6s, stagger .1, expo
   2. [data-split]  palabras             igual, pero por palabra
   3. [data-reveal] fade-up genérico     opacity + translateY al 80% del viewport

   Las dos primeras dependen de SplitText, que re-parte el texto al cambiar
   el ancho (autoSplit). Cada re-split destruye los nodos anteriores, así que
   las animaciones se vuelven a crear dentro de onSplit.
   ========================================================================== */

import { reduceMotion } from './scroll.js';

const splits = [];

/** Envuelve cada línea en .line-mask para que overflow:hidden la recorte. */
function wrapLines(lines) {
  lines.forEach((line) => {
    const mask = document.createElement('div');
    mask.className = 'line-mask';
    line.parentNode.insertBefore(mask, line);
    mask.appendChild(line);
  });
}

/**
 * Crea el revelado para un elemento.
 * @param {Element} el
 * @param {'lines'|'words'} type
 */
function createReveal(el, type) {
  const { gsap, ScrollTrigger, SplitText } = window;

  const split = SplitText.create(el, {
    type,
    mask: false,
    autoSplit: true,
    linesClass: 'line',
    wordsClass: 'word',

    onSplit(self) {
      const targets = type === 'lines' ? self.lines : self.words;
      if (type === 'lines') wrapLines(self.lines);

      // Devolver el tween hace que GSAP lo limpie en el siguiente re-split.
      return gsap.from(targets, {
        yPercent: 108,
        duration: 1.6,
        stagger: type === 'lines' ? 0.1 : 0.03,
        ease: 'expo',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      });
    },
  });

  splits.push(split);
}

export function initReveal() {
  const { gsap, ScrollTrigger } = window;

  // Sin movimiento: todo visible, sin split ni tweens.
  if (reduceMotion) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  document.querySelectorAll('[data-lines]').forEach((el) => createReveal(el, 'lines'));
  document.querySelectorAll('[data-split]').forEach((el) => createReveal(el, 'words'));

  // Fade-up genérico. Un trigger por elemento, con delay opcional por grupo.
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const delay = parseFloat(el.dataset.revealDelay || 0);
    el.style.transitionDelay = delay ? `${delay}s` : '';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => el.classList.add('is-visible'),
    });
  });
}

/**
 * Deshace los splits. CRÍTICO: hay que llamarlo ANTES de escribir el texto
 * traducido. SplitText.revert() restaura el HTML que el elemento tenía al
 * partirse, así que si se revierte después de traducir, pisa la traducción y
 * el titular se queda en el idioma anterior.
 */
export function revertText() {
  if (reduceMotion) return;

  splits.forEach((s) => s.revert());
  splits.length = 0;

  // Las máscaras sobreviven al revert; hay que quitarlas a mano.
  document.querySelectorAll('.line-mask').forEach((mask) => {
    mask.replaceWith(...mask.childNodes);
  });
}

/** Vuelve a partir el texto ya traducido y recalcula las posiciones. */
export function resplitText() {
  if (reduceMotion) return;

  document.querySelectorAll('[data-lines]').forEach((el) => createReveal(el, 'lines'));
  document.querySelectorAll('[data-split]').forEach((el) => createReveal(el, 'words'));

  window.ScrollTrigger.refresh();
}

/** Dispara el revelado del hero cuando el preloader termina. */
export function playHero() {
  const { gsap } = window;
  const hero = document.querySelector('.hero');
  if (!hero) return;

  if (reduceMotion) {
    hero.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  gsap.to(hero.querySelectorAll('[data-reveal]'), {
    opacity: 1,
    y: 0,
    duration: 0.9,
    stagger: 0.08,
    ease: 'power2.out',
    clearProps: 'opacity,transform',
    onComplete: () =>
      hero.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible')),
  });
}
