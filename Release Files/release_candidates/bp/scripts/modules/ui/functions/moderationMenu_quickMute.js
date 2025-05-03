import { ActionFormData } from "@minecraft/server-ui";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
import { addMuteOnPlayer } from "./manageMutes";
/**
 * Shows the quick mute menu of the moderation menu.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function moderationMenu_quickMute(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.medium + "Mute Online Player");
            let playerslist = world.getAllPlayers().filter((p) => p !== player);
            playerslist.forEach((p) => {
                form.button(customFormUICodes.action.buttons.positions.main_only + p.name /*, "textures/ui/online"*/);
            });
            if (playerslist.length === 0) {
                form.body("No players available to mute.");
            }
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch ((!!playerslist[r.selection] ? "player" : undefined) ?? ["back", "close", "refresh"][r.selection - playerslist.length]) {
                case "player":
                    return await addMuteOnPlayer(player, playerslist[r.selection].name);
                case "back":
                    return 1;
                case "close":
                    return 0;
                case "refresh":
                    continue;
            }
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
//# sourceMappingURL=moderationMenu_quickMute.js.map