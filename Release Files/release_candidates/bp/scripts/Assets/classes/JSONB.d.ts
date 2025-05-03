/**
 * Assets/classes/JSONB.ts
 * An improved version of {@link JSON}
 * @module
 * @description This file contains the `JSONB` class.
 */
/**
 * An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
 *
 * This is an improved version of {@link JSON}.
 */
export declare const JSONB: globalThis.JSONB;
declare global {
    /**
     * An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
     *
     * This is an improved version of {@link JSON}.
     *
     * @ignore
     */
    interface JSONB {
        /**
         * Converts a JavaScript Object Notation B (JSONB) string into an object.
         * @param text A valid JSON string.
         * @param reviver A function that transforms the results. This function is called for each member of the object.
         * @param options The options for parsing the JSON string.
         * @param options.bigint A value that indicates whether to parse bigints (ex. 57126n).
         * @param options.undefined A value that indicates whether to parse undefined (ex. undefined).
         * @param options.Infinity A value that indicates whether to parse Infinity (ex. Infinity).
         * @param options.NegativeInfinity A value that indicates whether to parse -Infinity (ex. -Infinity).
         * @param options.NaN A value that indicates whether to parse NaN (ex. NaN).
         * @param options.get A value that indicates whether to parse getter functions (ex. get).
         *
         * Warning: This option is currently ignored as it is non-functional.
         * @param options.set A value that indicates whether to parse setter functions (ex. set).
         *
         * Warning: This option is currently ignored as it is non-functional.
         * @param options.function A value that indicates whether to parse functions (ex. function).
         *
         * Warning: This option is currently ignored as it is non-functional.
         * @param options.class A value that indicates whether to parse classes (ex. class).
         *
         * Warning: This option is currently ignored as it is non-functional.
         *
         * @returns A JavaScript value, usually an object or array, that represents the JSONB that was parsed from the specified string.
         */
        parse(text: string, reviver?: (this: any, key: string, value: any) => any, options?: {
            bigint?: boolean;
            undefined?: boolean;
            Infinity?: boolean;
            NegativeInfinity?: boolean;
            NaN?: boolean;
            get?: false;
            set?: false;
            function?: false;
            class?: false;
        }): any;
        /**
         * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
         * @param value A JavaScript value, usually an object or array, to be converted.
         * @param replacer A function that transforms the results.
         * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
         * @param options The options for stringifying the provided value.
         * @param options.bigint A value that indicates whether to stringify bigints (ex. 57126n).
         * @param options.undefined A value that indicates whether to stringify undefined (ex. undefined).
         * @param options.Infinity A value that indicates whether to stringify Infinity (ex. Infinity).
         * @param options.NegativeInfinity A value that indicates whether to stringify -Infinity (ex. -Infinity).
         * @param options.NaN A value that indicates whether to stringify NaN (ex. NaN).
         * @param options.get A value that indicates whether to stringify getter functions (ex. get).
         * @param options.set A value that indicates whether to stringify setter functions (ex. set).
         * @param options.function A value that indicates whether to stringify functions (ex. function).
         * @param options.class A value that indicates whether to stringify classes (ex. class).\
         *
         * Warning: This option is currently ignored as it is non-functional.
         * @returns A JavaScript Object Notation B (JSONB) string that represents the value passed in.
         */
        stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number, options?: {
            bigint?: boolean;
            undefined?: boolean;
            Infinity?: boolean;
            NegativeInfinity?: boolean;
            NaN?: boolean;
            get?: boolean;
            set?: boolean;
            function?: boolean;
            class?: false;
        }): string;
        /**
         * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
         * @param value A JavaScript value, usually an object or array, to be converted.
         * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
         * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
         * @param options The options for stringifying the provided value.
         * @param options.bigint A value that indicates whether to stringify bigints (ex. 57126n).
         * @param options.undefined A value that indicates whether to stringify undefined (ex. undefined).
         * @param options.Infinity A value that indicates whether to stringify Infinity (ex. Infinity).
         * @param options.NegativeInfinity A value that indicates whether to stringify -Infinity (ex. -Infinity).
         * @param options.NaN A value that indicates whether to stringify NaN (ex. NaN).
         * @param options.get A value that indicates whether to stringify getter functions (ex. get).
         * @param options.set A value that indicates whether to stringify setter functions (ex. set).
         * @param options.function A value that indicates whether to stringify functions (ex. function).
         * @param options.class A value that indicates whether to stringify classes (ex. class).\
         *
         * Warning: This option is currently ignored as it is non-functional.
         * @returns A JavaScript Object Notation B (JSONB) string that represents the value passed in.
         */
        stringify(value: any, replacer?: (number | string)[] | null, space?: string | number, options?: {
            bigint?: boolean;
            undefined?: boolean;
            Infinity?: boolean;
            NegativeInfinity?: boolean;
            NaN?: boolean;
            get?: boolean;
            set?: boolean;
            function?: boolean;
            class?: false;
        }): string;
    }
    /**
     * An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
     *
     * This is an improved version of {@link JSON}.
     *
     * @namespace
     */
    var JSONB: JSONB;
}
