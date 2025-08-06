import { LocationOutOfWorldBoundariesError } from "@minecraft/server";
/**
 * Gets the next top solid block above the provided position in the specified dimension.
 *
 * @param {Vector3} location The position to start searching from.
 * @param {Dimension} dimension The dimension to search in.
 * @param {boolean} [onlySolid=false] Whether to only consider solid blocks.
 * @param {boolean} [allowLiquidAbove=true] Whether to allow liquid blocks above the position.
 * @param {boolean} [allowNonSolidBlocksAbove=false] Whether to allow non-solid blocks above the position.
 * @param {boolean} [allowLiquidBelow=false] Whether to allow liquid blocks below the position.
 * @returns {Block | undefined} The next top solid block above the position, or `undefined` if none is found.
 *
 * @throws {Error} If no top solid block was found above the specified position.
 *
 * @author 8Crafter
 * @see https://www.youtube.com/@8Crafter
 * @see https://www.8crafter.com
 * @license MIT
 */
export function getNextTopSolidBlockAbovePosition(location, dimension, onlySolid = false, allowLiquidAbove = true, allowNonSolidBlocksAbove = false, allowLiquidBelow = false) {
    /**
     * The block to start searching from.
     */
    let block = tryget(() => dimension.getBlock({
        x: location.x,
        y: Math.max(Math.min(location.y, dimension.heightRange.max), dimension.heightRange.min),
        z: location.z,
    }));
    /**
     * A flag to indicate whether the block is ready to be searched.
     *
     * This is used to determine if the block above is a solid block or not.
     */
    let readyToSearch = !(onlySolid ? !block.isSolid : (block.isLiquid && allowLiquidAbove) || (block.isSolid && allowNonSolidBlocksAbove) || block.isAir);
    while (block.y <= dimension.heightRange.max) {
        if (((block.isLiquid && allowLiquidAbove) || (block.isSolid && allowNonSolidBlocksAbove) || block.isAir) && !readyToSearch) {
            block = block.above(1);
        }
        else {
            if ((onlySolid ? !block.isSolid : (block.isLiquid && allowLiquidAbove) || (block.isSolid && allowNonSolidBlocksAbove) || block.isAir) &&
                readyToSearch &&
                (onlySolid ? block.below(1)?.isSolid : !((!allowLiquidBelow ? block.below(1)?.isLiquid : false) || block.below(1)?.isAir))) {
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
            : !(onlySolid ? !block.isSolid : (block.isLiquid && allowLiquidAbove) || (block.isSolid && allowNonSolidBlocksAbove) || block.isAir);
    }
}
//# sourceMappingURL=getNextTopSolidBlockAbovePosition.js.map