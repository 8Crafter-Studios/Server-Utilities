import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { numberFormatter } from "modules/utilities/functions/numberFormatter";
import { Bounty } from "modules/main/classes/Bounty";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function playerMenu_bounty_from_individual(sourceEntitya, bounty, targetPlayer) {
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
    const target = targetPlayer ?? bounty.getLinkedTargetSavedPlayer();
    if (!target)
        throw new ReferenceError("[playerMenu_bounty_from_individual] No target player found.");
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.medium + sourceEntity.name);
    form.body(`Target: ${target.name}\n${target.isOnline
        ? "Online"
        : target.isBanned
            ? "Banned"
            : config.bountySystem.showLastOnlineTimeInBountyDetailsList
                ? "Last Online: " + new Date(target.lastOnline).formatDateTime(sourceEntity.timeZone, false, true)
                : "Offline"}\nPlaced By: ${sourceEntity.name}\nPlaced On: ${new Date(bounty.creationTime).formatDateTime(sourceEntity.timeZone, false, true)}\nReward: ${numberFormatter(bounty.value, { currencyPrefix: config.ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix, addCommaSeparators: true }, 0)}`);
    form.button(customFormUICodes.action.buttons.positions.main_only + "Cancel Bounty", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch (["cancel", "back", "close"][r.selection]) {
            case "cancel":
                try {
                    const s = bounty.cancel();
                    if (s === true) {
                        // If the cancelation of the bounty was successfull.
                        const r = await showMessage(sourceEntity, "Bounty Canceled Successfully", `The bounty on ${target.name} has been canceled successfully, and your ${numberFormatter(bounty.value, {
                            addCommaSeparators: true,
                            currencyPrefix: config.ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix,
                        })} have been refunded.`, "Back", "Cancel");
                        if (r.canceled || r.selection == 0) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    }
                    else {
                        // Error messages. This will be run if the bounty was already set to invalid when the cancel method was run.
                        if (bounty.status === "claimed") {
                            // If the bounty was claimed.
                            const r = await showMessage(sourceEntity, "Bounty Already Claimed", `Your bounty on ${target.name} could not be canceled, as it has already been claimed.`, "Back", "Cancel");
                            if (r.canceled || r.selection == 0) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        }
                        else if (bounty.status === "canceled") {
                            // If the bounty was already canceled.
                            const r = await showMessage(sourceEntity, "Already Canceled", `The bounty on ${target.name} could not be canceled, as it has already been canceled.`, "Back", "Cancel");
                            if (r.canceled || r.selection == 0) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        }
                        else if (bounty.status === "deleted") {
                            // If the bounty was deleted.
                            const r = await showMessage(sourceEntity, "Bounty Deleted", `The bounty on ${target.name} could not be canceled, as it has been deleted, any money that was placed on it is gone now.`, "Back", "Cancel");
                            if (r.canceled || r.selection == 0) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        }
                        else if (bounty.status === "none") {
                            // If the bounty was just set to invalid.
                            const r = await showMessage(sourceEntity, "Something Went Wrong", `Something went wrong while canceling the bounty on ${target.name}, whatever caused this is unknown, a likely cause is that an admin used script eval to set the "valid" property to false.`, "Back", "Cancel");
                            if (r.canceled || r.selection == 0) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        }
                        else {
                            // If the bounty's status is invalid.
                            const r = await showMessage(sourceEntity, "§l§cSomething Went VERY Wrong", `Something went §lEXTREMELY§r wrong while canceling the bounty on ${target.name}, whatever caused this is unknown, the status of the bounty was set to an invalid value: ${JSON.stringify(bounty.status)}.
§eThis should not have happened. Please check if any admins were messing around with the bounties with script eval, and if they haven't then please contact 8Crafter to notify them of this issue, please include what the status value was set to in your message to him.
§bYou can contact 8Crafter through discord or email.
§dDiscord: §b.andexter
§aEmail: §b8crafteryt@gmail.com`, "Back", "Cancel");
                            if (r.canceled || r.selection == 0) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        }
                    }
                }
                catch (e) {
                    // If an error occurred.
                    const r = await showMessage(sourceEntity, "An Error occurred", `An error occurred while canceling the bounty on ${target.name}. The following error was triggered: §c${e}${e?.stack}`, "Back", "Cancel");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
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
//# sourceMappingURL=playerMenu_bounty_from_individual.js.map