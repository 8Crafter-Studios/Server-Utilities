import { type Vector3, Dimension } from "@minecraft/server";
export declare function getNextTopSolidBlockAbovePosition(location: Vector3, dimension: Dimension, onlySolid?: boolean, allowLiquidAbove?: boolean, allowNonSolidBlocksAbove?: boolean, allowLiquidBelow?: boolean): import("@minecraft/server").Block;
