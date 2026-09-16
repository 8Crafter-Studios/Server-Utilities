import { BlockVolume, type Vector3, type BlockBoundingBox, type BlockLocationIterator } from "@minecraft/server";
export declare enum CompoundBlockVolumeAction {
    Add = 0,
    Subtract = 1
}
export declare enum CompoundBlockVolumePositionRelativity {
    Relative = 0,
    Absolute = 1
}
export interface CompoundBlockVolumeItem {
    action?: CompoundBlockVolumeAction;
    locationRelativity?: CompoundBlockVolumePositionRelativity;
    volume: BlockVolume;
}
export declare class CompoundBlockVolume {
    readonly items: CompoundBlockVolumeItem[];
    readonly itemsAbsolute: CompoundBlockVolumeItem[];
    private origin;
    private min;
    private max;
    capacity: number;
    volumeCount: number;
    constructor(origin?: Vector3);
    private translateVolume;
    private makeAbsolute;
    private recomputeBoundingBox;
    private rebuildAbsoluteVolumes;
    clear(): void;
    getOrigin(): Vector3;
    setOrigin(position: Vector3, preserveExistingVolumes?: boolean): void;
    translateOrigin(delta: Vector3, preserveExistingVolumes?: boolean): void;
    pushVolume(item: CompoundBlockVolumeItem): void;
    popVolume(): boolean;
    replaceOrAddLastVolume(item: CompoundBlockVolumeItem): boolean;
    peekLastVolume(forceRelativity?: CompoundBlockVolumePositionRelativity): CompoundBlockVolumeItem | undefined;
    getBoundingBox(): BlockBoundingBox;
    getMin(): Vector3;
    getMax(): Vector3;
    isEmpty(): boolean;
    isInside(worldLocation: Vector3): boolean;
    private volumeToAABB;
    private aabbTouchesOrOverlaps;
    private mergeAABB;
    private mergeAABBs;
    getBlockLocationIterator(): BlockLocationIterator;
}
