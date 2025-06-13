/**
 * Converts between a string and a custom character set.
 *
 * Supports all unicode characters.
 */
export class CharacterSetConverter {
    /**
     * The custom character set to use.
     *
     * @type {string}
     */
    customCharset;
    /**
     * Creates a new instance of the CharacterSetConverter class.
     *
     * @param {string} customCharset The custom character set to use.
     * @throws {TypeError} If the custom character set is less than 2 characters in length.
     */
    constructor(customCharset) {
        if (customCharset.length < 2) {
            throw new TypeError("Custom character set must contain at least 2 characters.");
        }
        this.customCharset = customCharset;
    }
    /**
     * Encodes a string using the custom character set.
     *
     * @param {string} input The string to encode.
     * @returns {string} The encoded string.
     */
    encode(input) {
        /**
         * The base of the custom character set.
         *
         * @type {number}
         */
        const base = this.customCharset.length;
        /**
         * The encoded string.
         *
         * @type {string}
         */
        let encoded = '';
        for (const char of input) {
            /**
             * The code point of the character.
             *
             * @type {number}
             */
            let codePoint = char.codePointAt(0);
            /**
             * The encoded character.
             *
             * @type {string}
             */
            let encodedChar = '';
            while (codePoint > 0) {
                encodedChar = this.customCharset[codePoint % base] + encodedChar;
                codePoint = Math.floor(codePoint / base);
            }
            encoded += encodedChar + this.customCharset[0];
        }
        return encoded;
    }
    /**
     * Decodes a string using the custom character set.
     *
     * @param {string} input The string to decode.
     * @returns {string} The decoded string.
     */
    decode(input) {
        /**
         * The base of the custom character set.
         *
         * @type {number}
         */
        const base = this.customCharset.length;
        /**
         * The parts of the input string.
         *
         * @type {string[]}
         */
        const parts = input.split(this.customCharset[0]).filter(Boolean);
        /**
         * The decoded string.
         *
         * @type {string}
         */
        let decoded = '';
        for (const part of parts) {
            /**
             * The code point of the character.
             *
             * @type {number}
             */
            let codePoint = 0;
            for (const char of part) {
                codePoint = codePoint * base + this.customCharset.indexOf(char);
            }
            decoded += String.fromCodePoint(codePoint);
        }
        return decoded;
    }
}
//# sourceMappingURL=CharacterSetConverter.js.map