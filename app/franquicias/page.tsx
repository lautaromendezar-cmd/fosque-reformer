import type { Metadata } from "next";
import Portada from "@/components/Portada";
import Franquicias from "@/components/Franquicias";
import Footer from "@/components/Footer";
import { franquicias } from "@/content/academia";

export const metadata: Metadata = {
  title: "Franquicias",
  description: franquicias.bajada,
};

// Landing pre-franquicias (portal B2B): sin el cierre de la Semana de Experiencia.
export default function PaginaFranquicias() {
  return (
    <>
      <Portada antetitulo={franquicias.antetitulo} titulo={franquicias.titulo} bajada={franquicias.bajada} imagen="salon-reformer-domo-general" alt="Salón de Reformers con cielorraso en domo, paneles de madera y luz ámbar" />
      <Franquicias />
      <Footer />
    </>
  );
}
