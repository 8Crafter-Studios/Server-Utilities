import { OtherEquipmentSlots } from "modules/command_utilities/constants/OtherEquipmentSlots";
export function entityToContainerSlotArray(entity, getContainer = true, getEquipment = true) {
    let itemList = [];
    let container = entity.getComponent("inventory")?.container;
    let equipment = entity.getComponent("equippable");
    for (let i = 0; i < (container?.size ?? 0) && getContainer; i++) {
        itemList.push(container.getSlot(i));
    }
    for (let i = 0; i < 5 && getEquipment && !!equipment; i++) {
        itemList.push(equipment?.getEquipmentSlot(OtherEquipmentSlots[i]));
    }
    return !!container || !!equipment ? itemList : undefined;
}
//# sourceMappingURL=entityToContainerSlotArray.js.map