var exports;
(function (exports) {
    /**
     * Asserts that a value is not `undefined` or `null`.
     *
     * @template T The type of the value to check.
     * @param {T} value The value to check.
     * @returns {asserts value is NonNullable<T>} Asserts that the value is not `undefined` or `null`.
     *
     * @throws {Error} If the value is `undefined` or `null`.
     */
    function assertIsDefined(value) {
        if (value === undefined || value === null) {
            throw new Error(`${value} is not defined`);
        }
    }
    exports.assertIsDefined = assertIsDefined;
})(exports || (exports = {}));
export var assertIsDefined = exports.assertIsDefined;
Object.defineProperty(globalThis, "assertIsDefined", {
    value: assertIsDefined,
    configurable: false,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=assertIsDefined.js.map