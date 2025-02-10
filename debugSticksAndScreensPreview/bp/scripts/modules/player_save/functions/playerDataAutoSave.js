import { world, system } from "@minecraft/server";
import { config } from "init/classes/config";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
let lastPlayerDataAutoSaveRun_local = 0;
export async function playerDataAutoSaveAsyncInstance() {
    lastPlayerDataAutoSaveRun_local = Date.now();
    try {
        const players = world.getAllPlayers();
        for await (const p of players) {
            if (globalThis.stopPlayerDataAutoSaveAsync) {
                // globalThis.stopPlayerDataAutoSaveAsync = false;
                return;
            }
            await savedPlayer.savePlayerAsync(p);
            await waitTick();
        }
        return 1;
        // playerDataAutoSaveAsync();
    }
    catch (e) {
        console.error(e, e.stack);
        globalThis.errorLog.playerDataAutoSave.push({ time: Date.now(), error: e });
        if (globalThis.errorLog.playerDataAutoSave.length > 1000) {
            globalThis.errorLog.playerDataAutoSave.splice(0, globalThis.errorLog.playerDataAutoSave.length - 1000);
        }
        return 0;
    }
}
export async function playerDataAutoSaveAsync() {
    try {
        while (true) {
            if (globalThis.stopPlayerDataAutoSaveAsync == true) {
                globalThis.stopPlayerDataAutoSaveAsync = false;
                break;
            }
            await playerDataAutoSaveAsyncInstance();
            if (globalThis.stopPlayerDataAutoSaveAsync == true) {
                globalThis.stopPlayerDataAutoSaveAsync = false;
                break;
            }
            await system.waitTicks(config.system.playerDataRefreshRate ?? 20);
        }
    }
    catch (e) {
        console.error(e, e.stack);
        globalThis.errorLog.playerDataAutoSave.push({ time: Date.now(), error: e });
        if (globalThis.errorLog.playerDataAutoSave.length > 1000) {
            globalThis.errorLog.playerDataAutoSave.splice(0, globalThis.errorLog.playerDataAutoSave.length - 1000);
        }
        return 0;
    }
    return 1;
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
            lastPlayerDataAutoSaveRun_local = Date.now();
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
Object.defineProperty(globalThis, "lastPlayerDataAutoSaveRun", {
    get: function lastPlayerDataAutoSaveRun() {
        return lastPlayerDataAutoSaveRun_local;
    }
});
//# sourceMappingURL=playerDataAutoSave.js.map