import { type Vector3, Dimension, type DimensionLocation } from "@minecraft/server";
export declare function generateDomeBG(center: Vector3, radius: number, thickness: number, dimension: Dimension, generatorProgressId: string, minMSBetweenYields?: number, placeBlockCallback?: (location: DimensionLocation) => any, onComplete?: () => any, integrity?: number): Generator<void, void, unknown>;
