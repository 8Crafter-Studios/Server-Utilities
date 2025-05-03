import { Dimension, BlockPermutation, BlockType, BlockVolume } from "@minecraft/server";
/**
 * @deprecated
 */
export function fillBlocksB(from, to, dimension, block, options) {
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
    mainArray.forEach((v) => (counter += dimension
        .fillBlocks(new BlockVolume(v.from, v.to), block, options)
        .getCapacity()));
    return counter;
}
//# sourceMappingURL=fillBlocksB.js.map