import { Entity, GameRules, Player, world } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { showMessage } from "modules/utilities/functions/showMessage";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { customFormUICodes } from "../constants/customFormUICodes";
/**
 * Manages the game rules UI for a given source entity.
 *
 * @param sourceEntitya - The source entity which can be of type Entity, executeCommandPlayerW, or Player.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or if the user canceled the form.
 * - `0` if the user does not have permission to access the menu.
 * - `-2` if an error occurred during the operation.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, shows an access denied message and returns `0` or `1` based on user selection.
 * 4. If the player has permission, displays a form to manage game rules.
 * 5. The form allows the user to modify game rules, either as text fields for numeric values or toggles for boolean values.
 * 6. Submits the form and updates the game rules based on user input.
 * 7. Handles any errors that occur during the form submission and updates.
 */
export async function manageGameRulesUI(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
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
    const ruleNames = Object.getOwnPropertyNames(GameRules.prototype)
        .filter((r) => r != "constructor")
        .sort((a, b) => -+(typeof world.gameRules[a] != typeof world.gameRules[b]) *
        (2 * +(typeof world.gameRules[a] == "number") - 1));
    const ruleValues = world.gameRules;
    form2.title(customFormUICodes.modal.titles.formStyles.fullscreen + "Manage Game Rules");
    ruleNames.forEach((r) => {
        if (typeof ruleValues[r] == "number") {
            form2.textField(r, "number", { defaultValue: String(ruleValues[r]) });
        }
        else {
            form2.toggle(r, { defaultValue: Boolean(ruleValues[r]) });
        }
    });
    form2.submitButton("Save");
    return await forceShow(form2, sourceEntity)
        .then((to) => {
        let t = to;
        if (t.canceled)
            return 1;
        try {
            t.formValues?.forEach((v, i) => {
                if (ruleValues[ruleNames[i]] != v) {
                    ruleValues[ruleNames[i]] =
                        typeof ruleValues[ruleNames[i]] == "number" ? Number(v) : v;
                }
            });
        }
        catch (e) {
            sourceEntity.sendMessage("§c" + e + " " + e.stack);
        }
        return 1;
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=manageGameRulesUI.js.map