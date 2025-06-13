import { Structure } from "@minecraft/server";
export function* removeAirFromStructure(structure) {
    for (let x = 0; x < structure.size.x; x++) {
        for (let y = 0; y < structure.size.y; y++) {
            for (let z = 0; z < structure.size.z; z++) {
                if (structure.getBlockPermutation({ x, y, z })?.type.id ===
                    "minecraft:air") {
                    structure.setBlockPermutation({ x, y, z }, undefined);
                }
                yield void undefined;
            }
        }
    }
    structure.saveToWorld();
}
//# sourceMappingURL=removeAirFromStructure.js.map