import { type Vector3, CompoundBlockVolume, Dimension, type DimensionLocation, Entity } from "@minecraft/server";
export declare function generateTickingAreaFillCoordinatesC(center: Vector3, area: CompoundBlockVolume, dimension: Dimension, spawnEntityCallback?: (location: DimensionLocation, locations: Entity[], index: number) => any): Promise<Entity[]>;
