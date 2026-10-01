// Helper para las imágenes optimizadas por scripts/optimizar-imagenes.mjs.
// Devuelve srcset AVIF/WebP + blur placeholder para un nombre de render.

import manifiesto from "./imagenes.generado.json";

type Entrada = { width: number; height: number; anchos: number[]; blur: string; v?: string };
const datos = manifiesto as Record<string, Entrada>;

export type NombreImagen = keyof typeof manifiesto;

export function imagen(nombre: NombreImagen) {
  const e = datos[nombre];
  if (!e) throw new Error(`Imagen no optimizada: ${nombre}. Corré npm run imagenes.`);
  // ?v= : /img se sirve immutable por un año (next.config.ts); el hash cambia la URL si cambia el render
  const q = e.v ? `?v=${e.v}` : "";
  const srcset = (ext: "avif" | "webp") =>
    e.anchos.map((w) => `/img/${nombre}-${w}.${ext}${q} ${w}w`).join(", ");
  const mayor = e.anchos[e.anchos.length - 1];
  return {
    width: e.width,
    height: e.height,
    blur: e.blur,
    avif: srcset("avif"),
    webp: srcset("webp"),
    src: `/img/${nombre}-${mayor}.webp${q}`,
    // El póster de un <video> es una sola URL: la más grande en webp.
    poster: `/img/${nombre}-${mayor}.webp${q}`,
  };
}
