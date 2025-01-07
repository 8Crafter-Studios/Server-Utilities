/**
 * Asynchronously completes a generator function, yielding values and respecting a maximum time per tick.
 *
 * @template T - The type of values yielded by the generator.
 * @template TReturn - The type of the return value of the generator.
 * @template TNext - The type of the value that can be passed to the generator's `next` method.
 *
 * @param {Generator<T, TReturn, TNext>} g - The generator function to complete.
 * @param {number} [maxTimePerTick=1500] - The maximum time (in milliseconds) to spend on each tick before yielding control back to the system.
 * @param {boolean} [whileConditions=true] - A condition to keep the generator running.
 *
 * @returns {Promise<{ yield: T[]; return: TReturn }>} A promise that resolves with an object containing the yielded values and the return value of the generator.
 */
import { system } from "@minecraft/server";
globalThis.completeGeneratorB = async function completeGeneratorB(g, maxTimePerTick = 1500, whileConditions = true) {
    let lastYieldTime = Date.now();
    var yieldResults = [];
    let returnResult;
    while (whileConditions) {
        const result = g.next();
        if (!result.done) {
            yieldResults.push(result.value);
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
    return { yield: yieldResults, return: returnResult };
};
//# sourceMappingURL=completeGeneratorB.js.map