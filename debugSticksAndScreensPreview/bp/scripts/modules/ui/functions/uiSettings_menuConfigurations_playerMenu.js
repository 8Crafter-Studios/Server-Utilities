import { Entity, Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { uiSettings_menuConfigurations_playerMenu_mainSettings } from "./uiSettings_menuConfigurations_playerMenu_mainSettings";
import { uiSettings_menuConfigurations_playerMenu_editButtons } from "./uiSettings_menuConfigurations_playerMenu_editButtons";
import { manageWarps } from "./manageWarps";
import { manageRedeemableCodes } from "./manageRedeemableCodes";
import { uiSettings_menuConfigurations_playerMenu_leaderboardsSettings } from "./uiSettings_menuConfigurations_playerMenu_leaderboardsSettings";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
/**
 * Displays and handles the player menu settings form for a given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * @remarks
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export async function uiSettings_menuConfigurations_playerMenu(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.accessSettings") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            let form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Player Menu Settings");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Main Settings", "textures/ui/settings_glyph_color_2x");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Buttons", "textures/ui/pencil_edit_icon");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Leaderboards Settings", "textures/ui/icon_best3");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Warps", "textures/items/ender_pearl");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Redeemable Codes", "textures/ui/icon_blackfriday");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            let response = r.selection;
            switch (["mainSettings", "editButtons", "leaderboardsSettings", "editWarps", "editRedeemableCodes", "back", "close"][response]) {
                case "mainSettings":
                    if ((await uiSettings_menuConfigurations_playerMenu_mainSettings(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "editButtons":
                    if ((await uiSettings_menuConfigurations_playerMenu_editButtons(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "leaderboardsSettings":
                    if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "editWarps":
                    if ((await manageWarps(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "editRedeemableCodes":
                    if ((await manageRedeemableCodes(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    throw new Error("Invalid selection: " + r.selection);
            }
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
//# sourceMappingURL=uiSettings_menuConfigurations_playerMenu.js.map