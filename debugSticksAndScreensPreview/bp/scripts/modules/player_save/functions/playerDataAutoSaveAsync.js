import { world, system } from "@minecraft/server";
import { config } from "init/classes/config";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
export async function playerDataAutoSaveAsync() {
    const players = world.getAllPlayers();
    for await (const p of players) {
        if (globalThis.stopPlayerDataAutoSaveAsync) {
            globalThis.stopPlayerDataAutoSaveAsync = false;
            return;
        }
        await savedPlayer.savePlayerAsync(p);
        await waitTick();
    }
    if (globalThis.stopPlayerDataAutoSaveAsync == true) {
        globalThis.stopPlayerDataAutoSaveAsync = false;
        return;
    }
    await system.waitTicks(config.system.playerDataRefreshRate ?? 20);
    playerDataAutoSaveAsync();
}
//# sourceMappingURL=playerDataAutoSaveAsync.js.map