import { Block, BlockPermutation } from "@minecraft/server";
export function testBlockForMatchToMask(block, matches) {
    if (matches instanceof Array) {
        if (!!matches.find((v) => v.type == "isAir")) {
            return block.isAir;
        }
        if (!!matches.find((v) => v.type == "isWaterlogged")) {
            return block.isWaterlogged;
        }
        if (!!matches.find((v) => v.type == "isLiquid")) {
            return block.isLiquid;
        }
        if (!!matches.find((v) => v.type == "isSolid")) {
            return block.isSolid;
        }
        if (!!matches.find((v) => v.type == "isValid")) {
            return block.isValid;
        }
        if (!!matches.find((v) => v.type == "true")) {
            return true;
        }
        if (!!matches.find((v) => v.type == "false")) {
            return false;
        }
        return (matches.map((v) => v.type).includes(block.typeId) &&
            !!matches.find((matches) => testForObjectExtension(block.permutation.getAllStates() ?? {}, Object.fromEntries(Object.entries(matches.states ?? {}).filter((v) => !!Object.entries(BlockPermutation.resolve(block.typeId).getAllStates()).find((s) => v[0] == s[0]))))));
    }
    else {
        if (matches.type == "isAir") {
            return block.isAir;
        }
        if (matches.type == "isWaterlogged") {
            return block.isWaterlogged;
        }
        if (matches.type == "isLiquid") {
            return block.isLiquid;
        }
        if (matches.type == "isSolid") {
            return block.isSolid;
        }
        if (matches.type == "isValid") {
            return block.isValid;
        }
        if (matches.type == "true") {
            return true;
        }
        if (matches.type == "false") {
            return false;
        }
        return (block.typeId == matches.type &&
            testForObjectExtension(block.permutation.getAllStates() ?? {}, Object.fromEntries(Object.entries(matches.states ?? {}).filter((v) => !!Object.entries(BlockPermutation.resolve(block.typeId).getAllStates()).find((s) => v[0] == s[0])))));
    }
}
//# sourceMappingURL=testBlockForMatchToMask.js.map