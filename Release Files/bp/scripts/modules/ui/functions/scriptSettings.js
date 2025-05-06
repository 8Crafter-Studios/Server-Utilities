import { ModalFormData } from "@minecraft/server-ui";
import "init/classes/config";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
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
    let form = new ModalFormData();
    form.title(customFormUICodes.modal.titles.formStyles.medium + "Script Settings");
    form.header("General");
    form.textField("§l§fDefault Min MS Between Tick Waits§r\nThe default minimum time between tick waits, in milliseconds. This will be the minimum amount of milliseconds that many generation functions will spend each tick, set this to a really low value to reduce lag while using them, but setting it really low will also cause the generation functions to take a really long time. Setting it close to or above 10000 may cause the generation functions to be interrupted with script hang errors. The default is 2500.", "integer", String(config.system.defaultMinMSBetweenTickWaits));
    form.dropdown("§l§fUndo Clipboard Mode§r\nWhether to save undo history in memory or to the world files, memory will cause undo history to be cleared upon restarting the world/realm/server, the default is Memory", ["Memory", "World"], ["Memory", "World"].indexOf(String(config.undoClipboardMode)));
    form.divider();
    form.header("Refresh Rates");
    form.textField("§l§fPlayer Data Refresh Rate§r\nThe interval at which to update the saved playerdata of all online players. Decreasing this number may increase lag. The default is 20.", "integer from 1-1000", String(config.system.playerDataRefreshRate));
    form.textField("§l§fBanned Players Refresh Rate§r\nThe interval at which to check for banned players, decreasing this number may increase lag, the default is 20", "integer from 1-1000000", String(config.system.bannedPlayersRefreshRate)); /*
    form2.textField(
        "§l§fProtected Areas Refresh Rate§r\nThe interval at which to update list the saved protected areas, decreasing this number may increase lag, the default is 200",
        "integer from 1-1000000",
        String(config.system.protectedAreasRefreshRate)
    ); */
    form.divider();
    form.header("Protected Areas Zone Actions");
    form.toggle("§l§fProtected Areas Zone Actions Enabled§r\nWhether to enable zone actions for protected areas. The default is true.", config.system.protectedAreasZoneActionsEnabled);
    form.textField("§l§fProtected Areas Zone Actions Interval§r\nHow often in ticks to execute the zone actions. Decreasing this number may increase lag. The default is 5.", "integer from 1-1000000", String(config.system.protectedAreasZoneActionsInterval));
    form.textField("§l§fProtected Areas Zone Refresh Interval§r\nHow often in milliseconds to refresh the list of protected areas zones with zone actions. The default is 200.", "integer from 1-1000000", String(config.system.protectedAreasZoneRefreshInterval));
    form.divider();
    form.header("Integrations With Other Add-Ons");
    form.toggle("§l§fShow Entity Scale Not Found Console Log§r\nWhether or not to log to the console when the add-on fails to find a compatible version of Entity Scale active on startup, the default is true", config.system.showEntityScaleNotFoundConsoleLog);
    form.toggle("§l§fShow Entity Scale Found Console Log§r\nWhether or not to log to the console when the add-on sucessfully finds a compatible version of Entity Scale active on startup, the default is true", config.system.showEntityScaleFoundConsoleLog);
    form.toggle("§l§fShow Entity Scale Not Found Chat Log§r\nWhether or not to log to the chat when the add-on fails to find a compatible version of Entity Scale active on startup, the default is false", config.system.showEntityScaleNotFoundChatLog);
    form.toggle("§l§fShow Entity Scale Found Chat Log§r\nWhether or not to log to the chat when the add-on sucessfully finds a compatible version of Entity Scale active on startup, the default is false", config.system.showEntityScaleFoundChatLog);
    form.toggle("§l§fShow BlueMods Anticheat Not Found Console Log§r\nWhether or not to log to the console when the add-on fails to find a compatible version of BlueMods Anticheat active on startup, the default is true", config.system.showBlueModsAnticheatNotFoundConsoleLog);
    form.toggle("§l§fShow BlueMods Anticheat Found Console Log§r\nWhether or not to log to the console when the add-on sucessfully finds a compatible version of BlueMods Anticheat active on startup, the default is true", config.system.showBlueModsAnticheatFoundConsoleLog);
    form.toggle("§l§fShow BlueMods Anticheat Not Found Chat Log§r\nWhether or not to log to the chat when the add-on fails to find a compatible version of BlueMods Anticheat active on startup, the default is false", config.system.showBlueModsAnticheatNotFoundChatLog);
    form.toggle("§l§fShow BlueMods Anticheat Found Chat Log§r\nWhether or not to log to the chat when the add-on sucessfully finds a compatible version of BlueMods Anticheat active on startup, the default is false", config.system.showBlueModsAnticheatFoundChatLog);
    form.divider();
    form.header("Debugging");
    form.toggle("§l§fdebugMode§r\nWhether debug mode is enabled or not, the default is false", config.system.debugMode);
    if (config.system.debugMode) {
        form.textField("§l§cArtificial Lag MS§r§c (Only visible in debug mode)\nThe number of milliseconds of artificial lag to cause each tick. §eWARNING!: THIS IS VERY DANGEROUS AND COULD RESULT IN YOUR WORLD BEING SOFT-LOCKED IF SET TO AN EXTREMELY HIGH VALUE, BECAUSE OF THIS, THIS INPUT WILL ONLY ALLOW VALUES UP TO 10000 MILLISECONDS, TO SET IT HIGHER YOU MUST USE THE SCRIPT EVAL TO SET THE §bconfig.system.artificialLagMS§e PROPERTY TO THE DESIRED VALUE", "int", String(config.system.artificialLagMS));
        form.toggle("§l§cAllow Watchdog Termination Crash§r§c (Only visible in debug mode)\nWhether or not to allow script spikes and errors to crash this world/realm/server. §eWARNING!: THIS IS VERY DANGEROUS AND MAY RESULT IN YOUR WORLD/REALM/SERVER CRASHING A LOT!§r\nThe default is false", config.system.allowWatchdogTerminationCrash);
        form.toggle("§l§cHide Watchdog Termination Crash Enabled Warnings On Startup§r§c (Only visible in debug mode)\nWhether or not to hide the warning that appears on startup when allowWatchdogTerminationCrash is enabled. §eWARNING!: ENABLING THIS IS HIGHLY DISCOURAGED!§r\nThe default is false", config.system.hideWatchdogTerminationCrashEnabledWarningsOnStartup);
        form.toggle("§l§cSpread Player Inventory Data Saves Over Multiple Ticks§r§c (Only visible in debug mode)\nWhether or not to spread player inventory data saving over multiple ticks to reduce lag, this only applies when §bGeneral Settings > useLegacyPlayerInventoryDataSaveSystem§r is disabled, the default is true", config.system.spreadPlayerInventoryDataSavesOverMultipleTicks);
    }
    form.submitButton("Save");
    return await forceShow(form, sourceEntity)
        .then((to) => {
        let t = to;
        if (t.canceled) {
            return 1;
        } /*
GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
            ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
        let [
        // General
        defaultMinMSBetweenTickWaits, undoClipboardMode, 
        // Refresh Rates
        playerDataRefreshRate, 
        // protectedAreasRefreshRate,
        bannedPlayersRefreshRate, 
        // Protected Areas Zone Actions
        protectedAreasZoneActionsEnabled, protectedAreasZoneActionsInterval, protectedAreasZoneRefreshInterval, 
        // Integrations With Other Add-Ons
        showEntityScaleNotFoundConsoleLog, showEntityScaleFoundConsoleLog, showEntityScaleNotFoundChatLog, showEntityScaleFoundChatLog, showBlueModsAnticheatNotFoundConsoleLog, showBlueModsAnticheatFoundConsoleLog, showBlueModsAnticheatNotFoundChatLog, showBlueModsAnticheatFoundChatLog, 
        // Debugging
        debugMode, artificialLagMS, allowWatchdogTerminationCrash, hideWatchdogTerminationCrashEnabledWarningsOnStartup, spreadPlayerInventoryDataSavesOverMultipleTicks,] = t.formValues;
        // General
        config.system.defaultMinMSBetweenTickWaits =
            defaultMinMSBetweenTickWaits.toNumber();
        config.undoClipboardMode = (["Memory", "World"][undoClipboardMode] ?? "Memory");
        // Refresh Rates
        config.system.playerDataRefreshRate =
            playerDataRefreshRate.toNumber(); /*
    config.system.protectedAreasRefreshRate =
        protectedAreasRefreshRate.toNumber(); */
        config.system.bannedPlayersRefreshRate =
            bannedPlayersRefreshRate.toNumber();
        // Protected Areas Zone Actions
        config.system.protectedAreasZoneActionsEnabled =
            protectedAreasZoneActionsEnabled;
        config.system.protectedAreasZoneActionsInterval =
            protectedAreasZoneActionsInterval.toNumber();
        config.system.protectedAreasZoneRefreshInterval =
            protectedAreasZoneRefreshInterval.toNumber();
        // Integrations With Other Add-Ons
        config.system.showEntityScaleNotFoundConsoleLog =
            showEntityScaleNotFoundConsoleLog;
        config.system.showEntityScaleFoundConsoleLog =
            showEntityScaleFoundConsoleLog;
        config.system.showEntityScaleNotFoundChatLog =
            showEntityScaleNotFoundChatLog;
        config.system.showEntityScaleFoundChatLog =
            showEntityScaleFoundChatLog;
        config.system.showBlueModsAnticheatNotFoundConsoleLog =
            showBlueModsAnticheatNotFoundConsoleLog;
        config.system.showBlueModsAnticheatFoundConsoleLog =
            showBlueModsAnticheatFoundConsoleLog;
        config.system.showBlueModsAnticheatNotFoundChatLog =
            showBlueModsAnticheatNotFoundChatLog;
        config.system.showBlueModsAnticheatFoundChatLog =
            showBlueModsAnticheatFoundChatLog;
        // Debugging
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
        config.system.debugMode = debugMode; // Must be after the debug mode only options.
        return 1;
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=scriptSettings.js.map