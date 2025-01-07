import { type Vector3, Dimension } from "@minecraft/server";
/**
 * @deprecated
 */
export declare function fillBlocksHC(center: Vector3, radius: number, dimension: Dimension, axis: string, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
}, placeholderid?: string, replacemode?: boolean): number;
