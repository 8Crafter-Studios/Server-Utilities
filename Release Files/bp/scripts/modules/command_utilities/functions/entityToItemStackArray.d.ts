import type { Entity, ItemStack } from "@minecraft/server";
export declare function entityToItemStackArray(entity: Entity, getContainer?: boolean, getEquipment?: boolean): (ItemStack | undefined)[];
