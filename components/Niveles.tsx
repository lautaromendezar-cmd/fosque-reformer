"use client";

// Niveles & Evolución. Tabs accesibles (flechas, Home/End). En mobile los nombres van en una
// fila que scrollea. Selector informativo: muestra, no evalúa.

import { useId, useRef, useState } from "react";
import { niveles } from "@/content/metodo";

export default function Niveles() {
  const [activo, setActivo] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const n = niveles.items[activo];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const total = niveles.items.length;
    let dest = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") dest = (i + 1) % total;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") dest = (i - 1 + total) % total;
    else if (e.key === "Home") dest = 0;
    else if (e.key === "End") dest = total - 1;
    else return;
    e.preventDefault();
    setActivo(dest);
    tabs.current[dest]?.focus();
  };

  return (
    <section id="niveles" className="escena relative scroll-mt-20 text-hueso" data-luz="tibio" aria-labelledby="t-niveles">
      <div className="contenedor py-[16vh] md:py-[20vh]">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="dato mb-5 text-manteca" data-revelar>{niveles.antetitulo}</p>
            <h2 id="t-niveles" className="h1 max-w-[14ch]" data-revelar="lineas">{niveles.titulo}</h2>
            <p className="mt-6 max-w-[38ch] text-hueso/80" data-revelar>{niveles.cita}</p>
          </div>

          <div className="mt-12 md:col-span-7 md:mt-0" data-revelar>
            <div role="tablist" aria-label="Niveles" className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0 [scrollbar-width:none]">
              {niveles.items.map((item, i) => {
                const sel = i === activo;
                return (
                  <button
                    key={item.numero}
                    ref={(el) => { tabs.current[i] = el; }}
                    role="tab"
                    id={`${id}-tab-${i}`}
                    aria-selected={sel}
                    aria-controls={`${id}-panel`}
                    tabIndex={sel ? 0 : -1}
                    onClick={() => setActivo(i)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={[
                      "titulo shrink-0 rounded-full px-5 py-3 text-[1.1rem] leading-none transition-colors duration-300",
                      sel ? "bg-hueso text-noche" : "text-hueso/70 hover:text-hueso",
                    ].join(" ")}
                  >
                    <span className="dato mr-2 opacity-70">{item.numero}</span>
                    {item.nombre}
                  </button>
                );
              })}
            </div>

            <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${activo}`} className="mt-8 border-t border-hueso/25 pt-8">
              <p className="titulo text-[clamp(5rem,14vw,10rem)] leading-[0.8] text-naranja/20" aria-hidden="true">0{n.numero}</p>
              <h3 className="h2 -mt-3 md:-mt-4">
                Nivel {n.numero} · {n.nombre}
                {"sello" in n && n.sello && <span className="dato ml-3 align-middle text-manteca">{n.sello}</span>}
              </h3>
              <p className="mt-3 text-[1.15rem] font-semibold text-manteca">{n.foco}</p>
              <p className="mt-4 max-w-[52ch] text-hueso/85">{n.texto}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
