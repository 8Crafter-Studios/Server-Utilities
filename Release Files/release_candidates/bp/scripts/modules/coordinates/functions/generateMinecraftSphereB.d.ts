import type { Vector3, Dimension, DimensionLocation } from "@minecraft/server";
/**
 * Generates a minecraft sphere.
 * @deprecated Superceeded by generateMinecraftSphereBG().
 */
export declare function generateMinecraftSphereB(center: Vector3, radius: number, dimension: Dimension, placeBlockCallback: (location: DimensionLocation) => any): number;
