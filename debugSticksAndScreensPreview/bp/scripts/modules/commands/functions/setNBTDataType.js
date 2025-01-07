import { detectNBTDataType } from "./detectNBTDataType";
export function setNBTDataType(NBTData) {
    return !!NBTData.nbt_type
        ? NBTData
        : Object.assign(NBTData, { nbt_type: detectNBTDataType(NBTData) });
}
//# sourceMappingURL=setNBTDataType.js.map