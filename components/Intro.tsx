// Después del sol: el segundo párrafo del subtítulo del PDF, con las mismas palabras.
// Pedido del cliente (14-oct): el salón del sol de fondo repetía el final de la película, el
// párrafo corrido "no tenía magia", la versión en dos columnas "parecía un powerpoint" y la de
// foto entre dos franjas lisas tampoco: todo en una sección con la recepción de fondo.
//
// La foto queda pegada a la pantalla (sticky) mientras el texto pasa por encima. Un velo del
// alto de la sección la oscurece arriba (la frase), la despeja en el medio (se ve la gente) y
// la vuelve a oscurecer abajo (el remate). Sólo CSS: el velo es fijo a la sección y la foto no,
// así que al scrollear la foto "se aclara" y "se cierra" sola.

import { portada } from "@/content/sitio";
import Imagen from "./Imagen";

export default function Intro() {
  const t = portada.bajada2;
  return (
    <section className="escena grano relative overflow-clip text-hueso" data-luz="ambar" aria-label="Fosque Reformer">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="sticky top-0 h-[100svh] overflow-clip">
          <div className="imagen-viva-lienzo absolute inset-0">
            <Imagen
              nombre="recepcion-alumnas-cafe"
              alt=""
              sizes="100vw"
              className="fondo-imagen"
              imgClassName="object-[62%_50%] md:object-center"
            />
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(42_26_12/0.9)_0%,rgb(42_26_12/0.8)_30%,rgb(42_26_12/0.12)_47%,rgb(42_26_12/0.12)_58%,rgb(42_26_12/0.82)_76%,rgb(42_26_12/0.94)_100%)]"
        aria-hidden="true"
      />

      <div className="contenedor relative flex min-h-[100svh] items-center py-[16vh]">
        <p className="titulo max-w-[24ch] text-[clamp(2rem,0.9rem+4vw,4.5rem)] !leading-[1.06]" data-revelar="lineas">
          {t.frase.map((p) => (
            <span key={p.t} className={p.clave ? (p.t.startsWith("experiencia") ? "text-manteca" : "text-hueso") : "text-hueso/50"}>
              {p.t}
            </span>
          ))}
        </p>
      </div>

      {/* el tramo donde la foto queda limpia: la recepción, las alumnas, el café */}
      <div className="h-[55svh] md:h-[70svh]" />

      <div className="contenedor relative pb-[16vh] pt-[10vh] xl:grid xl:grid-cols-12 xl:items-end xl:gap-8 md:pb-[20vh]">
        {/* en el DOM primero el texto chico: termina en "sea" y sigue en el remate */}
        <p className="max-w-[34ch] text-[1.125rem] leading-relaxed text-hueso/90 md:text-[1.1875rem] xl:relative xl:z-10 xl:col-span-4 xl:col-start-9 xl:row-start-1 xl:pb-[0.6rem]" data-revelar data-retraso="0.15">{t.acompanamiento}</p>
        <p className="display mt-6 max-w-[13ch] text-manteca xl:col-span-12 xl:col-start-1 xl:row-start-1 xl:mt-0" data-revelar="lineas">{t.cierre}</p>
      </div>
    </section>
  );
}
