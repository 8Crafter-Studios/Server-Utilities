import { ultraExtractIntArray } from "./ultraExtractIntArray";
export function unultraCompress(nbt) {
    return Object.assign(nbt, {
        block_indices: ultraExtractIntArray(nbt.block_indices),
    });
}
//# sourceMappingURL=unultraCompress.js.map