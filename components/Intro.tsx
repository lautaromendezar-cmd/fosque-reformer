// Después del sol: el segundo párrafo del subtítulo del PDF, con las mismas palabras.
// Pedido del cliente (14-oct): el salón del sol de fondo repetía el final de la película y el
// párrafo corrido "no tenía magia"; la primera versión en dos columnas "parecía un powerpoint".
// Ahora es editorial: la frase en grande con las palabras clave encendidas y los conectores en
// tinta baja, la recepción con gente a sangre y a pantalla completa (parallax), y el remate
// gigante en manteca montado sobre el borde inferior de la foto.

import { portada } from "@/content/sitio";
import Imagen from "./Imagen";

export default function Intro() {
  const t = portada.bajada2;
  return (
    <section className="escena grano relative overflow-clip text-hueso" data-luz="ambar" aria-label="Fosque Reformer">
      <div className="contenedor pt-[16vh] md:pt-[22vh]">
        <p
          className="titulo max-w-[24ch] text-[clamp(2rem,0.9rem+4vw,4.5rem)] !leading-[1.06]"
          data-revelar="lineas"
        >
          {t.frase.map((p) => (
            <span key={p.t} className={p.clave ? (p.t.startsWith("experiencia") ? "text-manteca" : "text-hueso") : "text-hueso/40"}>
              {p.t}
            </span>
          ))}
        </p>
      </div>

      <div className="relative mt-[12vh] md:mt-[16vh]">
        <div className="relative aspect-[4/5] overflow-clip md:aspect-auto md:h-[100svh] md:min-h-[38rem]">
          <Imagen
            nombre="recepcion-alumnas-cafe"
            alt="Recepción de Fosque Reformer: un barista sirve un café en la barra de madera, dos alumnas entran riéndose con sus colchonetas frente al isotipo y un alumno espera sentado"
            sizes="100vw"
            className="fondo-imagen scale-[1.15]"
            imgClassName="object-[62%_50%] md:object-center"
            parallax={12}
          />
          {/* el pie de la foto se funde con el fondo para que el texto encima se lea */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--luz-fondo,#4a2f16)] via-[var(--luz-fondo,#4a2f16)]/50 to-transparent" aria-hidden="true" />
        </div>

        <div className="contenedor relative pb-[14vh] xl:grid xl:grid-cols-12 xl:items-end xl:gap-8 md:pb-[18vh]">
          {/* en el DOM primero el texto chico: termina en "sea" y sigue en el remate */}
          <p className="mt-10 max-w-[34ch] text-[1.125rem] leading-relaxed text-hueso/85 md:text-[1.1875rem] xl:relative xl:z-10 xl:col-span-4 xl:col-start-9 xl:row-start-1 xl:mt-0 xl:pb-[0.6rem]" data-revelar data-retraso="0.15">{t.acompanamiento}</p>
          <p className="display mt-6 max-w-[13ch] text-manteca xl:col-span-12 xl:col-start-1 xl:row-start-1 xl:-mt-[1.15em]" data-revelar="lineas">{t.cierre}</p>
        </div>
      </div>
    </section>
  );
}
