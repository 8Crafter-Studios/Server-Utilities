/**
 * Finds the key of the closest matching color in an object to the given RGB color.
 *
 * It goes through each key-value pair of the object, checks if the value is a string starting with "#", and if it is, it calculates the distance between the two colors. If the distance is smaller than the current smallest distance, it updates the smallest distance and the closest match.
 *
 * @param {[number, number, number]} rgb The RGB color to find the closest match for.
 * @param {{ [key: string]: string }} obj The object to search in.
 * @returns The key of the closest matching color, or null if no color was found.
 */
export declare function findClosestColorMatch(rgb: [number, number, number], obj: {
    [key: string]: string;
}): string | null;
/**
 * Calculates the color distance between two colors.
 *
 * This function uses the CIE94 color difference formula to calculate the color distance between two colors.
 *
 * @param rgb1 The first RGB color.
 * @param rgb2 The second RGB color.
 * @returns The color distance between the two colors.
 */
export declare function calculateColorDistance(rgb1: [number, number, number], rgb2: [number, number, number]): number;
/**
 * Minecraft Bedock Edition formatting color codes to hex color map.
 *
 * @see {@link https://minecraft.wiki/w/Formatting_codes}
 *
 * @author 8Crafter
 */
export declare const mcFormattingCodesToHexColorMap: {
    readonly 0: "#000000";
    readonly 1: "#0000aa";
    readonly 2: "#00aa00";
    readonly 3: "#00aaaa";
    readonly 4: "#aa0000";
    readonly 5: "#aa00aa";
    readonly 6: "#ffaa00";
    readonly 7: "#aaaaaa";
    readonly 8: "#555555";
    readonly 9: "#5555ff";
    readonly a: "#55ff55";
    readonly b: "#55ffff";
    readonly c: "#ff5555";
    readonly d: "#ff55ff";
    readonly e: "#ffff55";
    readonly f: "#ffffff";
    readonly g: "#DDD605";
    readonly h: "#E3D4D1";
    readonly i: "#CECACA";
    readonly j: "#443A3B";
    readonly m: "#971607";
    readonly n: "#B4694D";
    readonly p: "#DEB12D";
    readonly q: "#119F36";
    readonly s: "#2CBAA8";
    readonly t: "#21497B";
    readonly u: "#9A5CC6";
    readonly v: "#EB7114";
};
