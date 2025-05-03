export class CharacterSetConverter {
    customCharset;
    constructor(customCharset) {
        if (customCharset.length < 2) {
            throw new Error("Custom character set must contain at least 2 characters.");
        }
        this.customCharset = customCharset;
    }
    encode(input) {
        const base = this.customCharset.length;
        let encoded = '';
        for (const char of input) {
            let codePoint = char.codePointAt(0);
            let encodedChar = '';
            while (codePoint > 0) {
                encodedChar = this.customCharset[codePoint % base] + encodedChar;
                codePoint = Math.floor(codePoint / base);
            }
            encoded += encodedChar + this.customCharset[0];
        }
        return encoded;
    }
    decode(input) {
        const base = this.customCharset.length;
        const parts = input.split(this.customCharset[0]).filter(Boolean);
        let decoded = '';
        for (const part of parts) {
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