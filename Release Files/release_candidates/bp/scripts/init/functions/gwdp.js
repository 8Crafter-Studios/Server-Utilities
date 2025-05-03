import { world } from "@minecraft/server";
export function gwdp(propertyId) {
    return world.getDynamicProperty(propertyId);
}
Object.defineProperty(globalThis, 'gwdp', {
    value: gwdp,
    configurable: true,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=gwdp.js.map