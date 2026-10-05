// /equipamiento (PDF §6): el Reformer de Autor y los espacios.

import type { NombreImagen } from "@/lib/imagenes";

export const equipamiento = {
  antetitulo: "Equipamiento & Espacios",
  // El cliente lo quiere más chico y con "Gerardo Fosque" como una firma suya.
  titulo: "Reformer de Autor",
  firma: "Gerardo Fosque",
  // Fotos reales del Reformer ambientadas con IA en una sala como la del manual de arquitectura.
  fotos: [
    { imagen: "reformer-sala-tres-cuartos", alt: "Reformer de Autor Fosque en negro en una sala con zócalo de madera ondulado, cielorraso de formas orgánicas en pasteles y plantas", posicion: "" },
    { imagen: "reformer-sala-cajon", alt: "El Reformer de costado con el cajón de sentado, en la misma sala con madera, cortinas y plantas", posicion: "" },
    { imagen: "reformer-sala-detalle", alt: "Detalle del carro tapizado, los apoyos de hombros y la barra de pies del Reformer, con la sala desenfocada detrás", posicion: "" },
  ] as { imagen: NombreImagen; alt: string; posicion: string }[],
  puntos: [
    {
      titulo: "Espacios inmersivos de autor",
      texto: "Disfrutá de una nueva experiencia donde cada momento y cada movimiento se vuelven mágicos.",
    },
    {
      titulo: "Salas boutique de alta exclusividad",
      texto: "Equipadas con entre 10 y 25 Reformers de diseño exclusivo.",
    },
    {
      titulo: "Confort y Ergonomía",
      texto: "El diseño original de Fosque Reformer combina suavidad, biomecánica de precisión y confort superior, convirtiendo cada movimiento en una sensación de bienestar mientras genera resultados visibles en cada ejercicio.",
    },
    {
      titulo: "Atmósfera Sensorial",
      texto: "Espacios inmersivos con iluminación cálida indirecta (2700K), acústica de alta fidelidad y aromaterapia Signature para que cada sesión sea tu refugio diario de desconexión y renovación.",
    },
  ],
  // Las tres palabras de "Confort y Ergonomía" que entran mientras el Reformer gira.
  marcas: ["Suavidad", "Biomecánica de precisión", "Confort superior"],
  galeria: [
    { imagen: "salon-sol-reformers-negros", alt: "Sala con dos filas de Reformers negros Fosque y un gran disco de luz al fondo" },
    { imagen: "salon-reformer-cielorraso-organico-a", alt: "Sala de Reformers con un cielorraso de formas orgánicas en tonos pastel" },
    { imagen: "lounge-onda-cobre", alt: "Lounge con un panel ondulado color cobre, barra con banquetas y un mural de vegetación" },
    { imagen: "vestuario-bachas-mural-agua", alt: "Vestuario con bachas de piedra, espejos con marco de madera y un mural con vetas verde agua" },
    { imagen: "corredor-hojas-arbol", alt: "Pasillo con paneles de madera, hojas de colores en las paredes, un árbol y arcos de luz al fondo" },
  ],
};
