// Las franjas onduladas de la fachada de Núñez (magenta, coral, naranja) como borde entre
// la portada oscura y el lino. Es la única ornamentación del sitio y sale de la arquitectura.

// `relleno`: el fondo de la sección que sigue. Las claras pintan lino propio; las oscuras usan
// el fondo del arco de luz (var(--luz-fondo)), que es lo que se ve detrás de ellas.
export default function Ola({ className = "", relleno = "var(--color-lino)" }: { className?: string; relleno?: string }) {
  return (
    <svg className={`pointer-events-none block h-[clamp(3rem,7vw,6.5rem)] w-full ${className}`} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M0 64 C 240 20, 480 20, 720 58 S 1200 104, 1440 44" fill="none" stroke="var(--color-magenta)" strokeWidth="5" vectorEffect="non-scaling-stroke" />
      <path d="M0 80 C 260 38, 500 40, 740 74 S 1210 116, 1440 62" fill="none" stroke="var(--color-coral)" strokeWidth="5" vectorEffect="non-scaling-stroke" />
      <path d="M0 96 C 280 56, 520 60, 760 90 S 1220 126, 1440 80 L 1440 120 L 0 120 Z" fill={relleno} />
      <path d="M0 96 C 280 56, 520 60, 760 90 S 1220 126, 1440 80" fill="none" stroke="var(--color-naranja)" strokeWidth="5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
