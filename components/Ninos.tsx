// Fosque Niños (próximamente): el espacio que el PDF reserva para los renders de la línea infantil.

import { ninos } from "@/content/metodo";
import Imagen from "./Imagen";
import type { NombreImagen } from "@/lib/imagenes";

export default function Ninos() {
  return (
    <section className="escena claro relative" data-luz="lino" aria-labelledby="t-ninos">
      {/* Una sola imagen: de los renders de la línea infantil, al cliente le gustó sólo la estantería de madera (5-oct) */}
      <div className="contenedor py-[16vh] md:grid md:grid-cols-12 md:items-center md:gap-10 md:py-[20vh]">
        <div className="md:col-span-5">
          <p className="dato mb-5 inline-block rounded-full bg-naranja px-3 py-1 text-noche" data-revelar>{ninos.antetitulo}</p>
          <h2 id="t-ninos" className="display !text-[clamp(2.75rem,1.2rem+5vw,6rem)]" data-revelar="lineas">{ninos.titulo}</h2>
          {ninos.texto && <p className="mt-6 max-w-[44ch] text-corteza" data-revelar>{ninos.texto}</p>}
        </div>
        {ninos.imagenes.map((im) => (
          <div key={im.imagen} className="relative mt-12 aspect-[3/2] overflow-clip rounded-2xl md:col-span-7 md:mt-0" data-revelar>
            <Imagen nombre={im.imagen as NombreImagen} alt={im.alt} sizes="(min-width: 768px) 55vw, 100vw" className="fondo-imagen" />
          </div>
        ))}
      </div>
    </section>
  );
}
