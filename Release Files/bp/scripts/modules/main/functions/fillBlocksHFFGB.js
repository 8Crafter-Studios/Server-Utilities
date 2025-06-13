import { Dimension, system, LocationInUnloadedChunkError } from "@minecraft/server";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
import { generateFillBG } from "modules/coordinates/functions/generateFillBG";
import { generatorProgressIdGenerator } from "modules/coordinates/functions/generatorProgressIdGenerator";
/**
 * Generates a flood fill.
 * @deprecated Legacy function. Superceeded by {@link fillFlood}.
 * @async
 * @param {Vector3} begin The location of a corner of the area to flood.
 * @param {Vector3} end The location of the opposite corner of the area to flood.
 * @param {Dimension} dimension The dimension to generate the flood fill in.
 * @param options Optional extra options for the fill generation execution.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param integrity The integrity of the flood fill generation.
 * @returns A promise that resolves with the details of the flood fill generation once the flood fill generation is complete.
 */
export async function fillBlocksHFFGB(begin, end, dimension, options, integrity = 100) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
        try {
            if (v.dimension.getBlock(v)?.typeId == "minecraft:air") {
                v.dimension.getBlock(v)?.setType("minecraft:water");
                counter++;
            }
            else if (v.dimension.getBlock(v)?.canContainLiquid(modules.mcServer.LiquidType.Water) == true &&
                !v.dimension.getBlock(v)?.isWaterlogged) {
                v.dimension.getBlock(v)?.setWaterlogged(true);
                counter++;
            }
        }
        catch (e) {
            if (e instanceof TypeError ||
                e instanceof LocationInUnloadedChunkError) {
                generatorProgress[id].containsUnloadedChunks = true;
            }
        }
    }, undefined, integrity));
    return new Promise((resolve, reject) => {
        function a() {
            if (generatorProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generatorProgress[id];
                delete generatorProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
//# sourceMappingURL=fillBlocksHFFGB.js.map