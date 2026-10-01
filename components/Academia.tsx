// Academia F (Excelencia Técnica): el texto y los dos programas.

import { academia } from "@/content/academia";

export default function Academia() {
  return (
    <section className="escena claro relative" data-luz="lino" aria-labelledby="t-academia">
      <div className="contenedor py-[16vh] md:py-[20vh]">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <h2 id="t-academia" className="h1 md:col-span-6" data-revelar="lineas">{academia.titulo}</h2>
          <p className="mt-8 max-w-[44ch] text-corteza md:col-span-5 md:col-start-8 md:mt-3" data-revelar>{academia.texto}</p>
        </div>

        <ul className="mt-16 grid gap-6 md:mt-24 md:grid-cols-2">
          {academia.programas.map((p, i) => (
            <li key={p.sigla} className="rounded-2xl bg-lino-hondo p-8 md:p-10" data-revelar data-retraso={String(i * 0.12)}>
              <p className="display !text-[clamp(3.5rem,7vw,6rem)] text-magenta" aria-hidden="true">{p.sigla}</p>
              <h3 className="h3 mt-4">{p.titulo}</h3>
              <p className="mt-3 max-w-[40ch] text-corteza">{p.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
