import { type Vector3, type Block, type Dimension } from "@minecraft/server";
/**
 * Gets the next top solid block above the provided position in the specified dimension.
 *
 * @param {Vector3} location The position to start searching from.
 * @param {Dimension} dimension The dimension to search in.
 * @param {boolean} [onlySolid=false] Whether to only consider solid blocks.
 * @param {boolean} [allowLiquidAbove=true] Whether to allow liquid blocks above the position.
 * @param {boolean} [allowNonSolidBlocksAbove=false] Whether to allow non-solid blocks above the position.
 * @param {boolean} [allowLiquidBelow=false] Whether to allow liquid blocks below the position.
 * @returns {Block | undefined} The next top solid block above the position, or `undefined` if none is found.
 *
 * @throws {Error} If no top solid block was found above the specified position.
 *
 * @author 8Crafter
 * @see https://www.youtube.com/@8Crafter
 * @see https://www.8crafter.com
 * @license MIT
 */
export declare function getNextTopSolidBlockAbovePosition(location: Vector3, dimension: Dimension, onlySolid?: boolean, allowLiquidAbove?: boolean, allowNonSolidBlocksAbove?: boolean, allowLiquidBelow?: boolean): Block | undefined;
