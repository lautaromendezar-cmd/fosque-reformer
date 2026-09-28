// Footer (brief §8): el lockup completo una sola vez, Términos, Privacidad y el link
// discreto a /franquicias (se construye después).

import { pie, marca, contacto } from "@/content/sitio";
import Lockup from "./Lockup";

export default function Footer() {
  return (
    <footer className="escena relative border-t border-hueso/15" data-luz="noche">
      <div className="contenedor py-14 md:py-20">
        <Lockup className="h-16 w-auto text-hueso md:h-20" />
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.95rem] text-hueso/70">© {new Date().getFullYear()} {pie.aviso}</p>
            <p className="mt-1 text-[0.85rem] text-hueso/75">{pie.credito}</p>
          </div>
          <nav aria-label="Legales y redes">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.95rem]">
              {pie.links.map((l) => (
                <li key={l.href}><a href={l.href} className="text-hueso/80 underline-offset-4 hover:underline">{l.etiqueta}</a></li>
              ))}
              <li><a href={contacto.instagram} target="_blank" rel="noopener" className="text-hueso/80 underline-offset-4 hover:underline">Instagram</a></li>
            </ul>
          </nav>
        </div>
        <p className="mt-10 text-[0.9rem] text-hueso/55">
          <a href={pie.franquicias.href} className="underline-offset-4 hover:underline">{pie.franquicias.etiqueta}</a>
        </p>
        <span className="oculto-visualmente">{marca.nombre}</span>
      </div>
    </footer>
  );
}
