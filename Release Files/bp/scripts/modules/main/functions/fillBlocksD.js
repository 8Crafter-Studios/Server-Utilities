import { Dimension, BlockVolume } from "@minecraft/server";
import { fillBlocksC } from "modules/main/functions/fillBlocksC";
/**
 * @deprecated
 */
export function fillBlocksD(from, to, dimension, block = "air", blockStates, matchingBlock, matchingBlockStates, overrideAllBlockStates = false) {
    let mainArray = [];
    let subArray = [];
    Array.from(new BlockVolume(from, {
        x: from.x,
        y: from.y,
        z: to.z,
    }).getBlockLocationIterator()).forEach((v) => {
        subArray.push(new BlockVolume(v, { x: to.x, y: v.y, z: v.z }));
    });
    subArray.forEach((v) => {
        Array.from(v.getBlockLocationIterator()).forEach((va) => mainArray.push(new BlockVolume(va, { x: va.x, y: to.y, z: va.z })));
    });
    let counter = 0;
    mainArray.forEach((v) => (counter += fillBlocksC(v.from, v.to, dimension, block, blockStates, matchingBlock, matchingBlockStates, overrideAllBlockStates)));
    return counter;
}
//# sourceMappingURL=fillBlocksD.js.map