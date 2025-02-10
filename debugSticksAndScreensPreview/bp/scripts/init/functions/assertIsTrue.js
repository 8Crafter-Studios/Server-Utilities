export function assertIsTrue(value, key) {
    if (value !== true) {
        throw new Error(`${key ?? "The expression"} did not evaluate true. It instead evaluated to ${value}.`);
    }
}
Object.defineProperty(globalThis, "assertIsTrue", {
    value: assertIsTrue,
    configurable: false,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=assertIsTrue.js.map