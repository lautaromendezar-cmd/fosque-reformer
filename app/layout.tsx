import type { Metadata, Viewport } from "next";
import { Baloo_Bhaijaan_2, Figtree } from "next/font/google";
import "./globals.css";
import { marca } from "@/content/sitio";
import Header from "@/components/Header";
import BotonWhatsApp from "@/components/BotonWhatsApp";
import Motor from "@/components/Motor";

// Baloo Bhaijaan 2 es la tipografía del manual de marca: sólo titulares y display.
const baloo = Baloo_Bhaijaan_2({
  subsets: ["latin"],
  weight: ["700", "800"],
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
  metadataBase: new URL(marca.dominio), // TODO(cliente): dominio definitivo en content/sitio.ts
  title: `${marca.nombre} · Pilates Reformer boutique en Núñez`,
  description: marca.descripcion,
  openGraph: {
    title: marca.nombre,
    description: marca.descripcion,
    locale: "es_AR",
    type: "website",
    images: [{ url: "/img/salon-reformer-sol-frontal-1600.webp", width: 1600, height: 893 }],
  },
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
    <html lang="es-AR" className={`${baloo.variable} ${figtree.variable}`}>
      <body>
        <a href="#contenido" className="salto">Ir al contenido</a>
        <Header />
        <main id="contenido">{children}</main>
        <BotonWhatsApp />
        <Motor />
      </body>
    </html>
  );
}
