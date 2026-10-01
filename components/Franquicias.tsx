// Landing pre-franquicias (PDF §10). Portal B2B: sin el CTA de la Semana de Experiencia.

import { franquicias } from "@/content/academia";
import { linkWhatsApp } from "@/lib/whatsapp";

export default function Franquicias() {
  const href = franquicias.ctaHref ?? linkWhatsApp(franquicias.mensaje);
  return (
    <section className="escena claro relative" data-luz="lino" aria-labelledby="t-modelo">
      <div className="contenedor py-[16vh] md:py-[20vh]">
        <h2 id="t-modelo" className="oculto-visualmente">El modelo</h2>
        <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
          {franquicias.puntos.map((p, i) => (
            <li key={p.titulo} data-revelar data-retraso={String(i * 0.12)}>
              <span className="titulo text-[clamp(3rem,6vw,4.5rem)] leading-none text-coral">0{i + 1}</span>
              <h3 className="h3 mt-4">{p.titulo}</h3>
              <p className="mt-3 max-w-[34ch] text-corteza">{p.texto}</p>
            </li>
          ))}
        </ol>
        <p className="mt-16 md:mt-24" data-revelar>
          <a href={href} target="_blank" rel="noopener" className="boton boton-primario">{franquicias.cta}</a>
        </p>
      </div>
    </section>
  );
}
