import { type Vector3, Dimension, type DimensionLocation } from "@minecraft/server";
export declare function generateInverseSkygridBG(from: Vector3, to: Vector3, gridSize: number, generatorProgressId: string, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, options?: {
    integrity?: number;
    minMSBetweenYields?: number;
}): Generator<void, void, unknown>;
