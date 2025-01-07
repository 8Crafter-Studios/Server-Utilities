import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { ban } from "modules/ban/classes/ban";
import { managePlayers_managePlayer } from "./managePlayers_managePlayer";
import { securityVariables, selectSecurityMode, ultraSecurityModeDebug } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
export async function securitySettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSecuritySettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSecuritySettings", "Go Back", "Close");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form = new ActionFormData();
    let players = world.getPlayers();
    form.title("Security");
    form.body("Choose menu to open. ");
    form.button("View Players With Permissions", "textures/ui/permissions_op_crown");
    form.button("Settings", "textures/ui/icon_setting");
    form.button("Back", "textures/ui/arrow_left"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return;
        let response = r.selection;
        switch (response) {
            case 0:
                if ((await (securityVariables.ultraSecurityModeEnabled ? securitySettings_playersWithPermissions_UltraSecurityMode : securitySettings_playersWithPermissions)(sourceEntity)) == 1) {
                    return await securitySettings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 1:
                if ((await securitySettings_settingsSelection(sourceEntity)) == 1) {
                    return await securitySettings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            default:
                return 1;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
    });
}
export async function securitySettings_settingsSelection(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSecuritySettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSecuritySettings", "Go Back", "Close");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form = new ActionFormData();
    let players = world.getPlayers();
    form.title("Security Settings");
    form.body("");
    form.button("Secuity Mode", "textures/ui/absorption_effect");
    form.button("Settings", "textures/ui/icon_setting");
    if (securityVariables.ultraSecurityModeEnabled) {
        form.button("Ultra Security Mode Settings", "textures/ui/icon_setting");
        form.button("Ultra Security Mode Debug", "textures/ui/icon_setting");
    }
    ;
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return;
        let response = r.selection;
        switch (response) {
            case 0:
                if ((await selectSecurityMode(sourceEntity)) == 1) {
                    return await securitySettings_settingsSelection(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 1: /*
                if((await mainSecuritySettings(sourceEntity))==1){
                    return await securitySettings_settingsSelection(sourceEntity)
                }else{
                    return 0;
                } */
                return 1;
                break;
            case 2: /*
                if(securityVariables.ultraSecurityModeEnabled){
                    if((await ultraSecurityModeSettings(sourceEntity as Player))==1){
                        return await securitySettings_settingsSelection(sourceEntity)
                    }else{
                        return 0;
                    }
                }else{
                    return 1;
                } */
                return 1;
                break;
            case 3:
                if (securityVariables.ultraSecurityModeEnabled) {
                    if ((await ultraSecurityModeDebug(sourceEntity)) == 1) {
                        return await securitySettings_settingsSelection(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    return 0;
                }
                break;
            case 4:
                return 1;
                break;
            case 5:
                return 0;
                break;
            default:
                return 1;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
    });
}
export async function securitySettings_playersWithPermissions(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
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
    form.title("Players With Permissions");
    form.body("Choose menu to open. ");
    form.button("canUseChatCommands", "textures/ui/permissions_op_crown");
    form.button("canUseScriptEval", "textures/ui/permissions_op_crown");
    form.button("canUseCommands", "textures/ui/permissions_op_crown");
    form.button("canBypassPropectedAreas", "textures/ui/permissions_op_crown");
    form.button("getAllChatCommands", "textures/ui/permissions_op_crown");
    form.button("admin", "textures/ui/permissions_op_crown");
    form.button("Back", "textures/ui/arrow_left"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return;
        let response = r.selection;
        switch (response) {
            case 0:
                if ((await securitySettings_playersWithPermissions_permission(sourceEntity, ["canUseChatCommands", true])) == 1) {
                    return await securitySettings_playersWithPermissions(sourceEntity);
                }
                ;
                break;
            case 1:
                if ((await securitySettings_playersWithPermissions_permission(sourceEntity, ["canUseScriptEval", true])) == 1) {
                    return await securitySettings_playersWithPermissions(sourceEntity);
                }
                ;
                break;
            case 2:
                if ((await securitySettings_playersWithPermissions_permission(sourceEntity, ["canUseCommands", true])) == 1) {
                    return await securitySettings_playersWithPermissions(sourceEntity);
                }
                ;
                break;
            case 3:
                if ((await securitySettings_playersWithPermissions_permission(sourceEntity, ["canBypassProtectedAreas", true])) == 1) {
                    return await securitySettings_playersWithPermissions(sourceEntity);
                }
                ;
                break;
            case 4:
                if ((await securitySettings_playersWithPermissions_permission(sourceEntity, ["getAllChatCommands", true])) == 1) {
                    return await securitySettings_playersWithPermissions(sourceEntity);
                }
                ;
                break;
            case 5:
                if ((await securitySettings_playersWithPermissions_permission(sourceEntity, ["admin", true])) == 1) {
                    return await securitySettings_playersWithPermissions(sourceEntity);
                }
                ;
                break;
            default:
                return 1;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
    });
}
export async function securitySettings_playersWithPermissions_permission(sourceEntitya, permission, pagen = 0, maxplayersperpage = config.ui.pages
    .maxPlayersPerManagePlayersPage ?? 10, search) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
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
        .filter(p => p.playerPermissions?.[permission[0]] == permission[1])
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`.includes(search.value)
            : `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
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
        ...savedPlayer
            .getSavedPlayersAlphabeticalOrder()
            .filter((_) => _.isOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && _.isBanned)
            .sort((a, b) => b.lastOnline - a.lastOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && !_.isBanned)
            .sort((a, b) => b.lastOnline - a.lastOnline),
    ]
        .filter(p => p.playerPermissions?.[permission[0]] == permission[1])
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`.includes(search.value)
            : `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
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
        form.button(`${p.name}\n${ban.testForBannedPlayer(p)
            ? "Banned"
            : p.isOnline
                ? "Online"
                : new Date(p.lastOnline).formatDateTime(sourceEntity.timeZone)}`, p.isOnline
            ? "textures/ui/online"
            : p.isBanned
                ? "textures/ui/Ping_Offline_Red_Dark"
                : "textures/ui/offline");
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
                        searchLastOnlineDates: rb
                            .formValues[4],
                        searchLastOnlineTimes: rb
                            .formValues[5],
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
export async function securitySettings_playersWithPermissions_UltraSecurityMode(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
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
    form.title("Players With Permissions");
    form.body("Choose menu to open. ");
    form.button("Any Permissions", "textures/ui/permissions_op_crown");
    Object.keys(permissionType).sort().forEach((p) => {
        form.button(p, "textures/ui/permissions_op_crown");
    });
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        let response = r.selection;
        switch (response) {
            case 0:
                if ((await securitySettings_playersWithPermissions_permission_any_UltraSecurityMode(sourceEntity)) == 1) {
                    return await securitySettings_playersWithPermissions_UltraSecurityMode(sourceEntity);
                }
                ;
                break;
            case Object.keys(permissionType).length + 1:
                return 1;
                break;
            case Object.keys(permissionType).length + 2:
                return 0;
                break;
            default:
                if ((await securitySettings_playersWithPermissions_permission_UltraSecurityMode(sourceEntity, Object.keys(permissionType).sort()[r.selection])) == 1) {
                    return await securitySettings_playersWithPermissions_UltraSecurityMode(sourceEntity);
                }
                ;
                break;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
    });
}
export async function securitySettings_playersWithPermissions_permission_UltraSecurityMode(sourceEntitya, permission, pagen = 0, maxplayersperpage = config.ui.pages
    .maxPlayersPerManagePlayersPage ?? 10, search) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
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
    const perm = this.convertPermissionTypeToObject(permission);
    let form = new ActionFormData();
    const page = Math.max(0, pagen);
    const savedPlayers = savedPlayer
        .getSavedPlayers()
        .filter(p => securityVariables.playerPermissions[p.id]?.includes(perm))
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`.includes(search.value)
            : `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
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
        ...savedPlayer
            .getSavedPlayersAlphabeticalOrder()
            .filter((_) => _.isOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && _.isBanned)
            .sort((a, b) => b.lastOnline - a.lastOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && !_.isBanned)
            .sort((a, b) => b.lastOnline - a.lastOnline),
    ]
        .filter(p => securityVariables.playerPermissions[p.id]?.includes(perm))
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`.includes(search.value)
            : `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
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
        form.button(`${p.name}\n${ban.testForBannedPlayer(p)
            ? "Banned"
            : p.isOnline
                ? "Online"
                : new Date(p.lastOnline).formatDateTime(sourceEntity.timeZone)}`, p.isOnline
            ? "textures/ui/online"
            : p.isBanned
                ? "textures/ui/Ping_Offline_Red_Dark"
                : "textures/ui/offline");
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
                        searchLastOnlineDates: rb
                            .formValues[4],
                        searchLastOnlineTimes: rb
                            .formValues[5],
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
                return await securitySettings_playersWithPermissions_permission_UltraSecurityMode(sourceEntity, permission, Math.max(0, page - 1));
                break;
            case 2:
                return await securitySettings_playersWithPermissions_permission_UltraSecurityMode(sourceEntity, permission, Math.min(numpages - 1, page + 1));
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
export async function securitySettings_playersWithPermissions_permission_any_UltraSecurityMode(sourceEntitya, pagen = 0, maxplayersperpage = config.ui.pages
    .maxPlayersPerManagePlayersPage ?? 10, search) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
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
        .filter(p => securityVariables.playerPermissions[p.id]?.length > 0)
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`.includes(search.value)
            : `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
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
        ...savedPlayer
            .getSavedPlayersAlphabeticalOrder()
            .filter((_) => _.isOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && _.isBanned)
            .sort((a, b) => b.lastOnline - a.lastOnline),
        ...savedPlayer
            .getSavedPlayers()
            .filter((_) => !_.isOnline && !_.isBanned)
            .sort((a, b) => b.lastOnline - a.lastOnline),
    ]
        .filter(p => securityVariables.playerPermissions[p.id]?.length > 0)
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
                        ? "toTimezoneDateTime"
                        : search.searchLastOnlineDates
                            ? "toTimezoneDate"
                            : search.searchLastOnlineTimes
                                ? "toTimezoneTime"
                                : "toTimezoneDateTime"]()
                    : ""}`.includes(search.value)
            : `${(search.searchNames ?? true) ? p.name + "\n" : ""}${(search.searchIds ?? true) ? p.id + "\n" : ""}${p.isOnline
                ? ""
                : (search.searchLastOnlineDates ?? false) ||
                    (search.searchLastOnlineTimes ?? false)
                    ? new Date(p.lastOnline)
                        .toTimezone(sourceEntity.timeZone)[search.searchLastOnlineDates &&
                        search.searchLastOnlineTimes
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
        form.button(`${p.name}\n${ban.testForBannedPlayer(p)
            ? "Banned"
            : p.isOnline
                ? "Online"
                : new Date(p.lastOnline).formatDateTime(sourceEntity.timeZone)}`, p.isOnline
            ? "textures/ui/online"
            : p.isBanned
                ? "textures/ui/Ping_Offline_Red_Dark"
                : "textures/ui/offline");
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
                        searchLastOnlineDates: rb
                            .formValues[4],
                        searchLastOnlineTimes: rb
                            .formValues[5],
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