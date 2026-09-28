// El lockup completo (isotipo + FOSQUE REFORMER). Una sola vez en todo el sitio: el footer.
import { lockup } from "@/lib/marca.generado";

export default function Lockup({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={lockup.viewBox} className={className} fill="currentColor" role="img" aria-label="Fosque Reformer"
      dangerouslySetInnerHTML={{ __html: lockup.paths }} />
  );
}
