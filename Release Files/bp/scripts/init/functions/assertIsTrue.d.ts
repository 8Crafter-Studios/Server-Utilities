declare namespace exports {
    /**
     * Asserts that a value is `true`.
     *
     * @template T The type of the value to check.
     * @param {T} value The value to check.
     * @returns {asserts value is NonNullable<T>} Asserts that the value is `true`.
     *
     * @throws {Error} If the value is not `true`.
     */
    function assertIsTrue(value: any, key?: string): asserts value is true;
}
export import assertIsTrue = exports.assertIsTrue;
declare global {
    namespace globalThis {
        export import assertIsTrue = exports.assertIsTrue;
    }
}
export {};
