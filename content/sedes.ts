// Sección "Sucursales" (brief §6).
//
// Para sumar una sede: agregar un objeto a `sedes`. No hay que tocar ningún componente.
// El buscador filtra por `nombre`, `barrio`, `ciudad` y `direccion`.
// Si `whatsapp` es null, el botón de la sede usa el WhatsApp general de content/sitio.ts.

export type Sede = {
  id: string;
  nombre: string;
  barrio: string;
  ciudad: string;
  direccion: string;
  direccionConfirmada: boolean;
  horarios: string[] | null;
  whatsapp: string | null;
  mapa: string | null; // URL de Google Maps (o null)
  estado: "abierta" | "proximamente";
};

export const sedesTexto = {
  antetitulo: "Sucursales F",
  titulo: "Encontrá tu Sucursal F",
  texto: "La primera sede abre en Núñez, Buenos Aires. Las que siguen van a aparecer acá.",
  buscador: {
    etiqueta: "Buscá por barrio o ciudad",
    placeholder: "Núñez, Palermo, Rosario…",
    sinResultados: "Todavía no hay una sede ahí. Escribinos y te avisamos cuando abra.",
  },
  pendiente: "A confirmar",
};

export const sedes: Sede[] = [
  {
    id: "nunez",
    nombre: "Fosque Reformer Núñez",
    barrio: "Núñez",
    ciudad: "Buenos Aires",
    // TODO(cliente): dirección pendiente de confirmar. Sale del manual de arquitectura
    // (página de fachadas). Cuando el cliente confirme, poner direccionConfirmada: true.
    direccion: "11 de Septiembre 3635",
    direccionConfirmada: false,
    horarios: null, // TODO(cliente): horarios de la sede
    whatsapp: null, // TODO(cliente): WhatsApp de la sede
    mapa: null, // TODO(cliente): link de Google Maps
    estado: "proximamente",
  },
];
