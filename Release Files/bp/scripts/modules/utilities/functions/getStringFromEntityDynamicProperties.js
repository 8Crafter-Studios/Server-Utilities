import {} from "@minecraft/server";
/**
 * Retrieves a concatenated string from an entity's dynamic properties.
 *
 * @param {Entity} entity - The entity from which to retrieve the dynamic properties.
 * @param {string} propertyName - The base name of the dynamic property to retrieve.
 * @param {string} zeroLengthPlaceholder - A placeholder string to return if the dynamic property length is zero. Defaults to an empty string.
 * @returns {string} The concatenated string from the entity's dynamic properties, or the zeroLengthPlaceholder if the length is zero.
 * @throws {TypeError} If the propertyName is not a string.
 */
export function getStringFromEntityDynamicProperties(entity, propertyName, zeroLengthPlaceholder = "") {
    if (typeof propertyName != "string") {
        throw (new TypeError(`args[0]: Expected type of string but got type of ${typeof propertyName} instead.`));
    }
    const length = Number(entity.getDynamicProperty(`${propertyName}.length`) ?? 0);
    const data = [];
    for (let i = 0n; i < length; i++) {
        data.push(entity.getDynamicProperty(`#splitString[${i}]:${propertyName}`));
    }
    return length == 0 ? zeroLengthPlaceholder : data.join("");
}
//# sourceMappingURL=getStringFromEntityDynamicProperties.js.map