import { BiomeTypes, BiomeType } from "@minecraft/server";
export function regenerateBlocks(corner1, corner2, dimension, radius, ignoreAir = true, onlyReplaceAir = true) {
    const minX = Math.min(corner1.x, corner2.x);
    const maxX = Math.max(corner1.x, corner2.x);
    const minY = Math.min(corner1.y, corner2.y);
    const maxY = Math.max(corner1.y, corner2.y);
    const minZ = Math.min(corner1.z, corner2.z);
    const maxZ = Math.max(corner1.z, corner2.z);
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            for (let z = minZ; z <= maxZ; z++) {
                const block = dimension.getBlock({ x, y, z });
                if (block && (!onlyReplaceAir || block.typeId === 'minecraft:air')) {
                    const surroundingBlocks = [];
                    for (let dx = -radius; dx <= radius; dx++) {
                        for (let dy = -radius; dy <= radius; dy++) {
                            for (let dz = -radius; dz <= radius; dz++) {
                                if (dx === 0 && dy === 0 && dz === 0)
                                    continue;
                                const surroundingBlock = dimension.getBlock({ x: x + dx, y: y + dy, z: z + dz });
                                if (surroundingBlock && (!ignoreAir || surroundingBlock.typeId !== 'minecraft:air')) {
                                    surroundingBlocks.push(surroundingBlock);
                                }
                            }
                        }
                    }
                    if (surroundingBlocks.length > 0) {
                        const blockPattern = {};
                        for (const surroundingBlock of surroundingBlocks) {
                            const key = `${surroundingBlock.x - x},${surroundingBlock.y - y},${surroundingBlock.z - z}`;
                            if (!blockPattern[key]) {
                                blockPattern[key] = 0;
                            }
                            blockPattern[key]++;
                        }
                        const mostCommonPattern = Object.keys(blockPattern).reduce((a, b) => blockPattern[a] > blockPattern[b] ? a : b);
                        const [dx, dy, dz] = mostCommonPattern.split(',').map(Number);
                        const patternBlock = dimension.getBlock({ x: x + dx, y: y + dy, z: z + dz });
                        if (!patternBlock)
                            continue;
                        dimension.setBlockType({ x, y, z }, patternBlock.typeId);
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=regenerateBlocks.js.map