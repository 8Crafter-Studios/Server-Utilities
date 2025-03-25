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
export declare function testForObjectExtension(objectToTest: object, base: object): boolean;
declare global {
    namespace globalThis {
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
        function testForObjectExtension(objectToTest: object, base: object): boolean;
    }
}
