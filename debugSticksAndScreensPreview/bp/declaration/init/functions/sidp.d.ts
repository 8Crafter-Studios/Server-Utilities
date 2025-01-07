import type { ItemStack, ContainerSlot, Entity, Player } from "@minecraft/server";
export declare function sidp(item: ItemStack | ContainerSlot, entity: Entity | Player, propertyId: string, newValue?: string | number | boolean | undefined): void;
declare global {
    const sidp: typeof import('./sidp').sidp;
}
