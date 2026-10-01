// Footer: el lockup completo una sola vez, el mapa del sitio, legales y el enlace discreto
// a franquicias.

import Link from "next/link";
import { pie, marca, contacto, navegacion } from "@/content/sitio";
import Lockup from "./Lockup";

export default function Footer() {
  return (
    <footer className="escena relative border-t border-hueso/15 bg-noche text-hueso" data-luz="noche">
      <div className="contenedor py-14 md:py-20">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <Lockup className="h-16 w-auto md:col-span-5 md:h-20" />
          <nav aria-label="Mapa del sitio" className="mt-12 md:col-span-6 md:col-start-7 md:mt-0">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[0.95rem]">
              {navegacion.map((n) => (
                <li key={n.href}><Link href={n.href} className="text-hueso/80 underline-offset-4 hover:underline">{n.etiqueta}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.95rem] text-hueso/70">© {new Date().getFullYear()} {pie.aviso}</p>
            <p className="mt-1 text-[0.85rem] text-hueso/75">{pie.credito}</p>
          </div>
          <nav aria-label="Legales y redes">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.95rem]">
              {pie.links.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-hueso/80 underline-offset-4 hover:underline">{l.etiqueta}</Link></li>
              ))}
              <li><a href={contacto.instagram} target="_blank" rel="noopener" className="text-hueso/80 underline-offset-4 hover:underline">Instagram</a></li>
            </ul>
          </nav>
        </div>
        <p className="mt-10 text-[0.9rem] text-hueso/55">
          <Link href={pie.franquicias.href} className="underline-offset-4 hover:underline">{pie.franquicias.etiqueta}</Link>
        </p>
        <span className="oculto-visualmente">{marca.nombre}</span>
      </div>
    </footer>
  );
}
