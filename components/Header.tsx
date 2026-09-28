"use client";

// Header: isotipo a la izquierda, las cuatro anclas del brief y el CTA de WhatsApp.
// Siempre visible; al bajar toma fondo. En mobile: isotipo + CTA, anclas en menú.

import { useEffect, useRef, useState } from "react";
import { navegacion, cta, marca } from "@/content/sitio";
import { linkWhatsApp } from "@/lib/whatsapp";
import Isotipo from "./Isotipo";

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const [conFondo, setConFondo] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setConFondo(window.scrollY > 40));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  // Esc cierra el menú y el foco vuelve al botón
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("lenis-stopped");
    return () => { document.removeEventListener("keydown", onKey); document.documentElement.classList.remove("lenis-stopped"); };
  }, [abierto]);

  const wa = linkWhatsApp();

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        conFondo && !abierto ? "bg-[color-mix(in_srgb,var(--luz-fondo)_78%,transparent)] backdrop-blur-md" : "",
      ].join(" ")}
    >
      <div className="contenedor flex items-center justify-between gap-4 py-4 md:py-5">
        <a href="#inicio" className="flex items-center gap-3 text-current" aria-label={`${marca.nombre}, ir al inicio`}>
          <Isotipo className="h-8 w-auto md:h-9" />
          <span className="oculto-visualmente">{marca.nombre}</span>
        </a>

        <nav aria-label="Secciones" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navegacion.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="dato opacity-85 transition-opacity hover:opacity-100 focus-visible:opacity-100">
                  {n.etiqueta}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={wa} target="_blank" rel="noopener" className="boton boton-primario !min-h-[2.6rem] !px-4 text-[0.9rem]">
            <span className="md:hidden">{cta.corto}</span>
            <span className="hidden md:inline">{cta.principal}</span>
          </a>
          <button
            type="button"
            className="md:hidden grid h-11 w-11 place-items-center rounded-full"
            aria-expanded={abierto}
            aria-controls="menu-mobile"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setAbierto((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú mobile: ocupa la pantalla, fondo del arco de luz */}
      <div
        id="menu-mobile"
        ref={menuRef}
        hidden={!abierto}
        className="md:hidden fixed inset-0 top-[4.25rem] bg-[var(--luz-fondo)] px-6 pb-10 pt-8"
      >
        <nav aria-label="Secciones">
          <ul className="flex flex-col gap-2">
            {navegacion.map((n, i) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setAbierto(false)}
                  className="titulo block py-3 text-[2rem] leading-none"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {n.etiqueta}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={wa} target="_blank" rel="noopener" className="boton boton-primario mt-10 w-full justify-center">
          {cta.principal}
        </a>
      </div>
    </header>
  );
}
