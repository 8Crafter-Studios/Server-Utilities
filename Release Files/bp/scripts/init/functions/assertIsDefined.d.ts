declare namespace exports {
    /**
     * Asserts that a value is not `undefined` or `null`.
     *
     * @template T The type of the value to check.
     * @param {T} value The value to check.
     * @returns {asserts value is NonNullable<T>} Asserts that the value is not `undefined` or `null`.
     *
     * @throws {Error} If the value is `undefined` or `null`.
     */
    function assertIsDefined<T>(value: T): asserts value is NonNullable<T>;
}
export import assertIsDefined = exports.assertIsDefined;
declare global {
    namespace globalThis {
        export import assertIsDefined = exports.assertIsDefined;
    }
}
export {};
