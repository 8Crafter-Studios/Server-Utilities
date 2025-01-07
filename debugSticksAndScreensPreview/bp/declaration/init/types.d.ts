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
}
