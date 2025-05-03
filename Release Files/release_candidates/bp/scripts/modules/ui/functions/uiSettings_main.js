import { ModalFormData } from "@minecraft/server-ui";
import "init/classes/config";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
/**
 * Displays and handles the UI settings form for a given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * @remarks
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export async function uiSettings_main(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(player, "andexdb.accessSettings") == false) {
                const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
                if (r.canceled || r.selection == 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
        let form = new ModalFormData();
        form.title(customFormUICodes.modal.titles.formStyles.medium + "UI Settings");
        form.textField("§l§fmaxPlayersPerManagePlayersPage§r§f\nThe maximum number of players to display at once on the manage players menu, the default is 9", "integer from 1-1000", String(config.ui.pages.maxPlayersPerManagePlayersPage));
        form.toggle("§l§fuseStarWarsReference404Page§r§f\nWhether or not to use the Star Wars reference version of the 404 page, the default is false", config.ui.other.useStarWarsReference404Page);
        form.submitButton("Save");
        const r = await form.forceShow(player);
        if (r.canceled) {
            return 1;
        } /*
    GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
            ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
        let [maxPlayersPerManagePlayersPage, useStarWarsReference404Page] = r.formValues;
        config.ui.pages.maxPlayersPerManagePlayersPage = maxPlayersPerManagePlayersPage.toNumber();
        config.ui.other.useStarWarsReference404Page = useStarWarsReference404Page;
        return 1;
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
//# sourceMappingURL=uiSettings_main.js.map