import { EquipmentSlot, type Container, type EntityEquippableComponent, type PlayerCursorInventoryComponent, type ItemStack } from "@minecraft/server";
export declare function getItemFromParsedSlot<Options extends {
    container?: Container;
    equipment?: EntityEquippableComponent;
    cursor?: PlayerCursorInventoryComponent;
    selectedSlotIndex?: number;
}>(slot: "~" | "cursor" | EquipmentSlot | number, options: Options): (Options["cursor"] extends PlayerCursorInventoryComponent ? ItemStack | undefined : undefined) | (Options["container"] extends Container ? ItemStack | undefined : undefined) | (Options["equipment"] extends EntityEquippableComponent ? ItemStack | undefined : undefined) | undefined;
