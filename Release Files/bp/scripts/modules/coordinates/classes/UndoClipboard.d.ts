import { type Vector3, Dimension, type StructureCreateOptions, type StructurePlaceOptions, type DimensionLocation } from "@minecraft/server";
import "init/classes/config";
/**
 * Stores WorldEdit undo history for the `\\undo` command.
 *
 * @template ClipboardID The ID of this undo clipboard.
 */
export declare class UndoClipboard<ClipboardID extends string = string> {
    /**
     * The ID of this undo clipboard.
     *
     * @type {ClipboardID}
     */
    readonly clipboardID: ClipboardID;
    /**
     * Creates a new block clipboard.
     *
     * @param {ClipboardID} clipboardID The ID of the block clipboard, must be unique, cannot contain commas, cannot be `global`.
     *
     * @throws {TypeError} If the block clipboard ID contains a comma.
     */
    constructor(clipboardID: ClipboardID);
    /**
     * The structure IDs of all of the saves of this undo clipboard.
     */
    get ids(): `undoclipboard:${ClipboardID};${number},${number},${number},${number}`[];
    /**
     * The structure IDs of the specified save of this undo clipboard.
     *
     * @template Timestamp The timestamp of the save to get the structure IDs of.
     * @param {Timestamp} timestamp The timestamp of the save to get the structure IDs of.
     * @returns {`undoclipboard:${ClipboardID};${Timestamp},${number},${number},${number}`[]} The structure IDs of the specified save of this undo clipboard.
     */
    saveIds<Timestamp extends number | string>(timestamp: Timestamp): `undoclipboard:${ClipboardID};${Timestamp},${number},${number},${number}`[];
    /**
     * Gets the size of this undo clipboard.
     *
     * @param {number | string} timestamp The timestamp of the save to get the size of.
     * @returns {Vector3} The size of this undo clipboard.
     */
    getSaveSize(timestamp: number | string): Vector3;
    /**
     * Gets the location and dimension of the specified save of this undo clipboard.
     *
     * @param {number | string} timestamp The timestamp of the save to get the location of.
     * @returns {DimensionLocation} The location and dimension of the specified save of this undo clipboard.
     */
    getSaveLocation(timestamp: number | string): DimensionLocation;
    /**
     * The saves of this undo clipboard.
     */
    get saves(): `undoclipboard:${ClipboardID};${number}`[];
    /**
     * The save times of this undo clipboard.
     */
    get saveTimes(): number[];
    /**
     * The newest save time, or `undefined` if there are no saves.
     */
    get newestSaveTime(): number | undefined;
    /**
     * Removes all items from this undo clipboard that do not have a corresponding structure.
     */
    cullItemsMissingStructure(): void;
    /**
     * Removes all items from this undo clipboard.
     */
    clear(): void;
    /**
     * Removes all items from this undo clipboard with the specified timestamp.
     *
     * @param {number | string} timestamp The timestamp of the save to remove.
     */
    clearTime(timestamp: number | string): void;
    saveRange(dimension: Dimension, range: [from: Vector3, to: Vector3, indices: Vector3], saveTime: number, options?: StructureCreateOptions): void;
    /**
     * Saves the specified area to this undo clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to save to the clipboard.
     * @param {Vector3} area The area to save to the clipboard.
     * @param {number} [saveTime=Date.now()] The time that the action this undo is for took place.
     * @param {StructureCreateOptions} [options] The options to save the area to the clipboard with.
     * @param {Vector3} [sizeLimits={ x: 64, y: 128, z: 64 }] The maximum size of the area to save to the clipboard.
     */
    save(dimension: Dimension, area: {
        from: Vector3;
        to: Vector3;
    }, saveTime?: number, options?: StructureCreateOptions, sizeLimits?: Vector3): void;
    /**
     * Undoes the action saved at the specified time.
     *
     * @param {number} [saveTime=this.newestSaveTime] The time that the action this undo is for took place. Defaults to the newest save.
     * @param {StructurePlaceOptions} [options] The options to undo the action with.
     * @param {boolean} [clearSave=true] Whether to clear the save after undoing it. Defaults to `true`.
     * @param {Vector3} [sizes={ x: 64, y: 128, z: 64 }] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     * @returns {1 | 0} `1` if the action was undone, `0` if the action was not found.
     */
    undo(saveTime?: number, options?: StructurePlaceOptions, clearSave?: boolean, sizes?: Vector3): 1 | 0;
    /**
     * Undoes the action saved at the specified time asynchronously.
     *
     * @param {number} [saveTime=this.newestSaveTime] The time that the action this undo is for took place. Defaults to the newest save.
     * @param {StructurePlaceOptions} [options] The options to undo the action with.
     * @param {boolean} [clearSave] Whether to clear the save after undoing it. Defaults to `true`.
     * @param {Vector3} [sizes] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     * @param {number} [minMSBetweenTickWaits] The minimum number of milliseconds between tick waits. Defaults to {@link config.system.defaultMinMSBetweenTickWaits}.
     * @returns {Promise<1 | 0>} A promise that resolves to `1` if the action was undone or `0` if the action was not found.
     */
    undoAsync(saveTime?: number, options?: StructurePlaceOptions, clearSave?: boolean, sizes?: Vector3, minMSBetweenTickWaits?: number): Promise<1 | 0>;
    /**
     * Gets all undo clipboard IDs.
     *
     * @returns {string[]} An array of all of this undo clipboard IDs.
     */
    static getAllClipboardIDs(): string[];
    /**
     * Gets all undo clipboards.
     *
     * @returns {BlockClipboard[]} An array of all of this undo clipboards.
     */
    static getAllClipboards(): UndoClipboard[];
    /**
     * Gets undo clipboards by their IDs.
     *
     * @template ClipboardIDs The IDs of this undo clipboards to get.
     * @param {ClipboardIDs} clipboardIDs The IDs of this undo clipboards to get.
     * @returns {{ [K in keyof ClipboardIDs]: UndoClipboard<ClipboardIDs[K]> }} An array of this undo clipboards with the specified IDs.
     *
     * @throws {TypeError} If any of this undo clipboard IDs contain a comma.
     */
    static getClipboards<ClipboardIDs extends string[]>(clipboardIDs: ClipboardIDs): {
        [K in keyof ClipboardIDs]: UndoClipboard<ClipboardIDs[K]>;
    };
    /**
     * Gets an undo clipboard by its ID.
     *
     * If this undo clipboard does not exist, it will be created.
     *
     * @param {string} clipboardID The ID of this undo clipboard, must be unique, cannot contain commas.
     * @returns {BlockClipboard} this undo clipboard.
     *
     * @throws {TypeError} If this undo clipboard ID contains a comma.
     */
    static getClipboard<ClipboardID extends string>(clipboardID: ClipboardID): UndoClipboard<ClipboardID>;
    /**
     * Clears the contents of all undo clipboards.
     */
    static clearAllClipboards(): void;
    /**
     * Gets all save times from all undo clipboards.
     *
     * @returns {{ saveTime: number; clipboardID: string }[]} An array of all save times from all undo clipboards.
     */
    static getSaveTimesFromAllClipboards(): {
        saveTime: number;
        clipboardID: string;
    }[];
    /**
     * Undoes the last action on all undo clipboards.
     *
     * @param {StructurePlaceOptions} [options] The options to undo the action with.
     * @param {boolean} [clearSave] Whether to clear the save after undoing it. Defaults to `true`.
     * @param {Vector3} [sizes] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     * @returns {1 | 0} `1` if the action was undone, `0` if the action was not found.
     */
    static undoLastAction(options?: StructurePlaceOptions, clearSave?: boolean, sizes?: Vector3): 1 | 0;
    /**
     * Undoes the last action from any of the undo clipboards asynchronously.
     *
     * @param {StructurePlaceOptions} [options] The options to undo the action with.
     * @param {boolean} [clearSave] Whether to clear the save after undoing it. Defaults to `true`.
     * @param {Vector3} [sizes] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     * @param {number} [minMSBetweenTickWaits] The minimum number of milliseconds between tick waits. Defaults to {@link config.system.defaultMinMSBetweenTickWaits}.
     * @returns {Promise<1 | 0>} A promise that resolves to `1` if the action was undone or `0` if the action was not found.
     */
    static undoLastActionAsync(options?: StructurePlaceOptions, clearSave?: boolean, sizes?: Vector3, minMSBetweenTickWaits?: number): Promise<1 | 0>;
    /**
     * Removes all items from all undo clipboards that do not have a corresponding structure.
     */
    static cullItemsMissingStructure(): void;
}
