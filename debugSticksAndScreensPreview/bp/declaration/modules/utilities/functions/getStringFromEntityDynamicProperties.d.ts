import { type Entity } from "@minecraft/server";
/**
 * Retrieves a concatenated string from an entity's dynamic properties.
 *
 * @param {Entity} entity - The entity from which to retrieve the dynamic properties.
 * @param {string} propertyName - The base name of the dynamic property to retrieve.
 * @param {string} zeroLengthPlaceholder - A placeholder string to return if the dynamic property length is zero. Defaults to an empty string.
 * @returns {string} The concatenated string from the entity's dynamic properties, or the zeroLengthPlaceholder if the length is zero.
 * @throws {TypeError} If the propertyName is not a string.
 */
export declare function getStringFromEntityDynamicProperties(entity: Entity, propertyName: string, zeroLengthPlaceholder?: string): string;
