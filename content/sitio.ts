// Contenido general: marca, navegación, CTA, portada y pie.
// Todo el copy vive en content/. Los componentes no tienen texto propio.
// Fuente: "ARCHITECTURE & COPYWRITING WEB B2C" (PDF del 30-sep-2026), tomado como definitivo.
//
// Convenciones:
// - "TODO(cliente)" marca un dato que el cliente todavía no definió (ver PENDIENTES.md).

export const marca = {
  nombre: "Fosque Reformer",
  descripcion:
    "Pilates Moderno sobre el Reformer de Autor Gerardo Fosque. Profesionales que te acompañan semana a semana, en espacios inmersivos de luz cálida.",
  // El PDF nombra fosquereformer.com. TODO(cliente): confirmar el dominio comprado.
  dominio: "https://fosquereformer.com",
  // Base de las URLs absolutas (Open Graph) mientras no haya dominio.
  dominioActual: "https://fosque-reformer.vercel.app",
  ciudad: "Buenos Aires",
};

export const contacto = {
  // TODO(cliente): WhatsApp real. Formato internacional sin "+" ni espacios.
  whatsapp: "5491100000000",
  mensajePrearmado: "Hola, quiero mi Semana de Experiencia en Fosque Reformer.",
  instagram: "https://www.instagram.com/fosquereformer", // TODO(cliente): confirmar usuario
};

// El menú del PDF, en su orden. Franquicias va al final como enlace discreto.
export const navegacion = [
  { href: "/metodo", etiqueta: "El Método Fosque" },
  { href: "/metodo#niveles", etiqueta: "Niveles & Clases" },
  { href: "/experiencia", etiqueta: "Experiencia" },
  { href: "/equipamiento", etiqueta: "Equipamiento" },
  { href: "/sucursales", etiqueta: "Sucursales F" },
  { href: "/membresias", etiqueta: "Membresías F" },
  { href: "/academia", etiqueta: "Academia F" },
  { href: "/profesionales", etiqueta: "Profesionales Fosque" },
] as const;

export const navegacionB2B = { href: "/franquicias", etiqueta: "Franquicias" };

export const cta = {
  principal: "Reclamar mi Semana de Experiencia",
  hero: "Quiero mi Semana de Experiencia",
  corto: "Semana de Experiencia",
  aria: "Reclamar la Semana de Experiencia por WhatsApp",
};

export const portada = {
  antetitulo: "Pilates Moderno · Reformer de Autor",
  titulo: "¿Qué es lo más importante de tu vida?",
  bajada:
    "En Fosque Reformer nos dedicamos a que alcances tu mejor versión mientras disfrutás del movimiento, para que puedas cuidar y vivir plenamente lo que más valorás.",
  // Segundo párrafo del subtítulo del PDF: va en la primera sección después de la película.
  bajada2:
    "Combinamos el nuevo Pilates Moderno con un equipo de profesionales altamente formados y un equipamiento de diseño exclusivo para que vivas una experiencia profundamente motivadora. Cada uno de nuestros Profesionales F se dedica exclusivamente a vos, acompañándote y guiándote semana a semana para que incorporar el hábito del ejercicio sea un placer diario, agradable y divertido.",
};

// Música ambiente del header (nota técnica del PDF). Apagada por defecto: el botón la prende.
// TODO(cliente): elegir un tema chill-out/ambient CON LICENCIA para uso comercial en web,
// dejarlo en public/audio/ y poner acá la ruta (por ejemplo "/audio/ambiente.mp3").
// Mientras sea null, el botón no aparece.
export const musica = {
  src: null as string | null,
  volumen: 0.35,
};

export const sol = {
  // La única línea que entra en el pico de la película (aprobada con la demo).
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
    href: "/franquicias",
  },
  // TODO(cliente): confirmar autorización de los renders y si se acredita al estudio.
  credito: "Renders: Artagaveytia-Mantel Arquitectura",
};
