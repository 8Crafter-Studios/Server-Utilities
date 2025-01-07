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
export async function startPlayerDataAutoSave() {
    if (config.system.spreadPlayerInventoryDataSavesOverMultipleTicks) {
        stopPlayerDataAutoSave();
        await waitTicks(20);
        globalThis.stopPlayerDataAutoSaveAsync = false;
        playerDataAutoSaveAsync();
    }
    else {
        repeatingIntervals.playerDataAutoSave = system.runInterval(() => {
            if (world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ??
                true == true) {
                world.getAllPlayers().forEach((p) => {
                    savedPlayer.savePlayer(p);
                });
            }
        }, config.system.playerDataRefreshRate ?? 5);
    }
}
export function stopPlayerDataAutoSave() {
    try {
        try {
            system.clearRun(repeatingIntervals.playerDataAutoSave);
        }
        catch { }
        repeatingIntervals.playerDataAutoSave = null;
        globalThis.stopPlayerDataAutoSaveAsync = true;
        return 1;
    }
    catch {
        return 0;
    }
}
//# sourceMappingURL=playerDataAutoSave.js.map