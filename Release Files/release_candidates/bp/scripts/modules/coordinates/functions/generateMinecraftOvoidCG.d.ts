import { type Vector3, Dimension, type DimensionLocation } from "@minecraft/server";
export declare function generateMinecraftOvoidCG(center: Vector3, radius: Vector3, offset: Vector3, thickness: number, generatorProgressId: string, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation) => any, options?: {
    integrity?: number;
    minMSBetweenYields?: number;
}): Generator<void, void, unknown>;
