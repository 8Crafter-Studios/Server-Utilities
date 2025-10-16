import { Block, BlockPermutation } from "@minecraft/server";
/**
 * Tests if a block matches the any of the specified types.
 *
 * Tests a block against objects with a block ID and block states, and returns true if any of them are satisfied by the block.
 *
 * @param {Block} [block] The block to test, if not specified the function will always return false.
 * @param {TestForBlockMatchMasks} [masks] A mask or array of masks to test against the block, if not specified the function will always return false.
 * @returns {boolean} Whether the block matches any of the provided masks.
 */
export function testBlockForMatch(block, masks) {
    if (!block || !masks)
        return false;
    if (masks instanceof Array) {
        if (masks.find((v) => v.id == "isAir") && block.isAir) {
            return true;
        }
        if (masks.find((v) => v.id == "isWaterlogged") && block.isWaterlogged) {
            return true;
        }
        if (!!masks.find((v) => v.id == "isLiquid") && block.isLiquid) {
            return true;
        }
        if (!!masks.find((v) => v.id == "isSolid") && block.isSolid) {
            return true;
        }
        if (!!masks.find((v) => v.id == "isValid") && block.isValid) {
            return true;
        }
        if (!!masks.find((v) => v.id == "true")) {
            return true;
        }
        return (masks.map((v) => v.id).includes(block.typeId) &&
            !!masks
                .filter((v) => v.id !== "false" && v.id !== undefined)
                .find((matches) => testForObjectExtension(block.permutation.getAllStates() ?? {}, Object.fromEntries(Object.entries(matches.states ?? {}).filter((v) => !!Object.entries(BlockPermutation.resolve(block.typeId).getAllStates()).find((s) => v[0] == s[0]))))));
    }
    else {
        if (masks.id == "isAir") {
            return block.isAir;
        }
        if (masks.id == "isWaterlogged") {
            return block.isWaterlogged;
        }
        if (masks.id == "isLiquid") {
            return block.isLiquid;
        }
        if (masks.id == "isSolid") {
            return block.isSolid;
        }
        if (masks.id == "isValid") {
            return block.isValid;
        }
        if (masks.id == "true") {
            return true;
        }
        if (masks.id == "false") {
            return false;
        }
        if (masks.id === undefined)
            return false;
        return (block.typeId == masks.id &&
            testForObjectExtension(block.permutation.getAllStates() ?? {}, Object.fromEntries(Object.entries(masks.states ?? {}).filter((v) => !!Object.entries(BlockPermutation.resolve(block.typeId).getAllStates()).find((s) => v[0] == s[0])))));
    }
}
//# sourceMappingURL=testBlockForMatch.js.map