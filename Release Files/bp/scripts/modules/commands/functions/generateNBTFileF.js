import { Vector3Utils } from "@minecraft/math.js";
import { BlockPermutation } from "@minecraft/server";
import { arryTV3 } from "./arryTV3";
export function generateNBTFileF(location, nbt) {
    nbt.block_indices.forEach((b, i) => b != -1
        ? tryrun(() => (location.dimension.setBlockType(Vector3Utils.add(location, arryTV3([
            Math.floor(i / (nbt.size[1] * nbt.size[2])) %
                nbt.size[0],
            Math.floor(i / nbt.size[2]) % nbt.size[1],
            i % nbt.size[2],
        ])), nbt.block_palette[b].name.replace("minecraft:active - lit_redstone_lamp", "minecraft:lit_redstone_lamp")),
            // Not needed any more as coarse_dirt is now a valid block id.
            /* nbt.block_palette[b]!.name == "minecraft:coarse_dirt" ||
                nbt.block_palette[b]!.name == "coarse_dirt"
                ? location.dimension.setBlockPermutation(
                    Vector3Utils.add(
                        location,
                        arryTV3([
                            Math.floor(
                                i / (nbt.size[1] * nbt.size[2])
                            ) % nbt.size[0],
                            Math.floor(i / nbt.size[2]) %
                            nbt.size[1],
                            i % nbt.size[2],
                        ])
                    ),
                    BlockPermutation.resolve("minecraft:dirt", {
                        dirt_type: "coarse",
                    })
                )
                :  */ !!nbt.block_palette[b].states
                ? Object.entries(nbt.block_palette[b].states).forEach((p) => tryrun(() => location.dimension.setBlockPermutation(Vector3Utils.add(location, arryTV3([
                    Math.floor(i /
                        (nbt.size[1] *
                            nbt.size[2])) % nbt.size[0],
                    Math.floor(i / nbt.size[2]) % nbt.size[1],
                    i % nbt.size[2],
                ])), BlockPermutation.resolve(nbt.block_palette[b].name.replace("minecraft:active - lit_redstone_lamp", "minecraft:lit_redstone_lamp"), Object.assign(location.dimension
                    .getBlock(Vector3Utils.add(location, arryTV3([
                    Math.floor(i /
                        (nbt
                            .size[1] *
                            nbt
                                .size[2])) %
                        nbt
                            .size[0],
                    Math.floor(i /
                        nbt
                            .size[2]) %
                        nbt
                            .size[1],
                    i %
                        nbt
                            .size[2],
                ])))
                    .permutation.getAllStates(), { [p[0]]: p[1] })))))
                : undefined))
        : undefined);
}
//# sourceMappingURL=generateNBTFileF.js.map