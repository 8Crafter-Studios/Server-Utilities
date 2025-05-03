import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
import { transferPlayer } from "@minecraft/server-admin";
import { securityVariables } from "security/ultraSecurityModeUtils";
/**
 * Shows the quick transfer menu of the moderation menu.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function moderationMenu_quickTransfer(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.transferPlayers") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to players to other servers. You need the following permission to transfer players to other servers: andexdb.transferPlayers.", "Back", "Cancel");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.medium + "Transfer Online Player");
            let playerslist = world.getAllPlayers();
            playerslist.forEach((p) => {
                form.button(customFormUICodes.action.buttons.positions.main_only + p.name /*, "textures/ui/online"*/);
            });
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch ((!!playerslist[r.selection] ? "player" : undefined) ?? ["back", "close", "refresh"][r.selection - playerslist.length]) {
                case "player": {
                    const target = playerslist[r.selection];
                    const form = new ModalFormData();
                    form.title(customFormUICodes.action.titles.formStyles.medium + "Transfer " + target.name);
                    form.textField("IP Address", "play.cubecraft.net");
                    form.textField("Port", "19132");
                    const rb = await form.forceShow(player);
                    if (rb.canceled)
                        continue;
                    if (rb.formValues[0] === "") {
                        throw new TypeError("IP Address cannot be empty.");
                    }
                    if (rb.formValues[1] === "") {
                        throw new TypeError("Port cannot be empty.");
                    }
                    if (!/^[0-9]+$/.test(rb.formValues[1])) {
                        throw new TypeError("Port must be an integer.");
                    }
                    if (rb.formValues[1].toNumber() < 0 || rb.formValues[1].toNumber() > 65535) {
                        throw new TypeError("Port must be between 0 and 65535 (inclusive).");
                    }
                    transferPlayer(target, rb.formValues[0], rb.formValues[1].toNumber());
                    return 1;
                }
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
//# sourceMappingURL=moderationMenu_quickTransfer.js.map