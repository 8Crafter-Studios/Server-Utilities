import { type Vector3, Dimension } from "@minecraft/server";
/**
 * @deprecated
 */
export declare function fillBlocksHP(from: Vector3, to: Vector3, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
}, placeholderid?: string, replacemode?: boolean): number;
