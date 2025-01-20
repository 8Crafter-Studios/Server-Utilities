import { type Vector3, Dimension } from "@minecraft/server";
/**
 * Generates a flood fill.
 * @deprecated Legacy function. Superceeded by {@link fillFlood}.
 * @async
 * @param {Vector3} begin The location of a corner of the area to flood.
 * @param {Vector3} end The location of the opposite corner of the area to flood.
 * @param {Dimension} dimension The dimension to generate the flood fill in.
 * @param options Optional extra options for the fill generation execution.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param integrity The integrity of the flood fill generation.
 * @returns A promise that resolves with the details of the flood fill generation once the flood fill generation is complete.
 */
export declare function fillBlocksHFFGB(begin: Vector3, end: Vector3, dimension: Dimension, options?: {
    minMSBetweenYields?: number;
}, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
