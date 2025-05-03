/**
 * Finds the key of the closest matching color in an object to the given RGB color.
 *
 * It goes through each key-value pair of the object, checks if the value is a string starting with "#", and if it is, it calculates the distance between the two colors. If the distance is smaller than the current smallest distance, it updates the smallest distance and the closest match.
 *
 * @param {[number, number, number]} rgb The RGB color to find the closest match for.
 * @param {{ [key: string]: string }} obj The object to search in.
 * @returns The key of the closest matching color, or null if no color was found.
 */
export function findClosestColorMatch(rgb, obj) {
    let closestMatch = null;
    let closestDistance = Infinity;
    Object.keys(obj).forEach((key) => {
        const color = obj[key];
        if (typeof color === "string" && color.startsWith("#")) {
            const hexColor = color.substring(1);
            const hexRgb = [
                parseInt(hexColor.substring(0, 2), 16),
                parseInt(hexColor.substring(2, 4), 16),
                parseInt(hexColor.substring(4, 6), 16),
            ];
            const distance = calculateColorDistance(rgb, hexRgb);
            if (distance < closestDistance) {
                closestMatch = key;
                closestDistance = distance;
            }
        }
    });
    return closestMatch;
}
/**
 * Calculates the color distance between two colors.
 *
 * This function uses the CIE94 color difference formula to calculate the color distance between two colors.
 *
 * @param rgb1 The first RGB color.
 * @param rgb2 The second RGB color.
 * @returns The color distance between the two colors.
 */
export function calculateColorDistance(rgb1, rgb2) {
    const rMean = (rgb1[0] + rgb2[0]) / 2;
    const r = rgb1[0] - rgb2[0];
    const g = rgb1[1] - rgb2[1];
    const b = rgb1[2] - rgb2[2];
    return Math.sqrt((2 + rMean / 256) * r * r + 4 * g * g + (2 + (255 - rMean) / 256) * b * b);
}
/**
 * Minecraft Bedock Edition formatting color codes to hex color map.
 *
 * @see {@link https://minecraft.wiki/w/Formatting_codes}
 *
 * @author 8Crafter
 */
export const mcFormattingCodesToHexColorMap = {
    0: "#000000",
    1: "#0000aa",
    2: "#00aa00",
    3: "#00aaaa",
    4: "#aa0000",
    5: "#aa00aa",
    6: "#ffaa00",
    7: "#aaaaaa",
    8: "#555555",
    9: "#5555ff",
    a: "#55ff55",
    b: "#55ffff",
    c: "#ff5555",
    d: "#ff55ff",
    e: "#ffff55",
    f: "#ffffff",
    g: "#DDD605",
    h: "#E3D4D1",
    i: "#CECACA",
    j: "#443A3B",
    m: "#971607",
    n: "#B4694D",
    p: "#DEB12D",
    q: "#119F36",
    s: "#2CBAA8",
    t: "#21497B",
    u: "#9A5CC6",
    v: "#EB7114",
};
//# sourceMappingURL=findClosestColorMatch.js.map