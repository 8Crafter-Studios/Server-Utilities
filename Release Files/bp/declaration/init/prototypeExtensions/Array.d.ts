export declare const exports_5603749806156139082470132985463298047098135609812364098: undefined;
declare global {
    interface Array<T> {
        /**
         * Performs the specified action for each element in an array and will include the current index in any errors.
         * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
         * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        forEachB(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        /**
         * Calls a defined async callback function on each element of an array, and returns an array that contains the awaited results.
         * @param callbackfn An async function that accepts up to three arguments. The map method calls and awaits the completion of the async callbackfn function one time for each element in the array.
         * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         * @async
         */
        mapAsync<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): Promise<Awaited<U>[]>;
        /**
         * Awaits each element in the array.
         * @returns {Promise<Awaited<T>[]>} The awaited array elements.
         * @async
         */
        awaitEach(): Promise<Awaited<T>[]>;
        /**
         * Returns a random element from the array.
         * @returns {T[number]} The random element.
         */
        randomElement(): T;
    }
}
