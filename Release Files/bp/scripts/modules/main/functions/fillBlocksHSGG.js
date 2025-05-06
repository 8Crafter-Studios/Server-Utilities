import { Dimension, BlockPermutation, system, UnloadedChunksError, BlockTypes } from "@minecraft/server";
import { clearContainer } from "modules/command_utilities/functions/clearContainer";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
import { generateSkygridBG } from "modules/coordinates/functions/generateSkygridBG";
import { generatorProgressIdGenerator } from "modules/coordinates/functions/generatorProgressIdGenerator";
/**
 * Generates a skygrid.
 * @deprecated Legacy function. Superceeded by {@link fillBlocksHSGGB}.
 * @async
 * @param {Vector3} from The location of a corner of the area to generate the skygrid in.
 * @param {Vector3} to The location of the opposite corner of the area to generate the skygrid in.
 * @param {number} skygridSize The size of the skygrid.
 * @param {Dimension} dimension The dimension to generate the skygrid in.
 * @param {string} block The block type of the BlockPermutation to generate.
 * @param {Record<string, string | number | boolean>} blockStates The block states of the BlockPermutation to generate.
 * @param {FillOptions2} options Optional extra options for the inverse skygrid generation execution.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the skygrid generation.
 * @returns A promise that resolves with the details of the skygrid generation once the skygrid generation is complete.
 */
export async function fillBlocksHSGG(from, to, skygridSize, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    const id = generatorProgressIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v) => {
                try {
                    if (!!v.dimension
                        .getBlock(v)
                        .getComponent("inventory")) {
                        clearContainer(v.dimension
                            .getBlock(v)
                            .getComponent("inventory").container);
                    }
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError ||
                        e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks =
                            true;
                    }
                }
            }, {
                integrity,
                minMSBetweenYields: options?.minMSBetweenYields ?? config.system.defaultMinMSBetweenTickWaits,
            }));
        }
        else {
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v) => {
                try {
                    v.dimension.getBlock(v).setPermutation(blockb);
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError ||
                        e instanceof UnloadedChunksError) {
                        generatorProgress[id].containsUnloadedChunks =
                            true;
                    }
                }
            }, {
                integrity,
                minMSBetweenYields: options?.minMSBetweenYields ?? config.system.defaultMinMSBetweenTickWaits,
            }));
        }
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        if (replacemode) {
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v) => {
                if (!!options?.matchingBlockStates
                    ? BlockTypes.get(options?.matchingBlock) ==
                        v.dimension.getBlock(v).type &&
                        matchingblockb.getAllStates() ==
                            Object.fromEntries(Object.entries(Object.assign(v.dimension
                                .getBlock(v)
                                ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(blockb.getAllStates()).find((s) => v[0] == s[0])))
                    : BlockTypes.get(options?.matchingBlock) ==
                        v.dimension.getBlock(v).type) {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError ||
                            e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }
            }, {
                integrity,
                minMSBetweenYields: options?.minMSBetweenYields ?? config.system.defaultMinMSBetweenTickWaits,
            }));
        }
        else {
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v) => {
                if (!!v.dimension.getBlock(v).getComponent("inventory")) {
                    clearContainer(v.dimension
                        .getBlock(v)
                        .getComponent("inventory").container);
                }
                if (!!options?.matchingBlockStates
                    ? BlockTypes.get(options?.matchingBlock) ==
                        v.dimension.getBlock(v).type &&
                        matchingblockb.getAllStates() ==
                            Object.fromEntries(Object.entries(Object.assign(v.dimension
                                .getBlock(v)
                                ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(blockb.getAllStates()).find((s) => v[0] == s[0])))
                    : BlockTypes.get(options?.matchingBlock) ==
                        v.dimension.getBlock(v).type) {
                    try {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
                    catch (e) {
                        if (e instanceof TypeError ||
                            e instanceof UnloadedChunksError) {
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }
            }, {
                integrity,
                minMSBetweenYields: options?.minMSBetweenYields ?? config.system.defaultMinMSBetweenTickWaits,
            }));
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
//# sourceMappingURL=fillBlocksHSGG.js.map