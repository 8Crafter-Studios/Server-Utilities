import type { Vector3, Dimension, DimensionLocation } from "@minecraft/server";
export declare function generateMinecraftCircleOutline(center: Vector3, radius: number, thickness: number, dimension: Dimension, placeBlockCallback: (location: DimensionLocation) => any, integrity?: number): void;
