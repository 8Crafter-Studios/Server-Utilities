import { type Vector3, Dimension, type DimensionLocation, Entity } from "@minecraft/server";
import type { CompoundBlockVolume } from "CompoundBlockVolumePolyfill";
export declare function generateTickingAreaFillCoordinatesC(center: Vector3, area: CompoundBlockVolume, dimension: Dimension, spawnEntityCallback?: (location: DimensionLocation, locations: Entity[], index: number) => any): Promise<Entity[]>;
