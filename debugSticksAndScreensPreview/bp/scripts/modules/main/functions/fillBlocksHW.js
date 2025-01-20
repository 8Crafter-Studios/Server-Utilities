import { Dimension, BlockVolume, CompoundBlockVolume, BlockPermutation, Block } from "@minecraft/server";
import { clearAllContainerBlocks } from "modules/main/functions/clearAllContainerBlocks";
import { fillBlocksB } from "modules/main/functions/fillBlocksB";
import { scanForContainerBlocks } from "modules/main/functions/scanForContainerBlocks";
/**
 * @deprecated Legacy function that may cause script hang error. Superceeded by {@link fillBlocksHWG}.
 */
export function fillBlocksHW(from, to, dimension, block, blockStates, options, placeholderid, replacemode = false) {
    let mainArray = [];
    let subArray = [];
    let CBVA = new CompoundBlockVolume();
    CBVA.pushVolume({
        volume: new BlockVolume(from, { x: to.x, y: from.y, z: to.z }),
        action: 0,
    });
    if (new BlockVolume(from, { x: to.x, y: from.y, z: to.z }).getSpan().x >
        2 &&
        new BlockVolume(from, { x: to.x, y: from.y, z: to.z }).getSpan().z > 2) {
        CBVA.pushVolume({
            volume: new BlockVolume({
                x: from.x + (from.x > to.x ? -1 : 1),
                y: from.y,
                z: from.z + (from.z > to.z ? -1 : 1),
            }, {
                x: to.x + (from.x < to.x ? -1 : 1),
                y: from.y,
                z: to.z + (from.z < to.z ? -1 : 1),
            }),
            action: 1,
        });
    }
    Array.from(CBVA.getBlockLocationIterator()).forEach((va) => {
        mainArray.push(new BlockVolume(va, { x: va.x, y: to.y, z: va.z }));
    });
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    if (replacemode) {
        mainArray.forEach((v) => {
            clearAllContainerBlocks(scanForContainerBlocks(v.from, v.to, dimension, "Block"));
        });
    }
    if (!!!options?.matchingBlock) {
        /*
        console.warn("a")*/
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
//# sourceMappingURL=fillBlocksHW.js.map