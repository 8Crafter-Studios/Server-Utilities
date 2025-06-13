/**
 * Converts between a string and a base52 encoded string.
 */
export declare class Base52 {
    private static readonly charMap;
    static toBase52(input: string): string;
    static fromBase52(input: string): string;
}
