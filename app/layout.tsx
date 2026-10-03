import type { Metadata, Viewport } from "next";
import { Baloo_Bhaijaan_2, Figtree } from "next/font/google";
import "./globals.css";
import { marca } from "@/content/sitio";
import Header from "@/components/Header";
import BotonWhatsApp from "@/components/BotonWhatsApp";
import Motor from "@/components/Motor";
import Precarga from "@/components/Precarga";

// Baloo Bhaijaan 2 es la tipografía del manual de marca: sólo titulares y display.
const baloo = Baloo_Bhaijaan_2({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-baloo",
  display: "swap",
});

// Figtree en cuerpo, datos e interfaz (plan B aprobado: ver DIRECCION-DE-ARTE.md §2).
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  // Las URLs absolutas del Open Graph salen de acá. Hasta que haya dominio, la de Vercel:
  // WhatsApp pide la imagen a esta base. TODO(cliente): pasar a marca.dominio al publicar.
  metadataBase: new URL(marca.dominioActual),
  title: { default: `${marca.nombre} · Pilates Moderno en Núñez`, template: `%s · ${marca.nombre}` },
  description: marca.descripcion,
  openGraph: {
    title: marca.nombre,
    description: marca.descripcion,
    locale: "es_AR",
    type: "website",
    images: [{ url: "/og.jpg?v=2", width: 1200, height: 630, type: "image/jpeg", alt: "Fosque Reformer: sala con dos filas de Reformers negros y el sol al fondo" }],
  },
  twitter: { card: "summary_large_image", title: marca.nombre, description: marca.descripcion, images: ["/og.jpg?v=2"] }, // ?v=: WhatsApp guarda la vista previa por URL
  // El dominio no está definido y el sitio todavía no se publica: no indexar hasta el go-live.
  robots: { index: false, follow: false }, // TODO(cliente): sacar al publicar en el dominio final
};

export const viewport: Viewport = {
  themeColor: "#71564b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${baloo.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        {/* Activa el preloader antes del primer pintado. El respaldo lo saca solo a los 15 s si el
            JS no corre; Precarga.tsx lo cancela. Inline y sin type=module: siempre corre. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('precargando');window.__precargaRespaldo=setTimeout(function(){document.documentElement.classList.remove('precargando')},15000);",
          }}
        />
      </head>
      <body>
        <Precarga />
        <a href="#contenido" className="salto">Ir al contenido</a>
        <Header />
        <main id="contenido">{children}</main>
        <BotonWhatsApp />
        <Motor />
      </body>
    </html>
  );
}
