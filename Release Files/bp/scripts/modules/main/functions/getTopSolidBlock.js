/**
 * Gets the top solid block at the specified location in the given dimension.
 *
 * @param {Vector3} location The position to check for the top solid block.
 * @param {Dimension} dimension The dimension in which to search for the block.
 * @param {boolean} [onlySolid=false] Whether to only consider solid blocks.
 * @returns {Block | undefined} The top solid block at the specified location, or `undefined` if none is found.
 */
export function getTopSolidBlock(location, dimension, onlySolid = false) {
    /**
     * The block to start searching from.
     */
    let block = dimension.getBlock({
        x: location.x,
        y: dimension.heightRange.max,
        z: location.z,
    });
    while (block.y >= dimension.heightRange.min) {
        if (onlySolid ? !block.isSolid : block.isAir) {
            block = block.below(1);
        }
        else {
            return block;
        }
    }
    return undefined;
}
//# sourceMappingURL=getTopSolidBlock.js.map