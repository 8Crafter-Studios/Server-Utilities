import { type Vector3, Dimension } from "@minecraft/server";
/**
 * Generates a hollow sphere.
 * @deprecated Legacy function that may cause script hang errors. Superceeded by {@link fillBlocksHHSG}.
 * @param {Vector3} center The location of the center of the hollow sphere.
 * @param {number} radius Radius of the hollow sphere.
 * @param {number} thickness Thickness of the hollow sphere.
 * @param {Dimension} dimension The dimension to generate the hollow sphere in.
 * @param {string} block The block type of the block permutation to generate.
 * @param {Record<string, string | number | boolean>} blockStates The block states of the block permutation to generate.
 * @param options Optional extra options for the sphere generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param {string} placeholderid The namespaced id of the block type to use as a placeholder block during generation.
 * @param {boolean} replacemode Whether or not to clear container blocks before replacing them.
 * @param {number} integrity The integrity of the hollow sphere generation.
 * @returns A promise that resolves with the details of the hollow sphere generation once the hollow sphere generation is complete.
 */
export declare function fillBlocksHHS(center: Vector3, radius: number, thickness: number, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
}, placeholderid?: string, replacemode?: boolean, integrity?: number): number;
