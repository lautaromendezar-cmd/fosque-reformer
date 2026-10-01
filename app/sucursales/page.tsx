import type { Metadata } from "next";
import Portada from "@/components/Portada";
import Sedes from "@/components/Sedes";
import Cierre from "@/components/Cierre";
import Footer from "@/components/Footer";
import { sedesTexto } from "@/content/sedes";

export const metadata: Metadata = {
  title: "Sucursales F",
  description: sedesTexto.texto,
};

export default function PaginaSucursales() {
  return (
    <>
      <Portada antetitulo={sedesTexto.antetitulo} titulo="Núñez, Buenos Aires." imagen="fachada-nunez-atardecer" alt="Fachada blanca de Fosque Reformer en Núñez, con franjas onduladas magenta, coral y naranja y la entrada en arco iluminada" relleno="arco" />
      <Sedes conMapa />
      <Cierre />
      <Footer />
    </>
  );
}
