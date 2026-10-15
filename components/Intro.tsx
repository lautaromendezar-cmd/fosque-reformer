// Después del sol: el segundo párrafo del subtítulo del PDF, partido en niveles (pedido del
// cliente, 14-oct: el salón del sol de fondo repetía el final de la película y el párrafo
// corrido "no tenía magia"). Ahora: los tres ingredientes en grande, la recepción con gente
// (otro ambiente: café, risas, molinetes) y el remate en manteca. Mismas palabras del PDF.

import { portada } from "@/content/sitio";
import Imagen from "./Imagen";

export default function Intro() {
  const t = portada.bajada2;
  return (
    <section className="escena grano relative overflow-clip text-hueso" data-luz="ambar" aria-label="Fosque Reformer">
      <div className="contenedor py-[16vh] md:py-[20vh]">
        <div className="md:grid md:grid-cols-12 md:items-center md:gap-8">
          <div className="md:col-span-7">
            <p className="dato mb-6 text-manteca" data-revelar>{t.combinamos}</p>
            <ul className="grid gap-4 md:gap-5">
              {t.ingredientes.map((linea, i) => (
                <li key={linea} className="titulo max-w-[22ch] text-[clamp(1.875rem,1.1rem+2.8vw,3.25rem)] !leading-[1.08]" data-revelar data-retraso={String(i * 0.1)}>
                  {linea}
                </li>
              ))}
            </ul>
            <p className="titulo h3 mt-8 max-w-[26ch] text-naranja md:mt-10" data-revelar data-retraso="0.3">{t.para}</p>
          </div>

          <div className="relative mt-14 aspect-square overflow-clip md:col-span-5 md:mt-0" data-revelar>
            <Imagen
              nombre="recepcion-alumnas-cafe"
              alt="Recepción de Fosque Reformer: dos alumnas entran riéndose con sus colchonetas, frente al isotipo en la pared, y un alumno sentado mira el celular"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="fondo-imagen scale-[1.12]"
              imgClassName="object-[88%_50%]"
              parallax={8}
            />
          </div>
        </div>

        <div className="mt-20 md:mt-24 md:grid md:grid-cols-12 md:items-end md:gap-8">
          <p className="max-w-[40ch] text-[1.125rem] leading-relaxed text-hueso/85 md:col-span-5 md:text-[1.25rem]" data-revelar>
            {t.acompanamiento}
          </p>
          <p className="titulo h1 mt-6 max-w-[14ch] text-manteca md:col-span-7 md:mt-0" data-revelar="lineas">{t.cierre}</p>
        </div>
      </div>
    </section>
  );
}
