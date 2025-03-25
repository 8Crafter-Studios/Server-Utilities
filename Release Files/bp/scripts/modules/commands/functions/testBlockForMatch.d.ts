import { Block } from "@minecraft/server";
export declare function testBlockForMatch(block: Block, matches: {
    id: string;
    states?: {
        [id: string]: string | number | boolean;
    };
} | {
    id: string;
    states?: {
        [id: string]: string | number | boolean;
    };
}[]): boolean | (() => boolean);
