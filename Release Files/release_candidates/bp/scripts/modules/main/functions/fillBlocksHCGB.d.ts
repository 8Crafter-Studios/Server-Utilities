import { type Vector3, Dimension, type DimensionLocation, BlockPermutation } from "@minecraft/server";
/**
 * Generates a cone.
 * @deprecated Legacy function. Superceeded by {@link fillCone}.
 * @since 1.18.0-development.20
 * @version 1.0.0
 * @param {Vector3} center The location of the bottom center of the cone.
 * @param {number} radius Radius of the cone.
 * @param {number} height Height of the cone.
 * @param {Dimension} dimension The dimension to generate the cone in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the cone generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the cone generation.
 * @returns A promise that resolves with the details of the cone generation once the cone generation is complete.
 */
export declare function fillBlocksHCGB(center: Vector3, radius: number, height: number, dimension: Dimension, block: (location: DimensionLocation, index: bigint) => BlockPermutation, options?: {
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
