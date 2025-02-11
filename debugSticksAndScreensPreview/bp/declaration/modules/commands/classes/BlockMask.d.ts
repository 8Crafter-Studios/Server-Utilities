import { Block, BlockPermutation, BlockType } from "@minecraft/server";
export declare const knownContainerTypes: readonly ["minecraft:yellow_shulker_box", "minecraft:beacon", "minecraft:lime_shulker_box", "minecraft:undyed_shulker_box", "minecraft:barrel", "minecraft:magenta_shulker_box", "minecraft:white_shulker_box", "minecraft:blast_furnace", "minecraft:chest", "minecraft:smoker", "minecraft:purple_shulker_box", "minecraft:orange_shulker_box", "minecraft:blue_shulker_box", "minecraft:brown_shulker_box", "minecraft:pink_shulker_box", "minecraft:red_shulker_box", "minecraft:jukebox", "minecraft:lit_furnace", "minecraft:gray_shulker_box", "minecraft:light_gray_shulker_box", "minecraft:trapped_chest", "minecraft:black_shulker_box", "minecraft:lit_blast_furnace", "minecraft:cyan_shulker_box", "minecraft:furnace", "minecraft:green_shulker_box", "minecraft:hopper", "minecraft:lectern", "minecraft:light_blue_shulker_box", "minecraft:dropper", "minecraft:brewing_stand", "minecraft:dispenser", "minecraft:lit_smoker"];
export declare const customMaskGroupPresets: {
    "preset:leaves": string[];
    "preset:deforest": string[];
    "preset:ores": string[];
    "preset:ore_blocks": string[];
    "preset:liquid": string[];
};
export declare class BlockMask {
    #private;
    /**
     * "include" will make it only select blocks included in the block mask
     * "exclude" will make it only select blocks that are not included in the block mask
     */
    type: "include" | "exclude";
    get blocks(): {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
        get raw(): string;
        get rawns(): string;
    }[];
    set blocks(blocks: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
    }[]);
    get includesStates(): boolean;
    get blockTypes(): string[];
    evaluateIds(): void;
    constructor(blocks?: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
    }[], type?: "include" | "exclude");
    push(...blocks: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
    }[]): number;
    testIfMatches(block: Block | BlockPermutation | BlockType | {
        type: BlockType | string;
        states?: Record<string, boolean | number | string>;
    } | string, mode?: typeof this.type): boolean;
    static testForStatesMatch(states: Record<string, boolean | number | string>, statesMask: Record<string, boolean | number | string>): boolean;
    static parse(): void;
    static extractRaw(str: string): string | null;
    static extract(str: string, extraIdParsingEnabled?: boolean): BlockMask;
    static extractWRaw(str: string, extraIdParsingEnabled?: boolean): {
        raw: string;
        parsed: BlockMask;
    };
    static extractAllRaw(str: string): string[] | null;
    static extractAll(str: string, extraIdParsingEnabled?: boolean): BlockMask[];
    static extractAllWRaw(str: string, extraIdParsingEnabled?: boolean): {
        raw: string[];
        parsed: BlockMask[];
    };
}
