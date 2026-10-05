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
      <Portada antetitulo={experiencia.antetitulo} titulo="Te recibimos siempre con una sonrisa." imagen="recepcion-sabri-sonrisa" alt="Una profesora Fosque con remera blanca sonríe en la recepción, con la barra de madera, el muro de vegetación translúcida y los molinetes detrás" posicion="62% 50%" />
      <Pilares />
      <Cierre />
      <Footer />
    </>
  );
}
