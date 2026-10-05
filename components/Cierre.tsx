// Cierre de cada página B2C: vuelve a la pregunta de la portada y al CTA principal, con una
// clase en la sala de las palmeras respirando detrás: las profes de Núñez trabajando y sonriendo
// con alumnas. Pedido del cliente (5-oct-2026): gente en vez de la fachada de noche.

import { portada, cta } from "@/content/sitio";
import { linkWhatsApp } from "@/lib/whatsapp";
import VideoFondo from "./VideoFondo";

export default function Cierre() {
  return (
    <section className="escena relative overflow-clip text-hueso" data-luz="noche" aria-labelledby="t-cierre">
      <VideoFondo poster="cierre-clase-sonrisas" alt="" oscurecer={0.55} />
      <div className="contenedor relative z-10 py-[18vh] text-center md:py-[24vh]">
        <h2 id="t-cierre" className="display mx-auto max-w-[16ch] !text-[clamp(2.5rem,1rem+5vw,5.5rem)] [text-shadow:0_2px_40px_rgba(28,19,16,0.55)]" data-revelar="lineas">{portada.titulo}</h2>
        <a href={linkWhatsApp()} target="_blank" rel="noopener" className="boton boton-primario mt-10" data-revelar>{cta.hero}</a>
      </div>
    </section>
  );
}
