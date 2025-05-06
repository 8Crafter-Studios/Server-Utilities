import { EquipmentSlot } from "@minecraft/server";
export function getItemFromParsedSlot(slot, options) {
    if (typeof slot == "string") {
        const trimmedSlot = slot.trim().toLowerCase();
        if (trimmedSlot === "~") {
            if (options.selectedSlotIndex) {
                return options.container?.getItem(Number(options.selectedSlotIndex));
            }
            else {
                return options.equipment?.getEquipment(EquipmentSlot.Mainhand);
            }
        }
        else if (trimmedSlot === "cursor") {
            return options.cursor;
        }
        else {
            if (options.equipment) {
                switch (trimmedSlot) {
                    case "head":
                        return options.equipment?.getEquipment(EquipmentSlot.Head);
                    case "chest":
                        return options.equipment?.getEquipment(EquipmentSlot.Chest);
                    case "legs":
                        return options.equipment?.getEquipment(EquipmentSlot.Legs);
                    case "feet":
                        return options.equipment?.getEquipment(EquipmentSlot.Feet);
                    case "mainhand":
                        return options.equipment?.getEquipment(EquipmentSlot.Mainhand);
                    case "offhand":
                        return options.equipment?.getEquipment(EquipmentSlot.Offhand);
                }
            }
            if (Number.isNaN(Number(slot))) {
                return options.container?.getItem(Number(slot));
            }
            else {
                return undefined;
            }
        }
    }
    else if (typeof slot == "number") {
        return options?.container?.getItem(Number(slot));
    }
    else if (!Number.isNaN(Number(slot))) {
        return options?.container?.getItem(Number(slot));
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=getItemFromParsedSlot.js.map