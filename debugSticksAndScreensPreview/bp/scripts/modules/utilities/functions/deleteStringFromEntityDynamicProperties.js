/**
 * Deletes a string from an entity's dynamic properties.
 *
 * @param {Entity} entity - The entity from which the string will be deleted.
 * @param {string} propertyName - The name of the property the string is saved under.
 *
 * @throws {TypeError} If `propertyName` is not a string.
 */
export function deleteStringFromEntityDynamicProperties(entity, propertyName) {
    if (typeof propertyName != "string") {
        throw new TypeError(`args[1]: Expected type of string but got type of ${typeof propertyName} instead.`);
    }
    const length = Number(entity.getDynamicProperty(`${propertyName}.length`) ?? 0);
    for (let i = 0n; i < length; i++) {
        entity.setDynamicProperty(`#splitString[${i}]:${propertyName}`);
    }
    entity.setDynamicProperty(`${propertyName}.length`);
}
//# sourceMappingURL=deleteStringFromEntityDynamicProperties.js.map