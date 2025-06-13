import { OtherEquipmentSlots } from "modules/command_utilities/constants/OtherEquipmentSlots";
import { EquipmentSlots } from "modules/command_utilities/constants/EquipmentSlots";
export function equippableToItemStackArray(equippable, includeMainhand = false) {
    let itemList = [];
    for (let i = 0; i < 5 + Number(includeMainhand); i++) {
        itemList.push(equippable.getEquipment(includeMainhand ? EquipmentSlots[i] : OtherEquipmentSlots[i]));
    }
    return itemList;
}
//# sourceMappingURL=equippableToItemStackArray.js.map