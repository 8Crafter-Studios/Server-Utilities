import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { ban } from "modules/ban/classes/ban";
import { managePlayers_managePlayer } from "./managePlayers_managePlayer";
import { editPermissionForPlayerUI, managePermissionsPresets, resetPlayerPermissionsUI, securityVariables, selectSecurityMode, ultraSecurityModeDebug, } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
/**
 * Displays and handles the security settings form for a given entity.
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
export async function securitySettings(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.accessSecuritySettings") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSecuritySettings", "Go Back", "Close");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            let form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Security");
            form.body("Choose menu to open. ");
            form.button(customFormUICodes.action.buttons.positions.main_only + "View Players With Permissions", "textures/ui/permissions_op_crown");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Manage Default Permissions", "textures/ui/icon_setting");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Manage Permissions Presets", "textures/ui/icon_setting");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Reset Permissions", "textures/ui/icon_setting");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Settings", "textures/ui/icon_setting");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return;
            let response = r.selection;
            switch ([
                "viewPlayersWithPermissions",
                "manageDefaultPermissions",
                "managePermissionsPresets",
                "resetPermissions",
                "settings",
                "back",
                "close",
            ][response]) {
                case "viewPlayersWithPermissions":
                    if ((await (securityVariables.ultraSecurityModeEnabled
                        ? securitySettings_playersWithPermissions_UltraSecurityMode
                        : securitySettings_playersWithPermissions)(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "manageDefaultPermissions": {
                    if (!securityVariables.ultraSecurityModeEnabled) {
                        const rb = await showMessage(player, "Disabled (423)", "This menu is disabled when Ultra Security Mode is off.", "Go Back", "Close");
                        if (rb.canceled || rb.selection == 0) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    else if ((await editPermissionForPlayerUI(player, "everyone")) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                }
                case "managePermissionsPresets":
                    if ((await managePermissionsPresets(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "resetPermissions":
                    if ((await resetPlayerPermissionsUI(player)) == 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "settings":
                    if ((await securitySettings_settingsSelection(player)) == 1) {
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
 * Displays and handles the settings section of the security settings form for a given entity.
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
export async function securitySettings_settingsSelection(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.accessSecuritySettings") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSecuritySettings", "Go Back", "Close");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Security Settings");
            form.body("");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Secuity Mode", "textures/ui/absorption_effect");
            form.button(customFormUICodes.action.buttons.positions.main_only + customFormUICodes.action.buttons.options.disabled + "Settings (Coming Soon!)", "textures/ui/icon_setting");
            if (securityVariables.ultraSecurityModeEnabled) {
                form.button(customFormUICodes.action.buttons.positions.main_only +
                    customFormUICodes.action.buttons.options.disabled +
                    "Ultra Security Mode Settings (Coming Soon!)", "textures/ui/icon_setting");
                form.button(customFormUICodes.action.buttons.positions.main_only + "Ultra Security Mode Debug", "textures/ui/icon_setting");
            }
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch (cullUndefined([
                "securityMode",
                "settings",
                ...(securityVariables.ultraSecurityModeEnabled ? ["ultraSecurityModeSettings", "ultraSecurityModeDebug"] : []),
                "back",
                "close",
            ])[r.selection]) {
                case "securityMode":
                    if ((await selectSecurityMode(player)) !== 0) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "settings" /*
                    if((await mainSecuritySettings(sourceEntity))==1){
                        continue;
                    }else{
                        return 0;
                    } */:
                    /**
                     * @todo Add the mainSecuritySettings function.
                     */
                    continue;
                case "ultraSecurityModeSettings" /*
                    if(securityVariables.ultraSecurityModeEnabled){
                        if((await ultraSecurityModeSettings(sourceEntity as Player))==1){
                            continue;
                        }else{
                            return 0;
                        }
                    }else{
                        return 1;
                    } */:
                    /**
                     * @todo Add the ultraSecurityModeSettings function.
                     */
                    continue;
                case "ultraSecurityModeDebug":
                    if (securityVariables.ultraSecurityModeEnabled) {
                        if ((await ultraSecurityModeDebug(player)) == 1) {
                            continue;
                        }
                        else {
                            return 0;
                        }
                    }
                    else {
                        continue;
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
 * Displays and handles the players with permissions form for a given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, gives an error that it is disabled when Ultra Security Mode is on, otherwise displays the UI settings form.
 * 3. Updates the configuration based on the form input.
 * 4. Returns the appropriate status code based on the outcome.
 */
export async function securitySettings_playersWithPermissions(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                const r = await showMessage(player, "Disabled (423)", "This menu is disabled when Ultra Security Mode is on.", "Go Back", "Close");
                if (r.canceled || r.selection == 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
            let form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.medium + "Players With Permissions");
            form.body("Choose menu to open. ");
            form.button(customFormUICodes.action.buttons.positions.main_only + "canUseChatCommands", "textures/ui/permissions_op_crown");
            form.button(customFormUICodes.action.buttons.positions.main_only + "canUseScriptEval", "textures/ui/permissions_op_crown");
            form.button(customFormUICodes.action.buttons.positions.main_only + "canUseCommands", "textures/ui/permissions_op_crown");
            form.button(customFormUICodes.action.buttons.positions.main_only + "canBypassPropectedAreas", "textures/ui/permissions_op_crown");
            form.button(customFormUICodes.action.buttons.positions.main_only + "getAllChatCommands", "textures/ui/permissions_op_crown");
            form.button(customFormUICodes.action.buttons.positions.main_only + "admin", "textures/ui/permissions_op_crown");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch ([
                "canUseChatCommands",
                "canUseScriptEval",
                "canUseCommands",
                "canBypassPropectedAreas",
                "getAllChatCommands",
                "admin",
                "back",
                "close",
            ][r.selection]) {
                case "canUseChatCommands":
                    if ((await securitySettings_playersWithPermissions_permission(player, ["canUseChatCommands", true])) === 1) {
                        continue;
                    }
                    break;
                case "canUseScriptEval":
                    if ((await securitySettings_playersWithPermissions_permission(player, ["canUseScriptEval", true])) === 1) {
                        continue;
                    }
                    break;
                case "canUseCommands":
                    if ((await securitySettings_playersWithPermissions_permission(player, ["canUseCommands", true])) === 1) {
                        continue;
                    }
                    break;
                case "canBypassPropectedAreas":
                    if ((await securitySettings_playersWithPermissions_permission(player, ["canBypassProtectedAreas", true])) === 1) {
                        continue;
                    }
                    break;
                case "getAllChatCommands":
                    if ((await securitySettings_playersWithPermissions_permission(player, ["getAllChatCommands", true])) === 1) {
                        continue;
                    }
                    break;
                case "admin":
                    if ((await securitySettings_playersWithPermissions_permission(player, ["admin", true])) === 1) {
                        continue;
                    }
                    break;
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
 * @todo Convert this to the new manage players UI style.
 */
export async function securitySettings_playersWithPermissions_permission(sourceEntitya, permission, pagen = 0, maxplayersperpage = config.ui.pages.maxPlayersPerManagePlayersPage ?? 9, search) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        const r = await showMessage(sourceEntity, "Disabled (423)", "This menu is disabled when Ultra Security Mode is on.", "Go Back", "Close");
        if (r.canceled || r.selection == 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
    let form = new ActionFormData();
    const page = Math.max(0, pagen);
    const savedPlayers = savedPlayer
        .getSavedPlayers()
        .filter((p) => p.playerPermissions?.[permission[0]] == permission[1])
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? `${search.searchNames ?? true ? p.name + "\n" : ""}${search.searchIds ?? true ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) || (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates && search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`.includes(search.value)
            : `${search.searchNames ?? true ? p.name + "\n" : ""}${search.searchIds ?? true ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) || (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates && search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`
                .toLowerCase()
                .includes(search.value.toLowerCase())
        : true);
    const numsavedplayers = savedPlayers.length;
    const numonlinesavedplayers = savedPlayers.filter((_) => _.isOnline).length;
    const numofflinesavedplayers = savedPlayers.filter((_) => !_.isOnline).length;
    form.title(`${!!search ? "Search Results" : "Manage Players"} ${Math.min(numsavedplayers, page * maxplayersperpage + 1)}-${Math.min(numsavedplayers, (page + 1) * maxplayersperpage)} of ${numsavedplayers}`);
    const numpages = Math.ceil(numsavedplayers / maxplayersperpage);
    if (!!search) {
        form.body(`Searching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive ?? false)}`);
    }
    form.button("Search", "textures/ui/spyglass_flat");
    form.button((page != 0 ? "§0" : "§8") + "Previous Page", "textures/ui/arrow_left");
    form.button((page < numpages - 1 ? "§0" : "§8") + "Next Page", "textures/ui/arrow_right");
    let displayPlayers = [
        ...savedPlayer.getSavedPlayersAlphabeticalOrder().filter((_) => _.isOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && _.isBanned)
            .sort((a, b) => b.lastOnline - a.lastOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && !_.isBanned)
            .sort((a, b) => b.lastOnline - a.lastOnline),
    ]
        .filter((p) => p.playerPermissions?.[permission[0]] == permission[1])
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? `${search.searchNames ?? true ? p.name + "\n" : ""}${search.searchIds ?? true ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) || (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates && search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`.includes(search.value)
            : `${search.searchNames ?? true ? p.name + "\n" : ""}${search.searchIds ?? true ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) || (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates && search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`
                .toLowerCase()
                .includes(search.value.toLowerCase())
        : true)
        .slice(page * maxplayersperpage, (page + 1) * maxplayersperpage);
    displayPlayers.forEach((p) => {
        form.button(`${p.name}\n${ban.testForBannedPlayer(p) ? "Banned" : p.isOnline ? "Online" : new Date(p.lastOnline).formatDateTime(sourceEntity.timeZone)}`, p.isOnline ? "textures/ui/online" : p.isBanned ? "textures/ui/Ping_Offline_Red_Dark" : "textures/ui/offline");
    });
    const numplayersonpage = displayPlayers.length;
    let players = displayPlayers;
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return (await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled) {
            return 1;
        }
        switch (r.selection) {
            case 0:
                {
                    const rb = await tryget(async () => await new ModalFormData()
                        .title("Search")
                        .textField("", "Search", search?.value ?? "")
                        .toggle("Case Sensitive", search?.caseSensitive ?? false)
                        .toggle("Search Player Names", search?.searchNames ?? true)
                        .toggle("Search Player IDs", search?.searchIds ?? true)
                        .toggle("Search Last Online Dates", search?.searchLastOnlineDates ?? false)
                        .toggle("Search Last Online Times", search?.searchLastOnlineTimes ?? false)
                        .submitButton("Search")
                        .forceShow(sourceEntity));
                    if (!!!rb || rb?.canceled == true) {
                        return await securitySettings_playersWithPermissions_permission(sourceEntity, permission, page, maxplayersperpage, search);
                    }
                    return await securitySettings_playersWithPermissions_permission(sourceEntity, permission, undefined, maxplayersperpage, {
                        value: rb.formValues[0],
                        caseSensitive: rb.formValues[1],
                        searchNames: rb.formValues[2],
                        searchIds: rb.formValues[3],
                        searchLastOnlineDates: rb.formValues[4],
                        searchLastOnlineTimes: rb.formValues[5],
                    }); /*
        return await showMessage(sourceEntity as Player, undefined, "§cSorry, the search feature has not been implemented yet.", "Back", "Close").then(async r=>{
            if(r.selection==0){
                return await managePlayers(sourceEntity, page, maxplayersperpage, search);
            }else{
                return 0;
            }
        })*/
                }
                break;
            case 1:
                return await securitySettings_playersWithPermissions_permission(sourceEntity, permission, Math.max(0, page - 1));
                break;
            case 2:
                return await securitySettings_playersWithPermissions_permission(sourceEntity, permission, Math.min(numpages - 1, page + 1));
                break;
            case numplayersonpage + 3:
                return 1;
                break;
            case numplayersonpage + 4:
                return 0;
                break;
            default:
                if ((await managePlayers_managePlayer(sourceEntity, players[r.selection - 3])) == 1) {
                    return await securitySettings_playersWithPermissions_permission(sourceEntity, permission, page, maxplayersperpage, search);
                }
                else {
                    return 0;
                }
        }
    })
        .catch(async (e) => {
        let formError = new MessageFormData();
        formError.body(e + e.stack);
        formError.title("Error");
        formError.button1("Done");
        formError.button2("Close");
        return await forceShow(formError, sourceEntity).then((r) => {
            return +(r.selection == 0);
        });
    }));
}
export async function securitySettings_playersWithPermissions_UltraSecurityMode(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.accessManagePlayersUI") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessManagePlayersUI", "Go Back", "Close");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            let form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.medium + "Players With Permissions");
            form.body("Choose menu to open. ");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Any Permissions", "textures/ui/permissions_op_crown");
            Object.keys(permissionType)
                .sort()
                .forEach((p) => {
                form.button(customFormUICodes.action.buttons.positions.main_only + p, "textures/ui/permissions_op_crown");
            });
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch (["anyPermissions"][r.selection] ??
                (Object.keys(permissionType)[r.selection - 1] !== undefined ? "permissionType" : undefined) ??
                ["back", "close"][r.selection - 1 - Object.keys(permissionType).length]) {
                case "anyPermissions":
                    if ((await securitySettings_playersWithPermissions_permission_any_UltraSecurityMode(player)) === 1) {
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "permissionType":
                    if ((await securitySettings_playersWithPermissions_permission_UltraSecurityMode(player, Object.keys(permissionType).sort()[r.selection - 1])) === 1) {
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
 * @todo Convert this to the new manage players UI style.
 */
export async function securitySettings_playersWithPermissions_permission_UltraSecurityMode(sourceEntitya, permission, pagen = 0, maxplayersperpage = config.ui.pages.maxPlayersPerManagePlayersPage ?? 10, search) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessManagePlayersUI") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessManagePlayersUI", "Go Back", "Close");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    const perm = securityVariables.convertPermissionTypeToObject(permission);
    let form = new ActionFormData();
    const page = Math.max(0, pagen);
    const savedPlayers = savedPlayer
        .getSavedPlayers()
        .filter((p) => securityVariables.testOfflinePlayerForPermission(p.id, perm.id))
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? `${search.searchNames ?? true ? p.name + "\n" : ""}${search.searchIds ?? true ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) || (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates && search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`.includes(search.value)
            : `${search.searchNames ?? true ? p.name + "\n" : ""}${search.searchIds ?? true ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) || (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates && search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`
                .toLowerCase()
                .includes(search.value.toLowerCase())
        : true);
    const numsavedplayers = savedPlayers.length;
    const numonlinesavedplayers = savedPlayers.filter((_) => _.isOnline).length;
    const numofflinesavedplayers = savedPlayers.filter((_) => !_.isOnline).length;
    form.title(`${!!search ? "Search Results" : "Manage Players"} ${Math.min(numsavedplayers, page * maxplayersperpage + 1)}-${Math.min(numsavedplayers, (page + 1) * maxplayersperpage)} of ${numsavedplayers}`);
    const numpages = Math.ceil(numsavedplayers / maxplayersperpage);
    if (!!search) {
        form.body(`Searching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive ?? false)}`);
    }
    form.button("Search", "textures/ui/spyglass_flat");
    form.button((page != 0 ? "§0" : "§8") + "Previous Page", "textures/ui/arrow_left");
    form.button((page < numpages - 1 ? "§0" : "§8") + "Next Page", "textures/ui/arrow_right");
    let displayPlayers = [
        ...savedPlayer.getSavedPlayersAlphabeticalOrder().filter((_) => _.isOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && _.isBanned)
            .sort((a, b) => b.lastOnline - a.lastOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && !_.isBanned)
            .sort((a, b) => b.lastOnline - a.lastOnline),
    ]
        .filter((p) => securityVariables.testOfflinePlayerForPermission(p.id, perm.id))
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? `${search.searchNames ?? true ? p.name + "\n" : ""}${search.searchIds ?? true ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) || (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates && search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`.includes(search.value)
            : `${search.searchNames ?? true ? p.name + "\n" : ""}${search.searchIds ?? true ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) || (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates && search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`
                .toLowerCase()
                .includes(search.value.toLowerCase())
        : true)
        .slice(page * maxplayersperpage, (page + 1) * maxplayersperpage);
    displayPlayers.forEach((p) => {
        form.button(`${p.name}\n${ban.testForBannedPlayer(p) ? "Banned" : p.isOnline ? "Online" : new Date(p.lastOnline).formatDateTime(sourceEntity.timeZone)}`, p.isOnline ? "textures/ui/online" : p.isBanned ? "textures/ui/Ping_Offline_Red_Dark" : "textures/ui/offline");
    });
    const numplayersonpage = displayPlayers.length;
    let players = displayPlayers;
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return (await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled) {
            return 1;
        }
        switch (r.selection) {
            case 0:
                {
                    const rb = await tryget(async () => await new ModalFormData()
                        .title("Search")
                        .textField("", "Search", search?.value ?? "")
                        .toggle("Case Sensitive", search?.caseSensitive ?? false)
                        .toggle("Search Player Names", search?.searchNames ?? true)
                        .toggle("Search Player IDs", search?.searchIds ?? true)
                        .toggle("Search Last Online Dates", search?.searchLastOnlineDates ?? false)
                        .toggle("Search Last Online Times", search?.searchLastOnlineTimes ?? false)
                        .submitButton("Search")
                        .forceShow(sourceEntity));
                    if (!!!rb || rb?.canceled == true) {
                        return await securitySettings_playersWithPermissions_permission_UltraSecurityMode(sourceEntity, permission, page, maxplayersperpage, search);
                    }
                    return await securitySettings_playersWithPermissions_permission_UltraSecurityMode(sourceEntity, permission, undefined, maxplayersperpage, {
                        value: rb.formValues[0],
                        caseSensitive: rb.formValues[1],
                        searchNames: rb.formValues[2],
                        searchIds: rb.formValues[3],
                        searchLastOnlineDates: rb.formValues[4],
                        searchLastOnlineTimes: rb.formValues[5],
                    }); /*
        return await showMessage(sourceEntity as Player, undefined, "§cSorry, the search feature has not been implemented yet.", "Back", "Close").then(async r=>{
            if(r.selection==0){
                return await managePlayers(sourceEntity, page, maxplayersperpage, search);
            }else{
                return 0;
            }
        })*/
                }
                break;
            case 1:
                return await securitySettings_playersWithPermissions_permission_UltraSecurityMode(sourceEntity, permission, Math.max(0, page - 1), maxplayersperpage, search);
                break;
            case 2:
                return await securitySettings_playersWithPermissions_permission_UltraSecurityMode(sourceEntity, permission, Math.min(numpages - 1, page + 1), maxplayersperpage, search);
                break;
            case numplayersonpage + 3:
                return 1;
                break;
            case numplayersonpage + 4:
                return 0;
                break;
            default:
                if ((await managePlayers_managePlayer(sourceEntity, players[r.selection - 3])) == 1) {
                    return await securitySettings_playersWithPermissions_permission_UltraSecurityMode(sourceEntity, permission, page, maxplayersperpage, search);
                }
                else {
                    return 0;
                }
        }
    })
        .catch(async (e) => {
        let formError = new MessageFormData();
        formError.body(e + e.stack);
        formError.title("Error");
        formError.button1("Done");
        formError.button2("Close");
        return await forceShow(formError, sourceEntity).then((r) => {
            return +(r.selection == 0);
        });
    }));
}
/**
 * @todo Convert this to the new manage players UI style.
 */
export async function securitySettings_playersWithPermissions_permission_any_UltraSecurityMode(sourceEntitya, pagen = 0, maxplayersperpage = config.ui.pages.maxPlayersPerManagePlayersPage ?? 10, search) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessManagePlayersUI") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessManagePlayersUI", "Go Back", "Close");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form = new ActionFormData();
    const page = Math.max(0, pagen);
    const savedPlayers = savedPlayer
        .getSavedPlayers()
        .filter((p) => securityVariables.playerPermissions[p.id]?.length > 0)
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? `${search.searchNames ?? true ? p.name + "\n" : ""}${search.searchIds ?? true ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) || (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates && search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`.includes(search.value)
            : `${search.searchNames ?? true ? p.name + "\n" : ""}${search.searchIds ?? true ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) || (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates && search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`
                .toLowerCase()
                .includes(search.value.toLowerCase())
        : true);
    const numsavedplayers = savedPlayers.length;
    const numonlinesavedplayers = savedPlayers.filter((_) => _.isOnline).length;
    const numofflinesavedplayers = savedPlayers.filter((_) => !_.isOnline).length;
    form.title(`${!!search ? "Search Results" : "Manage Players"} ${Math.min(numsavedplayers, page * maxplayersperpage + 1)}-${Math.min(numsavedplayers, (page + 1) * maxplayersperpage)} of ${numsavedplayers}`);
    const numpages = Math.ceil(numsavedplayers / maxplayersperpage);
    if (!!search) {
        form.body(`Searching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive ?? false)}`);
    }
    form.button("Search", "textures/ui/spyglass_flat");
    form.button((page != 0 ? "§0" : "§8") + "Previous Page", "textures/ui/arrow_left");
    form.button((page < numpages - 1 ? "§0" : "§8") + "Next Page", "textures/ui/arrow_right");
    let displayPlayers = [
        ...savedPlayer.getSavedPlayersAlphabeticalOrder().filter((_) => _.isOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && _.isBanned)
            .sort((a, b) => b.lastOnline - a.lastOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && !_.isBanned)
            .sort((a, b) => b.lastOnline - a.lastOnline),
    ]
        .filter((p) => securityVariables.playerPermissions[p.id]?.length > 0)
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? `${search.searchNames ?? true ? p.name + "\n" : ""}${search.searchIds ?? true ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) || (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates && search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`.includes(search.value)
            : `${search.searchNames ?? true ? p.name + "\n" : ""}${search.searchIds ?? true ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) || (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates && search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`
                .toLowerCase()
                .includes(search.value.toLowerCase())
        : true)
        .slice(page * maxplayersperpage, (page + 1) * maxplayersperpage);
    displayPlayers.forEach((p) => {
        form.button(`${p.name}\n${ban.testForBannedPlayer(p) ? "Banned" : p.isOnline ? "Online" : new Date(p.lastOnline).formatDateTime(sourceEntity.timeZone)}`, p.isOnline ? "textures/ui/online" : p.isBanned ? "textures/ui/Ping_Offline_Red_Dark" : "textures/ui/offline");
    });
    const numplayersonpage = displayPlayers.length;
    let players = displayPlayers;
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return (await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled) {
            return 1;
        }
        switch (r.selection) {
            case 0:
                {
                    const rb = await tryget(async () => await new ModalFormData()
                        .title("Search")
                        .textField("", "Search", search?.value ?? "")
                        .toggle("Case Sensitive", search?.caseSensitive ?? false)
                        .toggle("Search Player Names", search?.searchNames ?? true)
                        .toggle("Search Player IDs", search?.searchIds ?? true)
                        .toggle("Search Last Online Dates", search?.searchLastOnlineDates ?? false)
                        .toggle("Search Last Online Times", search?.searchLastOnlineTimes ?? false)
                        .submitButton("Search")
                        .forceShow(sourceEntity));
                    if (!!!rb || rb?.canceled == true) {
                        return await securitySettings_playersWithPermissions_permission_any_UltraSecurityMode(sourceEntity, page, maxplayersperpage, search);
                    }
                    return await securitySettings_playersWithPermissions_permission_any_UltraSecurityMode(sourceEntity, undefined, maxplayersperpage, {
                        value: rb.formValues[0],
                        caseSensitive: rb.formValues[1],
                        searchNames: rb.formValues[2],
                        searchIds: rb.formValues[3],
                        searchLastOnlineDates: rb.formValues[4],
                        searchLastOnlineTimes: rb.formValues[5],
                    }); /*
        return await showMessage(sourceEntity as Player, undefined, "§cSorry, the search feature has not been implemented yet.", "Back", "Close").then(async r=>{
            if(r.selection==0){
                return await managePlayers(sourceEntity, page, maxplayersperpage, search);
            }else{
                return 0;
            }
        })*/
                }
                break;
            case 1:
                return await securitySettings_playersWithPermissions_permission_any_UltraSecurityMode(sourceEntity, Math.max(0, page - 1));
                break;
            case 2:
                return await securitySettings_playersWithPermissions_permission_any_UltraSecurityMode(sourceEntity, Math.min(numpages - 1, page + 1));
                break;
            case numplayersonpage + 3:
                return 1;
                break;
            case numplayersonpage + 4:
                return 0;
                break;
            default:
                if ((await managePlayers_managePlayer(sourceEntity, players[r.selection - 3])) == 1) {
                    return await securitySettings_playersWithPermissions_permission_any_UltraSecurityMode(sourceEntity, page, maxplayersperpage, search);
                }
                else {
                    return 0;
                }
        }
    })
        .catch(async (e) => {
        let formError = new MessageFormData();
        formError.body(e + e.stack);
        formError.title("Error");
        formError.button1("Done");
        formError.button2("Close");
        return await forceShow(formError, sourceEntity).then((r) => {
            return +(r.selection == 0);
        });
    }));
}
//# sourceMappingURL=securitySettings.js.map