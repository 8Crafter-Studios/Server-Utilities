import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { chatRanksSettings_chatStyle } from "./chatRanksSettings_chatStyle";
import { chatRanksSettings_chatStyleSettings } from "./chatRanksSettings_chatStyleSettings";
import { chatRanksSettings_generalChatSettings } from "./chatRanksSettings_generalChatSettings";
import { chatRanksSettings_previewChatMessage } from "./chatRanksSettings_previewChatMessage";
export async function chatRanksSettings(sourceEntity) {
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
            const allowMessageModifications = !config.chatRanks.disableCustomChatMessages;
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Chat Settings");
            form.button(`${customFormUICodes.action.buttons.positions.main_only}Allow Chat Modifications\n${allowMessageModifications ? "§aEnabled" : "§cDisabled"}`, allowMessageModifications ? "textures/ui/toggle_on" : "textures/ui/toggle_off");
            form.button(`${customFormUICodes.action.buttons.positions.main_only}${allowMessageModifications ? "" : customFormUICodes.action.buttons.options.disabled}Chat Style`, "textures/ui/text_color_paintbrush");
            form.button(`${customFormUICodes.action.buttons.positions.main_only}${allowMessageModifications ? "" : customFormUICodes.action.buttons.options.disabled}Chat Style Settings`, "textures/ui/pencil_edit_icon");
            form.button(`${customFormUICodes.action.buttons.positions.main_only}${allowMessageModifications ? "" : customFormUICodes.action.buttons.options.disabled}General Chat Settings`, "textures/ui/settings_glyph_color_2x");
            form.button(`${customFormUICodes.action.buttons.positions.main_only}${allowMessageModifications ? "" : customFormUICodes.action.buttons.options.disabled}Preview Chat Message`, "textures/ui/icon_preview");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            let response = r.selection;
            switch (["toggle", "chatStyle", "chatStyleSettings", "generalChatSettings", "previewChatMessage", "back", "close"][response]) {
                case "toggle":
                    config.chatRanks.disableCustomChatMessages = !config.chatRanks.disableCustomChatMessages;
                    continue;
                case "chatStyle":
                    if ((await chatRanksSettings_chatStyle(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "chatStyleSettings":
                    if ((await chatRanksSettings_chatStyleSettings(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "generalChatSettings":
                    if ((await chatRanksSettings_generalChatSettings(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "previewChatMessage":
                    if ((await chatRanksSettings_previewChatMessage(player)) === 1) {
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
//# sourceMappingURL=chatRanksSettings.js.map