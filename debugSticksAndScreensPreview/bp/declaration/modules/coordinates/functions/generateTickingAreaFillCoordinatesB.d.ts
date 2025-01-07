import { CompoundBlockVolume, Dimension, type DimensionLocation } from "@minecraft/server";
export declare function generateTickingAreaFillCoordinatesB(area: CompoundBlockVolume, dimension: Dimension, spawnEntityCallback?: (location: DimensionLocation, locations: DimensionLocation[], index: number) => any): DimensionLocation[];
