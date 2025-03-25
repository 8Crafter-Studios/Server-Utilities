import { EquipmentSlot, Container, EntityEquippableComponent, PlayerCursorInventoryComponent } from "@minecraft/server";
export declare function getSlotFromParsedSlot(slot: "~" | "cursor" | EquipmentSlot | number, options?: {
    container?: Container;
    equipment?: EntityEquippableComponent;
    cursor?: PlayerCursorInventoryComponent;
    selectedSlotIndex?: number;
}): PlayerCursorInventoryComponent | import("@minecraft/server").ContainerSlot;
