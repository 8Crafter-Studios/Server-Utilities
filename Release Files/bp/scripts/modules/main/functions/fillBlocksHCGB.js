import { Dimension, BlockPermutation, system } from "@minecraft/server";
import { clearContainer } from "modules/command_utilities/functions/clearContainer";
import { testBlockForMatch } from "modules/commands/functions/testBlockForMatch";
import { generateMinecraftSphereBGProgress } from "modules/coordinates/constants/generateMinecraftSphereBGProgress";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
import { generateMinecraftConeBG } from "modules/coordinates/functions/generateMinecraftConeBG";
import { generateMinecraftSphereBGIdGenerator } from "modules/coordinates/functions/generateMinecraftSphereBGIdGenerator";
/**
 * Generates a cone.
 * @deprecated Legacy function. Superceeded by {@link fillCone}.
 * @since 1.18.0-development.20
 * @version 1.0.0
 * @param {Vector3} center The location of the bottom center of the cone.
 * @param {number} radius Radius of the cone.
 * @param {number} height Height of the cone.
 * @param {Dimension} dimension The dimension to generate the cone in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the cone generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the cone generation.
 * @returns A promise that resolves with the details of the cone generation once the cone generation is complete.
 */
export async function fillBlocksHCGB(center, radius, height, dimension, block, options, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generateMinecraftSphereBGIdGenerator();
    if (!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateMinecraftConeBG(center, radius, height, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    if (!!v.dimension
                        .getBlock(v)
                        ?.getComponent("inventory")) {
                        clearContainer(v.dimension
                            .getBlock(v)
                            ?.getComponent("inventory")?.container);
                    }
                    v.dimension
                        .getBlock(v)
                        ?.setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks =
                            true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateMinecraftConeBG(center, radius, height, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    v.dimension
                        .getBlock(v)
                        ?.setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks =
                            true;
                    }
                }
            }, undefined, integrity));
        }
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        if (replacemode) {
            system.runJob(generateMinecraftConeBG(center, radius, height, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    if (!!options?.matchingBlockStates
                        ? testBlockForMatch(v.dimension.getBlock(v), {
                            id: options?.matchingBlock,
                            states: options?.matchingBlockStates,
                        })
                        : options?.matchingBlock ==
                            v.dimension.getBlock(v)?.typeId) {
                        if (!!v.dimension
                            .getBlock(v)
                            ?.getComponent("inventory")) {
                            clearContainer(v.dimension
                                .getBlock(v)
                                ?.getComponent("inventory")?.container);
                        }
                        v.dimension
                            .getBlock(v)
                            ?.setPermutation(block(v, index));
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks =
                            true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateMinecraftConeBG(center, radius, height, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                try {
                    if (!!v.dimension
                        .getBlock(v)
                        ?.getComponent("inventory")) {
                        clearContainer(v.dimension
                            .getBlock(v)
                            ?.getComponent("inventory")?.container);
                    }
                    if (!!options?.matchingBlockStates
                        ? testBlockForMatch(v.dimension.getBlock(v), {
                            id: options?.matchingBlock,
                            states: options?.matchingBlockStates,
                        })
                        : options?.matchingBlock ==
                            v.dimension.getBlock(v)?.typeId) {
                        v.dimension
                            .getBlock(v)
                            ?.setPermutation(block(v, index));
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError) {
                        generatorProgress[id].containsUnloadedChunks =
                            true;
                    }
                }
            }, undefined, integrity));
        }
    }
    return new Promise((resolve, reject) => {
        function a() {
            if (generateMinecraftSphereBGProgress[id]?.done !== true) {
                system.run(() => {
                    a();
                });
            }
            else {
                let returns = generateMinecraftSphereBGProgress[id];
                delete generateMinecraftSphereBGProgress[id];
                resolve({ counter: counter, completionData: returns });
            }
        }
        a();
    });
}
//# sourceMappingURL=fillBlocksHCGB.js.map