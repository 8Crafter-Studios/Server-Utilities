import { BlockPermutation, type Dimension, Direction, type Vector3 } from "@minecraft/server";
interface MazeOptions {
    airBlockType?: BlockPermutation;
    wallBlockType?: BlockPermutation;
    entranceDirection?: Direction;
    exitDirection?: Direction;
    complexity?: number;
}
export declare function mazeGenerator(startCorner: Vector3, endCorner: Vector3, dimension: Dimension, options: MazeOptions): Promise<void>;
export {};
