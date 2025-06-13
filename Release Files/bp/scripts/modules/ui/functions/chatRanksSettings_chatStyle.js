import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import "init/classes/config";
import { rankModes } from "../../chat/constants/rankModes";
import { rankModesArray } from "../../chat/constants/rankModesArray";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { customFormUICodes } from "../constants/customFormUICodes";
/**
 * Displays and handles the select chat style mode form for a given player or entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function chatRanksSettings_chatStyle(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
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
        const rankMode = config.chatRanks.rankMode;
        const form = new ActionFormData();
        form.title(customFormUICodes.action.titles.formStyles.fullscreen + "Select Chat Style Mode");
        form.body(`Custom(Simple): Allows for simple customizations to the rank and message formatting.
Custom(Advanced): Allows for complete control over the rank and message formatting.
Style 1: "§r§f[10:09:00 AM] [§bRank§f] [§cOther Rank§f] <Steve> Hi"
Style 2: "§r§8[§f10:09:00 AM§8] [§bRank§8] [§cOther Rank§8] §fSteve§8 » §fHi"
Style 3: "§r§8[§f10:09:00 AM§8] [§bRank§8] [§cOther Rank§8] §fSteve >> Hi"
Style 4: "§r§7[10:09:00 AM] [§bRank§7] [§cOther Rank§7] §7Steve§l > §r§fHi"
Style 5: "§r§f[10:09:00 AM] [§bRank§f,§cOther Rank§f] §7Steve: §fHi"

The default is Custom(Simple).`);
        rankModesArray.forEach((style) => {
            form.button(`${customFormUICodes.action.buttons.positions.main_only}${style}${rankModes[rankMode] === style ? "\n§aSelected" : ""}`);
        });
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        const r = await form.forceShow(player);
        if (r.canceled) {
            return 1;
        }
        switch ((!!rankModesArray[r.selection] ? "style" : undefined) ?? ["back", "close"][r.selection]) {
            case "style":
                config.chatRanks.rankMode = Object.entries(rankModes).find((m) => m[1] === rankModesArray[r.selection])?.[0];
                return 1;
            case "back":
                return 1;
            case "close":
                return 0;
        }
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
//# sourceMappingURL=chatRanksSettings_chatStyle.js.map