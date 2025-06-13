import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { numberFormatter } from "modules/utilities/functions/numberFormatter";
import { Bounty } from "modules/main/classes/Bounty";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function playerMenu_bounty_on_individual(sourceEntitya, bounty, sourcePlayer) {
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
    const source = sourcePlayer ?? bounty.getLinkedSourceSavedPlayer();
    if (!source)
        throw new ReferenceError("[playerMenu_bounty] No source player found.");
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.medium + sourceEntity.name);
    form.body(`Target: ${sourceEntity.name}\nPlaced By: ${source.name}\nPlaced On: ${new Date(bounty.creationTime).formatDateTime(sourceEntity.timeZone, false, true)}\nReward: ${numberFormatter(bounty.value, { currencyPrefix: config.ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix, addCommaSeparators: true }, 0)}`);
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        switch (["back", "close"][r.selection]) {
            case "back":
                return 1;
            case "close":
                return 0;
            default:
                throw new Error("Invalid selection: " + r.selection);
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return 0;
    });
}
//# sourceMappingURL=playerMenu_bounty_on_individual.js.map