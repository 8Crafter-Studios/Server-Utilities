import { type Vector3, Dimension, type DimensionLocation, BlockType } from "@minecraft/server";
/**
 * @deprecated Legacy function. Superceeded by {@link fillBlocksHHFGB}.
 */
export declare function fillBlocksHHG(begin: Vector3, end: Vector3, dimension: Dimension, block: string | ((location: DimensionLocation) => BlockType), blockStates?: Record<string, string | number | boolean>, options?: {
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
