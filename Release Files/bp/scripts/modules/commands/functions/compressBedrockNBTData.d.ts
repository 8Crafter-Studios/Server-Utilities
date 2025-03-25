export declare function compressBedrockNBTData(parsedNBT: {
    structure: {
        block_indices: any[];
        palette: {
            default: {
                block_palette: any;
            };
        };
    };
    size: any;
}): {
    block_indices: any;
    block_palette: any;
    nbt_type: "cmprbnbt";
    size: any;
};
