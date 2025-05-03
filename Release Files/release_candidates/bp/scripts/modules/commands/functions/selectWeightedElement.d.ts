export declare function selectWeightedElement<T extends {
    weight?: number;
    [k: string]: any;
}>(items: T[], weightProp?: "weight"): T;
export declare function selectWeightedElement<T extends {
    [k in K]?: number;
} & {
    [k: string]: any;
}, K extends keyof T>(items: T[], weightProp: K): T;
