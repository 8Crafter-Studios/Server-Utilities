import { type Vector3, type Dimension, type BlockBoundingBox } from "@minecraft/server";
import { type NoiseFunction2D, type NoiseFunction3D, type NoiseFunction4D } from "simplex-noise";
import { type MinecraftBlockTypes, type MinecraftBiomeTypes } from "@minecraft/vanilla-data.js";
import type { ReplaceTypeOfKey } from "./filterProperties";
/**
 * A union type of all the vanilla Minecraft biome type IDs.
 */
export type TerrainGeneratorBiome = `${MinecraftBiomeTypes}` | `andexdb:test_1`;
/**
 * A union type of all the vanilla Minecraft block type IDs.
 */
export type TerrainGeneratorBlock = `${MinecraftBlockTypes}`;
export declare function generateTerrain(corner1: Vector3, corner2: Vector3, dimension: Dimension, biome: string, seed: number, heightVariation?: number, baseHeight?: number): void;
/**
 * Creates 2D, 3D, and 4D noise functions based on the given seed.
 *
 * @param {number | string} seed The seed to use for the noise.
 * @returns An object containing the 2D, 3D, and 4D noise functions.
 */
export declare function getNoise(seed: number | string): {
    noise2D: NoiseFunction2D;
    noise3D: NoiseFunction3D;
    noise4D: NoiseFunction4D;
};
export interface GenerateTerrainOptions {
    /**
     * The height variation to use for the terrain.
     *
     * @see {@link BiomeToDefaultTerrainDetailsValue.heightVariation}
     *
     * @default
     * ```typescript
     * biomeToDefaultTerrainDetailsMap[biome]["heightVariation"] ?? 10
     * ```
     */
    heightVariation?: BiomeToDefaultTerrainDetailsMapType[keyof BiomeToDefaultTerrainDetailsMapType]["heightVariation"] | undefined;
    /**
     * The height variation to use for the terrain.
     *
     * @see {@link BiomeToDefaultTerrainDetailsValue.baseHeight}
     *
     * @default
     * ```typescript
     * biomeToDefaultTerrainDetailsMap[biome]["baseHeight"] ?? 63
     * ```
     */
    baseHeight?: BiomeToDefaultTerrainDetailsMapType[keyof BiomeToDefaultTerrainDetailsMapType]["baseHeight"] | undefined;
    /**
     * The water level to use for the terrain.
     *
     * If set to false, no water will be generated.
     *
     * @see {@link BiomeToDefaultTerrainDetailsValue.waterLevel}
     *
     * @default
     * ```typescript
     * biomeToDefaultTerrainDetailsMap[biome]["waterLevel"] ?? false
     * ```
     */
    waterLevel?: BiomeToDefaultTerrainDetailsMapType[keyof BiomeToDefaultTerrainDetailsMapType]["waterLevel"] | undefined;
    /**
     * The lava level to use for the terrain.
     *
     * If set to false, no lava will be generated.
     *
     * @see {@link BiomeToDefaultTerrainDetailsValue.lavaLevel}
     *
     * @default
     * ```typescript
     * biomeToDefaultTerrainDetailsMap[biome]["lavaLevel"] ?? false
     * ```
     */
    lavaLevel?: BiomeToDefaultTerrainDetailsMapType[keyof BiomeToDefaultTerrainDetailsMapType]["lavaLevel"] | undefined;
    /**
     * The generator type to use for the terrain of the biome type.
     *
     * Generator Types:
     * - `normal` - Regular overworld generation. The generates with everything below the surface being solid, and the surface having height variation, including mountains.
     * - `nether` - Nether generation. This generates similarly to the nether.
     * - `end` - End generation. This generated end islands.
     *
     * @see {@link BiomeToDefaultTerrainDetailsValue.generatorType}
     *
     * @default
     * ```typescript
     * biomeToDefaultTerrainDetailsMap[biome]["generatorType"] ?? "normal"
     * ```
     */
    generatorType?: BiomeToDefaultTerrainDetailsMapType[keyof BiomeToDefaultTerrainDetailsMapType]["generatorType"] | undefined;
    /**
     * The nether air threshold function to use for the terrain of the biome type.
     *
     * Should be a function that returns true if the block should be generated and false otherwise.
     *
     * @param {number} value The noise value. It is a float from `-1` to `1` (inclusive).
     * @param {Vector3} pos The position where the block is to be generated. It is a {@link Vector3} object.
     * @param {ReturnType<typeof getNoise>} noise An object containing the 2D, 3D, and 4D noise functions.
     * @param {Vector3} offset The offset used to generate the noise value.
     * @param {Vector3} scale The scale used to generate the noise value.
     * @returns {boolean} True if the block should be generated, false otherwise.
     *
     * @default
     * ```typescript
     * (value: number) => value > 0
     * ```
     */
    netherAirThresholdFunc?: ((value: number, pos: Vector3, noise: ReturnType<typeof getNoise>, offset: Vector3, scale: Vector3) => boolean) | undefined;
    /**
     * The offset to use for the noise functions.
     *
     * The actual block positions will not be offset, instead it will offset the coordinates passed into the noise functions.
     *
     * @default
     * ```typescript
     * {x: 0, y: 0, z: 0}
     * ```
     */
    offset?: Partial<Vector3> | undefined;
    /**
     * The scale to use for the noise functions.
     *
     * The actual block positions will not be scaled, instead it will scale the coordinates passed into the noise functions.
     *
     * @default
     * ```typescript
     * {x: 0, y: 0, z: 0}
     * ```
     */
    scale?: Partial<Vector3> | undefined;
    /**
     * The noise functions to use.
     *
     * If not specified, it will generate it based off of the seed.
     *
     * @see {@link getNoise}
     *
     * @default getNoise(seed)
     */
    noise?: ReturnType<typeof getNoise> | undefined;
    /**
     * Whether or not to generate ores.
     *
     * Only applies if {@link GenerateTerrainOptions.oreTypes} is not specified.
     *
     * @default false
     */
    generateOres?: boolean | undefined;
    /**
     * Whether or not to generate blobs.
     *
     * Only applies if {@link GenerateTerrainOptions.oreTypes} is not specified.
     *
     * @default false
     */
    generateBlobs?: boolean | undefined;
    /**
     * The types of ores and blobs to generate.
     *
     * This will override any biome-specific ore configurations, the {@link generateOres} option, and the {@link generateBlobs} option.
     *
     * To presere these settings use {@link orePalette} instead.
     */
    oreTypes?: OreTypes | undefined;
    /**
     * The types of ores and blobs to generate.
     *
     * Unlike {@link GenerateTerrainOptions.oreTypes}, this will be evaluated and filtered based on the biome and other settings.
     *
     * Only applied if {@link GenerateTerrainOptions.oreTypes} is not specified.
     *
     * @default
     * ```typescript
     * (oreTypes as OreTypesType).filter(
     *     (blockTypeData) =>
     *         (blockTypeData.biomes === "All" ||
     *         ("not" in blockTypeData.biomes ? !blockTypeData.biomes.not.includes(biome) : blockTypeData.biomes.includes(biome))) && includedOreFeatureCategories[blockTypeData.oreFeatureCategory]
     * )
     * ```
     */
    orePalette?: OreTypes | undefined;
    /**
     * The ore generation mode to use.
     *
     * `v1` is more cubic.
     *
     * `v2` is more elliptic.
     *
     * @see {@link OreGenerationOptions.oreGenerationMode}
     *
     * @default "v2"
     */
    oreGenerationMode?: OreGenerationOptions["oreGenerationMode"] | undefined;
    /**
     * Minimum amount of time in milliseconds to spend regenrating the blocks each tick.
     *
     * @default config.system.defaultMinMSBetweenTickWaits
     */
    minMSBetweenTickWaits?: number;
    /**
     * A function to use for getting the block type for the terrain generation, this will override the biome-specific terrain.
     *
     * @see {@link GenerateTerrainGetBlockTypeFunction}
     * @see {@link getBlockTypeV2}
     *
     * @param {Vector3} pos The coordinates of the block that the block type is being retrieved for.
     * @param {number} localMaxHeight The maximum height of the terrain and the block's x and z coordinates.
     * @param {number} baseHeight The base height of the terrain.
     * @param {TerrainGeneratorBiome} biome The biome the block is being generated in.
     * @param {ReturnType<typeof getNoise>} noise The noise functions.
     * @param {number} heightNoiseValue The noise value used to determine the `localMaxHeight` value.
     * @returns {string} The block type to generate.
     *
     * @default getBlockTypeV2
     */
    getBlockTypeFunction?: GenerateTerrainGetBlockTypeFunction | undefined;
}
export interface BiomeToDefaultTerrainDetailsValue {
    /**
     * The height variation to use for the terrain of the biome type.
     *
     * If this is a biome like an ocean, this will be the height variation of the seabed.
     *
     * If the user specifies a height variation, it will override this.
     *
     * @default 10
     */
    heightVariation?: number;
    /**
     * The water level to use for the terrain of the biome type.
     *
     * If not specified, or set to false, it will not have water.
     *
     * If the user specifies a water level, it will override this.
     *
     * @default false
     */
    waterLevel?: number | false;
    /**
     * The lava level to use for the terrain of the biome type.
     *
     * If not specified, or set to false, it will not have lava.
     *
     * If the user specifies a lava level, it will override this.
     *
     * @default false
     */
    lavaLevel?: number | false;
    /**
     * The generator type to use for the terrain of the biome type.
     *
     * If the user specifies a generator type, it will override this.
     *
     * Generator Types:
     * - `normal` - Regular overworld generation. The generates with everything below the surface being solid, and the surface having height variation, including mountains.
     * - `nether` - Nether generation. This generates similarly to the nether.
     * - `end` - End generation. This generated end islands.
     *
     * @default "normal"
     */
    generatorType?: "normal" | "nether" | "end" | "fractal";
    /**
     * The nether air threshold unction to use for the terrain of the biome type.
     *
     * If the user specifies a nether air threshold unction, it will override this.
     *
     * Should be a function that takes a float from -1 to 1 (inclusive) and returns true if the block should be generated and false otherwise.
     *
     * @default 0
     */
    netherAirThresholdFunc?: (value: number, pos: Vector3, noise: ReturnType<typeof getNoise>, offset: Vector3, scale: Vector3) => boolean;
    /**
     * The base height to use for the terrain of the biome type.
     *
     * If the user specifies a base height, it will override this.
     *
     * @default 63
     */
    baseHeight?: number;
    /**
     * The base offset to use for the terrain of the biome type.
     *
     * The will be added to the user-provided offset.
     *
     * @default
     * ```typescript
     * { x: 0, y: 0, z: 0 }
     * ```
     */
    baseOffset?: Vector3;
    /**
     * The base scale to use for the terrain of the biome type.
     *
     * Larger values will make the terrain slope more quickly.
     *
     * This will be multiplied by the user-provided scale.
     *
     * @default
     * ```typescript
     * { x: 1, y: 1, z: 1 }
     * ```
     */
    baseScale?: Vector3;
}
export type BiomeToDefaultTerrainDetailsMapType = Record<TerrainGeneratorBiome, BiomeToDefaultTerrainDetailsValue>;
export declare const biomeToDefaultTerrainDetailsMap: BiomeToDefaultTerrainDetailsMapType;
/**
 * A function used to determine the block type to generate for the {@link generateTerrainV2} function.
 *
 * @param {Vector3} pos The coordinates of the block that the block type is being retrieved for.
 * @param {number} localMaxHeight The maximum height of the terrain and the block's x and z coordinates.
 * @param {number} baseHeight The base height of the terrain.
 * @param {TerrainGeneratorBiome} biome The biome the block is being generated in.
 * @param {ReturnType<typeof getNoise>} noise The noise functions.
 * @param {number} heightNoiseValue The noise value used to determine the `localMaxHeight` value.
 * @returns {string} The block type to generate.
 */
export type GenerateTerrainGetBlockTypeFunction = (pos: Vector3, localMaxHeight: number, baseHeight: number, biome: TerrainGeneratorBiome, noise: ReturnType<typeof getNoise>, heightNoiseValue: number, offset: Vector3, scale: Vector3) => string;
export interface GenerateTerrainV2Result {
    startTick: number;
    startTime: number;
    endTick: number;
    endTime: number;
    totalTicks: number;
    totalTime: number;
    totalTimeSpentGenerating: number;
    blocksGenerated: bigint;
    oresGenerated: bigint;
    blobsGenerated: bigint;
    oreBlocksGenerated: bigint;
    blobBlocksGenerated: bigint;
    totalBlocksGenerated: bigint;
    totalOresAndBlobsGenerated: bigint;
}
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
export declare function generateTerrainV2(corner1: Vector3, corner2: Vector3, dimension: Dimension, biome: TerrainGeneratorBiome, seed: number, options?: GenerateTerrainOptions): Promise<GenerateTerrainV2Result>;
/**
 * The options to use for generating ores.
 */
export interface OreGenerationOptions {
    /**
     * The first corner for the bounds to actually generate ores in.
     *
     * This will not affect the actual layout of the ores, ores that are outside of this range just won't be generated.\
     *
     * It is recommended to set this to extend at least a little bit past the chunk so that ores won't be cut off at the chunk boundaries.
     */
    corner1: Vector3;
    /**
     * The second corner for the bounds to actually generate ores in.
     *
     * This will not affect the actual layout of the ores, ores that are outside of this range just won't be generated.
     *
     * It is recommended to set this to extend at least a little bit past the chunk so that ores won't be cut off at the chunk boundaries.
     */
    corner2: Vector3;
    /**
     * The chunk to generate ores for.
     *
     * The ores can extend past the chunk as long as it is within the {@link corner1} to {@link corner2} range, but their centers will all be within this chunk.
     */
    chunkBounds: BlockBoundingBox;
    /**
     * The ore generation mode to use.
     *
     * `v1` is more cubic.
     *
     * `v2` is more elliptic.
     *
     * @default "v2"
     */
    oreGenerationMode?: "v1" | "v2";
    /**
     * The dimension to generate the ores in.
     */
    dimension: Dimension;
    /**
     * The biome type to generate ores for.
     *
     * This will determine what ore and blob types spawn, as well as their frequencies and distributions.
     */
    biome: TerrainGeneratorBiome;
    /**
     * The seed to use for the ore generation.
     */
    seed: number;
    /**
     * The noise functions to use.
     *
     * If not specified, it will generate it based off of the seed.
     *
     * @see {@link getNoise}
     *
     * @default getNoise(seed)
     */
    noise?: ReturnType<typeof getNoise>;
    /**
     * The offset to use for the noise functions.
     *
     * The actual block positions will not be offset, instead it will offset the coordinates passed into the noise functions.
     *
     * @default
     * ```typescript
     * {x: 0, y: 0, z: 0}
     * ```
     */
    offset?: Partial<Vector3> | undefined;
    /**
     * The scale to use for the noise functions.
     *
     * The actual block positions will not be scaled, instead it will scale the coordinates passed into the noise functions.
     *
     * @default
     * ```typescript
     * {x: 0, y: 0, z: 0}
     * ```
     */
    scale?: Partial<Vector3> | undefined;
    /**
     * The categories of ores to generate.
     *
     * If not specified, it will generate all ore categories.
     *
     * @default
     * ```typescript
     * {
     *     blob: true,
     *     ore: true,
     * }
     * ```
     */
    includedCategories?: {
        [key in OreFeatureCategory]?: boolean;
    } | undefined;
    /**
     * The types of ores and blobs to generate.
     *
     * This will override any biome-specific ore configurations and the {@link includedCategories} option.
     *
     * To presere these settings use {@link orePalette} instead.
     */
    oreTypes?: OreTypes | undefined;
    /**
     * The types of ores and blobs to generate.
     *
     * Unlike {@link OreGenerationOptions.oreTypes}, this will be evaluated and filtered based on the biome and other settings.
     *
     * Only applied if {@link OreGenerationOptions.oreTypes} is not specified.
     *
     * @default
     * ```typescript
     * (oreTypes as OreTypesType).filter(
     *     (blockTypeData) =>
     *         (blockTypeData.biomes === "All" ||
     *         ("not" in blockTypeData.biomes ? !blockTypeData.biomes.not.includes(biome) : blockTypeData.biomes.includes(biome))) && includedOreFeatureCategories[blockTypeData.oreFeatureCategory]
     * )
     * ```
     */
    orePalette?: OreTypes | undefined;
    /**
     * Minimum amount of time in milliseconds to spend generating the ores each tick.
     *
     * @default config.system.defaultMinMSBetweenTickWaits
     */
    minMSBetweenTickWaits?: number | undefined;
}
/**
 * The category of an ore feature.
 *
 * `blob` means that it is a blob, like dirt and granite.
 *
 * `ore` means that it is an ore, like diamond ore, and deepslate coal ore.
 *
 * This is used for the following options:
 * - {@link GenerateTerrainOptions.generateOres}
 * - {@link GenerateTerrainOptions.generateBlobs}
 * - {@link OreGenerationOptions.includedCategories}
 */
export type OreFeatureCategory = "blob" | "ore";
/**
 * The generation type of an ore feature.
 *
 * [`ore_blob`](https://minecraft.wiki/w/Ore_(feature)#:~:text=scatter%20ores.-,An%20ore%20blob%20is,-an%20ellipsoidal%20cluster)
 * means that it generates in blobs, like dirt, granite, diamond ore, deepslate coal ore, and glowstone.
 *
 * [`scatter_ore`](https://minecraft.wiki/w/Ore_(feature)#:~:text=number%20of%20blocks-,A%20scatter%20ore%20is,-a%20slightly%20dispersed)
 * means that it generates as a slightly dispersed cluster of blocks, like ancient debris.
 */
export type OreFeatureType = "ore_blob" | "scatter_ore";
/**
 * This interface represents a blob type that can be generated.
 *
 * It is the value type used for the values of the {@link oreTypes} array.
 */
export interface BlockTypeData {
    /**
     * The type ID of the block.
     */
    id: TerrainGeneratorBlock;
    /**
     * The size of this blob type.
     *
     * The maximum number of blocks that will be generated in this blob type will be:
     * ```ts
     * spawnSizeToMaxBlocksMap[spawnSize]
     * ```
     *
     * @default 3
     */
    spawnSize: keyof typeof spawnSizeToMaxBlocksMap;
    /**
     * The number of instances of this blob type that will be attempted to be generated in each chunk.
     *
     * Should be an float greater than or equal to `0`.
     *
     * If it is set to 0, then this blob type will not generate.
     *
     * @default 1
     */
    spawnTriesPerChunk: number;
    /**
     * The minimum height that this blob type can spawn at.
     *
     * @default
     * ```typescript
     * (options as OreGenerationOptions).dimension.heightRange.min
     * ```
     */
    minHeight: number;
    /**
     * The maximum height that this blob type can spawn at.
     *
     * @default
     * ```typescript
     * (options as OreGenerationOptions).dimension.heightRange.max
     * ```
     */
    maxHeight: number;
    /**
     * How the frequency of the blob is spread out between {@link minHeight} and {@link maxHeight}.
     *
     * `Uniform` means that all positions in the area will have an equal frequency of the blob spawning there.
     *
     * `Triangle` means that positions closer to the point specified by `triangleOreConcentatePeakY` will have a higher frequency of the ores.
     *
     * @todo Make this option functional.
     *
     * @default "Uniform"
     */
    oreConcentrate: "Uniform" | "Triangle";
    /**
     * Where the `Triangle` distribution will have the highest frequency of this blob type.
     *
     * Only applies if {@link oreConcentrate} is set to `Triangle`.
     *
     * @todo Make this option functional.
     *
     * @default
     * ```typescript
     * maxHeight - (maxHeight - minHeight) / 2
     * ```
     */
    triangleOreConcentatePeakY?: number;
    /**
     * The chance for the blob type to skip being generated when exposed to air.
     *
     * Must be a float between 0 and 1 (inclusive).
     *
     * @todo Make this option functional.
     *
     * @default 0
     */
    skippedWhenAirExposed: number;
    /**
     * The biome types that this blob type can be generated in.
     *
     * If this is `All` then it will generate in all biome types.
     *
     * If this is an array then it will only generate in the biome types listed in that array.
     *
     * If this is an object with a `not` property that is an array, then it will generate in all biome types except for the biome types listed in that array.
     *
     * @default "All"
     */
    biomes: TerrainGeneratorBiome[] | "All" | {
        not: TerrainGeneratorBiome[];
    };
    /**
     * An array of namespaced block IDs that this blob type can replace.
     *
     * If not specified then it will replace all block IDs.
     *
     * If set to an empty array then the blob type will not generate.
     *
     * @default undefined
     */
    canReplace?: TerrainGeneratorBlock[] | undefined;
    /**
     * The chance for this blob type to successfully spawn.
     *
     * @default 1
     */
    threshold?: number | undefined;
    /**
     * The type ID of the block to use when replacing deepslate.
     *
     * @default id
     */
    deepslateVariant?: TerrainGeneratorBlock | undefined;
    /**
     * The category of an ore feature.
     *
     * `blob` means that it is a blob, like dirt and granite.
     *
     * `ore` means that it is an ore, like diamond ore, and deepslate coal ore.
     *
     * This is used for the following options:
     * - {@link GenerateTerrainOptions.generateOres}
     * - {@link GenerateTerrainOptions.generateBlobs}
     * - {@link OreGenerationOptions.includedCategories}
     *
     * @default "blob"
     */
    oreFeatureCategory: OreFeatureCategory;
    /**
     * The generation type of an ore feature.
     *
     * [`ore_blob`](https://minecraft.wiki/w/Ore_(feature)#:~:text=scatter%20ores.-,An%20ore%20blob%20is,-an%20ellipsoidal%20cluster)
     * means that it generates in blobs, like dirt, granite, diamond ore, deepslate coal ore, and glowstone.
     *
     * [`scatter_ore`](https://minecraft.wiki/w/Ore_(feature)#:~:text=number%20of%20blocks-,A%20scatter%20ore%20is,-a%20slightly%20dispersed)
     * means that it generates as a slightly dispersed cluster of blocks, like ancient debris.
     *
     * @todo Make this option functional.
     *
     * @default "ore_blob"
     */
    oreFeatureType: OreFeatureType;
}
export type OreTypes = BlockTypeData[];
export declare const oreTypes: [{
    readonly id: "minecraft:dirt";
    readonly spawnSize: 33;
    readonly threshold: 0.2;
    readonly spawnTriesPerChunk: 7;
    readonly minHeight: 0;
    readonly maxHeight: 160;
    readonly oreConcentrate: "Uniform";
    readonly skippedWhenAirExposed: 0;
    readonly biomes: {
        readonly not: ["minecraft:hell", "minecraft:warped_forest", "minecraft:crimson_forest", "minecraft:basalt_deltas", "minecraft:soulsand_valley", "minecraft:the_end"];
    };
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone"];
    readonly oreFeatureCategory: "blob";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:clay";
    readonly spawnSize: 33;
    readonly threshold: 0.2;
    readonly spawnTriesPerChunk: 46;
    readonly minHeight: -64;
    readonly maxHeight: 256;
    readonly oreConcentrate: "Uniform";
    readonly skippedWhenAirExposed: 0;
    readonly biomes: ["minecraft:lush_caves"];
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone"];
    readonly oreFeatureCategory: "blob";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:gravel";
    readonly spawnSize: 33;
    readonly threshold: 0.2;
    readonly spawnTriesPerChunk: 14;
    readonly minHeight: -64;
    readonly maxHeight: 320;
    readonly oreConcentrate: "Uniform";
    readonly skippedWhenAirExposed: 0;
    readonly biomes: {
        readonly not: ["minecraft:hell", "minecraft:warped_forest", "minecraft:crimson_forest", "minecraft:basalt_deltas", "minecraft:soulsand_valley", "minecraft:the_end"];
    };
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone", "minecraft:deepslate"];
    readonly oreFeatureCategory: "blob";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:granite";
    readonly spawnSize: 64;
    readonly threshold: 0.2;
    readonly spawnTriesPerChunk: 2;
    readonly minHeight: 0;
    readonly maxHeight: 60;
    readonly oreConcentrate: "Uniform";
    readonly skippedWhenAirExposed: 0;
    readonly biomes: {
        readonly not: ["minecraft:hell", "minecraft:warped_forest", "minecraft:crimson_forest", "minecraft:basalt_deltas", "minecraft:soulsand_valley", "minecraft:the_end"];
    };
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone"];
    readonly oreFeatureCategory: "blob";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:diorite";
    readonly spawnSize: 64;
    readonly threshold: 0.2;
    readonly spawnTriesPerChunk: 2;
    readonly minHeight: 0;
    readonly maxHeight: 60;
    readonly oreConcentrate: "Uniform";
    readonly skippedWhenAirExposed: 0;
    readonly biomes: {
        readonly not: ["minecraft:hell", "minecraft:warped_forest", "minecraft:crimson_forest", "minecraft:basalt_deltas", "minecraft:soulsand_valley", "minecraft:the_end"];
    };
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone"];
    readonly oreFeatureCategory: "blob";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:andesite";
    readonly spawnSize: 64;
    readonly threshold: 0.2;
    readonly spawnTriesPerChunk: 2;
    readonly minHeight: 0;
    readonly maxHeight: 60;
    readonly oreConcentrate: "Uniform";
    readonly skippedWhenAirExposed: 0;
    readonly biomes: {
        readonly not: ["minecraft:hell", "minecraft:warped_forest", "minecraft:crimson_forest", "minecraft:basalt_deltas", "minecraft:soulsand_valley", "minecraft:the_end"];
    };
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone"];
    readonly oreFeatureCategory: "blob";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:tuff";
    readonly spawnSize: 64;
    readonly threshold: 0.2;
    readonly spawnTriesPerChunk: 2;
    readonly minHeight: -64;
    readonly maxHeight: 0;
    readonly oreConcentrate: "Uniform";
    readonly skippedWhenAirExposed: 0;
    readonly biomes: {
        readonly not: ["minecraft:hell", "minecraft:warped_forest", "minecraft:crimson_forest", "minecraft:basalt_deltas", "minecraft:soulsand_valley", "minecraft:the_end"];
    };
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone", "minecraft:deepslate"];
    readonly oreFeatureCategory: "blob";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:coal_ore";
    readonly spawnSize: 17;
    readonly threshold: 0.1;
    readonly spawnTriesPerChunk: 20;
    readonly minHeight: 0;
    readonly maxHeight: 192;
    readonly oreConcentrate: "Triangle";
    readonly skippedWhenAirExposed: 0.5;
    readonly biomes: {
        readonly not: ["minecraft:hell", "minecraft:warped_forest", "minecraft:crimson_forest", "minecraft:basalt_deltas", "minecraft:soulsand_valley", "minecraft:the_end"];
    };
    readonly deepslateVariant: "minecraft:deepslate_coal_ore";
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone", "minecraft:deepslate"];
    readonly oreFeatureCategory: "ore";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:iron_ore";
    readonly spawnSize: 4;
    readonly threshold: 0.1;
    readonly spawnTriesPerChunk: 10;
    readonly minHeight: -64;
    readonly maxHeight: 72;
    readonly oreConcentrate: "Uniform";
    readonly skippedWhenAirExposed: 0;
    readonly biomes: {
        readonly not: ["minecraft:hell", "minecraft:warped_forest", "minecraft:crimson_forest", "minecraft:basalt_deltas", "minecraft:soulsand_valley", "minecraft:the_end"];
    };
    readonly deepslateVariant: "minecraft:deepslate_iron_ore";
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone", "minecraft:deepslate"];
    readonly oreFeatureCategory: "ore";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:copper_ore";
    readonly spawnSize: 10;
    readonly threshold: 0.1;
    readonly spawnTriesPerChunk: 16;
    readonly minHeight: -16;
    readonly maxHeight: 112;
    readonly oreConcentrate: "Triangle";
    readonly skippedWhenAirExposed: 0;
    readonly biomes: {
        readonly not: ["minecraft:dripstone_caves", "minecraft:hell", "minecraft:warped_forest", "minecraft:crimson_forest", "minecraft:basalt_deltas", "minecraft:soulsand_valley", "minecraft:the_end"];
    };
    readonly deepslateVariant: "minecraft:deepslate_copper_ore";
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone", "minecraft:deepslate"];
    readonly oreFeatureCategory: "ore";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:redstone_ore";
    readonly spawnSize: 8;
    readonly threshold: 0.1;
    readonly spawnTriesPerChunk: 4;
    readonly minHeight: -64;
    readonly maxHeight: 15;
    readonly oreConcentrate: "Uniform";
    readonly skippedWhenAirExposed: 0;
    readonly biomes: {
        readonly not: ["minecraft:hell", "minecraft:warped_forest", "minecraft:crimson_forest", "minecraft:basalt_deltas", "minecraft:soulsand_valley", "minecraft:the_end"];
    };
    readonly deepslateVariant: "minecraft:deepslate_redstone_ore";
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone", "minecraft:deepslate"];
    readonly oreFeatureCategory: "ore";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:lapis_ore";
    readonly spawnSize: 7;
    readonly threshold: 0.1;
    readonly spawnTriesPerChunk: 2;
    readonly minHeight: -32;
    readonly maxHeight: 32;
    readonly oreConcentrate: "Triangle";
    readonly skippedWhenAirExposed: 0;
    readonly biomes: {
        readonly not: ["minecraft:hell", "minecraft:warped_forest", "minecraft:crimson_forest", "minecraft:basalt_deltas", "minecraft:soulsand_valley", "minecraft:the_end"];
    };
    readonly deepslateVariant: "minecraft:deepslate_lapis_ore";
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone", "minecraft:deepslate"];
    readonly oreFeatureCategory: "ore";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:gold_ore";
    readonly spawnSize: 9;
    readonly threshold: 0.1;
    readonly spawnTriesPerChunk: 4;
    readonly minHeight: -64;
    readonly maxHeight: 32;
    readonly oreConcentrate: "Triangle";
    readonly skippedWhenAirExposed: 0.5;
    readonly biomes: {
        readonly not: ["minecraft:hell", "minecraft:warped_forest", "minecraft:crimson_forest", "minecraft:basalt_deltas", "minecraft:soulsand_valley", "minecraft:the_end"];
    };
    readonly deepslateVariant: "minecraft:deepslate_gold_ore";
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone", "minecraft:deepslate"];
    readonly oreFeatureCategory: "ore";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:diamond_ore";
    readonly spawnSize: 4;
    readonly threshold: 0.01;
    readonly spawnTriesPerChunk: 7;
    readonly minHeight: -64;
    readonly maxHeight: 16;
    readonly oreConcentrate: "Triangle";
    readonly skippedWhenAirExposed: 0.5;
    readonly biomes: {
        readonly not: ["minecraft:hell", "minecraft:warped_forest", "minecraft:crimson_forest", "minecraft:basalt_deltas", "minecraft:soulsand_valley", "minecraft:the_end"];
    };
    readonly deepslateVariant: "minecraft:deepslate_diamond_ore";
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone", "minecraft:deepslate"];
    readonly oreFeatureCategory: "ore";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:emerald_ore";
    readonly spawnSize: 3;
    readonly threshold: 0.01;
    readonly spawnTriesPerChunk: 100;
    readonly minHeight: -16;
    readonly maxHeight: 480;
    readonly oreConcentrate: "Triangle";
    readonly skippedWhenAirExposed: 0;
    readonly biomes: ["minecraft:extreme_hills", "minecraft:grove", "minecraft:cherry_grove", "minecraft:jagged_peaks", "minecraft:meadow", "minecraft:frozen_peaks", "minecraft:stony_peaks", "minecraft:extreme_hills_plus_trees", "minecraft:snowy_slopes", "minecraft:extreme_hills_mutated", "minecraft:extreme_hills_edge", "minecraft:extreme_hills_plus_trees_mutated"];
    readonly deepslateVariant: "minecraft:deepslate_emerald_ore";
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone", "minecraft:deepslate"];
    readonly oreFeatureCategory: "ore";
    readonly oreFeatureType: "ore_blob";
}, {
    readonly id: "minecraft:infested_stone";
    readonly spawnSize: 9;
    readonly threshold: 0.01;
    readonly spawnTriesPerChunk: 14;
    readonly minHeight: -64;
    readonly maxHeight: 63;
    readonly oreConcentrate: "Uniform";
    readonly skippedWhenAirExposed: 0;
    readonly biomes: ["minecraft:extreme_hills", "minecraft:grove", "minecraft:cherry_grove", "minecraft:jagged_peaks", "minecraft:meadow", "minecraft:frozen_peaks", "minecraft:stony_peaks", "minecraft:extreme_hills_plus_trees", "minecraft:snowy_slopes", "minecraft:extreme_hills_mutated", "minecraft:extreme_hills_edge", "minecraft:extreme_hills_plus_trees_mutated"];
    readonly deepslateVariant: "minecraft:infested_deepslate";
    readonly canReplace: ["minecraft:andesite", "minecraft:diorite", "minecraft:granite", "minecraft:polished_andesite", "minecraft:polished_diorite", "minecraft:polished_granite", "minecraft:stone", "minecraft:deepslate"];
    readonly oreFeatureCategory: "blob";
    readonly oreFeatureType: "ore_blob";
}];
export type OreTypesType = ReplaceTypeOfKey<ReplaceTypeOfKey<typeof oreTypes, "biomes", TerrainGeneratorBiome[] | "All" | {
    not: TerrainGeneratorBiome[];
}>, "deepslateVariant", BlockTypeData["deepslateVariant"]>;
export declare const spawnSizeToMaxBlocksMap: {
    readonly 0: 0;
    readonly 1: 0;
    readonly 2: 0;
    readonly 3: 4;
    readonly 4: 5;
    readonly 5: 8;
    readonly 6: 9;
    readonly 7: 10;
    readonly 8: 10;
    readonly 9: 13;
    readonly 10: 16;
    readonly 11: 17;
    readonly 12: 23;
    readonly 13: 24;
    readonly 14: 24;
    readonly 15: 29;
    readonly 16: 32;
    readonly 17: 37;
    readonly 18: 46;
    readonly 19: 52;
    readonly 20: 52;
    readonly 21: 60;
    readonly 22: 68;
    readonly 23: 68;
    readonly 24: 74;
    readonly 25: 82;
    readonly 26: 94;
    readonly 27: 104;
    readonly 28: 106;
    readonly 29: 120;
    readonly 30: 128;
    readonly 31: 135;
    readonly 32: 149;
    readonly 33: 160;
    readonly 34: 180;
    readonly 35: 190;
    readonly 36: 204;
    readonly 37: 212;
    readonly 38: 228;
    readonly 39: 246;
    readonly 40: 262;
    readonly 41: 276;
    readonly 42: 292;
    readonly 43: 308;
    readonly 44: 324;
    readonly 45: 344;
    readonly 46: 360;
    readonly 47: 381;
    readonly 48: 403;
    readonly 49: 429;
    readonly 50: 452;
    readonly 51: 480;
    readonly 52: 500;
    readonly 53: 530;
    readonly 54: 558;
    readonly 55: 584;
    readonly 56: 616;
    readonly 57: 634;
    readonly 58: 664;
    readonly 59: 694;
    readonly 60: 730;
    readonly 61: 760;
    readonly 62: 790;
    readonly 63: 826;
    readonly 64: 864;
};
export declare function placeOres(options: OreGenerationOptions): Promise<{
    startTick: number;
    startTime: number;
    endTick: number;
    endTime: number;
    totalTicks: number;
    totalTime: number;
    totalTimeSpentGenerating: number;
    oresAttemptedToBePlaced: bigint;
    oresActuallyPlaced: bigint;
    oresGenerated: bigint;
    blobsGenerated: bigint;
    oreBlocksGenerated: bigint;
    blobBlocksGenerated: bigint;
}>;
export declare function getBlockType(y: number, baseHeight: number, biome: string, noiseValue: number): string;
export declare function getBlockTypeV2(pos: Vector3, localMaxHeight: number, baseHeight: number, biome: TerrainGeneratorBiome, noise: ReturnType<typeof getNoise>, heightNoiseValue: number, offset: Vector3, scale: Vector3): string;
