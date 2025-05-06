import { ActionFormData } from "@minecraft/server-ui";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
import { moderationMenu_quickBan } from "./moderationMenu_quickBan";
import { moderationMenu_quickKick } from "./moderationMenu_quickKick";
import { moderationMenu_quickMute } from "./moderationMenu_quickMute";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { moderationMenu_quickTransfer } from "./moderationMenu_quickTransfer";
/**
 * Displays the moderation quick actions menu.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function moderationMenu_quickActions(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Quick Actions");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Ban Player", "textures/ui/hammer_l");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Mute Player", "textures/ui/mute_on");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Kick Player", "textures/ui/friend_glyph_desaturated");
            let transferPlayerButtonVisible = false;
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.transferPlayers") === true) {
                    transferPlayerButtonVisible = true;
                    form.button(customFormUICodes.action.buttons.positions.main_only + "Transfer Player", "textures/ui/servers");
                }
            }
            else {
                transferPlayerButtonVisible = true;
                form.button(customFormUICodes.action.buttons.positions.main_only + "Transfer Player", "textures/ui/servers");
            }
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch (cullUndefined(["ban", "mute", "kick", transferPlayerButtonVisible ? "transfer" : undefined, "back", "close"])[r.selection]) {
                case "ban":
                    if ((await moderationMenu_quickBan(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "mute":
                    if ((await moderationMenu_quickMute(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "kick":
                    if ((await moderationMenu_quickKick(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "transfer":
                    if ((await moderationMenu_quickTransfer(player)) == 1) {
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
//# sourceMappingURL=moderationMenu_quickActions.js.map