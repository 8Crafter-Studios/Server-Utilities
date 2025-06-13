import type { EntityEquippableComponent, ItemStack } from "@minecraft/server";
export declare function equippableToItemStackArray(equippable: EntityEquippableComponent, includeMainhand?: boolean): (ItemStack | undefined)[];
