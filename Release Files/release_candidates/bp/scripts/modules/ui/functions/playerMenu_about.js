import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showActions } from "modules/utilities/functions/showActions";
import { playerMenu_about_contributors } from "./playerMenu_about_contributors";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function playerMenu_about(sourceEntitya) {
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
    form.title(customFormUICodes.action.titles.formStyles.wide + "About");
    form.body("8Crafter's Server Utilities & Debug Sticks v" + format_version);
    form.button(customFormUICodes.action.buttons.positions.main_only + "Links", "textures/ui/external_link_no_blur");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Contributors", "textures/ui/8Crafter");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        switch (["links", "contributors", "back", "close"][r.selection]) {
            case "links":
                if ((await showActions(sourceEntity, customFormUICodes.action.titles.formStyles.wide + "Links", "§dModBay§r Page/Download Page: §bhttps://modbay.org/mods/1240-8crafters-debug-sticks.html§r\n§aWiki for the Add-On: §bhttps://wiki.8crafter.com/andexdb/§r\n§cMy YouTube Channel: §bhttps://youtube.com/@8crafter§r\n§aMy Website: §bhttps://www.8crafter.com§r\n§dDiscord: §bhttps://discord.gg/rQZ2a4286E§r", [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"], [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"])).selection - 1) {
                    return await playerMenu_about(sourceEntity);
                }
                else {
                    return 0;
                }
            case "contributors":
                if ((await playerMenu_about_contributors(sourceEntity)) == 1) {
                    return await playerMenu_about(sourceEntity);
                }
                else {
                    return 0;
                }
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
//# sourceMappingURL=playerMenu_about.js.map