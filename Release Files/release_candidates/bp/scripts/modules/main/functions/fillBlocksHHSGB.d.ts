import { type Vector3, Dimension, type DimensionLocation, BlockPermutation } from "@minecraft/server";
/**
 * Generates a hollow sphere.
 * @deprecated Legacy function. Superceeded by {@link fillHollowSphere}.
 * @since 1.18.0-development.27
 * @version 1.0.0
 * @param {Vector3} center The location of the center of the hollow sphere.
 * @param {number} radius Radius of the hollow sphere.
 * @param {number} thickness Thickness of the hollow sphere.
 * @param {Dimension} dimension The dimension to generate the hollow sphere in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the sphere generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param {boolean} replacemode Whether or not to clear container blocks before replacing them.
 * @param {number} integrity The integrity of the hollow sphere generation.
 * @returns A promise that resolves with the details of the hollow sphere generation once the hollow sphere generation is complete.
 */
export declare function fillBlocksHHSGB(center: Vector3, radius: number, thickness: number, dimension: Dimension, block: (location: DimensionLocation, index: bigint) => BlockPermutation, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
    verifyBlockActuallyChanged?: boolean;
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
