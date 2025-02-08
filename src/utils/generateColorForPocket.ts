export function generateColorForPocket(i: number) {
  const goldenRatio = 0.618033988749895;
  const hue = (i * goldenRatio * 360) % 360;
  const saturation = 60 + ((i * 17) % 3) * 13;
  const lightness = 45 + ((i * 23) % 3) * 15;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
