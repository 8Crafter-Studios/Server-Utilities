import {} from "@minecraft/server";
import { createNoise2D, createNoise3D, createNoise4D } from "simplex-noise";
import alea from "alea";
import {} from "@minecraft/vanilla-data.js";
import { chunkIndexToBoundingBoxXZ } from "modules/coordinates/functions/chunkIndexToBoundingBoxXZ";
import { getChunkIndexD } from "modules/coordinates/functions/getChunkIndexD";
// \\loadpos terrainGeneratorTestingAreaOverworldLargeVoid1_NW_corner_2x2_chunks
// ${ase}dcsend(await modules.utils.generateTerrainV2(player.worldEditSelection.pos1, player.worldEditSelection.pos2, overworld, "minecraft:plains", 334278, 10, 60, {offset: {}, scale: {}, generateOres: true, minMSBetweenTickWaits: 100}))
// ${ase}dcsend(await modules.utils.generateTerrainV2(player.worldEditSelection.pos1, player.worldEditSelection.pos2, overworld, "minecraft:plains", 334278, 60, {offset: {}, scale: {}, generateOres: true, generateBlobs: true, minMSBetweenTickWaits: 100, generationMode: "v2", heightVariation: 10}))
// ${ase}dcsend(await modules.utils.generateTerrainV2(player.worldEditSelection.pos1, player.worldEditSelection.pos2, overworld, "andexdb:test_1", 334278, 60, {offset: {}, scale: {}, generateOres: true, generateBlobs: true, minMSBetweenTickWaits: 100, generationMode: "v2", heightVariation: 10, getBlockTypeFunction: (a, b, c, d, v)=>Math.random()>0.5 ? "andexsa:rtx_mirror" : "andexsa:rtx_light"}))
// \\generateterrain minecraft:hell 123.41322
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
/**
 * Creates 2D, 3D, and 4D noise functions based on the given seed.
 *
 * @param {number | string} seed The seed to use for the noise.
 * @returns An object containing the 2D, 3D, and 4D noise functions.
 */
export function getNoise(seed) {
    return {
        noise2D: createNoise2D(alea(seed.toString())),
        noise3D: createNoise3D(alea(seed.toString())),
        noise4D: createNoise4D(alea(seed.toString())),
    };
}
export const biomeToDefaultTerrainDetailsMap = {
    "minecraft:ocean": { heightVariation: 10, waterLevel: 62 },
    "minecraft:deep_ocean": { heightVariation: 10, waterLevel: 62 },
    "minecraft:beach": { heightVariation: 10, waterLevel: 62 },
    "minecraft:stone_beach": { heightVariation: 20, waterLevel: 62 },
    "minecraft:warm_ocean": { heightVariation: 10, waterLevel: 62 },
    "minecraft:lukewarm_ocean": { heightVariation: 10, waterLevel: 62 },
    "minecraft:cold_ocean": { heightVariation: 10, waterLevel: 62 },
    "minecraft:frozen_ocean": { heightVariation: 10, waterLevel: 62 },
    "minecraft:deep_warm_ocean": { heightVariation: 10, waterLevel: 62 },
    "minecraft:deep_lukewarm_ocean": { heightVariation: 10, waterLevel: 62 },
    "minecraft:deep_cold_ocean": { heightVariation: 10, waterLevel: 62 },
    "minecraft:deep_frozen_ocean": { heightVariation: 10, waterLevel: 62 },
    "minecraft:plains": { heightVariation: 4 },
    "minecraft:sunflower_plains": { heightVariation: 4 },
    "minecraft:desert": { heightVariation: 20 },
    "minecraft:bamboo_jungle": { heightVariation: 4 },
    "minecraft:bamboo_jungle_hills": { heightVariation: 40 },
    "minecraft:birch_forest": { heightVariation: 4 },
    "minecraft:birch_forest_hills": { heightVariation: 40 },
    "minecraft:birch_forest_mutated": { heightVariation: 20 },
    "minecraft:birch_forest_hills_mutated": { heightVariation: 80 },
    "minecraft:roofed_forest": { heightVariation: 4 },
    "minecraft:roofed_forest_mutated": { heightVariation: 40 },
    "minecraft:cherry_grove": { heightVariation: 40 },
    "minecraft:cold_beach": { heightVariation: 40 },
    "minecraft:cold_taiga": { heightVariation: 20 },
    "minecraft:cold_taiga_hills": { heightVariation: 40 },
    "minecraft:cold_taiga_mutated": { heightVariation: 80 },
    "minecraft:deep_dark": { heightVariation: 10 },
    "minecraft:desert_hills": { heightVariation: 60 },
    "minecraft:desert_mutated": { heightVariation: 40 },
    "minecraft:dripstone_caves": { heightVariation: 10 },
    "minecraft:extreme_hills": { heightVariation: 30 },
    "minecraft:extreme_hills_edge": { heightVariation: 30 },
    "minecraft:extreme_hills_mutated": { heightVariation: 40 },
    "minecraft:extreme_hills_plus_trees": { heightVariation: 50 },
    "minecraft:extreme_hills_plus_trees_mutated": { heightVariation: 80 },
    "minecraft:flower_forest": { heightVariation: 10 },
    "minecraft:forest": { heightVariation: 20 },
    "minecraft:forest_hills": { heightVariation: 40 },
    "minecraft:frozen_peaks": { heightVariation: 100 },
    "minecraft:frozen_river": { heightVariation: 30 },
    "minecraft:grove": { heightVariation: 80 },
    "minecraft:ice_mountains": { heightVariation: 30 },
    "minecraft:ice_plains": { heightVariation: 20 },
    "minecraft:ice_plains_spikes": { heightVariation: 8 },
    "minecraft:jagged_peaks": { heightVariation: 120 },
    "minecraft:jungle": { heightVariation: 20 },
    "minecraft:jungle_hills": { heightVariation: 30 },
    "minecraft:jungle_mutated": { heightVariation: 40 },
    "minecraft:jungle_edge": { heightVariation: 5 },
    "minecraft:jungle_edge_mutated": { heightVariation: 40 },
    "minecraft:legacy_frozen_ocean": { heightVariation: 10 },
    "minecraft:lush_caves": { heightVariation: 10 },
    "minecraft:mangrove_swamp": { heightVariation: 10 },
    "minecraft:meadow": { heightVariation: 30 },
    "minecraft:mega_taiga": { heightVariation: 8 },
    "minecraft:mega_taiga_hills": { heightVariation: 40 },
    "minecraft:redwood_taiga_mutated": { heightVariation: 20 },
    "minecraft:redwood_taiga_hills_mutated": { heightVariation: 40 },
    "minecraft:mesa": { heightVariation: 20 },
    "minecraft:mesa_bryce": { heightVariation: 80 },
    "minecraft:mesa_plateau": { heightVariation: 80 },
    "minecraft:mesa_plateau_mutated": { heightVariation: 80 },
    "minecraft:mesa_plateau_stone": { heightVariation: 80 },
    "minecraft:mesa_plateau_stone_mutated": { heightVariation: 80 },
    "minecraft:mushroom_island": { heightVariation: 60, waterLevel: 62, baseHeight: 63 },
    "minecraft:mushroom_island_shore": { heightVariation: 10, waterLevel: 62, baseHeight: 60 },
    "minecraft:pale_garden": { heightVariation: 30 },
    "minecraft:river": { heightVariation: 10, waterLevel: 62, baseHeight: 60 },
    "minecraft:savanna": { heightVariation: 20 },
    "minecraft:savanna_plateau": { heightVariation: 40 },
    "minecraft:savanna_mutated": { heightVariation: 100 },
    "minecraft:savanna_plateau_mutated": { heightVariation: 60 },
    "minecraft:snowy_slopes": { heightVariation: 100 },
    "minecraft:stony_peaks": { heightVariation: 100 },
    "minecraft:swampland": { heightVariation: 4 },
    "minecraft:swampland_mutated": { heightVariation: 20 },
    "minecraft:taiga": { heightVariation: 30 },
    "minecraft:taiga_hills": { heightVariation: 50 },
    "minecraft:taiga_mutated": { heightVariation: 60 },
    "minecraft:hell": {
        heightVariation: 100,
        waterLevel: false,
        lavaLevel: 31,
        generatorType: "nether",
        netherAirThresholdFunc: (value, pos) => pos.y < 10 ||
            pos.y > 118 ||
            value > 0.1 - (pos.y <= 78 && pos.y >= 50 ? 0 : 1 / Math.sqrt(Math.min(Math.abs(118 - pos.y) / 40, Math.abs(pos.y - 10) / 40)) - 1),
        baseHeight: 40,
        baseOffset: { x: 0, y: 0, z: 0 },
        baseScale: { x: 1, y: 1, z: 1 },
    },
    "minecraft:crimson_forest": {
        heightVariation: 100,
        waterLevel: false,
        lavaLevel: 31,
        generatorType: "nether",
        netherAirThresholdFunc: (value, pos) => pos.y < 10 ||
            pos.y > 118 ||
            value > 0.1 - (pos.y <= 78 && pos.y >= 50 ? 0 : 1 / Math.sqrt(Math.min(Math.abs(118 - pos.y) / 40, Math.abs(pos.y - 10) / 40)) - 1),
    },
    "minecraft:warped_forest": {
        heightVariation: 100,
        waterLevel: false,
        lavaLevel: 31,
        generatorType: "nether",
        netherAirThresholdFunc: (value, pos) => pos.y < 10 ||
            pos.y > 118 ||
            value > 0.1 - (pos.y <= 78 && pos.y >= 50 ? 0 : 1 / Math.sqrt(Math.min(Math.abs(118 - pos.y) / 40, Math.abs(pos.y - 10) / 40)) - 1),
    },
    "minecraft:basalt_deltas": {
        heightVariation: 20,
        waterLevel: false,
        lavaLevel: 31,
        generatorType: "nether",
        netherAirThresholdFunc: (value, pos) => pos.y < 10 ||
            pos.y > 118 ||
            value > 0.1 - (pos.y <= 78 && pos.y >= 50 ? 0 : 1 / Math.sqrt(Math.min(Math.abs(118 - pos.y) / 40, Math.abs(pos.y - 10) / 40)) - 1),
    },
    "minecraft:soulsand_valley": {
        heightVariation: 100,
        waterLevel: false,
        lavaLevel: 31,
        generatorType: "nether",
        netherAirThresholdFunc: (value, pos) => pos.y < 10 ||
            pos.y > 118 ||
            value > 0.1 - (pos.y <= 78 && pos.y >= 50 ? 0 : 1 / Math.sqrt(Math.min(Math.abs(118 - pos.y) / 40, Math.abs(pos.y - 10) / 40)) - 1),
    },
    "minecraft:the_end": { heightVariation: 5, baseHeight: 60, waterLevel: false, generatorType: "end" },
    "andexdb:test_1": { heightVariation: 10, baseHeight: 64, waterLevel: false, generatorType: "nether" },
};
/**
 * Generates terrain.
 *
 * @param {Vector3} corner1 The first corner of the area to generate the terrain in.
 * @param {Vector3} corner2 The opposite corner of the area to generate the terrain in.
 * @param {Dimension} dimension The dimension to generate the terrain in.
 * @param {TerrainGeneratorBiome} biome The biome type to generate the terrain in.
 * @param {number} seed The seed to use to generate the terrain.
 * @param {GenerateTerrainOptions} [options={}] The options to use to generate the terrain.
 * @returns {Promise<GenerateTerrainV2Result>} A promise that resolves with an object containing details about the terrain generation process.
 *
 * @todo Caves
 * @todo Foliage
 * @todo Block with air above it variants
 */
export async function generateTerrainV2(corner1, corner2, dimension, biome, seed, options = {}) {
    const startTime = Date.now();
    const startTick = system.currentTick;
    var blocksGenerated = 0n;
    var oresGenerated = 0n;
    var blobsGenerated = 0n;
    var oreBlocksGenerated = 0n;
    var blobBlocksGenerated = 0n;
    var msSinceLastTickWait = Date.now();
    var index = 0n;
    var totalTimeSpentGenerating = 0;
    var unloadedBlockCount = 0n;
    var unloadedSurroundingBlockCount = 0n;
    const minX = Math.min(corner1.x, corner2.x);
    const maxX = Math.max(corner1.x, corner2.x);
    const minY = Math.min(corner1.y, corner2.y);
    const maxY = Math.max(corner1.y, corner2.y);
    const minZ = Math.min(corner1.z, corner2.z);
    const maxZ = Math.max(corner1.z, corner2.z);
    const minCorner = {
        x: minX,
        y: minY,
        z: minZ,
    };
    const maxCorner = {
        x: maxX,
        y: maxY,
        z: maxZ,
    };
    const opts = {
        heightVariation: options.heightVariation ?? biomeToDefaultTerrainDetailsMap[biome]?.heightVariation ?? 10,
        baseHeight: options.baseHeight ?? biomeToDefaultTerrainDetailsMap[biome]?.baseHeight ?? 63,
        waterLevel: options.waterLevel ?? biomeToDefaultTerrainDetailsMap[biome]?.waterLevel ?? false,
        lavaLevel: options.lavaLevel ?? biomeToDefaultTerrainDetailsMap[biome]?.lavaLevel ?? false,
        generatorType: options.generatorType ?? biomeToDefaultTerrainDetailsMap[biome]?.generatorType ?? "normal",
        netherAirThresholdFunc: options.netherAirThresholdFunc ?? biomeToDefaultTerrainDetailsMap[biome]?.netherAirThresholdFunc ?? ((value, y) => value > 0),
        offset: Vector.add({ ...Vector.zero, ...biomeToDefaultTerrainDetailsMap[biome]?.baseOffset }, Vector.add(Vector.zero, { ...options.offset })),
        scale: Vector.multiply({ ...Vector.one, ...biomeToDefaultTerrainDetailsMap[biome]?.baseScale }, Vector.add(Vector.one, { ...options.scale })),
        minMSBetweenTickWaits: options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits,
    };
    const includedOreFeatureCategories = {
        blob: options.generateBlobs ?? false,
        ore: options.generateOres ?? false,
    };
    const noise = options.noise ?? getNoise(seed);
    const getBlockTypeFunc = options.getBlockTypeFunction ?? getBlockTypeV2;
    const biomeBlockTypes = options.oreTypes ??
        (options.orePalette ?? oreTypes).filter((blockTypeData) => (blockTypeData.biomes === "All" ||
            ("not" in blockTypeData.biomes ? !blockTypeData.biomes.not.includes(biome) : blockTypeData.biomes.includes(biome))) &&
            includedOreFeatureCategories[blockTypeData.oreFeatureCategory]);
    if (opts.generatorType === "end") {
        for (let x = minX; x <= maxX; x++) {
            for (let z = minZ; z <= maxZ; z++) {
                const heightNoiseValue = noise.noise2D(((x + opts.offset.x) / 100) * opts.scale.x, ((z + opts.offset.z) / 100) * opts.scale.z);
                const maxHeight = heightNoiseValue < 0 ? 0 : opts.baseHeight - Math.floor(((2 / Math.sqrt(heightNoiseValue) - 2) * opts.heightVariation) / opts.scale.y);
                const minHeight = heightNoiseValue < 0
                    ? 1
                    : 12 + Math.floor(((2 / Math.sqrt(heightNoiseValue) - 2) * opts.heightVariation * (1 - heightNoiseValue) * 2) / opts.scale.y);
                // console.log(minHeight, maxHeight);
                for (let y = Math.max(minHeight, minY); y <= Math.min(maxHeight, maxY); y++) {
                    const blockType = getBlockTypeFunc({ x, y, z }, maxHeight, opts.baseHeight, biome, noise, heightNoiseValue, opts.offset, opts.scale);
                    dimension.setBlockType({ x, y, z }, blockType);
                    blocksGenerated++;
                    index++;
                    if (Date.now() - msSinceLastTickWait >= opts.minMSBetweenTickWaits) {
                        totalTimeSpentGenerating += Date.now() - msSinceLastTickWait;
                        await waitTick();
                        msSinceLastTickWait = Date.now();
                    }
                }
            }
        }
    }
    else if (opts.generatorType === "nether") {
        for (let x = minX; x <= maxX; x++) {
            for (let z = minZ; z <= maxZ; z++) {
                for (let y = minY; y <= maxY; y++) {
                    if (opts.netherAirThresholdFunc(noise.noise3D(((x + opts.offset.x) / 100) * opts.scale.x, ((y + opts.offset.y) / 100) * opts.scale.y, ((z + opts.offset.z) / 100) * opts.scale.z), { x, y, z }, noise, opts.offset, opts.scale)) {
                        const blockType = getBlockTypeFunc({ x, y, z }, maxY, opts.baseHeight, biome, noise, noise.noise2D(((x + opts.offset.x) / 100) * opts.scale.x, ((z + opts.offset.z) / 100) * opts.scale.z), opts.offset, opts.scale);
                        dimension.setBlockType({ x, y, z }, blockType);
                        blocksGenerated++;
                    }
                    else if (opts.waterLevel !== false &&
                        y <= opts.waterLevel &&
                        (opts.lavaLevel === false || opts.lavaLevel > opts.waterLevel || opts.lavaLevel < y)) {
                        dimension.setBlockType({ x, y, z }, "minecraft:water");
                    }
                    else if (opts.lavaLevel !== false &&
                        y <= opts.lavaLevel &&
                        (opts.waterLevel === false || opts.waterLevel > opts.lavaLevel || opts.waterLevel < y)) {
                        dimension.setBlockType({ x, y, z }, "minecraft:lava");
                    }
                    index++;
                    if (Date.now() - msSinceLastTickWait >= opts.minMSBetweenTickWaits) {
                        totalTimeSpentGenerating += Date.now() - msSinceLastTickWait;
                        await waitTick();
                        msSinceLastTickWait = Date.now();
                    }
                }
            }
        }
    }
    else if (opts.generatorType === "fractal") {
        let largestIteration = 0;
        const axiom = "X";
        const rules = {
            X: "F-[[X]+X]+F[+FX]-X",
            F: "FF",
        };
        const iterations = 8; // increased iterations
        const angle = Math.PI / 6;
        const thickness = 1;
        let lSystem = axiom;
        for (let i = 0; i < iterations; i++) {
            lSystem = applyRules(lSystem, rules);
        }
        function applyRules(lSystem, rules) {
            let result = "";
            for (let i = 0; i < lSystem.length; i++) {
                const char = lSystem[i];
                if (rules[char]) {
                    result += rules[char];
                }
                else {
                    result += char;
                }
            }
            return result;
        }
        function generateFractal(lSystem, minX, minY, minZ, maxX, maxY, maxZ) {
            const fractal = [];
            let x = minX; // set initial x to minX
            let y = minY + 10; // set initial y to halfway up
            let z = minZ; // set initial z to minZ
            let dx = 0; // set initial dx to 0
            let dy = 1; // set initial dy to 1
            let dz = 0; // set initial dz to 0
            for (let i = 0; i < lSystem.length; i++) {
                const char = lSystem[i];
                //   console.log(`Iteration ${i}: ${char}`); // log the current iteration and character
                switch (char) {
                    case "F":
                        // move forward
                        x += dx;
                        y += dy;
                        z += dz;
                        // check if point is within boundaries before attempting to generate block
                        if (x >= minX && x <= maxX && y >= minY && y <= maxY && z >= minZ && z <= maxZ) {
                            if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
                                // check if point is not NaN
                                fractal.push({ x, y, z });
                            }
                            else {
                                //   console.log(`Point is NaN: (${x}, ${y}, ${z})`); // log point is NaN
                            }
                        }
                        else {
                            // console.log(`Point outside boundaries: (${x}, ${y}, ${z})`); // log point outside boundaries
                        }
                        break;
                    case "+":
                        // turn left
                        const temp = dx;
                        dx = -dy;
                        dy = temp;
                        break;
                    case "-":
                        // turn right
                        const temp2 = dx;
                        dx = dy;
                        dy = -temp2;
                        break;
                    case "[":
                        // push current state onto stack
                        fractal.push({ x, y, z, dx, dy, dz });
                        break;
                    case "]":
                        // pop state from stack
                        const state = fractal.pop();
                        x = state.x;
                        y = state.y;
                        z = state.z;
                        dx = state.dx;
                        dy = state.dy;
                        dz = state.dz;
                        break;
                }
            }
            console.log(`Fractal generation complete`); // log when fractal generation is complete
            return fractal;
        }
        const fractal = generateFractal(lSystem, minX, minY, minZ, maxX, maxY, maxZ);
        // render the fractal
        for (const point of fractal) {
            dimension.setBlockType({ x: point.x, y: point.y, z: point.z }, "minecraft:stone");
            blocksGenerated++;
        }
        // for (let x = minX; x <= maxX; x++) {
        //     for (let y = minY; y <= maxY; y++) {
        //         for (let z = minZ; z <= maxZ; z++) {
        //             const rx = ((x - minX) / (maxX - minX) + opts.offset.x) * opts.scale.x; // calculate relative x position
        //             const ry = ((y - minY) / (maxY - minY) + opts.offset.y) * opts.scale.y; // calculate relative y position
        //             const rz = ((z - minZ) / (maxZ - minZ) + opts.offset.z) * opts.scale.z; // calculate relative z position
        //             const maxIterations = 10 /* opts.maxIterations */;
        //             const threshold = 4.0; // adjust this value to control the fractal boundary
        //             const growthFactor = 0.1; // adjust this value to control the growth rate
        //             let zx = rx; // initialize zx to relative x position
        //             let zy = ry; // initialize zy to relative y position
        //             let zz = rz; // initialize zz to relative z position
        //             let iteration = 0;
        //             while (iteration < maxIterations && (zx * zx + zy * zy + zz * zz) < threshold) {
        //                 const temp = zx * zx - zy * zy - zz * zz + rx;
        //                 zy = 2 * zx * zy + ry;
        //                 zz = 2 * zx * zz + rz;
        //                 zx = temp + growthFactor; // add growth factor to zx
        //                 iteration++;
        //               }
        //             if(iteration > largestIteration) largestIteration = iteration;
        //             if (iteration === maxIterations) {
        //                 // Point is in the 3D fractal set, set block type to solid
        //                 dimension.setBlockType({ x, y, z }, "minecraft:stone");
        //             }
        //             else {
        //                 // Point is not in the 3D fractal set, set block type to air
        //                 dimension.setBlockType({ x, y, z }, "minecraft:air");
        //             }
        //         }
        //     }
        // }
        console.log(largestIteration);
    }
    else {
        for (let x = minX; x <= maxX; x++) {
            for (let z = minZ; z <= maxZ; z++) {
                const heightNoiseValue = noise.noise2D(((x + opts.offset.x) / 100) * opts.scale.x, ((z + opts.offset.z) / 100) * opts.scale.z);
                const height = opts.baseHeight + Math.floor(heightNoiseValue * opts.heightVariation);
                for (let y = minY; y <= Math.min(height, maxY); y++) {
                    const blockType = getBlockTypeFunc({ x, y, z }, height, opts.baseHeight, biome, noise, heightNoiseValue, opts.offset, opts.scale);
                    dimension.setBlockType({ x, y, z }, blockType);
                    blocksGenerated++;
                    index++;
                    if (Date.now() - msSinceLastTickWait >= opts.minMSBetweenTickWaits) {
                        totalTimeSpentGenerating += Date.now() - msSinceLastTickWait;
                        await waitTick();
                        msSinceLastTickWait = Date.now();
                    }
                }
                if (opts.waterLevel !== false &&
                    height < opts.waterLevel &&
                    (opts.lavaLevel === false || opts.lavaLevel > opts.waterLevel || opts.lavaLevel < height)) {
                    for (let y = height + 1; y <= Math.min(opts.waterLevel, maxY); y++) {
                        dimension.setBlockType({ x, y, z }, "minecraft:water");
                    }
                }
                else if (opts.lavaLevel !== false &&
                    height < opts.lavaLevel &&
                    (opts.waterLevel === false || opts.waterLevel > opts.lavaLevel || opts.waterLevel < height)) {
                    for (let y = height + 1; y <= Math.min(opts.lavaLevel, maxY); y++) {
                        dimension.setBlockType({ x, y, z }, "minecraft:lava");
                    }
                }
            }
        }
        if (includedOreFeatureCategories.ore || includedOreFeatureCategories.blob || options.oreTypes) {
            const minChunk = chunkIndexToBoundingBoxXZ(getChunkIndexD({ x: minX, z: minZ }), [dimension.heightRange.min, dimension.heightRange.max - 1]);
            const maxChunk = chunkIndexToBoundingBoxXZ(getChunkIndexD({ x: maxX, z: maxZ }), [dimension.heightRange.min, dimension.heightRange.max - 1]);
            for (let x = minChunk.min.x; x <= maxChunk.max.x; x += 16) {
                for (let z = minChunk.min.z; z <= maxChunk.max.z; z += 16) {
                    const maxHeight = Math.min(dimension.heightRange.max - 1, opts.baseHeight + opts.heightVariation);
                    const clampRange = { min: minCorner, max: Vector.clamp(maxCorner, { max: { y: maxHeight } }) };
                    const chunk = chunkIndexToBoundingBoxXZ(getChunkIndexD({ x, z }), [dimension.heightRange.min, dimension.heightRange.max - 1]);
                    switch (biome) {
                        default: {
                            totalTimeSpentGenerating += Date.now() - msSinceLastTickWait;
                            const result = await placeOres({
                                corner1: Vector.clamp(minCorner, clampRange),
                                corner2: Vector.clamp(maxCorner, clampRange),
                                chunkBounds: chunk,
                                dimension,
                                biome,
                                seed,
                                noise,
                                offset: options.offset,
                                scale: options.scale,
                                minMSBetweenTickWaits: opts.minMSBetweenTickWaits,
                                oreGenerationMode: options.oreGenerationMode ?? "v2",
                                includedCategories: includedOreFeatureCategories,
                                oreTypes: biomeBlockTypes,
                            });
                            totalTimeSpentGenerating += result.totalTimeSpentGenerating;
                            oresGenerated += result.oresGenerated;
                            blobsGenerated += result.blobsGenerated;
                            oreBlocksGenerated += result.oreBlocksGenerated;
                            blobBlocksGenerated += result.blobBlocksGenerated;
                            msSinceLastTickWait = Date.now();
                        }
                    }
                    if (Date.now() - msSinceLastTickWait >= opts.minMSBetweenTickWaits) {
                        totalTimeSpentGenerating += Date.now() - msSinceLastTickWait;
                        await waitTick();
                        msSinceLastTickWait = Date.now();
                    }
                }
            }
        }
    }
    const endTick = system.currentTick;
    const endTime = Date.now();
    return {
        startTick,
        startTime,
        endTick,
        endTime,
        totalTicks: endTick - startTick,
        totalTime: endTime - startTime,
        totalTimeSpentGenerating,
        blocksGenerated,
        oresGenerated,
        blobsGenerated,
        oreBlocksGenerated,
        blobBlocksGenerated,
        totalBlocksGenerated: blocksGenerated + oreBlocksGenerated + blobBlocksGenerated,
        totalOresAndBlobsGenerated: oresGenerated + blobsGenerated,
    };
}
export const oreTypes = [
    {
        id: "minecraft:dirt",
        spawnSize: 33,
        threshold: 0.2,
        spawnTriesPerChunk: 7,
        minHeight: 0,
        maxHeight: 160,
        oreConcentrate: "Uniform",
        skippedWhenAirExposed: 0,
        biomes: {
            not: [
                "minecraft:hell",
                "minecraft:warped_forest",
                "minecraft:crimson_forest",
                "minecraft:basalt_deltas",
                "minecraft:soulsand_valley",
                "minecraft:the_end",
            ],
        },
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
        ],
        oreFeatureCategory: "blob",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:clay",
        spawnSize: 33,
        threshold: 0.2,
        spawnTriesPerChunk: 46,
        minHeight: -64,
        maxHeight: 256,
        oreConcentrate: "Uniform",
        skippedWhenAirExposed: 0,
        biomes: ["minecraft:lush_caves"],
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
        ],
        oreFeatureCategory: "blob",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:gravel",
        spawnSize: 33,
        threshold: 0.2,
        spawnTriesPerChunk: 14,
        minHeight: -64,
        maxHeight: 320,
        oreConcentrate: "Uniform",
        skippedWhenAirExposed: 0,
        biomes: {
            not: [
                "minecraft:hell",
                "minecraft:warped_forest",
                "minecraft:crimson_forest",
                "minecraft:basalt_deltas",
                "minecraft:soulsand_valley",
                "minecraft:the_end",
            ],
        },
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
            "minecraft:deepslate",
        ],
        oreFeatureCategory: "blob",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:granite",
        spawnSize: 64,
        threshold: 0.2,
        spawnTriesPerChunk: 2,
        minHeight: 0,
        maxHeight: 60,
        oreConcentrate: "Uniform",
        skippedWhenAirExposed: 0,
        biomes: {
            not: [
                "minecraft:hell",
                "minecraft:warped_forest",
                "minecraft:crimson_forest",
                "minecraft:basalt_deltas",
                "minecraft:soulsand_valley",
                "minecraft:the_end",
            ],
        },
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
        ],
        oreFeatureCategory: "blob",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:diorite",
        spawnSize: 64,
        threshold: 0.2,
        spawnTriesPerChunk: 2,
        minHeight: 0,
        maxHeight: 60,
        oreConcentrate: "Uniform",
        skippedWhenAirExposed: 0,
        biomes: {
            not: [
                "minecraft:hell",
                "minecraft:warped_forest",
                "minecraft:crimson_forest",
                "minecraft:basalt_deltas",
                "minecraft:soulsand_valley",
                "minecraft:the_end",
            ],
        },
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
        ],
        oreFeatureCategory: "blob",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:andesite",
        spawnSize: 64,
        threshold: 0.2,
        spawnTriesPerChunk: 2,
        minHeight: 0,
        maxHeight: 60,
        oreConcentrate: "Uniform",
        skippedWhenAirExposed: 0,
        biomes: {
            not: [
                "minecraft:hell",
                "minecraft:warped_forest",
                "minecraft:crimson_forest",
                "minecraft:basalt_deltas",
                "minecraft:soulsand_valley",
                "minecraft:the_end",
            ],
        },
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
        ],
        oreFeatureCategory: "blob",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:tuff",
        spawnSize: 64,
        threshold: 0.2,
        spawnTriesPerChunk: 2,
        minHeight: -64,
        maxHeight: 0,
        oreConcentrate: "Uniform",
        skippedWhenAirExposed: 0,
        biomes: {
            not: [
                "minecraft:hell",
                "minecraft:warped_forest",
                "minecraft:crimson_forest",
                "minecraft:basalt_deltas",
                "minecraft:soulsand_valley",
                "minecraft:the_end",
            ],
        },
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
            "minecraft:deepslate",
        ],
        oreFeatureCategory: "blob",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:coal_ore",
        spawnSize: 17,
        threshold: 0.1,
        spawnTriesPerChunk: 20,
        minHeight: 0,
        maxHeight: 192,
        oreConcentrate: "Triangle",
        skippedWhenAirExposed: 0.5,
        biomes: {
            not: [
                "minecraft:hell",
                "minecraft:warped_forest",
                "minecraft:crimson_forest",
                "minecraft:basalt_deltas",
                "minecraft:soulsand_valley",
                "minecraft:the_end",
            ],
        },
        deepslateVariant: "minecraft:deepslate_coal_ore",
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
            "minecraft:deepslate",
        ],
        oreFeatureCategory: "ore",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:iron_ore",
        spawnSize: 4,
        threshold: 0.1,
        spawnTriesPerChunk: 10,
        minHeight: -64,
        maxHeight: 72,
        oreConcentrate: "Uniform",
        skippedWhenAirExposed: 0,
        biomes: {
            not: [
                "minecraft:hell",
                "minecraft:warped_forest",
                "minecraft:crimson_forest",
                "minecraft:basalt_deltas",
                "minecraft:soulsand_valley",
                "minecraft:the_end",
            ],
        },
        deepslateVariant: "minecraft:deepslate_iron_ore",
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
            "minecraft:deepslate",
        ],
        oreFeatureCategory: "ore",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:copper_ore",
        spawnSize: 10,
        threshold: 0.1,
        spawnTriesPerChunk: 16,
        minHeight: -16,
        maxHeight: 112,
        oreConcentrate: "Triangle",
        skippedWhenAirExposed: 0,
        biomes: {
            not: [
                "minecraft:dripstone_caves",
                "minecraft:hell",
                "minecraft:warped_forest",
                "minecraft:crimson_forest",
                "minecraft:basalt_deltas",
                "minecraft:soulsand_valley",
                "minecraft:the_end",
            ],
        },
        deepslateVariant: "minecraft:deepslate_copper_ore",
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
            "minecraft:deepslate",
        ],
        oreFeatureCategory: "ore",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:redstone_ore",
        spawnSize: 8,
        threshold: 0.1,
        spawnTriesPerChunk: 4,
        minHeight: -64,
        maxHeight: 15,
        oreConcentrate: "Uniform",
        skippedWhenAirExposed: 0,
        biomes: {
            not: [
                "minecraft:hell",
                "minecraft:warped_forest",
                "minecraft:crimson_forest",
                "minecraft:basalt_deltas",
                "minecraft:soulsand_valley",
                "minecraft:the_end",
            ],
        },
        deepslateVariant: "minecraft:deepslate_redstone_ore",
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
            "minecraft:deepslate",
        ],
        oreFeatureCategory: "ore",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:lapis_ore",
        spawnSize: 7,
        threshold: 0.1,
        spawnTriesPerChunk: 2,
        minHeight: -32,
        maxHeight: 32,
        oreConcentrate: "Triangle",
        skippedWhenAirExposed: 0,
        biomes: {
            not: [
                "minecraft:hell",
                "minecraft:warped_forest",
                "minecraft:crimson_forest",
                "minecraft:basalt_deltas",
                "minecraft:soulsand_valley",
                "minecraft:the_end",
            ],
        },
        deepslateVariant: "minecraft:deepslate_lapis_ore",
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
            "minecraft:deepslate",
        ],
        oreFeatureCategory: "ore",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:gold_ore",
        spawnSize: 9,
        threshold: 0.1,
        spawnTriesPerChunk: 4,
        minHeight: -64,
        maxHeight: 32,
        oreConcentrate: "Triangle",
        skippedWhenAirExposed: 0.5,
        biomes: {
            not: [
                "minecraft:hell",
                "minecraft:warped_forest",
                "minecraft:crimson_forest",
                "minecraft:basalt_deltas",
                "minecraft:soulsand_valley",
                "minecraft:the_end",
            ],
        },
        deepslateVariant: "minecraft:deepslate_gold_ore",
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
            "minecraft:deepslate",
        ],
        oreFeatureCategory: "ore",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:diamond_ore",
        spawnSize: 4,
        threshold: 0.01,
        spawnTriesPerChunk: 7,
        minHeight: -64,
        maxHeight: 16,
        oreConcentrate: "Triangle",
        skippedWhenAirExposed: 0.5,
        biomes: {
            not: [
                "minecraft:hell",
                "minecraft:warped_forest",
                "minecraft:crimson_forest",
                "minecraft:basalt_deltas",
                "minecraft:soulsand_valley",
                "minecraft:the_end",
            ],
        },
        deepslateVariant: "minecraft:deepslate_diamond_ore",
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
            "minecraft:deepslate",
        ],
        oreFeatureCategory: "ore",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:emerald_ore",
        spawnSize: 3,
        threshold: 0.01,
        spawnTriesPerChunk: 100,
        minHeight: -16,
        maxHeight: 480,
        oreConcentrate: "Triangle",
        skippedWhenAirExposed: 0,
        biomes: [
            "minecraft:extreme_hills",
            "minecraft:grove",
            "minecraft:cherry_grove",
            "minecraft:jagged_peaks",
            "minecraft:meadow",
            "minecraft:frozen_peaks",
            "minecraft:stony_peaks",
            "minecraft:extreme_hills_plus_trees",
            "minecraft:snowy_slopes",
            "minecraft:extreme_hills_mutated",
            "minecraft:extreme_hills_edge",
            "minecraft:extreme_hills_plus_trees_mutated",
        ],
        deepslateVariant: "minecraft:deepslate_emerald_ore",
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
            "minecraft:deepslate",
        ],
        oreFeatureCategory: "ore",
        oreFeatureType: "ore_blob",
    },
    {
        id: "minecraft:infested_stone",
        spawnSize: 9,
        threshold: 0.01,
        spawnTriesPerChunk: 14,
        minHeight: -64,
        maxHeight: 63,
        oreConcentrate: "Uniform",
        skippedWhenAirExposed: 0,
        biomes: [
            "minecraft:extreme_hills",
            "minecraft:grove",
            "minecraft:cherry_grove",
            "minecraft:jagged_peaks",
            "minecraft:meadow",
            "minecraft:frozen_peaks",
            "minecraft:stony_peaks",
            "minecraft:extreme_hills_plus_trees",
            "minecraft:snowy_slopes",
            "minecraft:extreme_hills_mutated",
            "minecraft:extreme_hills_edge",
            "minecraft:extreme_hills_plus_trees_mutated",
        ],
        deepslateVariant: "minecraft:infested_deepslate",
        canReplace: [
            "minecraft:andesite",
            "minecraft:diorite",
            "minecraft:granite",
            "minecraft:polished_andesite",
            "minecraft:polished_diorite",
            "minecraft:polished_granite",
            "minecraft:stone",
            "minecraft:deepslate",
        ],
        oreFeatureCategory: "blob",
        oreFeatureType: "ore_blob",
    },
];
export const spawnSizeToMaxBlocksMap = {
    0: 0,
    1: 0,
    2: 0,
    3: 4,
    4: 5,
    5: 8,
    6: 9,
    7: 10,
    8: 10,
    9: 13,
    10: 16,
    11: 17,
    12: 23,
    13: 24,
    14: 24,
    15: 29,
    16: 32,
    17: 37,
    18: 46,
    19: 52,
    20: 52,
    21: 60,
    22: 68,
    23: 68,
    24: 74,
    25: 82,
    26: 94,
    27: 104,
    28: 106,
    29: 120,
    30: 128,
    31: 135,
    32: 149,
    33: 160,
    34: 180,
    35: 190,
    36: 204,
    37: 212,
    38: 228,
    39: 246,
    40: 262,
    41: 276,
    42: 292,
    43: 308,
    44: 324,
    45: 344,
    46: 360,
    47: 381,
    48: 403,
    49: 429,
    50: 452,
    51: 480,
    52: 500,
    53: 530,
    54: 558,
    55: 584,
    56: 616,
    57: 634,
    58: 664,
    59: 694,
    60: 730,
    61: 760,
    62: 790,
    63: 826,
    64: 864,
};
export async function placeOres(options) {
    const startTime = Date.now();
    const startTick = system.currentTick;
    var msSinceLastTickWait = Date.now();
    /**
     * The total number of attempts to place ores, this is when the ore is either placed, or would have been placed but was outside of the boundaries.
     */
    var oresAttemptedToBePlaced = 0n;
    /**
     * The number of ores that were actually places, this is the same as {@link oresAttemptedToBePlaced}, except that it does not include ores that were outside of the boundaries.
     */
    var oresActuallyPlaced = 0n;
    var oresGenerated = 0n;
    var blobsGenerated = 0n;
    var oreBlocksGenerated = 0n;
    var blobBlocksGenerated = 0n;
    var totalTimeSpentGenerating = 0;
    const minX = Math.min(options.corner1.x, options.corner2.x);
    const maxX = Math.max(options.corner1.x, options.corner2.x);
    const minY = Math.min(options.corner1.y, options.corner2.y);
    const maxY = Math.max(options.corner1.y, options.corner2.y);
    const minZ = Math.min(options.corner1.z, options.corner2.z);
    const maxZ = Math.max(options.corner1.z, options.corner2.z);
    const chunk = options.chunkBounds ?? chunkIndexToBoundingBoxXZ(getChunkIndexD({ x: minX, z: minZ }), [minY, maxY]);
    const includedOreFeatureCategories = {
        blob: true,
        ore: true,
        ...options.includedCategories,
    };
    const genMode = options.oreGenerationMode ?? "v2";
    const opts = {
        minMSBetweenTickWaits: options?.minMSBetweenTickWaits ?? config.system.defaultMinMSBetweenTickWaits,
    };
    const noise = options.noise ?? getNoise(options.seed);
    const biomeBlockTypes = options.oreTypes ??
        (options.orePalette ?? oreTypes).filter((blockTypeData) => (blockTypeData.biomes === "All" ||
            ("not" in blockTypeData.biomes ? !blockTypeData.biomes.not.includes(options.biome) : blockTypeData.biomes.includes(options.biome))) &&
            includedOreFeatureCategories[blockTypeData.oreFeatureCategory]);
    if (biomeBlockTypes) {
        let bti = 0;
        for (const blockTypeData of biomeBlockTypes) {
            const blockType = blockTypeData.id;
            // Try to spawn block
            for (let i = 0; i < blockTypeData.spawnTriesPerChunk; i++) {
                const noiseValueX = noise.noise4D((chunk.max.x - chunk.min.x) * (options.scale?.x ?? 1), 0, 0, bti * (i + 1) * 10);
                const noiseValueZ = noise.noise4D(0, 0, (chunk.max.z - chunk.min.z) * (options.scale?.z ?? 1), bti * (i + 1) * 10);
                const x = Math.floor(chunk.min.x + 8 + noiseValueX * 8);
                const z = Math.floor(chunk.min.z + 8 + noiseValueZ * 8);
                const noiseValueY = noise.noise4D(x * 10 * (options.scale?.x ?? 1), 0, z * 10 * (options.scale?.z ?? 1), bti * (i + 1) * 10);
                const y = Math.floor(blockTypeData.minHeight +
                    (blockTypeData.maxHeight - blockTypeData.minHeight) / 2 +
                    noiseValueY * ((blockTypeData.maxHeight - blockTypeData.minHeight) / 2));
                const blobLocation = { x, y, z };
                // let remainingBlocks = blockTypeData.spawnSize;
                let remainingBlocks = spawnSizeToMaxBlocksMap[blockTypeData.spawnSize];
                // const radius = Math.ceil(blockTypeData.spawnSize + 0.1);
                const radius = Math.ceil(Math.sqrt(blockTypeData.spawnSize) * 1.5 + 0.1);
                if (!(blockTypeData.canReplace ? blockTypeData.canReplace.includes(options.dimension.getBlock(blobLocation).typeId) : true)) {
                    continue;
                }
                if (blockTypeData.oreFeatureCategory === "blob") {
                    blobsGenerated++;
                }
                else {
                    oresGenerated++;
                }
                oresAttemptedToBePlaced++;
                if (blobLocation.x >= minX &&
                    blobLocation.x <= maxX &&
                    blobLocation.y >= minY &&
                    blobLocation.y <= maxY &&
                    blobLocation.z >= minZ &&
                    blobLocation.z <= maxZ) {
                    if (blockTypeData.oreFeatureCategory === "blob") {
                        blobBlocksGenerated++;
                    }
                    else {
                        oreBlocksGenerated++;
                    }
                    oresActuallyPlaced++;
                    const deepslateNoiseValue = "deepslateVariant" in blockTypeData && y < 8
                        ? y > 0
                            ? noise.noise3D(((x + (options.offset?.x ?? 0)) / 100) * (options.scale?.x ?? 1), (y + (options.offset?.y ?? 0)) * (options.scale?.y ?? 1), ((z + (options.offset?.z ?? 0)) / 100) * (options.scale?.z ?? 1))
                            : 1
                        : 0;
                    if ("deepslateVariant" in blockTypeData && deepslateNoiseValue > 0) {
                        options.dimension.setBlockType(blobLocation, blockTypeData.deepslateVariant);
                    }
                    else {
                        options.dimension.setBlockType(blobLocation, blockType);
                    }
                }
                remainingBlocks--;
                if (genMode === "v2") {
                    for (let r = 1; r <= radius; r++) {
                        for (let x = -r; x <= r; x++) {
                            for (let z = -r; z <= r; z++) {
                                const distance = Math.sqrt(x * x + z * z);
                                if (distance <= r) {
                                    for (let y = -r; y <= r; y++) {
                                        const blockX = blobLocation.x + x - 2;
                                        const blockY = blobLocation.y + y;
                                        const blockZ = blobLocation.z + z;
                                        if (Math.sqrt(x ** 2 + y * y + z * z) <= r + 0.01) {
                                            if (blockY >= blockTypeData.minHeight && blockY <= blockTypeData.maxHeight) {
                                                const noiseValue = noise.noise4D((blockX / 100) * (options.scale?.x ?? 1), (blockY / 100) * (options.scale?.y ?? 1), (blockZ / 100) * (options.scale?.z ?? 1), bti * (i + 1) * 10);
                                                if (Math.abs(noiseValue) % 0.125 < 0.0625) {
                                                    if (blockTypeData.canReplace
                                                        ? blockTypeData.canReplace.includes(options.dimension.getBlock({ x: blockX, y: blockY, z: blockZ }).typeId)
                                                        : true) {
                                                        oresAttemptedToBePlaced++;
                                                        if (blockX >= minX &&
                                                            blockX <= maxX &&
                                                            blockY >= minY &&
                                                            blockY <= maxY &&
                                                            blockZ >= minZ &&
                                                            blockZ <= maxZ) {
                                                            if (blockTypeData.oreFeatureCategory === "blob") {
                                                                blobBlocksGenerated++;
                                                            }
                                                            else {
                                                                oreBlocksGenerated++;
                                                            }
                                                            oresActuallyPlaced++;
                                                            const deepslateNoiseValue = "deepslateVariant" in blockTypeData && blockY < 8
                                                                ? blockY > 0
                                                                    ? noise.noise3D(((blockX + (options.offset?.x ?? 0)) / 100) * (options.scale?.x ?? 1), (blockY + (options.offset?.y ?? 0)) * (options.scale?.y ?? 1), ((blockZ + (options.offset?.z ?? 0)) / 100) * (options.scale?.z ?? 1))
                                                                    : 1
                                                                : 0;
                                                            if ("deepslateVariant" in blockTypeData && deepslateNoiseValue > 0) {
                                                                options.dimension.setBlockType({ x: blockX, y: blockY, z: blockZ }, blockTypeData.deepslateVariant);
                                                            }
                                                            else {
                                                                options.dimension.setBlockType({ x: blockX, y: blockY, z: blockZ }, blockType);
                                                            }
                                                        }
                                                    }
                                                    remainingBlocks--;
                                                }
                                            }
                                            if (remainingBlocks <= 0) {
                                                break;
                                            }
                                        }
                                    }
                                    if (Date.now() - msSinceLastTickWait >= opts.minMSBetweenTickWaits) {
                                        totalTimeSpentGenerating += Date.now() - msSinceLastTickWait;
                                        await waitTick();
                                        msSinceLastTickWait = Date.now();
                                    }
                                    if (remainingBlocks <= 0) {
                                        break;
                                    }
                                }
                                else if (Date.now() - msSinceLastTickWait >= opts.minMSBetweenTickWaits) {
                                    totalTimeSpentGenerating += Date.now() - msSinceLastTickWait;
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                            }
                            if (remainingBlocks <= 0) {
                                break;
                            }
                        }
                        if (remainingBlocks <= 0) {
                            break;
                        }
                    }
                }
                else if (genMode === "v1") {
                    for (let r = 1; r <= radius; r++) {
                        for (let x = blobLocation.x - r; x <= blobLocation.x + r; x++) {
                            for (let z = blobLocation.z - r; z <= blobLocation.z + r; z++) {
                                for (let y = blobLocation.y - r; y <= blobLocation.y + r; x == blobLocation.x - r ||
                                    x == blobLocation.x + r ||
                                    z == blobLocation.z - r ||
                                    z == blobLocation.z + r ||
                                    y == blobLocation.y + r
                                    ? y++
                                    : (y = blobLocation.y + r)) {
                                    if (y >= blockTypeData.minHeight && y <= blockTypeData.maxHeight) {
                                        const noiseValue = noise.noise4D((x / 100) * (options.scale?.x ?? 1), (y / 100) * (options.scale?.y ?? 1), (z / 100) * (options.scale?.z ?? 1), bti * (i + 1) * 10);
                                        if (Math.abs(noiseValue) < 0.25) {
                                            if (blockTypeData.canReplace
                                                ? blockTypeData.canReplace.includes(options.dimension.getBlock({ x, y, z }).typeId)
                                                : true) {
                                                oresAttemptedToBePlaced++;
                                                if (x >= minX && x <= maxX && y >= minY && y <= maxY && z >= minZ && z <= maxZ) {
                                                    oresActuallyPlaced++;
                                                    const deepslateNoiseValue = "deepslateVariant" in blockTypeData && y < 8
                                                        ? y > 0
                                                            ? noise.noise3D(((x + (options.offset?.x ?? 0)) / 100) * (options.scale?.x ?? 1), (y + (options.offset?.y ?? 0)) * (options.scale?.y ?? 1), ((z + (options.offset?.z ?? 0)) / 100) * (options.scale?.z ?? 1))
                                                            : 1
                                                        : 0;
                                                    if ("deepslateVariant" in blockTypeData && deepslateNoiseValue > 0) {
                                                        options.dimension.setBlockType({ x, y, z }, blockTypeData.deepslateVariant);
                                                    }
                                                    else {
                                                        options.dimension.setBlockType({ x, y, z }, blockType);
                                                    }
                                                }
                                            }
                                            remainingBlocks--;
                                        }
                                    }
                                    if (remainingBlocks <= 0) {
                                        break;
                                    }
                                }
                                if (Date.now() - msSinceLastTickWait >= opts.minMSBetweenTickWaits) {
                                    totalTimeSpentGenerating += Date.now() - msSinceLastTickWait;
                                    await waitTick();
                                    msSinceLastTickWait = Date.now();
                                }
                                if (remainingBlocks <= 0) {
                                    break;
                                }
                            }
                            if (remainingBlocks <= 0) {
                                break;
                            }
                        }
                        if (remainingBlocks <= 0) {
                            break;
                        }
                    }
                }
                else {
                    throw new TypeError(`Invalid ore generation mode: ${genMode}.`);
                }
            }
            // for (let i = 0; i < blockTypeData.spawnTriesPerChunk; i++) {
            //     let generated = false;
            //     // Loop through each block in the chunk
            //     for (let y = blockTypeData.minHeight; y <= blockTypeData.maxHeight; y++) {
            //         for (let x = chunk.min.x; x <= chunk.max.x; x++) {
            //             for (let z = chunk.min.z; z <= chunk.max.z; z++) {
            //                 // Calculate noise value for this block
            //                 const noiseValue = noise.noise4D(
            //                     x * 10 * (options.scale?.x ?? 1),
            //                     y * 10 * (options.scale?.y ?? 1),
            //                     z * 10 * (options.scale?.z ?? 1),
            //                     bti * (i + 1) * 10
            //                 );
            //                 // console.log(JSON.stringify({x, y, z, noiseValue}));
            //                 if (Math.abs(noiseValue) * 10 < blockTypeData.threshold) {
            //                     generated = true;
            //                 } else {
            //                     index++;
            //                     if (Date.now() - msSinceLastTickWait >= opts.minMSBetweenTickWaits) {
            //                         totalTimeSpentGenerating += Date.now() - msSinceLastTickWait;
            //                         await waitTick();
            //                         msSinceLastTickWait = Date.now();
            //                     }
            //                     continue;
            //                 }
            //                 const blobLocation = { x, y, z };
            //                 let remainingBlocks = blockTypeData.spawnSize;
            //                 const radius = Math.ceil(blockTypeData.spawnSize + 0.1);
            //                 if (
            //                     blobLocation.x >= minX &&
            //                     blobLocation.x <= maxX &&
            //                     blobLocation.y >= minY &&
            //                     blobLocation.y <= maxY &&
            //                     blobLocation.z >= minZ &&
            //                     blobLocation.z <= maxZ
            //                 ) {
            //                     options.dimension.setBlockType({ x, y, z }, blockType);
            //                 }
            //                 remainingBlocks--;
            //                 for (let r = 1; r <= radius; r++) {
            //                     for (let x = blobLocation.x - r; x <= blobLocation.x + r; x++) {
            //                         for (let z = blobLocation.z - r; z <= blobLocation.z + r; z++) {
            //                             for (
            //                                 let y = blobLocation.y - r;
            //                                 y <= blobLocation.y + r;
            //                                 x == blobLocation.x - r ||
            //                                 x == blobLocation.x + r ||
            //                                 z == blobLocation.z - r ||
            //                                 z == blobLocation.z + r ||
            //                                 y == blobLocation.y + r
            //                                     ? y++
            //                                     : (y = blobLocation.y + r)
            //                             ) {
            //                                 if (y >= blockTypeData.minHeight && y <= blockTypeData.maxHeight) {
            //                                     const noiseValue = noise.noise4D(
            //                                         (x / 100) * (options.scale?.x ?? 1),
            //                                         (y / 100) * (options.scale?.y ?? 1),
            //                                         (z / 100) * (options.scale?.z ?? 1),
            //                                         bti * (i + 1)
            //                                     );
            //                                     if (Math.abs(noiseValue) < 0.9) {
            //                                         if (x >= minX && x <= maxX && y >= minY && y <= maxY && z >= minZ && z <= maxZ) {
            //                                             options.dimension.setBlockType({ x, y, z }, blockType);
            //                                         }
            //                                         remainingBlocks--;
            //                                     }
            //                                 }
            //                                 if (remainingBlocks <= 0) {
            //                                     break;
            //                                 }
            //                             }
            //                             if (remainingBlocks <= 0) {
            //                                 break;
            //                             }
            //                         }
            //                         if (remainingBlocks <= 0) {
            //                             break;
            //                         }
            //                     }
            //                     if (remainingBlocks <= 0) {
            //                         break;
            //                     }
            //                 }
            //                 if (generated) {
            //                     break;
            //                 }
            //                 index++;
            //                 if (Date.now() - msSinceLastTickWait >= opts.minMSBetweenTickWaits) {
            //                     totalTimeSpentGenerating += Date.now() - msSinceLastTickWait;
            //                     await waitTick();
            //                     msSinceLastTickWait = Date.now();
            //                 }
            //             }
            //             if (generated) {
            //                 break;
            //             }
            //         }
            //         if (generated) {
            //             break;
            //         }
            //     } /*
            //     // Determine which ore type to place based on noise value and biome
            //     let blockType: string | null = null;
            //     if (options.biome === "desert") {
            //         if (noiseValue < oreTypes.coal) {
            //             blockType = "coal";
            //         } else if (noiseValue < oreTypes.iron) {
            //             blockType = "iron";
            //         }
            //     } else if (options.biome === "forest") {
            //         if (noiseValue < oreTypes.gold) {
            //             blockType = "gold";
            //         }
            //     }
            //     // If an ore type was determined, add it to the ore placements array
            //     if (blockType) {
            //         options.dimension.setBlockType({ x, y, z }, blockType);
            //     } */
            // }
            bti++;
        }
    }
    const endTick = system.currentTick;
    const endTime = Date.now();
    return {
        startTick,
        startTime,
        endTick,
        endTime,
        totalTicks: endTick - startTick,
        totalTime: endTime - startTime,
        totalTimeSpentGenerating,
        oresAttemptedToBePlaced,
        oresActuallyPlaced,
        oresGenerated,
        blobsGenerated,
        oreBlocksGenerated,
        blobBlocksGenerated,
    };
}
export function getBlockType(y, baseHeight, biome, noiseValue) {
    if (y <= -60) {
        return "bedrock";
    }
    else if (y <= -16) {
        return "deepslate";
    }
    else if (y > -16 && y < 0) {
        return noiseValue > 0 ? "deepslate" : "stone";
    }
    else if (y < baseHeight - 5) {
        return "stone";
    }
    else if (y < baseHeight - 3) {
        return "dirt";
    }
    else if (y < baseHeight - 1) {
        return "dirt";
    }
    else {
        return biomePresets[biome](y, baseHeight);
    }
}
/* type BiomeUndergroundBlockDistributionBiomes = "normal" | "badlands";

function getUndergroundBlockTypeBasedOnBiomeDistribution(y: number, biome: BiomeUndergroundBlockDistributionBiomes, noiseValue: number): string {
    const newNoise = Math.abs(noiseValue) * 100 % 1;
    switch (biome) {
        case "normal":
            if(noiseValue < 0.05) {
                return
            
    }
} */
export function getBlockTypeV2(pos, localMaxHeight, baseHeight, biome, noise, heightNoiseValue, offset, scale) {
    switch (biome) {
        case "minecraft:plains":
        case "minecraft:forest":
        case "minecraft:forest_hills":
        case "minecraft:flower_forest":
        case "minecraft:sunflower_plains":
        case "minecraft:river": {
            const n = noise.noise3D(((pos.x + offset.x) / 100) * scale.x, ((pos.y + offset.y) / 100) * scale.y, ((pos.z + offset.z) / 100) * scale.z);
            if (pos.y <= -60) {
                return "bedrock";
            }
            else if (pos.y <= -16) {
                return "deepslate";
            }
            else if (pos.y > -16 && pos.y < 0) {
                return n > 0 ? "deepslate" : "stone";
            }
            else if (pos.y < localMaxHeight - 5) {
                return "stone";
            }
            else if (pos.y < localMaxHeight - 3) {
                return "dirt";
            }
            else if (pos.y < localMaxHeight) {
                return "dirt";
            }
            else {
                return "grass_block";
            }
        }
        case "minecraft:frozen_peaks": {
            const n = noise.noise3D(((pos.x + offset.x) / 100) * scale.x, ((pos.y + offset.y) / 100) * scale.y, ((pos.z + offset.z) / 100) * scale.z);
            if (pos.y <= -60) {
                return "bedrock";
            }
            else if (pos.y <= -16) {
                return "deepslate";
            }
            else if (pos.y > -16 && pos.y < 0) {
                return n > 0 ? "deepslate" : "stone";
            }
            else if (pos.y < localMaxHeight - (Math.abs(n) > 0.8 ? 4 : 3)) {
                return "stone";
            }
            else {
                return Math.abs(n) % 0.1 > 0.09 ? "ice" : "packed_ice";
            }
        }
        // TO-DO
        case "minecraft:hell": {
            if (pos.y < 0 || pos.y > 127) {
                return "air";
            }
            else if (pos.y <= 4 || pos.y >= 124) {
                return "bedrock";
            } /*  if (y <= -16 + Math.floor(heightNoiseValue * 45) || y >= 100 - Math.floor(heightNoiseValue * 5)) */
            else {
                const n = noise.noise4D(((pos.x + offset.x) / 100) * scale.x, ((pos.y + offset.y) / 100) * scale.y, ((pos.z + offset.z) / 100) * scale.z, Math.sqrt(pos.y ** 2 + pos.x ** 2 + pos.z ** 2));
                if (Math.abs(n) % 0.1 >= 0.00055 && Math.abs(n) % 0.1 < 0.0006) {
                    return "lava";
                }
                return "netherrack";
            } /*  else {
                return "air";
            } */
        }
        case "minecraft:the_end":
            if (pos.y <= 13 + Math.floor(heightNoiseValue * 5)) {
                return "air";
            }
            else {
                return "end_stone";
            }
        case "andexdb:test_1":
            return "emerald_block";
        default:
            return "andexdb:invalid_block_placeholder";
    }
}
const biomePresets = {
    "minecraft:plains": (y, baseHeight) => (y < baseHeight - 1 ? "dirt" : "grass_block"),
    "minecraft:mountains": (y, baseHeight) => (y < baseHeight - 10 ? "stone" : "grass_block"),
    "minecraft:desert": (y, baseHeight) => (y < baseHeight - 1 ? "sandstone" : "sand"),
    "minecraft:forest": (y, baseHeight) => (y < baseHeight - 1 ? "dirt" : "grass_block"),
    "minecraft:swamp": (y, baseHeight) => (y < baseHeight - 1 ? "dirt" : "grass_block"),
    "minecraft:taiga": (y, baseHeight) => (y < baseHeight - 1 ? "dirt" : "podzol"),
    "minecraft:savanna": (y, baseHeight) => (y < baseHeight - 1 ? "coarse_dirt" : "grass_block"),
    "minecraft:jungle": (y, baseHeight) => (y < baseHeight - 1 ? "dirt" : "grass_block"),
    "minecraft:ice_spikes": (y, baseHeight) => (y < baseHeight - 1 ? "dirt" : "snow"),
    "minecraft:badlands": (y, baseHeight) => (y < baseHeight - 1 ? "red_sandstone" : "red_sand"),
    "minecraft:nether": (y, baseHeight) => "netherrack",
    "minecraft:end": (y, baseHeight) => "end_stone",
    "minecraft:deep_ocean": (y, baseHeight) => (y < baseHeight ? "water" : "sand"),
    "minecraft:mushroom_fields": (y, baseHeight) => (y < baseHeight - 1 ? "dirt" : "mycelium"),
    "minecraft:beach": (y, baseHeight) => (y < baseHeight - 1 ? "sandstone" : "sand"),
    "minecraft:river": (y, baseHeight) => (y < baseHeight ? "water" : "sand"),
    "minecraft:meadow": (y, baseHeight) => (y < baseHeight - 1 ? "dirt" : "grass_block"),
    "minecraft:grove": (y, baseHeight) => (y < baseHeight - 1 ? "dirt" : "snow"),
    "minecraft:snowy_slopes": (y, baseHeight) => (y < baseHeight - 1 ? "stone" : "snow"),
    "minecraft:frozen_peaks": (y, baseHeight) => (y < baseHeight - 1 ? "stone" : "snow"),
    "minecraft:jagged_peaks": (y, baseHeight) => (y < baseHeight - 1 ? "stone" : "snow"),
    "minecraft:stony_peaks": (y, baseHeight) => "stone",
    "minecraft:dripstone_caves": (y, baseHeight) => "stone",
    "minecraft:lush_caves": (y, baseHeight) => (y < baseHeight - 1 ? "stone" : "grass_block"),
    "minecraft:deep_dark": (y, baseHeight) => "deepslate",
    "minecraft:mangrove_swamp": (y, baseHeight) => (y < baseHeight - 1 ? "mud" : "grass_block"),
    "minecraft:cherry_grove": (y, baseHeight) => (y < baseHeight - 1 ? "dirt" : "grass_block"),
};
/* const biomePresetsV2: { [key: string]: (y: number, baseHeight: number, noiseValue: number) => string } = {
    "minecraft:plains": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:mountains": (y, baseHeight) => y < baseHeight - 10 ? 'stone' : 'grass_block',
    "minecraft:desert": (y, baseHeight) => y < baseHeight - 1 ? 'sandstone' : 'sand',
    "minecraft:forest": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:swamp": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:taiga": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'podzol',
    "minecraft:savanna": (y, baseHeight) => y < baseHeight - 1 ? 'coarse_dirt' : 'grass_block',
    "minecraft:jungle": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:ice_spikes": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow',
    "minecraft:badlands": (y, baseHeight) => y < baseHeight - 1 ? 'red_sandstone' : 'red_sand',
    "minecraft:nether": (y, baseHeight) => 'netherrack',
    "minecraft:end": (y, baseHeight) => 'end_stone',
    "minecraft:deep_ocean": (y, baseHeight) => y < baseHeight ? 'water' : 'sand',
    "minecraft:mushroom_fields": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'mycelium',
    "minecraft:beach": (y, baseHeight) => y < baseHeight - 1 ? 'sandstone' : 'sand',
    "minecraft:river": (y, baseHeight) => y < baseHeight ? 'water' : 'sand',
    "minecraft:meadow": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:grove": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow',
    "minecraft:snowy_slopes": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'snow',
    "minecraft:frozen_peaks": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'snow',
    "minecraft:jagged_peaks": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'snow',
    "minecraft:stony_peaks": (y, baseHeight) => 'stone',
    "minecraft:dripstone_caves": (y, baseHeight) => 'stone',
    "minecraft:lush_caves": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'grass_block',
    "minecraft:deep_dark": (y, baseHeight) => 'deepslate',
    "minecraft:mangrove_swamp": (y, baseHeight) => y < baseHeight - 1 ? 'mud' : 'grass_block',
    "minecraft:cherry_grove": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block'
};

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
    "minecraft:cold_taiga": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow',
    "minecraft:crimson_forest": (y, baseHeight) => 'netherrack',
    "minecraft:frozen_river": (y, baseHeight) => y < baseHeight ? 'ice' : 'snow',
    "minecraft:ice_plains": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow',
    "minecraft:desert_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'sandstone' : 'sand',
    "minecraft:ice_mountains": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'snow',
    "minecraft:redwood_taiga_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'coarse_dirt' : 'podzol',
    "minecraft:cold_taiga_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow',
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
    "minecraft:cold_taiga_hills": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow',
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
    "minecraft:ice_plains_spikes": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow',
    "minecraft:jungle_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:jungle_edge_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'grass_block',
    "minecraft:extreme_hills_plus_trees_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'grass_block',
    "minecraft:savanna_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'coarse_dirt' : 'grass_block',
    "minecraft:savanna_plateau_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'coarse_dirt' : 'grass_block',
    "minecraft:mesa_bryce": (y, baseHeight) => y < baseHeight - 1 ? 'red_sandstone' : 'red_sand',
    "minecraft:mesa_plateau_stone_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'red_sandstone' : 'red_sand',
    "minecraft:mesa_plateau_mutated": (y, baseHeight) => y < baseHeight - 1 ? 'red_sandstone' : 'red_sand',
    "minecraft:jagged_peaks": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'snow',
    "minecraft:soulsand_valley": (y, baseHeight) => 'soul_sand',
    "minecraft:warped_forest": (y, baseHeight) => 'warped_nylium',
    "minecraft:basalt_deltas": (y, baseHeight) => 'basalt',
    "minecraft:frozen_peaks": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'snow',
    "minecraft:snowy_slopes": (y, baseHeight) => y < baseHeight - 1 ? 'stone' : 'snow',
    "minecraft:grove": (y, baseHeight) => y < baseHeight - 1 ? 'dirt' : 'snow',
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