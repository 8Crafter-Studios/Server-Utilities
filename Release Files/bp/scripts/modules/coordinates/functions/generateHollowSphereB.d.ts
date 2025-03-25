import type { Vector3, Dimension, DimensionLocation } from "@minecraft/server";
import { coordinates } from "./coordinates";
export declare function generateHollowSphereB(center: Vector3, radius: number, thickness: number, dimension: Dimension, placeBlockCallback: (location: DimensionLocation) => any): typeof coordinates;
