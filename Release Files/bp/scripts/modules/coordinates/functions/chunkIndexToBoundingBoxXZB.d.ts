import type { BoundingBox, VectorXZ } from "@minecraft/server";
export declare function chunkIndexToBoundingBoxXZB(chunkIndex: VectorXZ, heightRange?: {
    min: number;
    max: number;
}): BoundingBox;
