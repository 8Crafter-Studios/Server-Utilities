import type { Vector2 } from "@minecraft/server";
/**
 * @deprecated Use {@link chunkIndexToBoundingBoxXZB} instead.
 * @param chunkIndex
 * @param heightRange
 * @returns
 */
export declare function chunkIndexToBoundingBoxB(chunkIndex: Vector2, heightRange?: {
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
