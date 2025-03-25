import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { antispamSettings } from "./antispamSettings";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { manageBans } from "./manageBans";
import { customFormUICodes } from "../constants/customFormUICodes";
import { showMessage } from "modules/utilities/functions/showMessage";
export async function moderationSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Moderation");
    form.button(customFormUICodes.action.buttons.positions.main_only + "§4Banned Items\n§f(§cComing Soon!§f)", "textures/ui/icon_blackfriday");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Manage Bans", "textures/ui/friend_glyph_desaturated");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Anti-Spam", "textures/ui/mute_on");
    form.button(customFormUICodes.action.buttons.positions.main_only + "§4Anti-Cheat\n§f(§cComing Soon!§f)", "textures/ui/friend_glyph_desaturated");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        let response = r.selection;
        switch (response) {
            case 0:
                return await showMessage(sourceEntity, undefined, "§cSorry, the banned items system does not exist yet.", "Back", "Close").then(async (r) => {
                    if (r.selection !== 1) {
                        return await moderationSettings(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                });
            //manageBannedItems(sourceEntity)
            case 1:
                if ((await manageBans(sourceEntity)) == 1) {
                    return await moderationSettings(sourceEntity);
                }
                else {
                    return 0;
                }
            case 2:
                if ((await antispamSettings(sourceEntity)) == 1) {
                    return await moderationSettings(sourceEntity);
                }
                else {
                    return 0;
                }
            case 3:
                return await showMessage(sourceEntity, undefined, "§cSorry, the anticheat system does not exist yet.", "Back", "Close").then(async (r) => {
                    if (r.selection !== 1) {
                        return await moderationSettings(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                });
            //anticheatSettings(sourceEntity)
            case 4:
                return 1;
            default:
                return 0;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=moderationSettings.js.map