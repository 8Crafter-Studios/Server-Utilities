export function detectNBTDataType(NBTData) {
    return !!NBTData.nbt_type
        ? NBTData.nbt_type
        : NBTData.hasOwnProperty("blocks")
            ? "snbt"
            : NBTData.hasOwnProperty("structure")
                ? "bnbt"
                : NBTData?.type == "compound"
                    ? "rawuenbt"
                    : "unknownt";
}
//# sourceMappingURL=detectNBTDataType.js.map