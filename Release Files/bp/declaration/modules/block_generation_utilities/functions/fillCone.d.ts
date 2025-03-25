import { type Vector3, Dimension, type DimensionLocation, BlockPermutation } from "@minecraft/server";
import type { BlockMask } from "modules/commands/classes/BlockMask";
/**
 * Generates a cone in the specified area. Supports block masks.
 * @async
 * @param {Vector3} center The location of the bottom center of the cone.
 * @param {number} radius Radius of the cone.
 * @param {number} height Height of the cone.
 * @param {Dimension} dimension The dimension to generate the fill in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the fill generation execution.
 * @param options.blockMask The block mask to match.
 * @param options.minMSBetweenTickWaits The shortest the generation can run for before pausing until the next tick.
 * @param options.replacemode Whether or not to clear container blocks before replacing them.
 * @param options.integrity The integrity of the fill generation.
 * @param options.liteMode Whether to skip keeping track of how many blocks were actually changed.
 * @returns A promise that resolves with the details of the fill generation once the fill generation is complete.
 * @remarks The most modern version of the cone block filling functions.
 */
export declare function fillCone<LiteModeEnabled extends boolean = false>(center: Vector3, radius: number, height: number, dimension: Dimension, block: (location: DimensionLocation, index: bigint) => BlockPermutation, options?: {
    blockMask: BlockMask;
    minMSBetweenTickWaits?: number;
    replacemode?: boolean;
    integrity?: number;
    liteMode?: LiteModeEnabled;
}): Promise<LiteModeEnabled extends true ? {
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
