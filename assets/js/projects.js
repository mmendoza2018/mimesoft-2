/* ==========================================================================
   projects.js — La sección de Proyectos: filtros, modos de vista, preview
   flotante y desplegable.

   Tres cosas que conviene tener claras antes de tocar esto:

   1. El DOM de un proyecto es el MISMO en Índice y en Galería; sólo cambia
      la clase del contenedor. Por eso GSAP Flip puede morfear entre modos en
      vez de destruir y recrear tarjetas (que perdería el estado de apertura).

   2. El desplegable usa grid-template-rows 0fr→1fr. No hay que medir alturas
      ni leer scrollHeight, así que funciona aunque el contenido cambie de
      tamaño después (imágenes que cargan tarde, cambio de idioma).

   3. El preview flotante sólo existe en Índice y con ratón fino. En táctil
      no hay cursor al que seguir, y en Galería la imagen ya está a la vista.
   ========================================================================== */

import { reduceMotion, getLenis } from './scroll.js';
import { PROJECT_TYPES, PROJECTS, COPY } from './content.js';
import { lang } from './i18n.js';

const MOBILE = () => window.matchMedia('(max-width: 64rem)').matches;
const FINE_POINTER = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

let state = { filter: 'all', view: 'index', open: null };

/* --------------------------------------------------------------------------
   Filtros
   -------------------------------------------------------------------------- */
function buildFilters() {
  const bar = document.querySelector('.projects__filters');
  if (!bar) return;

  const F = COPY[lang].projects.filters;
  const count = (type) =>
    type === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.type === type).length;

  bar.replaceChildren(
    ...['all', ...PROJECT_TYPES]
      // Un chip cuyo filtro no tiene proyectos no aporta: se omite.
      .filter((type) => count(type) > 0)
      .map((type) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'filter';
        btn.dataset.filter = type;
        btn.setAttribute('aria-pressed', String(state.filter === type));
        btn.innerHTML = `<span>${F[type]}</span><sup>${count(type)}</sup>`;
        return btn;
      })
  );
}

function applyFilter(type) {
  const list = document.querySelector('.projects__list');
  const items = [...document.querySelectorAll('.project')];
  if (!list) return;

  state.filter = type;

  document.querySelectorAll('.filter').forEach((b) =>
    b.setAttribute('aria-pressed', String(b.dataset.filter === type))
  );

  // Cerrar lo que esté abierto: tras filtrar, dejar una ficha abierta a
  // medio camino descoloca el scroll.
  collapseAll();

  const show = (p) => type === 'all' || p.dataset.type === type;

  const empty = document.querySelector('.projects__empty');
  if (empty) empty.hidden = items.some(show);

  if (reduceMotion || !window.Flip) {
    items.forEach((p) => { p.hidden = !show(p); });
    refresh();
    return;
  }

  const flipState = window.Flip.getState(items);
  items.forEach((p) => { p.hidden = !show(p); });

  window.Flip.from(flipState, {
    duration: 0.55,
    ease: 'power2.inOut',
    stagger: 0.025,
    absolute: true,
    onEnter:  (els) => window.gsap.fromTo(els, { opacity: 0, scale: .96 }, { opacity: 1, scale: 1, duration: .4 }),
    onLeave:  (els) => window.gsap.to(els, { opacity: 0, scale: .96, duration: .25 }),
    onComplete: refresh,
  });
}

/* --------------------------------------------------------------------------
   Modos de vista
   -------------------------------------------------------------------------- */
function applyView(view) {
  const list = document.querySelector('.projects__list');
  if (!list) return;

  state.view = view;

  document.querySelectorAll('.view-toggle button').forEach((b) =>
    b.setAttribute('aria-pressed', String(b.dataset.view === view))
  );

  const items = [...document.querySelectorAll('.project')];

  const swap = () => {
    list.classList.toggle('is-index', view === 'index');
    list.classList.toggle('is-gallery', view === 'gallery');
  };

  if (reduceMotion || !window.Flip) {
    swap();
    refresh();
    return;
  }

  const flipState = window.Flip.getState(items, { props: 'borderRadius' });
  swap();
  window.Flip.from(flipState, {
    duration: 0.6,
    ease: 'power2.inOut',
    stagger: 0.02,
    absolute: true,
    onComplete: refresh,
  });
}

/* --------------------------------------------------------------------------
   Desplegable
   -------------------------------------------------------------------------- */
function collapseAll() {
  document.querySelectorAll('.project.is-open').forEach((p) => {
    p.classList.remove('is-open');
    p.querySelector('.project__head')?.setAttribute('aria-expanded', 'false');
  });
  state.open = null;
}

function toggle(item) {
  const head = item.querySelector('.project__head');
  const wasOpen = item.classList.contains('is-open');

  collapseAll();

  if (!wasOpen) {
    item.classList.add('is-open');
    head.setAttribute('aria-expanded', 'true');
    state.open = item.dataset.slug;
  }

  // La altura de la página cambia: sin esto, todos los triggers de abajo
  // (incluido el pin de Experiencias) quedan desplazados.
  setTimeout(refresh, 450);
}

/* --------------------------------------------------------------------------
   Preview flotante — el único momento decorativo del modo Índice
   -------------------------------------------------------------------------- */
function initPreview() {
  const list = document.querySelector('.projects__list');
  const preview = document.querySelector('.projects__preview');
  if (!list || !preview || reduceMotion || !FINE_POINTER()) return;

  const { gsap } = window;
  const setX = gsap.quickTo(preview, 'x', { duration: 0.5, ease: 'power3' });
  const setY = gsap.quickTo(preview, 'y', { duration: 0.5, ease: 'power3' });

  let active = null;

  const show = (item) => {
    if (active === item || state.view !== 'index') return;
    active = item;

    // Se clona la miniatura que el proyecto ya tiene: así el preview hereda
    // el visual correcto (imagen, diagrama o conversación) sin duplicar la
    // lógica de render.
    const thumb = item.querySelector('.project__thumb')?.firstElementChild;
    if (!thumb) return;

    preview.replaceChildren(thumb.cloneNode(true));
    gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
    list.classList.add('is-hovering');
  };

  const hide = () => {
    active = null;
    gsap.to(preview, { autoAlpha: 0, scale: 0.94, duration: 0.25 });
    list.classList.remove('is-hovering');
  };

  list.addEventListener('pointermove', (e) => {
    if (state.view !== 'index') return;
    setX(e.clientX + 24);
    setY(e.clientY - 90);

    const item = e.target.closest('.project');
    if (item && !item.classList.contains('is-open')) show(item);
    else hide();
  });

  list.addEventListener('pointerleave', hide);

  // Si la página se mueve bajo un cursor quieto, `pointerleave` no se dispara
  // nunca: el puntero no ha salido de la lista, es la lista la que se ha ido.
  // Sin esto el preview se queda colgado en pantalla el resto de la sesión.
  //
  // OJO: hay que engancharse al scroll DE LENIS. Lenis no emite el evento
  // `scroll` nativo del window, así que un addEventListener('scroll') aquí no
  // se dispara nunca y el preview se queda igual de colgado.
  getLenis()?.on('scroll', hide);
  window.addEventListener('scroll', hide, { passive: true });  // sin Lenis (reduced motion)

  window.ScrollTrigger?.create({
    trigger: list,
    start: 'top bottom',
    end: 'bottom top',
    onLeave: hide,
    onLeaveBack: hide,
  });
}

/* --------------------------------------------------------------------------
   Arranque
   -------------------------------------------------------------------------- */
const refresh = () => window.ScrollTrigger?.refresh();

export function initProjects() {
  const section = document.querySelector('#proyectos');
  if (!section) return;

  buildFilters();

  // En móvil el índice no funciona: no hay sitio para las columnas ni cursor
  // al que seguir. Se arranca directamente en galería.
  if (MOBILE()) state.view = 'gallery';

  const list = document.querySelector('.projects__list');
  list?.classList.add(state.view === 'index' ? 'is-index' : 'is-gallery');

  document.querySelectorAll('.view-toggle button').forEach((b) =>
    b.setAttribute('aria-pressed', String(b.dataset.view === state.view))
  );

  // Delegación: las tarjetas se repintan al cambiar de idioma, así que no se
  // pueden enganchar listeners a cada una.
  section.addEventListener('click', (e) => {
    const filter = e.target.closest('.filter');
    if (filter) return applyFilter(filter.dataset.filter);

    const viewBtn = e.target.closest('.view-toggle button');
    if (viewBtn) return applyView(viewBtn.dataset.view);

    const head = e.target.closest('.project__head');
    if (head) return toggle(head.closest('.project'));
  });

  initPreview();
}

/** Tras cambiar de idioma el DOM se repinta: hay que restaurar el estado. */
export function restoreProjects() {
  buildFilters();

  const list = document.querySelector('.projects__list');
  list?.classList.toggle('is-index', state.view === 'index');
  list?.classList.toggle('is-gallery', state.view === 'gallery');

  document.querySelectorAll('.project').forEach((p) => {
    p.hidden = !(state.filter === 'all' || p.dataset.type === state.filter);

    if (p.dataset.slug === state.open) {
      p.classList.add('is-open');
      p.querySelector('.project__head')?.setAttribute('aria-expanded', 'true');
    }
  });
}
