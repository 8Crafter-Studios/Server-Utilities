import { type Vector3, Dimension } from "@minecraft/server";
export declare function scanForBlockType(from: Vector3, to: Vector3, dimension: Dimension, block: string, returnMode?: "" | "Vector3" | "Block"): import("@minecraft/server").Block[] | Vector3[];
