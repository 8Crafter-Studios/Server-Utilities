import { createNoise2D, createNoise3D, createNoise4D, buildPermutationTable } from "simplex-noise";
import alea from 'alea';
export function generateTerrain(corner1, corner2, dimension, biome, seed, heightVariation = 10, baseHeight = 64) {
    const minX = Math.min(corner1.x, corner2.x);
    const maxX = Math.max(corner1.x, corner2.x);
    const minZ = Math.min(corner1.z, corner2.z);
    const maxZ = Math.max(corner1.z, corner2.z);
    const noise = {
        noise2D: createNoise2D(alea(seed.toString())),
        noise3D: createNoise3D(alea(seed.toString())),
        noise4D: createNoise4D(alea(seed.toString())),
    };
    for (let x = minX; x <= maxX; x++) {
        for (let z = minZ; z <= maxZ; z++) {
            const height = baseHeight + Math.floor(noise.noise2D(x / 100, z / 100) * heightVariation);
            for (let y = -64; y <= height; y++) {
                const blockType = getBlockType(y, baseHeight, biome, noise.noise3D(x / 100, y / 100, z / 100));
                dimension.setBlockType({ x, y, z }, blockType);
            }
        }
    }
}
function getBlockType(y, baseHeight, biome, noiseValue) {
    if (y <= -60) {
        return 'bedrock';
    }
    else if (y <= -16) {
        return 'deepslate';
    }
    else if (y > -16 && y < 0) {
        return noiseValue > 0 ? 'deepslate' : 'stone';
    }
    else if (y < baseHeight - 5) {
        return 'stone';
    }
    else if (y < baseHeight - 3) {
        return 'dirt';
    }
    else if (y < baseHeight - 1) {
        return 'dirt';
    }
    else {
        return biomePresets[biome](y, baseHeight);
    }
}
const biomePresets = {
    "minecraft:plains": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:mountains": (y, baseHeight) => y < baseHeight - 10 ? 'stone' : 'grass_block',
    "minecraft:desert": (y, baseHeight) => y < baseHeight - 1 ? 'sandstone' : 'sand',
    "minecraft:forest": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:swamp": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:taiga": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'podzol',
    "minecraft:savanna": (y, baseHeight) => y < baseHeight - 1 ? 'coarse_dirt' : 'grass_block',
    "minecraft:jungle": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:ice_spikes": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow_block',
    "minecraft:badlands": (y, baseHeight) => y < baseHeight - 1 ? 'red_sandstone' : 'red_sand',
    "minecraft:nether": (y, baseHeight) => 'netherrack',
    "minecraft:end": (y, baseHeight) => 'end_stone',
    "minecraft:deep_ocean": (y, baseHeight) => y < baseHeight ? 'water' : 'sand',
    "minecraft:mushroom_fields": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'mycelium',
    "minecraft:beach": (y, baseHeight) => y < baseHeight - 1 ? 'sandstone' : 'sand',
    "minecraft:river": (y, baseHeight) => y < baseHeight ? 'water' : 'sand',
    "minecraft:meadow": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:grove": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow_block',
    "minecraft:snowy_slopes": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'snow_block',
    "minecraft:frozen_peaks": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'snow_block',
    "minecraft:jagged_peaks": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'snow_block',
    "minecraft:stony_peaks": (y, baseHeight) => 'stone',
    "minecraft:dripstone_caves": (y, baseHeight) => 'stone',
    "minecraft:lush_caves": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'grass_block',
    "minecraft:deep_dark": (y, baseHeight) => 'deepslate',
    "minecraft:mangrove_swamp": (y, baseHeight) => y < baseHeight - 1 ? 'mud' : 'grass_block',
    "minecraft:cherry_grove": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block'
}; /*

function generateTerrain(
    corner1: Vector3,
    corner2: Vector3,
    dimension: Dimension,
    biome: string,
    heightVariation: number = 10,
    baseHeight: number = 64
): void {
    const minX = Math.min(corner1.x, corner2.x);
    const maxX = Math.max(corner1.x, corner2.x);
    const minZ = Math.min(corner1.z, corner2.z);
    const maxZ = Math.max(corner1.z, corner2.z);

    for (let x = minX; x <= maxX; x++) {
        for (let z = minZ; z <= maxZ; z++) {
            const height = baseHeight + Math.floor(Math.random() * heightVariation);
            for (let y = 0; y <= height; y++) {
                // Replace this with actual block placement logic
                dimension.setBlockType({ x, y, z }, getBlockType(y, 64, biome));
            }
        }
    }
}

function getBlockType(y: number, baseHeight: number, biome: string, blockTypes?: {bedrockLevel?: string, deepslateLevel?: string, stoneLevel?: string, dirtLevel?: string, surfaceLevel?: string}): string {
    const preset = biomePresets[biome];
    let value = preset ? preset(y, baseHeight) : 'grass_block';
    if (y === 0) {
        return blockTypes.bedrockLevel??'bedrock';
    } else if (y < baseHeight - 5) {
        return 'deepslate';
    } else if (y < baseHeight - 3) {
        return 'stone';
    } else if (y < baseHeight - 1) {
        return 'dirt';
    } else if (y < baseHeight) {
        return 'podzol';
    } else {
        return 'grass_block';
    }
}
const biomePresets: { [key: string]: (y: number, baseHeight: number) => string } = {
    "minecraft:ocean": (y, baseHeight) => y < baseHeight ? 'water' : 'sand',
    "minecraft:the_end": (y, baseHeight) => y < baseHeight ? 'end_stone' : 'air',
    "minecraft:plains": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:flower_forest": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:swampland": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:forest": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:redwood_taiga_hills_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'coarse_dirt' : 'podzol',
    "minecraft:desert": (y, baseHeight) => y < baseHeight - 1 ? 'sandstone' : 'sand',
    "minecraft:extreme_hills": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'grass_block',
    "minecraft:taiga": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'podzol',
    "minecraft:river": (y, baseHeight) => y < baseHeight ? 'water' : 'sand',
    "minecraft:beach": (y, baseHeight) => y < baseHeight - 1 ? 'sandstone' : 'sand',
    "minecraft:hell": (y, baseHeight) => 'netherrack',
    "minecraft:legacy_frozen_ocean": (y, baseHeight) => y < baseHeight ? 'ice' : 'packed_ice',
    "minecraft:cold_taiga": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow_block',
    "minecraft:crimson_forest": (y, baseHeight) => 'netherrack',
    "minecraft:frozen_river": (y, baseHeight) => y < baseHeight ? 'ice' : 'snow_block',
    "minecraft:ice_plains": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow_block',
    "minecraft:desert_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'sandstone' : 'sand',
    "minecraft:ice_mountains": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'snow_block',
    "minecraft:redwood_taiga_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'coarse_dirt' : 'podzol',
    "minecraft:cold_taiga_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow_block',
    "minecraft:mushroom_island": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'mycelium',
    "minecraft:mushroom_island_shore": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'mycelium',
    "minecraft:desert_hills": (y, baseHeight) => y < baseHeight - 1 ? 'sandstone' : 'sand',
    "minecraft:cold_beach": (y, baseHeight) => y < baseHeight - 1 ? 'sandstone' : 'sand',
    "minecraft:forest_hills": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:taiga_hills": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'podzol',
    "minecraft:jungle": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:extreme_hills_edge": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'grass_block',
    "minecraft:jungle_hills": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:jungle_edge": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:deep_ocean": (y, baseHeight) => y < baseHeight ? 'water' : 'sand',
    "minecraft:deep_warm_ocean": (y, baseHeight) => y < baseHeight ? 'water' : 'sand',
    "minecraft:mega_taiga": (y, baseHeight) => y < baseHeight - 1 ? 'coarse_dirt' : 'podzol',
    "minecraft:stone_beach": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'gravel',
    "minecraft:extreme_hills_plus_trees": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'grass_block',
    "minecraft:birch_forest": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:roofed_forest": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:birch_forest_hills": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:cold_taiga_hills": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow_block',
    "minecraft:deep_frozen_ocean": (y, baseHeight) => y < baseHeight ? 'ice' : 'packed_ice',
    "minecraft:mega_taiga_hills": (y, baseHeight) => y < baseHeight - 1 ? 'coarse_dirt' : 'podzol',
    "minecraft:roofed_forest_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:birch_forest_hills_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:savanna": (y, baseHeight) => y < baseHeight - 1 ? 'coarse_dirt' : 'grass_block',
    "minecraft:savanna_plateau": (y, baseHeight) => y < baseHeight - 1 ? 'coarse_dirt' : 'grass_block',
    "minecraft:mesa": (y, baseHeight) => y < baseHeight - 1 ? 'red_sandstone' : 'red_sand',
    "minecraft:mesa_plateau_stone": (y, baseHeight) => y < baseHeight - 1 ? 'red_sandstone' : 'red_sand',
    "minecraft:lukewarm_ocean": (y, baseHeight) => y < baseHeight ? 'water' : 'sand',
    "minecraft:mesa_plateau": (y, baseHeight) => y < baseHeight - 1 ? 'red_sandstone' : 'red_sand',
    "minecraft:warm_ocean": (y, baseHeight) => y < baseHeight ? 'water' : 'sand',
    "minecraft:deep_lukewarm_ocean": (y, baseHeight) => y < baseHeight ? 'water' : 'sand',
    "minecraft:cold_ocean": (y, baseHeight) => y < baseHeight ? 'water' : 'sand',
    "minecraft:birch_forest_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:swampland_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:deep_cold_ocean": (y, baseHeight) => y < baseHeight ? 'water' : 'sand',
    "minecraft:frozen_ocean": (y, baseHeight) => y < baseHeight ? 'ice' : 'packed_ice',
    "minecraft:bamboo_jungle": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:bamboo_jungle_hills": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:taiga_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'podzol',
    "minecraft:sunflower_plains": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:extreme_hills_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'grass_block',
    "minecraft:ice_plains_spikes": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow_block',
    "minecraft:jungle_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:jungle_edge_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:extreme_hills_plus_trees_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'grass_block',
    "minecraft:savanna_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'coarse_dirt' : 'grass_block',
    "minecraft:savanna_plateau_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'coarse_dirt' : 'grass_block',
    "minecraft:mesa_bryce": (y, baseHeight) => y < baseHeight - 1 ? 'red_sandstone' : 'red_sand',
    "minecraft:mesa_plateau_stone_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'red_sandstone' : 'red_sand',
    "minecraft:mesa_plateau_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'red_sandstone' : 'red_sand',
    "minecraft:jagged_peaks": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'snow_block',
    "minecraft:soulsand_valley": (y, baseHeight) => 'soul_sand',
    "minecraft:warped_forest": (y, baseHeight) => 'warped_nylium',
    "minecraft:basalt_deltas": (y, baseHeight) => 'basalt',
    "minecraft:frozen_peaks": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'snow_block',
    "minecraft:snowy_slopes": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'snow_block',
    "minecraft:grove": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow_block',
    "minecraft:meadow": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:lush_caves": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'grass_block',
    "minecraft:dripstone_caves": (y, baseHeight) => 'stone',
    "minecraft:stony_peaks": (y, baseHeight) => 'stone',
    "minecraft:deep_dark": (y, baseHeight) => 'deepslate',
    "minecraft:mangrove_swamp": (y, baseHeight) => y < baseHeight - 1 ? 'mud' : 'grass_block',
    "minecraft:cherry_grove": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:pale_garden": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block'
}; */
//# sourceMappingURL=generateTerrain.js.map