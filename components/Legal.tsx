import Footer from "./Footer";

export default function Legal({ titulo }: { titulo: string }) {
  return (
    <>
      <section className="escena" data-luz="marron" aria-labelledby="t-legal">
        <div className="contenedor pb-[12vh] pt-[22vh]">
          <h1 id="t-legal" className="h1">{titulo}</h1>
          {/* TODO(cliente): contenido legal. Placeholder visible a propósito. */}
          <p className="mt-8 inline-block rounded-md border border-dashed border-hueso/40 px-4 py-3 text-hueso/80">
            Texto pendiente. El cliente todavía no entregó este contenido.
          </p>
          <p className="mt-10"><a href="/" className="boton boton-secundario">Volver al inicio</a></p>
        </div>
      </section>
      <Footer />
    </>
  );
}
