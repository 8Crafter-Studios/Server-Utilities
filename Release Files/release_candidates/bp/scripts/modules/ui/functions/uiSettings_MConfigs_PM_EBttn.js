import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { menuButtonIds } from "../constants/menuButtonIds";
import { showActions } from "modules/utilities/functions/showActions";
import { uiSettings_menuConfigurations_playerMenu_editButtons_addRemovedButtons } from "./uiSettings_MConfigs_PM_EBttn_aRB";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
export async function uiSettings_menuConfigurations_playerMenu_editButtons(sourceEntity) {
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
            let form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Edit Buttons");
            menuConfig.buttons.forEach((b) => {
                const button = menuButtonIds.playerMenu.buttons[b];
                let appendedDisplayNameText = "";
                if (button.deprecated && !menuConfig.showDeprecatedButtons) {
                    appendedDisplayNameText = "\n§o§pHidden§r";
                }
                else if (button.experimental && !menuConfig.showExperimentalButtons) {
                    appendedDisplayNameText = "\n§o§eHidden§r";
                }
                else if (!button.functional && !menuConfig.showNonFunctionalButtons) {
                    appendedDisplayNameText = "\n§o§cHidden§r";
                }
                else if (button.unused && !menuConfig.showUnusedButtons) {
                    appendedDisplayNameText = "\n§o§8Hidden§r";
                }
                else if (button.upcoming && !menuConfig.showUpcomingButtons) {
                    appendedDisplayNameText = "\n§o§dHidden§r";
                }
                else if ("extraVisibilityConditionsCheck" in button && !button.extraVisibilityConditionsCheck()) {
                    appendedDisplayNameText = "\n§o§6Hidden§r";
                }
                form.button(customFormUICodes.action.buttons.positions.main_only + button.displayName + appendedDisplayNameText, button.icon);
            });
            form.button(customFormUICodes.action.buttons.positions.main_only + "Add Removed Buttons", "textures/ui/color_plus");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Reset To Defaults", "textures/ui/reset_white");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch (r.selection < menuConfig.buttons.length
                ? "button"
                : ["addRemovedButtons", "reset", "back", "close"][r.selection - menuConfig.buttons.length]) {
                case "button": {
                    const buttonID = menuConfig.buttons[r.selection];
                    const button = menuButtonIds.playerMenu.buttons[buttonID];
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
                        buttonHiddenReasonMessage =
                            "\n§o§cThis button will not be displayed becuase it is unused and the showUnusedButtons option is disabled.§r";
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
                        .button(customFormUICodes.action.buttons.positions.main_only + "Move", "textures/ui/move")
                        .button(customFormUICodes.action.buttons.positions.main_only + "Remove", "textures/ui/trash_default")
                        .button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left")
                        .button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout")
                        .forceShow(player);
                    if (rb.canceled || rb.selection === 2)
                        continue;
                    if (rb.selection === 3)
                        return 0;
                    if (rb.selection === 0) {
                        const r = await showActions(player, customFormUICodes.action.titles.formStyles.medium + "Move Button", "Would you like to move this button above or below another button?", [customFormUICodes.action.buttons.positions.main_only + "Move Above", "textures/ui/chevron_white_up"], [customFormUICodes.action.buttons.positions.main_only + "Move Below", "textures/ui/chevron_white_down"], [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"], [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"]);
                        if (r.canceled || r.selection === 2) {
                            continue;
                        }
                        if (r.selection === 3) {
                            return 0;
                        }
                        const buttons = menuConfig.buttons;
                        let form = new ActionFormData();
                        form.title(customFormUICodes.action.titles.formStyles.medium + "Move Button");
                        form.body(`Select the button you would like to move this button ${r.selection === 0 ? "above" : "below"}.`);
                        menuConfig.buttons.forEach((b) => {
                            const button = menuButtonIds.playerMenu.buttons[b];
                            form.button(customFormUICodes.action.buttons.positions.main_only + button.displayName, button.icon);
                        });
                        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
                        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
                        const rb = await form.forceShow(player);
                        if (rb.canceled || rb.selection === buttons.length) {
                            continue;
                        }
                        if (rb.selection === buttons.length + 1) {
                            return 0;
                        }
                        const destinationIndex = rb.selection + r.selection;
                        const currentButtons = menuConfig.buttons;
                        currentButtons.splice(currentButtons.findIndex((w) => w === buttonID), 1);
                        currentButtons.splice(destinationIndex, 0, buttonID);
                        menuConfig.buttons = currentButtons;
                        continue;
                    }
                    else {
                        menuConfig.buttons = menuConfig.buttons.filter((b) => b !== buttonID);
                        continue;
                    }
                }
                case "addRemovedButtons": {
                    if ((await uiSettings_menuConfigurations_playerMenu_editButtons_addRemovedButtons(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                }
                case "reset": {
                    if ((await showMessage(player, "Are You Sure?", "Are you sure you want to reset the button arrangement back to the default!?\nThis action cannot be undone!", "Cancel", "Confirm")).selection == 1) {
                        menuConfig.buttons = undefined;
                        if ((await showMessage(player, "Reset Successful", `You have successfully reset the button arrangement for the player menu to the factory settings.`, "Okay", "Close")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    else {
                        if ((await showMessage(player, "Reset Canceled", `The reset of the button arrangement for the player menu to the factory settings has been canceled.`, "Okay", "Close")).selection !== 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
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
//# sourceMappingURL=uiSettings_MConfigs_PM_EBttn.js.map