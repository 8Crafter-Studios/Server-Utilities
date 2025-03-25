import type { Entity, Player } from "@minecraft/server";
export declare function sedp(entity: Entity | Player, propertyId: string, newValue?: string | number | boolean | undefined): void;
declare global {
    const sedp: typeof import('./sedp').sedp;
}
