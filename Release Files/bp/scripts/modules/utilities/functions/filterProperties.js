// type ab<T> = T extends (infer B)[] ? B[] : never;
// type ac<A, T extends LooseAutocompleteB<string | number, PropertyNames<A, string | number>>[]> = T extends (infer B)[] ? B[] : never;
// type ad<A, T extends PropertyNames<T>[]> = T extends [infer a, ...infer _] ? a : never;
// const a: VerifyConstraint<1|{a: 3}|5|"a"|9|{}, string|number> = 1
// function aaaaaaaaaaaaaaaa<T extends Exclude<number, 9>>(numberLiteral: T extends 9 ? never : T){};
// aaaaaaaaaaaaaaaa(6 as const);
/**
 * Recursively filters out a specified property from an object or array of objects.
 *
 * @template {T} T - The type of the object.
 * @template {K extends ((number & PropertyNames<T, number|string>)|(string & (PropertyNames<T, number|string> | `${PropertyNames<T, number|string>}`)))[]} K - The type of the key to remove, which extends a loose autocomplete of string or number.
 *
 * @param {T} obj - The object or array of objects to filter.
 * @param {K} keyToRemove - The key of the property to remove.
 * @param {{useKeysInsteadOfGetOwnPropertyNames?: boolean}} [options] - Optional settings.
 * @param {boolean} [options.useKeysInsteadOfGetOwnPropertyNames] - If true, uses `Object.keys` instead of `Object.getOwnPropertyNames` to get the properties of the object. Defaults to false.
 * @param {boolean} [options.force] - If true, it forces the function to filter the properties of the value passed into the obj parameter, even if it is not an object. Defaults to false.
 * @param {boolean} [options.onlyEnumerable] - If true, it forces the function to only do recursive checking on enumerable properties. Defaults to false.
 * @param {boolean} [options.onlyNonFunctions] - If true, it forces the function to only do recursive checking on non-function properties. Defaults to true.
 * @param {boolean} [options.onlyNonProto] - If true, it forces the function to only do recursive checking on properties that are not in the __proto__ property. Defaults to true.
 *
 * @returns {FilterKey<T, K>} - The filtered object or array of objects without the specified property.
 */
export function filterProperties(obj, keyToRemove, options) {
    if (Array.isArray(obj)) {
        return obj.map((item) => filterProperties(item, keyToRemove, options));
    }
    else if ((options?.force ?? false) || (obj !== null && typeof obj === "object") || typeof obj === "function") {
        return Object[options?.useKeysInsteadOfGetOwnPropertyNames ?? false ? "keys" : "getOwnPropertyNames"](obj).reduce((acc, key) => {
            if (!keyToRemove.includes(key)) {
                let value = undefined;
                if (options?.onlyEnumerable ?? false) {
                    value =
                        Object.getOwnPropertyDescriptor(obj, key)?.enumerable === false
                            ? obj[key]
                            : filterProperties(obj[key], keyToRemove, options);
                }
                else if (options?.onlyNonFunctions ?? true) {
                    value = ["function", "undefined"].includes(typeof obj[key])
                        ? obj[key]
                        : filterProperties(obj[key], keyToRemove, options);
                }
                else if ((options?.onlyNonProto ?? true) && obj?.__proto__ !== undefined) {
                    value = Object.getOwnPropertyDescriptors(obj).hasOwnProperty(key)
                        ? obj[key]
                        : filterProperties(obj[key], keyToRemove, options);
                }
                else {
                    value = filterProperties(obj[key], keyToRemove, options);
                }
                acc[key] = value;
            }
            return acc;
        }, {});
    }
    return obj;
}
export function filterPropertiesB(obj, keyToRemove, options) {
    if (Array.isArray(obj)) {
        return obj.map((item) => filterPropertiesB(item, keyToRemove));
    }
    else if ((options?.force ?? false) || (obj !== null && typeof obj === "object") || typeof obj === "function") {
        return Object[options?.useKeysInsteadOfGetOwnPropertyNames ?? false ? "keys" : "getOwnPropertyNames"](obj).reduce((acc, key) => {
            if (key !== keyToRemove) {
                let value = undefined;
                if (options?.onlyEnumerable ?? false) {
                    value =
                        Object.getOwnPropertyDescriptor(obj, key)?.enumerable === false
                            ? obj[key]
                            : filterPropertiesB(obj[key], keyToRemove);
                }
                else if (options?.onlyNonFunctions ?? true) {
                    value = ["function", "undefined"].includes(typeof obj[key])
                        ? obj[key]
                        : filterPropertiesB(obj[key], keyToRemove);
                }
                else if ((options?.onlyNonProto ?? true) && obj?.__proto__ !== undefined) {
                    value = Object.getOwnPropertyDescriptors(obj).hasOwnProperty(key)
                        ? obj[key]
                        : filterPropertiesB(obj[key], keyToRemove);
                }
                else {
                    value = filterPropertiesB(obj[key], keyToRemove);
                }
                acc[key] = value;
            }
            return acc;
        }, {});
    }
    return obj;
}
// filterProperties({a: 1, bb: 2, c: {a: 1, bb: 2, 1: 3}}, "a").c;
//# sourceMappingURL=filterProperties.js.map