import "init/meta/importToMakeValidModule";
/**
 * Tests whether all properties and their values in the `base` object
 * are present in the `objectToTest` object.
 *
 * @param objectToTest - The object to be tested.
 * @param base - The base object containing properties and values to test against.
 * @returns `true` if all properties and values in `base` are present in `objectToTest`, otherwise `false`.
 *
 * @example
 * const obj1 = { a: 1, b: 2, c: 3 };
 * const obj2 = { a: 1, b: 2 };
 * console.log(testForObjectExtension(obj1, obj2)); // true
 *
 * @example
 * const obj3 = { a: 1, b: 2 };
 * const obj4 = { a: 1, b: 3 };
 * console.log(testForObjectExtension(obj3, obj4)); // false
 *
 * @example
 * const obj5 = { a: 1, b: 2 };
 * const obj6 = { a: 1, b: 2, c: 3 };
 * console.log(testForObjectExtension(obj5, obj6)); // false
 */
export function testForObjectExtension(objectToTest, base) {
    return Object.entries(base).every((v) => Object.keys(objectToTest).includes(v[0])
        ? Object.entries(objectToTest).find((c) => c[0] == v[0])[1] == v[1]
        : false);
}
;
globalThis.testForObjectExtension = testForObjectExtension;
//# sourceMappingURL=testForObjectExtension.js.map