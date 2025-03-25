import { Dimension, BlockVolume } from "@minecraft/server";
/**
 * @deprecated
 */
export function fillBlocksHB(from, to, dimension, block, blockStates, options) {
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
    mainArray.forEach((v) => {
        counter += dimension.runCommand(`fill ${v.from.x} ${v.from.y} ${v.from.z} ${v.to.x} ${v.to.y} ${v.to.z} ${block} ${!!blockStates
            ? "[" +
                Object.entries(blockStates)
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
            : ""}  ${!!options?.matchingBlock
            ? "replace " + (options?.matchingBlock ?? "")
            : ""} ${!!options?.matchingBlockStates
            ? "[" +
                Object.entries(options?.matchingBlockStates)
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
            : ""}`).successCount;
    });
    return counter;
}
//# sourceMappingURL=fillBlocksHB.js.map