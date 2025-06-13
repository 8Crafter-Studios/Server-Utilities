import { Dimension, BlockType, system, UnloadedChunksError, BlockPermutation, BlockTypes } from "@minecraft/server";
import { clearContainer } from "modules/command_utilities/functions/clearContainer";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
import { generateHollowFillBG } from "modules/coordinates/functions/generateHollowFillBG";
import { generatorProgressIdGenerator } from "modules/coordinates/functions/generatorProgressIdGenerator";
/**
 * @deprecated Legacy function. Superceeded by {@link fillBlocksHHFGB}.
 */
export async function fillBlocksHHG(begin, end, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    if (typeof block == "function") {
        if (!!!options?.matchingBlock) {
            if (replacemode) {
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        if (!!v.dimension
                            .getBlock(v)
                            ?.getComponent("inventory")) {
                            clearContainer(v.dimension
                                .getBlock(v)
                                ?.getComponent("inventory")?.container);
                        }
                        v.dimension.getBlock(v)?.setType(block(v));
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
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    try {
                        v.dimension.getBlock(v)?.setType(block(v));
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
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    currentBlock = block(v);
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
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                    currentBlock = block(v);
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
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
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
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
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
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
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
                system.runJob(generateHollowFillBG(begin, end, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
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
//# sourceMappingURL=fillBlocksHHG.js.map