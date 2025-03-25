import { type Vector3, Dimension, type DimensionLocation, BlockPermutation } from "@minecraft/server";
/**
 * Generates a walls fill.
 * @deprecated Legacy function. Superceeded by {@link fillWalls}.
 * @async
 * @param {Vector3} begin The location of a corner of the area to have its walls filled in.
 * @param {Vector3} end The location of the opposite corner of the area to have its walls filled in.
 * @param {Dimension} dimension The dimension to generate the walls fill in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the walls fill generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the walls fill generation.
 * @returns A promise that resolves with the details of the walls fill generation once the walls fill generation is complete.
 */
export declare function fillBlocksHWFGB(begin: Vector3, end: Vector3, dimension: Dimension, block: (location: DimensionLocation, index: bigint) => BlockPermutation, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, replacemode?: boolean, integrity?: number): Promise<{
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
