import { type Player } from "@minecraft/server";
export declare function getPlayerById(playerId: string | number): Player | undefined;
declare global {
    const getPlayerById: typeof import('./getPlayerById').getPlayerById;
}
