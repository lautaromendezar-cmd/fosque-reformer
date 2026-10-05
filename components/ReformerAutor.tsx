"use client";

// El Reformer de Autor, ambientado: el equipo en una sala como la del manual de arquitectura
// (madera con la onda de luz, cielorraso orgánico en pasteles, plantas). Reemplaza al giro
// sobre fondo blanco: el cliente lo quería ambientado y un giro no se puede ambientar.
//
// ESCRITORIO: sección de 240vh con la pantalla pegada; las fotos se cruzan con el scroll y las
// tres palabras de "Confort y Ergonomía" se encienden a la par.
// MOBILE: las fotos en un carrusel que se desliza con el dedo; las palabras quedan visibles.
// REDUCED MOTION: sin pegado ni cruces, la primera foto quieta.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { equipamiento } from "@/content/equipamiento";
import Imagen from "./Imagen";

gsap.registerPlugin(ScrollTrigger);

const FOTOS_DE_SALA = equipamiento.fotos.filter((f) => !f.imagen.endsWith("detalle"));

export default function ReformerAutor({ conEnlace = false }: { conEnlace?: boolean }) {
  const seccion = useRef<HTMLElement>(null);
  const [pegado, setPegado] = useState(false);

  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPegado(!reducido && window.matchMedia("(min-width: 1024px)").matches);
  }, []);

  // Escritorio: las fotos se cruzan y las palabras se encienden por tramos
  useEffect(() => {
    if (!pegado || !seccion.current) return;
    const s = seccion.current;
    const fotos = gsap.utils.toArray<HTMLElement>(".autor-foto", s);
    const fondos = gsap.utils.toArray<HTMLElement>(".autor-fondo-capa", s);
    const palabras = gsap.utils.toArray<HTMLElement>(".autor-palabra", s);
    gsap.set([...fotos.slice(1), ...fondos.slice(1)], { opacity: 0 });
    gsap.set(palabras, { opacity: 0.18 });
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: s, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true },
    });
    // cada foto respira un poco mientras está en pantalla; la siguiente entra por opacidad
    const n = fotos.length;
    fotos.forEach((f, i) => {
      tl.fromTo(f.querySelector("img"), { scale: 1.06 }, { scale: 1, duration: 1 / n, immediateRender: false }, i / n);
      if (i > 0) tl.to(fondos[i] ? [f, fondos[i]] : f, { opacity: 1, duration: 0.12 }, i / n - 0.06);
    });
    palabras.forEach((p, i) => tl.to(p, { opacity: 1, duration: 0.08 }, 0.08 + i * (0.84 / palabras.length)));
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, [pegado]);

  return (
    <section
      ref={seccion}
      className={`escena claro relative ${pegado ? "h-[240vh]" : ""}`}
      data-luz="lino"
      aria-labelledby="t-autor"
    >
      <div className={`${pegado ? "sticky top-0 flex h-[100svh] items-center" : "py-[14vh]"} relative overflow-clip bg-lino`}>
        {/* Fondo: la misma sala muy desenfocada, con un velo de lino para que el texto oscuro se lea.
            Pedido del cliente: que no quede el fondo liso. Basta la imagen chica (el blur la disuelve). */}
        <div className="autor-fondo pointer-events-none absolute inset-0" aria-hidden="true">
          {/* Sólo las fotos de sala: el detalle es casi todo Reformer negro y desenfocado queda gris */}
          {(pegado ? FOTOS_DE_SALA : FOTOS_DE_SALA.slice(0, 1)).map((f) => (
            <div key={f.imagen} className="autor-fondo-capa absolute inset-0">
              <Imagen nombre={f.imagen} alt="" sizes="480px" className="fondo-imagen" />
            </div>
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,238,230,0.7)_0%,rgba(244,238,230,0.5)_40%,rgba(244,238,230,0.28)_100%)]" />
        </div>
        <div className="contenedor relative flex w-full flex-col justify-center lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-4">
            <p className="dato mb-4 text-magenta-hondo" data-revelar>{equipamiento.antetitulo}</p>
            <h2 id="t-autor" className="h2" data-revelar>
              {equipamiento.titulo}
              <span className="firma mt-1 block text-corteza">{equipamiento.firma}</span>
            </h2>
            <ul className="mt-8 grid gap-1" aria-label="Confort y Ergonomía">
              {equipamiento.marcas.map((m) => (
                <li key={m} className="autor-palabra titulo text-[clamp(1.2rem,0.95rem+0.9vw,1.6rem)] leading-tight">{m}</li>
              ))}
            </ul>
            {conEnlace && (
              <Link href="/equipamiento" className="boton boton-secundario mt-10">Conocer el equipamiento</Link>
            )}
          </div>

          {/* Escritorio: fotos apiladas que se cruzan. Mobile: carrusel con scroll-snap. */}
          <div
            className={pegado
              ? "relative mt-10 aspect-[16/10] overflow-clip rounded-2xl lg:col-span-8 lg:mt-0"
              : "-mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:-mx-10 md:px-10 pb-2 [scrollbar-width:none]"}
            aria-label="El Reformer de Autor en la sala"
            role="group"
          >
            {equipamiento.fotos.map((f, i) => (
              <div
                key={f.imagen}
                className={pegado
                  ? "autor-foto absolute inset-0"
                  : "relative aspect-[4/3] w-[86%] shrink-0 snap-center overflow-clip rounded-2xl sm:w-[70%]"}
              >
                <Imagen
                  nombre={f.imagen}
                  alt={f.alt}
                  sizes={pegado ? "62vw" : "86vw"}
                  prioridad={i === 0}
                  className="fondo-imagen"
                  imgClassName={f.posicion ? `object-cover ${f.posicion}` : "object-cover"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* el fondo se funde con el lino de las secciones vecinas: sin corte al entrar ni al salir */
        .autor-fondo { -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 18%, #000 72%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0%, #000 18%, #000 72%, transparent 100%); }
        .autor-fondo-capa img { filter: blur(48px) saturate(1.1); transform: scale(1.25); }
        .firma { font-family: var(--font-firma), "Mrs Saint Delafield", cursive; font-weight: 400;
          font-size: clamp(3rem, 2rem + 3.6vw, 5.25rem); line-height: 1.05; letter-spacing: 0; }
      `}</style>
    </section>
  );
}
