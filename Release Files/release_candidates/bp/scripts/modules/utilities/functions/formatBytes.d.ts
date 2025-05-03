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
export declare function formatBytes(bytes: number, decimals?: number): `${number} ${"Bytes" | "KiB" | "MiB" | "GiB" | "TiB" | "PiB" | "EiB" | "ZiB" | "YiB"}`;
