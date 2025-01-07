import { EquipmentSlot, Container, EntityEquippableComponent, PlayerCursorInventoryComponent } from "@minecraft/server";
export function getSlotFromParsedSlot(slot, options) {
    if (typeof slot == "string") {
        return slot.trim() == "~"
            ? !!options?.selectedSlotIndex
                ? options?.container?.getSlot(Number(options?.selectedSlotIndex))
                : !!options?.equipment
                    ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Mainhand)
                    : undefined
            : slot.trim() == "cursor"
                ? !!options?.cursor
                    ? options?.cursor
                    : undefined
                : !!options?.equipment
                    ? slot.trim().toLowerCase() == "head"
                        ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Head)
                        : slot.trim().toLowerCase() == "chest"
                            ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Chest)
                            : slot.trim().toLowerCase() == "legs"
                                ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Legs)
                                : slot.trim().toLowerCase() == "feet"
                                    ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Feet)
                                    : slot.trim().toLowerCase() == "mainhand"
                                        ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Mainhand)
                                        : slot.trim().toLowerCase() == "offhand"
                                            ? options?.equipment?.getEquipmentSlot(EquipmentSlot.Offhand)
                                            : !Number.isNaN(Number(slot))
                                                ? options?.container?.getSlot(Number(slot))
                                                : undefined
                    : !Number.isNaN(Number(slot))
                        ? options?.container?.getSlot(Number(slot))
                        : undefined;
    }
    else if (typeof slot == "number") {
        return options?.container?.getSlot(Number(slot));
    }
    else
        return options?.container?.getSlot(Number(slot));
}
//# sourceMappingURL=getSlotFromParsedSlot.js.map