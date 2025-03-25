export declare class CharacterSetConverter {
    private customCharset;
    constructor(customCharset: string);
    encode(input: string): string;
    decode(input: string): string;
}
