import { type Vector3, Dimension, type DimensionLocation } from "@minecraft/server";
export declare function generateHollowFillBG(begin: Vector3, end: Vector3, dimension: Dimension, generatorProgressId: string, minMSBetweenYields?: number, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, onComplete?: () => any, integrity?: number): Generator<void, void, unknown>;
