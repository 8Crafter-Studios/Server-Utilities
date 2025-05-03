import { type Vector3, Dimension, type DimensionLocation, BlockPermutation } from "@minecraft/server";
/**
 * Generates an inverse skygrid.
 * @deprecated Legacy function. Superceeded by {@link fillInverseSkygrid}.
 * @since 1.18.0-development.20
 * @version 1.0.0
 * @async
 * @param {Vector3} from The location of a corner of the area to generate the inverse skygrid in.
 * @param {Vector3} to The location of the opposite corner of the area to generate the inverse skygrid in.
 * @param {number} skygridSize The size of the skygrid.
 * @param {Dimension} dimension The dimension to generate the inverse skygrid in.
 * @param {string} block The block type of the BlockPermutation to generate.
 * @param {FillOptions2} options Optional extra options for the inverse skygrid generation execution.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the inverse skygrid generation.
 * @returns A promise that resolves with the details of the inverse skygrid generation once the inverse skygrid generation is complete.
 */
export declare function fillBlocksHISGGB(from: Vector3, to: Vector3, skygridSize: number, dimension: Dimension, block: (location: DimensionLocation, index: bigint) => BlockPermutation, options?: {
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
