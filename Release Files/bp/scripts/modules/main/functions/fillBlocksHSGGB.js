import { Dimension, BlockPermutation, system } from "@minecraft/server";
import { clearContainer } from "modules/command_utilities/functions/clearContainer";
import { testBlockForMatch } from "modules/commands/functions/testBlockForMatch";
import { generateMinecraftSphereBGProgress } from "modules/coordinates/constants/generateMinecraftSphereBGProgress";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
import { generateMinecraftSphereBGIdGenerator } from "modules/coordinates/functions/generateMinecraftSphereBGIdGenerator";
import { generateSkygridBG } from "modules/coordinates/functions/generateSkygridBG";
/**
 * Generates a skygrid.
 * @since 1.18.0-development.20
 * @deprecated Legacy function. Superceeded by {@link fillSkygrid}.
 * @version 1.0.0
 * @async
 * @param {Vector3} from The location of a corner of the area to generate the skygrid in.
 * @param {Vector3} to The location of the opposite corner of the area to generate the skygrid in.
 * @param {number} skygridSize The size of the skygrid.
 * @param {Dimension} dimension The dimension to generate the skygrid in.
 * @param {string} block The block type of the BlockPermutation to generate.
 * @param {FillOptions2} options Optional extra options for the skygrid generation execution.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the skygrid generation.
 * @returns A promise that resolves with the details of the skygrid generation once the skygrid generation is complete.
 */
export async function fillBlocksHSGGB(from, to, skygridSize, dimension, block, options, replacemode = false, integrity = 100) {
    let counter = 0;
    const id = generateMinecraftSphereBGIdGenerator();
    if (!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v, index) => {
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
                    if (e instanceof TypeError) {
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
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v, index) => {
                try {
                    v.dimension
                        .getBlock(v)
                        .setPermutation(block(v, index));
                    counter++;
                }
                catch (e) {
                    if (e instanceof TypeError) {
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
        if (replacemode) {
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v, index) => {
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
                                .getComponent("inventory").container);
                        }
                        v.dimension
                            .getBlock(v)
                            .setPermutation(block(v, index));
                        counter++;
                    }
                }
                catch (e) {
                    if (e instanceof TypeError) {
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
            system.runJob(generateSkygridBG(from, to, skygridSize, id, dimension, (v, index) => {
                try {
                    if (!!v.dimension
                        .getBlock(v)
                        .getComponent("inventory")) {
                        clearContainer(v.dimension
                            .getBlock(v)
                            .getComponent("inventory").container);
                    }
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
                    if (e instanceof TypeError) {
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
//# sourceMappingURL=fillBlocksHSGGB.js.map