import { Dimension, Entity, type Vector3 } from "@minecraft/server";
export declare class WorldEditSelection {
    readonly player: Entity;
    constructor(player: Entity);
    get pos1(): Vector3;
    set pos1(value: Vector3);
    get pos2(): Vector3;
    set pos2(value: Vector3);
    get dimension(): Dimension | undefined;
    get minPos(): Vector3;
    get maxPos(): Vector3;
    set dimension(value: string | Dimension);
    getSavedSelectionIds(): string[];
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
    toJSON(): {};
}
declare global {
    namespace globalThis {
        const WorldEditSelection: typeof import("./WorldEditSelection").WorldEditSelection;
    }
}
