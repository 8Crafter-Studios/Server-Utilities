import { Block } from "@minecraft/server";
export declare function testBlockForMatchToMask(block?: Block, matches?: {
    type: string;
    states?: {
        [id: string]: string | number | boolean;
    };
} | {
    type: string;
    states?: {
        [id: string]: string | number | boolean;
    };
}[]): boolean;
