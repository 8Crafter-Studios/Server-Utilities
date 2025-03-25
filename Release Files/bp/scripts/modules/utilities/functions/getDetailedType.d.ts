/**
 * Determines and returns a detailed type description of the provided value.
 *
 * @param {any} value - The value to determine the type of.
 * @returns {string} A string representing the type of the value,
 * including special handling for objects to include their constructor's name,
 * or "unknown" if it cannot be determined, and special handling for null values.
 */
export declare function getDetailedType(value: any): string;
