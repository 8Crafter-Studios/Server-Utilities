import { type Vector3, Dimension } from "@minecraft/server";
import type { BlockMask } from "modules/commands/classes/BlockMask";
/**
 * Floods the specified area. Supports block masks.
 * @async
 * @param {Vector3} begin The location of a corner of the area to fill in.
 * @param {Vector3} end The location of the opposite corner of the area to fill in.
 * @param {Dimension} dimension The dimension to generate the fill in.
 * @param options Optional extra options for the fill generation execution.
 * @param options.blockMask The block mask to match.
 * @param options.minMSBetweenTickWaits The shortest the generation can run for before pausing until the next tick.
 * @param options.integrity The integrity of the fill generation.
 * @param options.liteMode Whether to skip keeping track of how many blocks were actually changed.
 * @returns A promise that resolves with the details of the fill generation once the fill generation is complete.
 * @remarks The most modern version of the flood filling functions.
 */
export declare function fillFlood<LiteModeEnabled extends boolean = false>(begin: Vector3, end: Vector3, dimension: Dimension, options?: {
    blockMask: BlockMask;
    minMSBetweenTickWaits?: number;
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
    done: boolean;
    startTick: number;
    endTick: number;
    startTime: number;
    endTime: number;
    containsUnloadedChunks: boolean;
}>;
