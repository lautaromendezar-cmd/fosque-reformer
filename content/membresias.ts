// /membresias (PDF §8): Smart Pricing, en dólares, bajo la Garantía de Disponibilidad.
// El PDF los llama "valor sugerido". TODO(cliente): confirmar que son los precios a publicar.

export const membresias = {
  antetitulo: "Membresías F",
  titulo: "Inversión Transparente",
  garantia: {
    titulo: "Garantía de Disponibilidad",
    texto: "Tus clases nunca se pierden dentro del mes.",
  },
  moneda: "USD" as const,
  packs: [
    {
      id: "pack-4",
      nombre: "Pack 4",
      frecuencia: "1 vez por semana",
      precio: 40,
      beneficio: "Ideal para iniciar. Administrás tus sesiones en el mes con flexibilidad total.",
      recomendado: false,
    },
    {
      id: "pack-8",
      nombre: "Pack 8",
      frecuencia: "2 veces por semana",
      precio: 72,
      beneficio: "Constancia ideal para sostener tu bienestar durante todo el año.",
      recomendado: true,
    },
    {
      id: "pack-12",
      nombre: "Pack 12",
      frecuencia: "3 veces por semana",
      precio: 99,
      beneficio: "Disciplina y transformación rápida. Disfrutá de semanas plenas de energía.",
      recomendado: false,
    },
    {
      id: "pack-16",
      nombre: "Pack 16",
      frecuencia: "Pase Intensivo",
      precio: 119,
      beneficio: "Un estilo de vida. Para quienes buscan resultados óptimos y máximo rendimiento.",
      recomendado: false,
    },
  ],
};
