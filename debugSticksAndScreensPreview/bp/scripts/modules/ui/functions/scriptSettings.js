import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
/**
 * Displays and handles the script settings form for the given entity.
 *
 * @param sourceEntitya - The entity that is requesting the script settings. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the form was successfully submitted or access was denied and the user chose to go back.
 * - `0` if access was denied and the user chose to cancel.
 * - `-2` if an error occurred.
 *
 * The form includes various settings related to script behavior, such as refresh rates for player data, protected areas, and banned players,
 * as well as options for logging, debug mode, and undo history storage.
 *
 * If `ultraSecurityModeEnabled` is true, the function checks if the player has the `andexdb.accessSettings` permission.
 * If the player does not have the required permission, an access denied message is shown.
 *
 * The form dynamically adjusts based on whether debug mode is enabled, showing additional debug-related settings if it is.
 *
 * The function uses `forceShow` to display the form and handle the response, updating the configuration based on the user's input.
 */
export async function scriptSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form2 = new ModalFormData();
    form2.title("Script Settings");
    form2.textField("§l§fplayerDataRefreshRate§r\nThe interval at which to update the saved playerdata of all online players, decreasing this number may increase lag, the default is 20", "integer from 1-1000", String(config.system.playerDataRefreshRate));
    form2.textField("§l§fprotectedAreasRefreshRate§r\nThe interval at which to update list the saved protected areas, decreasing this number may increase lag, the default is 200", "integer from 1-1000000", String(config.system.protectedAreasRefreshRate));
    form2.textField("§l§fbannedPlayersRefreshRate§r\nThe interval at which to check for banned players, decreasing this number may increase lag, the default is 20", "integer from 1-1000000", String(config.system.bannedPlayersRefreshRate));
    form2.dropdown("§l§fundoClipboardMode§r\nWhether to save undo history in memory or to the world files, memory will cause undo history to be cleared upon restarting the world/realm/server, the default is Memory", ["Memory", "World"], ["Memory", "World"].indexOf(String(config.undoClipboardMode)));
    form2.toggle("§l§fshowEntityScaleNotFoundConsoleLog§r\nWhether or not to log to the console when the add-on fails to find a compatible version of entity scale active on startup, the default is true", config.system.showEntityScaleNotFoundConsoleLog);
    form2.toggle("§l§fshowEntityScaleFoundConsoleLog§r\nWhether or not to log to the console when the add-on sucessfully finds a compatible version of entity scale active on startup, the default is true", config.system.showEntityScaleFoundConsoleLog);
    form2.toggle("§l§fshowEntityScaleNotFoundChatLog§r\nWhether or not to log to the chat when the add-on fails to find a compatible version of entity scale active on startup, the default is false", config.system.showEntityScaleNotFoundChatLog);
    form2.toggle("§l§fshowEntityScaleFoundChatLog§r\nWhether or not to log to the chat when the add-on sucessfully finds a compatible version of entity scale active on startup, the default is false", config.system.showEntityScaleFoundChatLog);
    form2.toggle("§l§fdebugMode§r\nWhether debug mode is enabled or not, the default is false", config.system.debugMode);
    if (config.system.debugMode) {
        form2.textField("§l§cartificialLagMS§r§c\nThe number of milliseconds of artificial lag to cause each tick. §eWARNING!: THIS IS VERY DANGEROUS AND COULD RESULT IN YOUR WORLD BEING SOFT-LOCKED IF SET TO AN EXTREMELY HIGH VALUE, BECAUSE OF THIS, THIS INPUT WILL ONLY ALLOW VALUES UP TO 10000 MILLISECONDS, TO SET IT HIGHER YOU MUST USE THE SCRIPT EVAL TO SET THE §bconfig.system.artificialLagMS§e PROPERTY TO THE DESIRED VALUE", "int", String(config.system.artificialLagMS));
        form2.toggle("§l§callowWatchdogTerminationCrash§r§c\nWhether or not to allow script spikes and error to crash this world/realm/server. §eWARNING!: THIS IS VERY DANGEROUS AND MAY RESULT IN YOUR WORLD/REALM/SERVER CRASHING A LOT!§r\nThe default is false", config.system.allowWatchdogTerminationCrash);
        form2.toggle("§l§chideWatchdogTerminationCrashEnabledWarningsOnStartup§r§c\nWhether or not to hide the warning that appears on startup when allowWatchdogTerminationCrash is enabled. §eWARNING!: ENABLING THIS IS HIGHLY DISCOURAGED!§r\nThe default is false", config.system.hideWatchdogTerminationCrashEnabledWarningsOnStartup);
        form2.toggle("§l§fspreadPlayerInventoryDataSavesOverMultipleTicks§r\nWhether or not to spread player inventory data saving over multiple ticks to reduce lag, this only applies when §bGlobal Settings>useLegacyPlayerInventoryDataSaveSystem§r is disabled, the default is true", config.system.spreadPlayerInventoryDataSavesOverMultipleTicks);
    }
    form2.submitButton("Save");
    return await forceShow(form2, sourceEntity)
        .then((to) => {
        let t = to;
        if (t.canceled) {
            return 1;
        } /*
GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
            ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
        let [playerDataRefreshRate, protectedAreasRefreshRate, bannedPlayersRefreshRate, undoClipboardMode, showEntityScaleNotFoundConsoleLog, showEntityScaleFoundConsoleLog, showEntityScaleNotFoundChatLog, showEntityScaleFoundChatLog, debugMode, artificialLagMS, allowWatchdogTerminationCrash, hideWatchdogTerminationCrashEnabledWarningsOnStartup, spreadPlayerInventoryDataSavesOverMultipleTicks,] = t.formValues;
        config.system.playerDataRefreshRate =
            playerDataRefreshRate.toNumber();
        config.system.protectedAreasRefreshRate =
            protectedAreasRefreshRate.toNumber();
        config.system.bannedPlayersRefreshRate =
            bannedPlayersRefreshRate.toNumber();
        config.undoClipboardMode = (["Memory", "World"][undoClipboardMode] ?? "Memory");
        if (config.system.debugMode &&
            !(config.system.artificialLagMS == artificialLagMS.toNumber())) {
            config.system.artificialLagMS = Math.min(artificialLagMS.toNumber(), 10000);
            config.system.allowWatchdogTerminationCrash =
                allowWatchdogTerminationCrash;
            config.system.hideWatchdogTerminationCrashEnabledWarningsOnStartup =
                hideWatchdogTerminationCrashEnabledWarningsOnStartup;
            config.system.spreadPlayerInventoryDataSavesOverMultipleTicks =
                spreadPlayerInventoryDataSavesOverMultipleTicks;
        }
        config.system.debugMode = debugMode;
        config.system.showEntityScaleNotFoundConsoleLog =
            showEntityScaleNotFoundConsoleLog;
        config.system.showEntityScaleFoundConsoleLog =
            showEntityScaleFoundConsoleLog;
        config.system.showEntityScaleNotFoundChatLog =
            showEntityScaleNotFoundChatLog;
        config.system.showEntityScaleFoundChatLog =
            showEntityScaleFoundChatLog;
        return 1;
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=scriptSettings.js.map