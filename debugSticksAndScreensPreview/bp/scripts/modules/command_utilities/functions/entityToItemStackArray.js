import { OtherEquipmentSlots } from "modules/command_utilities/constants/OtherEquipmentSlots";
export function entityToItemStackArray(entity, getContainer = true, getEquipment = true) {
    let itemList = [];
    let container = entity.getComponent("inventory")?.container;
    let equipment = entity.getComponent("equippable");
    for (let i = 0; i < (container?.size ?? 0); i++) {
        itemList.push(container.getItem(i));
    }
    for (let i = 0; i < 5 && getEquipment && !!equipment; i++) {
        itemList.push(equipment?.getEquipment(OtherEquipmentSlots[i]));
    }
    return itemList;
}
//# sourceMappingURL=entityToItemStackArray.js.map