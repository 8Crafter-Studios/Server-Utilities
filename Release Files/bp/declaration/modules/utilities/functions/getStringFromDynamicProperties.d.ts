/**
 * Retrieves a concatenated string from dynamic properties based on the provided property name.
 *
 * @param {string} propertyName - The base name of the dynamic property to retrieve the string from.
 * @param {string} zeroLengthPlaceholder - A placeholder string to return if the length of the dynamic property is zero. Defaults to an empty string.
 * @returns {string} The concatenated string from the dynamic properties, or the zeroLengthPlaceholder if the length is zero.
 * @throws {TypeError} If the provided propertyName is not a string.
 */
export declare function getStringFromDynamicProperties(propertyName: string, zeroLengthPlaceholder?: string): string;
