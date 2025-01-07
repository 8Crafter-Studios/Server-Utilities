import { type Vector3, Dimension, type DimensionLocation, BlockType } from "@minecraft/server";
/**
 * Generates a fill.
 * @deprecated Legacy function. Superceeded by fillBlocksHFGB().
 * @async
 * @param {Vector3} begin The location of a corner of the area to fill in.
 * @param {Vector3} end The location of the opposite corner of the area to fill in.
 * @param {Dimension} dimension The dimension to generate the fill in.
 * @param block A string representing the block type to generate or a function to determine the BlockType to generate.
 * @param {Record<string, string | number | boolean>} blockStates The block states of the block permutation to generate.
 * @param options Optional extra options for the fill generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param {string} placeholderid The namespaced id of the block type to use as a placeholder block during generation.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the fill generation.
 * @returns A promise that resolves with the details of the fill generation once the fill generation is complete.
 */
export declare function fillBlocksHFG(begin: Vector3, end: Vector3, dimension: Dimension, block: string | ((location: DimensionLocation, index: bigint) => BlockType), blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
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
