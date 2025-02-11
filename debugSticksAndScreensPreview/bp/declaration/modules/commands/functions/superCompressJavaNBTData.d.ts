export declare function superCompressJavaNBTData(parsedNBT: {
    size: number[];
    blocks: any[];
    palette: any[];
    [k: string | number | symbol]: any;
}): {
    block_indices: string;
    block_palette: {
        name: any;
        states: any;
    }[];
    nbt_type: "supercmprsnbt";
    size: number[];
};
