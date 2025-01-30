import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
/**
 * Displays the Money System Settings UI and handles user interactions.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the user canceled the operation.
 * - `0` if the user does not have permission to access the settings.
 * - `-2` if an error occurred during the operation.
 */
export async function moneySystemSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Go Back", "Close");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form2 = new ModalFormData();
    form2.title("Money System Settings");
    form2.toggle("§l§fUse Scoreboard-Based Money System§r§f\nWhether or not to use a scoreboard-based money system instead of a dynamic property-based one.\nEnabling this option will cause the money system to max out at the 32-bit integer limit (approximately 2.1 billion), but will allow for modifying a player's money with the /scoreboard command instead of having to use the main menu or use script eval.\nWhen this option is disabled the limit is 10^32767. So basically infinite.\nDefaults to false.", config.moneySystem.useScoreboardBasedMoneySystem);
    form2.textField("§l§fScoreboard Name§r§f\nThe name of the scoreboard to use for the money system.\nDefaults to \"andexdb:money\".", "andexdb:money", config.moneySystem.scoreboardName);
    form2.submitButton("Save");
    return await forceShow(form2, sourceEntity)
        .then((to) => {
        let t = to;
        if (t.canceled) {
            return 1;
        } /*
GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
            ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
        let [useScoreboardBasedMoneySystem, scoreboardName] = t.formValues;
        config.moneySystem.useScoreboardBasedMoneySystem = useScoreboardBasedMoneySystem;
        config.moneySystem.scoreboardName = scoreboardName === "" ? "andexdb:money" : scoreboardName;
        return 1;
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=moneySystemSettings.js.map