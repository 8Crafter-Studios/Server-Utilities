import { ActionFormData } from "@minecraft/server-ui";
import { addonDebugUI } from "./addonDebugUI";
import { customFormUICodes } from "../constants/customFormUICodes";
import { showMessage } from "modules/utilities/functions/showMessage";
import { evalAutoScriptSettings } from "./evalAutoScriptSettings";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
/**
 * Displays and handles the advanced settings form for a given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export async function advancedSettings(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Advanced Settings");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Debug", "textures/ui/icon_setting");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Eval Auto Execute Settings", "textures/ui/automation_glyph_color");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            let response = r.selection;
            switch (["debug", "evalAutoExecuteSettings", "back", "close"][response]) {
                case "debug":
                    if ((await addonDebugUI(player)) === 1) {
                        return await advancedSettings(player);
                    }
                    else {
                        return 0;
                    }
                case "evalAutoExecuteSettings":
                    if ((await evalAutoScriptSettings(player)) === 1) {
                        return await advancedSettings(player);
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
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
//# sourceMappingURL=advancedSettings.js.map