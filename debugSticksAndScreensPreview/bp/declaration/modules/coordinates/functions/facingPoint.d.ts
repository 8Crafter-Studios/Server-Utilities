import type { Vector3 } from "@minecraft/server";
export declare function facingPoint(location: Vector3, otherLocation: Vector3): {
    rot: {
        x: number;
        y: number;
    };
    difference: {
        x: number;
        y: number;
        z: number;
    };
};
