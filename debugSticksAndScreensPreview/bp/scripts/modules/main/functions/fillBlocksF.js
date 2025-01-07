import { Dimension, BlockPermutation, BlockType, BlockVolume } from "@minecraft/server";
/**
 * @deprecated
 */
export function fillBlocksF(from, to, dimension, block, options) {
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
    mainArray.forEach((v) => (counter += dimension.runCommand(`fill ${v.from.x} ${v.from.y} ${v.from.z} ${v.to.x} ${v.to.y} ${v.to.z} ${block instanceof BlockPermutation
        ? block.type.id
        : block instanceof BlockType
            ? block.id
            : block} ${block instanceof BlockPermutation
        ? "[" +
            Object.entries(block.getAllStates())
                .map((v) => '"' +
                v[0] +
                '"' +
                "=" +
                (typeof v[1] == "string"
                    ? '"' + v[1] + '"'
                    : typeof v[1] == "number"
                        ? String(v[1])
                        : String(v[1])))
                .join(",") +
            "]"
        : ""} ${!!options?.matchingBlock
        ? options?.matchingBlock instanceof BlockPermutation
            ? "replace " +
                (options?.matchingBlock?.type?.id ?? "")
            : "replace " + (options?.matchingBlock ?? "")
        : ""} ${!!options?.matchingBlock
        ? options?.matchingBlock instanceof BlockPermutation
            ? "[" +
                Object.entries(options?.matchingBlock.getAllStates())
                    .map((v) => '"' +
                    v[0] +
                    '"' +
                    "=" +
                    (typeof v[1] == "string"
                        ? '"' + v[1] + '"'
                        : typeof v[1] == "number"
                            ? String(v[1])
                            : String(v[1])))
                    .join(",") +
                "]"
            : ""
        : ""}`).successCount));
    return counter;
}
//# sourceMappingURL=fillBlocksF.js.map