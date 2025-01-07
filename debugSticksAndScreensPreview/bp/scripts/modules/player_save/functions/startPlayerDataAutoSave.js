import { system, world } from "@minecraft/server";
import { config } from "init/classes/config";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { stopPlayerDataAutoSave } from "./stopPlayerDataAutoSave";
import { playerDataAutoSaveAsync } from "./playerDataAutoSaveAsync";
export async function startPlayerDataAutoSave() {
    (await import("Main")).config;
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
//# sourceMappingURL=startPlayerDataAutoSave.js.map