// URLs de /public/video con el hash del archivo (?v=), y los videos que bajó el preloader.
//
// /video se sirve con cache immutable de un año (next.config.ts) y los nombres no cambian al
// regenerar un clip: el hash es lo que hace que el navegador pida el nuevo.
//
// El preloader (components/Precarga.tsx) baja los clips de la página a memoria. Los que se ven
// al empezar lo frenan; el resto sigue bajando con el telón arriba. Cada clip queda registrado
// como una promesa de blob: Pelicula y ReformerGiro la esperan y, si falla, piden por red.

import hashes from "./videos.generado.json";

const h = hashes as Record<string, string>;

export function video(archivo: string) {
  return `/video/${archivo}${h[archivo] ? `?v=${h[archivo]}` : ""}`;
}

const pendientes = new Map<string, Promise<string | undefined>>();
let terminar: () => void = () => {};
/** Se resuelve cuando el preloader termina (con todo bajado o por tiempo máximo). */
export const precargaLista: Promise<void> = typeof window === "undefined"
  ? Promise.resolve()
  : new Promise((r) => {
      terminar = r;
      // Si el preloader no llegara a avisar, nada queda esperando (el del <head> saca el telón a los 15 s)
      setTimeout(r, 16000);
    });

export function registrarBlob(url: string, p: Promise<string | undefined>) { pendientes.set(url, p); }
/** El blob del clip si el preloader lo está bajando o ya lo bajó; undefined si no (o si falló). */
export function esperarBlob(url: string) { return pendientes.get(url) ?? Promise.resolve(undefined); }
export function marcarPrecargaLista() { terminar(); }

/**
 * Los clips de cada página. `antes`: los que se ven apenas sube el telón (lo frenan).
 * `despues`: siguen bajando detrás, en orden; se usan más abajo o más tarde.
 */
export function clipsDe(ruta: string, escritorio: boolean): { antes: string[]; despues: string[] } {
  const giro = video(escritorio ? "reformer-giro-scrub.mp4" : "reformer-giro.mp4");
  if (ruta === "/") {
    return escritorio
      ? { antes: [video("entrada-scrub.mp4")], despues: [video("hacia-el-sol-scrub.mp4"), giro] }
      : { antes: [video("entrada-mobile.mp4")], despues: [video("hacia-el-sol-mobile.mp4"), giro] };
  }
  if (ruta === "/equipamiento") return { antes: [giro], despues: [] };
  return { antes: [], despues: [] };
}
