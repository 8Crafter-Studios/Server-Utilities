export declare function assertIsDefined<T>(value: T): asserts value is NonNullable<T>;
declare global {
    const assertIsDefined: typeof import("./assertIsDefined").assertIsDefined;
}
