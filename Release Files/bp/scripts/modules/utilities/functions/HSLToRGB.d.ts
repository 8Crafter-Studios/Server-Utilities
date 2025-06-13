/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from https://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @returns  {Array}          The RGB representation
 */
export declare function HSLToRGB(h: number, s: number, l: number): [r: number, g: number, b: number];
export declare function HueToRGB(p: number, q: number, t: number): number;
