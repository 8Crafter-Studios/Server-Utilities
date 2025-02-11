import { Dimension, Entity, type Vector3 } from "@minecraft/server";
export declare class WorldEditSelection {
    readonly player: Entity;
    constructor(player: Entity);
    /**
     * The first corner of the current selection.
     *
     * It is stored in the player's `pos1` dynamic property.
     */
    get pos1(): Vector3 | undefined;
    set pos1(value: Vector3);
    /**
     * The second corner of the current selection.
     *
     * It is stored in the player's `pos2` dynamic property.
     */
    get pos2(): Vector3 | undefined;
    set pos2(value: Vector3);
    /**
     * The currently selected dimension.
     *
     * It is stored in the player's `posD` dynamic property.
     */
    get dimension(): Dimension | undefined;
    set dimension(value: string | Dimension);
    /**
     * The smallest corner of the selection.
     *
     * It gets the minimum values of each of the vectors of the `pos1` and `pos2` properties.
     */
    get minPos(): Vector3 | undefined;
    /**
     * The largest corner of the selection.
     *
     * It gets the maximum values of each of the vectors of the `pos1` and `pos2` properties.
     */
    get maxPos(): Vector3 | undefined;
    getSavedSelectionIds(): string[];
    getSavedSelections(): {
        [selectionID: string]: {
            pos1: Vector3;
            pos2: Vector3;
            dimension: (typeof dimensionsd)[number];
        };
    };
    getSavedSelection(selectionID: string): {
        pos1: Vector3;
        pos2: Vector3;
        dimension: (typeof dimensionsd)[number];
    };
    removeSavedSelection(selectionID: string): boolean;
    saveSelection(selectionID: string, value?: {
        pos1: Vector3;
        pos2: Vector3;
        dimension: (typeof dimensionsd)[number];
    }): void;
    toJSON(): {
        pos1: Vector3;
        pos2: Vector3;
        minPos: Vector3;
        maxPos: Vector3;
        dimension: string;
        savedSelections: {
            [selectionID: string]: {
                pos1: Vector3;
                pos2: Vector3;
                dimension: (typeof dimensionsd)[number];
            };
        };
    };
}
declare global {
    namespace globalThis {
        const WorldEditSelection: typeof import("./WorldEditSelection").WorldEditSelection;
    }
}
