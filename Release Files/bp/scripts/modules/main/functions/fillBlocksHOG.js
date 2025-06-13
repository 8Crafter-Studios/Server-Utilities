import { Dimension, BlockPermutation, system, UnloadedChunksError, BlockTypes } from "@minecraft/server";
import { clearContainer } from "modules/command_utilities/functions/clearContainer";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
import { generateSolidOvoidBG } from "modules/coordinates/functions/generateSolidOvoidBG";
import { generatorProgressIdGenerator } from "modules/coordinates/functions/generatorProgressIdGenerator";
/**
 * @todo Make the new updated version of this function and then deprecate this one.
 */
export async function fillBlocksHOG(center, radius, offset, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    const id = generatorProgressIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateSolidOvoidBG(center, radius, offset, id, dimension, (v) => {
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
            }, {
                integrity,
                minMSBetweenYields: options?.minMSBetweenYields ?? config.system.defaultMinMSBetweenTickWaits,
            }));
        }
        else {
            system.runJob(generateSolidOvoidBG(center, radius, offset, id, dimension, (v) => {
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
            }, {
                integrity,
                minMSBetweenYields: options?.minMSBetweenYields ?? config.system.defaultMinMSBetweenTickWaits,
            }));
        }
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        if (replacemode) {
            system.runJob(generateSolidOvoidBG(center, radius, offset, id, dimension, (v) => {
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
            }, {
                integrity,
                minMSBetweenYields: options?.minMSBetweenYields ?? config.system.defaultMinMSBetweenTickWaits,
            }));
        }
        else {
            system.runJob(generateSolidOvoidBG(center, radius, offset, id, dimension, (v) => {
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
//# sourceMappingURL=fillBlocksHOG.js.map