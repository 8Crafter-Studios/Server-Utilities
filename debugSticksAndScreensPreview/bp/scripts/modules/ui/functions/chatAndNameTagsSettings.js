import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { chatRanksSettings } from "./chatRanksSettings";
import { nameTagsSettings } from "./nameTagsSettings";
/**
 * Displays and handles the chat and name tags settings form for a given entity.
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
export async function chatAndNameTagsSettings(sourceEntity) {
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
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Chat & Name Tags Settings");
            form.button(`${customFormUICodes.action.buttons.positions.main_only}Chat Settings\n${config.chatRanks.disableCustomChatMessages ? "§cDisabled" : "§aEnabled"}`, "textures/ui/message");
            form.button(`${customFormUICodes.action.buttons.positions.main_only}Name Tags\nSettings\n${config.chatRanks.showRanksOnPlayerNameTags ? "§aEnabled" : "§cDisabled"}`, "textures/items/name_tag");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Reset Chat & Name Tags Settings", "textures/ui/reset_red");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            let response = r.selection;
            switch (["chatSettings", "nameTagsSettings", "back", "close", "reset"][response]) {
                case "chatSettings":
                    if ((await chatRanksSettings(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "nameTagsSettings":
                    if ((await nameTagsSettings(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                case "reset":
                    if ((await showMessage(player, "Are You Sure?", "Are you sure you want to reset all chat and name tags settings!?\nThis action cannot be undone!", "Cancel", "Confirm")).selection == 1) {
                        config.reset(config.chatRanks);
                        if ((await showMessage(player, "Reset Successful", `You have successfully reset all chat and name tags settings to the factory settings.`, "Okay", "Close")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    else {
                        if ((await showMessage(player, "Reset Canceled", `The reset of all chat and name tags settings to the factory settings has been canceled.`, "Okay", "Close")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    continue;
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
//# sourceMappingURL=chatAndNameTagsSettings.js.map