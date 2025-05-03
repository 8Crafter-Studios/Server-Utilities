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
export function splitUpStringData(data, chunkSize = 32760) {
    if (chunkSize == 0) {
        throw (new RangeError(`chunkSize cannot be 0 (got ${chunkSize.toString()})`));
    }
    if (typeof data != "string") {
        throw (new TypeError(`args[0]: Expected type of string but got type of ${typeof data} instead.`));
    }
    if (typeof chunkSize == "bigint") {
        const chunkSizeB = Number(chunkSize);
        let remainingData = data;
        const splitData = [];
        for (let i = 0n; remainingData.length != 0; i++) {
            splitData.push(remainingData.slice(0, Math.min(remainingData.length, chunkSizeB)));
            remainingData = remainingData.slice(Math.min(remainingData.length, chunkSizeB));
        }
        return splitData;
    }
    else if (typeof chunkSize != "number") {
        throw (new TypeError(`args[1]: Expected type of number but got type of ${typeof chunkSize} instead.`));
    }
    else {
        let remainingData = data;
        let splitData = [];
        for (let i = 0n; remainingData.length != 0; i++) {
            splitData.push(remainingData.slice(0, Math.min(remainingData.length, chunkSize)));
            remainingData = remainingData.slice(Math.min(remainingData.length, chunkSize));
        }
        return splitData;
    }
}
//# sourceMappingURL=splitUpStringData.js.map