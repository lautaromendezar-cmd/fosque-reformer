import type { Metadata } from "next";
import Portada from "@/components/Portada";
import Membresias from "@/components/Membresias";
import Cierre from "@/components/Cierre";
import Footer from "@/components/Footer";
import { membresias } from "@/content/membresias";

export const metadata: Metadata = {
  title: "Membresías F",
  description: `${membresias.garantia.titulo}: ${membresias.garantia.texto}`,
};

export default function PaginaMembresias() {
  return (
    <>
      <Portada antetitulo={membresias.antetitulo} titulo="Tus clases nunca se pierden." imagen="lounge-onda-cobre" alt="Lounge con un panel ondulado color cobre, barra con banquetas y un mural de vegetación" />
      <Membresias />
      <Cierre />
      <Footer />
    </>
  );
}
