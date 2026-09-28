// Contenido general del index: marca, navegación, portada, CTA y contacto.
// Todo el copy vive acá. Los componentes no tienen texto propio.
//
// Convenciones:
// - "TODO(cliente)" marca un dato que el cliente todavía no definió.
//   Cada uno está listado en PENDIENTES.md con su ubicación exacta.
// - "PROMESA" marca una frase suavizada respecto del texto original del cliente,
//   para revisar con él antes de publicar.

export const marca = {
  nombre: "Fosque Reformer",
  descripcion:
    "Pilates Reformer boutique en Núñez, Buenos Aires. Reformers de autor, luz cálida y un método en cuatro niveles.",
  // TODO(cliente): dominio definitivo. Se usa para el canonical y el Open Graph.
  dominio: "https://fosquereformer.com.ar",
  // Base actual de las URLs absolutas (Open Graph) mientras no haya dominio.
  // TODO(cliente): cuando exista el dominio, poner acá el mismo valor que `dominio`.
  dominioActual: "https://fosque-reformer.vercel.app",
  ciudad: "Buenos Aires",
};

export const contacto = {
  // TODO(cliente): WhatsApp de la sede. Formato internacional sin "+" ni espacios.
  whatsapp: "5491100000000",
  // Mensaje prearmado que se abre en WhatsApp al tocar el CTA principal.
  // TODO(cliente): ajustar cuando se defina la oferta de entrada exacta.
  mensajePrearmado:
    "Hola, quiero reservar la Semana de Experiencia en Fosque Reformer Núñez.",
  instagram: "https://www.instagram.com/fosquereformer", // TODO(cliente): confirmar usuario
};

// Las cuatro anclas del brief. El id tiene que coincidir con el id de la sección.
export const navegacion = [
  { id: "experiencia", etiqueta: "La experiencia" },
  { id: "niveles", etiqueta: "Los 4 niveles" },
  { id: "metodo", etiqueta: "El método" },
  { id: "sedes", etiqueta: "Sucursales" },
] as const;

export const cta = {
  // TODO(cliente): oferta de entrada exacta (semana sin cargo, postulación o pack de prueba).
  // Mientras tanto queda "Semana de Experiencia", que es lo que dice el brief.
  principal: "Reservá tu Semana de Experiencia",
  corto: "Reservar",
  aria: "Reservar la Semana de Experiencia por WhatsApp",
};

export const portada = {
  antetitulo: "Pilates Reformer boutique · Núñez",
  // Titular fuente: "La evolución de Pilates. La revolución de la fuerza interior."
  titulo: ["La evolución del Pilates.", "La fuerza que nace adentro."],
  // Subtítulo fuente: "Diseño boutique, Reformers de autor y una experiencia profunda y cálida
  // para evolucionar tu cuerpo y tu mente. Sin ataduras, a tu ritmo y con disponibilidad garantizada."
  // PROMESA: "disponibilidad garantizada" → "lugar en tu horario". Revisar con el cliente.
  bajada:
    "Reformers de autor, luz cálida y un método que acompaña. A tu ritmo, sin ataduras y con lugar en tu horario.",
};

export const sol = {
  // La única línea que entra en el pico de la película.
  linea: "Entrás con el día encima. Salís con luz.",
};

export const pie = {
  aviso: "Fosque Reformer. Todos los derechos reservados.",
  links: [
    { href: "/terminos", etiqueta: "Términos y condiciones" },
    { href: "/privacidad", etiqueta: "Políticas de privacidad" },
  ],
  franquicias: {
    etiqueta: "¿Querés abrir una sucursal Fosque?",
    href: "/franquicias", // se construye después; hoy no existe la página
  },
  // Los renders son del estudio de arquitectura. TODO(cliente): confirmar autorización y crédito.
  credito: "Renders: Artagaveytia-Mantel Arquitectura",
};
