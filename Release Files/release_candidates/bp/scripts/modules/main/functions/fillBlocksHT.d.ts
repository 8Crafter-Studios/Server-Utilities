import { type Vector3, Dimension } from "@minecraft/server";
import type { FillOptions1 } from "Main";
/**
 * Generates a tunnel.
 * @deprecated Legacy function that may cause script hang errors. Superceeded by {@link fillTunnel}.
 * @param {Vector3} center The location of the center of the tunnel.
 * @param {number} radius The radius of the tunnel.
 * @param {number} length The length of the tunnel.
 * @param {number} axis The axis of the tunnel.
 * @param {Dimension} dimension The dimension to generate the tunnel in.
 * @param {string} block The block type of the block permutation to generate.
 * @param {Record<string, string | number | boolean>} [blockStates] - The block states of the block permutation to generate.
 * @param {FillOptions1} [options] - Optional extra options for the tunnel generation execution.
 * @param {string} [placeholderid] The namespaced id of the block type to use as a placeholder block during generation.
 * @param {boolean} [replacemode] Whether or not to clear container blocks before replacing them.
 * @param {number} [integrity] The integrity of the tunnel generation.
 * @returns A promise that resolves with the details of the tunnel generation once the tunnel generation is complete.
 */
export declare function fillBlocksHT(center: Vector3, radius: number, length: number, axis: string, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: FillOptions1, placeholderid?: string, replacemode?: boolean, integrity?: number): number;
