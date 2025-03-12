import type { Entity } from "@minecraft/server";
/**
 * Deletes a string from an entity's dynamic properties.
 *
 * @param {Entity} entity - The entity from which the string will be deleted.
 * @param {string} propertyName - The name of the property the string is saved under.
 *
 * @throws {TypeError} If `propertyName` is not a string.
 */
export declare function deleteStringFromEntityDynamicProperties(entity: Entity, propertyName: string): void;
