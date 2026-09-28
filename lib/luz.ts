// El arco de luz de la película: fondo y tinta de cada escena.
// Motor.tsx interpola entre escenas consecutivas al scrollear.
// Ver DIRECCION-DE-ARTE.md §4.

export type Luz = { fondo: string; tinta: string; clara?: boolean };

export const luces = {
  dia: { fondo: "#243033", tinta: "#efe7dd" },          // portada: día frío
  dorado: { fondo: "#3a2410", tinta: "#efe7dd" },       // corredor / sol
  ambar: { fondo: "#4a2f16", tinta: "#efe7dd" },        // la diferencia
  tibio: { fondo: "#5a4030", tinta: "#efe7dd" },        // niveles
  marron: { fondo: "#71564b", tinta: "#efe7dd" },       // método / sedes
  agua: { fondo: "#2f3f3d", tinta: "#efe7dd" },         // materiales
  arena: { fondo: "#c5ac94", tinta: "#1c1310", clara: true }, // membresías
  noche: { fondo: "#1c1310", tinta: "#efe7dd" },        // contacto / footer
} satisfies Record<string, Luz>;

export type NombreLuz = keyof typeof luces;
