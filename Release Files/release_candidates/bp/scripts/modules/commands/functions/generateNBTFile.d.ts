import { type DimensionLocation } from "@minecraft/server";
export declare function generateNBTFile(location: DimensionLocation, nbt: {
    blocks: {
        pos: [x: number, y: number, z: number];
        state: number;
    }[];
    entities?: any;
    palette: {
        Name: string;
        Properties?: {
            [stateName: string]: string | number | boolean;
        };
    }[];
    size: [x: number, y: number, z: number];
}): void;
