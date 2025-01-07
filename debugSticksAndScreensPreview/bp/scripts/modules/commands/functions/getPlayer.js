import { world } from "@minecraft/server";
export function getPlayer(playerName) {
    return world.getAllPlayers().find((p) => p.name == playerName);
}
//# sourceMappingURL=getPlayer.js.map