import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
/**
 * Displays and handles the TPA System Settings form for the given entity.
 *
 * @param sourceEntitya - The entity for which the settings form is displayed. It can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the form was successfully handled or canceled.
 * - `0` if the user does not have permission to access the settings.
 * - `-2` if an error occurred while handling the form.
 *
 * @remarks
 * If `ultraSecurityModeEnabled` is true, the function checks if the player has the `andexdb.accessSettings` permission. If the player lacks this permission, an access denied message is shown.
 *
 * The form includes options to enable/disable the TPA system and set the timeout duration for TPA requests.
 *
 * @example
 * ```typescript
 * const result = await tpaSettings(player);
 * if (result === 1) {
 *     console.log("Settings updated or form canceled.");
 * } else if (result === 0) {
 *     console.log("Access denied.");
 * } else {
 *     console.error("An error occurred.");
 * }
 * ```
 */
export async function tpaSettings(sourceEntitya) {
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
    form2.title("TPA System Settings [§cExperimental§r]");
    form2.toggle("§l§fEnable TPA System", config.tpaSystem.tpaSystemEnabled);
    form2.textField("§l§fSeconds Until Request Times Out§r§o\ndefault is 60", "int", config.tpaSystem.timeoutDuration.toString());
    //form2.textField("§l§fMaximum Homes Per Player§r§f", "Int|Infinity", String(config.homeSystem.maxHomesPerPlayer));
    form2.submitButton("Save");
    return await forceShow(form2, sourceEntity)
        .then((to) => {
        let t = to;
        if (t.canceled) {
            return 1;
        } /*
GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
            ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
        let [tpaSystemEnabled, timeoutDuration] = t.formValues;
        config.tpaSystem.tpaSystemEnabled = tpaSystemEnabled;
        config.tpaSystem.timeoutDuration = timeoutDuration.toNumber();
        //config.homeSystem.maxHomesPerPlayer=String(maxHomesPerPlayer).toLowerCase()=="infinity"?Infinity:Number(maxHomesPerPlayer)
        return 1;
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=tpaSettings.js.map