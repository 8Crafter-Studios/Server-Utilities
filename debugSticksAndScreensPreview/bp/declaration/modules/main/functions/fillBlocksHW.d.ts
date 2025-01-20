import { type Vector3, Dimension } from "@minecraft/server";
/**
 * @deprecated Legacy function that may cause script hang error. Superceeded by {@link fillBlocksHWG}.
 */
export declare function fillBlocksHW(from: Vector3, to: Vector3, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
}, placeholderid?: string, replacemode?: boolean): number;
