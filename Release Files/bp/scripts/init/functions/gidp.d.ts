import type { ItemStack, ContainerSlot } from "@minecraft/server";
export declare function gidp(item: ItemStack | ContainerSlot, propertyId: string): string | number | boolean | import("@minecraft/server").Vector3 | undefined;
declare global {
    const gidp: typeof import('./gidp').gidp;
}
