import { world } from "@minecraft/server";
export function roundPlaceNumberObject(object, place = Number(world.getDynamicProperty("scriptPrecision") ?? 5)) {
    let newObject;
    newObject = [];
    Object.entries(object).forEach((k, i) => { if (typeof (k[1]) == "number") {
        newObject.push([k[0], Number(k[1].toFixed(place))]);
    }
    else {
        newObject.push(k);
    } });
    return Object.fromEntries(newObject);
}
//# sourceMappingURL=roundPlaceNumberObject.js.map