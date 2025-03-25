import type { Vector3, Vector2 } from "@minecraft/server";
export declare function coordinates(coordinateText: string, startingPosition: Vector3, rotation: Vector2): {
    x: number;
    y: number;
    z: number;
};
