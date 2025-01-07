import { world } from "@minecraft/server";
export function getPlayerById(playerId) {
    return world.getAllPlayers().find((v) => v.id == String(playerId));
}
//# sourceMappingURL=getPlayerById.js.map