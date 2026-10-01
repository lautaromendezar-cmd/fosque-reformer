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
      <Portada antetitulo={metodo.antetitulo} titulo="Cada movimiento te da resultados." imagen="corredor-arcos-luz" alt="Pasillo de arcos iluminados con un árbol a la derecha y piso de piedra clara" posicion="50% 60%" />
      <MetodoTexto />
      <Niveles />
      <Ninos />
      <Cierre />
      <Footer />
    </>
  );
}
