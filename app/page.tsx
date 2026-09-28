import Pelicula from "@/components/Pelicula";
import Diferencia from "@/components/Diferencia";
import Niveles from "@/components/Niveles";
import Metodo from "@/components/Metodo";
import Materiales from "@/components/Materiales";
import Membresias from "@/components/Membresias";
import Sedes from "@/components/Sedes";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import { preload } from "react-dom";
import { imagen } from "@/lib/imagenes";

// El index es la película: cada componente es una escena y declara su luz con data-luz.
// El orden es el del brief. Ver DIRECCION-DE-ARTE.md §4 para el guion.
export default function Index() {
  // La fachada es el LCP en las dos plataformas: se pide antes de que el CSS termine de parsear.
  const fachada = imagen("fachada-nunez-dia");
  preload(fachada.src, { as: "image", imageSrcSet: fachada.avif, imageSizes: "100vw", fetchPriority: "high" });
  return (
    <>
      <Pelicula />
      <Diferencia />
      <Niveles />
      <Metodo />
      <Materiales />
      <Membresias />
      <Sedes />
      <Contacto />
      <Footer />
    </>
  );
}
