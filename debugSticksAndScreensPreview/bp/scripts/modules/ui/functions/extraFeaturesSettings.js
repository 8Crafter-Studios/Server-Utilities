import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { mainShopSystemSettings } from "ExtraFeatures/shop_main";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { worldBorderSettingsDimensionSelector } from "./worldBorderSettingsDimensionSelector";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
/**
 * Displays the Extra Features Settings menu to the specified player or entity.
 *
 * @param sourceEntitya - The entity or player to whom the settings menu will be shown. It can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `-2` if an error occurs,
 * - `0` if the player chooses to close the menu,
 * - `1` if the player navigates back or cancels the form.
 *
 * The function first checks if ultra security mode is enabled and if the player has the necessary permissions to access the settings menu. If the player lacks the required permissions, an access denied message is shown. Otherwise, the Extra Features Settings menu is displayed, allowing the player to navigate through different settings options.
 */
export async function extraFeaturesSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
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
    let form = new ActionFormData();
    form.title("Extra Features Settings");
    form.body("Extra features are optional features that can be enabled but are disabled by default.");
    form.button("World Border System", "textures/ui/worldsIcon");
    form.button("Shop System", "textures/ui/store_home_icon");
    form.button("Back", "textures/ui/arrow_left");
    form.button("Crossout", "textures/ui/arrow_left"); /*
    form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        let response = r.selection;
        switch (response) {
            case 0:
                if ((await worldBorderSettingsDimensionSelector(sourceEntity)) == 1) {
                    return await extraFeaturesSettings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 1:
                if ((await mainShopSystemSettings(sourceEntity)) == 1) {
                    return await extraFeaturesSettings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 2:
                return 1;
                break;
            default:
                return 1;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=extraFeaturesSettings.js.map