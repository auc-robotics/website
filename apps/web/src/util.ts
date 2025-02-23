export const resolveColor = (color: string) => {
  if (color.startsWith("--")) {
    return getComputedStyle(document.body).getPropertyValue(color);
  }
  const varRegex = /var\((.*?)\)/g;
  color = color.replaceAll(varRegex, (_, p) =>
    getComputedStyle(document.body).getPropertyValue(p),
  );
  return color;
};
export const transparent = (color: string, alpha = 0) =>
  `color-mix(in srgb, ${resolveColor(color)} ${Math.max(1, alpha * 100)}%, transparent)`;

export const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));
