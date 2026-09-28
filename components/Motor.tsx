"use client";

// El motor de la película: Lenis para el scroll, GSAP + ScrollTrigger para lo que
// necesita línea de tiempo, y el arco de luz (una variable CSS que recorre las escenas).
//
// Convenciones que lee del DOM:
//   .escena[data-luz="nombre"]   → al llegar, el fondo pasa a lib/luz.ts[nombre]
//   [data-revelar]               → aparece al entrar en pantalla (fade + subida)
//   [data-revelar="lineas"]      → lo mismo, pero partido en líneas con SplitText
//   [data-parallax="12"]         → parallax vertical leve con scrub
//
// Imports estáticos a propósito: probé cargar GSAP/Lenis con import() dinámico y el LCP
// simulado de Lighthouse empeoró (más chunks antes del primer pintado). Ver DECISIONES.md.
// Con prefers-reduced-motion todo queda visible en su estado final y no hay Lenis.

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { luces, type NombreLuz } from "@/lib/luz";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Motor() {
  useEffect(() => {
    const html = document.documentElement;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Scroll suave -------------------------------------------------------
    let lenis: Lenis | null = null;
    if (!reducido) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      // Los anclas del header pasan por Lenis para que el scroll sea el mismo
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const id = a.getAttribute("href")!.slice(1);
          const destino = id && document.getElementById(id);
          if (!destino) return;
          e.preventDefault();
          lenis?.scrollTo(destino, { offset: 0, duration: 1.4 });
          destino.setAttribute("tabindex", "-1");
          destino.focus({ preventScroll: true });
          history.pushState(null, "", `#${id}`);
        });
      });
    }

    // ---- Arco de luz --------------------------------------------------------
    // UNA sola función pinta :root leyendo el progreso de cada escena. Nada de un tween
    // por escena sobre la misma variable: con saltos de scroll se pisan entre sí.
    const escenas = Array.from(document.querySelectorAll<HTMLElement>(".escena[data-luz]"));
    const cadena = escenas
      .map((el) => ({ el, luz: luces[el.dataset.luz as NombreLuz] }))
      .filter((x) => x.luz);
    const triggers: ScrollTrigger[] = [];
    const progresos = new Array(cadena.length).fill(0);
    const mezclar = (a: string, b: string, p: number) => gsap.utils.interpolate(a, b, p) as string;
    const pintar = () => {
      if (!cadena.length) return;
      let fondo = cadena[0].luz.fondo, tinta = cadena[0].luz.tinta;
      for (let i = 1; i < cadena.length; i++) {
        const p = progresos[i];
        if (p <= 0) break;
        fondo = mezclar(fondo, cadena[i].luz.fondo, p);
        tinta = mezclar(tinta, cadena[i].luz.tinta, p);
      }
      html.style.setProperty("--luz-fondo", fondo);
      html.style.setProperty("--luz-tinta", tinta);
    };
    cadena.forEach((x, i) => {
      if (i === 0) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: x.el,
          start: "top 85%",
          end: "top 35%",
          onUpdate: (self) => { progresos[i] = self.progress; pintar(); },
          onRefresh: (self) => { progresos[i] = self.progress; pintar(); },
        }),
      );
    });
    pintar();

    // ---- Reveals ------------------------------------------------------------
    html.classList.add("motor-listo");
    const splits: SplitText[] = [];
    const revelables = Array.from(document.querySelectorAll<HTMLElement>("[data-revelar]"));
    revelables.forEach((el) => {
      if (reducido) { el.classList.add("revelado"); return; }
      const tipo = el.dataset.revelar;
      const retraso = Number(el.dataset.retraso || 0);
      let objetivos: Element[] = [el];
      if (tipo === "lineas") {
        const split = SplitText.create(el, { type: "lines", linesClass: "linea", autoSplit: true, mask: "lines" });
        splits.push(split);
        objetivos = split.lines;
      }
      gsap.set(el, { opacity: 1 });
      gsap.fromTo(
        objetivos,
        { yPercent: tipo === "lineas" ? 110 : 40, opacity: tipo === "lineas" ? 1 : 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: tipo === "lineas" ? 1.1 : 0.9,
          ease: "power3.out",
          stagger: 0.09,
          delay: retraso,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
            onEnter: () => el.classList.add("revelado"),
          },
        },
      );
    });

    // Parallax leve en imágenes marcadas
    if (!reducido) {
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const fuerza = Number(el.dataset.parallax || 12);
        gsap.fromTo(
          el,
          { yPercent: -fuerza / 2 },
          {
            yPercent: fuerza / 2,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    }

    ScrollTrigger.refresh();

    // El alto del documento cambia después de montar (la película pasa a 400vh, cargan
    // imágenes y fuentes): cada cambio de tamaño recalcula las posiciones de los triggers.
    let refrescoTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(refrescoTimer);
      refrescoTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    });
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      window.clearTimeout(refrescoTimer);
      triggers.forEach((t) => t.kill());
      splits.forEach((s) => s.revert());
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis?.destroy();
      html.classList.remove("motor-listo");
    };
  }, []);

  return null;
}
