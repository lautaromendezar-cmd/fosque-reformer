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
