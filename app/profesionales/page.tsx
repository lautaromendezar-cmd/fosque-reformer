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
      <Portada antetitulo={profesionales.antetitulo} titulo="Un equipo enfocado en acompañarte." imagen="salon-sol-instructora-alumna" alt="Una instructora Fosque arrodillada junto a un Reformer se ríe con una alumna mientras la acompaña en el ejercicio, en la sala del sol" />
      <Profesionales />
      <Cierre />
      <Footer />
    </>
  );
}
