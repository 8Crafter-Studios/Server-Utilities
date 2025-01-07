import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { antispamSettings } from "./antispamSettings";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { manageBans } from "./manageBans";
import { mainMenu } from "./mainMenu";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
export async function moderationSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ActionFormData();
    let players = world.getPlayers();
    form.title("Moderation");
    form.body("Choose menu to open. ");
    form.button("§4Banned Items§f(§cComing Soon!§f)", "textures/ui/icon_blackfriday");
    form.button("Manage Bans", "textures/ui/friend_glyph_desaturated");
    form.button("Anti-Spam", "textures/ui/mute_on");
    form.button("§4Anti-Cheat§f(§cComing Soon!§f)", "textures/ui/friend_glyph_desaturated");
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout"); /*
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
                //manageBannedItems(sourceEntity)
                return 1;
                break;
            case 1:
                if ((await manageBans(sourceEntity)) == 1) {
                    return await moderationSettings(sourceEntity);
                }
                else {
                    return 0;
                }
                ;
                break;
            case 2:
                if ((await antispamSettings(sourceEntity)) == 1) {
                    return await moderationSettings(sourceEntity);
                }
                else {
                    return 0;
                }
                ;
                break;
            case 3:
                //anticheatSettings(sourceEntity)
                return 1;
                break;
            case 4:
                return 1;
                break;
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