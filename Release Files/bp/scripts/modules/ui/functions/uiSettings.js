import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { uiSettings_main } from "./uiSettings_main";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { uiSettings_menuConfigurations } from "./uiSettings_menuConfigurations";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
export async function uiSettings(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
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
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "UI Settings");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Main", "textures/ui/debug_glyph_color");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Menu Configurations", "textures/ui/automation_glyph_color");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Advanced", "textures/ui/creator_glyph_color");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            let response = r.selection;
            switch (["main", "menuConfigurations", "advanced", "back", "close"][response]) {
                case "main":
                    if ((await uiSettings_main(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "menuConfigurations":
                    if ((await uiSettings_menuConfigurations(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "advanced":
                    /**
                     * @todo Add the code for the uiSettings_advanced function.
                     */
                    if ((await showMessage(player, undefined, "§cSorry, the advanced UI settings menu does not exist yet.", "Back", "Close")).selection !== 1) {
                        continue;
                    }
                    else {
                        return 0;
                    } /*
                if ((await uiSettings_advanced(sourceEntity)) === 1) {
                    return await uiSettings(sourceEntity);
                } else {
                    return 0;
                } */
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
//# sourceMappingURL=uiSettings.js.map