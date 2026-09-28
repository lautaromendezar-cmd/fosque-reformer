// Sección "Membresías" (brief §5). Cuatro packs mensuales.
//
// TODO(cliente): precios y moneda. El cliente no definió si van en pesos o en dólares.
// Mientras `precio` sea null, el componente muestra el placeholder visible de abajo.

export const membresias = {
  antetitulo: "Membresías",
  titulo: "Elegís cuántas veces por semana. El resto lo ponemos nosotros.",
  aclaracion: "Todos los packs son mensuales y se renuevan solos. Podés cambiar de pack cuando quieras.",
  // TODO(cliente): texto del placeholder mientras no haya precios.
  placeholderPrecio: "Precio a confirmar",
  moneda: null as null | "ARS" | "USD", // TODO(cliente): moneda
  packs: [
    {
      id: "pack-4",
      nombre: "Pack 4",
      frecuencia: "1 vez por semana",
      beneficio: "Las clases se recuperan dentro del mes.",
      precio: null as null | number, // TODO(cliente)
      destacado: true,
      etiqueta: "El más elegido",
    },
    {
      id: "pack-8",
      nombre: "Pack 8",
      frecuencia: "2 veces por semana",
      beneficio: "10% de ahorro por clase.",
      precio: null as null | number, // TODO(cliente)
      destacado: false,
    },
    {
      id: "pack-12",
      nombre: "Pack 12",
      frecuencia: "3 veces por semana",
      beneficio: "20% de ahorro por clase.",
      precio: null as null | number, // TODO(cliente)
      destacado: false,
    },
    {
      id: "pack-16",
      nombre: "Pack 16",
      frecuencia: "Pase intensivo",
      beneficio: "Máximo rendimiento, para quienes ya entrenan en serio.",
      precio: null as null | number, // TODO(cliente)
      destacado: false,
    },
  ],
};
