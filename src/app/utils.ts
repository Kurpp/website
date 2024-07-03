import { RGBColor } from "colorthief";

export const rgbToHex = (r: number, g: number, b: number) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

export const fetcher = (...args: [any]) =>
  fetch(...args).then((res) => res.json());

export const findBrightestColor = (arr: RGBColor[]): RGBColor => {
  const calculateBrightness = (color: number[]): number => {
    return 0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2];
  };

  let brightestColor: RGBColor = [0, 0, 0];
  let highestBrightness = 0;

  arr.forEach(color => {
    const brightness = calculateBrightness(color);
    if (brightness > highestBrightness) {
      brightestColor = color;
      highestBrightness = brightness;
    }
  });

  return brightestColor;
}