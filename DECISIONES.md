# Decisiones tomadas sin consultar

Cada línea: qué decidí y por qué. Fecha de arranque: 27-sep-2026.

## Bloque A — videos

- **Balance inicial en Higgsfield: 785,41 créditos** (plan ultimate, sin generaciones
  ilimitadas disponibles). Piso de corte: 20 % = 157 créditos.
- **Modelo: `seedance_2_0`** (Seedance 2.0, Bytedance). Confirmado que acepta
  `start_image` y `end_image`, 1080p en modo `std`, y `generate_audio: false`.
  Seedance 2.5 también acepta start/end pero sólo vía `omni_reference`; me quedé con 2.0
  porque es el que pediste por nombre y el rol de fotogramas es explícito.
- **Proyecto en Higgsfield: "Fosque Reformer web"**, id `0001b98e-7fbe-4ebd-a64c-77313213a521`.
- **Costos medidos con `get_cost` antes de gastar:** 8 s 16:9 1080p = 72 · 10 s 16:9
  1080p = 90 · 8 s 9:16 720p = 36 · 10 s 9:16 720p = 45.
- **Los 10 clips en 1080p no entran en el presupuesto** (≈ 792 > 785). Resolución elegida
  por clip: la bajada (entrada, hacia-el-sol) y el sol-loop en **1080p** porque son la
  película; reformer-loop y materiales-loop en **720p** porque van detrás de texto y con
  oscurecimiento encima; las cinco verticales en **720p** porque el teléfono las escala
  poco. Total estimado **522 créditos**, sobran ~263: hay lugar para un reintento en 1080p.
- **Referencia del clip 4 (reformer-loop): `sala-kids-arbol-reformer`** (REF_p01). Es el
  único render de *Reformer 2* donde el aparato es el objeto de la toma, sobre un
  pedestal iluminado; los otros dos son salas. Para el 9:16 recorté al 40 % del ancho
  para que el pedestal quede centrado.
- **Encuadres 9:16:** el sol al 61 % del ancho (el disco queda centrado en el recorte
  vertical), la fachada al 45 % (la puerta), el corredor al 50 % (el eje).
- Higgsfield sugirió el preset "IN THE DARK" para el prompt del sol. **Lo decliné y
  generé literal**: el brief pide el render tal cual, no un look ajeno.
- El rol para los loops de referencia única es `start_image` (toma fija: el primer
  fotograma es la referencia).

### Resultado de la tanda (27-sep, 21:50–22:00)

- **Balance después de los 10 clips: 263,41** (gasto 522, exacto a lo estimado).
- Jobs: sol-loop `1ff947be`, entrada `4e5bcd14`, hacia-el-sol `99f3bf8a`, reformer-loop
  `49ae8a37`, materiales-loop `4210e914`; verticales: entrada `08b24e51`, hacia-el-sol
  `1f7febbe`, sol-loop `55a152fb`, reformer-loop `442cc4d9`, materiales-loop `1952db5f`.
- **Pasan:** sol-loop (los dos), entrada (los dos), hacia-el-sol (los dos), materiales-loop
  (los dos).
- **hacia-el-sol** tiene un morfeo en el medio (segundos 6–7: los molinetes se funden con
  un mostrador antes de abrirse la sala). En scrub es una disolvencia de un segundo; lo
  acepté porque el arranque y el final (el sol centrado) son exactos, que es lo que importa
  para el empalme y para el pico.
- **entrada** tiene una mancha oscura al pie de la cortina durante ~2 s (segundos 1,5–3),
  cortada por el borde inferior. La miré ampliada: no es claramente una persona. No gasté
  un reintento ahí.
- **reformer-loop: rechazado y rehecho.** Fue error mío de referencia: en
  `sala-kids-arbol-reformer` lo que hay sobre el pedestal es un aparato infantil, no el
  Reformer, y la versión vertical termina con una doble exposición. Relanzado con
  `salon-reformer-domo-general` (también de *Reformer 2*, con los Reformers en fila), y el
  prompt pasó de "órbita alrededor de un Reformer" a "deriva lateral lenta a lo largo de la
  fila", porque en ese render no hay un aparato aislado para orbitar. Costo del reintento:
  72 (36 + 36) → balance esperado 191, arriba del piso de 157. Los descartados quedan en
  `video-raw/descartados/`.
- **reformer-loop v2:** la vertical es fiel al domo. La 16:9 mantiene madera, ámbar y los
  Reformers en fila pero el modelo abrió ventanales a un paisaje que no existe en el render.
  Como va detrás del texto de "El método" oscurecida al 66 % y ya usé los dos intentos del
  clip, la acepto; es el primer candidato a regenerar cuando lleguen los renders originales.

## Bloque B/D — sitio

- **Contrastes medidos** (WCAG, con script): hueso/noche 14,9 · hueso/marrón 5,5 · manteca/marrón
  5,2 · noche/terracota (CTA) 6,1 · noche/arena 8,4 · corteza/arena 5,75 · **gris del manual
  sobre arena 2,57: descartado para texto** · arena/marrón 3,1 y salvia/marrón 4,3: sólo texto
  grande. Por eso el texto secundario sobre arena es corteza, no gris.
- **Arco de luz:** empecé con un tween con scrub por escena sobre la misma variable CSS y se
  pisaban al saltar de sección (membresías quedaba en negro). Lo reemplacé por una sola
  función que interpola leyendo el progreso de cada escena, más un `ResizeObserver` que
  refresca ScrollTrigger cuando la película crece a 400vh después de montar.
- **Membresías tiene `bg-arena` propio** aunque el arco ya pinta arena: sin JS o antes del
  primer scroll el texto oscuro no puede quedar sobre fondo oscuro.
- **Scrub de escritorio:** los `-scrub` con keyframe por fotograma pesaban 16 MB cada uno.
  Bajé a 1440 px, GOP 3, crf 27 (≈6 MB) y se piden recién después de `load`. Con GOP 3 cada
  seek decodifica como mucho 2 cuadros: no se nota.
- **LCP mobile:** Chrome descarta el póster de la fachada como candidato (baja entropía:
  73 KB para 780×1688) y toma la bajada de la portada, que esperaba al JS y al reveal
  (3,6 s). Titular y bajada de la portada ya no usan reveal por JS: entran por transform
  en CSS, pintados desde el primer cuadro. El reveal por líneas sigue en el resto.
- **`aria-label` en los CTA:** los saqué. El texto visible ("Reservá tu Semana de
  Experiencia") ya es el nombre accesible; un aria-label distinto rompe
  `label-content-name-mismatch`.
- **`noindex` mientras no haya dominio** (`app/layout.tsx`): por eso Lighthouse SEO da 63.
  Es a propósito; se saca al publicar.
- **Favicon:** `app/icon.svg`, isotipo hueso sobre marrón, generado desde el SVG del manual.
- **Formulario de contacto sin backend:** arma el mensaje y abre WhatsApp. No hay servicio
  de mail configurado y el brief dice "formulario simple opcional".
- **Safari:** no hay Safari en esta máquina (Windows); el scrub se probó sólo en Chrome. La
  alternativa (secuencia de fotogramas sobre canvas) queda anotada en CLAUDE.md.
- **Imports dinámicos de GSAP/Lenis: probados y descartados.** Con `import()` en los efectos
  el LCP simulado en mobile pasó de 3,6 s a 4,1 s (perf 90 → 87): Lighthouse cuenta todos
  los pedidos que arrancan antes del primer pintado, y la partición agrega cuatro chunks
  ahí. Vuelto a imports estáticos. El LCP real observado es de 230–290 ms; los 3,6 s son
  la simulación de 4G lento con CPU 4× más lenta.
- **Por qué el LCP es texto y no el póster:** Chrome descarta como candidato a una imagen
  que cubre exacto el viewport (la trata como fondo). Es por diseño: el póster va a sangre.
- **Header que parpadeaba al bajar (28-sep):** con Lenis el evento de scroll dispara cada
  cuadro y hay cuadros con delta 0; el header leía "no está bajando" y reaparecía. Ahora
  sólo cambia de estado con un desplazamiento acumulado ≥ 8 px, y la transición es sólo de
  `transform` (sin fondo ni blur, que repintaban). Medido con MutationObserver: 1 cambio de
  clase en una bajada continua, contra 6 antes.
- **Header siempre visible (28-sep, pedido de Lautaro):** se saca el esconder/mostrar por
  dirección de scroll; queda fijo y toma fondo pasados los 40 px.

## 30-sep / 1-oct — material nuevo, PDF definitivo y sitio en páginas

Pedido de Lautaro: regenerar la intro con la fachada nueva sin quemar créditos, sumar el
Reformer negro, pasar a secciones según el PDF "ARCHITECTURE & COPYWRITING WEB B2C" (que se
toma como verdad), aplicar su paleta y dejar afuera los idiomas.

### Videos (balance de arranque 1.344,41)

- **Fachada horizontal:** el render nuevo es vertical (723×1031). Outpaint de Higgsfield a 16:9
  (2 créditos) y borrado del escudo verde con texto ilegible (gpt_image_2_5, 0,25): la edición
  volvió en 1344 px, así que sólo pegué el parche del escudo sobre la versión de 2752 px.
  El 9:16 sale recortado de esa misma imagen.
- **Un clip por vez y primero el vertical** (720p, 45) para validar el movimiento antes de
  gastar en el 16:9 de 1080p (90).
- **Seedance 2.0 no respeta siempre el start_image:** `hacia-el-sol-mobile` arrancó con un busto
  y otro encuadre (empalme 34/255, cubierto por el fundido de 300 ms que ya existía). Para el
  16:9, el `hacia-el-sol` arranca desde **el último cuadro real de `entrada`**, no desde el
  render, para que el empalme del scrub sea exacto.
- **Reformer que gira:** prueba única a 720p (36; el primer intento falló sin cobrar). Los
  primeros 3,9 s giran limpio de tres cuartos a perfil; después hay un corte y la torre se
  deforma. Uso sólo ese tramo (`video-raw/reformer-giro.mp4`), sin reintentos.
- `reformer-loop` sale del sitio (era el clip más flojo y la sección que lo usaba ya no existe).

### Sitio

- **Paleta:** la película queda como estaba (la aprobaron). El tricolor de la fachada (magenta,
  coral, naranja) pasa a CTA e interacciones y las páginas internas van sobre lino. CTA en
  naranja con texto noche (8,4); magenta sobre lino da 3,3, así que el texto chico de acento
  usa `magenta-hondo` (4,9).
- **Sin serif:** el PDF pide "detalles en Serif"; el manual de marca no tiene serif. Sigue
  Baloo + Figtree.
- **Ornamento único:** la ola tricolor de la fachada como borde entre la portada de cada página
  y el lino. Sale de la arquitectura, no es decoración genérica.
- **Menú a pantalla completa en todos los tamaños:** nueve destinos no entran en una barra.
- **Motor por ruta:** con navegación del lado del cliente el Motor (en el layout) rearma arco de
  luz y reveals en cada ruta dentro de un `gsap.context`; antes hacía
  `ScrollTrigger.getAll().kill()`, que en multi-página mataba los triggers de la película.
- **Música:** Higgsfield sólo genera voz para uso general, no música. El reproductor está
  hecho (apagado al entrar, fundido de 0,9 s, sigue sonando al cambiar de página); falta el
  tema con licencia, y sin él el botón no aparece.
- **No puse:** Iniciar Sesión (no hay portal), selector de país/idioma (fuera de etapa), texto
  inventado para Fosque Niños.
