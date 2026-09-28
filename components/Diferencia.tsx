// La diferencia Fosque (brief §2): tres argumentos, editorial puro sobre el ámbar.
// El sol-loop respira detrás, oscurecido. Después del pico hay que bajar el volumen.

import { diferencia } from "@/content/experiencia";
import VideoFondo from "./VideoFondo";

export default function Diferencia() {
  return (
    <section id="experiencia" className="escena grano relative overflow-clip" data-luz="ambar" aria-labelledby="t-diferencia">
      <VideoFondo clip="sol-loop" poster="salon-reformer-sol-frontal-alt" alt="" oscurecer={0.62} />
      <div className="contenedor relative z-10 py-[18vh] md:py-[22vh]">
        <p className="dato mb-5 text-manteca" data-revelar>{diferencia.antetitulo}</p>
        <h2 id="t-diferencia" className="h1 max-w-[16ch]" data-revelar="lineas">{diferencia.titulo}</h2>

        <ol className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-8">
          {diferencia.argumentos.map((a, i) => (
            <li key={a.numero} className="relative border-t border-hueso/25 pt-6" data-revelar data-retraso={String(i * 0.12)}>
              <span className="dato text-manteca">{a.numero}</span>
              <h3 className="h3 mt-3">{a.titulo}</h3>
              <p className="mt-4 max-w-[38ch] text-hueso/85">{a.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
