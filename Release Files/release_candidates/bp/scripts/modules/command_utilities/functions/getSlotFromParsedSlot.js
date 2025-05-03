import { EquipmentSlot } from "@minecraft/server";
export function getSlotFromParsedSlot(slot, options) {
    if (typeof slot == "string") {
        const trimmedSlot = slot.trim().toLowerCase();
        if (trimmedSlot === "~") {
            if (options.selectedSlotIndex) {
                return options.container?.getSlot(Number(options.selectedSlotIndex));
            }
            else {
                return options.equipment?.getEquipmentSlot(EquipmentSlot.Mainhand);
            }
        }
        else if (trimmedSlot === "cursor") {
            return options.cursor;
        }
        else {
            if (options.equipment) {
                switch (trimmedSlot) {
                    case "head":
                        return options.equipment?.getEquipmentSlot(EquipmentSlot.Head);
                    case "chest":
                        return options.equipment?.getEquipmentSlot(EquipmentSlot.Chest);
                    case "legs":
                        return options.equipment?.getEquipmentSlot(EquipmentSlot.Legs);
                    case "feet":
                        return options.equipment?.getEquipmentSlot(EquipmentSlot.Feet);
                    case "mainhand":
                        return options.equipment?.getEquipmentSlot(EquipmentSlot.Mainhand);
                    case "offhand":
                        return options.equipment?.getEquipmentSlot(EquipmentSlot.Offhand);
                }
            }
            if (Number.isNaN(Number(slot))) {
                return options.container?.getSlot(Number(slot));
            }
            else {
                return undefined;
            }
        }
    }
    else if (typeof slot == "number") {
        return options?.container?.getSlot(Number(slot));
    }
    else if (!Number.isNaN(Number(slot))) {
        return options?.container?.getSlot(Number(slot));
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=getSlotFromParsedSlot.js.map