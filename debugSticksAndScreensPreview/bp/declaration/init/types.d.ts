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
export type Split<S extends string> = S extends '' ? [] : S extends `${infer C}${infer R}` ? [C, ...Split<R>] : never;
export type TakeFirstNElements<T extends any[], N extends number, Result extends any[] = []> = Result['length'] extends N ? Result : T extends [infer First, ...infer Rest] ? TakeFirstNElements<Rest, N, [...Result, First]> : Result;
export type Join<T extends string[]> = T extends [] ? '' : T extends [infer Head, ...infer Tail] ? Head extends string ? `${Head}${Join<Tail extends string[] ? Tail : []>}` : never : never;
export type CutFirstChars<S extends string, N extends number, SArray = TakeFirstNElements<Split<S>, N>> = Join<SArray extends string[] ? SArray : never>;
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
    type LooseAutocomplete<T extends string> = T | Omit<string, T> & string;
    type Split<S extends string> = S extends '' ? [] : S extends `${infer C}${infer R}` ? [C, ...Split<R>] : never;
    type TakeFirstNElements<T extends any[], N extends number, Result extends any[] = []> = Result['length'] extends N ? Result : T extends [infer First, ...infer Rest] ? TakeFirstNElements<Rest, N, [...Result, First]> : Result;
    type Join<T extends string[]> = T extends [] ? '' : T extends [infer Head, ...infer Tail] ? Head extends string ? `${Head}${Join<Tail extends string[] ? Tail : []>}` : never : never;
    type CutFirstChars<S extends string, N extends number, SArray = TakeFirstNElements<Split<S>, N>> = Join<SArray extends string[] ? SArray : never>;
}
