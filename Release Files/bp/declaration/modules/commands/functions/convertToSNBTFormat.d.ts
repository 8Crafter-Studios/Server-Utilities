export declare function convertToSNBTFormat(parsedNBT: {
    structure: {
        block_indices: any[][];
        palette: {
            default: {
                block_palette: any[];
            };
        };
    };
    size: number[];
}): {
    blocks: {
        pos: number[];
        state: any;
    }[];
    palette: {
        Name: any;
        Properties: any;
    }[];
    nbt_type: string;
    size: number[];
};
