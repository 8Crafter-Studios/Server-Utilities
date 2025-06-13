import { type Vector3, type StructureCreateOptions, type StructurePlaceOptions, type Dimension } from "@minecraft/server";
/**
 * An interface representing the data of an area backup.
 */
export interface SavedAreaBackupData {
    /**
     * The ID of the area backup.
     *
     * @type {string}
     */
    id: string;
    /**
     * The corner of the backed up area.
     *
     * @type {Vector3}
     */
    from: Vector3;
    /**
     * The opposite corner of the backed up area.
     *
     * @type {Vector3}
     */
    to: Vector3;
    /**
     * The id of the dimension of the backed up area.
     *
     * @type {string}
     */
    dimension: string;
}
/**
 * A class representing an area backup.
 */
export declare class AreaBackup {
    /**
     * The ID of the area backup.
     */
    readonly id: string;
    /**
     * Creates a new AreaBackup instance.
     *
     * @param {string} id The ID of the area backup.
     */
    constructor(id: string);
    /**
     * The corner of the backed up area.
     *
     * @type {Vector3}
     */
    get from(): Vector3;
    /**
     * The opposite corner of the backed up area.
     *
     * @type {Vector3}
     */
    get to(): Vector3;
    /**
     * The dimension of the backed up area.
     *
     * @type {Dimension}
     */
    get dimension(): Dimension;
    /**
     * The timestamps of the backups, sorted newest first.
     *
     * @type {number[]}
     */
    get backups(): number[];
    /**
     * The structure IDs of the backed up area.
     *
     * @type {string[]}
     */
    get backupStructureIds(): string[];
    /**
     * The structure IDs of the backed up area for a specific backup.
     *
     * @param {number | string} timestamp The timestamp to get the structure IDs for.
     * @returns {string[]} The structure IDs for the given timestamp.
     */
    saveIds(timestamp: number | string): string[];
    /**
     * The size of the backed up area.
     *
     * @type {Vector3}
     */
    get size(): Vector3;
    /**
     * The JSON representation of the area backup.
     *
     * @returns {SavedAreaBackupData} The JSON representation of the area backup.
     */
    toJSON(): SavedAreaBackupData;
    /**
     * The JSON representation of the area backup without the ID.
     *
     * @returns {Omit<SavedAreaBackupData, "id">} The JSON representation of the area backup without the ID.
     */
    toJSONNoId(): Omit<SavedAreaBackupData, "id">;
    /**
     * Deletes the area backup.
     */
    delete(): void;
    /**
     * Clears all backups from the area backup.
     */
    clear(): void;
    /**
     * Clears a specific backup from the area backup.
     *
     * @param {number | string} timestamp The timestamp of the backup to clear.
     */
    clearBackup(timestamp: number | string): void;
    /**
     * Clears all backups from the area backup.
     */
    clearBackups(): void;
    /**
     * Backs up a specific range of the area.
     *
     * @param {[from: Vector3, to: Vector3, indices: Vector3]} range The range to back up.
     * @param {number} saveTime The timestamp to save the backup.
     * @param {StructureCreateOptions} [options] The options to use when creating the backup.
     */
    backupRange(range: [from: Vector3, to: Vector3, indices: Vector3], saveTime: number, options?: StructureCreateOptions): void;
    /**
     * Backs up the area.
     *
     * @param {number} [saveTime=Date.now()] The timestamp to save the backup.
     * @param {StructureCreateOptions} [options] The options to use when creating the backup. Defaults to `{ saveMode: StructureSaveMode.World, includeBlocks: true, includeEntities: false }`.
     * @param {Vector3} [sizeLimits] The size limits to use when splitting the area. Defaults to `{ x: 64, y: 128, z: 64 }`.
     */
    backup(saveTime?: number, options?: StructureCreateOptions, sizeLimits?: Vector3): void;
    /**
     * Rolls back to a specific backup.
     *
     * @param {number} [saveTime=this.backups[0]] The timestamp of the backup to roll back to. Defaults to the newest backup.
     * @param {boolean} [clearSave=false] Whether to clear the backup after rolling back. Defaults to `false`.
     * @param {StructurePlaceOptions} [options] The options to use when placing the backup.
     * @param {Vector3} [sizes] The sizes to use when rolling back. Defaults to `{ x: 64, y: 128, z: 64 }`.
     * @returns {1 | 0} `1` if successful, `0` if not.
     */
    rollback(saveTime?: number, clearSave?: boolean, options?: StructurePlaceOptions, sizes?: Vector3): 1 | 0;
}
