import { type DimensionLocation } from "@minecraft/server";
export declare function generateNBTFileE(location: DimensionLocation, nbt: {
    block_indices: number[];
    block_palette: {
        name: string;
        states?: {
            [stateName: string]: string | number | boolean;
        };
    }[];
    size: [x: number, y: number, z: number];
    nbt_type: "cmprbnbt";
}): number;
