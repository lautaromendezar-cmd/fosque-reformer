# Pendientes del cliente

## Para retomar (estado al 19-oct-2026)

Ronda de correcciones por videos del cliente: **todo hecho y en producción.** Lo último (19-oct):
la película del hero suma el isotipo FR en la pared del pasillo y la recepción con gente antes de
la sala (ver DECISIONES.md, "19-oct"). Falta que el cliente la vea.

- **Ojo con los crudos:** `assets/source/` (151 MB) y
  `fotos-nuevas/` (las fuentes de la calle, 156 MB en `calle-nueva/`) viven sólo en la PC de casa.
  En otra PC: o se copian esas carpetas (Drive/pendrive), o el cambio del hero se hace en casa.
  Tampoco correr `npm run imagenes` ni `npm run video` sin esas carpetas: regeneran todo desde las
  fuentes y sin ellas el manifiesto queda incompleto. Las versiones optimizadas (`public/img`,
  `public/video`) sí están en git, así que el sitio compila y se deploya igual.
- **Pregunta abierta:** la galería "Los espacios" de `/equipamiento` todavía muestra la sala
  Kids (`salon-reformer-cielorraso-organico-a` en `content/equipamiento.ts`). El cliente la
  rechazó como fondo del Reformer; falta saber si la quiere fuera también de la galería.
- **Isotipo en las remeras:** en Partners el cliente pidió el isotipo FR en las remeras de las
  instructoras. En el B2C las fotos de Partners van sin isotipo: agregarlo sólo si lo pide.

Hecho en esta ronda (14/15-oct), por si el cliente pregunta:
Intro del home rehecha (una sección con la recepción de fondo), "Reformer Exclusivo" (antes "de
Autor") con sus tres fotos en una sala nueva, la inercia del trackpad que abría `/metodo` en
Fosque Niños, el salón de palmeras sin los paneles calados naranjas (CTA y portada del Método), y
las cuatro fotos de Partners ubicadas (Intro, Niveles, portadas de Profesionales y Academia) más
una nueva para la sección Academia.

Fuente del contenido: **"ARCHITECTURE & COPYWRITING WEB B2C" (PDF del 30-sep-2026)**, tomado como
definitivo. Cada dato que falta está marcado con `TODO(cliente)` en el código. Nada de esto
requiere tocar componentes.

| Dato | Dónde se edita | Cómo se ve hoy |
|---|---|---|
| **WhatsApp general** | `content/sitio.ts` → `contacto.whatsapp` (hoy `5491100000000`, inventado) | Todos los CTA abren ese número: **cambiarlo antes de publicar** |
| **Música ambiente** | Archivo en `public/audio/` + `content/sitio.ts` → `musica.src` | Sin archivo, el botón de música no aparece. Tiene que ser un tema **con licencia para uso comercial en web** |
| **Precios** | `content/membresias.ts` | USD 40 / 72 / 99 / 119 tal cual el PDF, que los llama "valor sugerido": confirmar que son los que se publican y que van en dólares |
| **Semana de Experiencia vs. 2 sesiones** | `content/sitio.ts` → `cta` y `contacto.mensajePrearmado` | El sitio dice "Semana de Experiencia" (header y hero del PDF). La bio de Instagram del mismo PDF dice "2 Sesiones de Invitación Sin Cargo": definir cuál es la oferta |
| **Franquicias: afirmaciones** | `content/academia.ts` → `franquicias` | "Red de Pilates Reformer N° 1 de Latinoamérica" y "24 años de trayectoria" van como están en el PDF: las tiene que poder respaldar |
| **Franquicias: destino del CTA** | `content/academia.ts` → `franquicias.ctaHref` | La "plataforma de expansión B2B" no existe: hoy el botón abre WhatsApp con un mensaje de inversor |
| **Iniciar Sesión** | — | El PDF lo pide en el header, pero no hay portal de alumnas: no se puso un botón que no lleva a ningún lado |
| **Selector de país e idioma** | — | Fuera de esta etapa (lo charla Lautaro con el cliente) |
| **Isotipo tricolor** | `public/isotipo.svg` | El PDF pide "isotipo tricolor"; el manual sólo trae el monocromo. Pedir el archivo |
| **Texto de Fosque Niños** | `content/metodo.ts` → `ninos.texto` | El PDF reserva el espacio sin texto: se ve el título "Fosque Niños · Próximamente" y los renders |
| **Dirección de Núñez** | `content/sedes.ts` → `sedes[0].direccion` + `direccionConfirmada: true` | "11 de Septiembre 3635" con etiqueta "A confirmar". El mapa de `/sucursales` usa esta dirección |
| **Horarios / WhatsApp de la sede** | `content/sedes.ts` → `horarios`, `whatsapp` | "A confirmar" en la tarjeta |
| **Link de Google Maps** | `content/sedes.ts` → `mapa` | No aparece el botón "Cómo llegar" hasta que haya link |
| **Dominio** | `content/sitio.ts` → `marca.dominio` y `marca.dominioActual`, y `app/layout.tsx` → `robots` | El PDF dice fosquereformer.com. **El sitio sigue en `noindex`**: sacar `robots` al publicar |
| **Instagram** | `content/sitio.ts` → `contacto.instagram` | `instagram.com/fosquereformer` sin confirmar |
| **Términos y Privacidad** | `app/terminos/page.tsx`, `app/privacidad/page.tsx` | Placeholder visible "Texto pendiente" |
| **Autorización de los renders** | `content/sitio.ts` → `pie.credito` | El footer acredita a Artagaveytia-Mantel |
| **Consentimiento de las profes** | — | Sabri, Flor y Valen (sede Núñez) aparecen compuestas con IA en `/experiencia` (portada y 3 pilares) y en el Cierre de todas las páginas. Confirmar que las tres aceptan, sobre todo si se usa en publicidad |
| **Gente que no existe** | — | Las fotos de Partners (Intro, Niveles, portadas de `/profesionales` y `/academia`, sección Academia) son personas generadas con IA. En `/profesionales` y `/academia` se leen como "el equipo": que el cliente lo tenga presente |
| **Estado de la sede** | `content/sedes.ts` → `estado` | "Próximamente" |

## Lo que no es del cliente pero conviene saber

- **Escudo de la fachada:** los renders nuevos tienen un escudo verde arriba con texto ilegible
  (inventado por la IA del render). Se borró de la imagen de la portada y de las referencias de
  video. Si el edificio real lleva un escudo, que manden el archivo.
- **La fachada ancha es en parte IA:** el render vino vertical (723×1031); los costados (vecinos,
  árboles, cielo) se extendieron con outpaint de Higgsfield para tener el 16:9 de escritorio.
  El edificio del centro es el render original.
- **Fotos del Reformer:** 1280×714. Alcanzan para la sección que gira; para pantalla completa
  conviene pedir los originales.
- **`materiales-loop`** ya no se usa en el sitio (la sección de materiales salió con la
  estructura nueva); el clip queda en `video-raw/` por si vuelve.
