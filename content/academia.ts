// /academia (PDF §9) y /franquicias (PDF §10).

export const academia = {
  antetitulo: "Academia F",
  titulo: "Formación Continua y Estándares de Red",
  texto:
    "La garantía de calidad Fosque se construye en Academia F: el centro de capacitación permanente que asegura el estándar de excelencia en cada sucursal de la red.",
  programas: [
    {
      sigla: "CANE",
      titulo: "Capacitación, Actualización, Nivelación y Entrenamiento",
      texto: "Entrenamiento interno continuo para todos los Profes Fosque.",
    },
    {
      sigla: "FE",
      titulo: "Programa de Formación Ejecutiva",
      texto: "Capacitación especializada para Coordinadoras Comerciales, de Servicio y Ejecutivas Fosque en atención al cliente y gestión humana.",
    },
  ],
};

export const franquicias = {
  antetitulo: "Franquicias Fosque Reformer",
  // TODO(cliente): "N° 1 de Latinoamérica" y "24 años de trayectoria" los tiene que poder respaldar.
  titulo: "Sé parte de la red de Pilates Reformer N° 1 de Latinoamérica",
  bajada:
    "Unite al ecosistema asociativo de la Nueva Era. Un modelo de inversión inteligente al costo operativo, respaldado por 24 años de trayectoria, diseño industrial de autor y un sistema de Co-Propiedad que democratiza la prosperidad.",
  puntos: [
    { titulo: "Importación al Costo Directo", texto: "Equipamiento directo de fábrica sin sobreprecios de intermediarios." },
    { titulo: "Co-Propiedad del Staff (Vesting)", texto: "Retención del mejor talento técnico compartiendo hasta el 50% de participación." },
    { titulo: "Salas Optimizadas de 20 Reformers", texto: "Alta rentabilidad por metro cuadrado en locales boutique de 160 a 220 m²." },
  ],
  cta: "Conocer el modelo y solicitar dossier de inversión",
  // TODO(cliente): la "plataforma de expansión B2B" no existe todavía. Mientras tanto, WhatsApp.
  ctaHref: null as string | null,
  mensaje: "Hola, quiero conocer el modelo de franquicias de Fosque Reformer y solicitar el dossier de inversión.",
};
