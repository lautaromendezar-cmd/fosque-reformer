// Los 3 Pilares de la Experiencia Fosque. Editorial: cada pilar con su render, alternando
// lado, la foto grande y el texto chico solapado. En el inicio, con enlace a /experiencia.

import Link from "next/link";
import { experiencia } from "@/content/experiencia";
import Imagen from "./Imagen";
import type { NombreImagen } from "@/lib/imagenes";

export default function Pilares({ conEnlace = false }: { conEnlace?: boolean }) {
  return (
    <section className="escena grano relative bg-marron text-hueso" data-luz="marron" aria-labelledby="t-pilares">
      <div className="contenedor py-[16vh] md:py-[20vh]">
        <p className="dato mb-5 text-manteca" data-revelar>{experiencia.antetitulo}</p>
        <h2 id="t-pilares" className="h1 max-w-[16ch]" data-revelar="lineas">{experiencia.titulo}</h2>

        <ol className="mt-16 grid gap-20 md:mt-24 md:gap-28">
          {experiencia.pilares.map((p, i) => {
            const derecha = i % 2 === 1;
            return (
              <li key={p.numero} className="md:grid md:grid-cols-12 md:items-end md:gap-8">
                <div className={`relative aspect-[3/2] overflow-clip md:col-span-8 ${derecha ? "md:order-2 md:col-start-5" : ""}`} data-revelar>
                  <Imagen nombre={p.imagen as NombreImagen} alt={p.alt} sizes="(min-width: 768px) 66vw, 100vw" className="fondo-imagen scale-[1.12]" parallax={8} />
                </div>
                <div className={`mt-6 md:col-span-4 md:mt-0 md:pb-4 ${derecha ? "md:order-1 md:col-start-1 md:row-start-1" : ""}`} data-revelar data-retraso="0.1">
                  <span className="titulo text-[clamp(3rem,6vw,4.5rem)] leading-none text-naranja">{p.numero}</span>
                  <h3 className="h3 mt-3">{p.titulo}</h3>
                  <p className="mt-3 max-w-[36ch] text-hueso/85">{p.texto}</p>
                </div>
              </li>
            );
          })}
        </ol>

        {conEnlace && (
          <div className="mt-16 flex flex-wrap gap-3 md:mt-24" data-revelar>
            <Link href="/experiencia" className="boton boton-secundario">Vivir la experiencia</Link>
            <Link href="/profesionales" className="boton boton-secundario">Conocer a los Profesionales Fosque</Link>
          </div>
        )}
      </div>
    </section>
  );
}
