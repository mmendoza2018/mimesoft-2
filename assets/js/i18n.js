/* ==========================================================================
   i18n.js — Traducción por atributos.

   El HTML lleva data-i18n="hero.heading"; aquí se resuelve contra COPY.
   Cambiar de idioma cambia la longitud del texto, así que después hay que
   rehacer los splits de línea y refrescar ScrollTrigger (lo hace main.js
   mediante el callback onChange).
   ========================================================================== */

import { COPY, BUSINESS, waLink } from './content.js';

const LANG_KEY = 'mimesoft-lang';

export let lang = 'es';

const get = (path, dict) =>
  path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), dict);

/** Devuelve el string correcto de un campo que puede ser {es,en} o plano. */
export const t = (value) =>
  value && typeof value === 'object' && !Array.isArray(value) ? value[lang] ?? value.es : value;

function apply() {
  const dict = COPY[lang];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = get(el.dataset.i18n, dict);
    if (typeof value === 'string') el.textContent = value;
  });

  // Atributos traducibles: aria-label, placeholder, title.
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(',').forEach((pair) => {
      const [attr, path] = pair.split(':').map((s) => s.trim());
      const value = get(path, dict);
      if (typeof value === 'string') el.setAttribute(attr, value);
    });
  });

  // Los enlaces de WhatsApp llevan el mensaje precargado en el idioma activo.
  document.querySelectorAll('[data-wa]').forEach((a) => a.setAttribute('href', waLink(lang)));

  document.documentElement.lang = lang;

  // El <title> y la descripción también son contenido: un revisor que abra
  // el sitio en inglés no debería encontrarse la pestaña en español.
  if (dict.meta) {
    document.title = dict.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', dict.meta.description);
  }

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
  });
}

/**
 * El orden importa: `beforeApply` debe deshacer los splits de SplitText
 * mientras el DOM todavía tiene el texto viejo. Si se revierte después de
 * traducir, revert() restaura el HTML original y borra la traducción.
 *
 * @param {{ beforeApply?: () => void, afterApply?: () => void }} hooks
 */
export function initI18n({ beforeApply, afterApply } = {}) {
  lang = localStorage.getItem(LANG_KEY) || document.documentElement.lang || 'es';
  if (!COPY[lang]) lang = 'es';

  apply();

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.lang;
      if (next === lang || !COPY[next]) return;

      beforeApply?.();                      // 1. deshacer splits (texto viejo)
      lang = next;
      localStorage.setItem(LANG_KEY, lang);
      apply();                              // 2. escribir el texto nuevo
      afterApply?.();                       // 3. volver a partir y refrescar
    });
  });
}

/** Rellena los datos legales del negocio allí donde se referencien. */
export function fillBusiness() {
  const map = {
    'business.displayName':  BUSINESS.displayName,
    'business.shortAddress': BUSINESS.shortAddress,
    'business.legalName': BUSINESS.legalName,
    'business.taxId':     BUSINESS.taxId,
    'business.address':   BUSINESS.address,
    'business.email':     BUSINESS.email,
    'business.phone':     BUSINESS.phone,
    'business.brand':     BUSINESS.brand,
    'business.year':      String(new Date().getFullYear()),
  };

  document.querySelectorAll('[data-business]').forEach((el) => {
    const value = map[el.dataset.business];
    if (value == null) return;
    el.textContent = value;
    if (el.tagName === 'A' && el.dataset.business === 'business.email') el.href = `mailto:${value}`;
    if (el.tagName === 'A' && el.dataset.business === 'business.phone') el.href = `tel:${value.replace(/\s/g, '')}`;
  });
}
