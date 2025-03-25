import type { Entity, Block, Vector3 } from "@minecraft/server";
export declare function coordinatesE(coordinateText: string, source: Entity | Block, rotation: Vector3): {
    x: number;
    y: number;
    z: number;
};
