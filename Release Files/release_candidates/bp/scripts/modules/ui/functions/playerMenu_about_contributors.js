import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showActions } from "modules/utilities/functions/showActions";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function playerMenu_about_contributors(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
            (typeof sourceEntity == "object"
                ? sourceEntity === null
                    ? "object[null]"
                    : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]"
                : typeof sourceEntity) +
            ".");
    }
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Contributors");
    form.button(customFormUICodes.action.buttons.positions.main_only + "8Crafter", "textures/ui/8Crafter");
    form.button(customFormUICodes.action.buttons.positions.main_only + "StormStqr", "textures/ui/StormStqr_profile_picture");
    form.button(customFormUICodes.action.buttons.positions.main_only + "terpyFTP", "textures/ui/terpyFTP_profile_picture");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch (["8Crafter", "StormStqr", "terpyFTP", "back", "close"][r.selection]) {
            case "8Crafter":
                if ((await showActions(sourceEntity, "8Crafter", "§aRole: §dAdd-On creator.§r\n§cYouTube Channel: §bhttps://youtube.com/@8crafter§r\n§aWebsite: §bhttps://www.8crafter.com§r\n§dDiscord: §b.andexter§r/§b8crafter§r", ["Back", "textures/ui/arrow_left"], ["Close", "textures/ui/crossout"])).selection != 1) {
                    return await playerMenu_about_contributors(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "StormStqr":
                if ((await showActions(sourceEntity, "StormStqr", "§aRole: §bHelps with writing documentation.§r\n§dDiscord: §bstormstqr§r", ["Back", "textures/ui/arrow_left"], ["Close", "textures/ui/crossout"])).selection != 1) {
                    return await playerMenu_about_contributors(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "terpyFTP":
                if ((await showActions(sourceEntity, "terpyFTP", "§aRole: §bHelped with testing the player menu.§r\n§dDiscord: §bterpyftp§r", ["Back", "textures/ui/arrow_left"], ["Close", "textures/ui/crossout"])).selection != 1) {
                    return await playerMenu_about_contributors(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "back":
                return 1;
            case "close":
                return 0;
            default:
                return 1;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return 0;
    });
}
//# sourceMappingURL=playerMenu_about_contributors.js.map