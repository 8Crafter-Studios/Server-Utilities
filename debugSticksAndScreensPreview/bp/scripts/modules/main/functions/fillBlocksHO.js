import { Dimension, BlockVolume, BlockPermutation, Block } from "@minecraft/server";
import { clearAllContainerBlocks } from "modules/main/functions/clearAllContainerBlocks";
import { fillBlocksB } from "modules/main/functions/fillBlocksB";
import { scanForContainerBlocks } from "modules/main/functions/scanForContainerBlocks";
/**
 * @deprecated
 */
export function fillBlocksHO(from, to, dimension, block, blockStates, options, placeholderid, replacemode = false) {
    let mainArray = [];
    let mainArrayB = [];
    let subArray = [];
    //full distance
    mainArray.push(new BlockVolume(from, { x: from.x, y: to.y, z: from.z }));
    mainArray.push(new BlockVolume({ x: to.x, y: from.y, z: from.z }, { x: to.x, y: to.y, z: from.z }));
    mainArray.push(new BlockVolume({ x: to.x, y: from.y, z: to.z }, to));
    mainArray.push(new BlockVolume({ x: from.x, y: from.y, z: to.z }, { x: from.x, y: to.y, z: to.z }));
    //1 less than full distance
    mainArray.push(new BlockVolume({ x: to.x + (to.x > from.x ? -1 : 1), y: from.y, z: from.z }, { x: from.x + (from.x > to.x ? -1 : 1), y: from.y, z: from.z }));
    mainArray.push(new BlockVolume({ x: to.x + (to.x > from.x ? -1 : 1), y: to.y, z: from.z }, { x: from.x + (from.x > to.x ? -1 : 1), y: to.y, z: from.z }));
    mainArray.push(new BlockVolume({ x: to.x + (to.x > from.x ? -1 : 1), y: from.y, z: to.z }, { x: from.x + (from.x > to.x ? -1 : 1), y: from.y, z: to.z }));
    mainArray.push(new BlockVolume({ x: to.x + (to.x > from.x ? -1 : 1), y: to.y, z: to.z }, { x: from.x + (from.x > to.x ? -1 : 1), y: to.y, z: to.z }));
    mainArray.push(new BlockVolume({ x: to.x, y: from.y, z: to.z + (to.z > from.z ? -1 : 1) }, { x: to.x, y: from.y, z: from.z + (from.z > to.z ? -1 : 1) }));
    mainArray.push(new BlockVolume({ x: to.x, y: to.y, z: to.z + (to.z > from.z ? -1 : 1) }, { x: to.x, y: to.y, z: from.z + (from.z > to.z ? -1 : 1) }));
    mainArray.push(new BlockVolume({ x: from.x, y: from.y, z: to.z + (to.z > from.z ? -1 : 1) }, { x: from.x, y: from.y, z: from.z + (from.z > to.z ? -1 : 1) }));
    mainArray.push(new BlockVolume({ x: from.x, y: to.y, z: to.z + (to.z > from.z ? -1 : 1) }, { x: from.x, y: to.y, z: from.z + (from.z > to.z ? -1 : 1) }));
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
//# sourceMappingURL=fillBlocksHO.js.map