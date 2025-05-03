import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { menuButtonIds } from "../constants/menuButtonIds";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function uiSettings_menuConfigurations_playerMenu_editButtons_addRemovedButtons(sourceEntity) {
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
            const menuConfig = config.ui.menus.playerMenu;
            const currentButtonsA = menuConfig.buttons;
            const buttons = Object.entries(menuButtonIds.playerMenu.buttons)
                .filter((b) => !currentButtonsA.includes(b[0]))
                .sort((a, b) => a[1].defaultButtonIndex - b[1].defaultButtonIndex);
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Add Removed Buttons");
            form.body(buttons.length === 0 ? "No removed buttons found." : "Select a button to view its details and add it back to the player menu.");
            buttons.forEach((b) => {
                form.button(customFormUICodes.action.buttons.positions.main_only + b[1].displayName, b[1].icon);
            });
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled || r.selection === buttons.length) {
                return 1;
            }
            if (r.selection === buttons.length + 1) {
                return 0;
            }
            const buttonID = buttons[r.selection][0];
            const button = buttons[r.selection][1];
            let buttonHiddenReasonMessage = "";
            if (button.deprecated && !menuConfig.showDeprecatedButtons) {
                buttonHiddenReasonMessage =
                    "\n§o§cThis button will not be displayed becuase it is deprecated and the showDeprecatedButtons option is disabled.§r";
            }
            else if (button.experimental && !menuConfig.showExperimentalButtons) {
                buttonHiddenReasonMessage =
                    "\n§o§cThis button will not be displayed becuase it is experimental and the showExperimentalButtons option is disabled.§r";
            }
            else if (!button.functional && !menuConfig.showNonFunctionalButtons) {
                buttonHiddenReasonMessage =
                    "\n§o§cThis button will not be displayed becuase it is non-functional and the showNonFunctionalButtons option is disabled.§r";
            }
            else if (button.unused && !menuConfig.showUnusedButtons) {
                buttonHiddenReasonMessage = "\n§o§cThis button will not be displayed becuase it is unused and the showUnusedButtons option is disabled.§r";
            }
            else if (button.upcoming && !menuConfig.showUpcomingButtons) {
                buttonHiddenReasonMessage =
                    "\n§o§cThis button will not be displayed becuase it is a placeholder for an upcoming feature and the showUpcomingButtons option is disabled.§r";
            }
            else if ("extraVisibilityConditionsCheck" in button && !button.extraVisibilityConditionsCheck()) {
                buttonHiddenReasonMessage =
                    "extraVisibilityConditionsCheckFailedReason" in button
                        ? `\n§o§cThis button will not be displayed becuase ${button.extraVisibilityConditionsCheckFailedReason()}§c.§r`
                        : "\n§o§cThis button will not be displayed becuase it has not met its defined extra visibility conditions.§r";
            }
            const rb = await new ActionFormData()
                .title(customFormUICodes.action.titles.formStyles.medium + "Edit Button")
                .body(`ID: ${buttonID}
Display Name: ${button.displayName}§r
Button Icon: ${button.icon}§r
Default Button Index: ${button.defaultButtonIndex}${button.deprecated ? "\n§pThis button is deprecated.§r" : ""}${button.experimental ? "\n§eThis button is experimental.§r" : ""}${button.functional ? "" : "\n§4This button is non-functional.§r"}${button.unused ? "\n§pThis button is unused.§r" : ""}${button.upcoming ? "\n§pThis button is a placeholder for an upcoming feature.§r" : ""}${buttonHiddenReasonMessage}`)
                .button(customFormUICodes.action.buttons.positions.main_only + "Add", "textures/ui/color_plus")
                .button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left")
                .button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout")
                .forceShow(player);
            if (rb.canceled || rb.selection === 1)
                continue;
            if (rb.selection === 2)
                return 0;
            if (rb.selection === 0) {
                const currentButtonsB = menuConfig.buttons;
                currentButtonsB.push(buttonID);
                menuConfig.buttons = currentButtonsB;
            }
            continue;
        }
        catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
//# sourceMappingURL=uiSettings_MConfigs_PM_EBttn_aRB.js.map