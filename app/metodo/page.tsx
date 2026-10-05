import type { Metadata } from "next";
import Portada from "@/components/Portada";
import MetodoTexto from "@/components/MetodoTexto";
import Niveles from "@/components/Niveles";
import Ninos from "@/components/Ninos";
import Cierre from "@/components/Cierre";
import Footer from "@/components/Footer";
import { metodo } from "@/content/metodo";

export const metadata: Metadata = {
  title: "El Método Fosque · Niveles & Clases",
  description: metodo.resumen,
};

export default function PaginaMetodo() {
  return (
    <>
      <Portada antetitulo={metodo.antetitulo} titulo="Cada movimiento te da resultados." imagen="salon-palmeras-en-uso" alt="Tres alumnas entrenando en Reformers negros Fosque frente a un muro translúcido de palmeras iluminado, con paneles de madera calada y cielorraso de agua" posicion="50% 55%" />
      <MetodoTexto />
      <Niveles />
      <Ninos />
      <Cierre />
      <Footer />
    </>
  );
}
