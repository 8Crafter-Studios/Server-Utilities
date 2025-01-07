import { system } from "@minecraft/server";
globalThis.iterateGenerator = function iterateGenerator(extractorGenerator, maxTimePerTick = 1500, whileConditions = true) {
    let lastYieldTime = Date.now(); // Initialize the last yield time
    async function iterateGeneratorB(extractorGenerator, lastYieldTime) {
        let finalResult;
        while (whileConditions) {
            const result = extractorGenerator.next();
            finalResult = result.value;
            if (!result.done) {
                // console.log(result.value); // Handle the yielded value
                if (Date.now() - lastYieldTime >= maxTimePerTick) {
                    lastYieldTime = Date.now();
                    await new Promise((resolve) => system.run(() => resolve(void null))); // Asynchronously wait for next iteration
                }
            }
            else {
                break;
            }
        }
        return finalResult;
    }
    return iterateGeneratorB(extractorGenerator, lastYieldTime);
};
//# sourceMappingURL=iterateGenerator.js.map