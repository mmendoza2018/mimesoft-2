/* ==========================================================================
   horizontal.js — La sección "Experiencias": pin + scroll horizontal.

   Es la parte más frágil del sitio. Dos cosas la rompen si se hacen mal:

   1. Un `end` fijo (p.ej. "+=10000"). La distancia tiene que derivarse del
      ancho real del track, y recalcularse en cada refresh — si no, en
      pantallas anchas el track termina antes que el pin y la sección se
      queda congelada en vacío.
   2. Activarla en móvil. Allí el track es un scroll nativo con snap (CSS),
      así que el pin debe desmontarse por debajo de 1024px y volver a montarse
      si el usuario agranda la ventana. De eso se encarga matchMedia().
   ========================================================================== */

import { reduceMotion } from './scroll.js';

export function initHorizontal() {
  const section = document.querySelector('.experiences');
  const track   = document.querySelector('.experiences__track');
  const stage   = document.querySelector('.experiences__stage');

  if (!section || !track || !stage) return;
  if (reduceMotion) return;          // en móvil y sin movimiento: scroll nativo

  const { gsap } = window;

  // matchMedia monta y desmonta solo al cruzar el breakpoint, y revierte
  // todo lo que se haya creado dentro del contexto.
  const mm = gsap.matchMedia();

  const head = document.querySelector('.experiences__head');

  // Negación exacta del breakpoint del CSS (`max-width: 64rem`), no un
  // `min-width` aproximado: con `min-width: 64.0625rem` quedaba un hueco en
  // anchos fraccionarios (p.ej. 1024.5px por zoom o escalado de pantalla)
  // donde no aplicaban ni los estilos móviles ni el pin, y el track quedaba
  // en position:absolute sin nada que lo moviera.
  mm.add('not all and (max-width: 64rem)', () => {
    // Distancia a recorrer = lo que sobresale del track respecto al viewport.
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

    // Un timeline, no dos triggers: el título tiene que desvanecerse justo
    // cuando entran las tarjetas. Si se queda, el texto gigante se superpone
    // con las citas y las dos cosas se vuelven ilegibles.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => '+=' + distance(),
        pin: stage,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,   // recalcula x y end tras un resize
      },
    });

    // Duraciones relativas: el track ocupa todo el recorrido (1), el título
    // se va en el primer 18 %.
    tl.to(track, { x: () => -distance(), ease: 'none', duration: 1 }, 0);

    if (head) tl.to(head, { opacity: 0, ease: 'power1.out', duration: 0.18 }, 0);

    return () => tl.scrollTrigger?.kill(true);
  });
}
