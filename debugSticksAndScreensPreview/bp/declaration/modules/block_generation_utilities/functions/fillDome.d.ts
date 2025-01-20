import { type Vector3, Dimension, type DimensionLocation, BlockPermutation } from "@minecraft/server";
import type { BlockMask } from "modules/commands/classes/BlockMask";
/**
 * Generates a hollow sphere in the specified area. Supports block masks.
 * @async
 * @param {Vector3} center The location of the center of the hollow sphere.
 * @param {number} radius The radius of the sphere sphere.
 * @param {number} thickness The thickness of the walls of the hollow sphere.
 * @param {Dimension} dimension The dimension to generate the fill in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the fill generation execution.
 * @param options.blockMask The block mask to match.
 * @param options.minMSBetweenTickWaits The shortest the generation can run for before pausing until the next tick.
 * @param options.replacemode Whether or not to clear container blocks before replacing them.
 * @param options.integrity The integrity of the fill generation.
 * @param options.liteMode Whether to skip keeping track of how many blocks were actually changed.
 * @param options.upsideDown Whether or not to generate the dome upside-down, as only generating the bottom half of the hollow sphere instead of only the top half.
 * @returns A promise that resolves with the details of the fill generation once the fill generation is complete.
 * @remarks The most modern version of the hollow sphere block filling functions.
 */
export declare function fillDome<LiteModeEnabled extends boolean = false>(center: Vector3, radius: number, thickness: number, dimension: Dimension, block: (location: DimensionLocation, index: bigint) => BlockPermutation, options?: {
    blockMask: BlockMask;
    minMSBetweenTickWaits?: number;
    replacemode?: boolean;
    integrity?: number;
    liteMode?: LiteModeEnabled;
    upsideDown?: boolean;
}): Promise<LiteModeEnabled extends true ? {
    startTick: number;
    endTick: number;
    startTime: number;
    endTime: number;
    containsUnloadedChunks: boolean;
} : {
    counter: bigint;
    done: boolean;
    startTick: number;
    endTick: number;
    startTime: number;
    endTime: number;
    containsUnloadedChunks: boolean;
}>;
