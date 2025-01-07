import type { Dimension } from "@minecraft/server";
export interface DimensionRotationLocation {
    dimension: Dimension;
    rotX: number;
    rotY: number;
    x: number;
    y: number;
    z: number;
}
