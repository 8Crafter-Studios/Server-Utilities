import { Vector3Utils } from "@minecraft/math.js";
import { BlockPermutation } from "@minecraft/server";
export function generateNBTFileB(location, nbt) {
    nbt.blocks.forEach((b) => tryrun(() => (location.dimension.setBlockType(Vector3Utils.add(location, {
        x: b.pos[0],
        y: b.pos[1],
        z: b.pos[2],
    }), nbt.palette[b.state].Name.replace("minecraft:active - lit_redstone_lamp", "minecraft:light_gray_terracotta")
    // Not needed any more as coarse_dirt is now a valid block id.
    /* .replace("minecraft:coarse_dirt", "minecraft:dirt") */
    ),
        // Not needed any more as coarse_dirt is now a valid block id.
        /* nbt.palette[b.state].Name == "minecraft:coarse_dirt" ||
            nbt.palette[b.state].Name == "coarse_dirt"
            ? location.dimension.setBlockPermutation(
                Vector3Utils.add(location, {
                    x: b.pos[0],
                    y: b.pos[1],
                    z: b.pos[2],
                }),
                BlockPermutation.resolve("minecraft:dirt", {
                    dirt_type: "coarse",
                })
            )
            :  */ !!nbt.palette[b.state].Properties
            ? Object.entries(nbt.palette[b.state].Properties).forEach((p) => tryrun(() => location.dimension.setBlockPermutation(Vector3Utils.add(location, {
                x: b.pos[0],
                y: b.pos[1],
                z: b.pos[2],
            }), BlockPermutation.resolve(nbt.palette[b.state].Name.replace("minecraft:active - lit_redstone_lamp", "minecraft:lit_redstone_lamp"), Object.assign(location.dimension
                .getBlock(Vector3Utils.add(location, {
                x: b.pos[0],
                y: b.pos[1],
                z: b.pos[2],
            }))
                .permutation.getAllStates(), { [p[0]]: p[1] })))))
            : undefined)));
}
//# sourceMappingURL=generateNBTFileB.js.map