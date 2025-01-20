import { Dimension, BlockPermutation, BlockTypes } from "@minecraft/server";
import { clearContainer } from "modules/command_utilities/functions/clearContainer";
import { degradeArray } from "modules/coordinates/functions/degradeArray";
import { generateHollowSphere } from "modules/coordinates/functions/generateHollowSphere";
/**
 * Generates a hollow sphere.
 * @deprecated Legacy function that may cause script hang errors. Superceeded by {@link fillBlocksHHSG}.
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
export function fillBlocksHHS(center, radius, thickness, dimension, block, blockStates, options, placeholderid, replacemode = false, integrity = 100) {
    /*console.warn(JSONStringify(drawMinecraftSphere(center, radius, 180).find(v=>Object.values(v).includes(NaN))))*/
    let mainArray = generateHollowSphere(center, radius, thickness).map((v) => dimension.getBlock(v));
    if (integrity != 100) {
        mainArray = degradeArray(mainArray, integrity);
    }
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    if (replacemode) {
        mainArray
            .filter((v) => !!v.getComponent("inventory"))
            .forEach((v) => {
            clearContainer(v.getComponent("inventory").container);
        });
    } /*
    console.warn(JSONStringify(mainArray))*/
    if (!!!options?.matchingBlock) {
        mainArray.forEach((v) => {
            v.setPermutation(blockb);
            counter++;
        });
    }
    else {
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        mainArray.forEach((v) => {
            if (!!options?.matchingBlockStates
                ? BlockTypes.get(options?.matchingBlock) == v.type &&
                    matchingblockb.getAllStates() ==
                        Object.fromEntries(Object.entries(Object.assign(v?.permutation?.getAllStates(), blockStates)).filter((v) => !!Object.entries(blockb.getAllStates()).find((s) => v[0] == s[0])))
                : BlockTypes.get(options?.matchingBlock) == v.type) {
                v.setPermutation(blockb);
                counter++;
            }
        });
    }
    return counter;
}
//# sourceMappingURL=fillBlocksHHS.js.map