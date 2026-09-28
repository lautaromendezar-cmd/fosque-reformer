// <picture> con AVIF + WebP en varios tamaños y blur placeholder de fondo.
// Los renders son los protagonistas: se cargan por prioridad con `prioridad`.

import { imagen, type NombreImagen } from "@/lib/imagenes";

type Props = {
  nombre: NombreImagen;
  alt: string;
  sizes?: string;
  prioridad?: boolean;
  className?: string;
  imgClassName?: string;
  parallax?: number;
};

export default function Imagen({ nombre, alt, sizes = "100vw", prioridad = false, className = "", imgClassName = "", parallax }: Props) {
  const im = imagen(nombre);
  return (
    <picture
      className={className}
      style={{ backgroundImage: `url(${im.blur})`, backgroundSize: "cover", backgroundPosition: "center" }}
      data-parallax={parallax}
    >
      <source type="image/avif" srcSet={im.avif} sizes={sizes} />
      <source type="image/webp" srcSet={im.webp} sizes={sizes} />
      <img
        src={im.src}
        width={im.width}
        height={im.height}
        alt={alt}
        loading={prioridad ? "eager" : "lazy"}
        decoding={prioridad ? "sync" : "async"}
        fetchPriority={prioridad ? "high" : "auto"}
        className={imgClassName}
      />
    </picture>
  );
}
