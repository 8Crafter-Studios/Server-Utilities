import type { Vector3, Dimension, DimensionLocation } from "@minecraft/server";
export declare function generateSolidOvoid(center: Vector3, radius: Vector3, offset: Vector3, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation) => any, integrity?: number): void;
