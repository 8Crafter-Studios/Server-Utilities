export declare function getPlayer(playerName: string): import("@minecraft/server").Player;
declare global {
    const getPlayer: typeof import('./getPlayer').getPlayer;
}
