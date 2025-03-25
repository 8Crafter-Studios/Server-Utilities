import { ModalFormData } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { customFormUICodes } from "../constants/customFormUICodes";
/**
 * Displays and handles the TPA System Settings form for the given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * @remarks
 * If `ultraSecurityModeEnabled` is true, the function checks if the player has the `andexdb.accessSettings` permission. If the player lacks this permission, an access denied message is shown.
 *
 * The form includes options to enable/disable the TPA system and set the timeout duration for TPA requests.
 *
 * @example
 * ```typescript
 * if((await tpaSettings(player)) === 1){
 *     continue;
 * }else{
 *     return 0;
 * };
 * ```
 */
export async function tpaSettings(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(player, "andexdb.accessSettings") == false) {
                const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Go Back", "Close");
                if (r.canceled || r.selection == 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
        let form = new ModalFormData();
        form.title(customFormUICodes.modal.titles.formStyles.medium + "TPA System Settings [§cExperimental§r]");
        form.toggle("§l§fEnable TPA System§r§o\ndefault is enabled", config.tpaSystem.tpaSystemEnabled);
        form.textField("§l§fSeconds Until Request Times Out§r§o\ndefault is 60", "int", config.tpaSystem.timeoutDuration.toString());
        form.toggle("§l§fAllow Cross-Dimensional Teleport§r§o\ndefault is enabled", config.tpaSystem.allowCrossDimensionalTeleport);
        //form2.textField("§l§fMaximum Homes Per Player§r§f", "Int|Infinity", String(config.homeSystem.maxHomesPerPlayer));
        form.submitButton("Save");
        const r = await form.forceShow(player);
        if (r.canceled) {
            return 1;
        } /*
    GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
            ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
        let [tpaSystemEnabled, timeoutDuration, allowCrossDimensionalTeleport] = r.formValues;
        config.tpaSystem.tpaSystemEnabled = tpaSystemEnabled;
        config.tpaSystem.timeoutDuration = timeoutDuration.toNumber();
        config.tpaSystem.allowCrossDimensionalTeleport = allowCrossDimensionalTeleport;
        //config.homeSystem.maxHomesPerPlayer=String(maxHomesPerPlayer).toLowerCase()=="infinity"?Infinity:Number(maxHomesPerPlayer)
        return 1;
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
//# sourceMappingURL=tpaSettings.js.map