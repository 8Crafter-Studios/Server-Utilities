import { extractIntArray } from "./extractIntArray";
export function unsuperCompress(nbt) {
    return Object.assign(nbt, {
        block_indices: extractIntArray(nbt.block_indices),
    });
}
//# sourceMappingURL=unsuperCompress.js.map