// El isotipo (óvalo FR), inline para heredar el color del texto.
// Los paths salen del manual de marca (vectores, no redibujados): lib/marca.generado.ts
import { isotipo } from "@/lib/marca.generado";

export default function Isotipo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={isotipo.viewBox} className={className} fill="currentColor" aria-hidden="true" focusable="false"
      dangerouslySetInnerHTML={{ __html: isotipo.paths }} />
  );
}
