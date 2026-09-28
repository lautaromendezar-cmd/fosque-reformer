// La tira de materiales que cierra "El método": acá la luz gira de ámbar a agua.
// materiales-loop de fondo (vestuario), grilla asimétrica de detalles con parallax leve.

import { metodo } from "@/content/experiencia";
import VideoFondo from "./VideoFondo";
import Imagen from "./Imagen";
import type { NombreImagen } from "@/lib/imagenes";

const posiciones = [
  "md:col-span-5 md:col-start-1 aspect-[4/3]",
  "md:col-span-4 md:col-start-8 md:mt-32 aspect-[3/4]",
  "md:col-span-4 md:col-start-3 md:-mt-10 aspect-square",
  "md:col-span-5 md:col-start-8 aspect-[3/2]",
];

export default function Materiales() {
  const m = metodo.materiales;
  return (
    <section className="escena grano relative overflow-clip" data-luz="agua" aria-labelledby="t-materiales">
      <VideoFondo clip="materiales-loop" poster="vestuario-bachas-mural-agua" alt="" oscurecer={0.7} />
      <div className="contenedor relative z-10 py-[18vh] md:py-[22vh]">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="dato mb-5 text-salvia" data-revelar>{m.antetitulo}</p>
            <h2 id="t-materiales" className="h1 max-w-[12ch]" data-revelar="lineas">{m.titulo}</h2>
          </div>
          <p className="mt-8 max-w-[40ch] text-hueso/85 md:col-span-4 md:col-start-9 md:mt-16" data-revelar>{m.texto}</p>
        </div>

        <ul className="mt-16 grid gap-6 md:mt-24 md:grid-cols-12 md:gap-y-10" aria-label="Detalles del estudio">
          {m.detalles.map((d, i) => (
            <li key={d.imagen} className={`relative overflow-clip ${posiciones[i]}`} data-revelar data-retraso={String((i % 2) * 0.12)}>
              <Imagen nombre={d.imagen as NombreImagen} alt={d.alt} sizes="(min-width: 768px) 40vw, 100vw" className="fondo-imagen" parallax={8 + (i % 2) * 6} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
