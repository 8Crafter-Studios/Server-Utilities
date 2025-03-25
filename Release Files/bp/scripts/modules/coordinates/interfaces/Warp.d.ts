import type { Vector3 } from "@minecraft/server";
export interface Warp {
    displayName: string;
    location: Vector3;
    dimension: typeof dimensionsd[number];
    icon?: string;
}
