"use client";

// La película: portada, recorrido y sol son un solo plano continuo.
//
// ESCRITORIO (≥1024px, sin reduced-motion): sección de 400vh con la pantalla pegada
// (sticky). El scroll scrubbea los clips `entrada` y `hacia-el-sol` (versión -scrub, con
// GOP corto). El titular de la portada vive sobre el arranque del clip 1; el
// titular del sol entra cuando el clip 2 llega al final, con el halo y el oscurecimiento.
//
// MOBILE: sección de 100svh. La bajada no se scrubbea: se reproduce sola al entrar en
// pantalla (clip 1 → clip 2), y se puede pausar tocando. Al terminar aparece el sol.
//
// SIN VIDEO / REDUCED MOTION: los pósters (renders) hacen lo mismo con transformaciones:
// la fachada escala, se cruza al salón y el sol sube. El sitio se ve terminado sin un
// solo archivo de video. Cuando los videos existen en /public/video/, se enchufan solos.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portada, sol, cta } from "@/content/sitio";
import { linkWhatsApp } from "@/lib/whatsapp";
import Imagen from "./Imagen";

gsap.registerPlugin(ScrollTrigger);

const VIDEO = {
  entrada: "/video/entrada",
  sol: "/video/hacia-el-sol",
};

export default function Pelicula() {
  const seccion = useRef<HTMLElement>(null);
  const vEntrada = useRef<HTMLVideoElement>(null);
  const vSol = useRef<HTMLVideoElement>(null);
  const [modo, setModo] = useState<"scrub" | "auto" | "estatico" | null>(null);
  const [videoOk, setVideoOk] = useState({ entrada: false, sol: false });
  const [pausado, setPausado] = useState(false);
  const [enSol, setEnSol] = useState(false);

  // Elegir modo en el cliente (evita desajustes de hidratación)
  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const grande = window.matchMedia("(min-width: 1024px)").matches;
    setModo(reducido ? "estatico" : grande ? "scrub" : "auto");
  }, []);

  // ---- Carga de videos: si fallan, quedan los pósters ------------------------------
  useEffect(() => {
    if (!modo || modo === "estatico") return;
    const marcar = (clave: "entrada" | "sol", v: HTMLVideoElement | null) => {
      if (!v) return () => {};
      const ok = () => setVideoOk((s) => ({ ...s, [clave]: true }));
      const mal = () => setVideoOk((s) => ({ ...s, [clave]: false }));
      v.addEventListener("loadeddata", ok);
      v.addEventListener("error", mal, true);
      // En escritorio los -scrub pesan ~6 MB: se piden recién después del load, para no
      // competir con el póster (LCP) ni con las fuentes. En mobile alcanza con metadata.
      let timer = 0;
      const cargar = () => { timer = window.setTimeout(() => { v.preload = "auto"; v.load(); }, modo === "scrub" ? 800 : 0); };
      if (document.readyState === "complete") cargar(); else window.addEventListener("load", cargar, { once: true });
      return () => { window.clearTimeout(timer); window.removeEventListener("load", cargar); v.removeEventListener("loadeddata", ok); v.removeEventListener("error", mal, true); };
    };
    const a = marcar("entrada", vEntrada.current);
    const b = marcar("sol", vSol.current);
    return () => { a(); b(); };
  }, [modo]);

  // ---- ESCRITORIO: scrub -----------------------------------------------------------
  useEffect(() => {
    if (modo !== "scrub" || !seccion.current) return;
    const s = seccion.current;
    const q = gsap.utils.selector(s);
    const capaEntrada = q<HTMLElement>(".capa-entrada")[0];
    const capaSol = q<HTMLElement>(".capa-sol")[0];
    const posterEntrada = q<HTMLElement>(".capa-entrada .poster-anim")[0];
    const posterSol = q<HTMLElement>(".capa-sol .poster-anim")[0];
    const oscuro = q<HTMLElement>(".oscuro")[0];
    const halo = q<HTMLElement>(".halo")[0];
    const tPortada = q<HTMLElement>(".titulo-portada")[0];
    const tSol = q<HTMLElement>(".titulo-sol")[0];
    const palabras = q<HTMLElement>(".titulo-sol .palabra");

    // Estado inicial explícito (un timeline con scrub renderiza en 0 en cada refresh)
    gsap.set(capaSol, { opacity: 0 });
    gsap.set(posterEntrada, { scale: 1 });
    gsap.set(posterSol, { scale: 1.25, yPercent: 9 });
    gsap.set(oscuro, { opacity: 0 });
    gsap.set(halo, { "--luz-halo": 0 } as gsap.TweenVars);
    gsap.set(tSol, { opacity: 1 });
    gsap.set(palabras, { yPercent: 60, opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: s, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true },
    });

    // 0 → 0.44: entrada. 0.44 → 0.86: hacia el sol. 0.86 → 1: el pico.
    tl.to(posterEntrada, { scale: 1.16, duration: 0.44 }, 0)
      .to(tPortada, { opacity: 0, yPercent: -12, duration: 0.1 }, 0.12)
      .to(capaEntrada, { opacity: 0, duration: 0.04 }, 0.42)
      .to(capaSol, { opacity: 1, duration: 0.04 }, 0.42)
      .to(posterSol, { scale: 1, yPercent: 0, duration: 0.44 }, 0.44)
      .to(oscuro, { opacity: 0.55, duration: 0.14 }, 0.86)
      .to(halo, { "--luz-halo": 1, duration: 0.14 } as gsap.TweenVars, 0.86)
      .to(palabras, { yPercent: 0, opacity: 1, duration: 0.1, stagger: 0.012 }, 0.88);

    // Scrub de los videos: currentTime sigue al progreso. Con GOP de 3 cada seek decodifica 2 cuadros como mucho.
    let ultimoE = -1, ultimoS = -1;
    const st = ScrollTrigger.create({
      trigger: s,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        const e = vEntrada.current, so = vSol.current;
        if (e && e.duration && videoOk.entrada) {
          const t = Math.min(1, p / 0.44) * (e.duration - 0.05);
          if (Math.abs(t - ultimoE) > 0.02) { e.currentTime = t; ultimoE = t; }
        }
        if (so && so.duration && videoOk.sol) {
          const t = Math.min(1, Math.max(0, (p - 0.44) / 0.42)) * (so.duration - 0.05);
          if (Math.abs(t - ultimoS) > 0.02) { so.currentTime = t; ultimoS = t; }
        }
      },
    });

    return () => { tl.kill(); st.kill(); };
  }, [modo, videoOk.entrada, videoOk.sol]);

  // ---- MOBILE: se reproduce sola al entrar, tocar pausa ----------------------------
  useEffect(() => {
    if (modo !== "auto" || !seccion.current) return;
    const e = vEntrada.current, so = vSol.current;
    if (!e || !so) return;
    const alTerminarEntrada = () => {
      seccion.current?.classList.add("en-sol-capa");
      so.play().catch(() => setEnSol(true));
    };
    const alTerminarSol = () => setEnSol(true);
    e.addEventListener("ended", alTerminarEntrada);
    so.addEventListener("ended", alTerminarSol);
    const io = new IntersectionObserver(
      ([x]) => {
        if (x.isIntersecting && !pausado) { if (!seccion.current?.classList.contains("en-sol-capa")) e.play().catch(() => {}); else so.play().catch(() => {}); }
        else { e.pause(); so.pause(); }
      },
      { threshold: 0.3 },
    );
    io.observe(seccion.current);
    return () => { io.disconnect(); e.removeEventListener("ended", alTerminarEntrada); so.removeEventListener("ended", alTerminarSol); };
  }, [modo, pausado]);

  // Sin video en mobile: mostrar el sol después de unos segundos igual (el póster hace la película)
  useEffect(() => {
    if (modo !== "auto") return;
    if (videoOk.entrada || videoOk.sol) return;
    const t = setTimeout(() => { seccion.current?.classList.add("en-sol-capa"); setEnSol(true); }, 3500);
    return () => clearTimeout(t);
  }, [modo, videoOk]);

  const alternarPausa = () => {
    if (modo !== "auto") return;
    const e = vEntrada.current, so = vSol.current;
    const activo = seccion.current?.classList.contains("en-sol-capa") ? so : e;
    if (!activo) return;
    if (activo.paused) { activo.play().catch(() => {}); setPausado(false); } else { activo.pause(); setPausado(true); }
  };

  const estatico = modo === "estatico";
  const scrub = modo === "scrub";
  const mobile = modo === "auto";

  return (
    <section
      ref={seccion}
      id="inicio"
      className={[
        "escena pelicula grano",
        scrub ? "h-[400vh]" : "min-h-[100svh]",
        estatico || (mobile && enSol) ? "en-sol" : "",
      ].join(" ")}
      data-luz="dia"
      aria-label="Portada"
    >
      <div className={`pantalla ${scrub ? "sticky top-0" : "relative"} h-[100svh] overflow-clip`} onClick={mobile ? alternarPausa : undefined}>
        {/* Capa 1: la calle y el corredor */}
        <div className="capa capa-entrada fondo-imagen">
          <div className="poster-anim absolute inset-0 origin-center">
            <Imagen nombre="fachada-nunez-atardecer" alt="Fachada blanca de Fosque Reformer en Núñez, con franjas onduladas magenta, coral y naranja, entrada en arco iluminada y árboles de vereda" prioridad sizes="100vw" />
          </div>
          {modo && !estatico && (
            <video ref={vEntrada} muted playsInline preload={scrub ? "none" : "metadata"} disablePictureInPicture tabIndex={-1}
              className={`transition-opacity duration-500 ${videoOk.entrada ? "opacity-100" : "opacity-0"}`}>
              {scrub ? (
                <source src={`${VIDEO.entrada}-scrub.mp4`} type="video/mp4" />
              ) : (
                <>
                  <source src={`${VIDEO.entrada}-mobile.webm`} type="video/webm" />
                  <source src={`${VIDEO.entrada}-mobile.mp4`} type="video/mp4" />
                </>
              )}
            </video>
          )}
        </div>

        {/* Capa 2: el salón y el sol */}
        <div className="capa capa-sol fondo-imagen">
          <div className="poster-anim absolute inset-0 origin-center">
            <Imagen nombre="salon-sol-reformers-negros" alt="Sala con dos filas de Reformers negros Fosque, un gran disco de luz al fondo y cielorraso que refleja la luz como agua" prioridad={false} sizes="100vw" imgClassName="object-[64%_50%]" />
          </div>
          {modo && !estatico && (
            <video ref={vSol} muted playsInline preload={scrub ? "none" : "metadata"} disablePictureInPicture tabIndex={-1}
              className={`transition-opacity duration-500 ${videoOk.sol ? "opacity-100" : "opacity-0"}`}>
              {scrub ? (
                <source src={`${VIDEO.sol}-scrub.mp4`} type="video/mp4" />
              ) : (
                <>
                  <source src={`${VIDEO.sol}-mobile.webm`} type="video/webm" />
                  <source src={`${VIDEO.sol}-mobile.mp4`} type="video/mp4" />
                </>
              )}
            </video>
          )}
        </div>

        {/* Oscurecimiento y halo del sol */}
        <div className="oscuro absolute inset-0 bg-noche" />
        <div className="halo" />

        {/* Legibilidad del titular sobre la fachada */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,19,16,0.35)_0%,rgba(28,19,16,0)_35%,rgba(28,19,16,0.55)_100%)]" />

        {/* Titular de la portada */}
        <div className="titulo-portada contenedor absolute inset-x-0 bottom-[10svh] z-10 md:bottom-[12svh]">
          <p className="dato entrada-suave mb-4 text-hueso/90">{portada.antetitulo}</p>
          {/* Sin reveal por JS: este titular y la bajada son el LCP en mobile. Entran por transform en CSS. */}
          <h1 className="h1 entrada-suave max-w-[13ch] text-hueso">{portada.titulo}</h1>
          <p className="medida entrada-suave mt-6 max-w-[46ch] text-hueso/90" style={{ animationDelay: "0.25s" }}>{portada.bajada}</p>
          <div className="entrada-suave mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.4s" }}>
            <a href={linkWhatsApp()} target="_blank" rel="noopener" className="boton boton-primario">{cta.hero}</a>
            <Link href="/metodo" className="boton boton-secundario text-hueso">Conocer el método</Link>
          </div>
        </div>

        {/* La única línea del sol */}
        <div className="titulo-sol contenedor absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 text-center">
          <p className="display mx-auto max-w-[17ch] text-hueso [text-shadow:0_2px_40px_rgba(28,19,16,0.5)] [text-wrap:balance] !text-[clamp(2.75rem,1rem+6.2vw,6.5rem)]" aria-live="polite">
            {sol.linea.split(" ").map((p, i) => (
              <span key={i} className="palabra inline-block">{p}&nbsp;</span>
            ))}
          </p>
        </div>

        {/* Control de pausa (mobile): tocar la pantalla pausa; esto es el equivalente accesible */}
        {mobile && (videoOk.entrada || videoOk.sol) && (
          <button type="button" onClick={(e) => { e.stopPropagation(); alternarPausa(); }}
            className="absolute right-4 top-[4.5rem] z-20 grid h-11 w-11 place-items-center rounded-full bg-noche/50 text-hueso backdrop-blur"
            aria-label={pausado ? "Reproducir el video" : "Pausar el video"} aria-pressed={pausado}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {pausado ? <path d="M8 5v14l11-7z" /> : <path d="M6 5h4v14H6zM14 5h4v14h-4z" />}
            </svg>
          </button>
        )}

        {/* Pista de scroll (escritorio) */}
        {scrub && (
          <div className="pista absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-hueso/70" aria-hidden="true">
            <span className="dato">Bajá</span>
          </div>
        )}
      </div>

      <style>{`
        .pelicula .capa-sol { opacity: 0; }
        .pelicula .titulo-sol .palabra { opacity: 0; transform: translateY(60%); }
        .pelicula .oscuro { opacity: 0; }
        /* Estado final (mobile al terminar, reduced motion, sin JS): el sol */
        .pelicula.en-sol .capa-entrada { opacity: 0; }
        .pelicula.en-sol .capa-sol { opacity: 1; }
        .pelicula.en-sol .oscuro { opacity: 0.55; }
        .pelicula.en-sol .halo { --luz-halo: 1; }
        .pelicula.en-sol .titulo-sol .palabra { opacity: 1; transform: none; transition: opacity .8s var(--ease-salida), transform .8s var(--ease-salida); }
        .pelicula.en-sol .titulo-portada { opacity: 0; pointer-events: none; }
        .pelicula.en-sol-capa .capa-entrada { opacity: 0; transition: opacity .3s; }
        .pelicula.en-sol-capa .capa-sol { opacity: 1; transition: opacity .3s; }
        .pelicula .capa-sol, .pelicula .capa-entrada, .pelicula .titulo-portada { transition: opacity .6s var(--ease-salida); }
        @media (prefers-reduced-motion: reduce) { .pelicula .titulo-portada { transition: none; } }
      `}</style>
    </section>
  );
}
