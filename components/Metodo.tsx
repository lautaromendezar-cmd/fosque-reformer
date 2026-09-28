// El método (brief §4): el Reformer de autor y los 24 años de Gerardo Fosque.
// Imagen grande que sangra, titular que la solapa, cuerpo chico a un costado.
// El reformer-loop va de fondo, oscurecido.

import { metodo } from "@/content/experiencia";
import VideoFondo from "./VideoFondo";
import Imagen from "./Imagen";

export default function Metodo() {
  return (
    <section id="metodo" className="escena grano relative overflow-clip" data-luz="marron" aria-labelledby="t-metodo">
      <VideoFondo clip="reformer-loop" poster="salon-reformer-domo-general" alt="" oscurecer={0.66} />

      <div className="contenedor relative z-10 py-[18vh] md:py-[22vh]">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="dato mb-5 text-manteca" data-revelar>{metodo.antetitulo}</p>
            <h2 id="t-metodo" className="h1 max-w-[16ch]" data-revelar="lineas">{metodo.titulo}</h2>
          </div>
          <div className="mt-10 md:col-span-4 md:col-start-9 md:mt-24">
            {metodo.parrafos.map((p, i) => (
              <p key={i} className="mt-5 max-w-[40ch] text-hueso/85 first:mt-0" data-revelar data-retraso={String(0.1 + i * 0.1)}>{p}</p>
            ))}
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-hueso/25 pt-8 md:mt-24 md:w-2/3" data-revelar>
          {metodo.datos.map((d) => (
            <div key={d.etiqueta}>
              <dt className="dato text-hueso/70">{d.etiqueta}</dt>
              <dd className="titulo mt-1 text-[clamp(2.5rem,7vw,4.5rem)] leading-none text-manteca">{d.valor}</dd>
            </div>
          ))}
        </dl>

        {/* Detalle chico, desplazado: plano cercano */}
        <div className="mt-16 md:mt-24 md:grid md:grid-cols-12" data-revelar>
          <div className="relative aspect-[3/2] overflow-clip md:col-span-5 md:col-start-2">
            <Imagen nombre="estanteria-discos-madera" alt="Estantería de discos de madera clara con toallas y accesorios de pilates" sizes="(min-width: 768px) 40vw, 100vw" className="fondo-imagen" parallax={10} />
          </div>
        </div>
      </div>
    </section>
  );
}
