export declare const errorsmetaimport: ImportMeta;
/**
 * An error having to do with SemVer strings.
 * @since 1.20.0-development.67
 */
export declare class SemVerError extends Error {
    constructor(message?: string);
}
/**
 * An error for when a SemVer string is unable to be parsed.
 * @since 1.20.0-development.67
 */
export declare class SemVerParseError extends Error {
    constructor(message?: string);
}
/**
 * An error for when a SemVer string with the wrong pre-release phase is recieved.
 * @since 1.20.0-development.67
 */
export declare class SemVerPhaseError extends Error {
    constructor(message?: string);
}
export declare class TimeoutError extends Error {
    constructor(message?: string);
}
export declare class ExpireError extends Error {
    constructor(message?: string);
}
export declare class NoSelectorMatchesError extends Error {
    constructor(message?: string);
}
/**
 * An error for when the storage of something is full.
 * An example use case for this is for the a player
 * is selling an item at another player's player shop,
 * but the owner of the shop is out of storage inside of their
 * recieved player shop items storage entity's inventory.
 * @since 1.23.0-preview.20+BUILD.1
 * @since 10/03/2024 1:48 PM
 */
export declare class StorageFullError extends Error {
    constructor(message?: string);
}
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
