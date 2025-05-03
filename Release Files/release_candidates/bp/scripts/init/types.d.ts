export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
export type MutableRequired<T> = {
    -readonly [P in keyof T]-?: T[P];
};
export type ReadonlyPartial<T> = {
    +readonly [P in keyof T]+?: T[P];
};
export type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;
export type PushFront<TailT extends any[], HeadT> = ((head: HeadT, ...tail: TailT) => void) extends (...arr: infer ArrT) => void ? ArrT : never;
export type NoRepetition<U extends string, ResultT extends any[] = []> = ResultT | {
    [k in U]: NoRepetition<Exclude<U, k>, [k, ...ResultT]>;
}[U];
export type LooseAutocomplete<T extends string> = T | Omit<string, T>;
export type LooseAutocompleteB<U extends string | number | symbol, T extends U> = T | Omit<U, T>;
export type Split<S extends string> = S extends "" ? [] : S extends `${infer C}${infer R}` ? [C, ...Split<R>] : never;
export type TakeFirstNElements<T extends any[], N extends number, Result extends any[] = []> = Result["length"] extends N ? Result : T extends [infer First, ...infer Rest] ? TakeFirstNElements<Rest, N, [...Result, First]> : Result;
export type Join<T extends string[]> = T extends [] ? "" : T extends [infer Head, ...infer Tail] ? Head extends string ? `${Head}${Join<Tail extends string[] ? Tail : []>}` : never : never;
export type CutFirstChars<S extends string, N extends number, SArray = TakeFirstNElements<Split<S>, N>> = Join<SArray extends string[] ? SArray : never>;
export type Full<T> = {
    [P in keyof T]-?: T[P];
};
export type ReadonlyDeep<T> = {
    readonly [P in keyof T]: ReadonlyDeep<T[P]>;
};
export type MutableDeep<T> = {
    -readonly [P in keyof T]: MutableDeep<T[P]>;
};
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
export type KeysOfUnion<T> = T extends T ? keyof T : never;
export type ValueTypes<T> = T extends {
    [key: string]: infer U;
} ? U : never;
export type test1a = [name: number, id: `ID:${number}`, hi: "text"];
declare global {
    type Mutable<T> = {
        -readonly [P in keyof T]: T[P];
    };
    type MutableRequired<T> = {
        -readonly [P in keyof T]-?: T[P];
    };
    type ReadonlyPartial<T> = {
        +readonly [P in keyof T]+?: T[P];
    };
    type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;
    type test1a = [name: number, id: `ID:${number}`, hi: "text"];
    type PushFront<TailT extends any[], HeadT> = ((head: HeadT, ...tail: TailT) => void) extends (...arr: infer ArrT) => void ? ArrT : never;
    type NoRepetition<U extends string, ResultT extends any[] = []> = ResultT | {
        [k in U]: NoRepetition<Exclude<U, k>, [k, ...ResultT]>;
    }[U];
    type LooseAutocomplete<T extends string> = T | (Omit<string, T> & string);
    type LooseAutocompleteB<U extends string | number | symbol, T extends U> = T | (Omit<U, T> & U);
    type Split<S extends string> = S extends "" ? [] : S extends `${infer C}${infer R}` ? [C, ...Split<R>] : never;
    type TakeFirstNElements<T extends any[], N extends number, Result extends any[] = []> = Result["length"] extends N ? Result : T extends [infer First, ...infer Rest] ? TakeFirstNElements<Rest, N, [...Result, First]> : Result;
    type Join<T extends string[]> = T extends [] ? "" : T extends [infer Head, ...infer Tail] ? Head extends string ? `${Head}${Join<Tail extends string[] ? Tail : []>}` : never : never;
    type CutFirstChars<S extends string, N extends number, SArray = TakeFirstNElements<Split<S>, N>> = Join<SArray extends string[] ? SArray : never>;
    type Full<T> = {
        [P in keyof T]-?: T[P];
    };
    type ReadonlyDeep<T> = {
        readonly [P in keyof T]: ReadonlyDeep<T[P]>;
    };
    type MutableDeep<T> = {
        -readonly [P in keyof T]: MutableDeep<T[P]>;
    };
    export type DeepPartial<T> = T extends object ? {
        [P in keyof T]?: DeepPartial<T[P]>;
    } : T;
    type KeysOfUnion<T> = T extends T ? keyof T : never;
    type ValueTypes<T> = T extends {
        [key: string]: infer U;
    } ? U : never;
    type AllValues<T> = T extends {
        [key: string]: infer V;
    } ? V : never;
    type KeyValuePairs<T> = {
        [K in KeysOfUnion<T>]: AllValues<Extract<T, Record<K, any>>>;
    };
    /**
     * @see https://stackoverflow.com/a/58986589
     * @author jcalz <https://stackoverflow.com/users/2887218/jcalz>
     */
    type ExcludeFromTuple<T extends readonly any[], E> = T extends [infer F, ...infer R] ? [F] extends [E] ? ExcludeFromTuple<R, E> : [F, ...ExcludeFromTuple<R, E>] : [];
    type IncludeFromTuple<T extends readonly any[], E> = T extends [infer F, ...infer R] ? [F] extends [E] ? [F, ...IncludeFromTuple<R, E>] : IncludeFromTuple<R, E> : [];
}
