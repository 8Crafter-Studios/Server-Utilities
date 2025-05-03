import { compressIntArray } from "./compressIntArray";
export function superCompressBedrockNBTData(parsedNBT) {
    return {
        block_indices: compressIntArray(parsedNBT.structure.block_indices[0]),
        block_palette: parsedNBT.structure.palette.default.block_palette,
        nbt_type: "supercmprbnbt",
        size: parsedNBT.size,
    };
}
//# sourceMappingURL=superCompressBedrockNBTData.js.map