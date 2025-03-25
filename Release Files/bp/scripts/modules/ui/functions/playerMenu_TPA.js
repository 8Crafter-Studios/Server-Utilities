import { ActionFormData } from "@minecraft/server-ui";
import { playerMenu_TPA_outgoing } from "./playerMenu_TPA_outgoing";
import { TeleportRequest } from "modules/coordinates/classes/TeleportRequest";
import { showMessage } from "modules/utilities/functions/showMessage";
import { playerMenu_TPA_incoming } from "./playerMenu_TPA_incoming";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
/**
 * Shows a player the UI for the TPA menu of the Player Menu.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function playerMenu_TPA(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (!config.tpaSystem.tpaSystemEnabled) {
                if ((await showMessage(player, "Error", `§cSorry but the TPA system is currently disabled.`, "Back", "Close")).selection === 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
            let form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "TPA");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Send Teleport Request", "textures/ui/chat_send");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Outgoing", "textures/ui/upload_glyph");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Incoming", "textures/ui/invite_base");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch (["send", "outgoing", "incoming", "back", "close"][r.selection]) {
                case "send": {
                    let form = new ActionFormData();
                    form.title(customFormUICodes.action.titles.formStyles.medium + "Select Player");
                    let playerslist = world.getAllPlayers().filter((p) => p !== player);
                    playerslist.forEach((p) => {
                        form.button(customFormUICodes.action.buttons.positions.main_only + p.name /*, "textures/ui/online"*/);
                    });
                    if (playerslist.length === 0) {
                        form.body("No players available to send a teleport request to.");
                    }
                    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
                    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
                    const r = await form.forceShow(player);
                    if (r.canceled || r.selection === playerslist.length)
                        continue;
                    if (r.selection === playerslist.length + 1)
                        return 0;
                    const target = playerslist[r.selection];
                    try {
                        TeleportRequest.send(player, target);
                    }
                    catch (e) {
                        if (e instanceof Error && e.message === "Duplicate Request") {
                            player.sendMessage(`§cYou have already sent a teleport request to ${target.name}.`);
                        }
                        else {
                            player.sendMessage(`§cAn error occurred while sending a teleport request to ${target.name}: ${e}${e.stack}`);
                        }
                    }
                    player.sendMessage(`§aSent a teleport request to ${target.name}.`);
                    continue;
                }
                case "outgoing":
                    if ((await playerMenu_TPA_outgoing(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "incoming":
                    if ((await playerMenu_TPA_incoming(player)) === 1) {
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
                    return 1;
            }
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
//# sourceMappingURL=playerMenu_TPA.js.map