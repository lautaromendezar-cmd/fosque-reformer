"use client";

// La película: portada, recorrido y sol son un solo plano continuo.
//
// Antes del clip 1, la calle se hace de noche y la fachada se enciende: tres fotos
// alineadas al píxel (día, noche con la fachada apagada, noche encendida). Anochece por
// opacidad; los LEDs se prenden de arriba hacia abajo con una máscara (`--enc`). El clip
// `entrada` arranca en el mismo cuadro que la noche encendida.
//
// ESCRITORIO (≥1024px, sin reduced-motion): sección de 500vh con la pantalla pegada
// (sticky). El scroll hace anochecer, enciende y scrubbea los clips `entrada` y
// `hacia-el-sol` (versión -scrub, con GOP corto). El titular del sol entra cuando el
// clip 2 llega al final, con el halo y el oscurecimiento.
//
// MOBILE: sección de 100svh. Anochece y se enciende sola; después la bajada se reproduce
// (clip 1 → clip 2) y se puede pausar tocando. Al terminar aparece el sol.
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
import { video, esperarBlob, precargaLista } from "@/lib/video";
import { SIZES_PANTALLA_16_9 } from "@/lib/imagenes";

gsap.registerPlugin(ScrollTrigger);

const VIDEO = {
  entrada: { scrub: video("entrada-scrub.mp4"), webm: video("entrada-mobile.webm"), mp4: video("entrada-mobile.mp4") },
  sol: { scrub: video("hacia-el-sol-scrub.mp4"), webm: video("hacia-el-sol-mobile.webm"), mp4: video("hacia-el-sol-mobile.mp4") },
};

export default function Pelicula() {
  const seccion = useRef<HTMLElement>(null);
  const vEntrada = useRef<HTMLVideoElement>(null);
  const vSol = useRef<HTMLVideoElement>(null);
  const [modo, setModo] = useState<"scrub" | "auto" | "estatico" | null>(null);
  const [videoOk, setVideoOk] = useState({ entrada: false, sol: false });
  const [pausado, setPausado] = useState(false);
  const [enSol, setEnSol] = useState(false);
  const [telonArriba, setTelonArriba] = useState(false);
  // Mobile: la calle pasa de día a noche y se enciende antes del clip 1
  const [fase, setFase] = useState<"dia" | "anochece" | "encendida">("dia");
  const [rueda, setRueda] = useState(false);

  useEffect(() => { precargaLista.then(() => setTelonArriba(true)); }, []);

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
      // El preloader baja los clips a memoria: si están, el video usa el blob (el atributo src
      // gana sobre los <source>) y el scrub no espera red. Si no llegaron (tope de tiempo), se
      // piden como siempre.
      let vivo = true;
      precargaLista.then(async () => {
        const blob = await esperarBlob(modo === "scrub" ? VIDEO[clave].scrub : VIDEO[clave].mp4);
        if (!vivo) return;
        if (blob) v.src = blob;
        v.preload = "auto";
        v.load();
      });
      return () => { vivo = false; v.removeEventListener("loadeddata", ok); v.removeEventListener("error", mal, true); };
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
    const anochecer = q<HTMLElement>(".capa-anochecer")[0];
    const encendida = q<HTMLElement>(".capa-encendida")[0];
    const videoEntrada = vEntrada.current;
    const oscuro = q<HTMLElement>(".oscuro")[0];
    const halo = q<HTMLElement>(".halo")[0];
    const tPortada = q<HTMLElement>(".titulo-portada")[0];
    const velo = q<HTMLElement>(".velo-portada")[0];
    const tSol = q<HTMLElement>(".titulo-sol")[0];
    const palabras = q<HTMLElement>(".titulo-sol .palabra");

    // Estado inicial explícito (un timeline con scrub renderiza en 0 en cada refresh)
    gsap.set(capaSol, { opacity: 0 });
    gsap.set(posterEntrada, { scale: 1 });
    gsap.set(anochecer, { opacity: 0 });
    gsap.set(encendida, { "--enc": "-15%" } as gsap.TweenVars);
    if (videoEntrada && videoOk.entrada) gsap.set(videoEntrada, { opacity: 0 });
    gsap.set(posterSol, { scale: 1.25, yPercent: 9 });
    gsap.set(oscuro, { opacity: 0 });
    gsap.set(halo, { "--luz-halo": 0 } as gsap.TweenVars);
    gsap.set(tSol, { opacity: 1 });
    gsap.set(palabras, { yPercent: 60, opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: s, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true },
    });

    // 0.04 → 0.14: anochece. 0.14 → 0.24: se enciende la fachada. 0.24 → 0.5: entrada.
    // 0.5 → 0.88: hacia el sol. 0.88 → 1: el pico.
    tl.to(anochecer, { opacity: 1, duration: 0.1 }, 0.04)
      .to(tPortada, { opacity: 0, yPercent: -12, duration: 0.08 }, 0.12)
      .to(velo, { opacity: 0, duration: 0.08 }, 0.12)
      .to(encendida, { "--enc": "100%", duration: 0.1 } as gsap.TweenVars, 0.14)
      .to(posterEntrada, { scale: 1.16, duration: 0.26 }, 0.24)
      .to(capaEntrada, { opacity: 0, duration: 0.03 }, 0.48)
      .to(capaSol, { opacity: 1, duration: 0.03 }, 0.48)
      .to(posterSol, { scale: 1, yPercent: 0, duration: 0.38 }, 0.5)
      .to(oscuro, { opacity: 0.55, duration: 0.12 }, 0.88)
      .to(halo, { "--luz-halo": 1, duration: 0.12 } as gsap.TweenVars, 0.88)
      .to(palabras, { yPercent: 0, opacity: 1, duration: 0.09, stagger: 0.01 }, 0.9);
    // El clip arranca en el cuadro de la noche encendida: aparece cuando terminó de encenderse
    if (videoEntrada && videoOk.entrada) tl.to(videoEntrada, { opacity: 1, duration: 0.025 }, 0.225);

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
          const t = Math.min(1, Math.max(0, (p - 0.24) / 0.26)) * (e.duration - 0.05);
          if (Math.abs(t - ultimoE) > 0.02) { e.currentTime = t; ultimoE = t; }
        }
        if (so && so.duration && videoOk.sol) {
          const t = Math.min(1, Math.max(0, (p - 0.5) / 0.38)) * (so.duration - 0.05);
          if (Math.abs(t - ultimoS) > 0.02) { so.currentTime = t; ultimoS = t; }
        }
      },
    });

    return () => { tl.kill(); st.kill(); };
  }, [modo, videoOk.entrada, videoOk.sol]);

  // ---- MOBILE: anochece y se enciende sola al subir el telón ----------------------
  useEffect(() => {
    if (modo !== "auto" || !telonArriba) return;
    const t1 = setTimeout(() => setFase("anochece"), 1400);
    const t2 = setTimeout(() => setFase("encendida"), 1400 + 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [modo, telonArriba]);

  // ---- MOBILE: después del encendido se reproduce sola, tocar pausa ----------------
  useEffect(() => {
    if (modo !== "auto" || !seccion.current || fase !== "encendida") return;
    const e = vEntrada.current, so = vSol.current;
    if (!e || !so) return;
    const alTerminarEntrada = () => {
      seccion.current?.classList.add("en-sol-capa");
      so.play().catch(() => setEnSol(true));
    };
    const alTerminarSol = () => setEnSol(true);
    e.addEventListener("ended", alTerminarEntrada);
    so.addEventListener("ended", alTerminarSol);
    // El clip espera a que la fachada termine de encenderse (la transición dura 1,8 s)
    let io: IntersectionObserver | null = null;
    const arranque = setTimeout(() => {
      const sec = seccion.current;
      if (!sec) return;
      setRueda(true);
      io = new IntersectionObserver(
        ([x]) => {
          if (x.isIntersecting && !pausado) { if (!sec.classList.contains("en-sol-capa")) e.play().catch(() => {}); else so.play().catch(() => {}); }
          else { e.pause(); so.pause(); }
        },
        { threshold: 0.3 },
      );
      io.observe(sec);
    }, 1900);
    return () => { clearTimeout(arranque); io?.disconnect(); e.removeEventListener("ended", alTerminarEntrada); so.removeEventListener("ended", alTerminarSol); };
  }, [modo, pausado, fase]);

  // Sin video en mobile: mostrar el sol después de unos segundos igual (el póster hace la película)
  useEffect(() => {
    if (modo !== "auto" || fase !== "encendida") return;
    if (videoOk.entrada || videoOk.sol) return;
    const t = setTimeout(() => { seccion.current?.classList.add("en-sol-capa"); setEnSol(true); }, 3500);
    return () => clearTimeout(t);
  }, [modo, videoOk, fase]);

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
        scrub ? "h-[500vh]" : "min-h-[100svh]",
        estatico || (mobile && enSol) ? "en-sol" : "",
        mobile ? "modo-auto" : "",
        mobile && rueda ? "rueda" : "",
        mobile && fase !== "dia" ? "anochece" : "",
        mobile && fase === "encendida" ? "enciende" : "",
      ].join(" ")}
      data-luz="dia"
      aria-label="Portada"
    >
      <div className={`pantalla ${scrub ? "sticky top-0" : "relative"} h-[100svh] overflow-clip`} onClick={mobile ? alternarPausa : undefined}>
        {/* Capa 1: la calle y el corredor */}
        <div className="capa capa-entrada fondo-imagen">
          <div className="poster-anim absolute inset-0 origin-center">
            <Imagen nombre="fachada-nunez-atardecer" alt="Fachada blanca de Fosque Reformer en Núñez, entre edificios de departamentos y locales a la calle, con franjas onduladas roja, dorada y naranja y la entrada en arco" prioridad sizes={SIZES_PANTALLA_16_9} />
            {/* La misma calle de noche: primero con la fachada apagada, después encendida */}
            <div className="capa-anochecer absolute inset-0" aria-hidden="true">
              <Imagen nombre="fachada-calle-noche-apagada" alt="" sizes={SIZES_PANTALLA_16_9} />
            </div>
            <div className="capa-encendida absolute inset-0" aria-hidden="true">
              <Imagen nombre="fachada-calle-noche" alt="" sizes={SIZES_PANTALLA_16_9} />
            </div>
          </div>
          {modo && !estatico && (
            <video ref={vEntrada} muted playsInline preload={scrub ? "none" : "metadata"} disablePictureInPicture tabIndex={-1}
              className={`transition-opacity duration-500 ${videoOk.entrada ? "opacity-100" : "opacity-0"}`}>
              {scrub ? (
                <source src={VIDEO.entrada.scrub} type="video/mp4" />
              ) : (
                <>
                  <source src={VIDEO.entrada.webm} type="video/webm" />
                  <source src={VIDEO.entrada.mp4} type="video/mp4" />
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
                <source src={VIDEO.sol.scrub} type="video/mp4" />
              ) : (
                <>
                  <source src={VIDEO.sol.webm} type="video/webm" />
                  <source src={VIDEO.sol.mp4} type="video/mp4" />
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

        {/* Velo detrás del titular: se va con él (en escritorio a la izquierda, en mobile de arriba abajo) */}
        <div className="velo-portada absolute inset-0" aria-hidden="true" />

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
        .pelicula .velo-portada {
          background: linear-gradient(180deg, rgba(28,19,16,0.12) 0%, rgba(28,19,16,0.42) 45%, rgba(28,19,16,0.5) 100%);
        }
        @media (min-width: 768px) {
          .pelicula .velo-portada {
            background: linear-gradient(90deg, rgba(28,19,16,0.55) 0%, rgba(28,19,16,0.38) 38%, rgba(28,19,16,0.08) 62%, rgba(28,19,16,0) 75%);
          }
        }
        .pelicula.en-sol .velo-portada { opacity: 0; }
        @property --enc { syntax: "<percentage>"; inherits: false; initial-value: -15%; }
        .pelicula .capa-anochecer { opacity: 0; }
        .pelicula .capa-encendida {
          --enc: -15%;
          -webkit-mask-image: linear-gradient(180deg, #000 var(--enc), transparent calc(var(--enc) + 15%));
          mask-image: linear-gradient(180deg, #000 var(--enc), transparent calc(var(--enc) + 15%));
        }
        /* Mobile: el clip queda oculto hasta que la fachada termina de encenderse */
        .pelicula.modo-auto:not(.rueda) .capa-entrada video { opacity: 0 !important; }
        .pelicula.anochece .capa-anochecer { opacity: 1; transition: opacity 1.6s ease-in-out; }
        .pelicula.enciende .capa-encendida { --enc: 100%; transition: --enc 1.8s cubic-bezier(.45,0,.25,1); }
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
