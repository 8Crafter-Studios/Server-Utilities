import { world } from "@minecraft/server";
import { splitUpStringData } from "./splitUpStringData";
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
export function saveStringToDynamicProperties(string, propertyName, clearOldProperties = true, chunkSize = 32760) {
    if (typeof propertyName != "string") {
        throw new TypeError(`args[1]: Expected type of string but got type of ${typeof propertyName} instead.`);
    }
    if (typeof clearOldProperties != "boolean") {
        throw new TypeError(`args[2]: Expected type of boolean but got type of ${typeof clearOldProperties} instead.`);
    }
    if (clearOldProperties) {
        const length = Number(world.getDynamicProperty(`${propertyName}.length`) ?? 0);
        for (let i = 0n; i < length; i++) {
            world.setDynamicProperty(`#splitString[${i}]:${propertyName}`);
        }
    }
    const data = splitUpStringData(string, chunkSize);
    data.forEach((s, i) => {
        world.setDynamicProperty(`#splitString[${i}]:${propertyName}`, s);
    });
    world.setDynamicProperty(`${propertyName}.length`, data.length);
}
//# sourceMappingURL=saveStringToDynamicProperties.js.map