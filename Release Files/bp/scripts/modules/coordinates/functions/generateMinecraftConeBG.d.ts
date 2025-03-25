import { type Vector3, Dimension, type DimensionLocation } from "@minecraft/server";
/**
 * Generates a minecraft cone.
 * @since 1.18.0-development.20
 * @version 1.0.0
 * @generator
 */
export declare function generateMinecraftConeBG(center: Vector3, radius: number, height: number, dimension: Dimension, generateMinecraftConeBGProgressId: string, minMSBetweenYields?: number, placeBlockCallback?: (location: DimensionLocation, index: bigint) => any, onComplete?: () => any, integrity?: number): Generator<void, void, unknown>;
