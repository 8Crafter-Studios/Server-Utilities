import { Dimension, BlockPermutation, BlockType, BlockVolume } from "@minecraft/server";
/**
 * @deprecated
 */
export function fillBlocks(from, to, dimension, block, options) {
    let mainArray = [];
    let subArray = [];
    Array.from(new BlockVolume(from, to).getBlockLocationIterator()).forEach((v) => {
        if (subArray.length <= new BlockVolume(from, to).getSpan().x) {
            subArray.push(v);
        }
        else {
            mainArray.push(new BlockVolume({
                x: subArray.sort((a, b) => a.x - b.x)[0].x,
                y: subArray.sort((a, b) => a.y - b.y)[0].y,
                z: subArray.sort((a, b) => a.z - b.z)[0].z,
            }, {
                x: subArray.sort((a, b) => b.x - a.x)[0].x,
                y: subArray.sort((a, b) => b.y - a.y)[0].y,
                z: subArray.sort((a, b) => b.z - a.z)[0].z,
            }));
        }
    });
    let counter = 0;
    mainArray.forEach((v) => (counter += dimension
        .fillBlocks(new BlockVolume(v.from, v.to), block, options)
        .getCapacity()));
    return counter;
}
//# sourceMappingURL=fillBlocks.js.map