export function sidp(item, entity, propertyId, newValue) {
    return item.setDynamicProperty(propertyId, newValue);
}
Object.defineProperty(globalThis, 'sidp', {
    value: sidp,
    configurable: true,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=sidp.js.map