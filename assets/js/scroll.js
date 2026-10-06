/* ==========================================================================
   scroll.js — Lenis (smooth scroll) sincronizado con ScrollTrigger.

   El orden importa: si Lenis y ScrollTrigger usan relojes distintos, el pin
   horizontal de Experiencias da tirones. Por eso conducimos lenis.raf desde
   el ticker de GSAP y desactivamos el lag smoothing.
   ========================================================================== */

export const reduceMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isDesktop = () => window.matchMedia('(min-width: 64.0625rem)').matches;

let lenis = null;

export function initScroll() {
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger, window.SplitText, window.Flip);

  // Sin movimiento: nada de smooth scroll, pero ScrollTrigger sigue vivo
  // para marcar los elementos como visibles.
  if (reduceMotion) return null;

  lenis = new window.Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,          // en táctil el scroll nativo se siente mejor
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/** El preloader bloquea el scroll mientras está visible. */
export const stopScroll  = () => lenis?.stop();
export const startScroll = () => lenis?.start();

export function scrollTo(target, opts = {}) {
  if (lenis) return lenis.scrollTo(target, { offset: -80, ...opts });
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}

export const getLenis = () => lenis;
