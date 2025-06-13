import { Dimension, BlockType, system, UnloadedChunksError, BlockPermutation, BlockTypes } from "@minecraft/server";
import { clearContainer } from "modules/command_utilities/functions/clearContainer";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
import { generateFillBG } from "modules/coordinates/functions/generateFillBG";
import { generatorProgressIdGenerator } from "modules/coordinates/functions/generatorProgressIdGenerator";
/**
 * Generates a fill.
 * @deprecated Legacy function. Superceeded by {@link fillBlocksHFGB}.
 * @async
 * @param {Vector3} begin The location of a corner of the area to fill in.
 * @param {Vector3} end The location of the opposite corner of the area to fill in.
 * @param {Dimension} dimension The dimension to generate the fill in.
 * @param block A string representing the block type to generate or a function to determine the BlockType to generate.
 * @param {Record<string, string | number | boolean>} blockStates The block states of the block permutation to generate.
 * @param options Optional extra options for the fill generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param {string} placeholderid The namespaced id of the block type to use as a placeholder block during generation.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the fill generation.
 * @returns A promise that resolves with the details of the fill generation once the fill generation is complete.
 */
export async function fillBlocksHFG(begin, end, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    if (typeof block == "function") {
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
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
                            ?.setType(block(v, index));
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
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    try {
                        v.dimension
                            .getBlock(v)
                            ?.setType(block(v, index));
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
            let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
            let currentBlock = undefined;
            if (replacemode) {
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    currentBlock = block(v, index);
                    if (!!options?.matchingBlockStates
                        ? BlockTypes.get(options?.matchingBlock) ==
                            v.dimension.getBlock(v)?.type &&
                            matchingblockb.getAllStates() ==
                                Object.fromEntries(Object.entries(Object.assign(v.dimension
                                    .getBlock(v)
                                    ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(BlockPermutation.resolve(currentBlock.id).getAllStates()).find((s) => v[0] == s[0])))
                        : BlockTypes.get(options?.matchingBlock) ==
                            v.dimension.getBlock(v)?.type) {
                        try {
                            v.dimension
                                .getBlock(v)
                                ?.setType(currentBlock);
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
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v, index) => {
                    currentBlock = block(v, index);
                    if (!!v.dimension
                        .getBlock(v)
                        ?.getComponent("inventory")) {
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
                                    ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(BlockPermutation.resolve(currentBlock.id).getAllStates()).find((s) => v[0] == s[0])))
                        : BlockTypes.get(options?.matchingBlock) ==
                            v.dimension.getBlock(v)?.type) {
                        try {
                            v.dimension
                                .getBlock(v)
                                ?.setType(currentBlock);
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
    }
    else {
        let blockb = BlockPermutation.resolve(block, blockStates);
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
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
                            generatorProgress[id].containsUnloadedChunks = true;
                        }
                    }
                }, undefined, integrity));
            }
            else {
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
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
                }, undefined, integrity));
            }
        }
        else {
            let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
            if (replacemode) {
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
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
                            v.dimension
                                .getBlock(v)
                                ?.setPermutation(blockb);
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
                system.runJob(generateFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    if (!!v.dimension
                        .getBlock(v)
                        ?.getComponent("inventory")) {
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
                            v.dimension
                                .getBlock(v)
                                ?.setPermutation(blockb);
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
//# sourceMappingURL=fillBlocksHFG.js.map