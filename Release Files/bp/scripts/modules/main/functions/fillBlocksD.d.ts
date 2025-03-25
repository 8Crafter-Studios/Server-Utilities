import { type Vector3, Dimension } from "@minecraft/server";
/**
 * @deprecated
 */
export declare function fillBlocksD(from: Vector3, to: Vector3, dimension: Dimension, block?: string, blockStates?: Record<string, string | number | boolean>, matchingBlock?: string, matchingBlockStates?: Record<string, string | number | boolean>, overrideAllBlockStates?: boolean): number;
