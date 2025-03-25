export function sedp(entity, propertyId, newValue) {
    return entity.setDynamicProperty(propertyId, newValue);
}
Object.defineProperty(globalThis, 'sedp', {
    value: sedp,
    configurable: true,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=sedp.js.map