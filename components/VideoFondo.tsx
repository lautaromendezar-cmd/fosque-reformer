"use client";

// Video de fondo de sección: autoplay muted loop playsinline, pausado fuera de pantalla.
// Siempre tiene un póster (render) debajo: si el archivo no existe o falla, se ve el póster
// y el sitio se ve terminado igual. En mobile carga la versión -mobile (9:16) si existe.
// Con prefers-reduced-motion no se reproduce nada.

import { useEffect, useRef, useState } from "react";
import Imagen from "./Imagen";
import type { NombreImagen } from "@/lib/imagenes";

type Props = {
  clip: "sol-loop" | "reformer-loop" | "materiales-loop";
  poster: NombreImagen;
  alt: string;
  className?: string;
  oscurecer?: number; // 0..1, capa oscura encima para que el texto se lea
};

export default function VideoFondo({ clip, poster, alt, className = "", oscurecer = 0.45 }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [listo, setListo] = useState(false);
  const [mobile, setMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 767px) and (orientation: portrait)").matches);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || mobile === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onCanPlay = () => setListo(true);
    const onError = () => setListo(false);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("error", onError, true);

    // Pausar fuera de pantalla: no gasta CPU ni batería
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "100px" },
    );
    io.observe(v);
    v.load();
    return () => { io.disconnect(); v.removeEventListener("canplay", onCanPlay); v.removeEventListener("error", onError, true); };
  }, [mobile]);

  const base = `/video/${clip}${mobile ? "-mobile" : ""}`;

  return (
    <div className={`fondo-imagen ${className}`} aria-hidden="true">
      <Imagen nombre={poster} alt={alt} sizes="100vw" />
      {mobile !== null && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          className={`transition-opacity duration-700 ${listo ? "opacity-100" : "opacity-0"}`}
          tabIndex={-1}
        >
          <source src={`${base}.webm`} type="video/webm" />
          <source src={`${base}.mp4`} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(28,19,16,${oscurecer * 0.7}) 0%, rgba(28,19,16,${oscurecer}) 60%, rgba(28,19,16,${Math.min(1, oscurecer + 0.25)}) 100%)` }} />
    </div>
  );
}
