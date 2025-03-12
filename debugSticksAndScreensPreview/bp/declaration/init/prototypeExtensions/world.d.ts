declare module "@minecraft/server" {
    interface World {
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
        saveStringToDynamicProperties(string: string, propertyName: string, clearOldProperties?: boolean, chunkSize?: number | bigint): void;
        /**
         * Retrieves a concatenated string from dynamic properties based on the provided property name.
         *
         * @param {string} propertyName - The base name of the dynamic property to retrieve the string from.
         * @param {string} zeroLengthPlaceholder - A placeholder string to return if the length of the dynamic property is zero. Defaults to an empty string.
         * @returns {string} The concatenated string from the dynamic properties, or the zeroLengthPlaceholder if the length is zero.
         * @throws {TypeError} If the provided propertyName is not a string.
         */
        getStringFromDynamicProperties(propertyName: string, zeroLengthPlaceholder?: string): string;
        /**
         * Deletes a string from dynamic properties.
         *
         * @param {string} propertyName - The name of the property the string is saved under.
         *
         * @throws {TypeError} If `propertyName` is not a string.
         */
        deleteStringFromDynamicProperties(propertyName: string): void;
    }
}
export {};
