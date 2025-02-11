export declare function setNBTDataType(NBTData: {
    nbt_type?: any;
    type?: string;
    [k: string | number | symbol]: any;
}): {
    [k: string]: any;
    [k: number]: any;
    [k: symbol]: any;
    nbt_type?: any;
    type?: string;
};
