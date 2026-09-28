// Página vacía a propósito (brief §8): el cliente todavía no entregó el texto legal.
// TODO(cliente): texto de Términos y Condiciones.
import Legal from "@/components/Legal";

export const metadata = { title: "Términos y condiciones · Fosque Reformer" };

export default function Terminos() {
  return <Legal titulo="Términos y condiciones" />;
}
