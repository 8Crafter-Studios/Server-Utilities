/**
 * Selects a weighted random element from an array.
 *
 * @template T The type of the array.
 * @param {T[]} items The array of items to select from.
 * @param {string} [weightProp="weight"] The property to use as the weight.
 * @returns {T} The selected item.
 */
export declare function selectWeightedElement<T extends {
    weight?: number;
    [k: string]: any;
}>(items: T[], weightProp?: "weight"): T;
export declare function selectWeightedElement<T extends {
    [k in K]?: number;
} & {
    [k: string]: any;
}, K extends keyof T>(items: T[], weightProp: K): T;
