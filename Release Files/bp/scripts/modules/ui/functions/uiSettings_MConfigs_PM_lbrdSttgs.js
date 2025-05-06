import { Entity, ObjectiveSortOrder, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { defaultPlayerMenuLeaderboardStatistics } from "../constants/defaultPlayerMenuLeaderboardStatistics";
import { showActions } from "modules/utilities/functions/showActions";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings(sourceEntity) {
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
            let form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Loaderboards Settings");
            // form.button(customFormUICodes.action.buttons.positions.main_only + "Main Settings\nTO-DO", "textures/ui/settings_glyph_color_2x");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Manage Statistics", "textures/ui/trophy");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Displayed Leaderboards", "textures/ui/icon_best3");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Displayed Statistics", "textures/ui/text_color_paintbrush");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            let response = r.selection;
            switch ([/* "mainSettings",  */ "manageStatistics", "displayedLeaderboards", "displayedStatistics", "back", "close"][response] /*
            case "mainSettings":
                if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_mainSettings(sourceEntity)) === 1) {
                    return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings(sourceEntity);
                } else {
                    return 0;
                } */) {
                case "manageStatistics":
                    if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "displayedLeaderboards":
                    if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "displayedStatistics":
                    if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics(player)) === 1) {
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
/**
 * @todo Switch this to use the new UI style: {@link uiSettings_menuConfigurations_playerMenu_leaderboardsSettings}.
 */
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    const menuConfig = config.ui.menus.playerMenu_leaderboards;
    const statistics = [...defaultPlayerMenuLeaderboardStatistics, ...menuConfig.customStats];
    const leaderboards = menuConfig.leaderboards;
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.medium + " Edit Displayed Leaderboards");
    form.body("This menu allows you to customize what leaderboards are displayed in the leaderboards section of the player menu.");
    leaderboards.forEach((l) => {
        const button = statistics.find((s) => s.id === l);
        form.button(customFormUICodes.action.buttons.positions.main_only +
            (button !== undefined
                ? typeof button?.buttonDisplayName === "string"
                    ? button?.buttonDisplayName
                    : "INVALID NAME TYPE: " + typeof button?.buttonDisplayName
                : "MISSING: " + l), button === undefined ? "bug_pack_icon" : undefined);
    });
    form.button(customFormUICodes.action.buttons.positions.main_only + "Add Leaderboard", "textures/ui/color_plus");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Reset To Defaults", "textures/ui/reset_red");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch (r.selection < leaderboards.length
            ? "button"
            : ["addLeaderboard", "back", "close", "reset"][r.selection - leaderboards.length]) {
            case "button": {
                const leaderboardID = leaderboards[r.selection];
                leaderboardID;
                const leaderboard = statistics.find((s) => s.id === leaderboardID);
                const rb = await new ActionFormData()
                    .title(customFormUICodes.action.titles.formStyles.medium + "Edit Button")
                    .body(`ID: ${leaderboardID}
Menu Title: ${leaderboard.menuTitle}§r
Display Name: ${leaderboard.buttonDisplayName}§r
Stats List Display Name: ${leaderboard.statsListDisplayName}§r
Type: ${leaderboard.type}§r
Default Button Index: ${leaderboard.type === "built-in" ? defaultPlayerMenuLeaderboardStatistics.indexOf(leaderboard) : "None"}`)
                    .button(customFormUICodes.action.buttons.positions.main_only + "Move", "textures/ui/move")
                    .button(customFormUICodes.action.buttons.positions.main_only + "Remove", "textures/ui/trash_default")
                    .button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left")
                    .button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout")
                    .forceShow(sourceEntity);
                if (rb.canceled || rb.selection === 2)
                    return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards(sourceEntity);
                if (rb.selection === 3)
                    return 0;
                if (rb.selection === 0) {
                    const r = await showActions(sourceEntity, customFormUICodes.action.titles.formStyles.medium + "Move Button", "Would you like to move this button above or below another button?", [customFormUICodes.action.buttons.positions.main_only + "Move Above", "textures/ui/chevron_white_up"], [customFormUICodes.action.buttons.positions.main_only + "Move Below", "textures/ui/chevron_white_down"], [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"], [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"]);
                    if (r.canceled || r.selection === 2) {
                        return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards(sourceEntity);
                    }
                    if (r.selection === 3) {
                        return 0;
                    }
                    const leaderboards = menuConfig.leaderboards;
                    let form = new ActionFormData();
                    form.title(customFormUICodes.action.titles.formStyles.medium + "Move Button");
                    form.body(`Select the button you would like to move this button ${r.selection === 0 ? "above" : "below"}.`);
                    leaderboards.forEach((l) => {
                        const button = statistics.find((s) => s.id === l);
                        form.button(customFormUICodes.action.buttons.positions.main_only +
                            (button !== undefined
                                ? typeof button?.buttonDisplayName === "string"
                                    ? button?.buttonDisplayName
                                    : "INVALID NAME TYPE: " + typeof button?.buttonDisplayName
                                : "MISSING: " + l), button === undefined ? "bug_pack_icon" : undefined);
                    });
                    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
                    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
                    const rb = await form.forceShow(sourceEntity);
                    if (rb.canceled || rb.selection === leaderboards.length) {
                        return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards(sourceEntity);
                    }
                    if (rb.selection === leaderboards.length + 1) {
                        return 0;
                    }
                    const destinationIndex = rb.selection + r.selection;
                    const currentButtons = menuConfig.leaderboards;
                    currentButtons.splice(currentButtons.findIndex((w) => w === leaderboardID), 1);
                    currentButtons.splice(destinationIndex, 0, leaderboardID);
                    menuConfig.leaderboards = currentButtons;
                    return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards(sourceEntity);
                }
                else {
                    menuConfig.leaderboards = menuConfig.leaderboards.filter((b) => b !== leaderboardID);
                    return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards(sourceEntity);
                }
            }
            case "addLeaderboard": {
                if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards_addLeaderboard(sourceEntity)) == 1) {
                    return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards(sourceEntity);
                }
                else {
                    return 0;
                }
            }
            case "reset": {
                if ((await showMessage(sourceEntity, "Are You Sure?", "Are you sure you want to reset the button arrangement back to the default!?\nThis action cannot be undone!", "Cancel", "Confirm")).selection == 1) {
                    menuConfig.leaderboards = undefined;
                    if ((await showMessage(sourceEntity, "Reset Successful", `You have successfully reset the button arrangement for the player menu to the factory settings.`, "Okay", "Close")).selection !== 1) {
                        return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    if ((await showMessage(sourceEntity, "Reset Canceled", `The reset of the button arrangement for the player menu to the factory settings has been canceled.`, "Okay", "Close")).selection !== 1) {
                        return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards(sourceEntity);
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
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
/**
 * @todo Switch this to use the new UI style: {@link uiSettings_menuConfigurations_playerMenu_leaderboardsSettings}.
 */
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards_addLeaderboard(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    try {
        const menuConfig = config.ui.menus.playerMenu_leaderboards;
        const currentButtonsA = menuConfig.leaderboards;
        const buttons = [...defaultPlayerMenuLeaderboardStatistics, ...menuConfig.customStats].filter((b) => !currentButtonsA.includes(b.id));
        const form = new ActionFormData();
        form.title(customFormUICodes.action.titles.formStyles.medium + "Add Leaderboard");
        form.body(buttons.length === 0
            ? 'No other statistics found. To add a new leaderboard statistic, go to "Main Menu > Settings > UI Settings > Menu Configurations > Player Menu > Leaderboards Settings > Manage Statistics"'
            : "Select a leaderboard statistic to view its details and add it to the leaderboards section of the player menu.");
        buttons.forEach((l) => {
            form.button(customFormUICodes.action.buttons.positions.main_only +
                (l !== undefined
                    ? typeof l?.buttonDisplayName === "string"
                        ? l?.buttonDisplayName
                        : "INVALID NAME TYPE: " + typeof l?.buttonDisplayName
                    : "MISSING: " + l), l === undefined ? "bug_pack_icon" : undefined);
        });
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        const r = await form.forceShow(sourceEntity);
        if (r.canceled || r.selection === buttons.length) {
            return 1;
        }
        if (r.selection === buttons.length + 1) {
            return 0;
        }
        const buttonID = buttons[r.selection].id;
        const button = buttons[r.selection];
        const rb = await new ActionFormData()
            .title(customFormUICodes.action.titles.formStyles.medium + "Edit Button")
            .body(`ID: ${buttonID}
Menu Title: ${button.menuTitle}§r
Display Name: ${button.buttonDisplayName}§r
Stats List Display Name: ${button.statsListDisplayName}§r
Type: ${button.type}§r
Default Button Index: ${button.type === "built-in" ? defaultPlayerMenuLeaderboardStatistics.indexOf(button) : "None"}`)
            .button(customFormUICodes.action.buttons.positions.main_only + "Add", "textures/ui/color_plus")
            .button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left")
            .button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout")
            .forceShow(sourceEntity);
        if (rb.canceled || rb.selection === 1)
            return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards_addLeaderboard(sourceEntity);
        if (rb.selection === 2)
            return 0;
        if (rb.selection === 0) {
            const currentButtonsB = menuConfig.leaderboards;
            currentButtonsB.push(buttonID);
            menuConfig.leaderboards = currentButtonsB;
        }
        return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedLeaderboards_addLeaderboard(sourceEntity);
    }
    catch (e) {
        console.error(e, e.stack);
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
/**
 * @todo Switch this to use the new UI style: {@link uiSettings_menuConfigurations_playerMenu_leaderboardsSettings}.
 */
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    const menuConfig = config.ui.menus.playerMenu_leaderboards;
    const statistics = [...defaultPlayerMenuLeaderboardStatistics, ...menuConfig.customStats];
    const trackedStats = menuConfig.trackedStats;
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.medium + "Edit Displayed Statistics");
    form.body("This menu allows you to customize what statistics are displayed for a player when a player clicks on that player's name in the leaderboards section of the player menu.");
    trackedStats.forEach((l) => {
        const button = statistics.find((s) => s.id === l);
        form.button(customFormUICodes.action.buttons.positions.main_only +
            (button !== undefined
                ? typeof button?.buttonDisplayName === "string"
                    ? button?.buttonDisplayName
                    : "INVALID NAME TYPE: " + typeof button?.buttonDisplayName
                : "MISSING: " + l), button === undefined ? "bug_pack_icon" : undefined);
    });
    form.button(customFormUICodes.action.buttons.positions.main_only + "Add Leaderboard", "textures/ui/color_plus");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Reset To Defaults", "textures/ui/reset_red");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch (r.selection < trackedStats.length
            ? "button"
            : ["addLeaderboard", "back", "close", "reset"][r.selection - trackedStats.length]) {
            case "button": {
                const leaderboardID = trackedStats[r.selection];
                leaderboardID;
                const leaderboard = statistics.find((s) => s.id === leaderboardID);
                const rb = await new ActionFormData()
                    .title(customFormUICodes.action.titles.formStyles.medium + "Edit Button")
                    .body(`ID: ${leaderboardID}
Menu Title: ${leaderboard.menuTitle}§r
Display Name: ${leaderboard.buttonDisplayName}§r
Stats List Display Name: ${leaderboard.statsListDisplayName}§r
Type: ${leaderboard.type}§r
Default Button Index: ${leaderboard.type === "built-in" ? defaultPlayerMenuLeaderboardStatistics.indexOf(leaderboard) : "None"}`)
                    .button(customFormUICodes.action.buttons.positions.main_only + "Move", "textures/ui/move")
                    .button(customFormUICodes.action.buttons.positions.main_only + "Remove", "textures/ui/trash_default")
                    .button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left")
                    .button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout")
                    .forceShow(sourceEntity);
                if (rb.canceled || rb.selection === 2)
                    return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics(sourceEntity);
                if (rb.selection === 3)
                    return 0;
                if (rb.selection === 0) {
                    const r = await showActions(sourceEntity, customFormUICodes.action.titles.formStyles.medium + "Move Button", "Would you like to move this button above or below another button?", [customFormUICodes.action.buttons.positions.main_only + "Move Above", "textures/ui/chevron_white_up"], [customFormUICodes.action.buttons.positions.main_only + "Move Below", "textures/ui/chevron_white_down"], [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"], [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"]);
                    if (r.canceled || r.selection === 2) {
                        return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics(sourceEntity);
                    }
                    if (r.selection === 3) {
                        return 0;
                    }
                    const trackedStats = menuConfig.trackedStats;
                    let form = new ActionFormData();
                    form.title(customFormUICodes.action.titles.formStyles.medium + "Move Button");
                    form.body(`Select the button you would like to move this button ${r.selection === 0 ? "above" : "below"}.`);
                    trackedStats.forEach((l) => {
                        const button = statistics.find((s) => s.id === l);
                        form.button(customFormUICodes.action.buttons.positions.main_only +
                            (button !== undefined
                                ? typeof button?.buttonDisplayName === "string"
                                    ? button?.buttonDisplayName
                                    : "INVALID NAME TYPE: " + typeof button?.buttonDisplayName
                                : "MISSING: " + l), button === undefined ? "bug_pack_icon" : undefined);
                    });
                    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
                    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
                    const rb = await form.forceShow(sourceEntity);
                    if (rb.canceled || rb.selection === trackedStats.length) {
                        return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics(sourceEntity);
                    }
                    if (rb.selection === trackedStats.length + 1) {
                        return 0;
                    }
                    const destinationIndex = rb.selection + r.selection;
                    const currentButtons = menuConfig.trackedStats;
                    currentButtons.splice(currentButtons.findIndex((w) => w === leaderboardID), 1);
                    currentButtons.splice(destinationIndex, 0, leaderboardID);
                    menuConfig.trackedStats = currentButtons;
                    return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics(sourceEntity);
                }
                else {
                    menuConfig.trackedStats = menuConfig.trackedStats.filter((b) => b !== leaderboardID);
                    return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics(sourceEntity);
                }
            }
            case "addLeaderboard": {
                if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics_addStatistic(sourceEntity)) == 1) {
                    return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics(sourceEntity);
                }
                else {
                    return 0;
                }
            }
            case "reset": {
                if ((await showMessage(sourceEntity, "Are You Sure?", "Are you sure you want to reset the button arrangement back to the default!?\nThis action cannot be undone!", "Cancel", "Confirm")).selection == 1) {
                    menuConfig.trackedStats = undefined;
                    if ((await showMessage(sourceEntity, "Reset Successful", `You have successfully reset the button arrangement for the player menu to the factory settings.`, "Okay", "Close")).selection !== 1) {
                        return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    if ((await showMessage(sourceEntity, "Reset Canceled", `The reset of the button arrangement for the player menu to the factory settings has been canceled.`, "Okay", "Close")).selection !== 1) {
                        return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics(sourceEntity);
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
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics_addStatistic(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    try {
        const menuConfig = config.ui.menus.playerMenu_leaderboards;
        const currentButtonsA = menuConfig.trackedStats;
        const buttons = [...defaultPlayerMenuLeaderboardStatistics, ...menuConfig.customStats].filter((b) => !currentButtonsA.includes(b.id));
        const form = new ActionFormData();
        form.title(customFormUICodes.action.titles.formStyles.medium + "Add Leaderboard");
        form.body(buttons.length === 0
            ? 'No other statistics found. To add a new leaderboard statistic, go to "Main Menu > Settings > UI Settings > Menu Configurations > Player Menu > Leaderboards Settings > Manage Statistics"'
            : "Select a leaderboard statistic to view its details and add it to the list of statistics shows when a player clicks on that player's name in the leaderboards section of the player menu.");
        buttons.forEach((l) => {
            form.button(customFormUICodes.action.buttons.positions.main_only +
                (l !== undefined
                    ? typeof l?.buttonDisplayName === "string"
                        ? l?.buttonDisplayName
                        : "INVALID NAME TYPE: " + typeof l?.buttonDisplayName
                    : "MISSING: " + l), l === undefined ? "bug_pack_icon" : undefined);
        });
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        const r = await form.forceShow(sourceEntity);
        if (r.canceled || r.selection === buttons.length) {
            return 1;
        }
        if (r.selection === buttons.length + 1) {
            return 0;
        }
        const buttonID = buttons[r.selection].id;
        const button = buttons[r.selection];
        const rb = await new ActionFormData()
            .title(customFormUICodes.action.titles.formStyles.medium + "Edit Button")
            .body(`ID: ${buttonID}
Menu Title: ${button.menuTitle}§r
Display Name: ${button.buttonDisplayName}§r
Stats List Display Name: ${button.statsListDisplayName}§r
Type: ${button.type}§r
Default Button Index: ${button.type === "built-in" ? defaultPlayerMenuLeaderboardStatistics.indexOf(button) : "None"}`)
            .button(customFormUICodes.action.buttons.positions.main_only + "Add", "textures/ui/color_plus")
            .button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left")
            .button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout")
            .forceShow(sourceEntity);
        if (rb.canceled || rb.selection === 1)
            return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics_addStatistic(sourceEntity);
        if (rb.selection === 2)
            return 0;
        if (rb.selection === 0) {
            const currentButtonsB = menuConfig.trackedStats;
            currentButtonsB.push(buttonID);
            menuConfig.trackedStats = currentButtonsB;
        }
        return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_displayedStatistics_addStatistic(sourceEntity);
    }
    catch (e) {
        console.error(e, e.stack);
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Manage Statistics");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Built-In Statistics", "textures/ui/debug_glyph_color");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Custom Statistics", "textures/gui/newgui/Bundle/PaintBrush");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        let response = r.selection;
        switch (["builtInStatistics", "customStatistics", "back", "close"][response]) {
            case "builtInStatistics":
                if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_builtIn(sourceEntity)) == 1) {
                    return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics(sourceEntity);
                }
                else {
                    return 0;
                }
            case "customStatistics":
                if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom(sourceEntity)) == 1) {
                    return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics(sourceEntity);
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
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_builtIn(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    const menuConfig = config.ui.menus.playerMenu_leaderboards;
    const statistics = defaultPlayerMenuLeaderboardStatistics;
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.medium + "Manage Built-In Statistics");
    form.body("This menu allows you to customize the built-in leaderboard statistics.");
    statistics.forEach((s) => {
        form.button(customFormUICodes.action.buttons.positions.main_only + s.buttonDisplayName);
    });
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Reset To Defaults", "textures/ui/reset_red");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch (r.selection < statistics.length ? "button" : ["back", "close", "reset"][r.selection - statistics.length]) {
            case "button": {
                if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_builtIn_statistic(sourceEntity, statistics[r.selection])) == 1) {
                    return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_builtIn(sourceEntity);
                }
                else {
                    return 0;
                }
            }
            case "reset": {
                if ((await showMessage(sourceEntity, "Are You Sure?", "Are you sure you want to reset the settings for the built-in leaderboard statistics to the factory settings!?\nThis action cannot be undone!", "Cancel", "Confirm")).selection == 1) {
                    config.reset(menuConfig.builtInStats);
                    if ((await showMessage(sourceEntity, "Reset Successful", `You have successfully reset the settings for the built-in leaderboard statistics to the factory settings.`, "Okay", "Close")).selection !== 1) {
                        return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_builtIn(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    if ((await showMessage(sourceEntity, "Reset Canceled", `The reset of the settings for the built-in leaderboard statistics to the factory settings has been canceled.`, "Okay", "Close")).selection !== 1) {
                        return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_builtIn(sourceEntity);
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
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_builtIn_statistic(sourceEntitya, statistic) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    try {
        const rb = await new ActionFormData()
            .title(customFormUICodes.action.titles.formStyles.medium + "Edit Built-In Statistic")
            .body(`ID: ${statistic.id}
Menu Title: ${statistic.menuTitle}§r
Display Name: ${statistic.buttonDisplayName}§r
Stats List Display Name: ${statistic.statsListDisplayName}§r
Type: ${statistic.type}§r
Default Button Index: ${statistic.type === "built-in" ? defaultPlayerMenuLeaderboardStatistics.indexOf(statistic) : "None"}`)
            .button(customFormUICodes.action.buttons.positions.main_only + "Settings", "textures/ui/icon_setting")
            .button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left")
            .button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout")
            .forceShow(sourceEntity);
        if (rb.canceled || rb.selection === 1)
            return 1;
        if (rb.selection === 2)
            return 0;
        if (rb.selection === 0) {
            if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_builtIn_editStatistic(sourceEntity, statistic)) == 1) {
                return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_builtIn_statistic(sourceEntity, statistic);
            }
            else {
                return 0;
            }
        }
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
/**
 * Displays and handles the edit built-in statistic form for a given entity.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the form was canceled.
 * - `0` if the user selected "Cancel" in the access denied message or "Close" if an error message appeared.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_builtIn_editStatistic(sourceEntitya, statistic) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    const menuConfig = config.ui.menus.playerMenu_leaderboards.builtInStats[statistic.id];
    const includedOptions = ["enabled", "addCommaSeparators", "currencyPrefix"];
    const form = new ModalFormData();
    form.title(customFormUICodes.modal.titles.formStyles.medium + "Edit Built-In Statistic");
    const formOptionsMap = {
        enabled: () => form.toggle("§l§fEnabled§r§f\nWhether or not this built-in statistic is enabled. Defaults to true.", { defaultValue: menuConfig.enabled }),
        addCommaSeparators: () => form.toggle("§l§fAdd Comma Separators§r§f\nWhether or not to add comma separators in the displayed value. ex. 1327401 would become 1,327,401. Defaults to true.", { defaultValue: menuConfig.displayOptions.addCommaSeparators }),
        currencyPrefix: () => form.textField(`§l§fCurrency Prefix§r§f\nA currency symbol to prefix the displayed value with. For example, if this is set to "$", then 1327401 would become $1327401 and -1234781 would become -$1234781. (Can be combined with "Add Comma Separators" to make it display like -$1,234,781.). Leave it blank to have no currency symbol. Defaults to ${JSON.stringify(statistic.displayOptions.currencyPrefix)}.`, "Currency Symbol", { defaultValue: menuConfig.displayOptions.currencyPrefix }),
    };
    includedOptions.forEach((o) => formOptionsMap[o]());
    form.submitButton("Save");
    return await forceShow(form, sourceEntity)
        .then((r) => {
        if (r.canceled) {
            return 1;
        }
        const options = Object.fromEntries(includedOptions.map((o, i) => [o, r.formValues[i]]));
        includedOptions.forEach((v) => {
            switch (v) {
                case "enabled":
                    menuConfig.enabled = options[v];
                    break;
                case "addCommaSeparators":
                    menuConfig.displayOptions.addCommaSeparators = options[v];
                    break;
                case "currencyPrefix":
                    menuConfig.displayOptions.currencyPrefix = options[v];
                    break;
                default:
                    throw new Error(`Save action for setting ${JSON.stringify(v)} was not defined.`);
            }
        });
        return 1;
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
            (typeof sourceEntity == "object"
                ? sourceEntity === null
                    ? "object[null]"
                    : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]"
                : typeof sourceEntity) +
            ".");
    }
    const menuConfig = config.ui.menus.playerMenu_leaderboards;
    const statistics = menuConfig.customStats;
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.medium + "Manage Custom Statistics");
    form.body("This menu allows you to manage your custom leaderboard statistics.");
    statistics.forEach((s) => {
        form.button(customFormUICodes.action.buttons.positions.main_only + s.buttonDisplayName, s.buttonIcon);
    });
    form.button(customFormUICodes.action.buttons.positions.main_only + "New Statistic", "textures/ui/color_plus");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Reset To Defaults", "textures/ui/reset_red");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch (r.selection < statistics.length ? "button" : ["new", "back", "close", "reset"][r.selection - statistics.length]) {
            case "button":
                if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_statistic(sourceEntity, statistics[r.selection])) === 1) {
                    return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom(sourceEntity);
                }
                else {
                    return 0;
                }
            case "new":
                if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_newStatistic(sourceEntity)) === 1) {
                    return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom(sourceEntity);
                }
                else {
                    return 0;
                }
            case "reset": {
                if ((await showMessage(sourceEntity, "Are You Sure?", "Are you sure you want to reset the button arrangement back to the default!?\nThis action cannot be undone!", "Cancel", "Confirm")).selection == 1) {
                    menuConfig.customStats = undefined;
                    if ((await showMessage(sourceEntity, "Reset Successful", `You have successfully reset the custom leaderboard statistics to the factory settings.`, "Okay", "Close")).selection !== 1) {
                        return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    if ((await showMessage(sourceEntity, "Reset Canceled", `The reset of the custom leaderboard statistics to the factory settings has been canceled.`, "Okay", "Close")).selection !== 1) {
                        return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom(sourceEntity);
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
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_statistic(sourceEntitya, statistic) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    try {
        const menuConfig = config.ui.menus.playerMenu_leaderboards;
        const form = new ActionFormData()
            .title(`${customFormUICodes.action.titles.formStyles.medium}Edit ${statistic.type === "customAdvanced" ? "Advanced " : ""}Custom Statistic`)
            .body(`ID: ${statistic.id}
Menu Title: ${statistic.menuTitle}§r
Display Name: ${statistic.buttonDisplayName}§r
Stats List Display Name: ${statistic.statsListDisplayName}§r
Type: ${statistic.type}§r`)
            .button(customFormUICodes.action.buttons.positions.main_only + "Edit", "textures/ui/pencil_edit_icon")
            .button(customFormUICodes.action.buttons.positions.main_only + "Formatting Options", "textures/ui/text_color_paintbrush");
        if (statistic.type === "customAdvanced") {
            form.button(customFormUICodes.action.buttons.positions.main_only + "Advanced Options", "textures/ui/icon_creator");
        }
        form.button(customFormUICodes.action.buttons.positions.main_only + "Remove", "textures/ui/trash_default")
            .button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left")
            .button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        const rb = await form.forceShow(sourceEntity);
        if (rb.canceled || rb.selection === 3 + +(statistic.type === "customAdvanced"))
            return 1;
        if (rb.selection === 4 + +(statistic.type === "customAdvanced"))
            return 0;
        if (rb.selection === 0) {
            if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_editStatistic(sourceEntity, statistic)) == 1) {
                return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_statistic(sourceEntity, statistic);
            }
            else {
                return 0;
            }
        }
        else if (rb.selection === 1) {
            if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_editStatisticFormattingOptions(sourceEntity, statistic)) == 1) {
                return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_statistic(sourceEntity, statistic);
            }
            else {
                return 0;
            }
        }
        else if (statistic.type === "customAdvanced" && rb.selection === 2) {
            if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_editStatisticAdvancedOptions(sourceEntity, statistic)) == 1) {
                return await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_statistic(sourceEntity, statistic);
            }
            else {
                return 0;
            }
        }
        else {
            menuConfig.customStats = menuConfig.customStats.filter((s) => s.id !== statistic.id);
            return 1;
        }
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
/**
 * Displays and handles the custom statistic formatting options form for a given entity.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the form was canceled.
 * - `0` if the user selected "Cancel" in the access denied message or "Close" if an error message appeared.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_editStatisticFormattingOptions(sourceEntitya, statistic) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    } /*
    if(testForObjectTypeExtension(statistic, {
        buttonDisplayName: "string",
        id: "string",
        menuTitle: "string",
        statsListDisplayName: "string",
        type: "string",
        valueType: "string",
        displayOptions: "object",
    })){
        throw new ReferenceError(`Error when parsing statistic.`);
    } */
    const statisticID = statistic.id;
    const includedOptions = cullUndefined([
        "addCommaSeparators",
        "currencyPrefix",
        "valueDisplayColor",
        statistic.type === "custom" ? "sorter" : undefined,
    ]);
    const form = new ModalFormData();
    form.title(customFormUICodes.modal.titles.formStyles.medium + "Custom Statistic Formatting Options");
    const formOptionsMap = {
        addCommaSeparators: () => form.toggle("§l§fAdd Comma Separators§r§f\nWhether or not to add comma separators in the displayed value. ex. 1327401 would become 1,327,401. Defaults to true.", { defaultValue: statistic.displayOptions.addCommaSeparators ?? true }),
        currencyPrefix: () => form.textField(`§l§fCurrency Prefix§r§f\nA currency symbol to prefix the displayed value with. For example, if this is set to "$", then 1327401 would become $1327401 and -1234781 would become -$1234781. (Can be combined with "Add Comma Separators" to make it display like -$1,234,781.). Leave it blank to have no currency symbol. Defaults to "".`, "Currency Prefix", { defaultValue: statistic.displayOptions.currencyPrefix ?? "" }),
        valueDisplayColor: () => form.textField('§l§fValue Display Color§r§f\nThe formatting codes to apply to the score when it is displayed in the player statistics list that is shown when a player clicks on another player in the leaderboard. Should be either blank or any combination of these characters: "§00§r§11§r§22§r§33§r§44§r§55§r§66§r§77§r§88§r§99§r§aa§r§bb§r§cc§r§dd§r§ee§r§ff§r§gg§r§hh§r§ii§r§jj§r§kk§r§ll§r§mm§r§nn§r§oo§r§pp§r§qq§r§rr§r§ss§r§tt§r§uu§r§vv§r§ww§r§xx§r§yy§r§zz§r". Defaults to "".', "text", { defaultValue: statistic.displayOptions.valueDisplayColor ?? "" }),
        sorter: () => form.dropdown("§l§fSort Order§r§f\nWhether the leaderboard should be in Ascending or Descending order. Defaults to Descending.", ["Ascending", "Descending"], { defaultValueIndex: statistic.sorter }),
    };
    includedOptions.forEach((o) => formOptionsMap[o]());
    form.submitButton("Save");
    return await forceShow(form, sourceEntity)
        .then((r) => {
        if (r.canceled) {
            return 1;
        }
        const options = Object.fromEntries(includedOptions.map((o, i) => [o, r.formValues[i]]));
        includedOptions.forEach((v) => {
            switch (v) {
                case "addCommaSeparators":
                    statistic.displayOptions.addCommaSeparators = options[v];
                    break;
                case "currencyPrefix":
                    statistic.displayOptions.currencyPrefix = options[v];
                    break;
                case "valueDisplayColor":
                    statistic.displayOptions.valueDisplayColor = options[v] === "" ? undefined : options[v];
                    break;
                case "sorter":
                    statistic.sorter = options[v];
                    break;
                default:
                    throw new Error(`Save action for setting ${JSON.stringify(v)} was not defined.`);
            }
        });
        const newStatsList = config.ui.menus.playerMenu_leaderboards.customStats;
        const statIndex = newStatsList.findIndex((s) => s.id === statisticID);
        if (statIndex !== -1) {
            newStatsList.splice(statIndex, 1, statistic);
        }
        else {
            newStatsList.push(statistic);
        }
        config.ui.menus.playerMenu_leaderboards.customStats = newStatsList;
        return 1;
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
/**
 * Displays and handles the edit custom statistic form for a given entity.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the form was canceled.
 * - `0` if the user selected "Cancel" in the access denied message or "Close" if an error message appeared.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_editStatistic(sourceEntitya, statistic) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    } /*
    if(testForObjectTypeExtension(statistic, {
        buttonDisplayName: "string",
        id: "string",
        menuTitle: "string",
        statsListDisplayName: "string",
        type: "string",
        valueType: "string",
        displayOptions: "object",
    })){
        throw new ReferenceError(`Error when parsing statistic.`);
    } */
    const statisticID = statistic.id;
    const includedOptions = cullUndefined([
        "id",
        statistic.type === "custom" ? "scoreboardObjective" : undefined,
        "menuTitle",
        "statsListDisplayName",
        "buttonDisplayName",
        "buttonIcon",
    ]);
    const form = new ModalFormData();
    form.title(customFormUICodes.modal.titles.formStyles.medium + "Edit Custom Statistic");
    const formOptionsMap = {
        id: () => form.textField("§l§fID§r§f\nThe ID of this leaderboard statistic, this must be unique.", "ID", { defaultValue: statistic.id }),
        scoreboardObjective: () => form.textField("§l§fScoreboard Objective§r§f\nThe ID of the scoreboard objective that this leaderboard statistic is linked to.", "Objective Name", {
            defaultValue: statistic.scoreboardObjective,
        }),
        menuTitle: () => form.textField("§l§fMenu Title§r§f\nThe title text that will be displayed when the player is looking at the leaderboard for this leaderboard statistic.", "text", { defaultValue: statistic.menuTitle }),
        statsListDisplayName: () => form.textField("§l§fStats List Display Name§r§f\nThe text that will go before the colon when displaying the value of this statistic for a player when a player clicks on another player in the leaderboard.", "text", { defaultValue: statistic.statsListDisplayName }),
        buttonDisplayName: () => form.textField("§l§fButton Display Name§r§f\nThe text that will be displayed on the button to view this leaderboard.", "text", {
            defaultValue: statistic.buttonDisplayName,
        }),
        buttonIcon: () => form.textField("§l§fButton Icon§r§f (Optional)\nThe text that will go before the colon when displaying the value of this statistic for a player when a player clicks on another player in the leaderboard.", "text", { defaultValue: statistic.buttonIcon }),
    };
    includedOptions.forEach((o) => formOptionsMap[o]());
    form.submitButton("Save");
    return await forceShow(form, sourceEntity)
        .then((r) => {
        if (r.canceled) {
            return 1;
        }
        const options = Object.fromEntries(includedOptions.map((o, i) => [o, r.formValues[i]]));
        includedOptions.forEach((v) => {
            switch (v) {
                case "id":
                    statistic.id = options[v];
                    break;
                case "menuTitle":
                    statistic.menuTitle = options[v];
                    break;
                case "statsListDisplayName":
                    statistic.statsListDisplayName = options[v];
                    break;
                case "buttonDisplayName":
                    statistic.buttonDisplayName = options[v];
                    break;
                case "buttonIcon":
                    statistic.buttonIcon = options[v] === "" ? undefined : options[v];
                    break;
                case "scoreboardObjective":
                    statistic.scoreboardObjective = options[v];
                    break;
                default:
                    throw new Error(`Save action for setting ${JSON.stringify(v)} was not defined.`);
            }
        });
        const newStatsList = config.ui.menus.playerMenu_leaderboards.customStats;
        const statIndex = newStatsList.findIndex((s) => s.id === statisticID);
        if (statIndex !== -1) {
            newStatsList.splice(statIndex, 1, statistic);
        }
        else {
            newStatsList.push(statistic);
        }
        config.ui.menus.playerMenu_leaderboards.customStats = newStatsList;
        return 1;
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
/**
 * Displays and handles the advanced statistic options form for a given entity.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the form was canceled.
 * - `0` if the user selected "Cancel" in the access denied message or "Close" if an error message appeared.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_editStatisticAdvancedOptions(sourceEntitya, statistic) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    if (statistic.type !== "customAdvanced") {
        throw new TypeError(`Invalid statistic type. Expected statistic type of \"customAdvanced\" but got statistic type of ${JSON.stringify(statistic.type)} instead.`);
    }
    const statisticID = statistic.id;
    const includedOptions = [
        "getterFunction",
        "valueType",
        "sortType",
        "sorter",
        "valueDisplayTransformer_button",
        "valueDisplayTransformer_statsList",
    ];
    const form = new ModalFormData();
    form.title(customFormUICodes.modal.titles.formStyles.medium + "Advanced Statistic Options");
    const formOptionsMap = {
        getterFunction: () => form.textField("§l§fGetter Function§r§c*§f\nA JavaScript function that will get a player's score for this statistic, it should accept one parameter of type savedPlayer, if you don't want a specific player appearing in the leaderboard, then have the function return undefined for them.\nThe type definitions for the savedPlayer class can be found in the declaration folder of the behavior pack, at §bBP/declaration/modules/player_save/classes/savedPlayer.d.ts§r.\nType: §f(§6player§b: §esavedPlayer§f) §d=> §cstring §b| §6undefined§r", "(player: savedPlayer) => string | undefined", { defaultValue: statistic.getterFunction.toString() }),
        valueType: () => form.dropdown("§l§fValue Type§r§c*§f\nThe value type for the scores of this leaderboard statistic, choose string if it is not numerical, choose number if it needs to be able to have decimal places, and choose bigint if you want to be able to have infinitely large integers.\nNote: If you choose string, then the preset Ascending and Descending options below for the sort type will not sort based on numerical value, and instead sort it based off of alphabetical order. So if you choose string and do not want it sorting like that then you must choose the Function sort type and put in a custom JavaScript function for it.\nThe default is bigint.", ["string", "number", "bigint"], {
            defaultValueIndex: ["string", "number", "bigint"].indexOf(statistic.valueType.toLowerCase()) !== -1
                ? ["string", "number", "bigint"].indexOf(statistic.valueType.toLowerCase())
                : 2,
        }),
        sortType: () => form.dropdown("§l§fSort Type§r§c*§f\nHow to sort the scores, Ascending, Descending, or Function. If you select function then you must put a JavaScript function to sort the scores in the text box below.\nType: §f(§6a§b: §estring§f, §6b§b: §estring§f) §d=> §cnumber§r\nThe default is Descending.", ["Ascending", "Descending", "Function"], { defaultValueIndex: typeof statistic.sorter === "function" ? 2 : statistic.sorter }),
        sorter: () => form.textField("§l§fSorter Function§r§f\n§oOnly applies when the Sort Type is set to Function.§r\nA JavaScript function that is used to sort the scores of the leaderboard, this will be passed directly into an Array.prototype.sort function, so it should return a negative value if the first parameter should be before the second parameter, zero if they are the same, and a positive value if the first parameter should be placed after the second parameter.\nType: §f(§6a§b: §estring§f, §6b§b: §estring§f) §d=> §cnumber§r", "(a: string, b: string) => number", { defaultValue: typeof statistic.sorter === "number" ? "" : statistic.sorter.toString() }),
        valueDisplayTransformer_button: () => form.textField("§l§fValue Display Transformer - Button§r§f\nA JavaScript function that transforms the score values that are displayed on the buttons for each of the players in the leaderboard.\nLeave it blank to keep the scores displayed on the buttons as-is.\nType: §f(§6value§b: §estring§f) §d=> §cstring§r", "(value: string) => string", {
            defaultValue: statistic.displayOptions.valueDisplayTransformer_button !== undefined
                ? statistic.displayOptions.valueDisplayTransformer_button.toString()
                : undefined,
        }),
        valueDisplayTransformer_statsList: () => form.textField("§l§fValue Display Transformer - Stats List§r§f\nA JavaScript function that transforms the score value that is displayed is the statistics list that is shown when a player clicks on another player in the leaderboard.\nLeave it blank to keep the scores displayed on the stats list as-is.\nType: §f(§6value§b: §estring§f) §d=> §cstring§r", "(value: string) => string", {
            defaultValue: statistic.displayOptions.valueDisplayTransformer_statsList !== undefined
                ? statistic.displayOptions.valueDisplayTransformer_statsList.toString()
                : undefined,
        }),
    };
    includedOptions.forEach((o) => formOptionsMap[o]());
    form.submitButton("Save");
    return await forceShow(form, sourceEntity)
        .then((r) => {
        if (r.canceled) {
            return 1;
        }
        const options = Object.fromEntries(includedOptions.map((o, i) => [o, r.formValues[i]]));
        includedOptions.forEachB((v) => {
            switch (v) {
                case "getterFunction":
                    if (options[v] === "") {
                        throw new SyntaxError("The Getter Function option is required, but you left it blank.");
                    }
                    try {
                        statistic.getterFunction = eval?.(options[v]);
                    }
                    catch (e) {
                        if (e instanceof Error) {
                            e.message = "The following error occurred while parsing the provided Getter Function: " + e.message;
                            throw e;
                        }
                        else {
                            throw e;
                        }
                    }
                    break;
                case "valueType":
                    statistic.valueType = ["string", "number", "bigint"][options[v]];
                    break;
                case "sortType":
                    if (options[v] === 2) {
                        statistic.sortType = "function";
                    }
                    else {
                        statistic.sortType = "order";
                        statistic.sorter = options[v];
                    }
                    break;
                case "sorter":
                    if (options["sortType"] === 2) {
                        try {
                            statistic.sorter = eval?.(options[v]);
                        }
                        catch (e) {
                            if (e instanceof Error) {
                                e.message = "The following error occurred while parsing the provided Sorter Function: " + e.message;
                                throw e;
                            }
                            else {
                                throw e;
                            }
                        }
                    }
                    break;
                case "valueDisplayTransformer_button":
                    try {
                        statistic.displayOptions.valueDisplayTransformer_button = options[v] === "" ? undefined : eval?.(options[v]);
                    }
                    catch (e) {
                        if (e instanceof Error) {
                            e.message = "The following error occurred while parsing the provided Value Display Transformer - Button Function: " + e.message;
                            throw e;
                        }
                        else {
                            throw e;
                        }
                    }
                    break;
                case "valueDisplayTransformer_statsList":
                    try {
                        statistic.displayOptions.valueDisplayTransformer_statsList = options[v] === "" ? undefined : eval?.(options[v]);
                    }
                    catch (e) {
                        if (e instanceof Error) {
                            e.message =
                                "The following error occurred while parsing the provided Value Display Transformer - Stats List Function: " + e.message;
                            throw e;
                        }
                        else {
                            throw e;
                        }
                    }
                    break;
                default:
                    throw new Error(`Save action for setting ${JSON.stringify(v)} was not defined.`);
            }
        });
        const newStatsList = config.ui.menus.playerMenu_leaderboards.customStats;
        const statIndex = newStatsList.findIndex((s) => s.id === statisticID);
        if (statIndex !== -1) {
            newStatsList.splice(statIndex, 1, statistic);
        }
        else {
            newStatsList.push(statistic);
        }
        config.ui.menus.playerMenu_leaderboards.customStats = newStatsList;
        return 1;
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
/**
 * Displays and handles the new statistic form for a given entity.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the form was canceled.
 * - `0` if the user selected "Cancel" in the access denied message or "Close" if an error message appeared.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export async function uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_newStatistic(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    } /*
    if(testForObjectTypeExtension(statistic, {
        buttonDisplayName: "string",
        id: "string",
        menuTitle: "string",
        statsListDisplayName: "string",
        type: "string",
        valueType: "string",
        displayOptions: "object",
    })){
        throw new ReferenceError(`Error when parsing statistic.`);
    } */
    let type = undefined;
    const typeSelection = await showActions(sourceEntity, customFormUICodes.action.titles.formStyles.medium + "New Statistic", "Would you like to create a simple or advanced leaderboard statistic? Unless you are good at JavaScript, it is not recommended for you to create an advanced statistic.", [customFormUICodes.action.buttons.positions.main_only + "Simple"], [customFormUICodes.action.buttons.positions.main_only + "Advanced"], [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"], [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"]);
    if (typeSelection.canceled || typeSelection.selection === 2) {
        return 1;
    }
    if (typeSelection.selection === 3) {
        return 0;
    }
    type = typeSelection.selection === 0 ? "custom" : "customAdvanced";
    let statistic = {
        displayOptions: {},
        valueType: "bigint",
        type: type,
        sorter: 1,
    };
    const includedOptions = cullUndefined([
        "id",
        type === "custom" ? "scoreboardObjective" : undefined,
        "menuTitle",
        "statsListDisplayName",
        "buttonDisplayName",
        "buttonIcon",
        type === "customAdvanced" ? "getterFunction" : undefined,
        type === "customAdvanced" ? "valueType" : undefined,
        type === "customAdvanced" ? "sortType" : undefined,
        type === "customAdvanced" ? "sorter" : undefined,
    ]);
    const form = new ModalFormData();
    form.title(customFormUICodes.modal.titles.formStyles.medium + "New Statistic");
    const formOptionsMap = {
        id: () => form.textField("§l§fID§r§c*§f\nThe ID of this leaderboard statistic, this must be unique.", "ID"),
        scoreboardObjective: () => form.textField("§l§fScoreboard Objective§r§c*§f\nThe ID of the scoreboard objective that this leaderboard statistic is linked to.", "Scoreboard Objective"),
        menuTitle: () => form.textField("§l§fMenu Title§r§c*§f\nThe title text that will be displayed when the player is looking at the leaderboard for this leaderboard statistic.", "text"),
        statsListDisplayName: () => form.textField("§l§fStats List Display Name§r§c*§f\nThe text that will go before the colon when displaying the value of this statistic for a player when a player clicks on another player in the leaderboard.", "text"),
        buttonDisplayName: () => form.textField("§l§fButton Display Name§r§c*§f\nThe text that will be displayed on the button to view this leaderboard.", "text"),
        buttonIcon: () => form.textField("§l§fButton Icon§r§f (Optional)\nThe text that will go before the colon when displaying the value of this statistic for a player when a player clicks on another player in the leaderboard.", "text"),
        getterFunction: () => form.textField("§l§fGetter Function§r§c*§f\nA JavaScript function that will get a player's score for this statistic, it should accept one parameter of type savedPlayer, if you don't want a specific player appearing in the leaderboard, then have the function return undefined for them.\nThe type definitions for the savedPlayer class can be found in the declaration folder of the behavior pack, at §bBP/declaration/modules/player_save/classes/savedPlayer.d.ts§r.\nType: §f(§6player§b: §esavedPlayer§f) §d=> §cstring §b| §6undefined§r", "(player: savedPlayer) => string | undefined"),
        valueType: () => form.dropdown("§l§fValue Type§r§c*§f\nThe value type for the scores of this leaderboard statistic, choose string if it is not numerical, choose number if it needs to be able to have decimal places, and choose bigint if you want to be able to have infinitely large integers.\nNote: If you choose string, then the preset Ascending and Descending options below for the sort type will not sort based on numerical value, and instead sort it based off of alphabetical order. So if you choose string and do not want it sorting like that then you must choose the Function sort type and put in a custom JavaScript function for it.\nThe default is bigint.", ["string", "number", "bigint"], { defaultValueIndex: 2 }),
        sortType: () => form.dropdown("§l§fSort Type§r§c*§f\nHow to sort the scores, Ascending, Descending, or Function. If you select function then you must put a JavaScript function to sort the scores in the text box below.\nType: §f(§6a§b: §estring§f, §6b§b: §estring§f) §d=> §cnumber§r\nThe default is Descending.", ["Ascending", "Descending", "Function"], { defaultValueIndex: 1 }),
        sorter: () => form.textField("§l§fSorter Function§r§f\n§oOnly applies when the Sort Type is set to Function.§r\nA JavaScript function that is used to sort the scores of the leaderboard, this will be passed directly into an Array.prototype.sort function, so it should return a negative value if the first parameter should be before the second parameter, zero if they are the same, and a positive value if the first parameter should be placed after the second parameter.\nType: §f(§6a§b: §estring§f, §6b§b: §estring§f) §d=> §cnumber§r", "(a: string, b: string) => number"),
    };
    includedOptions.forEachB((o) => formOptionsMap[o]());
    form.submitButton("Save");
    return await forceShow(form, sourceEntity)
        .then(async (r) => {
        if (r.canceled) {
            return 1;
        }
        const options = Object.fromEntries(includedOptions.map((o, i) => [o, r.formValues[i]]));
        includedOptions.forEachB((v) => {
            switch (v) {
                case "id":
                    statistic.id = options[v];
                    break;
                case "menuTitle":
                    statistic.menuTitle = options[v];
                    break;
                case "statsListDisplayName":
                    statistic.statsListDisplayName = options[v];
                    break;
                case "buttonDisplayName":
                    statistic.buttonDisplayName = options[v];
                    break;
                case "buttonIcon":
                    statistic.buttonIcon = options[v] === "" ? undefined : options[v];
                    break;
                case "scoreboardObjective":
                    statistic.scoreboardObjective = options[v];
                    break;
                case "getterFunction":
                    if (options[v] === "") {
                        throw new SyntaxError("The Getter Function option is required, but you left it blank.");
                    }
                    try {
                        statistic.getterFunction = eval?.(options[v]);
                    }
                    catch (e) {
                        if (e instanceof Error) {
                            e.message = "The following error occurred while parsing the provided Getter Function: " + e.message;
                            throw e;
                        }
                        else {
                            throw e;
                        }
                    }
                    break;
                case "valueType":
                    statistic.valueType = ["string", "number", "bigint"][options[v]];
                    break;
                case "sortType":
                    if (options[v] === 2) {
                        statistic.sortType = "function";
                    }
                    else {
                        statistic.sortType = "order";
                        statistic.sorter = options[v];
                    }
                    break;
                case "sorter":
                    if (options["sortType"] === 2) {
                        try {
                            statistic.sorter = eval?.(options[v]);
                        }
                        catch (e) {
                            if (e instanceof Error) {
                                e.message = "The following error occurred while parsing the provided Sorter Function: " + e.message;
                                throw e;
                            }
                            else {
                                throw e;
                            }
                        }
                    }
                    break;
                default:
                    throw new Error(`Save action for setting ${JSON.stringify(v)} was not defined.`);
            }
        });
        const newStatsList = config.ui.menus.playerMenu_leaderboards.customStats;
        const statIndex = newStatsList.findIndex((s) => s.id === statistic.id);
        if (statIndex === -1) {
            newStatsList.push(statistic);
        }
        else {
            throw new Error("Duplicate leaderboard statistic ID.");
        }
        config.ui.menus.playerMenu_leaderboards.customStats = newStatsList;
        if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings_manageStatistics_custom_statistic(sourceEntity, statistic)) == 1) {
            return 1;
        }
        else {
            return 0;
        }
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
//# sourceMappingURL=uiSettings_MConfigs_PM_lbrdSttgs.js.map