/**
 * Converts a given number of bytes into a human-readable string with the appropriate unit.
 *
 * @param bytes - The number of bytes to be converted.
 * @param decimals - The number of decimal places to include in the formatted string. Defaults to 2.
 * @returns A string representing the formatted number of bytes with the appropriate unit.
 *
 * @see https://stackoverflow.com/a/18650828 The souce of the function (It was originally in JavaScript but I converted it to TypeScript.).
 *
 * @example
 * ```typescript
 * formatBytes(1024); // "1 KiB"
 * formatBytes(123456789); // "117.74 MiB"
 * formatBytes(123456789, 3); // "117.738 MiB"
 * ```
 */
export function formatBytes(bytes, decimals = 2) {
    if (!+bytes)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
//# sourceMappingURL=formatBytes.js.map