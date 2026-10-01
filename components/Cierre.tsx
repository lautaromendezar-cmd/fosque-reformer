// Cierre de cada página B2C: vuelve a la pregunta de la portada y al CTA principal.

import { portada, cta } from "@/content/sitio";
import { linkWhatsApp } from "@/lib/whatsapp";

export default function Cierre() {
  return (
    <section className="escena relative overflow-clip text-hueso" data-luz="noche" aria-labelledby="t-cierre">
      <div className="contenedor py-[16vh] text-center md:py-[20vh]">
        <h2 id="t-cierre" className="display mx-auto max-w-[16ch] !text-[clamp(2.5rem,1rem+5vw,5.5rem)]" data-revelar="lineas">{portada.titulo}</h2>
        <a href={linkWhatsApp()} target="_blank" rel="noopener" className="boton boton-primario mt-10" data-revelar>{cta.hero}</a>
      </div>
    </section>
  );
}
