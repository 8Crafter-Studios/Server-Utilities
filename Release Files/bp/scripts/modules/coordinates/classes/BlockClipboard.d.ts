import { type Vector3, Dimension, type StructureCreateOptions, type DimensionLocation, type StructurePlaceOptions, Structure } from "@minecraft/server";
/**
 * The global block clipboard.
 *
 * @see {@link BlockClipboard}
 *
 * @hideconstructor
 */
export declare class GlobalBlockClipboard {
    private constructor();
    /**
     * The structure IDs of the contents of the global block clipboard.
     *
     * @type {string[]}
     */
    static get ids(): `andexdb:clipboard,${number},${number},${number}`[];
    /**
     * The size of the contents of the global block clipboard.
     *
     * If the block clipboard is empty, this will be `{ x: -1, y: -1, z: -1 }`.
     *
     * @type {Vector3}
     *
     * @default
     * ```typescript
     * { x: -1, y: -1, z: -1 }
     * ```
     */
    static get contentsSize(): Vector3;
    /**
     * The sizes of the chunks of the contents of this block clipboard.
     *
     * When the block clipboard is empty, this will be `{ x: 64, y: 128, z: 64 }`.
     *
     * @type {Vector3}
     *
     * @default
     * ```typescript
     * { x: 64, y: 128, z: 64 }
     * ```
     */
    static get contentsSizeLimits(): Vector3;
    /**
     * Whether the global block clipboard is empty.
     *
     * @type {boolean}
     */
    static get isEmpty(): boolean;
    /**
     * Clears the contents of the global block clipboard.
     */
    static clear(): void;
    /**
     * Throws an error because the global block clipboard cannot be deleted.
     *
     * @throws {Error} Always, because the global block clipboard cannot be deleted.
     */
    static delete(): void;
    /**
     * Copies the specified range of blocks to the global block clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to copy to the clipboard.
     * @param {[from: Vector3, to: Vector3, indices: Vector3]} range The area to copy to the clipboard.
     * @param {StructureCreateOptions} [options] The options to copy the to the clipboard with.
     */
    static copyRange(dimension: Dimension, range: [from: Vector3, to: Vector3, indices: Vector3], options?: StructureCreateOptions): void;
    /**
     * Copies the specified area to the global block clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to copy to the clipboard.
     * @param {{ from: Vector3; to: Vector3; }} area The area to copy to the clipboard.
     * @param {StructureCreateOptions} [options] The options to copy the area to the clipboard with.
     * @param {Vector3} [sizeLimits] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     */
    static copy(dimension: Dimension, area: {
        from: Vector3;
        to: Vector3;
    }, options?: StructureCreateOptions, sizeLimits?: Vector3): void;
    /**
     * Pastes the contents of this block clipboard.
     *
     * @param {DimensionLocation} location The location to paste the contents of the clipboard.
     * @param {StructurePlaceOptions} [options] The options to paste the contents of the clipboard with.
     * @param {Vector3} [sizes] The sizes of the chunks of the clipboard. Defaults to {@link GlobalBlockClipboard.contentsSizeLimits}.
     *
     * @throws {ReferenceError} If the clipboard is empty.
     */
    static paste(location: DimensionLocation, options?: StructurePlaceOptions, sizes?: Vector3): void;
    /**
     * Pastes the contents of this block clipboard.
     *
     * @param {DimensionLocation} location The location to paste the contents of the clipboard.
     * @param {StructurePlaceOptions} [options] The options to paste the contents of the clipboard with.
     * @param {Vector3} [sizes] The sizes of the chunks of the clipboard. Defaults to {@link GlobalBlockClipboard.contentsSizeLimits}.
     * @param {number} [minMSBetweenTickWaits] The minimum number of milliseconds between tick waits. Defaults to {@link config.system.defaultMinMSBetweenTickWaits}.
     * @returns {Promise<void>} A promise that resolves when the contents of the clipboard have been pasted.
     *
     * @throws {ReferenceError} If the clipboard is empty.
     */
    static pasteAsync(location: DimensionLocation, options?: StructurePlaceOptions, sizes?: Vector3, minMSBetweenTickWaits?: number): Promise<void>;
    /**
     * Gets the structure that contains the specified position in the clipboard contents.
     *
     * @param {Vector3} position The position to get the structure for.
     * @returns {Structure | undefined} The structure that contains the specified position in the clipboard contents, or `undefined` if no structure is found containing the specified position.
     */
    static getStructureForPosition(position: Vector3): Structure | undefined;
    /**
     * Gets the structure at the specified indices in the clipboard contents.
     *
     * @param {Vector3} indices The indices to get the structure for.
     * @returns {Structure | undefined} The structure at the specified indices in the clipboard contents, or `undefined` if no structure is found at the specified indices.
     */
    static getStructureAtIndices(indices: Vector3): Structure | undefined;
}
/**
 * A class for working with block clipboards.
 *
 * @template ClipboardID The ID of this block clipboard.
 */
export declare class BlockClipboard<ClipboardID extends string = string> {
    /**
     * The ID of this block clipboard.
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
     * @throws {TypeError} If the block clipboard ID is `global`.
     */
    constructor(clipboardID: ClipboardID);
    /**
     * The structure IDs of the contents of this block clipboard.
     *
     * @type {`clipboard:${ClipboardID},${number},${number},${number}`[]}
     */
    get ids(): `clipboard:${ClipboardID},${number},${number},${number}`[];
    /**
     * The size of the contents of this block clipboard.
     *
     * When the block clipboard is empty, this will be `{ x: -1, y: -1, z: -1 }`.
     *
     * @type {Vector3}
     *
     * @default
     * ```typescript
     * { x: -1, y: -1, z: -1 }
     * ```
     */
    get contentsSize(): Vector3;
    /**
     * The sizes of the chunks of the contents of this block clipboard.
     *
     * When the block clipboard is empty, this will be `{ x: 64, y: 128, z: 64 }`.
     *
     * @type {Vector3}
     *
     * @default
     * ```typescript
     * { x: 64, y: 128, z: 64 }
     * ```
     */
    get contentsSizeLimits(): Vector3;
    /**
     * Whether this block clipboard is empty.
     *
     * @type {boolean}
     */
    get isEmpty(): boolean;
    /**
     * Clears the contents of this block clipboard.
     */
    clear(): void;
    /**
     * Deletes the block clipboard.
     */
    delete(): void;
    /**
     * Copies the specified range of blocks to this block clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to copy to the clipboard.
     * @param {[from: Vector3, to: Vector3, indices: Vector3]} range The area to copy to the clipboard.
     * @param {StructureCreateOptions} [options] The options to copy the area to the clipboard with.
     */
    copyRange(dimension: Dimension, range: [from: Vector3, to: Vector3, indices: Vector3], options?: StructureCreateOptions): Structure | undefined;
    /**
     * Copies the specified area to this block clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to copy to the clipboard.
     * @param {{ from: Vector3; to: Vector3; }} area The area to copy to the clipboard.
     * @param {StructureCreateOptions} [options] The options to copy the area to the clipboard with.
     * @param {Vector3} [sizeLimits] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     */
    copy(dimension: Dimension, area: {
        from: Vector3;
        to: Vector3;
    }, options?: StructureCreateOptions, sizeLimits?: Vector3): void;
    /**
     * Pastes the contents of this block clipboard.
     *
     * @param {DimensionLocation} location The location to paste the contents of the clipboard.
     * @param {StructurePlaceOptions} [options] The options to paste the contents of the clipboard with.
     * @param {Vector3} [sizes] The sizes of the chunks of the clipboard. Defaults to {@link BlockClipboard.contentsSize}.
     *
     * @throws {ReferenceError} If the clipboard is empty.
     */
    paste(location: DimensionLocation, options?: StructurePlaceOptions, sizes?: Vector3): void;
    /**
     * Pastes the contents of this block clipboard asynchronously.
     *
     * @param {DimensionLocation} location The location to paste the contents of the clipboard.
     * @param {StructurePlaceOptions} [options] The options to paste the contents of the clipboard with.
     * @param {Vector3} [sizes] The sizes of the chunks of the clipboard. Defaults to {@link BlockClipboard.contentsSize}.
     * @param {number} [minMSBetweenTickWaits] The minimum number of milliseconds between tick waits. Defaults to {@link config.system.defaultMinMSBetweenTickWaits}.
     * @returns {Promise<void>} A promise that resolves when the contents of the clipboard have been pasted.
     *
     * @throws {ReferenceError} If the clipboard is empty.
     */
    pasteAsync(location: DimensionLocation, options?: StructurePlaceOptions, sizes?: Vector3, minMSBetweenTickWaits?: number): Promise<void>;
    /**
     * Gets the structure that contains the specified position in the clipboard contents.
     *
     * @param {Vector3} position The position to get the structure for.
     * @returns {Structure | undefined} The structure that contains the specified position in the clipboard contents, or `undefined` if no structure is found containing the specified position.
     */
    getStructureForPosition(position: Vector3): Structure | undefined;
    /**
     * Gets the structure at the specified indices in the clipboard contents.
     *
     * @param {Vector3} indices The indices to get the structure for.
     * @returns {Structure | undefined} The structure at the specified indices in the clipboard contents, or `undefined` if no structure is found at the specified indices.
     */
    getStructureAtIndices(indices: Vector3): Structure | undefined;
    /**
     * Gets all block clipboard IDs.
     *
     * @returns {string[]} An array of all of the block clipboard IDs.
     */
    static getAllClipboardIDs(): string[];
    /**
     * Gets all block clipboards.
     *
     * @returns {BlockClipboard[]} An array of all of the block clipboards.
     */
    static getAllClipboards(): BlockClipboard[];
    /**
     * Gets block clipboards by their IDs.
     *
     * @template ClipboardIDs The IDs of the block clipboards to get.
     * @param {ClipboardIDs} clipboardIDs The IDs of the block clipboards to get.
     * @returns {{ [K in keyof ClipboardIDs]: BlockClipboard<ClipboardIDs[K]> }} An array of the block clipboards with the specified IDs.
     *
     * @throws {TypeError} If any of the block clipboard IDs contain a comma.
     * @throws {TypeError} If any of the block clipboard IDs are `global`.
     */
    static getClipboards<ClipboardIDs extends string[]>(clipboardIDs: ClipboardIDs): {
        [K in keyof ClipboardIDs]: BlockClipboard<ClipboardIDs[K]>;
    };
    /**
     * Gets a block clipboard by its ID.
     *
     * If the block clipboard does not exist, it will be created.
     *
     * @param {string} clipboardID The ID of the block clipboard, must be unique, cannot contain commas.
     * @returns {BlockClipboard} The block clipboard.
     *
     * @throws {TypeError} If the block clipboard ID contains a comma.
     * @throws {TypeError} If the block clipboard ID is `global`.
     */
    static getClipboard<ClipboardID extends string>(clipboardID: ClipboardID): BlockClipboard<ClipboardID>;
    /**
     * Deletes a block clipboard by its ID.
     *
     * @param {string} clipboardID The ID of the block clipboard.
     *
     * @throws {TypeError} If the block clipboard ID contains a comma.
     * @throws {TypeError} If the block clipboard ID is `global`.
     */
    static deleteClipboard(clipboardID: string): void;
    /**
     * Deletes all block clipboards.
     */
    static deleteAllClipboards(): void;
    /**
     * Clears the contents of all block clipboards.
     */
    static clearAllClipboards(): void;
    /**
     * The global block clipboard.
     *
     * @type {typeof GlobalBlockClipboard}
     */
    static readonly global: typeof GlobalBlockClipboard;
}
