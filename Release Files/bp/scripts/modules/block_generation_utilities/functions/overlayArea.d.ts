import { type Vector3, Dimension, type DimensionLocation, BlockPermutation } from "@minecraft/server";
import type { BlockMask } from "modules/commands/classes/BlockMask";
/**
 * Options for the {@link overlayArea} function.
 */
export interface OverlayAreaOptions<LiteModeEnabled extends boolean = false> {
    /**
     * The block mask to use to determine which blocks to overlay.
     *
     * If not specified, all blocks will be overlayed.
     *
     * @default undefined
     */
    blockMask?: BlockMask;
    /**
     * The shortest the generation can run for before pausing until the next tick.
     *
     * @see {@link config.system.defaultMinMSBetweenTickWaits}
     *
     * @default config.system.defaultMinMSBetweenTickWaits
     */
    minMSBetweenTickWaits?: number;
    /**
     * Whether or not to clear container blocks before replacing them.
     *
     * @default false
     */
    replacemode?: boolean;
    /**
     * The integrity of the fill generation.
     *
     * @default 1
     */
    integrity?: number;
    /**
     * Whether to skip keeping track of how many blocks were actually changed.
     *
     * @default false
     */
    liteMode?: LiteModeEnabled;
    /**
     * The number of layers to generate.
     *
     * @default 1
     */
    layers?: number;
    /**
     * Whether to only overlay solid blocks (passable and liquid blocks may be replaced).
     *
     * @default false
     */
    onlySolid?: boolean;
    /**
     * Whether to use the same index for all sequence block patterns at each x and z location.
     *
     * @default false
     */
    pillarSequencePatternMode?: boolean;
}
/**
 * Covers the blocks in the specified area. Supports block masks.
 *
 * @async
 * @template LiteModeEnabled Whether to skip keeping track of how many blocks were actually changed.
 * @param {Vector3} begin The location of a corner of the area to cover.
 * @param {Vector3} end The location of the opposite corner of the area to cover.
 * @param {Dimension} dimension The dimension of the area to cover.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the overlay generation execution.
 * @returns A promise that resolves with the details of the overlay generation once the overlay generation is complete.
 */
export declare function overlayArea<LiteModeEnabled extends boolean = false>(begin: Vector3, end: Vector3, dimension: Dimension, block: (location: DimensionLocation, index: bigint) => BlockPermutation, options?: OverlayAreaOptions<LiteModeEnabled>): Promise<LiteModeEnabled extends true ? {
    startTick: number;
    endTick: number;
    startTime: number;
    endTime: number;
    containsUnloadedChunks: boolean;
} : {
    counter: bigint;
    startTick: number;
    endTick: number;
    startTime: number;
    endTime: number;
    containsUnloadedChunks: boolean;
}>;
