/* ==========================================================================
   render.js — Pinta las listas de datos desde content.js.

   Lo importante de este archivo: un proyecto NO siempre se enseña con una
   foto. Una automatización de n8n y un chatbot no son fotogénicos, y
   forzarlos a una tarjeta con mockup genérico resta credibilidad justo donde
   más hace falta. Por eso hay tres lenguajes visuales y dos se dibujan por
   código, desde datos:

     system | web  →  <img>              (una captura real)
     automation    →  renderFlow()       (nodos y conexiones)
     chatbot       →  renderChat()       (burbujas de conversación)

   Consecuencia práctica: para automatizaciones y chatbots no hay que
   producir ninguna imagen, y los tres salen coherentes en monocromo.
   ========================================================================== */

import { TECH, PROJECTS, EXPERIENCES, COPY } from './content.js';
import { lang, t } from './i18n.js';

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

/* --- Tecnologías --------------------------------------------------------- */
function renderTech() {
  const grid = document.querySelector('.tech__grid');
  if (!grid) return;

  grid.replaceChildren(
    ...TECH.map((tech, i) => {
      const item = el('li', 'tech__item');
      item.dataset.reveal = '';
      item.dataset.revealDelay = String((i % 6) * 0.05);

      const img = el('img');
      img.src = `assets/img/${tech.icon}`;
      img.alt = '';
      img.loading = 'lazy';
      // Si falta el logo se cae al nombre en texto, no a un icono roto.
      img.addEventListener('error', () => img.remove(), { once: true });

      item.append(img, el('span', 'tech__name', tech.name));
      return item;
    })
  );
}

/* --------------------------------------------------------------------------
   Visuales de proyecto
   -------------------------------------------------------------------------- */

/**
 * Diagrama de flujo. Se dibuja con HTML y no con SVG a propósito: las
 * etiquetas son texto de longitud variable y en SVG habría que medir y
 * partir las líneas a mano. Los conectores son pseudo-elementos que se
 * animan con scaleY, así que el efecto «se va dibujando» se mantiene.
 */
function renderFlow(flow, compact = false) {
  const wrap = el('ol', `flow${compact ? ' flow--compact' : ''}`);

  wrap.append(
    ...flow.nodes.map((node, i) => {
      const li = el('li', 'flow__node');
      li.style.setProperty('--i', i);
      li.append(
        el('span', 'flow__index', String(i + 1).padStart(2, '0')),
        el('span', 'flow__label', t(node.label))
      );
      return li;
    })
  );

  return wrap;
}

/** Conversación estilizada. */
function renderChat(chat, compact = false) {
  const wrap = el('div', `chat${compact ? ' chat--compact' : ''}`);

  wrap.append(
    ...chat.map((msg, i) => {
      const b = el('p', `chat__bubble chat__bubble--${msg.from === 'bot' ? 'bot' : 'user'}`, t(msg.text));
      b.style.setProperty('--i', i);
      return b;
    })
  );

  return wrap;
}

/**
 * Panel del sistema montado sobre una foto. El texto va en HTML y no dentro
 * de la imagen: así sale nítido, se traduce, y no depende de que un modelo
 * de imagen sepa escribir — que no sabe. La IA sólo aporta el fondo.
 */
function renderDashboard(d, compact = false) {
  const wrap = el('div', `dash${compact ? ' dash--compact' : ''}`);

  if (d.bg) {
    const bg = el('img', 'dash__bg');
    bg.src = `assets/img/${d.bg}`;
    bg.alt = '';
    bg.loading = 'lazy';
    bg.addEventListener('error', () => bg.remove(), { once: true });
    wrap.append(bg);
  }

  const panel = el('div', 'dash__panel');

  const head = el('div', 'dash__head');
  head.append(
    el('span', 'caption', t(d.title)),
    el('span', 'dash__meta', t(d.meta))
  );
  panel.append(head);

  const cols = t(d.cols) || [];
  const table = el('div', 'dash__table');

  const header = el('div', 'dash__row dash__row--head');
  cols.forEach((c) => header.append(el('span', null, c)));
  header.append(el('span', null, ''));
  table.append(header);

  d.rows.forEach((r) => {
    const row = el('div', 'dash__row');
    row.append(
      el('span', 'dash__name', r.name),
      el('span', 'dash__meter', r.meter),
      el('span', 'dash__status', t(r.status)),
      el('span', `dash__dot dash__dot--${r.state || 'ok'}`)
    );
    table.append(row);
  });

  panel.append(table);
  wrap.append(panel);
  return wrap;
}

/**
 * Elige el visual de cada proyecto.
 *
 * `image` manda sobre todo lo demás: si se ha puesto una captura real es
 * porque se quiere ver ésa, no el diagrama que se dibujaría por tipo. Quitar
 * la línea `image` del proyecto devuelve el visual generado.
 */
function projectVisual(p, compact = false) {
  if (p.image) {
    const fig = el('figure', 'project__shot');
    const img = el('img');
    img.src = `assets/img/${p.image}`;
    img.alt = t(p.title);
    img.loading = 'lazy';
    fig.append(img);
    return fig;
  }

  if (p.dashboard)                       return renderDashboard(p.dashboard, compact);
  if (p.type === 'automation' && p.flow) return renderFlow(p.flow, compact);
  if (p.type === 'chatbot' && p.chat)    return renderChat(p.chat, compact);

  return el('div', 'project__shot project__shot--empty');
}

/* --- Proyectos -----------------------------------------------------------
   Un único DOM sirve para los dos modos de vista: lo que cambia es la clase
   del contenedor. Así GSAP Flip puede morfear entre Índice y Galería en
   lugar de destruir y recrear las tarjetas.
   ------------------------------------------------------------------------- */
function renderProjects() {
  const list = document.querySelector('.projects__list');
  if (!list) return;

  const L = COPY[lang].projects.labels;
  const F = COPY[lang].projects.filters;

  list.replaceChildren(
    ...PROJECTS.map((p, i) => {
      const item = el('article', 'project');
      item.dataset.type = p.type;
      item.dataset.slug = p.slug;

      /* -- Cabecera clicable -- */
      const head = el('button', 'project__head');
      head.type = 'button';
      head.setAttribute('aria-expanded', 'false');
      head.setAttribute('aria-controls', `panel-${p.slug}`);

      const media = el('span', 'project__thumb');
      media.append(projectVisual(p, true));

      const meta = el('span', 'project__meta');
      meta.append(
        el('span', 'project__type', F[p.type] || p.type),
        el('span', 'project__year', p.year)
      );

      head.append(
        el('span', 'project__num', String(i + 1).padStart(2, '0')),
        media,
        el('span', 'project__name', t(p.title)),
        el('span', 'project__summary', t(p.summary)),
        meta,
        el('span', 'project__chevron')
      );

      /* -- Panel desplegable --
         grid-template-rows 0fr→1fr: se anima sin medir alturas a mano. */
      const panel = el('div', 'project__panel');
      panel.id = `panel-${p.slug}`;

      const inner = el('div', 'project__panel-inner');
      const detail = el('div', 'project__detail');

      const block = (label, body) => {
        const b = el('div', 'project__block');
        b.append(el('span', 'caption', label), el('p', 'project__block-text', body));
        return b;
      };

      detail.append(
        block(L.problem, t(p.problem)),
        block(L.solution, t(p.solution))
      );

      const stackBlock = el('div', 'project__block');
      stackBlock.append(el('span', 'caption', L.stack));
      const stack = el('ul', 'project__stack');
      stack.append(...p.stack.map((s) => el('li', 'chip', s)));
      stackBlock.append(stack);
      detail.append(stackBlock);

      if (p.result) {
        const r = el('div', 'project__result');
        r.append(
          el('span', 'caption', L.result),
          el('strong', 'project__result-value', p.result.value),
          el('span', 'project__result-label', t(p.result.label))
        );
        detail.append(r);
      }

      const visual = el('div', 'project__visual');
      visual.append(projectVisual(p, false));

      inner.append(detail, visual);
      panel.append(inner);
      item.append(head, panel);

      // El cliente, o la etiqueta de proyecto propio si es un demo.
      const tag = el('span', 'project__client caption', p.demo ? L.demo : p.client);
      head.insertBefore(tag, head.querySelector('.project__meta'));

      return item;
    })
  );
}

/* --- Experiencias --------------------------------------------------------
   Si no hay testimonios reales, la sección entera se oculta. Inventarlos en
   un sitio que Meta va a revisar no compensa.
   ------------------------------------------------------------------------- */
function renderExperiences() {
  const section = document.querySelector('.experiences');
  const track = document.querySelector('.experiences__track');
  if (!section || !track) return;

  if (!EXPERIENCES.length) {
    section.hidden = true;
    return;
  }
  section.hidden = false;

  track.replaceChildren(
    ...EXPERIENCES.map((x) => {
      const fig = el('figure', 'experience');
      fig.append(
        el('blockquote', 'experience__quote', `“${t(x.quote)}”`),
        el('figcaption', 'caption experience__author', `${x.author} — ${t(x.role)}`)
      );
      return fig;
    })
  );
}

/** Se vuelve a llamar al cambiar de idioma. */
export function renderAll() {
  renderTech();
  renderProjects();
  renderExperiences();
}
