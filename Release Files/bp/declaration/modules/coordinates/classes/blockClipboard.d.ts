import { type Vector3, Dimension, type StructureCreateOptions, type DimensionLocation, type StructurePlaceOptions } from "@minecraft/server";
export declare class blockClipboard {
    static get ids(): string[];
    static get saveSize(): Vector3;
    static clear(): void;
    static saveRange(dimension: Dimension, range: [from: Vector3, to: Vector3, indices: Vector3], options?: StructureCreateOptions): void;
    static save(dimension: Dimension, area: {
        from: Vector3;
        to: Vector3;
    }, options?: StructureCreateOptions, sizeLimits?: {
        x: number;
        y: number;
        z: number;
    }): void;
    static place(location: DimensionLocation, options?: StructurePlaceOptions, sizes?: {
        x: number;
        y: number;
        z: number;
    }): void;
}
