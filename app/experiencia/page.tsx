import type { Metadata } from "next";
import Portada from "@/components/Portada";
import Pilares from "@/components/Pilares";
import Cierre from "@/components/Cierre";
import Footer from "@/components/Footer";
import { experiencia } from "@/content/experiencia";

export const metadata: Metadata = {
  title: "Experiencia F",
  description: experiencia.pilares.map((p) => p.titulo).join(" · "),
};

export default function PaginaExperiencia() {
  return (
    <>
      <Portada antetitulo={experiencia.antetitulo} titulo="Te recibimos siempre con una sonrisa." imagen="recepcion-cafe-vegetacion" alt="Recepción con barra de café de madera, banquetas verdes y un mural de vegetación translúcida" relleno="arco" />
      <Pilares />
      <Cierre />
      <Footer />
    </>
  );
}
