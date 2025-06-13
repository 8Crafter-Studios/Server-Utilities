import { ActionFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { worldBorderSettings } from "./worldBorderSettings";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
/**
 * Displays a dimension selector form for world border settings to the specified entity.
 *
 * @param sourceEntitya - The entity to which the form will be shown. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the user cancels the form or selects "Back".
 * - `0` if the user completes the form without issues.
 * - `-2` if an error occurs.
 *
 * The function first checks if ultra security mode is enabled and if the player has the required permission to access the settings.
 * If the player does not have the required permission, an access denied message is shown.
 *
 * The form allows the user to select between "Overworld", "Nether", "The End", and "Back".
 * If the user selects a dimension, the `worldBorderSettings` function is called with the selected dimension.
 * If the user selects "Back" or cancels the form, the function returns `1`.
 * If an error occurs, the function returns `-2`.
 */
export async function worldBorderSettingsDimensionSelector(sourceEntitya) {
    const sourceEntity = (sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya);
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessExtraFeaturesSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessExtraFeaturesSettings", "Go Back", "Close");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form2 = new ActionFormData();
    form2.button("Overworld");
    form2.button("Nether");
    form2.button("The End");
    form2.button("Back");
    form2.button("Close");
    return await forceShow(form2, sourceEntity)
        .then(async (t) => {
        if (t.canceled || t.selection == 3) {
            return 1;
        }
        if (t.selection == 4) {
            return 0;
        }
        if ((await worldBorderSettings(sourceEntity, t.selection)) == 1) {
            return await worldBorderSettingsDimensionSelector(sourceEntity);
        }
        else {
            return 0;
        }
        ;
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=worldBorderSettingsDimensionSelector.js.map