import { ActionFormData } from "@minecraft/server-ui";
import { showActions } from "modules/utilities/functions/showActions";
import { showMessage } from "modules/utilities/functions/showMessage";
import { TeleportRequest } from "modules/coordinates/classes/TeleportRequest";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
/**
 * Shows a UI to manage outgoing teleport requests.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function playerMenu_TPA_outgoing(sourceEntity) {
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
            form.title(customFormUICodes.action.titles.formStyles.medium + "Outgoing Teleport Requests");
            const requests = TeleportRequest.getRequestsFromPlayer(player);
            requests.forEach((h) => form.button(customFormUICodes.action.buttons.positions.main_only + h.target.name));
            if (requests.length === 0) {
                form.body("No outgoing teleport requests.");
            }
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch ((!!requests[r.selection] ? "request" : undefined) ?? ["back", "close", "refresh"][r.selection - requests.length]) {
                case "request":
                    const request = requests[r.selection];
                    switch (["cancel", "back", "close"][(await showActions(player, customFormUICodes.action.titles.formStyles.general + "Teleport Request Details", `To: ${request.target.name}`, [customFormUICodes.action.buttons.positions.main_only + "Cancel Request", "textures/ui/trash_default"], [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"], [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"])).selection]) {
                        case "cancel":
                            request.cancel();
                            continue;
                        case "back":
                            continue;
                        case "close":
                            return 0;
                    }
                case "refresh":
                    continue;
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
//# sourceMappingURL=playerMenu_TPA_outgoing.js.map