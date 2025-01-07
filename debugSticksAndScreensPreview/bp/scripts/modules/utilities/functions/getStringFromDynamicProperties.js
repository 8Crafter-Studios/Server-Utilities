import { world } from "@minecraft/server";
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