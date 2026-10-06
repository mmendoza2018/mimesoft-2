/* ==========================================================================
   parallax.js — Los dos parallax de la referencia, que se suman.

   [data-speed="1.25"]    deriva vertical dirigida por el scroll (scrub)
   [data-parallax="1.2"]  deriva por posición del ratón, sólo si está en vista

   Se aplican al mismo elemento a la vez: uno anima `y` por scroll, el otro
   `x`/`y` por ratón. Para que no se pisen, el de scroll actúa sobre el
   contenedor y el de ratón sobre el hijo.
   ========================================================================== */

import { reduceMotion } from './scroll.js';

const inViewport = (el) => {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
};

export function initParallax() {
  if (reduceMotion) return;

  // En móvil las piezas con data-speed dejan de estar posicionadas en
  // absoluto y pasan a flujo normal: moverlas con transform las sacaría de
  // su sitio. El parallax es de escritorio.
  if (window.matchMedia('(max-width: 64rem)').matches) return;

  const { gsap } = window;

  /* --- Parallax de scroll ----------------------------------------------- */
  document.querySelectorAll('[data-speed]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed) || 1;
    const shift = (1 - speed) * 220;      // px de deriva en todo el recorrido

    gsap.fromTo(
      el,
      { y: -shift },
      {
        y: shift,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('[data-parallax-scope]') || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );
  });

  /* --- Parallax de ratón -------------------------------------------------
     Un único listener para todos los elementos; la fórmula (/90) y la
     duración 1.5s son las de la referencia.
     ---------------------------------------------------------------------- */
  const mouseTargets = [...document.querySelectorAll('[data-parallax]')];
  if (!mouseTargets.length) return;

  // En táctil no hay ratón: el listener sólo gastaría batería.
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let ticking = false;

  window.addEventListener(
    'mousemove',
    (e) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        mouseTargets.forEach((el) => {
          if (!inViewport(el)) return;

          const factor = parseFloat(el.dataset.parallax) || 1;
          const x = (window.innerWidth - e.pageX * factor) / 90;
          const y = (window.innerHeight - e.pageY * factor) / 90;

          gsap.to(el, { x, y, duration: 1.5, ease: 'power2.out', overwrite: 'auto' });
        });
        ticking = false;
      });
    },
    { passive: true }
  );
}

/**
 * Receta 11: las tarjetas flotantes de Soluciones suben y bajan de opacidad
 * según su distancia al centro del viewport.
 */
export function initFloatFade() {
  if (reduceMotion) return;
  const { gsap } = window;

  document.querySelectorAll('.solution__float').forEach((el) => {
    // Entra, SE QUEDA, y sale. Un `fromTo` de 0 a 1 a lo largo de todo el
    // recorrido parece lo mismo pero no lo es: la opacidad avanza con el
    // scroll, así que en el centro de la pantalla la tarjeta está a la mitad
    // y nunca llega a verse entera. De ahí que salieran apagadas.
    gsap.timeline({
      scrollTrigger: {
        trigger: el.closest('.solution'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
      .fromTo(el, { opacity: 0, y: 70 }, { opacity: 1, y: 25, duration: 0.28, ease: 'none' })
      .to(el, { y: -25, duration: 0.44, ease: 'none' })
      .to(el, { opacity: 0, y: -70, duration: 0.28, ease: 'none' });
  });
}
