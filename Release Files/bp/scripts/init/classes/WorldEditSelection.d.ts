import { Dimension, Entity, type Vector3 } from "@minecraft/server";
/**
 * An interface that represents a saved WorldEdit selection.
 */
export interface SavedWorldEditSelection {
    /**
     * The first corner of the saved selection.
     *
     * @type {Vector3}
     */
    pos1: Vector3;
    /**
     * The second corner of the saved selection.
     *
     * @type {Vector3}
     */
    pos2: Vector3;
    /**
     * The dimension of the saved selection.
     *
     * @type {(typeof dimensionsd)[number]}
     */
    dimension: (typeof dimensionsd)[number];
}
/**
 * An interface that represents the JSON data of a WorldEdit selection.
 */
export interface WorldEditSelectionJSONData {
    /**
     * The first corner of the current selection.
     *
     * @type {Vector3}
     */
    pos1: Vector3;
    /**
     * The second corner of the current selection.
     *
     * @type {Vector3}
     */
    pos2: Vector3;
    /**
     * The smallest corner of the current selection.
     *
     * @type {Vector3}
     */
    minPos: Vector3;
    /**
     * The largest corner of the current selection.
     *
     * @type {Vector3}
     */
    maxPos: Vector3;
    /**
     * The dimension of the current selection.
     *
     * @type {(typeof dimensionsd)[number]}
     */
    dimension: (typeof dimensionsd)[number];
    /**
     * The saved selections for the current player.
     *
     * @type {{[selectionID: string]: SavedWorldEditSelection}}
     */
    savedSelections: {
        [selectionID: string]: SavedWorldEditSelection;
    };
}
declare namespace exports {
    /**
     * A class that represents a WorldEdit selection for a player.
     */
    class WorldEditSelection {
        /**
         * The player that this selection is for.
         *
         * @type {Entity}
         */
        readonly player: Entity;
        /**
         * Gets the WorldEdit selection for the given player.
         *
         * @param {Entity} player The player that this selection is for.
         */
        constructor(player: Entity);
        /**
         * The first corner of the current selection.
         *
         * It is stored in the player's `pos1` dynamic property.
         *
         * @type {Vector3 | undefined}
         */
        get pos1(): Vector3 | undefined;
        set pos1(value: Vector3 | undefined);
        /**
         * The second corner of the current selection.
         *
         * It is stored in the player's `pos2` dynamic property.
         *
         * @type {Vector3 | undefined}
         */
        get pos2(): Vector3 | undefined;
        set pos2(value: Vector3 | undefined);
        /**
         * The currently selected dimension.
         *
         * It is stored in the player's `posD` dynamic property.
         *
         * @type {Dimension | undefined}
         */
        get dimension(): Dimension | undefined;
        set dimension(value: string | Dimension | undefined);
        /**
         * The smallest corner of the selection.
         *
         * It gets the minimum values of each of the vectors of the `pos1` and `pos2` properties.
         *
         * @type {Vector3 | undefined}
         */
        get minPos(): Vector3 | undefined;
        /**
         * The largest corner of the selection.
         *
         * It gets the maximum values of each of the vectors of the `pos1` and `pos2` properties.
         *
         * @type {Vector3 | undefined}
         */
        get maxPos(): Vector3 | undefined;
        /**
         * Gets the IDs of all saved selections for this player.
         *
         * @returns {string[]} The IDs of all saved selections.
         */
        getSavedSelectionIds(): string[];
        /**
         * Gets all saved selections for this player.
         *
         * @returns {{[selectionID: string]: SavedWorldEditSelection}} The saved selections.
         * @throws {SyntaxError} If any of the saved selections are not valid JSON.
         */
        getSavedSelections(): {
            [selectionID: string]: SavedWorldEditSelection;
        };
        /**
         * Gets a saved selection from the player's saved selection list.
         *
         * @param {string} selectionID The ID of the selection to get.
         * @returns {SavedWorldEditSelection | undefined} The saved selection, or undefined if it doesn't exist.
         * @throws {SyntaxError} If the saved selection is not valid JSON.
         */
        getSavedSelection(selectionID: string): SavedWorldEditSelection | undefined;
        /**
         * Removes a saved selection from the player's saved selection list.
         *
         * @param {string} selectionID The ID of the selection to remove.
         * @returns {boolean} True if the selection was removed, false if it didn't exist.
         * @throws {TypeError} If the {@link selectionID} is not a string.
         */
        removeSavedSelection(selectionID: string): boolean;
        /**
         * Saves the current selection to the player's saved selection list.
         *
         * @param {string} selectionID The ID to save the selection under.
         * @param {SavedWorldEditSelection} value The selection to save.
         * @throws {TypeError} If the value is not a valid selection.
         */
        saveSelection(selectionID: string, value?: SavedWorldEditSelection): void;
        /**
         * Gets the JSON data of the linked player's world edit selection.
         *
         * @returns {WorldEditSelectionJSONData} The JSON data of the world edit selection.
         */
        toJSON(): WorldEditSelectionJSONData;
    }
}
export import WorldEditSelection = exports.WorldEditSelection;
declare global {
    namespace globalThis {
        export import WorldEditSelection = exports.WorldEditSelection;
    }
}
export {};
