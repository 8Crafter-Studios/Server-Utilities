import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { playerMenu_bounties_list } from "./playerMenu_bounties_list";
import { playerMenu_bounty_new } from "./playerMenu_bounty_new";
import { playerMenu_bounties_list_from } from "./playerMenu_bounties_list_from";
import { playerMenu_bounties_list_on } from "./playerMenu_bounties_list_on";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function playerMenu_bounties(sourceEntitya) {
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
    if (!config.bountySystem.enabled) {
        const r = await showMessage(sourceEntity, "Bounty System Disabled", "The bounty system is disabled. It must be enabled in Main Menu > Settings > Bounty System.", "Back", "Cancel");
        if (r.canceled || r.selection == 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.medium + "Bounties");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Place a Bounty", "textures/ui/pointer");
    form.button(customFormUICodes.action.buttons.positions.main_only + "View All Active Bounties", "textures/gui/newgui/Friends");
    form.button(customFormUICodes.action.buttons.positions.main_only + "View Bounties You Placed", "textures/gui/newgui/mob_effects/strength_effect");
    form.button(customFormUICodes.action.buttons.positions.main_only + "View Bounties Placed On You", "textures/gui/newgui/mob_effects/wither_effect");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (r) => {
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        switch (["new", "viewAll", "viewFrom", "viewOn", "back", "close"][r.selection]) {
            case "new":
                if ((await playerMenu_bounty_new(sourceEntity)) === 1) {
                    return await playerMenu_bounties(sourceEntity);
                }
                else {
                    return 0;
                }
            case "viewAll":
                if ((await playerMenu_bounties_list(sourceEntity)) === 1) {
                    return await playerMenu_bounties(sourceEntity);
                }
                else {
                    return 0;
                }
            case "viewFrom":
                if ((await playerMenu_bounties_list_from(sourceEntity)) === 1) {
                    return await playerMenu_bounties(sourceEntity);
                }
                else {
                    return 0;
                }
            case "viewOn":
                if ((await playerMenu_bounties_list_on(sourceEntity)) === 1) {
                    return await playerMenu_bounties(sourceEntity);
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
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
//# sourceMappingURL=playerMenu_bounties.js.map