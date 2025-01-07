import {} from "@minecraft/server";
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