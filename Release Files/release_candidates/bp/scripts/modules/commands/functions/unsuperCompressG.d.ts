export declare function unsuperCompressG<T extends {
    block_indices: string;
}>(nbt: T): Promise<Omit<T, "block_indices"> & {
    block_indices: number[];
}>;
