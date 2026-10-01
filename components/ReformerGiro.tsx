"use client";

// El Reformer de Autor gira con el scroll. El clip (Seedance, fondo blanco de estudio) se funde
// con el lino por multiply y una máscara radial, así no se ve el rectángulo del video.
//
// ESCRITORIO: sección de 260vh con la pantalla pegada; el scroll mueve currentTime (versión
// -scrub, GOP corto) y las tres palabras de "Confort y Ergonomía" entran por tramos.
// MOBILE: se reproduce una vez al entrar en pantalla y las palabras quedan visibles.
// SIN VIDEO / REDUCED MOTION: la foto de producto, quieta.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { equipamiento } from "@/content/equipamiento";
import Imagen from "./Imagen";
import { video as urlVideo, esperarBlob, precargaLista } from "@/lib/video";

gsap.registerPlugin(ScrollTrigger);

const CLIP = { scrub: urlVideo("reformer-giro-scrub.mp4"), mp4: urlVideo("reformer-giro.mp4"), webm: urlVideo("reformer-giro.webm") };

export default function ReformerGiro({ conEnlace = false }: { conEnlace?: boolean }) {
  const seccion = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [modo, setModo] = useState<"scrub" | "auto" | "estatico" | null>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setModo(reducido ? "estatico" : window.matchMedia("(min-width: 1024px)").matches ? "scrub" : "auto");
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v || !modo || modo === "estatico") return;
    const ok = () => setListo(true);
    v.addEventListener("loadeddata", ok);
    let vivo = true;
    // Si el preloader lo bajó, el blob (el atributo src gana sobre los <source>)
    precargaLista.then(async () => {
      const blob = await esperarBlob(modo === "scrub" ? CLIP.scrub : CLIP.mp4);
      if (!vivo) return;
      if (blob) v.src = blob;
      v.preload = "auto";
      v.load();
    });
    return () => { vivo = false; v.removeEventListener("loadeddata", ok); };
  }, [modo]);

  // Escritorio: scrub + palabras por tramos
  useEffect(() => {
    if (modo !== "scrub" || !seccion.current) return;
    const s = seccion.current;
    const palabras = gsap.utils.toArray<HTMLElement>(".giro-palabra", s);
    gsap.set(palabras, { opacity: 0.18 });
    let ultimo = -1;
    const st = ScrollTrigger.create({
      trigger: s,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        const v = video.current;
        if (v && v.duration && listo) {
          const t = Math.min(1, p / 0.85) * (v.duration - 0.05);
          if (Math.abs(t - ultimo) > 0.02) { v.currentTime = t; ultimo = t; }
        }
        palabras.forEach((el, i) => {
          const desde = 0.12 + i * 0.25;
          gsap.to(el, { opacity: p >= desde ? 1 : 0.18, duration: 0.4, overwrite: true });
        });
      },
    });
    return () => st.kill();
  }, [modo, listo]);

  // Mobile: una vuelta al entrar
  useEffect(() => {
    if (modo !== "auto" || !seccion.current) return;
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { v.play().catch(() => {}); io.disconnect(); } }, { threshold: 0.5 });
    precargaLista.then(() => seccion.current && io.observe(seccion.current));
    return () => io.disconnect();
  }, [modo]);

  const scrub = modo === "scrub";

  return (
    <section
      ref={seccion}
      className={`escena claro relative ${scrub ? "h-[260vh]" : ""}`}
      data-luz="lino"
      aria-labelledby="t-giro"
    >
      {/* El fondo va en el contenedor pegado: sticky crea su propio contexto de apilamiento y el
          multiply del video se mezcla contra ese fondo, no contra el de la sección. */}
      <div className={`${scrub ? "sticky top-0 flex h-[100svh] items-center" : "py-[14vh]"} bg-lino`}>
      <div className="contenedor flex w-full flex-col justify-center lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-4">
          <p className="dato mb-4 text-magenta-hondo" data-revelar>{equipamiento.antetitulo}</p>
          <h2 id="t-giro" className="h1 max-w-[12ch]" data-revelar="lineas">{equipamiento.titulo}</h2>
          <ul className="mt-8 grid gap-1" aria-label="Confort y Ergonomía">
            {equipamiento.marcas.map((m) => (
              <li key={m} className="giro-palabra titulo text-[clamp(1.35rem,1rem+1.2vw,2rem)] leading-tight">{m}</li>
            ))}
          </ul>
          {conEnlace && (
            <Link href="/equipamiento" className="boton boton-secundario mt-10">Conocer el equipamiento</Link>
          )}
        </div>

        <div className="relative mt-10 aspect-video lg:col-span-8 lg:mt-0">
          <div className="giro-lienzo absolute inset-0">
            <Imagen nombre="reformer-negro-1" alt="Reformer de Autor Fosque en negro, con carro tapizado, torre con poleas y barra de pies" sizes="(min-width: 1024px) 60vw, 100vw" className="fondo-imagen" />
            {modo && modo !== "estatico" && (
              <video
                ref={video}
                muted
                playsInline
                preload="none"
                disablePictureInPicture
                tabIndex={-1}
                aria-hidden="true"
                className={`transition-opacity duration-500 ${listo ? "opacity-100" : "opacity-0"}`}
              >
                {scrub ? (
                  <source src={CLIP.scrub} type="video/mp4" />
                ) : (
                  <>
                    <source src={CLIP.webm} type="video/webm" />
                    <source src={CLIP.mp4} type="video/mp4" />
                  </>
                )}
              </video>
            )}
          </div>
        </div>
      </div>
      </div>

      <style>{`
        .giro-lienzo { mix-blend-mode: multiply; -webkit-mask-image: radial-gradient(ellipse 62% 70% at 50% 52%, #000 55%, transparent 100%); mask-image: radial-gradient(ellipse 62% 70% at 50% 52%, #000 55%, transparent 100%); }
        .giro-lienzo img, .giro-lienzo video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
      `}</style>
    </section>
  );
}
