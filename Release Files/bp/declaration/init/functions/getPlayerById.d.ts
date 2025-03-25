export declare function getPlayerById(playerId: string | number): import("@minecraft/server").Player;
declare global {
    const getPlayerById: typeof import('./getPlayerById').getPlayerById;
}
