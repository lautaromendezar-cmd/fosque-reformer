// Los cuatro puntos del Reformer de Autor y los espacios (/equipamiento).

import { equipamiento } from "@/content/equipamiento";

export default function Puntos() {
  return (
    <section className="escena claro relative" data-luz="lino" aria-label="Equipamiento y espacios">
      <div className="contenedor pb-[16vh] md:pb-[20vh]">
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {equipamiento.puntos.map((p, i) => (
            <li key={p.titulo} className="border-t-2 border-naranja pt-6" data-revelar data-retraso={String((i % 2) * 0.12)}>
              <h3 className="h3">{p.titulo}</h3>
              <p className="mt-3 max-w-[46ch] text-corteza">{p.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
