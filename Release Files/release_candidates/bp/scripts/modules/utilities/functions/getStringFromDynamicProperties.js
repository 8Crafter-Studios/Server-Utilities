import { world } from "@minecraft/server";
/**
 * Retrieves a concatenated string from dynamic properties based on the provided property name.
 *
 * @param {string} propertyName - The base name of the dynamic property to retrieve the string from.
 * @param {string} zeroLengthPlaceholder - A placeholder string to return if the length of the dynamic property is zero. Defaults to an empty string.
 * @returns {string} The concatenated string from the dynamic properties, or the zeroLengthPlaceholder if the length is zero.
 * @throws {TypeError} If the provided propertyName is not a string.
 */
export function getStringFromDynamicProperties(propertyName, zeroLengthPlaceholder = "") {
    if (typeof propertyName != "string") {
        throw (new TypeError(`args[0]: Expected type of string but got type of ${typeof propertyName} instead.`));
    }
    const length = Number(world.getDynamicProperty(`${propertyName}.length`) ?? 0);
    const data = [];
    for (let i = 0n; i < length; i++) {
        data.push(world.getDynamicProperty(`#splitString[${i}]:${propertyName}`));
    }
    return length == 0 ? zeroLengthPlaceholder : data.join("");
}
//# sourceMappingURL=getStringFromDynamicProperties.js.map