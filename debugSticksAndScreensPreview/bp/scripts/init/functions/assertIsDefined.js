export function assertIsDefined(value) {
    if (value === undefined || value === null) {
        throw new Error(`${value} is not defined`);
    }
}
Object.defineProperty(globalThis, "assertIsDefined", {
    value: assertIsDefined,
    configurable: false,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=assertIsDefined.js.map