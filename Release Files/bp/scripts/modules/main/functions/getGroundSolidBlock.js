export function getGroundSolidBlock(location, dimension, onlySolid = false) {
    let block = dimension.getBlock({
        x: location.x,
        y: Math.max(Math.min(location.y, dimension.heightRange.max), dimension.heightRange.min),
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
//# sourceMappingURL=getGroundSolidBlock.js.map