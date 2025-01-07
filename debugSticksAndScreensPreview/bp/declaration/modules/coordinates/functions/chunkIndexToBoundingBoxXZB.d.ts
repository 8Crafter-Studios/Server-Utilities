import type { Vector2 } from "@minecraft/server";
export declare function chunkIndexToBoundingBoxXZB(chunkIndex: Vector2, heightRange?: {
    min: number;
    max: number;
}): {
    from: {
        x: number;
        y: number;
        z: number;
    };
    to: {
        x: number;
        y: number;
        z: number;
    };
};
