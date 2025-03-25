import type { Vector3, Dimension, DimensionLocation } from "@minecraft/server";
export declare function generateSkygrid(from: Vector3, to: Vector3, gridSize: number, dimension?: Dimension, placeBlockCallback?: (location: DimensionLocation) => any, integrity?: number): void;
