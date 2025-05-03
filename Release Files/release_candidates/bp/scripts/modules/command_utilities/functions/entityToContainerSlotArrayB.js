import { OtherEquipmentSlots } from "modules/command_utilities/constants/OtherEquipmentSlots";
export function entityToContainerSlotArrayB(entity, getContainer = true, getEquipment = true) {
    let itemList = [];
    let itemListB = [];
    let container = entity.getComponent("inventory")?.container;
    let equipment = entity.getComponent("equippable");
    for (let i = 0; i < (container?.size ?? 0) && getContainer; i++) {
        itemList.push(container.getSlot(i));
    }
    for (let i = 0; i < 5 && getEquipment && !!equipment; i++) {
        itemListB.push(equipment?.getEquipmentSlot(OtherEquipmentSlots[i]));
    }
    return !!container || !!equipment
        ? { inventory: itemList, equipment: itemListB }
        : undefined;
}
//# sourceMappingURL=entityToContainerSlotArrayB.js.map