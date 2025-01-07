import type { Entity, Player } from "@minecraft/server";
export declare function gedp(entity: Entity | Player, propertyId: string): string | number | boolean | import("@minecraft/server").Vector3;
declare global {
    const gedp: typeof import('./gedp').gedp;
}
