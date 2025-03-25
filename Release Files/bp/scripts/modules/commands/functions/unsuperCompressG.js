import { extractIntArrayG } from "./extractIntArrayG";
export async function unsuperCompressG(nbt) {
    return Object.assign(nbt, {
        block_indices: await extractIntArrayG(nbt.block_indices),
    });
}
//# sourceMappingURL=unsuperCompressG.js.map