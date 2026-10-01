"use client";

// Preloader: fondo blanco, lockup negro, y una línea con el tricolor de la fachada que avanza con
// lo que de verdad se va bajando. No es decorativo: espera a que esté lo que la página necesita
// para verse completa desde el primer scroll: fuentes, la imagen de portada y el clip que se ve
// al empezar. Los demás clips de la página siguen bajando detrás. Todos quedan en memoria para
// que el scrub no dependa de la red. Ver lib/video.ts.
//
// Sólo en la carga completa de una página: navegar dentro del sitio no lo vuelve a mostrar.
// Respaldo: el script inline del <head> (app/layout.tsx) lo saca solo a los 15 s si este JS no
// corre. Sin JS en absoluto, html no tiene .precargando y el CSS no lo muestra.

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { clipsDe, registrarBlob, marcarPrecargaLista } from "@/lib/video";
import Lockup from "./Lockup";

const MINIMO = 1300;  // lo que tarda en dibujarse el logo: aunque todo esté en cache, se ve entero
const MAXIMO = 8000;  // con una conexión muy lenta no se espera más: el <video> pide lo que falte

declare global { interface Window { __precargaRespaldo?: number } }

export default function Precarga() {
  const ruta = usePathname();
  const [progreso, setProgreso] = useState(0);
  const [fuera, setFuera] = useState(false);
  const yaCorrio = useRef(false);

  useEffect(() => {
    if (yaCorrio.current) return;
    yaCorrio.current = true;
    const html = document.documentElement;
    window.clearTimeout(window.__precargaRespaldo);

    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const escritorio = window.matchMedia("(min-width: 1024px)").matches;
    const { antes, despues } = reducido ? { antes: [], despues: [] } : clipsDe(ruta, escritorio);
    const control = new AbortController(); // sólo para los que frenan el telón
    const t0 = performance.now();

    // Avance: bytes de los clips que frenan (90 %) + fuentes e imagen de portada (10 %)
    const cargados = new Map<string, number>();
    const totales = new Map<string, number>();
    let base = 0;
    const actualizar = () => {
      const est = 3_000_000;
      const total = antes.reduce((a, u) => a + (totales.get(u) || est), 0);
      const hecho = antes.reduce((a, u) => a + (cargados.get(u) || 0), 0);
      const p = antes.length ? 0.1 * base + 0.9 * Math.min(1, hecho / total) : base;
      setProgreso((v) => Math.max(v, p));
    };

    const bajar = async (url: string, senal?: AbortSignal): Promise<string | undefined> => {
      try {
        const r = await fetch(url, { signal: senal });
        if (!r.ok) return undefined;
        totales.set(url, Number(r.headers.get("content-length")) || 0);
        if (!r.body) return URL.createObjectURL(await r.blob());
        const lector = r.body.getReader();
        const partes: BlobPart[] = [];
        let n = 0;
        for (;;) {
          const { done, value } = await lector.read();
          if (done) break;
          partes.push(value);
          n += value.length;
          cargados.set(url, n);
          actualizar();
        }
        return URL.createObjectURL(new Blob(partes, { type: "video/mp4" }));
      } catch {
        return undefined; // abortado o sin red: el <video> lo pide como siempre
      }
    };

    // Los que frenan arrancan ya; los de después quedan registrados y arrancan cuando estos
    // terminan, de a uno, para no repartir el ancho de banda con lo que hace falta primero.
    const primeros = antes.map((u) => { const p = bajar(u, control.signal); registrarBlob(u, p); return p; });
    const soltar: (() => void)[] = [];
    let cadena: Promise<unknown> = new Promise<void>((r) => soltar.push(r));
    for (const u of despues) {
      const p = cadena.then(() => bajar(u));
      registrarBlob(u, p);
      cadena = p;
    }

    const portada = Array.from(document.querySelectorAll<HTMLImageElement>('img[fetchpriority="high"]'));
    const basicos = Promise.all([
      document.fonts?.ready,
      ...portada.map((im) => (im.complete ? Promise.resolve() : im.decode().catch(() => {}))),
    ]).then(() => { base = 1; actualizar(); });

    const todo = Promise.allSettled([basicos, ...primeros]);
    const tope = new Promise((r) => setTimeout(r, MAXIMO));

    Promise.race([todo, tope]).then(async () => {
      control.abort();
      soltar.forEach((f) => f());
      const resto = MINIMO - (performance.now() - t0);
      if (resto > 0) await new Promise((r) => setTimeout(r, resto));
      setProgreso(1);
      marcarPrecargaLista();
      html.classList.add("precarga-sale");
      window.setTimeout(() => {
        html.classList.remove("precargando", "precarga-sale");
        setFuera(true);
      }, reducido ? 200 : 950);
    });
  }, [ruta]);

  if (fuera) return null;

  return (
    <div className="precarga" aria-hidden="true">
      <div className="precarga-centro">
        <Lockup className="precarga-logo" />
        <div className="precarga-linea"><span style={{ transform: `scaleX(${progreso})` }} /></div>
        <p className="precarga-cifra dato">{Math.round(progreso * 100)}</p>
      </div>
    </div>
  );
}
