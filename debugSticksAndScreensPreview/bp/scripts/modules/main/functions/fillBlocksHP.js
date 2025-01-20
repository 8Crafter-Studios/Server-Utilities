import { Dimension, BlockVolume, BlockPermutation, Block } from "@minecraft/server";
import { clearAllContainerBlocks } from "modules/main/functions/clearAllContainerBlocks";
import { fillBlocksB } from "modules/main/functions/fillBlocksB";
import { scanForContainerBlocks } from "modules/main/functions/scanForContainerBlocks";
/**
 * @deprecated Legacy function. Superceeded by {@link fillPillars}.
 * @todo make the fillPillars function
 */
export function fillBlocksHP(from, to, dimension, block, blockStates, options, placeholderid, replacemode = false) {
    let mainArray = [];
    let mainArrayB = [];
    let subArray = [];
    mainArray.push(new BlockVolume(from, { x: from.x, y: to.y, z: from.z }));
    mainArray.push(new BlockVolume({ x: to.x, y: from.y, z: from.z }, { x: to.x, y: to.y, z: from.z }));
    mainArray.push(new BlockVolume({ x: to.x, y: from.y, z: to.z }, to));
    mainArray.push(new BlockVolume({ x: from.x, y: from.y, z: to.z }, { x: from.x, y: to.y, z: to.z }));
    let counter = 0;
    let blockb = BlockPermutation.resolve(block, blockStates);
    if (replacemode) {
        mainArray.forEach((v) => {
            clearAllContainerBlocks(scanForContainerBlocks(v.from, v.to, dimension, "Block"));
        });
    }
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
//# sourceMappingURL=fillBlocksHP.js.map