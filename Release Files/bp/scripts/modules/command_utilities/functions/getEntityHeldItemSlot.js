import { Entity, EquipmentSlot } from "@minecraft/server";
export function getEntityHeldItemSlot(entity) {
    return entity
        .getComponent("equippable")
        .getEquipmentSlot(EquipmentSlot.Mainhand);
}
//# sourceMappingURL=getEntityHeldItemSlot.js.map