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
import { nameTagsSettings_generalNameTagsSettings } from "./nameTagsSettings_generalNameTagsSettings";
import { nameTagsSettings_previewNameTag } from "./nameTagsSettings_previewNameTag";
export async function nameTagsSettings(sourceEntity) {
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
            const allowNameTagModifications = config.chatRanks.showRanksOnPlayerNameTags;
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Name Tags Settings");
            form.button(`${customFormUICodes.action.buttons.positions.main_only}Allow Name Tag Modifications\n${allowNameTagModifications ? "§aEnabled" : "§cDisabled"}`, allowNameTagModifications ? "textures/ui/toggle_on" : "textures/ui/toggle_off");
            // form.button(`${customFormUICodes.action.buttons.positions.main_only}${allowNameTagModifications ? "" : customFormUICodes.action.buttons.options.disabled}Name Tags Style`, "textures/ui/text_color_paintbrush");
            form.button(`${customFormUICodes.action.buttons.positions.main_only}${allowNameTagModifications ? "" : customFormUICodes.action.buttons.options.disabled}General Name Tags Settings`, "textures/ui/settings_glyph_color_2x");
            form.button(`${customFormUICodes.action.buttons.positions.main_only}${allowNameTagModifications ? "" : customFormUICodes.action.buttons.options.disabled}Preview Name Tag`, "textures/ui/icon_preview");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            let response = r.selection;
            switch (["toggle" /* , "nameTagStyle" */, "generalNameTagsSettings", "previewNameTag", "back", "close"][response]) {
                case "toggle":
                    config.chatRanks.showRanksOnPlayerNameTags = !config.chatRanks.showRanksOnPlayerNameTags;
                    continue; /*
            case "nameTagStyle":
                if ((await chatRanksSettings_chatStyle(player)) === 1) {
                    continue;
                } else {
                    return 0;
                } */
                case "generalNameTagsSettings":
                    if ((await nameTagsSettings_generalNameTagsSettings(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "previewNameTag":
                    if ((await nameTagsSettings_previewNameTag(player)) === 1) {
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
//# sourceMappingURL=nameTagsSettings.js.map