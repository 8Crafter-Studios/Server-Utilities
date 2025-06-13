/**
 * Converts between a string and a custom character set.
 *
 * Supports all unicode characters.
 */
export declare class CharacterSetConverter {
    /**
     * The custom character set to use.
     *
     * @type {string}
     */
    private readonly customCharset;
    /**
     * Creates a new instance of the CharacterSetConverter class.
     *
     * @param {string} customCharset The custom character set to use.
     * @throws {TypeError} If the custom character set is less than 2 characters in length.
     */
    constructor(customCharset: string);
    /**
     * Encodes a string using the custom character set.
     *
     * @param {string} input The string to encode.
     * @returns {string} The encoded string.
     */
    encode(input: string): string;
    /**
     * Decodes a string using the custom character set.
     *
     * @param {string} input The string to decode.
     * @returns {string} The decoded string.
     */
    decode(input: string): string;
}
