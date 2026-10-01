"use client";

// El motor: Lenis para el scroll, GSAP + ScrollTrigger para lo que necesita línea de tiempo,
// y el arco de luz (una variable CSS que recorre las escenas).
//
// Convenciones que lee del DOM:
//   .escena[data-luz="nombre"]   → al llegar, el fondo pasa a lib/luz.ts[nombre]
//   [data-revelar]               → aparece al entrar en pantalla (fade + subida)
//   [data-revelar="lineas"]      → lo mismo, pero partido en líneas con SplitText
//   [data-parallax="12"]         → parallax vertical leve con scrub
//
// Vive en el layout, así que sobrevive a la navegación: Lenis se crea una vez y el arco y los
// reveals se rearman en cada ruta dentro de un gsap.context, que al revertir mata sólo lo suyo
// (los triggers de la película o del Reformer los maneja cada componente).
// Imports estáticos a propósito: ver DECISIONES.md (con import() el LCP simulado empeoró).

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { luces, type Luz, type NombreLuz } from "@/lib/luz";
import { precargaLista } from "@/lib/video";

gsap.registerPlugin(ScrollTrigger, SplitText);

let lenis: Lenis | null = null;

export default function Motor() {
  const ruta = usePathname();

  // ---- Scroll suave: una sola vez ---------------------------------------------
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95, anchors: { offset: 0, duration: 1.4 } });
    lenis.on("scroll", ScrollTrigger.update);
    // Quieto mientras el preloader tapa la página
    if (document.documentElement.classList.contains("precargando")) {
      lenis.stop();
      precargaLista.then(() => lenis?.start());
    }
    const tick = (t: number) => lenis?.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis?.destroy(); lenis = null; };
  }, []);

  // ---- Por ruta: arranque arriba (o en el ancla), arco de luz, reveals, parallax ------
  useEffect(() => {
    const html = document.documentElement;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const irAlComienzo = () => {
      const destino = window.location.hash && document.getElementById(window.location.hash.slice(1));
      if (destino) lenis ? lenis.scrollTo(destino, { immediate: true, force: true }) : destino.scrollIntoView();
      else lenis ? lenis.scrollTo(0, { immediate: true, force: true }) : window.scrollTo(0, 0);
    };
    // Con el preloader arriba el scroll está bloqueado: el salto al ancla espera a que suba
    if (html.classList.contains("precargando")) precargaLista.then(() => requestAnimationFrame(irAlComienzo));
    else irAlComienzo();

    const splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      // Arco de luz: UNA función pinta :root leyendo el progreso de cada escena. Nada de un
      // tween por escena sobre la misma variable: con saltos de scroll se pisan entre sí.
      const cadena = Array.from(document.querySelectorAll<HTMLElement>(".escena[data-luz]"))
        .map((el) => ({ el, luz: luces[el.dataset.luz as NombreLuz] as Luz }))
        .filter((x) => x.luz);
      const progresos = new Array(cadena.length).fill(0);
      const mezclar = (a: string, b: string, p: number) => gsap.utils.interpolate(a, b, p) as string;
      const pintar = () => {
        if (!cadena.length) return;
        let fondo = cadena[0].luz.fondo, tinta = cadena[0].luz.tinta;
        for (let i = 1; i < cadena.length; i++) {
          const p = progresos[i];
          if (p <= 0) continue; // una clara corta puede no haber llegado arriba y la oscura siguiente sí
          fondo = mezclar(fondo, cadena[i].luz.fondo, p);
          tinta = mezclar(tinta, cadena[i].luz.tinta, p);
        }
        html.style.setProperty("--luz-fondo", fondo);
        html.style.setProperty("--luz-tinta", tinta);
      };
      cadena.forEach((x, i) => {
        if (i === 0) return;
        // Entre dos oscuras la mezcla es lenta: es el efecto. Las claras pintan su propio fondo,
        // así que al cruzar el arco sólo tiene que estar listo para lo que se ve debajo:
        // - hacia una clara: cambia cuando la clara llega arriba (la oscura que sale ya no se ve;
        //   antes, su texto claro quedaba sobre el gris de la mezcla).
        // - desde una clara hacia una oscura: cambia apenas asoma, la oscura entra con su color.
        const desdeClara = !!cadena[i - 1].luz.clara, haciaClara = !!x.luz.clara;
        const [start, end] = haciaClara ? ["top 12%", "top top"] : desdeClara ? ["top bottom", "top 85%"] : ["top 85%", "top 35%"];
        ScrollTrigger.create({
          trigger: x.el,
          start,
          end,
          onUpdate: (self) => { progresos[i] = self.progress; pintar(); },
          onRefresh: (self) => { progresos[i] = self.progress; pintar(); },
        });
      });
      pintar();

      // Reveals
      html.classList.add("motor-listo");
      document.querySelectorAll<HTMLElement>("[data-revelar]").forEach((el) => {
        if (reducido) { el.classList.add("revelado"); return; }
        const tipo = el.dataset.revelar;
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
            delay: Number(el.dataset.retraso || 0),
            scrollTrigger: { trigger: el, start: "top 88%", once: true, onEnter: () => el.classList.add("revelado") },
          },
        );
      });

      // Parallax leve en imágenes marcadas
      if (!reducido) {
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const fuerza = Number(el.dataset.parallax || 12);
          gsap.fromTo(el, { yPercent: -fuerza / 2 }, {
            yPercent: fuerza / 2,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      }
    });

    ScrollTrigger.refresh();

    // El alto del documento cambia después de montar (la película pasa a 400vh, cargan
    // imágenes y fuentes): cada cambio de tamaño recalcula las posiciones de los triggers.
    let timer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    });
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      window.clearTimeout(timer);
      splits.forEach((s) => s.revert());
      ctx.revert();
      html.classList.remove("motor-listo");
    };
  }, [ruta]);

  return null;
}
