// Galería de espacios (/equipamiento): grilla asimétrica con parallax leve.

import { equipamiento } from "@/content/equipamiento";
import Imagen from "./Imagen";
import type { NombreImagen } from "@/lib/imagenes";

const posiciones = [
  "md:col-span-8 aspect-[16/9]",
  "md:col-span-4 md:mt-24 aspect-square",
  "md:col-span-5 md:col-start-2 aspect-[4/3]",
  "md:col-span-5 md:col-start-8 md:mt-16 aspect-[4/3]",
  "md:col-span-7 md:col-start-3 aspect-[16/9]",
];

export default function Galeria() {
  return (
    <section className="escena grano relative bg-marron text-hueso" data-luz="marron" aria-label="Los espacios">
      <div className="contenedor py-[14vh] md:py-[18vh]">
        <ul className="grid gap-6 md:grid-cols-12 md:gap-y-12">
          {equipamiento.galeria.map((g, i) => (
            <li key={g.imagen} className={`relative overflow-clip ${posiciones[i % posiciones.length]}`} data-revelar data-retraso={String((i % 2) * 0.1)}>
              <Imagen nombre={g.imagen as NombreImagen} alt={g.alt} sizes="(min-width: 768px) 60vw, 100vw" className="fondo-imagen scale-[1.1]" parallax={8} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
