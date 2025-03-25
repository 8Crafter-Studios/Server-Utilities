import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { advancedSettings } from "./advancedSettings";
import { chatAndNameTagsSettings } from "./chatAndNameTagsSettings";
import { extraFeaturesSettings } from "./extraFeaturesSettings";
import { generalSettings } from "./generalSettings";
import { homeSystemSettings } from "./homeSystemSettings";
import { manageGameRulesUI } from "./manageGameRulesUI";
import { notificationsSettings } from "./notificationsSettings";
import { personalSettings } from "./personalSettings";
import { scriptSettings } from "./scriptSettings";
import { tpaSettings } from "./tpaSettings";
import { uiSettings } from "./uiSettings";
import { editModuleImportsConfig } from "./editModuleImportsConfig";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { moneySystemSettings } from "./moneySystemSettings";
import { uiSettings_menuConfigurations_playerMenu } from "./uiSettings_menuConfigurations_playerMenu";
import { teleportSystemsSettings } from "./teleportSystemsSettings";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
/**
 * Displays and handles the main settings menu form for a given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export async function settings(sourceEntity) {
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
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Settings");
            form.button(customFormUICodes.action.buttons.positions.main_only + "General Settings", "textures/ui/worldsIcon");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Chat & Name Tags Settings", "textures/ui/message");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Script Settings", "textures/ui/debug_glyph_color");
            form.button(customFormUICodes.action.buttons.positions.main_only + "UI Settings", "textures/ui/feedIcon");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Personal Settings", "textures/ui/profile_glyph_color");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Notifications Settings", "textures/ui/icon_bell");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Teleport Systems Settings", "textures/gui/newgui/mob_effects/invisibility_effect");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Home System Settings", "textures/ui/store_home_icon");
            form.button(customFormUICodes.action.buttons.positions.main_only + "TPA System Settings", "textures/ui/switch_accounts");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Money System Settings", "textures/items/emerald");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Player Menu Settings", "textures/items/player_menu_2");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Module Imports", "textures/ui/import");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Manage Game Rules", "textures/ui/controller_glyph_color");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Extra Features", "textures/ui/color_plus");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Advanced", "textures/ui/creator_glyph_color");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            let response = r.selection;
            switch ([
                "generalSettings",
                "chatRanksSettings",
                "scriptSettings",
                "UISettings",
                "personalSettings",
                "notificationsSettings",
                "teleportSystemsSettings",
                "homeSystemSettings",
                "TPASystemSettings",
                "moneySystemSettings",
                "playerMenuSettings",
                "moduleImports",
                "manageGameRules",
                "extraFeatures",
                "advanced",
                "back",
                "close",
            ][response]) {
                case "generalSettings":
                    if ((await generalSettings(player)) === 1) {
                        return await settings(player);
                    }
                    else {
                        return 0;
                    }
                case "chatRanksSettings":
                    if ((await chatAndNameTagsSettings(player)) === 1) {
                        return await settings(player);
                    }
                    else {
                        return 0;
                    }
                case "scriptSettings":
                    if ((await scriptSettings(player)) === 1) {
                        return await settings(player);
                    }
                    else {
                        return 0;
                    }
                case "UISettings":
                    if ((await uiSettings(player)) === 1) {
                        return await settings(player);
                    }
                    else {
                        return 0;
                    }
                case "personalSettings":
                    if ((await personalSettings(player)) === 1) {
                        return await settings(player);
                    }
                    else {
                        return 0;
                    }
                case "notificationsSettings":
                    if ((await notificationsSettings(player)) === 1) {
                        return await settings(player);
                    }
                    else {
                        return 0;
                    }
                case "teleportSystemsSettings":
                    if ((await teleportSystemsSettings(player)) === 1) {
                        return await settings(player);
                    }
                    else {
                        return 0;
                    }
                case "homeSystemSettings":
                    if ((await homeSystemSettings(player)) === 1) {
                        return await settings(player);
                    }
                    else {
                        return 0;
                    }
                case "TPASystemSettings":
                    if ((await tpaSettings(player)) === 1) {
                        return await settings(player);
                    }
                    else {
                        return 0;
                    }
                case "moneySystemSettings":
                    if ((await moneySystemSettings(player)) === 1) {
                        return await settings(player);
                    }
                    else {
                        return 0;
                    }
                case "playerMenuSettings":
                    if ((await uiSettings_menuConfigurations_playerMenu(player)) === 1) {
                        return await settings(player);
                    }
                    else {
                        return 0;
                    }
                case "moduleImports":
                    if ((await editModuleImportsConfig(player)) === 1) {
                        return await settings(player);
                    }
                    else {
                        return 0;
                    }
                case "manageGameRules":
                    if ((await manageGameRulesUI(player)) === 1) {
                        return await settings(player);
                    }
                    else {
                        return 0;
                    }
                case "extraFeatures":
                    if ((await extraFeaturesSettings(player)) === 1) {
                        return await settings(player);
                    }
                    else {
                        return 0;
                    }
                case "advanced":
                    if ((await advancedSettings(player)) === 1) {
                        return await settings(player);
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
//# sourceMappingURL=settings.js.map