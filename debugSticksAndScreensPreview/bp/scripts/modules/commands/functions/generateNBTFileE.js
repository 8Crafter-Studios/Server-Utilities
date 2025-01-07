import { Vector3Utils } from "@minecraft/math.js";
import { BlockPermutation } from "@minecraft/server";
import { arryTV3 } from "./arryTV3";
export function generateNBTFileE(location, nbt) {
    var successCount = 0;
    console.log(nbt.block_indices);
    nbt.block_indices.forEach((b, i) => (b ?? -1) != -1
        ? tryrun(() => {
            try {
                location.dimension.setBlockType(Vector3Utils.add(location, arryTV3([
                    Math.floor(i / (nbt.size[1] * nbt.size[2])) %
                        nbt.size[0],
                    Math.floor(i / nbt.size[2]) % nbt.size[1],
                    i % nbt.size[2],
                ])), nbt.block_palette[b].name);
                !!nbt.block_palette[b]?.states
                    ? Object.entries(nbt.block_palette[b]?.states).forEach((p) => tryrun(() => location.dimension.setBlockPermutation(Vector3Utils.add(location, arryTV3([
                        Math.floor(i /
                            (nbt.size[1] *
                                nbt.size[2])) % nbt.size[0],
                        Math.floor(i / nbt.size[2]) %
                            nbt.size[1],
                        i % nbt.size[2],
                    ])), BlockPermutation.resolve(nbt.block_palette[b].name.replace("minecraft:active - lit_redstone_lamp", "minecraft:lit_redstone_lamp"), Object.assign(location.dimension
                        .getBlock(Vector3Utils.add(location, arryTV3([
                        Math.floor(i /
                            (nbt
                                .size[1] *
                                nbt
                                    .size[2])) % nbt.size[0],
                        Math.floor(i /
                            nbt
                                .size[2]) % nbt.size[1],
                        i % nbt.size[2],
                    ])))
                        .permutation.getAllStates(), { [p[0]]: p[1] })))))
                    : undefined;
                //{let i = 249; let nbt = {size: [5, 5, 5]}; [Math.floor(i/nbt.size[2])%nbt.size[0], Math.floor(i/(nbt.size[0]*nbt.size[2]))%nbt.size[1], i%nbt.size[2]]}
                //{let i = 27; let nbt = {size: [5, 5, 5]}; [Math.floor(i/(nbt.size[1]*nbt.size[2]))%nbt.size[0], Math.floor(i/nbt.size[2])%nbt.size[1], i%nbt.size[2]]}
                successCount++;
            }
            catch (e) {
                console.error(e, e.stack, i, b);
            }
        })
        : undefined);
    return successCount;
}
//# sourceMappingURL=generateNBTFileE.js.map