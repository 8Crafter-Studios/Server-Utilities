import { Dimension, BlockPermutation, system, UnloadedChunksError, BlockTypes } from "@minecraft/server";
import { clearContainer } from "modules/command_utilities/functions/clearContainer";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
import { generateHollowSphereBG } from "modules/coordinates/functions/generateHollowSphereBG";
import { generatorProgressIdGenerator } from "modules/coordinates/functions/generatorProgressIdGenerator";
/**
 * Generates a hollow sphere.
 * @deprecated Legacy function. Superceeded by {@link fillBlocksHHSGB}.
 * @async
 * @param {Vector3} center The location of the center of the hollow sphere.
 * @param {number} radius Radius of the hollow sphere.
 * @param {number} thickness Thickness of the hollow sphere.
 * @param {Dimension} dimension The dimension to generate the hollow sphere in.
 * @param {string} block The block type of the block permutation to generate.
 * @param {Record<string, string | number | boolean>} blockStates The block states of the block permutation to generate.
 * @param options Optional extra options for the sphere generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param {string} placeholderid The namespaced id of the block type to use as a placeholder block during generation.
 * @param {boolean} replacemode Whether or not to clear container blocks before replacing them.
 * @param {number} integrity The integrity of the hollow sphere generation.
 * @returns A promise that resolves with the details of the hollow sphere generation once the hollow sphere generation is complete.
 */
export async function fillBlocksHHSG(center, radius, thickness, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    const id = generatorProgressIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                try {
                    if (!!v.dimension
                        .getBlock(v)
                        ?.getComponent("inventory")) {
                        clearContainer(v.dimension
                            .getBlock(v)
                            ?.getComponent("inventory")?.container);
                    }
                    v.dimension.getBlock(v)?.setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError ||
                        e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks =
                            true;
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                try {
                    v.dimension.getBlock(v)?.setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError ||
                        e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks =
                            true;
                    }
                }
            }, undefined, integrity));
        }
    }
    else {
        let blockb = BlockPermutation.resolve(block, blockStates);
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        if (replacemode) {
            system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                if (!!options?.matchingBlockStates
                    ? BlockTypes.get(options?.matchingBlock) ==
                        v.dimension.getBlock(v)?.type &&
                        matchingblockb.getAllStates() ==
                            Object.fromEntries(Object.entries(Object.assign(v.dimension
                                .getBlock(v)
                                ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(blockb.getAllStates()).find((s) => v[0] == s[0])))
                    : BlockTypes.get(options?.matchingBlock) ==
                        v.dimension.getBlock(v)?.type) {
                    try {
                        v.dimension.getBlock(v)?.setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError ||
                            e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }
            }, undefined, integrity));
        }
        else {
            system.runJob(generateHollowSphereBG(center, radius, thickness, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                if (!!v.dimension.getBlock(v)?.getComponent("inventory")) {
                    clearContainer(v.dimension
                        .getBlock(v)
                        ?.getComponent("inventory")?.container);
                }
                if (!!options?.matchingBlockStates
                    ? BlockTypes.get(options?.matchingBlock) ==
                        v.dimension.getBlock(v)?.type &&
                        matchingblockb.getAllStates() ==
                            Object.fromEntries(Object.entries(Object.assign(v.dimension
                                .getBlock(v)
                                ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(blockb.getAllStates()).find((s) => v[0] == s[0])))
                    : BlockTypes.get(options?.matchingBlock) ==
                        v.dimension.getBlock(v)?.type) {
                    try {
                        v.dimension.getBlock(v)?.setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError ||
                            e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }
            }, undefined, integrity));
        }
    }
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
//# sourceMappingURL=fillBlocksHHSG.js.map