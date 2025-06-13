import { Dimension, BlockPermutation, BlockTypes } from "@minecraft/server";
import { clearContainer } from "modules/command_utilities/functions/clearContainer";
import { drawMinecraftCircle } from "modules/coordinates/functions/drawMinecraftCircle";
/**
 * @deprecated
 */
export function fillBlocksHC(center, radius, dimension, axis /*"x"|"y"|"z"|"ns"|"sn"|"ew"|"we"|"ud"|"du"|"X"|"Y"|"Z"|"NS"|"SN"|"EW"|"WE"|"UD"|"DU"*/, block, blockStates, options, placeholderid, replacemode = false) {
    let mainArray = drawMinecraftCircle(center, radius, axis).map((v) => dimension.getBlock(v));
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    if (replacemode) {
        mainArray
            .filter((v) => !!v.getComponent("inventory"))
            .forEach((v) => {
            clearContainer(v.getComponent("inventory")?.container);
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
//# sourceMappingURL=fillBlocksHC.js.map