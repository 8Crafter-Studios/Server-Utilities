import { Player, Entity, EquipmentSlot } from "@minecraft/server";
export function inventorySwap(player1, player2) {
    if (player1.getComponent("inventory") && player2.getComponent("inventory"))
        return;
    for (let i = 0; i < 36; i++) {
        player1
            .getComponent("inventory")
            ?.container.swapItems(i, i, player2.getComponent("inventory")?.container);
    }
    let slots = [
        EquipmentSlot.Head,
        EquipmentSlot.Chest,
        EquipmentSlot.Legs,
        EquipmentSlot.Feet,
        EquipmentSlot.Offhand,
    ];
    for (let i = 0; i < 5; i++) {
        let item1 = player1.getComponent("equippable")?.getEquipment(slots[i]);
        let item2 = player2.getComponent("equippable")?.getEquipment(slots[i]);
        player1.getComponent("equippable")?.setEquipment(slots[i], item2);
        player2.getComponent("equippable")?.setEquipment(slots[i], item1);
    }
}
//# sourceMappingURL=inventorySwap.js.map