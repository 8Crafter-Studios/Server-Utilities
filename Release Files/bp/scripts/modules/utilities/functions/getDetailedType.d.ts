/**
 * Determines and returns a detailed type description of the provided value.
 *
 * @param {any} value - The value to determine the type of.
 * @returns {string} A string representing the type of the value,
 * including special handling for objects to include their constructor's name,
 * or "unknown" if it cannot be determined,
 * and special handling for functions to include their name,
 * or "unknown" if it cannot be determined,
 * and special handling for symbols,
 * and special handling for `Infinity`, `-Infinity`, `NaN`, and `null` values.
 *
 * @version 1.1.0
 */
export declare function getDetailedType(value: any): string;
