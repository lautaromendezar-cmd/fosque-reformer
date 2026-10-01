"use client";

// Música ambiente (PDF, nota técnica): apagada al entrar, un botón la prende y la apaga.
// Vive en el header del layout, así que sigue sonando al cambiar de página.
// Sin archivo cargado (content/sitio.ts → musica.src null) el botón no aparece.

import { useEffect, useRef, useState } from "react";
import { musica } from "@/content/sitio";

export default function Musica() {
  const audio = useRef<HTMLAudioElement>(null);
  const [sonando, setSonando] = useState(false);
  const fade = useRef(0);

  useEffect(() => () => cancelAnimationFrame(fade.current), []);

  if (!musica.src) return null;

  // Fundido corto para que no entre ni salga de golpe
  const fundir = (a: HTMLAudioElement, hasta: number, alTerminar?: () => void) => {
    cancelAnimationFrame(fade.current);
    const desde = a.volume, t0 = performance.now(), dur = 900;
    const paso = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      a.volume = desde + (hasta - desde) * p;
      if (p < 1) fade.current = requestAnimationFrame(paso); else alTerminar?.();
    };
    fade.current = requestAnimationFrame(paso);
  };

  const alternar = () => {
    const a = audio.current;
    if (!a) return;
    if (sonando) { fundir(a, 0, () => a.pause()); setSonando(false); return; }
    a.volume = 0;
    a.play().then(() => { fundir(a, musica.volumen); setSonando(true); }).catch(() => setSonando(false));
  };

  return (
    <>
      <audio ref={audio} src={musica.src} loop preload="none" />
      <button
        type="button"
        onClick={alternar}
        aria-pressed={sonando}
        aria-label={sonando ? "Silenciar la música" : "Activar la música"}
        className="grid h-11 w-11 place-items-center rounded-full"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" />
          {sonando ? (
            <>
              <path d="M15.5 9a4 4 0 0 1 0 6" />
              <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
            </>
          ) : (
            <path d="M16 10l4 4M20 10l-4 4" />
          )}
        </svg>
      </button>
    </>
  );
}
