import type { Vector3, Dimension } from "@minecraft/server";
export declare function getNextTopSolidBlockBelowPosition(location: Vector3, dimension: Dimension, onlySolid?: boolean, allowLiquidAbove?: boolean, allowNonSolidBlocksAbove?: boolean, allowLiquidBelow?: boolean): import("@minecraft/server").Block;
