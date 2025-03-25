import {} from "@minecraft/server";
import { splitUpStringData } from "./splitUpStringData";
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
export function saveStringToEntityDynamicProperties(entity, string, propertyName, clearOldProperties = true, chunkSize = 32760) {
    if (typeof propertyName != "string") {
        throw (new TypeError(`args[1]: Expected type of string but got type of ${typeof propertyName} instead.`));
    }
    if (typeof clearOldProperties != "boolean") {
        throw (new TypeError(`args[2]: Expected type of boolean but got type of ${typeof clearOldProperties} instead.`));
    }
    if (clearOldProperties) {
        const length = Number(entity.getDynamicProperty(`${propertyName}.length`) ?? 0);
        for (let i = 0n; i < length; i++) {
            entity.setDynamicProperty(`#splitString[${i}]:${propertyName}`);
        }
    }
    const data = splitUpStringData(string, chunkSize);
    data.forEach((s, i) => {
        entity.setDynamicProperty(`#splitString[${i}]:${propertyName}`, s);
    });
    entity.setDynamicProperty(`${propertyName}.length`, data.length);
}
//# sourceMappingURL=saveStringToEntityDynamicProperties.js.map