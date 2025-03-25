import type { flagsMatcherTextA } from "./flagsMatcherTextA";
export type flagsMatcherTextB<T extends string> = T extends flagsMatcherTextA ? T : T extends `${flagsMatcherTextA}${infer R}` ? flagsMatcherTextB<R> : never;
