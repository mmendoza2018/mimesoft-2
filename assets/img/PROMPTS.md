# Prompts de imagen (nano-banana / Gemini Image)

Cada hueco tiene un placeholder SVG con las medidas exactas. Genera la imagen,
guárdala con **el mismo nombre** (cambiando la extensión a `.webp` o `.jpg`) y
actualiza la referencia. El CSS no cambia: todo va con `object-fit: cover`.

**Paleta a mantener en todos los prompts:** negro `#0A0A0B`, grises neutros,
verde `#00D47E` como único acento. Sin azules, sin morados, sin degradados
arcoíris.

---

## Antes de generar: una advertencia que importa

Para **Proyectos**, no uses imágenes de IA. Meta va a revisar este sitio, y unos
mockups genéricos generados por IA restan credibilidad justo donde más la
necesitas. Usa capturas reales de tus workflows de n8n y de tus flujos de
chatbot, con los datos del cliente tapados o sustituidos por datos de prueba.
La página de referencia (amzigo.com) usa vídeos MP4 de su UI real por este mismo
motivo.

Deja la IA para lo decorativo: el hero y el fondo.

---

## `hero.svg` → `hero.webp` · 800×1000 (vertical)

```
Fotografía de producto editorial, vertical, de un portátil moderno sobre un
escritorio oscuro de madera mate, visto en ángulo de tres cuartos desde arriba.
Iluminación tenue y direccional desde la izquierda, con un sutil rebote de luz
verde esmeralda (#00D47E) sobre los bordes metálicos. Fondo negro carbón casi
uniforme, muy desenfocado. Tonos desaturados excepto el acento verde.
Sin texto, sin logotipos, sin interfaz legible en la pantalla.
Aspecto 4:5, fotorrealista, grano de película fino.
```

Alternativa más abstracta (si prefieres no usar foto de stock):

```
Render 3D abstracto, vertical, de nodos conectados por líneas curvas finas
flotando en un espacio negro profundo. Los nodos emiten un brillo verde
esmeralda suave (#00D47E); las líneas son grises tenues. Profundidad de campo
marcada: los nodos del fondo muy desenfocados. Minimalista, mucho espacio
negativo, sin texto. Aspecto 4:5.
```

---

## `projects/proyecto-01.svg` · 800×500 (16:10)

> Preferible: captura real. Si aun así quieres un placeholder visual:

```
Captura de pantalla estilizada de un panel de automatización de procesos en
tema oscuro, vista ligeramente en perspectiva. Nodos rectangulares conectados
por líneas ortogonales, indicadores de estado en verde esmeralda (#00D47E).
Fondo #0A0A0B, tarjetas #141416, texto gris ilegible (sin palabras reales).
Limpio, moderno, sin marcas ni logotipos. Aspecto 16:10.
```

## `projects/proyecto-02.svg` · 800×500 (16:10)

```
Captura de pantalla estilizada de una conversación de mensajería en tema oscuro,
mostrada dentro de un marco de móvil sin marca. Burbujas de chat alternadas:
las entrantes en gris #1C1C20, las salientes en verde esmeralda #00D47E con
texto oscuro. El texto debe ser ilegible/abstracto, sin palabras reales.
Fondo #0A0A0B. Aspecto 16:10.
```

---

## `og.jpg` · 1200×630 — imagen para compartir en redes

```
Composición gráfica horizontal sobre fondo negro #0A0A0B. A la izquierda, mucho
espacio negativo. A la derecha, una forma geométrica abstracta de nodos
conectados con brillo verde esmeralda (#00D47E), desenfocada en los bordes.
Minimalista, sin texto. Aspecto 1200x630.
```

> El texto del OG lo pone el propio HTML; la imagen debe ir **sin texto** para
> que no se duplique ni se corte al recortar en distintas plataformas.

---

## `tech/*.svg` — logotipos de tecnologías

**No los generes con IA.** Descarga los logotipos oficiales (SVG) desde las
páginas de marca de cada proyecto; usar una versión inventada de la marca de un
tercero es un problema legal y además se nota.

Los placeholders actuales son lettermarks sobrios, así que la cuadrícula se ve
coherente mientras los consigues. `render.js` oculta el `<img>` si falla la
carga y deja sólo el nombre, de modo que un archivo que falte nunca rompe el
diseño.

Archivos esperados en `assets/img/tech/`:
`n8n · whatsapp · php · mysql · js · node · laravel · docker · meta · openai · postgres · git`

Para cambiar la lista, edita `TECH` en `assets/js/content.js`.
