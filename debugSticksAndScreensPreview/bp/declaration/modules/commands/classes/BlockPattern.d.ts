import { BlockPermutation } from "@minecraft/server";
export declare class BlockPattern {
    blocks: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
        weight?: number;
        get raw(): string;
        get rawns(): string;
    }[];
    type: "random" | "sequence";
    constructor(blocks?: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
        weight?: number;
    }[], type?: "random" | "sequence");
    generateBlock(generateIndex?: number | bigint, forceMode?: "random" | "sequence"): {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
        chance?: number;
    };
    generateBlockP(generateIndex?: number | bigint, forceMode?: "random" | "sequence"): BlockPermutation;
    push(...blocks: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
        weight?: number;
    }[]): number;
    static parse(): void;
    static extractRaw(str: string): string;
    static extract(str: string, mode?: "random" | "sequence"): BlockPattern;
    static extractWRaw(str: string, mode?: "random" | "sequence"): {
        raw: string;
        parsed: BlockPattern;
    };
    static extractAllRaw(str: string): string[];
    static extractAll(str: string, mode?: "random" | "sequence"): BlockPattern[];
    static extractAllWRaw(str: string, mode?: "random" | "sequence"): {
        raw: string[];
        parsed: BlockPattern[];
    };
}
