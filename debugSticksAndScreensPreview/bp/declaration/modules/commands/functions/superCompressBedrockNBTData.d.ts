export declare function superCompressBedrockNBTData(parsedNBT: {
    structure: {
        block_indices: number[][];
        palette: {
            default: {
                block_palette: any;
            };
        };
    };
    size: any;
    [k: string | number | symbol]: any;
}): {
    block_indices: string;
    block_palette: any;
    nbt_type: "supercmprbnbt";
    size: any;
};
