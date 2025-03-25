import { Dimension, BlockPermutation, system, UnloadedChunksError, BlockTypes } from "@minecraft/server";
import { clearContainer } from "modules/command_utilities/functions/clearContainer";
import { generateMinecraftSphereBGProgress } from "modules/coordinates/constants/generateMinecraftSphereBGProgress";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
import { generateMinecraftSemiSphereBG } from "modules/coordinates/functions/generateMinecraftSemiSphereBG";
import { generateMinecraftSphereBGIdGenerator } from "modules/coordinates/functions/generateMinecraftSphereBGIdGenerator";
/**
 * @deprecated Legacy function. Superceeded by {@link fillSemiSphere}.
 */
export async function fillBlocksHSSG(center, radius, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    /*console.warn(JSONStringify(drawMinecraftSphere(center, radius, 180).find(v=>Object.values(v).includes(NaN))))*/
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    const id = generateMinecraftSphereBGIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateMinecraftSemiSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
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
            }, undefined, integrity));
        }
        else {
            system.runJob(generateMinecraftSemiSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
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
            }, undefined, integrity));
        }
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        if (replacemode) {
            system.runJob(generateMinecraftSemiSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                try {
                    if (!!options?.matchingBlockStates
                        ? BlockTypes.get(options?.matchingBlock) ==
                            v.dimension.getBlock(v).type &&
                            matchingblockb.getAllStates() ==
                                Object.fromEntries(Object.entries(Object.assign(v.dimension
                                    .getBlock(v)
                                    ?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(blockb.getAllStates()).find((s) => v[0] == s[0])))
                        : BlockTypes.get(options?.matchingBlock) ==
                            v.dimension.getBlock(v).type) {
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
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
            system.runJob(generateMinecraftSemiSphereBG(center, radius, dimension, id, options?.minMSBetweenYields ?? 2000, (v) => {
                try {
                    if (!!v.dimension
                        .getBlock(v)
                        .getComponent("inventory")) {
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
                        v.dimension.getBlock(v).setPermutation(blockb);
                        counter++;
                    }
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
//# sourceMappingURL=fillBlocksHSSG.js.map