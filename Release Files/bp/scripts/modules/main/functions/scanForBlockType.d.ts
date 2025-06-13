import { type Vector3, Dimension } from "@minecraft/server";
export declare function scanForBlockType(from: Vector3, to: Vector3, dimension: Dimension, block: string, returnMode?: "" | "Vector3" | "Block"): Vector3[] | (import("@minecraft/server").Block | undefined)[];
