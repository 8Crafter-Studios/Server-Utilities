export type FilterKey<T, K extends (keyof any)[] | keyof any> = {
    [P in keyof T as K extends (keyof any)[] ? P extends number ? `${P}` extends `${VerifyConstraint<K[number], string | number>}` ? never : P : P extends (K[number] extends number ? `${K[number]}` : K[number]) ? never : P : P extends number ? `${P}` extends `${VerifyConstraint<K, string | number>}` ? never : P : P extends (K extends number ? `${K}` : K) ? never : P]: T[P] extends object ? (T[P] extends (...args: any[]) => any ? T[P] : FilterKey<T[P], K>) : T[P];
};
export type ReplaceTypeOfKey<T, K extends (keyof any)[] | keyof any, U> = {
    [P in keyof T]: K extends (keyof any)[] ? P extends number ? `${P}` extends `${VerifyConstraint<K[number], string | number>}` ? U : T[P] extends object ? T[P] extends (...args: any[]) => any ? T[P] : ReplaceTypeOfKey<T[P], K, U> : T[P] : P extends (K[number] extends number ? `${K[number]}` : K[number]) ? U : T[P] extends object ? T[P] extends (...args: any[]) => any ? T[P] : ReplaceTypeOfKey<T[P], K, U> : T[P] : P extends number ? `${P}` extends `${VerifyConstraint<K, string | number>}` ? U : T[P] extends object ? T[P] extends (...args: any[]) => any ? T[P] : ReplaceTypeOfKey<T[P], K, U> : T[P] : P extends (K extends number ? `${K}` : K) ? U : T[P] extends object ? T[P] extends (...args: any[]) => any ? T[P] : ReplaceTypeOfKey<T[P], K, U> : T[P];
};
export type PropertyNamesWithPath<T> = T extends object ? {
    [K in string & keyof T]: T[K] extends Date | undefined ? K : T[K] extends Array<infer A> | undefined ? K | `${K & string}.${PropertyNamesWithPath<A>}` : K | `${K & string}.${PropertyNamesWithPath<T[K]>}`;
}[string & keyof T] : never;
export type PropertyNamesInner<T, U = keyof T> = T extends object ? {
    [K in U & keyof T]: T[K] extends Date | undefined ? K : T[K] extends Array<infer A> | undefined ? K | PropertyNamesInner<A> : K | PropertyNamesInner<T[K]>;
}[U & keyof T] : never;
export type PropertyNames<T, U = string | number> = VerifyConstraint<PropertyNamesInner<T, U>, U>;
export type VerifyConstraint<T, U> = T extends U ? T : never;
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
export declare function filterProperties<T, K extends ((number & PropertyNames<T, number | string>) | (string & (PropertyNames<T, number | string> | `${PropertyNames<T, number | string>}`)))[]>(obj: T, keyToRemove: K, options?: {
    useKeysInsteadOfGetOwnPropertyNames?: boolean;
    force?: boolean;
    onlyEnumerable?: boolean;
    onlyNonFunctions?: boolean;
    onlyNonProto?: boolean;
}): FilterKey<T, K>;
export declare function filterPropertiesB<T, K extends LooseAutocompleteB<string | number, PropertyNames<T>>>(obj: T, keyToRemove: K, options?: {
    useKeysInsteadOfGetOwnPropertyNames?: boolean;
    force?: boolean;
    onlyEnumerable?: boolean;
    onlyNonFunctions?: boolean;
    onlyNonProto?: boolean;
}): FilterKey<T, K>;
