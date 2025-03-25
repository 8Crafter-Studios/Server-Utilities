import { type Vector3, Dimension, type DimensionLocation } from "@minecraft/server";
export declare function generateMinecraftCircleOutlineBG(center: Vector3, radius: number, thickness: number, generatorProgressId: string, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation) => any, options?: {
    integrity?: number;
    minMSBetweenYields?: number;
}): Generator<void, void, unknown>;
