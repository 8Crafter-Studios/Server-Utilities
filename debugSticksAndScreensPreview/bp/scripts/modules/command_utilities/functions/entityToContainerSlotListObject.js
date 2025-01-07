import { OtherEquipmentSlots } from "modules/command_utilities/constants/OtherEquipmentSlots";
export function entityToContainerSlotListObject(entity, getContainer = true, getEquipment = true) {
    let itemList = {};
    let container = entity.getComponent("inventory")?.container;
    let equipment = entity.getComponent("equippable");
    for (let i = 0; i < (container?.size ?? 0) && getContainer; i++) {
        itemList[String(i)] = container.getSlot(i);
    }
    for (let i = 0; i < 5 && getEquipment && !!equipment; i++) {
        itemList[String(OtherEquipmentSlots[i])] = equipment?.getEquipmentSlot(OtherEquipmentSlots[i]);
    }
    return !!container || !!equipment ? itemList : undefined;
}
//# sourceMappingURL=entityToContainerSlotListObject.js.map