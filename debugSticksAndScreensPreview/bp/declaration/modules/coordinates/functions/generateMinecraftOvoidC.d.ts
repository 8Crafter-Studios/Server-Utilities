import type { Vector3, Dimension, DimensionLocation } from "@minecraft/server";
export declare function generateMinecraftOvoidC(center: Vector3, radius: Vector3, offset: Vector3, thickness: number, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation) => any, integrity?: number): void;
