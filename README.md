# Mimesoft — landing page

Landing estática de una consultora de software: sistemas a medida, sitios
web, automatización de procesos e integración de WhatsApp Business API.
Diseño inspirado en [amzigo.com](https://www.amzigo.com): tipografía grande
de peso ligero, revelados por scroll y fondo con gradiente difuminado.

**Paleta monocroma.** Negro, blanco y grises. Hay una sola excepción de color
en todo el sitio: `--wa` (#25D366) en los botones que abren WhatsApp, donde el
verde identifica el canal en vez de decorar. No usarlo para nada más.

**Objetivo**: además de marketing, este sitio sirve para la solicitud de
**Tech Provider de Meta**. Por eso incluye páginas legales y muestra la
identidad legal del negocio de forma visible.

## Arrancar

No hay build step ni gestor de paquetes. Pero **sí hace falta un servidor**:
el JS usa módulos ES y `file://` los bloquea.

```sh
# XAMPP (ya está en htdocs)
http://localhost/PHP/PAGINAS/mimesoft-2/

# o cualquier servidor estático
python -m http.server 8765
```

## Qué editar

| Quiero cambiar… | Archivo |
|---|---|
| Textos, proyectos, tecnologías, testimonios | `assets/js/content.js` |
| Datos legales de la empresa | `BUSINESS` en `assets/js/content.js` |
| Colores, tamaños, espaciado | `assets/css/tokens.css` |
| Imágenes | `assets/img/` — ver `assets/img/PROMPTS.md` |

Casi todo el contenido vive en `content.js`. El HTML sólo lleva claves
`data-i18n="ruta.a.la.clave"`.

## Antes de publicar

- [ ] Rellenar todos los `REEMPLAZAR` de `content.js` (`grep -rn REEMPLAZAR .`)
- [ ] Completar los 8 proyectos con trabajo real; marcar con `demo: true` los
      que sean proyectos propios y no encargos de cliente
- [ ] Sustituir los placeholders de `assets/img/`
- [ ] Revisar las fechas y los `REEMPLAZAR` de las 3 páginas legales
- [ ] **Someter las páginas legales a revisión de un abogado** — son plantillas
      razonables, no asesoramiento jurídico
- [ ] Testimonios: o son reales, o se deja `EXPERIENCES` vacío (la sección se
      oculta sola)

## Dependencias

Todo por CDN, sin npm:

| Librería | Para qué |
|---|---|
| GSAP + ScrollTrigger | revelados, parallax, pin horizontal |
| GSAP Flip | morfeo al filtrar y al cambiar de modo de vista |
| GSAP SplitText | partir titulares en líneas enmascaradas |
| Lenis | smooth scroll |
| Geist + Geist Mono | tipografía |

## Arquitectura

```
assets/js/
  content.js     datos y copy ES/EN         ← lo que editas a diario
  main.js        orquestación (orden de arranque)
  i18n.js        traducción por atributos
  render.js      pinta tech / proyectos / testimonios
  projects.js    filtros, modos de vista, preview flotante, desplegable
  scroll.js      Lenis ↔ ScrollTrigger
  reveal.js      líneas enmascaradas, palabras, fade-up
  parallax.js    parallax de scroll y de ratón
  horizontal.js  sección pinneada "Experiencias"
  preloader.js   contador real + barrido
  nav.js         header, menú móvil, tema, anclas
```

El orden de arranque en `main.js` no es arbitrario: primero el contenido
definitivo, luego el scroll, y sólo entonces las animaciones — si se invierte,
SplitText parte el texto equivocado y los triggers se calculan sobre alturas
que van a cambiar.

### La sección de Proyectos

Es el eje de la página y va justo después de «Qué hacemos».

Lo que conviene saber antes de tocarla: **un proyecto no siempre se enseña con
una foto**. Una automatización de n8n y un chatbot no son fotogénicos, así que
hay tres lenguajes visuales y dos se dibujan por código desde datos:

| `type` | Visual | Qué hay que dar en `content.js` |
|---|---|---|
| `system` · `web` | `<img>` | `image:` una captura real |
| `automation` | diagrama de nodos | `flow: { nodes, edges }` |
| `chatbot` | conversación | `chat: [{ from, text }]` |

Para automatizaciones y chatbots **no hace falta producir ninguna imagen**.

El mismo DOM sirve para los dos modos de vista (Índice y Galería): sólo cambia
la clase del contenedor, para que Flip pueda morfear entre ellos en lugar de
destruir y recrear tarjetas.

### Detalles frágiles

- **Pin horizontal** (`horizontal.js`): el `end` se deriva del ancho real del
  track y se recalcula en cada refresh. Un `end` fijo rompe la sección en
  pantallas anchas. Por debajo de 1024px se desmonta y el track pasa a scroll
  nativo con `scroll-snap`.
- **Cambio de idioma**: el orden es `revertText()` → escribir el texto nuevo →
  `resplitText()`. Si se revierte *después* de traducir, `SplitText.revert()`
  restaura el HTML original y borra la traducción. Además hay que restaurar el
  estado de Proyectos (`restoreProjects()`), porque el repintado lo pierde.
- **`prefers-reduced-motion`**: desactiva Lenis, gradiente, grano, parallax,
  pin, Flip y el preview flotante; los revelados pasan al estado final.
- **Desplegable de proyecto**: usa `grid-template-rows: 0fr → 1fr`, así que no
  mide alturas a mano y sigue funcionando si el contenido cambia de tamaño
  después. Tras abrir hay que llamar a `ScrollTrigger.refresh()` o los triggers
  de abajo (incluido el pin de Experiencias) quedan desplazados.
