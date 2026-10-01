// Profesionales Fosque (Cultura de Amabilidad): la cita como titular y los dos roles.

import Link from "next/link";
import { profesionales } from "@/content/experiencia";
import ImagenViva from "./ImagenViva";

export default function Profesionales() {
  return (
    <section className="escena claro relative" data-luz="lino" aria-labelledby="t-profesionales">
      <div className="contenedor py-[16vh] md:py-[20vh]">
        <p className="dato mb-5 text-magenta-hondo" data-revelar>{profesionales.titulo}</p>
        <h2 id="t-profesionales" className="h2 max-w-[34ch] !leading-[1.2]" data-revelar="lineas">{profesionales.cita}</h2>

        <ImagenViva nombre="recepcion-cafe-molinetes" alt="Recepción con barra de café, el isotipo de Fosque en la pared y molinetes bajo arcos de luz" className="mt-14 aspect-[16/9] md:mt-20 md:aspect-[21/9]" posicion="50% 45%" />

        <ul className="mt-16 grid gap-12 md:mt-24 md:grid-cols-2 md:gap-8">
          {profesionales.roles.map((r, i) => (
            <li key={r.titulo} className="border-t-2 border-coral pt-6" data-revelar data-retraso={String(i * 0.12)}>
              <h3 className="h2">{r.titulo}</h3>
              <p className="mt-4 max-w-[44ch] text-corteza">{r.texto}</p>
            </li>
          ))}
        </ul>

        <p className="mt-16 md:mt-20" data-revelar>
          <Link href="/academia" className="boton boton-secundario">Cómo se forman en Academia F</Link>
        </p>
      </div>
    </section>
  );
}
