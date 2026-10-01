// El Método Fosque: la cita como titular y el texto al costado.
// En el inicio va la versión corta con la lista de niveles y el enlace a /metodo.

import Link from "next/link";
import { metodo, niveles } from "@/content/metodo";

// Fondo rosa del manual: después del Reformer sobre lino, no repite el blanco.
export default function MetodoTexto({ adelanto = false }: { adelanto?: boolean }) {
  return (
    <section className="escena claro relative" data-luz="rosa" aria-labelledby="t-metodo">
      <div className="contenedor py-[16vh] md:py-[20vh]">
        <p className="dato mb-5 text-corteza" data-revelar>{metodo.antetitulo}</p>
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <h2 id="t-metodo" className="h1 md:col-span-7" data-revelar="lineas">{metodo.cita}</h2>
          <div className="mt-8 md:col-span-4 md:col-start-9 md:mt-3">
            <p className="max-w-[44ch] text-corteza" data-revelar>{adelanto ? metodo.resumen : metodo.texto}</p>
            {adelanto && (
              <>
                <ol className="mt-8 border-t border-corteza/20" aria-label={niveles.antetitulo} data-revelar>
                  {niveles.items.map((n) => (
                    <li key={n.numero} className="flex items-baseline gap-4 border-b border-corteza/20 py-3">
                      <span className="dato text-corteza">0{n.numero}</span>
                      <span className="titulo text-[1.35rem]">{n.nombre}</span>
                    </li>
                  ))}
                </ol>
                <Link href="/metodo" className="boton boton-secundario mt-8" data-revelar>Conocer el método</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
