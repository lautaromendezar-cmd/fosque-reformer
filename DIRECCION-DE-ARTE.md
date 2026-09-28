# Fosque Reformer — Fase 1: extracción, lectura y dirección de arte

Fecha: 27-sep-2026. **Pendiente de tu aprobación antes de escribir una línea del sitio.**

---
## 0. El brief

Llegó el 27-sep. Confirma el concepto, las dos promesas a suavizar y todo lo que queda
afuera. El guion de escenas de la sección 4 está **reescrito contra las ocho secciones
del brief**: ya no propone ninguna sección que el brief no pida.

Sigue abierto, y es lo único que frena la Fase 2: **tu OK a la paleta (sección 2) y a la
familia tipográfica única**.

---

## 1. Qué se extrajo

Sin `pdfimages` en esta máquina, usé PyMuPDF (mejor: saca los bitmaps embebidos en su
resolución nativa, sin rasterizar la página).

```
assets/source/
  renders/      21 renders reales, nombrados por lo que muestran
  texturas/      5 texturas y patrones (curvas de nivel, ágata, panel acústico…)
  marca/         logo en SVG vectorial + PNG 600dpi + página de paleta
  descartados/  88 recortes: logos repetidos, planos, cotas, capturas
  _pages/       las 89 páginas renderizadas (para consultar, no para el sitio)
  _sheets/      hojas de contacto
```

### Los renders curados

| archivo | qué es | px |
|---|---|---|
| `salon-reformer-sol-frontal` | **el salón grande con el sol al fondo** | 1600×893 |
| `salon-reformer-sol-frontal-alt` | misma toma, otra iluminación | 1600×893 |
| `salon-reformer-sol-lateral` | el mismo salón desde el costado | 1200×600 |
| `salon-reformer-sol-nocturno` | el mismo salón en clave fría / noche | 1127×589 |
| `salon-reformer-cielorraso-organico-a` / `-b` | salón 2, cielorraso ameba iridiscente | 922×922 |
| `salon-reformer-domo-general` | salón 2 desde la entrada, domo y luz ámbar | 1344×768 |
| `fachada-nunez-dia` | la fachada desde la vereda, día | 815×514 |
| `corredor-arcos-dorado` / `-arbol` | el túnel de arcos de ingreso | 960×480 |
| `snackbar-coffee-corner`, `snackbar-detalle` | barra y cafetería | 1200×600 |
| `ministore-retail` | el mini store | 1200×600 |
| `sala-kids-arbol-reformer` | sala kids con el árbol tallado | 1344×768 |
| `sala-kids-escalada` | sala kids, muro de escalada | 922×615 |
| `estanteria-arbol-tallado` | el mueble-árbol tallado (pieza fuerte) | 1076×717 |
| `estanteria-discos-madera` | estantería de discos de madera | 1344×768 |
| `vestuario-bachas-mural-agua` / `-duchas-` | vestuarios, mural de agua | 1344×768 |
| `vestuario-piedra-vegetacion` | vestuario en piedra, penumbra | 922×615 |

**Problema de resolución, y es serio:** el render más grande es **1600×893**. Para un
fondo a sangre en un monitor de 2560 hay que escalar 1,6×. En renders suaves se banca
(no tienen detalle fino que se rompa), pero conviene **pedirle a Artagaveytia-Mantel los
originales**. Si los mandan, el sitio sube un escalón entero sin tocar una línea de código.

---

## 2. La marca

### Paleta declarada (manual, página 4)

`#d0b5b2` `#ffe08c` `#c2d3d0` `#696866` `#b07358` `#d38249` `#bbbbb9` `#bfbbaa`
`#c5ac94` `#b3977c`

Y una grilla de combinaciones que agrega: `#cfb6b8` `#8b5253` `#d9d6cc` `#c9afc6` `#b89595`.

Reglas del manual: contraste suave (claro + medio, sin extremos), equilibrio frío-cálido,
base neutra + acento, y armonía por desaturación.

**El problema:** los diez colores son pasteles de valor medio. Un sitio construido sólo
con eso queda exactamente en el lugar que no queremos: wellness genérico, crema y pastel.
Y además **no se parece a los renders**, que son mucho más oscuros y cálidos.

**La salida está en el propio manual:** su tapa no usa ninguno de los diez. Es un
**marrón cálido `#71564b`** con las curvas de nivel encima. Ese es el suelo de la marca.
Lo tomo como base y uso los diez pasteles como acentos y como color de texto, que es lo
que el manual hace con su propia tapa.

### Paleta final propuesta

| token | hex | de dónde sale | uso |
|---|---|---|---|
| `--noche` | `#1c1310` | oscuros de los renders | fondo de la escena del sol y del footer |
| `--corteza` | `#42302a` | renders | fondos intermedios |
| `--marron` | `#71564b` | **tapa del manual** | el ground por defecto |
| `--arena` | `#c5ac94` | paleta | fondo claro (precios) |
| `--hueso` | `#efe7dd` | derivado | texto sobre oscuro |
| `--manteca` | `#ffe08c` | paleta | **la luz**: el sol, los halos |
| `--terracota` | `#d38249` | paleta | CTA |
| `--arcilla` | `#b07358` | paleta | bordes, hover |
| `--salvia` | `#c2d3d0` | paleta | el frío de los vestuarios |
| `--rosa` | `#d0b5b2` | paleta | acento chico |
| `--gris` | `#696866` | paleta | texto secundario sobre claro |

Los contrastes los mido con herramienta antes de fijarlos, no a ojo.

### Tipografía — **no hace falta alternativa**

El manual declara **Baloo Bhaijaan 2** y aclara que se consigue en Google Fonts. Lo
verifiqué en los PDF: está embebida en los dos manuales, en Regular y Bold. **Es gratis y
es la de la marca.** No hay nada que reemplazar.

Propuesta, y acá sí quiero tu OK porque toca tu regla de "una sola familia":

- **Una sola familia: Baloo Bhaijaan 2.** El contraste lo dan el peso (400 / 600 / 800) y
  la escala, no una segunda tipografía. Es lo que pide el manual ("una tipografía general
  para todo tipo de comunicaciones") y coincide con cómo venís trabajando.
- El riesgo: Baloo es redonda y de trazo grueso; en párrafos largos pesa. Se compensa con
  peso 400, interlínea 1,7 y medida de 62 caracteres. Si al verlo no te cierra, el plan B
  es Baloo en títulos y un neutro de cuerpo (Figtree), pero prefiero no abrir esa puerta.

**El logotipo no es Baloo.** Es una geométrica ancha oblicua (familia Eurostile /
Michroma), dibujada como vector. **No se recrea con ninguna fuente**: se usa el SVG que
ya extraje en `assets/source/marca/logo-lockup.svg`.

### Reglas del logo y el motivo

- El manual dice, textual, **"evitar exceso de uso de logotipo"**. En el sitio eso se
  traduce en: isotipo (el óvalo FR) en el header, lockup completo una sola vez, en el
  footer. Nada de marca de agua repetida.
- Hay dos aplicaciones aprobadas: **centrado** y **marginado**. Uso marginado.
- **Curvas de nivel:** es el gesto gráfico más fuerte de la marca y no está en la paleta.
  Aparecen en la tapa del manual y en la fachada (la cortina de la fachada son las mismas
  curvas en terracota). Van como SVG propio, un solo trazo a `#ffffff` con 6-8% de
  opacidad sobre los fondos oscuros, y es lo único que se anima en el fondo.
- Otras reglas del manual: **planos cercanos**, color minimalista, texturas naturales.

---

## 3. Lectura de los renders

### Luz

Toda la obra está iluminada con **una sola temperatura: ámbar 2700K**, casi siempre
rasante o desde atrás. No hay luz cenital blanca en ningún render. La luz nace de tres
formas: un **disco solar** gigante al fondo del salón, **líneas LED** escondidas en los
bordes de cielorrasos y muros, y **muros retroiluminados** con vegetación impresa.

La gradación entre renders es la película entera, ya hecha:
día frío en la fachada → dorado cerrado en el corredor → ámbar pleno en el salón →
iridiscencia pastel en el cielorraso ameba → agua fría verde-azul en los vestuarios.

### Materiales

Travertino y piedra clara, madera clara tallada (árboles deconstruidos, discos,
estanterías-bosque), vidrios laminados con vegetación y con vetas de ágata, un
**cielorraso de agua**: chapa ondulada que devuelve el reflejo del sol como un techo de
pileta. Los reformers son lo único negro y duro de todo el lugar. Ese contraste
—mecánica oscura sobre materia blanda— es el sitio.

### Encuadres a pantalla completa

- **`salon-reformer-sol-frontal`** — perspectiva de un punto, simétrica, fuga central, el
  sol en el eje y las dos hileras de reformers llevando el ojo hasta él. Es la mejor
  imagen del paquete por lejos.
- `corredor-arcos-dorado` — túnel, también de un punto: se camina.
- `fachada-nunez-dia` — la única con cielo; sirve de apertura y sólo de apertura.
- `salon-reformer-domo-general` y `-cielorraso-organico-b` — amplias, aguantan sangre.
- `vestuario-bachas-mural-agua` — horizontal, el mural corre de lado a lado.

### Encuadres de detalle

`estanteria-arbol-tallado`, `estanteria-discos-madera`, `snackbar-detalle`,
`sala-kids-escalada`, `vestuario-detalle-vertical`, `mural-agata-verde`. Son los "planos
cercanos" que pide el manual: van chicos, desplazados, nunca centrados.

---

## 4. La película

### Concepto

**El sitio es un solo atardecer.** El scroll no cambia de tema: cambia la hora. Se entra
por la calle con luz de día, se avanza por el corredor mientras la luz se cierra en
dorado, se llega al salón en el momento exacto del sol, y después la luz se enfría hasta
la noche. El fondo de la página es una sola variable CSS que recorre ese arco con scrub;
todo lo demás (halos, sombras, el color de los bordes) se deriva de ella. No hay diez
efectos: hay una luz que viaja.

### Escala tipográfica

Fluida con `clamp()`, base 17px, medida de 62 caracteres.

| nivel | mobile → desktop | peso |
|---|---|---|
| Display (sólo el sol) | 48 → 132 px | 800 |
| H1 de escena | 34 → 76 px | 700 |
| H2 | 26 → 40 px | 600 |
| Cuerpo | 17 → 19 px | 400, interlínea 1,7 |
| Dato / etiqueta | 12 → 13 px | 600, tracking +0.14em, versalitas |
### El guion, escena por escena

Las ocho secciones del brief, más un telón de apertura. La numeración del brief va entre
paréntesis. El público llega de Instagram y **en su mayoría desde el celular**: el guion
está pensado en vertical primero y recién después se abre a desktop.

**00 · Telón** — fondo `--marron`, las curvas de nivel entrando solas con un
`stroke-dashoffset` lento, el isotipo. Sin imagen. Dura poco: es el negro antes de que
arranque la toma.

**01 · Portada (1)** · luz **día frío** — `fachada-nunez-dia` a sangre, con la copa de los
árboles arriba. El titular entra **por líneas** desde abajo; abajo el CTA de la Semana de
Experiencia, que abre WhatsApp con mensaje prearmado. Es el único momento con cielo y
verde en todo el sitio: por contraste, todo lo que viene después se siente *adentro*.

**02 · El recorrido** · **día → dorado** — puente, sin copy propio. El corredor de arcos
pinneado poco tiempo, con la imagen escalando de 1 a 1.12. Se camina hacia adentro y el
fondo de la página empieza a calentarse. En mobile no pinnea: es parallax.

**03 · EL SOL** · **ámbar pleno** — **el momento memorable, y es el único.**
La sección se pinnea. `salon-reformer-sol-frontal` entra escalado 1.25 y desplazado, de
modo que **el disco solar arranca fuera de cuadro, abajo**. Al scrollear, la imagen sube y
se desescala: el sol aparece por el horizonte del fondo del salón, crece, y termina
clavado en el centro exacto del eje de fuga. Al mismo tiempo el resto de la sala se
oscurece (una capa `--noche` que sube al 55%) y un halo radial `--manteca` se abre desde
el disco hasta pintar toda la página. En el pico entra una sola línea en Display, y nada
más. Después el sol queda quieto y la sección se despinnea.
Técnica: el disco se recorta del render como capa aparte (es un círculo limpio sobre el
muro del fondo) y se scrubbea contra la capa de la sala. Dos capas y un radial-gradient.
**Sin video.**

**04 · La diferencia Fosque (2)** · **ámbar que baja** — los tres argumentos, sin foto a
sangre. Editorial puro sobre el ámbar que quedó: tipografía grande, un detalle chico
desplazado al costado. El argumento del *entorno sensorial* cae justo después del sol, que
es su demostración. Después del pico hay que bajar el volumen o el sol no vale nada.

**05 · Los 4 niveles (3)** · **dorado tibio** — selector interactivo, **informativo: no
evalúa a nadie**. Cuatro estados sobre el mismo panel; al cambiar de nivel se mueve el
contenido, no el layout. En mobile es un carrusel de a uno con los cuatro nombres arriba.

**06 · El método (4)** · **dorado tibio → agua** — la historia del Reformer de autor y los
24 años de Gerardo Fosque en diseño industrial, con los renders de *Reformer 2*. Imagen
grande que sangra, titular que la solapa, cuerpo chico corrido a un costado, parallax leve
y reveals escalonados. **Acá cierra con la tira de materiales** —madera tallada, ágata,
piedra, el cielorraso de agua y los vestuarios— y es donde la luz gira de ámbar a
`--salvia` oscurecido. Es el único cambio de temperatura del sitio y se nota.
*(Nota: el brief no abre una sección de vestuarios; los renders de `Dressing Rooms` entran
acá, como materiales, en vez de inventar una sección.)*

**07 · Membresías (5)** · **arena, claro** — el único bloque claro de toda la página, a
propósito: después de seis pantallas oscuras el precio aparece en papel. Los cuatro packs,
con los **precios y la moneda como placeholder visible**. Sin animación más allá de un fade.

**08 · Sucursales (6)** · **marrón** — arranca con Núñez y nada más. Las curvas de nivel de
fondo hacen de mapa topográfico. Las sedes salen de un archivo de datos: sumar una es
agregar un objeto, sin tocar componentes. Dirección, horarios y WhatsApp: placeholder.

**09 · Contacto (7)** · **noche** — formulario simple opcional. El **botón de WhatsApp fijo
está en todo el sitio**, no sólo acá, y respeta el área segura del iPhone.

**10 · Footer (8)** · **noche** — el lockup completo, una sola vez en toda la página.
Términos y Condiciones, Políticas de Privacidad (páginas vacías) y el link discreto
"¿Querés abrir una sucursal Fosque?" a `/franquicias`, que se construye después.
### Cómo se mueve

- **Lenis** para el scroll, **GSAP + ScrollTrigger** para lo que necesita línea de tiempo.
- El arco de luz es **una sola variable CSS** animada con scrub a lo largo de todo el
  documento. Es barato y es lo que sostiene el concepto.
- **SplitText** por líneas en los titulares de escena, por palabras sólo en el del sol.
- Lo que se puede hacer con CSS se hace con CSS: fades, halos, las curvas de nivel.
- **Mobile:** el pin del sol se mantiene pero dura la mitad, el corredor pasa a parallax
  simple, y el arco de luz queda intacto (es una variable, no cuesta nada). Se simplifica,
  no se apaga. Nada depende de hover.
- **`prefers-reduced-motion`:** cada escena se muestra en su estado final, con la luz
  correspondiente ya aplicada. El sol aparece completo, quieto y centrado. Se pierde el
  movimiento, no la película.

---
## 5. Lo que falta o se contradice

El brief cerró casi todo. Queda esto.

**Para arrancar la Fase 2 necesito**

1. **Tu OK a la paleta.** Los diez colores del manual son pasteles de valor medio: un sitio
   hecho sólo con eso queda en wellness genérico y además no se parece a los renders. Mi
   propuesta toma el marrón de la tapa del manual (`#71564b`) como suelo y deja los
   pasteles como acentos. Es la decisión de diseño más grande de todo esto.
2. **Tu OK a una sola familia tipográfica** (Baloo Bhaijaan 2, contraste por peso y escala).

**Datos del cliente — van como placeholder visible y quedan listados en PENDIENTES.md**

3. Precios de los packs y **moneda**. El Master Suite los trae en USD (40 / 72 / 96 / 112);
   el brief dice que todavía no está definido.
4. **Dirección, horarios y WhatsApp de Núñez.** Ojo con uno: el brief la da por pendiente,
   pero **el manual de arquitectura la trae escrita** en la página de fachadas —
   *11 de Septiembre 3635, Núñez, Argentina*. Si es esa, la pongo y se cierra un pendiente.
5. **La oferta de entrada exacta**: semana sin cargo, postulación o pack de prueba. Cambia
   el texto del CTA principal y el mensaje prearmado de WhatsApp.
6. **Dominio definitivo.**

**Del material, y esto sí me preocupa**

7. **Autorización de los renders de Artagaveytia-Mantel.** El estudio no está construido:
   todo el sitio se apoya en obra ajena y no construida. Hace falta el OK y definir si se
   los acredita — su firma aparece impresa en los renders de `Reformer 2` y `Dressing Rooms`.
8. **Resolución: 1600×893 es el techo.** Alcanza porque son renders suaves, pero si el
   estudio manda los originales el sitio sube un escalón sin tocar una línea de código.
9. **Material contaminado, ya separado en `descartados/`.** Adentro del manual de
   arquitectura hay **capturas de Pinterest** con la UI del teléfono y el botón "Guardar"
   (crédito a Moooi & Co), **listados de Alibaba con precios FOB** de proveedores chinos, y
   **fotos de stock** (un licuado, una sala vacía). En el manual de marca, las tres páginas
   de "Propuesta Luxury" son fotos de stock de gente haciendo pilates. Nada de eso sale al
   sitio.

**Chequeos menores**

10. El manual dice **"evitar exceso de uso de logotipo"**: isotipo en el header, lockup
    completo una sola vez en el footer. Nada de marca de agua repetida.
11. El brief fija **20 Reformers por sala**; el render del salón del sol muestra bastantes
    más. Uso 20, que es lo que dice el brief.

**Las dos promesas a suavizar — confirmadas por el brief**

12. *"disponibilidad garantizada"* → **"pensado para que siempre haya un lugar en tu
    horario"**.
13. *"sin riesgo de lesiones"* → **"una progresión cuidada, acompañada"**.
    Las dos quedan marcadas con comentario en el archivo de contenido, para revisar con el
    cliente.
