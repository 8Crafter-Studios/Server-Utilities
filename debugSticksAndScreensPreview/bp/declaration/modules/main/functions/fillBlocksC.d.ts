import { type Vector3, Dimension } from "@minecraft/server";
/**
 * @deprecated
 */
export declare function fillBlocksC(begin: Vector3, end: Vector3, dimension: Dimension, blocktype?: string, blockStates?: Record<string, string | number | boolean>, matchingBlock?: string, matchingBlockStates?: Record<string, string | number | boolean>, overrideAllBlockStates?: boolean): number;
