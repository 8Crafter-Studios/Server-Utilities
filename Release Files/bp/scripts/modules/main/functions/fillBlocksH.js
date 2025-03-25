import { Dimension, BlockVolume, BlockPermutation } from "@minecraft/server";
import { fillBlocksB } from "modules/main/functions/fillBlocksB";
/**
 * @deprecated
 */
export function fillBlocksH(from, to, dimension, block, blockStates, options, placeholderid) {
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
    let blockb = BlockPermutation.resolve(block, blockStates);
    if (!!!options?.matchingBlock) {
        mainArray.forEach((v) => {
            counter += fillBlocksB(v.from, v.to, dimension, blockb);
        });
    }
    else {
        let placeholderblockb = BlockPermutation.resolve(placeholderid ?? "andexdb:ifill_command_placeholder_block");
        let matchingblockb = BlockPermutation.resolve(options?.matchingBlock, options?.matchingBlockStates);
        mainArray.forEach((v) => {
            try {
                counter += dimension.runCommand(`fill ${v.from.x} ${v.from.y} ${v.from.z} ${v.to.x} ${v.to.y} ${v.to.z} ${placeholderid ??
                    "andexdb:ifill_command_placeholder_block"} ${!!options?.matchingBlock
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
            }
            catch {
                counter += fillBlocksB(v.from, v.to, dimension, placeholderblockb, { blockFilter: { includePermutations: [matchingblockb] } });
            }
            fillBlocksB(v.from, v.to, dimension, blockb, {
                blockFilter: { includePermutations: [placeholderblockb] },
            });
        });
    }
    return counter;
}
//# sourceMappingURL=fillBlocksH.js.map