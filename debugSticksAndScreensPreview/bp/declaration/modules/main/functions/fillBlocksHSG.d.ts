import { type Vector3, Dimension } from "@minecraft/server";
/**
 * Generates a sphere.
 * @deprecated Legacy function. Superceeded by fillBlocksHSGB().
 * @async
 * @param {Vector3} center The location of the center of the sphere.
 * @param {number} radius Radius of the sphere.
 * @param {Dimension} dimension The dimension to generate the sphere in.
 * @param {string} block The block type of the block permutation to generate.
 * @param {Record<string, string | number | boolean>} blockStates The block states of the block permutation to generate.
 * @param options Optional extra options for the sphere generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param {string} placeholderid The namespaced id of the block type to use as a placeholder block during generation.
 * @param {boolean} replacemode Whether or not to clear container blocks before replacing them.
 * @param {number} integrity The integrity of the sphere generation.
 * @returns A promise that resolves with the details of the sphere generation once the sphere generation is complete.
 */
export declare function fillBlocksHSG(center: Vector3, radius: number, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
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
