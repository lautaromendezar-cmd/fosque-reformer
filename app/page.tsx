import Pelicula from "@/components/Pelicula";
import Intro from "@/components/Intro";
import ReformerGiro from "@/components/ReformerGiro";
import MetodoTexto from "@/components/MetodoTexto";
import Pilares from "@/components/Pilares";
import Membresias from "@/components/Membresias";
import Sedes from "@/components/Sedes";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import { preload } from "react-dom";
import { imagen, SIZES_PANTALLA_16_9 } from "@/lib/imagenes";

// El inicio: la película y un adelanto de cada sección, con enlace a su página.
export default function Inicio() {
  // La fachada es el LCP en las dos plataformas: se pide antes de que el CSS termine de parsear.
  const fachada = imagen("fachada-nunez-atardecer");
  preload(fachada.src, { as: "image", imageSrcSet: fachada.avif, imageSizes: SIZES_PANTALLA_16_9, fetchPriority: "high" });
  return (
    <>
      <Pelicula />
      <Intro />
      <ReformerGiro conEnlace />
      <MetodoTexto adelanto />
      <Pilares conEnlace />
      <Membresias />
      <Sedes />
      <Contacto />
      <Footer />
    </>
  );
}
