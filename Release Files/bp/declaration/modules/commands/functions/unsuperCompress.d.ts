export declare function unsuperCompress<T extends {
    block_indices: string;
}>(nbt: T): Omit<T, "block_indices"> & {
    block_indices: number[];
};
