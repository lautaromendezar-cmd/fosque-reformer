"use client";

// Header: isotipo, música (si hay tema cargado), CTA y el botón de menú.
// Los nueve destinos del PDF no entran en una barra: el menú se abre a pantalla completa
// en todos los tamaños. Siempre visible; al bajar toma fondo.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navegacion, navegacionB2B, cta, marca } from "@/content/sitio";
import { linkWhatsApp } from "@/lib/whatsapp";
import Isotipo from "./Isotipo";
import Musica from "./Musica";

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const [conFondo, setConFondo] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
  const ruta = usePathname();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setConFondo(window.scrollY > 40));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => setAbierto(false), [ruta]);

  // Esc cierra y el foco vuelve al botón; con el menú abierto no scrollea la página
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setAbierto(false); boton.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("lenis-stopped");
    return () => { document.removeEventListener("keydown", onKey); document.documentElement.classList.remove("lenis-stopped"); };
  }, [abierto]);

  const activo = (href: string) => href.split("#")[0] === ruta;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[background-color] duration-300",
        conFondo && !abierto ? "bg-[color-mix(in_srgb,var(--luz-fondo)_82%,transparent)] backdrop-blur-md" : "",
        abierto ? "text-hueso" : "",
      ].join(" ")}
    >
      <div className="contenedor relative z-10 flex items-center justify-between gap-4 py-4 md:py-5">
        <Link href="/" className="flex items-center gap-3 text-current" aria-label={`${marca.nombre}, ir al inicio`}>
          <Isotipo className="h-8 w-auto md:h-9" />
          <span className="oculto-visualmente">{marca.nombre}</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <Musica />
          <a href={linkWhatsApp()} target="_blank" rel="noopener" className="boton boton-primario !min-h-[2.6rem] !px-4 text-[0.9rem]">
            <span className="sm:hidden">{cta.corto}</span>
            <span className="hidden sm:inline">{cta.principal}</span>
          </a>
          <button
            ref={boton}
            type="button"
            className="flex h-11 items-center gap-2 rounded-full px-3"
            aria-expanded={abierto}
            aria-controls="menu"
            onClick={() => setAbierto((v) => !v)}
          >
            <span className="dato hidden md:inline">{abierto ? "Cerrar" : "Menú"}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
            <span className="oculto-visualmente md:hidden">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>
      </div>

      <div id="menu" hidden={!abierto} className="fixed inset-0 overflow-y-auto bg-noche" data-lenis-prevent>
        <div className="contenedor grid min-h-full gap-12 pb-12 pt-28 md:grid-cols-12 md:pt-32">
          <nav aria-label="Secciones" className="md:col-span-8">
            <ul className="flex flex-col">
              {navegacion.map((n, i) => (
                <li key={n.href} className="border-b border-hueso/10">
                  <Link
                    href={n.href}
                    onClick={() => setAbierto(false)}
                    aria-current={activo(n.href) ? "page" : undefined}
                    className="group flex items-baseline gap-4 py-3 md:py-4"
                  >
                    <span className="dato w-7 text-hueso/45">{String(i + 1).padStart(2, "0")}</span>
                    <span className="titulo text-[clamp(1.75rem,1.2rem+2.6vw,3.25rem)] leading-none transition-colors duration-300 group-hover:text-naranja group-aria-[current=page]:text-naranja">
                      {n.etiqueta}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col justify-end gap-6 md:col-span-4">
            <a href={linkWhatsApp()} target="_blank" rel="noopener" className="boton boton-primario justify-center">{cta.principal}</a>
            <Link href={navegacionB2B.href} onClick={() => setAbierto(false)} className="text-[0.95rem] text-hueso/70 underline-offset-4 hover:underline">
              {navegacionB2B.etiqueta} · inversores
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
