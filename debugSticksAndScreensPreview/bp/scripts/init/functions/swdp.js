import { world } from "@minecraft/server";
export function swdp(propertyId, newValue) {
    return world.setDynamicProperty(propertyId, newValue);
}
Object.defineProperty(globalThis, 'swdp', {
    value: swdp,
    configurable: true,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=swdp.js.map