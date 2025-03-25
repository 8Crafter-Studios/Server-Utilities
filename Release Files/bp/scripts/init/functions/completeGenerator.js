/**
 * Asynchronously completes a generator function, yielding control back to the system
 * if the execution time exceeds a specified limit per tick.
 *
 * @template T - The type of the yielded values.
 * @template TReturn - The type of the return value.
 * @template TNext - The type of the next value.
 * @param {Generator<T, TReturn, TNext>} g - The generator function to complete.
 * @param {number} [maxTimePerTick=1500] - The maximum time (in milliseconds) to spend on each tick before yielding control back to the system.
 * @param {boolean | number | string | Function} [whileConditions=true] - The condition to continue running the generator. Can be a boolean, number, string, or function.
 * @returns {Promise<{ yield: T; return: TReturn }>} A promise that resolves with the final yielded value and the return value of the generator.
 */
import { system } from "@minecraft/server";
globalThis.completeGenerator = async function completeGenerator(g, maxTimePerTick = 1500, whileConditions = true) {
    let lastYieldTime = Date.now(); // Initialize the last yield time
    let finalResult;
    let returnResult;
    while (whileConditions) {
        const result = g.next();
        if (!result.done) {
            finalResult = result.value;
            if (Date.now() - lastYieldTime >= maxTimePerTick) {
                lastYieldTime = Date.now();
                await new Promise((resolve) => system.run(() => resolve(void null)));
            }
        }
        else {
            returnResult = result.value;
            break;
        }
    }
    return { yield: finalResult, return: returnResult };
};
//# sourceMappingURL=completeGenerator.js.map