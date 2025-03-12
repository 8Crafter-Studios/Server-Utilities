import "init/meta/importToMakeValidModule";
/**
 * Tests if an object conforms to the structure and types defined by a base object.
 *
 * @param objectToTest - The object to be tested.
 * @param base - The base object that defines the structure and types to test against.
 * @returns `true` if `objectToTest` conforms to the structure and types of `base`, otherwise `false`.
 *
 * @example
 * // Example 1: Simple type check
 * const objectToTest1 = { a: 1, b: "string" };
 * const base1 = { a: "number", b: "string" };
 * console.log(testForObjectTypeExtension(objectToTest1, base1)); // true
 *
 * @example
 * // Example 2: Nested object type check
 * const objectToTest2 = { a: { b: 2 } };
 * const base2 = { a: { b: "number" } };
 * console.log(testForObjectTypeExtension(objectToTest2, base2)); // true
 *
 * @example
 * // Example 3: Constructor name check
 * const objectToTest3 = { a: new Date() };
 * const base3 = { a: "[object Date]" };
 * console.log(testForObjectTypeExtension(objectToTest3, base3)); // true
 *
 * @example
 * // Example 4: Failing type check
 * const objectToTest4 = { a: 1, b: "string" };
 * const base4 = { a: "string", b: "number" };
 * console.log(testForObjectTypeExtension(objectToTest4, base4)); // false
 *
 * @example
 * // Example 5: Type check with [typeof ] syntax
 * const objectToTest5 = { a: 1, b: "string" };
 * const base5 = { a: "[typeof number]", b: "[typeof string]" };
 * console.log(testForObjectTypeExtension(objectToTest5, base5)); // true
 *
 * @example
 * // Example 6: Exact string match with [string ] syntax
 * const objectToTest6 = { a: "hello" };
 * const base6 = { a: "[string \"hello\"]" };
 * console.log(testForObjectTypeExtension(objectToTest6, base6)); // true
 *
 * @example
 * // Example 7: Exact number match with [number ] syntax
 * const objectToTest7 = { a: 42.45327 };
 * const base7 = { a: "[number 42.45327]" };
 * console.log(testForObjectTypeExtension(objectToTest7, base7)); // true
 *
 * @example
 * // Example 8: Exact bigint match with [bigint ] syntax
 * const objectToTest8 = { a: 42n, b: -57n };
 * const base8 = { a: "[bigint 42n]", b: "[bigint -57]" };
 * console.log(testForObjectTypeExtension(objectToTest8, base8)); // true
 *
 * @example
 * // Example 9: Exact boolean match with [boolean ] syntax
 * const objectToTest9 = { a: true };
 * const base9 = { a: "[boolean true]" };
 * console.log(testForObjectTypeExtension(objectToTest9, base9)); // true
 */
export function testForObjectTypeExtension(objectToTest, base) {
    return Object.entries(base).every((v) => {
        if (!Object.keys(objectToTest).includes(v[0])) {
            return false;
        }
        const objectValue = Object.entries(objectToTest).find((c) => c[0] == v[0])[1];
        if (typeof v[1] == "object") {
            if (typeof objectValue == "object") {
                return testForObjectTypeExtension(objectValue, v[1]);
            }
            else {
                return false;
            }
        }
        else if (typeof v[1] === "string") {
            if (v[1].startsWith("[object ")) {
                return objectValue?.constructor?.name == v[1].slice(8, -1);
            }
            else if (v[1].startsWith("[typeof ")) {
                return typeof objectValue == v[1].slice(8, -1);
            }
            else if (v[1].startsWith("[string ")) {
                if (typeof objectValue == "string") {
                    return objectValue == JSON.parse(v[1].slice(8, -1));
                }
                else {
                    return false;
                }
            }
            else if (v[1].startsWith("[number ")) {
                if (typeof objectValue == "number") {
                    return objectValue == Number(v[1].slice(8, -1));
                }
                else {
                    return false;
                }
            }
            else if (v[1].startsWith("[bigint ")) {
                if (!/^\[bigint -?\d+n?\]$/.test(v[1])) {
                    throw new SyntaxError("Invalid bigint type: " + JSON.stringify(v[1]));
                }
                if (typeof objectValue == "bigint") {
                    return objectValue == BigInt(/^\[bigint (-?\d+)n?\]$/.exec(v[1])?.[1]);
                }
                else {
                    return false;
                }
            }
            else if (v[1].startsWith("[boolean ")) {
                if (!/^\[bigint (true|false)\]$/.test(v[1])) {
                    throw new SyntaxError("Invalid bigint type: " + JSON.stringify(v[1]));
                }
                if (typeof objectValue == "boolean") {
                    return objectValue == (/^\[bigint (true|false)\]$/.exec(v[1])?.[1] === "true");
                }
                else {
                    return false;
                }
            }
            else {
                return typeof objectValue == v[1];
            }
        }
        else {
            return typeof objectValue == v[1];
        }
    });
}
;
globalThis.testForObjectTypeExtension = testForObjectTypeExtension;
//# sourceMappingURL=testForObjectTypeExtension.js.map