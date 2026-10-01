// Fosque Niños (próximamente): el espacio que el PDF reserva para los renders de la línea infantil.

import { ninos } from "@/content/metodo";
import Imagen from "./Imagen";
import type { NombreImagen } from "@/lib/imagenes";

const posiciones = [
  "md:col-span-7 aspect-[16/10]",
  "md:col-span-5 md:mt-24 aspect-[4/3]",
  "md:col-span-5 md:col-start-3 md:-mt-6 aspect-[3/2]",
];

export default function Ninos() {
  return (
    <section className="escena claro relative" data-luz="lino" aria-labelledby="t-ninos">
      <div className="contenedor py-[16vh] md:py-[20vh]">
        <p className="dato mb-5 inline-block rounded-full bg-naranja px-3 py-1 text-noche" data-revelar>{ninos.antetitulo}</p>
        <h2 id="t-ninos" className="display !text-[clamp(2.75rem,1.2rem+5vw,6rem)]" data-revelar="lineas">{ninos.titulo}</h2>
        {ninos.texto && <p className="mt-6 max-w-[44ch] text-corteza" data-revelar>{ninos.texto}</p>}
        <ul className="mt-14 grid gap-6 md:grid-cols-12" aria-label="Renders de Fosque Niños">
          {ninos.imagenes.map((im, i) => (
            <li key={im.imagen} className={`relative overflow-clip rounded-sm ${posiciones[i]}`} data-revelar data-retraso={String(i * 0.1)}>
              <Imagen nombre={im.imagen as NombreImagen} alt={im.alt} sizes="(min-width: 768px) 55vw, 100vw" className="fondo-imagen" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
