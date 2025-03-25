export declare function assertIsTrue(value: any, key?: string): asserts value is true;
declare global {
    const assertIsTrue: typeof import("./assertIsTrue").assertIsTrue;
}
