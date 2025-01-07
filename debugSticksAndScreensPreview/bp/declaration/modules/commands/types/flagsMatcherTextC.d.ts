import type { flagsMatcherTextA } from "./flagsMatcherTextA";
export type flagsMatcherTextC<T extends string> = T extends flagsMatcherTextA ? string : T extends `${flagsMatcherTextA}${infer R}` ? flagsMatcherTextC<R> : never;
