import { type Vector3, Dimension } from "@minecraft/server";
/**
 * @deprecated
 */
export declare function fillBlocksCG(begin: Vector3, end: Vector3, dimension: Dimension, blocktype?: string, blockStates?: Record<string, string | number | boolean>, matchingBlock?: string, matchingBlockStates?: Record<string, string | number | boolean>, overrideAllBlockStates?: boolean, onComplete?: (counter?: number, startTime?: number, completeTime?: number, totalTime?: number, argsObject?: any, ...args: any[]) => any, onCompleteArgsObject?: any, ...onCompleteArgs: any[]): Generator<any, void, unknown>;
