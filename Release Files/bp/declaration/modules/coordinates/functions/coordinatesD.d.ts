import type { Entity, Block, Vector2 } from "@minecraft/server";
export declare function coordinatesD(coordinateText: string, source: Entity | Block, rotation: Vector2): {
    x: number;
    y: number;
    z: number;
};
