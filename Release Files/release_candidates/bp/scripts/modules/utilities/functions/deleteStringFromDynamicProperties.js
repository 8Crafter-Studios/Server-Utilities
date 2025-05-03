import { world } from "@minecraft/server";
/**
 * Deletes a string from dynamic properties.
 *
 * @param {string} propertyName - The name of the property the string is saved under.
 *
 * @throws {TypeError} If `propertyName` is not a string.
 */
export function deleteStringFromDynamicProperties(propertyName) {
    if (typeof propertyName != "string") {
        throw new TypeError(`args[0]: Expected type of string but got type of ${typeof propertyName} instead.`);
    }
    const length = Number(world.getDynamicProperty(`${propertyName}.length`) ?? 0);
    for (let i = 0n; i < length; i++) {
        world.setDynamicProperty(`#splitString[${i}]:${propertyName}`);
    }
    world.setDynamicProperty(`${propertyName}.length`);
}
//# sourceMappingURL=deleteStringFromDynamicProperties.js.map