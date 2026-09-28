// Membresías (brief §5). El único bloque claro de toda la página: el precio aparece en papel.
// Precios y moneda: placeholders visibles hasta que el cliente los defina (PENDIENTES.md).

import { membresias } from "@/content/membresias";
import { cta } from "@/content/sitio";
import { linkWhatsApp } from "@/lib/whatsapp";

function precioTexto(precio: number | null) {
  if (precio === null || !membresias.moneda) return membresias.placeholderPrecio;
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: membresias.moneda, maximumFractionDigits: 0 }).format(precio);
}

export default function Membresias() {
  return (
    <section id="membresias" className="escena sobre-claro relative bg-arena text-noche" data-luz="arena" aria-labelledby="t-membresias">
      <div className="contenedor py-[16vh] md:py-[20vh]">
        <p className="dato mb-5 text-corteza" data-revelar>{membresias.antetitulo}</p>
        <h2 id="t-membresias" className="h1 max-w-[18ch]" data-revelar="lineas">{membresias.titulo}</h2>
        <p className="mt-6 max-w-[48ch] text-corteza" data-revelar>{membresias.aclaracion}</p>

        <ul className="mt-14 grid gap-px overflow-clip rounded-2xl bg-corteza/20 md:mt-20 md:grid-cols-4" aria-label="Packs mensuales">
          {membresias.packs.map((p, i) => (
            <li key={p.id} className={`relative flex flex-col bg-arena p-6 md:p-7 ${p.destacado ? "md:bg-[#d3bfa9]" : ""}`} data-revelar data-retraso={String(i * 0.08)}>
              {p.destacado && p.etiqueta && (
                <span className="dato absolute right-5 top-5 rounded-full bg-corteza px-3 py-1 text-arena">{p.etiqueta}</span>
              )}
              <h3 className="h3">{p.nombre}</h3>
              <p className="mt-1 text-corteza">{p.frecuencia}</p>
              {/* TODO(cliente): precio. Mientras es null, se ve el placeholder. */}
              <p className="titulo mt-8 text-[1.75rem] leading-none" aria-label={`Precio: ${precioTexto(p.precio)}`}>
                {p.precio === null ? (
                  <span className="inline-block rounded-md border border-dashed border-corteza/60 px-3 py-2 text-[1rem] font-semibold text-corteza">
                    {precioTexto(p.precio)}
                  </span>
                ) : (
                  precioTexto(p.precio)
                )}
              </p>
              <p className="mt-6 flex-1 text-[0.95rem] text-corteza">{p.beneficio}</p>
              <a
                href={linkWhatsApp(`Hola, quiero consultar por el ${p.nombre} (${p.frecuencia}) en Fosque Reformer.`)}
                target="_blank"
                rel="noopener"
                className={`boton mt-8 justify-center ${p.destacado ? "boton-primario" : "boton-secundario"}`}
                aria-label={`${cta.corto} ${p.nombre} por WhatsApp`}
              >
                Consultar
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
