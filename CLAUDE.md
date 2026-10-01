# Fosque Reformer — sitio B2C

Sitio de Fosque Reformer (Pilates Moderno sobre el Reformer de Autor, Núñez). Next.js 16 App
Router + TypeScript + Tailwind v4 + GSAP (ScrollTrigger, SplitText) + Lenis. Deploy en Vercel.

**Fuente de verdad del contenido (desde el 30-sep-2026): el PDF "ARCHITECTURE & COPYWRITING WEB
B2C"** (en `fotos-nuevas/nuevo-pdf-30092026/`, fuera del repo). Todo el copy está tal cual en
`content/`. **Fuera de esta etapa:** selector de país e idioma, Iniciar Sesión (no hay portal),
reservas, pagos, bot.

Documentos hermanos: `DIRECCION-DE-ARTE.md` (la lectura original del material), `DECISIONES.md`
(lo que decidí solo y por qué, con el gasto de Higgsfield), `PENDIENTES.md` (cada dato del
cliente que falta y dónde va).

## Dirección de arte en cuatro líneas

- **La película del inicio no se toca** (la aprobaron): fachada → pasillo de arcos → el sol,
  sobre oscuros cálidos.
- **Páginas internas sobre lino (`#f4eee6`)**, el Método en el rosa del manual (`#d0b5b2`), y el **tricolor de la fachada** (magenta, coral,
  naranja) en CTA e interacciones. CTA naranja con texto noche. Contrastes en `globals.css`.
- **Tipografía:** Baloo Bhaijaan 2 (700/800) en titulares; Figtree (400/600) en el resto. El PDF
  pide "Serif"; el manual no tiene: no se usa.
- **Ornamento único:** la ola tricolor de la fachada (`components/Ola.tsx`) entre la portada de
  cada página y lo que sigue.

## Páginas

| Ruta | Contenido (PDF) | Secciones |
|---|---|---|
| `/` | Hero + adelantos | `Pelicula` (H1 "¿Qué es lo más importante de tu vida?"), `Intro`, `ReformerGiro`, `MetodoTexto adelanto`, `Pilares`, `Membresias`, `Sedes`, `Contacto` |
| `/metodo` | §3 Método, Niveles & Evolución, Fosque Niños | `Portada`, `MetodoTexto`, `Niveles` (#niveles), `Ninos`, `Cierre` |
| `/experiencia` | §4 Los 3 Pilares | `Portada`, `Pilares`, `Cierre` |
| `/profesionales` | §5 Cultura de Amabilidad | `Portada`, `Profesionales`, `Cierre` |
| `/equipamiento` | §6 Reformer de Autor y espacios | `Portada`, `ReformerGiro`, `Puntos`, `Galeria`, `Cierre` |
| `/sucursales` | §7 Encontrá tu Sucursal F | `Portada`, `Sedes conMapa`, `Cierre` |
| `/membresias` | §8 Smart Pricing (USD) | `Portada`, `Membresias`, `Cierre` |
| `/academia` | §9 Academia F | `Portada`, `Academia`, `Cierre` |
| `/franquicias` | §10 Landing pre-franquicias B2B | `Portada`, `Franquicias` (sin Cierre B2C) |

Header: isotipo, música (sólo si hay tema), CTA y botón **Menú** a pantalla completa con los
nueve destinos (`content/sitio.ts` → `navegacion`).

## El arco de luz

Una sola variable de fondo (`--luz-fondo`) y una de tinta recorren cada página; cada
`.escena[data-luz]` declara su luz (`lib/luz.ts`) y `components/Motor.tsx` interpola leyendo el
progreso de cada escena. El Motor vive en el layout: Lenis se crea una vez y el arco, los reveals
y el parallax se rearman **en cada ruta** dentro de un `gsap.context` (nunca
`ScrollTrigger.getAll().kill()`: mataría los triggers de la película o del giro).

**Regla:** el arco pinta las escenas **oscuras** (ahí está el cambio suave que gusta: los tres
pilares van oliva → ámbar → rosado, y antes del footer marrón → noche). Las **claras** (`.claro`:
lino, y rosa en el Método) pintan siempre su propio fondo. Los tiempos dependen del sentido del
cruce (`Motor.tsx`): entre oscuras, lento (top 85% → 35%); hacia una clara, recién cuando la
clara llega arriba; desde una clara hacia una oscura, apenas asoma. Si el arco cruzara de oscuro
a claro con la oscura todavía en pantalla, el fondo pasa por un gris donde no se lee nada.

**El momento memorable es uno solo: el sol.** El segundo, más chico, es el Reformer que gira.

## Estructura

```
app/            layout (fuentes, header, WhatsApp fijo, Motor), page (las escenas), globals.css,
                terminos/, privacidad/, icon.svg
app/<ruta>/     una carpeta por página (metodo, experiencia, profesionales, equipamiento,
                sucursales, membresias, academia, franquicias)
components/     una sección por archivo + Motor (Lenis/GSAP/arco de luz/reveals), Header,
                Musica, Portada, Ola, Cierre, BotonWhatsApp, Imagen, VideoFondo, Curvas
content/        TODO el copy y los datos: sitio, metodo, experiencia, equipamiento,
                membresias, academia (+ franquicias), sedes, contacto
lib/            imagenes (srcset desde el manifiesto), luz, whatsapp, marca.generado, imagenes.generado.json
scripts/        optimizar-imagenes.mjs, process-video.sh, capturas.mjs, generar-marca.py
assets/source/  renders curados (renders/, texturas/, marca/) — lo demás está en .gitignore
assets/refs/    recortes 16:9 y 9:16 que se subieron a Higgsfield como referencia
public/img/     salida de npm run imagenes (no editar a mano)
public/video/   salida de npm run video (no editar a mano)
video-raw/      clips crudos de Higgsfield (fuera del repo)
reports/        lighthouse-*.report.{json,html}, screens/, frames/
```

## Cómo editar contenido

- **Copy:** todo en `content/*.ts`. Los componentes no tienen texto propio.
- **Datos del cliente:** ver `PENDIENTES.md`; cada uno está marcado `TODO(cliente)`.
- **Promesas suavizadas:** marcadas `// PROMESA` en `content/sitio.ts` y `content/experiencia.ts`.
- **Sumar una sede:** agregar un objeto a `sedes` en `content/sedes.ts` (tipo `Sede`). El
  buscador filtra por nombre, barrio, ciudad y dirección; la tarjeta se arma sola. Si
  `whatsapp` es `null`, usa el general. **No hay que tocar `components/Sedes.tsx`.**
- **Cambiar el arco de luz:** `lib/luz.ts` (colores) y el `data-luz` de cada sección.
- **Reveals:** `data-revelar` (fade), `data-revelar="lineas"` (SplitText por líneas),
  `data-retraso="0.2"`. Sin JS todo es visible.

## Imágenes

`npm run imagenes` lee `assets/source/renders/*.{png,jpg}` y escribe `public/img/<nombre>-<ancho>.{avif,webp}`
en 480/960/1440/1920 (sin escalar hacia arriba) más `lib/imagenes.generado.json` con el blur.
Cuando lleguen los renders originales: reemplazar el archivo con el mismo nombre y correr el
script. `components/Imagen.tsx` los usa por nombre (`imagen("salon-reformer-sol-frontal")`).

## Videos

Clips generados con Seedance 2.0 en Higgsfield (proyecto "Fosque Reformer web"): `entrada` y
`hacia-el-sol` (rehechos el 1-oct con la fachada nueva), `sol-loop`, `materiales-loop` (sin uso
hoy) y `reformer-giro` (3,85 s, fondo llevado a blanco con `colorlevels` para que se funda con
el lino por multiply). Referencias en `assets/refs/`, prompts y jobs en `DECISIONES.md`.

`npm run video` (`scripts/process-video.sh`) toma `video-raw/<clip>.mp4` y `<clip>-mobile.mp4` y deja en `public/video/`:
`<clip>.mp4` (H.264, ≤1080p, ~2-3 MB), `<clip>.webm` (VP9), `<clip>-poster.webp`, `<clip>-final.webp`
y, sólo para `entrada` y `hacia-el-sol`, `<clip>-scrub.mp4` (1440 px, GOP 3, ~6 MB) para el scrub
de escritorio. Al final imprime la diferencia entre el último fotograma de `entrada` y el primero
de `hacia-el-sol`: el empalme de escritorio da 14/255 (bien); el mobile da 35/255 y está cubierto
por un fundido de 300 ms (`.en-sol-capa` en `Pelicula.tsx`).

**Para regenerar o reemplazar un clip:** dejar el nuevo archivo en `video-raw/` con el mismo
nombre (`entrada`, `hacia-el-sol`, `sol-loop`, `materiales-loop`, `reformer-giro`, más `-mobile`)
y correr `npm run video`. Los componentes ya apuntan a esas rutas; no hay que tocarlos. Si un
archivo falta, el sitio muestra el póster y se ve terminado igual.

**Scrub:** `Pelicula.tsx` setea `currentTime` desde el progreso del ScrollTrigger. Probado en
Chrome (capturas en `reports/screens/desktop-01-recorrido.png` y `-02-sol.png`). En Safari no se
probó en esta máquina (Windows). Si diera tirones, la alternativa anotada es una secuencia de
fotogramas WebP dibujada en un `<canvas>` (extraer con `ffmpeg -vf fps=12` y `drawImage` por
progreso); los pósters ya cubren el caso sin video.

## Rendimiento y accesibilidad

- Mobile primero. Las animaciones se simplifican (sin pin, sin scrub) y no se apagan.
- `prefers-reduced-motion`: sin Lenis, sin video, cada escena en su estado final.
- Nada depende de hover. Foco visible con `outline` manteca (o corteza sobre claro).
- Los `-scrub` (≈6 MB cada uno) se piden recién después de `load`, y los loops tienen
  `preload="none"` y se pausan fuera de pantalla.
- El LCP es la fachada (`fachada-nunez-atardecer`): `preload` con `imagesrcset` desde `app/page.tsx`.
- Lighthouse: `reports/lighthouse-mobile-*.report.html` y `-desktop`. Capturas: `node scripts/capturas.mjs`
  (necesita `puppeteer-core` resoluble; `PUPPETEER_DIR=<ruta a node_modules/puppeteer-core>`).

## Comandos

```
npm run dev        # desarrollo
npm run build      # build de producción
npm run start      # servir el build (en las pruebas se usó -p 3123)
npm run imagenes   # regenerar public/img desde assets/source/renders
npm run video      # regenerar public/video desde video-raw
vercel deploy      # (--prod para producción); .vercelignore no hace falta, .gitignore alcanza
```

## Reglas que no se negocian

- Sin plantillas de gimnasio: nada de hero con degradé ni tarjetas redondeadas iguales.
- Si una animación rompe el performance, se recorta la animación, no el performance.
- Cero dependencias que no se usen. Lo que se puede hacer con CSS, no va a GSAP.
- No abusar del logo: isotipo en el header, lockup una sola vez en el footer.
- Texto chico de acento: sobre lino `magenta-hondo`, sobre marrón `manteca`. El naranja y el
  magenta puros sólo en tamaños grandes o como fondo de botón (contrastes en `globals.css`).
- Los renders son de Artagaveytia-Mantel y el estudio no está construido: no publicar sin la
  autorización del cliente (ver `PENDIENTES.md`).
