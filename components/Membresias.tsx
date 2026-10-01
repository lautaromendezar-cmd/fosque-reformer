// Membresías F (Smart Pricing). En el inicio y en /membresias. Los precios son en dólares y
// van bajo la Garantía de Disponibilidad, como pide el PDF.

import { membresias } from "@/content/membresias";
import { linkWhatsApp } from "@/lib/whatsapp";

const precio = (n: number) => `${membresias.moneda} ${n}`;

export default function Membresias() {
  return (
    <section id="membresias" className="escena claro relative scroll-mt-20" data-luz="lino" aria-labelledby="t-membresias">
      <div className="contenedor py-[16vh] md:py-[20vh]">
        <div className="md:grid md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <p className="dato mb-5 text-magenta-hondo" data-revelar>{membresias.antetitulo}</p>
            <h2 id="t-membresias" className="h1" data-revelar="lineas">{membresias.titulo}</h2>
          </div>
          <div className="mt-8 md:col-span-4 md:col-start-9 md:mt-0" data-revelar>
            <p className="titulo text-[1.35rem]">{membresias.garantia.titulo}</p>
            <p className="mt-1 text-corteza">{membresias.garantia.texto}</p>
          </div>
        </div>

        <ul className="mt-14 grid gap-px overflow-clip rounded-2xl bg-corteza/15 md:mt-20 md:grid-cols-4" aria-label="Packs mensuales">
          {membresias.packs.map((p, i) => (
            <li key={p.id} className={`relative flex flex-col p-6 md:p-7 ${p.recomendado ? "bg-noche text-hueso" : "bg-lino"}`} data-revelar data-retraso={String(i * 0.08)}>
              {p.recomendado && <span className="dato absolute right-5 top-5 rounded-full bg-naranja px-3 py-1 text-noche">Recomendado</span>}
              <h3 className="h3">{p.nombre}</h3>
              <p className={p.recomendado ? "mt-1 text-hueso/75" : "mt-1 text-corteza"}>{p.frecuencia}</p>
              <p className="titulo mt-8 text-[clamp(2.5rem,4vw,3.25rem)] leading-none">
                {precio(p.precio)}
                <span className={`dato ml-2 align-middle ${p.recomendado ? "text-hueso/60" : "text-corteza"}`}>/ mes</span>
              </p>
              <p className={`mt-6 flex-1 text-[0.95rem] ${p.recomendado ? "text-hueso/85" : "text-corteza"}`}>{p.beneficio}</p>
              <a
                href={linkWhatsApp(`Hola, quiero el ${p.nombre} (${p.frecuencia}) en Fosque Reformer.`)}
                target="_blank"
                rel="noopener"
                className={`boton mt-8 justify-center ${p.recomendado ? "boton-primario" : "boton-secundario"}`}
              >
                Quiero el {p.nombre}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
