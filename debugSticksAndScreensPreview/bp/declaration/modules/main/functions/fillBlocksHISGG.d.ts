import { type Vector3, Dimension } from "@minecraft/server";
import type { FillOptions2 } from "Main";
/**
 * Generates an inverse skygrid.
 * @deprecated
 * @async
 * @param {Vector3} from The location of a corner of the area to generate the inverse skygrid in.
 * @param {Vector3} to The location of the opposite corner of the area to generate the inverse skygrid in.
 * @param {number} skygridSize The size of the skygrid.
 * @param {Dimension} dimension The dimension to generate the inverse skygrid in.
 * @param {string} block The block type of the BlockPermutation to generate.
 * @param {Record<string, string | number | boolean>} blockStates The block states of the BlockPermutation to generate.
 * @param {FillOptions2} options Optional extra options for the inverse skygrid generation execution.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the inverse skygrid generation.
 * @returns A promise that resolves with the details of the inverse skygrid generation once the inverse skygrid generation is complete.
 */
export declare function fillBlocksHISGG(from: Vector3, to: Vector3, skygridSize: number, dimension: Dimension, block: string, blockStates?: Record<string, string | number | boolean>, options?: FillOptions2, placeholderid?: string, replacemode?: boolean, integrity?: number): Promise<{
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
