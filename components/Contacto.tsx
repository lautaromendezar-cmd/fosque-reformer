"use client";

// Contacto (brief §7). Formulario simple opcional: arma un mensaje y abre WhatsApp.
// No hay backend ni servicio de mail que configurar.

import { useState } from "react";
import { contactoTexto } from "@/content/contacto";
import { linkWhatsApp } from "@/lib/whatsapp";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const f = contactoTexto.formulario;

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = `Hola, soy ${nombre || "…"}${telefono ? ` (${telefono})` : ""}. ${mensaje || "Quiero saber más de Fosque Reformer."}`;
    window.open(linkWhatsApp(texto), "_blank", "noopener");
  };

  const campo = "mt-2 w-full rounded-xl border border-hueso/30 bg-hueso/5 px-4 py-3 text-hueso placeholder:text-hueso/40";

  return (
    <section id="contacto" className="escena relative" data-luz="noche" aria-labelledby="t-contacto">
      <div className="contenedor py-[16vh] md:py-[20vh]">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="dato mb-5 text-manteca" data-revelar>{contactoTexto.antetitulo}</p>
            <h2 id="t-contacto" className="h1 !text-[clamp(3rem,1.5rem+5.5vw,6rem)]" data-revelar="lineas">{contactoTexto.titulo}</h2>
            <p className="mt-6 max-w-[34ch] text-hueso/80" data-revelar>{contactoTexto.texto}</p>
            <a href={linkWhatsApp()} target="_blank" rel="noopener" className="boton boton-primario mt-8" data-revelar>Abrir WhatsApp</a>
          </div>

          <form onSubmit={enviar} className="mt-12 md:col-span-6 md:col-start-7 md:mt-0" data-revelar>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-nombre" className="dato text-hueso/70">{f.nombre}</label>
                <input id="c-nombre" name="nombre" autoComplete="name" value={nombre} onChange={(e) => setNombre(e.target.value)} className={campo} required />
              </div>
              <div>
                <label htmlFor="c-telefono" className="dato text-hueso/70">{f.telefono}</label>
                <input id="c-telefono" name="telefono" type="tel" autoComplete="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} className={campo} />
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="c-mensaje" className="dato text-hueso/70">{f.mensaje}</label>
              <textarea id="c-mensaje" name="mensaje" rows={4} value={mensaje} onChange={(e) => setMensaje(e.target.value)} className={campo} />
            </div>
            <button type="submit" className="boton boton-secundario mt-6">{f.enviar}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
