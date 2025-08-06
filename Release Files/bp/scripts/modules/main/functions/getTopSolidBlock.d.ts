import type { Vector3, Dimension, Block } from "@minecraft/server";
/**
 * Gets the top solid block at the specified location in the given dimension.
 *
 * @param {Vector3} location The position to check for the top solid block.
 * @param {Dimension} dimension The dimension in which to search for the block.
 * @param {boolean} [onlySolid=false] Whether to only consider solid blocks.
 * @returns {Block | undefined} The top solid block at the specified location, or `undefined` if none is found.
 */
export declare function getTopSolidBlock(location: Vector3, dimension: Dimension, onlySolid?: boolean): Block | undefined;
