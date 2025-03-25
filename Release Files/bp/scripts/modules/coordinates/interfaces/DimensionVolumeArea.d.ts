import type { Dimension, Vector3 } from "@minecraft/server";
export interface DimensionVolumeArea {
    dimension: Dimension;
    from: Vector3;
    to: Vector3;
}
