/**
 * Source: https://github.com/base62/base62.js/blob/master/lib/custom.js
 */
declare class CharacterSetConverter {
    static encode(int: any, charset: any): any;
    static decode(str: any, charset: any): number;
    static indexCharset(str: any): {
        byCode: {};
        byChar: {};
        length: any;
    };
}
