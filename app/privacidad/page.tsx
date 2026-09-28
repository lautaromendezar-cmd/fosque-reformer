// Página vacía a propósito (brief §8): el cliente todavía no entregó el texto legal.
// TODO(cliente): texto de Políticas de Privacidad.
import Legal from "@/components/Legal";

export const metadata = { title: "Políticas de privacidad · Fosque Reformer" };

export default function Privacidad() {
  return <Legal titulo="Políticas de privacidad" />;
}
