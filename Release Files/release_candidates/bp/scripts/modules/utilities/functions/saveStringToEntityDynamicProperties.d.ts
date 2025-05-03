import { type Entity } from "@minecraft/server";
/**
 * Saves a string to an entity's dynamic properties, optionally clearing old properties first.
 *
 * @param {Entity} entity - The entity to which the string will be saved.
 * @param {string} string - The string to save to the entity's dynamic properties.
 * @param {string} propertyName - The base name of the dynamic property where the string will be saved.
 * @param {boolean} clearOldProperties - Whether to clear old properties before saving the new string. Defaults to `true`.
 * @param {number | bigint} chunkSize - The size of each chunk of the string to save. Defaults to `32760`.
 *
 * @throws {TypeError} If `propertyName` is not a string.
 * @throws {TypeError} If `clearOldProperties` is not a boolean.
 */
export declare function saveStringToEntityDynamicProperties(entity: Entity, string: string, propertyName: string, clearOldProperties?: boolean, chunkSize?: number | bigint): void;
