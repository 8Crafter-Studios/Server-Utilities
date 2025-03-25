import { type Vector3, Dimension, type DimensionLocation } from "@minecraft/server";
/**
 * Generates a minecraft sphere.
 * @version 1.2.0
 * @generator
 */
export declare function generateMinecraftSphereBG(center: Vector3, radius: number, dimension: Dimension, generateMinecraftSphereBGProgressId: string, minMSBetweenYields?: number, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, onComplete?: () => any, integrity?: number): Generator<void, void, unknown>;
