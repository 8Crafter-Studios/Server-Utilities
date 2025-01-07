import { type Vector3, Dimension } from "@minecraft/server";
/**
 * @todo Make the new updated version of this function and then deprecate this one.
 */
export declare function fillBlocksHHOG(center: Vector3, radius: Vector3, offset: Vector3, thickness: number, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: {
    matchingBlock?: string;
    matchingBlockStates?: Record<string, string | number | boolean>;
    minMSBetweenYields?: number;
}, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
    counter: number;
    completionData: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks?: boolean;
    };
}>;
