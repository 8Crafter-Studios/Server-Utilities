export declare function compressJavaNBTData(parsedNBT: {
    size: number[];
    blocks: any[];
    palette: any[];
}): {
    block_indices: number[];
    block_palette: {
        name: any;
        states: any;
    }[];
    nbt_type: "cmprsnbt";
    size: number[];
};
