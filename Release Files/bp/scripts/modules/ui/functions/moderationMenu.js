import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { antispamSettings } from "./antispamSettings";
import { manageBans } from "./manageBans";
import { customFormUICodes } from "../constants/customFormUICodes";
import { showMessage } from "modules/utilities/functions/showMessage";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { moderationMenu_quickActions } from "./moderationMenu_quickActions";
import { manageMutes } from "./manageMutes";
/**
 * Displays and handles the moderation menu for a given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * @remarks
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the UI.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI.
 * 5. Returns the appropriate status code based on the outcome.
 */
export async function moderationMenu(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Moderation");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Quick Actions", "textures/ui/hammer_l");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Manage Bans", "textures/ui/friend_glyph_desaturated");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Manage Mutes", "textures/ui/mute_on");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Anti-Spam", "textures/ui/mute_on");
            form.button(customFormUICodes.action.buttons.positions.main_only + customFormUICodes.action.buttons.options.disabled + "§4Anti-Cheat\n§f(§cComing Soon!§f)", "textures/ui/friend_glyph_desaturated");
            form.button(customFormUICodes.action.buttons.positions.main_only +
                customFormUICodes.action.buttons.options.disabled +
                "§4Banned Items\n§f(§cComing Soon!§f)", "textures/ui/icon_blackfriday");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            let response = r.selection;
            switch (["quickActions", "manageBans", "manageMutes", "antiSpam", "anticheat", "bannedItems", "back", "close"][response]) {
                case "quickActions":
                    if ((await moderationMenu_quickActions(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "manageBans":
                    if ((await manageBans(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "manageMutes":
                    if ((await manageMutes(sourceEntity)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "antiSpam":
                    if ((await antispamSettings(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "anticheat": {
                    //anticheatSettings(sourceEntity)
                    const r = await showMessage(player, undefined, "§cSorry, the anticheat system does not exist yet.", "Back", "Close");
                    if (r.selection !== 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                }
                case "bannedItems": {
                    //manageBannedItems(sourceEntity)
                    const r = await showMessage(player, undefined, "§cSorry, the banned items system does not exist yet.", "Back", "Close");
                    if (r.selection !== 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
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
//# sourceMappingURL=moderationMenu.js.map