import { EquipmentSlot } from "@minecraft/server";
export function parseSlot(slot, selectedSlotIndex) {
    return ([
        EquipmentSlot.Head,
        EquipmentSlot.Chest,
        EquipmentSlot.Legs,
        EquipmentSlot.Feet,
        EquipmentSlot.Mainhand,
        EquipmentSlot.Offhand,
    ][[
        "head",
        "chest",
        "legs",
        "feet",
        "mainhand",
        "offhand",
        "helmet",
        "chestplate",
        "leggings",
        "boots",
        "hand",
        "otherhand",
        "cap",
        "tunic",
        "pants",
        "shoes",
        "righthand",
        "lefthand",
        "hat",
        "shirt",
        "shorts",
        "sandals",
        "firsthand",
        "secondaryhand",
    ].findIndex((v) => v == tryget(() => slot?.trim()?.toLowerCase())) %
        6] ??
        (tryget(() => slot?.trim()) == "cursor" ? "cursor" : undefined) ??
        ((tryget(() => slot?.trim()) == "~" ||
            tryget(() => slot?.trim()) == "") &&
            !!!selectedSlotIndex
            ? "~"
            : Number(tryget(() => slot?.trim()) ?? slot)));
}
//# sourceMappingURL=parseSlot.js.map