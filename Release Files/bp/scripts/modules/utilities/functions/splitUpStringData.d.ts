/**
 * Splits a given string into chunks of a specified size.
 *
 * @param {string} data - The string to be split into chunks.
 * @param {number|bigint} [chunkSize=32760] - The size of each chunk. Defaults to 32760. Can be a number or a bigint.
 *
 * @returns {string[]} An array of strings, where each string is a chunk of the original data.
 *
 * @throws {RangeError} If `chunkSize` is 0.
 * @throws {TypeError} If `data` is not a string.
 * @throws {TypeError} If `chunkSize` is neither a number nor a bigint.
 */
export declare function splitUpStringData(data: string, chunkSize?: number | bigint): string[];
