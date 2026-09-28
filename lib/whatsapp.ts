import { contacto } from "@/content/sitio";

/** Link a WhatsApp con mensaje prearmado. Si se pasa un número, lo usa; si no, el general. */
export function linkWhatsApp(mensaje: string = contacto.mensajePrearmado, numero: string = contacto.whatsapp) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
