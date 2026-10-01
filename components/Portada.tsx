// Portada de página interna: el render a sangre, titular sobredimensionado abajo a la izquierda
// y la ola tricolor de la fachada como borde contra el lino que sigue.

import Imagen from "./Imagen";
import Ola from "./Ola";
import type { NombreImagen } from "@/lib/imagenes";

type Props = {
  antetitulo: string;
  titulo: string;
  imagen: NombreImagen;
  alt: string;
  bajada?: string;
  posicion?: string; // object-position del render
  relleno?: string; // fondo de la sección que sigue: lino (por defecto), un color, o "arco" si es oscura
  children?: React.ReactNode;
};

export default function Portada({ antetitulo, titulo, imagen, alt, bajada, posicion = "center", relleno, children }: Props) {
  return (
    <section className="escena relative isolate flex min-h-[88svh] items-end overflow-clip" data-luz="noche" aria-labelledby="t-portada">
      <div className="absolute inset-0 -z-10 [&_img]:h-full [&_img]:w-full [&_img]:object-cover" style={{ ["--pos" as string]: posicion }}>
        <Imagen nombre={imagen} alt={alt} prioridad sizes="100vw" className="fondo-imagen" imgClassName="[object-position:var(--pos)]" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(28,19,16,0.45)_0%,rgba(28,19,16,0.15)_30%,rgba(28,19,16,0.82)_100%)]" />

      <div className="contenedor pb-[14svh] pt-32 text-hueso md:pb-[16svh]">
        <p className="dato entrada-suave mb-4 text-hueso/90">{antetitulo}</p>
        <h1 id="t-portada" className="display entrada-suave max-w-[14ch] !text-[clamp(2.75rem,1.2rem+6vw,7rem)]">{titulo}</h1>
        {bajada && <p className="entrada-suave mt-6 max-w-[46ch] text-hueso/90" style={{ animationDelay: "0.2s" }}>{bajada}</p>}
        {children}
      </div>

      <Ola className="absolute inset-x-0 -bottom-px" relleno={relleno === "arco" ? "var(--luz-fondo)" : relleno} />
    </section>
  );
}
