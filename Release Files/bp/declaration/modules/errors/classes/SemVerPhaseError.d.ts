/**
 * An error for when a SemVer string with the wrong pre-release phase is recieved.
 * @since 1.20.0-development.67
 */
export declare class SemVerPhaseError extends Error {
    constructor(message?: string);
}
