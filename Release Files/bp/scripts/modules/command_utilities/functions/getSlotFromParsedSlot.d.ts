import { EquipmentSlot, type Container, type EntityEquippableComponent, type PlayerCursorInventoryComponent, type ContainerSlot } from "@minecraft/server";
export declare function getSlotFromParsedSlot<Options extends {
    container?: Container;
    equipment?: EntityEquippableComponent;
    cursor?: PlayerCursorInventoryComponent;
    selectedSlotIndex?: number;
}>(slot: "~" | "cursor" | EquipmentSlot | number, options: Options): (Options["cursor"] extends PlayerCursorInventoryComponent ? PlayerCursorInventoryComponent : undefined) | (Options["container"] extends Container ? ContainerSlot : undefined) | (Options["equipment"] extends EntityEquippableComponent ? ContainerSlot : undefined) | undefined;
