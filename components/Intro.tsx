// Después del sol: el segundo párrafo del subtítulo del PDF, en grande, con el sol-loop
// respirando detrás. Baja el volumen después del pico de la película.

import { portada } from "@/content/sitio";
import VideoFondo from "./VideoFondo";

export default function Intro() {
  return (
    <section className="escena grano relative overflow-clip" data-luz="ambar" aria-label="Fosque Reformer">
      <VideoFondo clip="sol-loop" poster="salon-sol-reformers-negros" alt="" oscurecer={0.66} />
      <div className="contenedor relative z-10 py-[20vh] md:py-[26vh]">
        <p className="h2 max-w-[30ch] !font-[600] !leading-[1.25] text-hueso" data-revelar>{portada.bajada2}</p>
      </div>
    </section>
  );
}
