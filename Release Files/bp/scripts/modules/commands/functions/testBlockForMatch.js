import { Block, BlockPermutation } from "@minecraft/server";
export function testBlockForMatch(block, matches) {
    if (matches instanceof Array) {
        if (!!matches.find((v) => v.id == "isAir")) {
            return block.isAir;
        }
        if (!!matches.find((v) => v.id == "isWaterlogged")) {
            return block.isWaterlogged;
        }
        if (!!matches.find((v) => v.id == "isLiquid")) {
            return block.isLiquid;
        }
        if (!!matches.find((v) => v.id == "isSolid")) {
            return block.isSolid;
        }
        if (!!matches.find((v) => v.id == "isValid")) {
            return block.isValid;
        }
        if (!!matches.find((v) => v.id == "true")) {
            return true;
        }
        if (!!matches.find((v) => v.id == "false")) {
            return false;
        }
        return (matches.map((v) => v.id).includes(block.typeId) &&
            !!matches.find((matches) => testForObjectExtension(block.permutation.getAllStates() ?? {}, Object.fromEntries(Object.entries(matches.states ?? {}).filter((v) => !!Object.entries(BlockPermutation.resolve(block.typeId).getAllStates()).find((s) => v[0] == s[0]))))));
    }
    else {
        if (matches.id == "isAir") {
            return block.isAir;
        }
        if (matches.id == "isWaterlogged") {
            return block.isWaterlogged;
        }
        if (matches.id == "isLiquid") {
            return block.isLiquid;
        }
        if (matches.id == "isSolid") {
            return block.isSolid;
        }
        if (matches.id == "isValid") {
            return block.isValid;
        }
        if (matches.id == "true") {
            return true;
        }
        if (matches.id == "false") {
            return false;
        }
        return (block.typeId == matches.id &&
            testForObjectExtension(block.permutation.getAllStates() ?? {}, Object.fromEntries(Object.entries(matches.states ?? {}).filter((v) => !!Object.entries(BlockPermutation.resolve(block.typeId).getAllStates()).find((s) => v[0] == s[0])))));
    }
}
//# sourceMappingURL=testBlockForMatch.js.map