# Fosque Reformer — index

Sitio de Fosque Reformer (pilates Reformer boutique, Núñez). Next.js 16 App Router +
TypeScript + Tailwind v4 + GSAP (ScrollTrigger, SplitText) + Lenis. Deploy en Vercel.
Alcance: sólo el index y dos páginas legales vacías. **Fuera:** franquicias, portal, reservas,
pagos, bot, test de nivelación, inglés (`brief-index-fosque-reformer.md`).

Documentos hermanos: `DIRECCION-DE-ARTE.md` (la lectura del material y el plan aprobado),
`DECISIONES.md` (lo que decidí solo y por qué, con el gasto de Higgsfield), `PENDIENTES.md`
(cada dato del cliente que falta y dónde va).

## Dirección de arte en tres líneas

- **El suelo es el marrón de la tapa del manual (`#71564b`)**; los diez pasteles del manual son
  acentos. La paleta completa y sus contrastes medidos están en `app/globals.css` (`@theme`) y
  en `DECISIONES.md`. El gris del manual (`#696866`) **no** sirve para texto sobre arena.
- **Tipografía:** Baloo Bhaijaan 2 (700/800) sólo en titulares y display; Figtree (400/600)
  en cuerpo, datos e interfaz. Escala fluida en `globals.css`.
- **Los renders son los protagonistas** (Artagaveytia-Mantel). Nada de stock. El logo sale de
  los vectores del manual (`public/*.svg` → `lib/marca.generado.ts`), no se redibuja.

## La película (guion de escenas)

El scroll es el tiempo de una toma. Una sola variable de fondo (`--luz-fondo`) recorre el
sitio; cada `.escena[data-luz]` declara su luz y `components/Motor.tsx` interpola entre
escenas consecutivas leyendo el progreso de cada una (una única función `pintar`: **no** un
tween por escena, se pisan). Las luces viven en `lib/luz.ts`.

| # | Sección (brief) | Componente | Luz | Qué pasa |
|---|---|---|---|---|
| 1 | Portada + recorrido + **el sol** | `Pelicula` | `dia` → dorado | Un solo plano continuo. Escritorio: 400vh pineados, los clips `entrada` y `hacia-el-sol` se scrubbean; el titular de la portada vive sobre el arranque y el del sol entra al final con halo y oscurecimiento. Mobile: 100svh, los clips se reproducen solos y se pausan tocando. Sin video: los pósters hacen lo mismo con transformaciones. |
| 2 | La diferencia Fosque | `Diferencia` | `ambar` | Tres argumentos, editorial puro, `sol-loop` detrás oscurecido. |
| 3 | Los 4 niveles | `Niveles` | `tibio` | Tabs accesibles, informativas, sin imagen. |
| 4 | El método | `Metodo` | `marron` | Reformer de autor + Gerardo Fosque, `reformer-loop` detrás. |
| 4b | Lo que se toca | `Materiales` | `agua` | Tira de materiales (cierra "El método"), `materiales-loop` detrás. Único giro de temperatura. |
| 5 | Membresías | `Membresias` | `arena` (clara) | El único bloque claro. Tiene `bg-arena` propio para que el texto oscuro nunca quede sobre fondo oscuro. |
| 6 | Sucursales | `Sedes` | `marron` | Buscador + tarjetas desde `content/sedes.ts`, curvas de nivel de fondo. |
| 7 | Contacto | `Contacto` | `noche` | Formulario que arma un mensaje y abre WhatsApp. Sin backend. |
| 8 | Footer | `Footer` | `noche` | Lockup completo (única vez), legales, link discreto a `/franquicias`. |

**El momento memorable es uno solo: el sol.** Todo lo que viene después baja el volumen.

## Estructura

```
app/            layout (fuentes, header, WhatsApp fijo, Motor), page (las escenas), globals.css,
                terminos/, privacidad/, icon.svg
components/     una escena por archivo + Motor (Lenis/GSAP/arco de luz/reveals),
                Header, BotonWhatsApp, Imagen (picture AVIF/WebP + blur), VideoFondo, Curvas
content/        TODO el copy y los datos: sitio, experiencia, niveles, membresias, sedes, contacto
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

Cinco clips generados con Seedance 2.0 en Higgsfield (proyecto "Fosque Reformer web"), en
16:9 y 9:16. Referencias en `assets/refs/`, prompts y jobs en `DECISIONES.md`.

`npm run video` (`scripts/process-video.sh`) toma `video-raw/<clip>.mp4` y `<clip>-mobile.mp4` y deja en `public/video/`:
`<clip>.mp4` (H.264, ≤1080p, ~2-3 MB), `<clip>.webm` (VP9), `<clip>-poster.webp`, `<clip>-final.webp`
y, sólo para `entrada` y `hacia-el-sol`, `<clip>-scrub.mp4` (1440 px, GOP 3, ~6 MB) para el scrub
de escritorio. Al final imprime la diferencia entre el último fotograma de `entrada` y el primero
de `hacia-el-sol`: el empalme de escritorio da 14/255 (bien); el mobile da 35/255 y está cubierto
por un fundido de 300 ms (`.en-sol-capa` en `Pelicula.tsx`).

**Para regenerar o reemplazar un clip:** dejar el nuevo archivo en `video-raw/` con el mismo
nombre (`entrada`, `hacia-el-sol`, `sol-loop`, `reformer-loop`, `materiales-loop`, más `-mobile`)
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
- El LCP es la fachada: `preload` con `imagesrcset` desde `app/page.tsx`.
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
- Los renders son de Artagaveytia-Mantel y el estudio no está construido: no publicar sin la
  autorización del cliente (ver `PENDIENTES.md`).
