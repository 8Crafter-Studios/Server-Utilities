/**
 * Saves a string to dynamic properties, optionally clearing old properties first and splitting the string into chunks.
 *
 * @param {string} string - The string to save to dynamic properties.
 * @param {string} propertyName - The name of the property to save the string under.
 * @param {boolean} clearOldProperties - Whether to clear old properties before saving the new string. Defaults to true.
 * @param {number | bigint} chunkSize - The size of each chunk to split the string into. Defaults to 32760.
 *
 * @throws {TypeError} If `propertyName` is not a string.
 * @throws {TypeError} If `clearOldProperties` is not a boolean.
 */
export declare function saveStringToDynamicProperties(string: string, propertyName: string, clearOldProperties?: boolean, chunkSize?: number | bigint): void;
