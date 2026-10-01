"use client";

// Sucursales (brief §6). Arranca con Núñez. Las sedes salen de content/sedes.ts:
// sumar una es agregar un objeto; el buscador y las tarjetas se arman solos.
// Las curvas de nivel de fondo hacen de mapa topográfico.

import { useMemo, useState } from "react";
import { sedes, sedesTexto } from "@/content/sedes";
import { contacto } from "@/content/sitio";
import { linkWhatsApp } from "@/lib/whatsapp";
import Curvas from "./Curvas";

const normalizar = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function Sedes({ conMapa = false }: { conMapa?: boolean }) {
  const [q, setQ] = useState("");
  const resultados = useMemo(() => {
    const n = normalizar(q.trim());
    if (!n) return sedes;
    return sedes.filter((s) => normalizar(`${s.nombre} ${s.barrio} ${s.ciudad} ${s.direccion}`).includes(n));
  }, [q]);

  return (
    <section id="sedes" className="escena relative overflow-clip text-hueso" data-luz="marron" aria-labelledby="t-sedes">
      <Curvas className="text-hueso" />
      <div className="contenedor relative z-10 py-[16vh] md:py-[20vh]">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="dato mb-5 text-manteca" data-revelar>{sedesTexto.antetitulo}</p>
            <h2 id="t-sedes" className="h1" data-revelar="lineas">{sedesTexto.titulo}</h2>
            <p className="mt-6 max-w-[36ch] text-hueso/80" data-revelar>{sedesTexto.texto}</p>

            <form className="mt-8 max-w-[28rem]" role="search" onSubmit={(e) => e.preventDefault()} data-revelar>
              <label htmlFor="buscar-sede" className="dato block text-hueso/70">{sedesTexto.buscador.etiqueta}</label>
              <input
                id="buscar-sede"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={sedesTexto.buscador.placeholder}
                autoComplete="off"
                className="mt-2 w-full rounded-full border border-hueso/30 bg-noche/25 px-5 py-3 text-hueso placeholder:text-hueso/45"
              />
            </form>
          </div>

          <div className="mt-12 md:col-span-6 md:col-start-7 md:mt-0" aria-live="polite">
            {resultados.length === 0 ? (
              <p className="max-w-[36ch] text-hueso/85">
                {sedesTexto.buscador.sinResultados}{" "}
                <a href={linkWhatsApp("Hola, ¿cuándo abre una sede de Fosque Reformer cerca de mí?")} target="_blank" rel="noopener" className="underline underline-offset-4">Escribinos</a>.
              </p>
            ) : (
              <ul className="grid gap-4">
                {resultados.map((s) => (
                  <li key={s.id} className="rounded-2xl border border-hueso/20 bg-noche/20 p-6 backdrop-blur-sm md:p-8" data-revelar>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="h3">{s.nombre}</h3>
                      {s.estado === "proximamente" && <span className="dato shrink-0 rounded-full bg-manteca px-3 py-1 text-noche">Próximamente</span>}
                    </div>
                    <p className="mt-2 text-hueso/85">
                      {s.direccion}, {s.barrio}, {s.ciudad}
                      {/* TODO(cliente): dirección pendiente de confirmar */}
                      {!s.direccionConfirmada && <span className="dato ml-2 rounded border border-dashed border-hueso/40 px-2 py-0.5 text-hueso/70">{sedesTexto.pendiente}</span>}
                    </p>
                    <dl className="mt-5 grid gap-3 text-[0.95rem] sm:grid-cols-2">
                      <div>
                        <dt className="dato text-hueso/60">Horarios</dt>
                        {/* TODO(cliente): horarios */}
                        <dd className="mt-1">{s.horarios ? s.horarios.map((h) => <span key={h} className="block">{h}</span>) : <span className="text-hueso/70">{sedesTexto.pendiente}</span>}</dd>
                      </div>
                      <div>
                        <dt className="dato text-hueso/60">WhatsApp</dt>
                        {/* TODO(cliente): WhatsApp de la sede */}
                        <dd className="mt-1">{s.whatsapp ? `+${s.whatsapp}` : <span className="text-hueso/70">{sedesTexto.pendiente}</span>}</dd>
                      </div>
                    </dl>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href={linkWhatsApp(`Hola, quiero consultar por ${s.nombre}.`, s.whatsapp ?? contacto.whatsapp)} target="_blank" rel="noopener" className="boton boton-primario">Escribir a la sede</a>
                      {s.mapa && <a href={s.mapa} target="_blank" rel="noopener" className="boton boton-secundario">Cómo llegar</a>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {conMapa && (
          <div className="mt-16 overflow-clip rounded-2xl border border-hueso/20 md:mt-24" data-revelar>
            {/* Embed sin API key; se carga recién al acercarse. TODO(cliente): reemplazar por sedes[].mapa cuando esté */}
            <iframe
              title={`Mapa: ${sedes[0].nombre}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${sedes[0].direccion}, ${sedes[0].barrio}, ${sedes[0].ciudad}`)}&output=embed`}
              className="block h-[60svh] min-h-[22rem] w-full grayscale-[0.35]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </section>
  );
}
