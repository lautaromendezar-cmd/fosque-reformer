import type { Metadata } from "next";
import Portada from "@/components/Portada";
import Profesionales from "@/components/Profesionales";
import Cierre from "@/components/Cierre";
import Footer from "@/components/Footer";
import { profesionales } from "@/content/experiencia";

export const metadata: Metadata = {
  title: "Profesionales Fosque",
  description: profesionales.cita,
};

export default function PaginaProfesionales() {
  return (
    <>
      <Portada antetitulo={profesionales.antetitulo} titulo="Un equipo enfocado en acompañarte." imagen="lounge-lockers-mural" alt="Lounge con sillones blancos, un mural de colores y una pared de lockers iluminados" />
      <Profesionales />
      <Cierre />
      <Footer />
    </>
  );
}
