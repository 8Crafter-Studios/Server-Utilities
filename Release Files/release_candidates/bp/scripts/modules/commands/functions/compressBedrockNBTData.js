export function compressBedrockNBTData(parsedNBT) {
    return {
        block_indices: parsedNBT.structure.block_indices[0],
        block_palette: parsedNBT.structure.palette.default.block_palette,
        nbt_type: "cmprbnbt",
        size: parsedNBT.size,
    };
}
//# sourceMappingURL=compressBedrockNBTData.js.map