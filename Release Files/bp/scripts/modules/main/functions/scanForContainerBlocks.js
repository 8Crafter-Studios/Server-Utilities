import { Dimension, BlockVolume } from "@minecraft/server";
export function scanForContainerBlocks(from, to, dimension, returnMode) {
    if ((returnMode ?? "") == "" || (returnMode ?? "") == "Vector3") {
        return Array.from(new BlockVolume({ x: from.x, y: from.y, z: from.z }, { x: to.x, y: from.y, z: to.z }).getBlockLocationIterator()).filter((v) => !!dimension.getBlock(v).getComponent("inventory"));
    }
    else {
        return Array.from(new BlockVolume(from, {
            x: to.x,
            y: from.y,
            z: to.z,
        }).getBlockLocationIterator())
            .map((v) => dimension.getBlock(v))
            .filter((v) => !!v.getComponent("inventory"));
    }
}
//# sourceMappingURL=scanForContainerBlocks.js.map