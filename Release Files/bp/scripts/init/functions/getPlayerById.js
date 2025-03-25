import { world } from "@minecraft/server";
export function getPlayerById(playerId) {
    return world.getAllPlayers().find((v) => v.id == String(playerId));
}
Object.defineProperty(globalThis, 'getPlayerById', {
    value: getPlayerById,
    configurable: true,
    enumerable: true,
    writable: false,
});
//# sourceMappingURL=getPlayerById.js.map