import { type Vector3, type StructureCreateOptions, type StructurePlaceOptions } from "@minecraft/server";
export declare class AreaBackup {
    id: string;
    constructor(id: string);
    get from(): Vector3;
    get to(): Vector3;
    get dimension(): import("@minecraft/server").Dimension;
    get backups(): number[];
    get backupStructureIds(): string[];
    saveIds(timestamp: number | string): string[];
    get size(): Vector3;
    toJSON(): {
        id: string;
        from: Vector3;
        to: Vector3;
        dimension: import("@minecraft/server").Dimension;
    };
    toJSONNoId(): {
        from: Vector3;
        to: Vector3;
        dimension: import("@minecraft/server").Dimension;
    };
    delete(): void;
    clear(): void;
    clearBackup(timestamp: number | string): void;
    clearBackups(): void;
    backupRange(range: [from: Vector3, to: Vector3, indices: Vector3], saveTime: number, options?: StructureCreateOptions): void;
    backup(saveTime?: number, options?: StructureCreateOptions, sizeLimits?: {
        x: number;
        y: number;
        z: number;
    }): void;
    rollback(saveTime?: number, clearSave?: boolean, options?: StructurePlaceOptions, sizes?: Vector3): 0 | 1;
}
