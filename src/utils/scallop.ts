/**
 * Builds the wavy "seal" outline used by the FROZZY badge logo.
 * Returns an SVG path centred on (cx, cy).
 */
export function scallopPath(cx: number, cy: number, radius: number, bumps = 14, depth = 0.05): string {
  const steps = bumps * 24;
  const amp = radius * depth;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = radius - amp + amp * Math.cos(bumps * t);
    const x = cx + r * Math.sin(t);
    const y = cy - r * Math.cos(t);
    d += `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return `${d}Z`;
}
