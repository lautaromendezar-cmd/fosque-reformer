// Una foto que respira: acercamiento lento de cámara (Ken Burns) en CSS, sólo transform.
// Para las secciones claras, donde un video oscurecido de fondo no deja leer el texto oscuro.
// Con prefers-reduced-motion queda quieta (la regla global corta las animaciones).

import Imagen from "./Imagen";
import type { NombreImagen } from "@/lib/imagenes";

type Props = {
  nombre: NombreImagen;
  alt: string;
  className?: string; // proporción y ubicación de la caja (aspect-*, col-span-*)
  posicion?: string;  // object-position
  sizes?: string;
};

export default function ImagenViva({ nombre, alt, className = "", posicion = "center", sizes = "100vw" }: Props) {
  return (
    <figure className={`imagen-viva relative overflow-clip ${className}`} data-revelar>
      <div className="imagen-viva-lienzo absolute inset-0" style={{ ["--pos" as string]: posicion }}>
        <Imagen nombre={nombre} alt={alt} sizes={sizes} className="fondo-imagen" imgClassName="[object-position:var(--pos)]" />
      </div>
    </figure>
  );
}
