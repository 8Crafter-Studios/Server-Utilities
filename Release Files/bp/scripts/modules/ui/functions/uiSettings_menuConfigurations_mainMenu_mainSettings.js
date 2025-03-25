import { ModalFormData } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { customFormUICodes } from "../constants/customFormUICodes";
/**
 * Displays and handles the main settings form for the main menu for a given entity.
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
export async function uiSettings_menuConfigurations_mainMenu_mainSettings(sourceEntity) {
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
        const menuConfig = config.ui.menus.playerMenu;
        const includedOptions = [
            "enabled",
            "showDeprecatedButtons",
            "showExperimentalButtons",
            "showNonFunctionalButtons",
            "showUnusedButtons",
            "showUpcomingButtons",
        ];
        const form = new ModalFormData();
        form.title(customFormUICodes.modal.titles.formStyles.medium + "Main Menu Settings");
        const formOptionsMap = {
            enabled: () => form.toggle("§l§fEnabled§r§f\nWhether or not the player menu is enabled. Defaults to true.", menuConfig.enabled),
            showDeprecatedButtons: () => form.toggle("§l§fShow Deprecated Buttons§r§f\nWhether or to show deprecated buttons. Defaults to true.", menuConfig.showDeprecatedButtons),
            showExperimentalButtons: () => form.toggle("§l§fShow Experimental Buttons§r§f\nWhether or to show experimental buttons. Defaults to true.", menuConfig.showExperimentalButtons),
            showNonFunctionalButtons: () => form.toggle("§l§fShow Non-Functional Buttons§r§f\nWhether or to show non-functional buttons. Defaults to true.", menuConfig.showNonFunctionalButtons),
            showUnusedButtons: () => form.toggle("§l§fShow Unused Buttons§r§f\nWhether or to show unused buttons. Defaults to true.", menuConfig.showUnusedButtons),
            showUpcomingButtons: () => form.toggle("§l§fShow Upcoming Buttons§r§f\nWhether or to show buttons that are placeholders for upcoming features. Defaults to true.", menuConfig.showUpcomingButtons),
        };
        includedOptions.forEach((o) => formOptionsMap[o]());
        form.submitButton("Save");
        const r = await form.forceShow(player);
        if (r.canceled) {
            return 1;
        }
        const options = Object.fromEntries(includedOptions.map((o, i) => [o, r.formValues[i]]));
        includedOptions.forEach((v) => {
            switch (v) {
                case "enabled":
                    menuConfig.enabled = options[v];
                    break;
                case "showDeprecatedButtons":
                    menuConfig.showDeprecatedButtons = options[v];
                    break;
                case "showExperimentalButtons":
                    menuConfig.showExperimentalButtons = options[v];
                    break;
                case "showNonFunctionalButtons":
                    menuConfig.showNonFunctionalButtons = options[v];
                    break;
                case "showUnusedButtons":
                    menuConfig.showUnusedButtons = options[v];
                    break;
                case "showUpcomingButtons":
                    menuConfig.showUpcomingButtons = options[v];
                    break;
                default:
                    throw new Error(`Save action for setting ${JSON.stringify(v)} was not defined.`);
            }
        });
        return 1;
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
//# sourceMappingURL=uiSettings_menuConfigurations_mainMenu_mainSettings.js.map