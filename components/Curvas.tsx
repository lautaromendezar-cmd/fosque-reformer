// Curvas de nivel: el gesto gráfico de la tapa del manual de marca.
// Se generan una vez (determinístico) como anillos deformados: un solo trazo, 8% de opacidad.

function curvas(semilla = 7, anillos = 11) {
  const paths: string[] = [];
  const rnd = (i: number) => {
    const x = Math.sin(i * 12.9898 + semilla * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  for (let k = 1; k <= anillos; k++) {
    const r = 6 + k * 7.5;
    const puntos: string[] = [];
    const pasos = 72;
    for (let i = 0; i <= pasos; i++) {
      const t = (i / pasos) * Math.PI * 2;
      const def =
        1 +
        0.14 * Math.sin(2 * t + rnd(k) * 6) +
        0.09 * Math.sin(3 * t + rnd(k + 20) * 6) +
        0.05 * Math.sin(5 * t + rnd(k + 40) * 6);
      const x = 62 + Math.cos(t) * r * def * 1.35;
      const y = 50 + Math.sin(t) * r * def * 0.85;
      puntos.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    paths.push(puntos.join("") + "Z");
  }
  return paths;
}

const PATHS = curvas();

export default function Curvas({ className = "" }: { className?: string }) {
  return (
    <div className={`curvas ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {PATHS.map((d, i) => (
          <path key={i} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
    </div>
  );
}
