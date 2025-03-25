import { type Vector3, Dimension, type StructureCreateOptions, type StructurePlaceOptions } from "@minecraft/server";
import "init/classes/config";
export declare class undoClipboard {
    static get ids(): string[];
    static saveIds(timestamp: number | string): string[];
    static saveSize(timestamp: number | string): Vector3;
    static get saves(): string[];
    static get saveTimes(): number[];
    static get newestSaveTime(): number;
    static cullItemsMissingStructure(): void;
    static clear(): void;
    static clearTime(timestamp: number | string): void;
    static saveRange(dimension: Dimension, range: [from: Vector3, to: Vector3, indices: Vector3], saveTime: number, options?: StructureCreateOptions): void;
    static save(dimension: Dimension, area: {
        from: Vector3;
        to: Vector3;
    }, saveTime?: number, options?: StructureCreateOptions, sizeLimits?: {
        x: number;
        y: number;
        z: number;
    }): void;
    static undo(saveTime?: number, options?: StructurePlaceOptions, clearSave?: boolean, sizes?: Vector3): 1 | 0;
}
