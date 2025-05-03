import { type Vector3, Dimension, BlockPermutation, BlockType } from "@minecraft/server";
/**
 * @deprecated
 */
export declare function fillBlocksF(from: Vector3, to: Vector3, dimension: Dimension, block: string | BlockPermutation | BlockType, options?: {
    matchingBlock?: BlockPermutation | BlockType | string;
}): number;
