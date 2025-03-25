export function gidp(item, propertyId) {
    return item.getDynamicProperty(propertyId);
}
Object.defineProperty(globalThis, 'gidp', {
    value: gidp,
    configurable: true,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=gidp.js.map