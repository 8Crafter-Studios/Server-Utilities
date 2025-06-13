import { Dimension, LocationOutOfWorldBoundariesError } from "@minecraft/server";
export function getNextTopSolidBlockAbovePosition(location, dimension, onlySolid = false, allowLiquidAbove = true, allowNonSolidBlocksAbove = false, allowLiquidBelow = false) {
    let block = tryget(() => dimension.getBlock({
        x: location.x,
        y: Math.max(Math.min(location.y, dimension.heightRange.max), dimension.heightRange.min),
        z: location.z,
    }));
    let readyToSearch = !(onlySolid
        ? !block.isSolid
        : (block.isLiquid && allowLiquidAbove) ||
            (block.isSolid && allowNonSolidBlocksAbove) ||
            block.isAir);
    while (block.y <= dimension.heightRange.max) {
        if (((block.isLiquid && allowLiquidAbove) ||
            (block.isSolid && allowNonSolidBlocksAbove) ||
            block.isAir) &&
            !readyToSearch) {
            block = block.above(1);
        }
        else {
            if ((onlySolid
                ? !block.isSolid
                : (block.isLiquid && allowLiquidAbove) ||
                    (block.isSolid && allowNonSolidBlocksAbove) ||
                    block.isAir) &&
                readyToSearch &&
                (onlySolid
                    ? block.below(1)?.isSolid
                    : !((!allowLiquidBelow
                        ? block.below(1)?.isLiquid
                        : false) || block.below(1)?.isAir))) {
                return block;
            }
            else {
                try {
                    block = block.above(1);
                }
                catch (e) {
                    if (e instanceof LocationOutOfWorldBoundariesError) {
                        throw new Error("No top solid block could be found above the provided position.");
                    }
                    else {
                        throw e;
                    }
                }
            }
        }
        readyToSearch = readyToSearch
            ? true
            : !(onlySolid
                ? !block.isSolid
                : (block.isLiquid && allowLiquidAbove) ||
                    (block.isSolid && allowNonSolidBlocksAbove) ||
                    block.isAir);
    }
}
//# sourceMappingURL=getNextTopSolidBlockAbovePosition.js.map