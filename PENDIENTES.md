# Pendientes del cliente

Cada dato que falta está como **placeholder visible** en el sitio y marcado con `TODO(cliente)`
en el código. Esta lista dice dónde tocar cada uno. Nada de esto requiere tocar componentes.

| Dato | Dónde se edita | Cómo se ve hoy en el sitio |
|---|---|---|
| **Precios de los 4 packs** | `content/membresias.ts` → `packs[].precio` (hoy `null`) | Etiqueta punteada "Precio a confirmar" en cada pack |
| **Moneda** (ARS o USD) | `content/membresias.ts` → `moneda` (hoy `null`) | Mientras sea `null`, no se muestra ningún precio aunque se cargue el número |
| **Dirección de Núñez** | `content/sedes.ts` → `sedes[0].direccion` + `direccionConfirmada: true` | "11 de Septiembre 3635" con etiqueta "A confirmar" (sale del manual de arquitectura, página de fachadas; el brief la da por pendiente) |
| **Horarios de Núñez** | `content/sedes.ts` → `sedes[0].horarios` (array de strings, hoy `null`) | "A confirmar" en la tarjeta de la sede |
| **WhatsApp de Núñez** | `content/sedes.ts` → `sedes[0].whatsapp` (hoy `null`, usa el general) | "A confirmar" en la tarjeta; el botón "Escribir a la sede" usa el WhatsApp general |
| **WhatsApp general** | `content/sitio.ts` → `contacto.whatsapp` (hoy `5491100000000`) | Todos los CTA abren `wa.me/5491100000000`: **hay que cambiarlo antes de publicar** |
| **Link de Google Maps** | `content/sedes.ts` → `sedes[0].mapa` (hoy `null`) | No aparece el botón "Cómo llegar" hasta que haya link |
| **Oferta de entrada exacta** (semana sin cargo, postulación o pack de prueba) | `content/sitio.ts` → `cta.principal`, `cta.corto` y `contacto.mensajePrearmado` | CTA dice "Reservá tu Semana de Experiencia" (lo que dice el brief) |
| **Dominio definitivo** | `content/sitio.ts` → `marca.dominio` **y `marca.dominioActual`** (base del Open Graph, hoy la URL de Vercel) y `app/layout.tsx` → `robots` | Canonical y Open Graph apuntan a `fosquereformer.com.ar` (inventado). **El sitio está en `noindex`** hasta que haya dominio: sacar `robots` de `app/layout.tsx` al publicar |
| **Instagram** | `content/sitio.ts` → `contacto.instagram` | Link en el footer a `instagram.com/fosquereformer` (sin confirmar) |
| **Términos y condiciones** | `app/terminos/page.tsx` (o convertir `components/Legal.tsx` en una página con contenido) | Página con placeholder visible "Texto pendiente" |
| **Políticas de privacidad** | `app/privacidad/page.tsx` | Ídem |
| **Autorización de los renders** y si se acredita a Artagaveytia-Mantel | `content/sitio.ts` → `pie.credito` | El footer ya dice "Renders: Artagaveytia-Mantel Arquitectura"; si no quieren crédito, se borra la línea |
| **Estado de la sede** | `content/sedes.ts` → `sedes[0].estado` (`"proximamente"` → `"abierta"`) | Etiqueta amarilla "Próximamente" en la tarjeta |

## Las dos promesas suavizadas (revisar con el cliente)

Marcadas con `// PROMESA` en `content/sitio.ts` y `content/experiencia.ts`:

1. **"disponibilidad garantizada"** → *"con lugar en tu horario"* (portada) y *"pensadas
   para que haya lugar en el horario que elegís"* (La diferencia Fosque, argumento 01).
2. **"sin riesgo de lesiones"** → *"una progresión cuidada, acompañada, que no te pide ni de
   más ni de menos"* (La diferencia Fosque, argumento 03).

## Lo que no es del cliente pero conviene saber

- **Renders originales:** el techo hoy es 1600×893. Si Artagaveytia-Mantel manda los
  originales, se reemplazan en `assets/source/renders/` con el mismo nombre y se corre
  `npm run imagenes`. Los videos se regeneran con los pasos de `CLAUDE.md`.
- **reformer-loop 16:9** es el clip más flojo (ventanales que no están en el render): primer
  candidato a regenerar cuando lleguen los originales.
- **`/franquicias`** está enlazada desde el footer y todavía no existe (se construye después,
  por brief). Hasta entonces devuelve 404.
