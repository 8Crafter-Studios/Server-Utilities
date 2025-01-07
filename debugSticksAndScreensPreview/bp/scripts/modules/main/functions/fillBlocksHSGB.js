import { Dimension, BlockPermutation, system, UnloadedChunksError } from "@minecraft/server";
import { clearContainer } from "modules/command_utilities/functions/clearContainer";
import { testBlockForMatch } from "modules/commands/functions/testBlockForMatch";
import { generateMinecraftSphereBGProgress } from "modules/coordinates/constants/generateMinecraftSphereBGProgress";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
import { generateMinecraftSphereBG } from "modules/coordinates/functions/generateMinecraftSphereBG";
import { generateMinecraftSphereBGIdGenerator } from "modules/coordinates/functions/generateMinecraftSphereBGIdGenerator";
/**
 * Generates a sphere.
 * @since 1.18.0-development.26
 * @version 1.0.0
 * @param {Vector3} center The location of the center of the sphere.
 * @param {number} radius Radius of the sphere.
 * @param {Dimension} dimension The dimension to generate the sphere in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the sphere generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param {boolean} replacemode Whether or not to clear container blocks before replacing them.
 * @param {number} integrity The integrity of the sphere generation.
 * @returns A promise that resolves with the details of the sphere generation once the sphere generation is complete.
 */
export async function fillBlocksHSGB(center, radius, dimension, block, options, replacemode = false, integrity = 100) {
    /*console.warn(JSONStringify(drawMinecraftSphere(center, radius, 180).find(v=>Object.values(v).includes(NaN))))*/
    let counter = 0;
    const id = generateMinecraftSphereBGIdGenerator();
    if (options?.verifyBlockActuallyChanged ?? false) {
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        const currentBlock = block(v, index);
                        if (v.dimension.getBlock(v).permutation ==
                            currentBlock) {
                            if (!!v.dimension
                                .getBlock(v)
                                .getComponent("inventory")) {
                                clearContainer(v.dimension
                                    .getBlock(v)
                                    .getComponent("inventory")
                                    .container);
                            }
                            v.dimension
                                .getBlock(v)
                                .setPermutation(currentBlock);
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError ||
                            e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        const currentBlock = block(v, index);
                        if (v.dimension.getBlock(v).permutation ==
                            currentBlock) {
                            v.dimension
                                .getBlock(v)
                                .setPermutation(currentBlock);
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError ||
                            e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            if (replacemode) {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if (!!options?.matchingBlockStates
                            ? testBlockForMatch(v.dimension.getBlock(v), {
                                id: options?.matchingBlock,
                                states: options?.matchingBlockStates,
                            })
                            : options?.matchingBlock ==
                                v.dimension.getBlock(v).typeId) {
                            if (!!v.dimension
                                .getBlock(v)
                                .getComponent("inventory")) {
                                clearContainer(v.dimension
                                    .getBlock(v)
                                    .getComponent("inventory")
                                    .container);
                            }
                            v.dimension
                                .getBlock(v)
                                .setPermutation(block(v, index));
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError ||
                            e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if (!!options?.matchingBlockStates
                            ? testBlockForMatch(v.dimension.getBlock(v), {
                                id: options?.matchingBlock,
                                states: options?.matchingBlockStates,
                            })
                            : options?.matchingBlock ==
                                v.dimension.getBlock(v).typeId) {
                            v.dimension
                                .getBlock(v)
                                .setPermutation(block(v, index));
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError ||
                            e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
    }
    else {
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if (!!v.dimension
                            .getBlock(v)
                            .getComponent("inventory")) {
                            clearContainer(v.dimension
                                .getBlock(v)
                                .getComponent("inventory").container);
                        }
                        v.dimension
                            .getBlock(v)
                            .setPermutation(block(v, index));
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError ||
                            e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        v.dimension
                            .getBlock(v)
                            .setPermutation(block(v, index));
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError ||
                            e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
        }
        else {
            if (replacemode) {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if (!!options?.matchingBlockStates
                            ? testBlockForMatch(v.dimension.getBlock(v), {
                                id: options?.matchingBlock,
                                states: options?.matchingBlockStates,
                            })
                            : options?.matchingBlock ==
                                v.dimension.getBlock(v).typeId) {
                            if (!!v.dimension
                                .getBlock(v)
                                .getComponent("inventory")) {
                                clearContainer(v.dimension
                                    .getBlock(v)
                                    .getComponent("inventory")
                                    .container);
                            }
                            v.dimension
                                .getBlock(v)
                                .setPermutation(block(v, index));
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError ||
                            e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateMinecraftSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        if (!!options?.matchingBlockStates
                            ? testBlockForMatch(v.dimension.getBlock(v), {
                                id: options?.matchingBlock,
                                states: options?.matchingBlockStates,
                            })
                            : options?.matchingBlock ==
                                v.dimension.getBlock(v).typeId) {
                            v.dimension
                                .getBlock(v)
                                .setPermutation(block(v, index));
                            counter++;
                        }
                    }
                    catch (e) {
                        if (e instanceof TypeError ||
                            e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
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
//# sourceMappingURL=fillBlocksHSGB.js.map