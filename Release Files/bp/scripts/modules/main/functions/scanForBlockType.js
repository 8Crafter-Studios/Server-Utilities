import { Dimension, BlockTypes, BlockVolume } from "@minecraft/server";
export function scanForBlockType(from, to, dimension, block, returnMode) {
    let blockType = BlockTypes.get(block).id;
    if ((returnMode ?? "") == "" || (returnMode ?? "") == "Vector3") {
        return Array.from(new BlockVolume({ x: from.x, y: from.y, z: from.z }, { x: to.x, y: from.y, z: to.z }).getBlockLocationIterator()).filter((v) => dimension.getBlock(v).typeId == blockType);
    }
    else {
        return Array.from(new BlockVolume(from, {
            x: to.x,
            y: from.y,
            z: to.z,
        }).getBlockLocationIterator())
            .map((v) => dimension.getBlock(v))
            .filter((v) => v.typeId == blockType);
    }
}
//# sourceMappingURL=scanForBlockType.js.map