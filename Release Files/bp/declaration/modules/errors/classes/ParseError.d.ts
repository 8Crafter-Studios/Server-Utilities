/**
 * An error for when something could not be parsed.
 * An example use case for this is when the thing
 * being parsed has a higher format version than
 * the current format version.
 * @since 1.26.0-preview.20+BUILD.1
 * @since 10/22/2024 5:48:28 PM
 */
export declare class ParseError extends Error {
    constructor(message?: string);
}
