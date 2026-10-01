import type { Metadata } from "next";
import Portada from "@/components/Portada";
import Academia from "@/components/Academia";
import Cierre from "@/components/Cierre";
import Footer from "@/components/Footer";
import { academia } from "@/content/academia";

export const metadata: Metadata = {
  title: "Academia F",
  description: academia.texto,
};

export default function PaginaAcademia() {
  return (
    <>
      <Portada antetitulo={academia.antetitulo} titulo="Excelencia técnica en cada sucursal." imagen="salon-reformer-cielorraso-organico-b" alt="Sala de Reformers con un cielorraso de formas orgánicas en tonos pastel y paneles calados de madera" />
      <Academia />
      <Cierre />
      <Footer />
    </>
  );
}
