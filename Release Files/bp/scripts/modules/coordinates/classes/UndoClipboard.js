import { world, Dimension } from "@minecraft/server";
import "init/classes/config";
import { splitArea } from "modules/coordinates/functions/splitArea";
/**
 * Stores WorldEdit undo history for the `\\undo` command.
 *
 * @template ClipboardID The ID of this undo clipboard.
 */
export class UndoClipboard {
    /**
     * The ID of this undo clipboard.
     *
     * @type {ClipboardID}
     */
    clipboardID;
    /**
     * Creates a new block clipboard.
     *
     * @param {ClipboardID} clipboardID The ID of the block clipboard, must be unique, cannot contain commas, cannot be `global`.
     *
     * @throws {TypeError} If the block clipboard ID contains a comma.
     */
    constructor(clipboardID) {
        if (clipboardID.includes(",")) {
            throw new TypeError(`Invalid clipboard ID: ${clipboardID}; Clipboard IDs cannot contain commas.`);
        }
        this.clipboardID = clipboardID;
        Object.defineProperty(this, "clipboardID", {
            enumerable: true,
            writable: false,
            configurable: true,
        });
    }
    /**
     * The structure IDs of all of the saves of this undo clipboard.
     */
    get ids() {
        return world.structureManager
            .getWorldStructureIds()
            .filter((v) => v.startsWith(`undoclipboard:${this.clipboardID};`));
    }
    /**
     * The structure IDs of the specified save of this undo clipboard.
     *
     * @template Timestamp The timestamp of the save to get the structure IDs of.
     * @param {Timestamp} timestamp The timestamp of the save to get the structure IDs of.
     * @returns {`undoclipboard:${ClipboardID};${Timestamp},${number},${number},${number}`[]} The structure IDs of the specified save of this undo clipboard.
     */
    saveIds(timestamp) {
        return world.structureManager
            .getWorldStructureIds()
            .filter((v) => v.startsWith(`undoclipboard:${this.clipboardID};${timestamp}`));
    }
    /**
     * Gets the size of this undo clipboard.
     *
     * @param {number | string} timestamp The timestamp of the save to get the size of.
     * @returns {Vector3} The size of this undo clipboard.
     */
    getSaveSize(timestamp) {
        return (world.getDynamicProperty(`undoclipboardsize:${this.clipboardID};${timestamp}`) ?? Vector.zero);
    }
    /**
     * Gets the location and dimension of the specified save of this undo clipboard.
     *
     * @param {number | string} timestamp The timestamp of the save to get the location of.
     * @returns {DimensionLocation} The location and dimension of the specified save of this undo clipboard.
     */
    getSaveLocation(timestamp) {
        return {
            ...world.getDynamicProperty(`undoclipboard:${this.clipboardID};${timestamp}`),
            dimension: world.getDimension(world.getDynamicProperty(`undoclipboarddimension:${this.clipboardID};${timestamp}`)),
        };
    }
    /**
     * The saves of this undo clipboard.
     */
    get saves() {
        return world.getDynamicPropertyIds().filter((v) => v.startsWith(`undoclipboard:${this.clipboardID};`));
    }
    /**
     * The save times of this undo clipboard.
     */
    get saveTimes() {
        return [
            ...new Set(world
                .getDynamicPropertyIds()
                .filter((v) => v.startsWith(`undoclipboard:${this.clipboardID};`))
                .map((v) => Number(v.replace(`undoclipboard:${this.clipboardID};`, "")))),
        ]
            .sort()
            .reverse();
    }
    /**
     * The newest save time, or `undefined` if there are no saves.
     */
    get newestSaveTime() {
        return this.saveTimes[0];
    }
    /**
     * Removes all items from this undo clipboard that do not have a corresponding structure.
     */
    cullItemsMissingStructure() {
        this.saveTimes.filter((v) => !world.structureManager.get(`undoclipboard:${this.clipboardID};${v},0,0,0`)).forEach((v) => this.clearTime(v));
    }
    /**
     * Removes all items from this undo clipboard.
     */
    clear() {
        this.ids.forEach((v) => world.structureManager.delete(v));
    }
    /**
     * Removes all items from this undo clipboard with the specified timestamp.
     *
     * @param {number | string} timestamp The timestamp of the save to remove.
     */
    clearTime(timestamp) {
        this.saveIds(timestamp).forEach((v) => world.structureManager.delete(v));
        world.setDynamicProperty(`undoclipboard:${this.clipboardID};${timestamp}`);
        world.setDynamicProperty(`undoclipboarddimension:${this.clipboardID};${timestamp}`);
        world.setDynamicProperty(`undoclipboardsize:${this.clipboardID};${timestamp}`);
    }
    saveRange(dimension, range, saveTime, options) {
        try {
            world.structureManager.createFromWorld(`undoclipboard:${this.clipboardID};${saveTime},${range[2].x ?? 0},${range[2].y ?? 0},${range[2].z ?? 0}`, dimension, range[0], range[1], options);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    /**
     * Saves the specified area to this undo clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to save to the clipboard.
     * @param {Vector3} area The area to save to the clipboard.
     * @param {number} [saveTime=Date.now()] The time that the action this undo is for took place.
     * @param {StructureCreateOptions} [options] The options to save the area to the clipboard with.
     * @param {Vector3} [sizeLimits={ x: 64, y: 128, z: 64 }] The maximum size of the area to save to the clipboard.
     */
    save(dimension, area, saveTime = Date.now(), options, sizeLimits = { x: 64, y: 128, z: 64 }) {
        world.setDynamicProperty(`undoclipboard:${this.clipboardID};${saveTime}`, area.from);
        world.setDynamicProperty(`undoclipboarddimension:${this.clipboardID};${saveTime}`, dimension.id);
        world.setDynamicProperty(`undoclipboardsize:${this.clipboardID};${saveTime}`, ((v) => ({
            x: Math.abs(v.x),
            y: Math.abs(v.y),
            z: Math.abs(v.z),
        }))(Vector.subtract(area.to, area.from)));
        for (const range of splitArea({
            from: { ...area.from, y: Math.min(dimension.heightRange.max, Math.max(dimension.heightRange.min, area.from.y)) },
            to: { ...area.to, y: Math.min(dimension.heightRange.max, Math.max(dimension.heightRange.min, area.to.y)) },
        }, sizeLimits)) {
            this.saveRange(dimension, range, saveTime, {
                saveMode: options?.saveMode ?? config.undoClipboardMode,
                includeBlocks: options?.includeBlocks,
                includeEntities: options?.includeEntities,
            });
        }
    }
    /**
     * Undoes the action saved at the specified time.
     *
     * @param {number} [saveTime=this.newestSaveTime] The time that the action this undo is for took place. Defaults to the newest save.
     * @param {StructurePlaceOptions} [options] The options to undo the action with.
     * @param {boolean} [clearSave=true] Whether to clear the save after undoing it. Defaults to `true`.
     * @param {Vector3} [sizes={ x: 64, y: 128, z: 64 }] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     * @returns {1 | 0} `1` if the action was undone, `0` if the action was not found.
     */
    undo(saveTime = this.newestSaveTime, options, clearSave = true, sizes = { x: 64, y: 128, z: 64 }) {
        if (this.ids.length == 0) {
            return 0;
        }
        const saveIDs = this.saveIds(saveTime);
        if (saveIDs.length == 0) {
            return 0;
        }
        saveIDs
            .map((v) => ({
            id: v,
            x: Number(v.split(",")[1] ?? 0) * sizes.x,
            y: Number(v.split(",")[2] ?? 0) * sizes.y,
            z: Number(v.split(",")[3] ?? 0) * sizes.z,
        }))
            .forEach((v) => {
            /*
        main.clearAllContainerBlocks(main.scanForContainerBlocks(v, Vector.add(v, sizes), dimensionsb[String(world.getDynamicProperty(`undoclipboarddimension:${this.clipboardID};${saveTime}`))]??overworld, "Block") as Block[])*/
            world.structureManager.place(v.id, dimensionsb[String(world.getDynamicProperty(`undoclipboarddimension:${this.clipboardID};${saveTime}`))] ??
                dimensionsb["minecraft:overworld"], Vector.add(v, world.getDynamicProperty(`undoclipboard:${this.clipboardID};${saveTime}`)), options);
        });
        if (clearSave) {
            this.saveIds(saveTime).forEach((v) => {
                this.clearTime(saveTime);
            });
        }
        return 1;
    }
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
    async undoAsync(saveTime = this.newestSaveTime, options, clearSave = true, sizes = { x: 64, y: 128, z: 64 }, minMSBetweenTickWaits = config.system.defaultMinMSBetweenTickWaits) {
        if (this.ids.length == 0) {
            return 0;
        }
        const saveIDs = this.saveIds(saveTime);
        if (saveIDs.length == 0) {
            return 0;
        }
        let msSinceLastTickWait = Date.now();
        for (const structure of saveIDs.map((v) => ({
            id: v,
            x: Number(v.split(",")[1] ?? 0) * sizes.x,
            y: Number(v.split(",")[2] ?? 0) * sizes.y,
            z: Number(v.split(",")[3] ?? 0) * sizes.z,
        }))) {
            /*
            main.clearAllContainerBlocks(main.scanForContainerBlocks(v, Vector.add(v, sizes), dimensionsb[String(world.getDynamicProperty(`undoclipboarddimension:${this.clipboardID};${saveTime}`))]??overworld, "Block") as Block[])*/
            world.structureManager.place(structure.id, dimensionsb[String(world.getDynamicProperty(`undoclipboarddimension:${this.clipboardID};${saveTime}`))] ??
                dimensionsb["minecraft:overworld"], Vector.add(structure, world.getDynamicProperty(`undoclipboard:${this.clipboardID};${saveTime}`)), options);
            if (Date.now() - msSinceLastTickWait >= minMSBetweenTickWaits) {
                await waitTick();
                msSinceLastTickWait = Date.now();
            }
        }
        if (clearSave) {
            this.saveIds(saveTime).forEach((v) => {
                this.clearTime(saveTime);
            });
        }
        return 1;
    }
    /**
     * Gets all undo clipboard IDs.
     *
     * @returns {string[]} An array of all of this undo clipboard IDs.
     */
    static getAllClipboardIDs() {
        return [
            ...new Set(world
                .getDynamicPropertyIds()
                .filter((v) => v.startsWith("undoclipboardsize:") && !v.includes(","))
                .map((v) => v.replace("undoclipboardsize:", "").split(";").slice(0, -1).join(";"))),
        ];
    }
    /**
     * Gets all undo clipboards.
     *
     * @returns {BlockClipboard[]} An array of all of this undo clipboards.
     */
    static getAllClipboards() {
        return this.getAllClipboardIDs().map((v) => new UndoClipboard(v));
    }
    /**
     * Gets undo clipboards by their IDs.
     *
     * @template ClipboardIDs The IDs of this undo clipboards to get.
     * @param {ClipboardIDs} clipboardIDs The IDs of this undo clipboards to get.
     * @returns {{ [K in keyof ClipboardIDs]: UndoClipboard<ClipboardIDs[K]> }} An array of this undo clipboards with the specified IDs.
     *
     * @throws {TypeError} If any of this undo clipboard IDs contain a comma.
     */
    static getClipboards(clipboardIDs) {
        return clipboardIDs.map((v) => new UndoClipboard(v));
    }
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
    static getClipboard(clipboardID) {
        return new UndoClipboard(clipboardID);
    }
    /**
     * Clears the contents of all undo clipboards.
     */
    static clearAllClipboards() {
        this.getAllClipboards().forEach((v) => v.clear());
    }
    /**
     * Gets all save times from all undo clipboards.
     *
     * @returns {{ saveTime: number; clipboardID: string }[]} An array of all save times from all undo clipboards.
     */
    static getSaveTimesFromAllClipboards() {
        return this.getAllClipboards()
            .flatMap((clipboard) => clipboard.saveTimes.map((saveTime) => ({ saveTime: saveTime, clipboardID: clipboard.clipboardID })))
            .sort((a, b) => b.saveTime - a.saveTime);
    }
    /**
     * Undoes the last action on all undo clipboards.
     *
     * @param {StructurePlaceOptions} [options] The options to undo the action with.
     * @param {boolean} [clearSave] Whether to clear the save after undoing it. Defaults to `true`.
     * @param {Vector3} [sizes] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     * @returns {1 | 0} `1` if the action was undone, `0` if the action was not found.
     */
    static undoLastAction(options, clearSave = true, sizes = { x: 64, y: 128, z: 64 }) {
        return this.getAllClipboards()
            .reduce((a, b) => ((b.newestSaveTime ?? 0) > (a.newestSaveTime ?? 0) ? b : a))
            .undo(undefined, options, clearSave, sizes);
    }
    /**
     * Undoes the last action from any of the undo clipboards asynchronously.
     *
     * @param {StructurePlaceOptions} [options] The options to undo the action with.
     * @param {boolean} [clearSave] Whether to clear the save after undoing it. Defaults to `true`.
     * @param {Vector3} [sizes] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     * @param {number} [minMSBetweenTickWaits] The minimum number of milliseconds between tick waits. Defaults to {@link config.system.defaultMinMSBetweenTickWaits}.
     * @returns {Promise<1 | 0>} A promise that resolves to `1` if the action was undone or `0` if the action was not found.
     */
    static async undoLastActionAsync(options, clearSave = true, sizes = { x: 64, y: 128, z: 64 }, minMSBetweenTickWaits = config.system.defaultMinMSBetweenTickWaits) {
        return await this.getAllClipboards()
            .reduce((a, b) => ((b.newestSaveTime ?? 0) > (a.newestSaveTime ?? 0) ? b : a))
            .undoAsync(undefined, options, clearSave, sizes, minMSBetweenTickWaits);
    }
    /**
     * Removes all items from all undo clipboards that do not have a corresponding structure.
     */
    static cullItemsMissingStructure() {
        this.getAllClipboards().forEach((clipboard) => clipboard.saveTimes
            .filter((v) => !world.structureManager.get(`undoclipboard:${clipboard.clipboardID};${v},0,0,0`))
            .forEach((v) => clipboard.clearTime(v)));
    }
}
//# sourceMappingURL=UndoClipboard.js.map