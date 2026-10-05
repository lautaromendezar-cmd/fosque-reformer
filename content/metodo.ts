// /metodo: El Método Fosque, Niveles & Evolución y Fosque Niños (PDF §3).

export const metodo = {
  antetitulo: "El Método Fosque",
  cita: "Ni un esfuerzo de más, ni un esfuerzo de menos: cada movimiento te da resultados.",
  texto:
    "El Método Fosque te garantiza una adaptación precisa a tus necesidades físicas, tu nivel de energía y el logro de tus objetivos mejorando en cada sesión. Te guiamos para alcanzar resultados rápidos, efectivos y sustentables en el tiempo, sin sobreexigencias. Es una nueva dimensión del movimiento: pasarla bien, disfrutar el proceso y transformar tu calidad de vida.",
  // Versión corta para el adelanto del inicio.
  resumen:
    "Una adaptación precisa a tus necesidades físicas, tu nivel de energía y tus objetivos, mejorando en cada sesión. Resultados rápidos, efectivos y sustentables, sin sobreexigencias.",
};

export const niveles = {
  antetitulo: "Niveles & Evolución",
  titulo: "Evolucioná a tu propio ritmo.",
  cita: "Evolucioná a tu propio ritmo con sesiones diseñadas para que moverte y pasarla bien sean un verdadero placer.",
  items: [
    {
      numero: 1,
      nombre: "Inicia",
      foco: "Autoterapia, movilidad, respiración y postura.",
      texto: "La puerta de entrada para reconectar con tu eje, liberar tensiones y adaptar tu cuerpo con suavidad y precisión.",
    },
    {
      numero: 2,
      nombre: "Intermedia",
      foco: "Fuerza, tono muscular y coordinación.",
      texto: "Diseñado para quienes ya incorporaron el método y buscan desafiar su resistencia y energía vital.",
    },
    {
      numero: 3,
      nombre: "Avanzada",
      foco: "Alta intensidad, fluidez y control.",
      texto: "Secuencias dinámicas para exigir la técnica al máximo y potenciar la fuerza de centro (Powerhouse).",
    },
    {
      numero: 4,
      nombre: "Master",
      sello: "Fosque Signature",
      foco: "Contrología moderna y potencia.",
      texto: "La máxima expresión del Método Fosque: desafíos de concentración, destreza física, fuerza máxima y ejercicios que conectan cuerpo y mente.",
    },
  ],
};

export const ninos = {
  antetitulo: "Próximamente",
  titulo: "Fosque Niños",
  // El PDF reserva el espacio para los renders de la línea infantil y no trae texto:
  // con null se muestran sólo el título y las imágenes.
  texto: null as string | null,
  imagenes: [
    { imagen: "estanteria-arbol-tallado", alt: "Estantería de madera tallada con forma de árbol, con accesorios ordenados" },
  ],
};
