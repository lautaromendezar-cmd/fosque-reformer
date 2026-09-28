// Sección "La diferencia Fosque" (brief §2) y "El método" (brief §4).

export const diferencia = {
  antetitulo: "La diferencia Fosque",
  titulo: "Tres cosas que se sienten desde la primera clase.",
  argumentos: [
    {
      numero: "01",
      titulo: "Lugar en tu horario",
      // Fuente: "Disponibilidad real. Salas con 20 Reformers pensadas para que siempre haya
      // lugar en el horario que la persona elija."
      // PROMESA: se evita "garantizada" y "siempre". Revisar con el cliente.
      texto:
        "Salas con 20 Reformers, pensadas para que haya lugar en el horario que elegís. Sin listas de espera eternas ni clases a las corridas.",
    },
    {
      numero: "02",
      titulo: "Un entorno que baja el ruido",
      // Fuente: "Luz cálida a 2700K, aromaterapia propia y acústica Hi-Fi."
      texto:
        "Luz cálida a 2700K, aromaterapia propia y acústica Hi-Fi. Entrás con el estrés del día encima y salís con otra energía.",
    },
    {
      numero: "03",
      titulo: "El esfuerzo justo",
      // Fuente: "Metodología progresiva de 4 niveles que adapta cada sesión al estado físico
      // y a la energía de cada persona." El original decía "sin riesgo de lesiones".
      // PROMESA: "sin riesgo de lesiones" → "una progresión cuidada, acompañada". Revisar con el cliente.
      texto:
        "Cuatro niveles progresivos que adaptan cada sesión a cómo llegás ese día. Una progresión cuidada, acompañada, que no te pide ni de más ni de menos.",
    },
  ],
};

export const metodo = {
  antetitulo: "El método",
  titulo: "Un Reformer diseñado acá, para entrenar así.",
  parrafos: [
    "Los Reformers de Fosque no se compran hechos: los diseña Gerardo Fosque, con 24 años de trayectoria en diseño industrial. Cada medida, cada resorte y cada apoyo están pensados para el método que se practica en la sala.",
    "Por eso la clase se arma al revés de lo habitual. No es la persona la que se adapta a la máquina: es la máquina la que fue hecha para acompañar una progresión de cuatro niveles, de la corrección postural a la potencia.",
  ],
  datos: [
    { valor: "24", etiqueta: "años de diseño industrial" },
    { valor: "20", etiqueta: "Reformers por sala" },
    { valor: "4", etiqueta: "niveles progresivos" },
  ],
  materiales: {
    antetitulo: "Lo que se toca",
    titulo: "Madera clara, piedra y agua.",
    texto:
      "El estudio está pensado por Artagaveytia-Mantel como un lugar donde el tiempo se desacelera. Cielorrasos que devuelven la luz como agua, madera tallada, piedra clara y un vestuario que huele a calma.",
    // Detalles chicos, desplazados: los "planos cercanos" que pide el manual de marca.
    detalles: [
      { imagen: "estanteria-arbol-tallado", alt: "Estantería tallada en madera clara con forma de árbol, con accesorios de pilates ordenados" },
      { imagen: "vestuario-duchas-mural-agua", alt: "Vestuario con paredes de piedra clara y mural con vetas verde agua" },
      { imagen: "salon-reformer-cielorraso-organico-a", alt: "Sala de Reformers con un cielorraso de formas orgánicas en tonos pastel" },
      { imagen: "estanteria-discos-madera", alt: "Estantería de discos de madera con toallas y accesorios" },
    ],
  },
};
