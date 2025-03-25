import { world } from "@minecraft/server";
export function getPlayer(playerName) {
    return world.getAllPlayers().find((p) => p.name == playerName);
}
Object.defineProperty(globalThis, 'getPlayer', {
    value: getPlayer,
    configurable: true,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=getPlayer.js.map