export function gedp(entity, propertyId) {
    return entity.getDynamicProperty(propertyId);
}
Object.defineProperty(globalThis, 'gedp', {
    value: gedp,
    configurable: true,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=gedp.js.map