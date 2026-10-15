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
      <Portada antetitulo={academia.antetitulo} titulo="Excelencia técnica en cada sucursal." imagen="equipo-salon-palmeras" alt="El equipo de instructores Fosque abrazado y sonriendo en la sala de palmeras, entre Reformers negros" posicion="50% 42%" />
      <Academia />
      <Cierre />
      <Footer />
    </>
  );
}
