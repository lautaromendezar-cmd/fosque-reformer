// Sección "Contacto" (brief §7). El botón fijo de WhatsApp vive en content/sitio.ts.

export const contactoTexto = {
  antetitulo: "Contacto",
  titulo: "¿Hablamos?",
  texto: "Lo más rápido es WhatsApp. Si preferís, dejanos tus datos y te escribimos nosotros.",
  formulario: {
    nombre: "Nombre",
    telefono: "WhatsApp o teléfono",
    mensaje: "Contanos qué estás buscando",
    enviar: "Enviar por WhatsApp",
    // El formulario no tiene backend: arma un mensaje y abre WhatsApp con los datos.
    // Así no hay un endpoint que dependa de un servicio de mail sin configurar.
  },
};
