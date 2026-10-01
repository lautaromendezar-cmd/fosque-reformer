import type { Metadata } from "next";
import Portada from "@/components/Portada";
import ReformerGiro from "@/components/ReformerGiro";
import Puntos from "@/components/Puntos";
import Galeria from "@/components/Galeria";
import Cierre from "@/components/Cierre";
import Footer from "@/components/Footer";
import { equipamiento } from "@/content/equipamiento";

export const metadata: Metadata = {
  title: "Equipamiento & Espacios",
  description: equipamiento.puntos[2].texto,
};

export default function PaginaEquipamiento() {
  return (
    <>
      <Portada antetitulo="Equipo F Reformer" titulo="Espacios inmersivos de autor." imagen="salon-sol-reformers-negros" alt="Sala con dos filas de Reformers negros Fosque, cielorraso que refleja la luz como agua y un gran disco de luz al fondo" posicion="64% 50%" />
      <ReformerGiro />
      <Puntos />
      <Galeria />
      <Cierre />
      <Footer />
    </>
  );
}
