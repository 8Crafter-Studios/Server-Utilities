import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData, ModalFormResponse, MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { ban_format_version } from "modules/ban/constants/ban_format_version";
import { ban } from "modules/ban/classes/ban";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { parseDurationRelative } from "modules/utilities/functions/parseDuration";
import moment from "moment";
/**
 * Displays a UI for managing bans on players.
 *
 * @param {loosePlayerType} sourceEntity - The player accessing the menu.
 * @param {number} [pagen] - The page of the menu to go to. Defaults to 0.
 * @param {number} [maxentriesperpage] - How many entries to show per page. Defaults to the value of {@linkcode config.ui.pages.maxBansPerManageBansPage}.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageBans(sourceEntity, pagen = 0, maxentriesperpage = config.ui.pages.maxBansPerManageBansPage ?? 9, search, cachedEntries) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    [].sort;
    var currentParameters = {
        player,
        pagen,
        maxentriesperpage,
        search,
        cachedEntries,
    };
    while (true) {
        const { player, pagen, maxentriesperpage, search, cachedEntries } = currentParameters;
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(player, "andexdb.accessManageBansUI") == false) {
                const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessManageBansUI", "Okay", "Cancel");
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
        let displayEntries = cachedEntries ?? [];
        if (cachedEntries === undefined) {
            displayEntries = [
                ...ban.getValidBansAutoRefresh().idBans.map((v) => [v, "id", "valid"]),
                ...ban.getExpiredBansNoRefresh().idBans.map((v) => [v, "id", "expired"]),
                ...ban.getValidBansNoRefresh().nameBans.map((v) => [v, "name", "valid"]),
                ...ban.getExpiredBansNoRefresh().nameBans.map((v) => [v, "name", "expired"]),
            ].filter((v) => !!search
                ? (search.searchNames !== false
                    ? search.caseSensitive == true
                        ? (v[0].originalPlayerName ?? v[0].playerName ?? "").includes(search.value)
                        : (v[0].originalPlayerName ?? v[0].playerName ?? "").toLowerCase().includes(search.value.toLowerCase())
                    : true) &&
                    (search.searchIds === true
                        ? search.caseSensitive == true
                            ? (v[0].originalPlayerId?.toString() ?? v[0].playerId?.toString() ?? "").includes(search.value)
                            : (v[0].originalPlayerId?.toString() ?? v[0].playerId?.toString() ?? "").toLowerCase().includes(search.value.toLowerCase())
                        : true)
                : true);
        }
        const numentries = displayEntries.length;
        form.title(`${customFormUICodes.action.titles.formStyles.gridMenu}${!!search ? "Search Results" : "Manage Bans"} ${Math.min(numentries, page * maxentriesperpage + 1)}-${Math.min(numentries, (page + 1) * maxentriesperpage)} of ${numentries}`);
        const numpages = Math.ceil(numentries / maxentriesperpage);
        if (!!search) {
            form.body(`${numentries === 0 ? "No results." : ""}\nSearching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive ?? false)}`);
        }
        else {
            form.body(`${numentries === 0 ? "There are currently no bans." : ""}`);
        }
        // Navigation and Filters
        form.button(customFormUICodes.action.buttons.positions.left_side_only + "Search", "textures/ui/spyglass_flat");
        form.button(customFormUICodes.action.buttons.positions.left_side_only +
            (page != 0 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
            "Previous Page", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.left_side_only +
            (numpages > 1 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
            "Go To Page", "textures/ui/page");
        form.button(customFormUICodes.action.buttons.positions.left_side_only +
            (page < numpages - 1 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
            "Next Page", "textures/ui/arrow_right");
        // Padding
        form.button("");
        form.button("");
        // Entries
        let displayEntriesB = displayEntries.slice(page * maxentriesperpage, (page + 1) * maxentriesperpage);
        displayEntriesB.forEach((v) => {
            switch (true) {
                case v[1] === "id" && v[2] === "valid":
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${v[0].originalPlayerName ?? v[0].playerId}\nValid - ID Ban`, "textures/ui/online_id");
                    break;
                case v[1] === "id" && v[2] === "expired":
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${v[0].originalPlayerName ?? v[0].playerId}\nExpired - ID Ban`, "textures/ui/Ping_Offline_Red_id");
                    break;
                case v[1] === "name" && v[2] === "valid":
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${v[0].playerName}\nValid - Name Ban`, "textures/ui/online_name");
                    break;
                case v[1] === "name" && v[2] === "expired":
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${v[0].playerName}\nExpired - Name Ban`, "textures/ui/Ping_Offline_Red_name");
            }
            // form.button(customFormUICodes.action.buttons.positions.main_only + v[0].originalPlayerId, "loading_spinner");
        });
        form.button(customFormUICodes.action.buttons.positions.right_side_only + "Add ID Ban", "textures/ui/hammer_l_id_ban");
        form.button(customFormUICodes.action.buttons.positions.right_side_only + "Add Name Ban", "textures/ui/hammer_l_name_ban");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
        try {
            const r = await forceShow(form, player);
            if (r.canceled)
                return 1;
            switch (["search", "previous", "go", "next", "", ""][r.selection] ??
                (!!displayEntriesB[r.selection - 6] ? "entry" : undefined) ??
                ["addIDBan", "addNameBan", "back", "close", "refresh"][r.selection - displayEntriesB.length - 6]) {
                case "search":
                    {
                        const r = await tryget(async () => await new ModalFormData()
                            .title("Search")
                            .textField("", "Search", search?.value ?? "")
                            .toggle("Case Sensitive", search?.caseSensitive ?? false)
                            .toggle("Search Player Names", search?.searchNames ?? true)
                            .toggle("Search Player IDs", search?.searchIds ?? true)
                            .submitButton("Search")
                            .forceShow(player));
                        if (!!!r || r.canceled == true) {
                            continue;
                        }
                        currentParameters = {
                            player,
                            pagen: undefined,
                            maxentriesperpage,
                            search: {
                                value: r.formValues[0],
                                caseSensitive: r.formValues[1],
                                searchNames: r.formValues[2],
                                searchIds: r.formValues[3],
                            },
                            cachedEntries: undefined,
                        };
                    }
                    continue;
                case "previous":
                    currentParameters = { player, pagen: Math.max(0, page - 1), maxentriesperpage, search, cachedEntries };
                    continue;
                case "go": {
                    const r = await tryget(async () => await new ModalFormData()
                        .title("Go To Page")
                        .textField(`Current Page: ${page + 1}\nPage # (Between 1 and ${numpages})`, "Page #")
                        .submitButton("Go To Page")
                        .forceShow(player));
                    currentParameters = {
                        player,
                        pagen: Math.max(1, Math.min(numpages, r.formValues?.[0]?.toNumber() ?? page + 1)) - 1,
                        maxentriesperpage,
                        search,
                        cachedEntries: displayEntries,
                    };
                    continue;
                }
                case "next":
                    currentParameters = { player, pagen: Math.min(numpages - 1, page + 1), maxentriesperpage, search, cachedEntries: displayEntries };
                    continue;
                case "entry":
                    if ((await manageBan(player, displayEntriesB[r.selection - 6][0])) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: undefined };
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "addIDBan":
                    if ((await addIDBan(player)) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: undefined };
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "addNameBan":
                    if ((await addNameBan(player)) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: undefined };
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "refresh":
                    currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: undefined };
                    continue;
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    throw new Error(`Invalid selection: ${r.selection}`);
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
 * Displays a UI for managing bans on specific player.
 *
 * @param {loosePlayerType} sourceEntity - The player accessing the menu.
 * @param {savedPlayer} target - The player to manage bans for.
 * @param {number} [pagen] - The page of the menu to go to. Defaults to 0.
 * @param {number} [maxentriesperpage] - How many entries to show per page. Defaults to the value of {@linkcode config.ui.pages.maxPlayersPerManagePlayersPage}.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageBansOnPlayer(sourceEntity, target, pagen = 0, maxentriesperpage = config.ui.pages.maxPlayersPerManagePlayersPage ?? 9, search, cachedEntries) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    [].sort;
    var currentParameters = {
        player,
        pagen,
        maxentriesperpage,
        search,
        cachedEntries,
    };
    while (true) {
        const { player, pagen, maxentriesperpage, search, cachedEntries } = currentParameters;
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(player, "andexdb.accessManageBansUI") == false) {
                const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessManageBansUI", "Okay", "Cancel");
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
        let displayEntries = cachedEntries ?? [];
        if (cachedEntries === undefined) {
            displayEntries = [
                ...target.idBans.valid.map((v) => [v, "id", "valid"]),
                ...target.idBans.expired.map((v) => [v, "id", "expired"]),
                ...target.nameBans.valid.map((v) => [v, "name", "valid"]),
                ...target.nameBans.expired.map((v) => [v, "name", "expired"]),
            ].filter((v) => !!search
                ? (search.searchNames !== false
                    ? search.caseSensitive == true
                        ? (v[0].originalPlayerName ?? v[0].playerName ?? "").includes(search.value)
                        : (v[0].originalPlayerName ?? v[0].playerName ?? "").toLowerCase().includes(search.value.toLowerCase())
                    : true) &&
                    (search.searchIds === true
                        ? search.caseSensitive == true
                            ? (v[0].originalPlayerId?.toString() ?? v[0].playerId?.toString() ?? "").includes(search.value)
                            : (v[0].originalPlayerId?.toString() ?? v[0].playerId?.toString() ?? "").toLowerCase().includes(search.value.toLowerCase())
                        : true)
                : true);
        }
        const numentries = displayEntries.length;
        form.title(`${customFormUICodes.action.titles.formStyles.gridMenu}${!!search ? "Search Results" : `Manage Bans for ${target.name}`} ${Math.min(numentries, page * maxentriesperpage + 1)}-${Math.min(numentries, (page + 1) * maxentriesperpage)} of ${numentries}`);
        const numpages = Math.ceil(numentries / maxentriesperpage);
        if (!!search) {
            form.body(`${numentries === 0 ? "No results." : ""}\nSearching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive ?? false)}`);
        }
        else {
            form.body(`${numentries === 0 ? "There are currently no bans." : ""}`);
        }
        // Navigation and Filters
        form.button(customFormUICodes.action.buttons.positions.left_side_only + "Search", "textures/ui/spyglass_flat");
        form.button(customFormUICodes.action.buttons.positions.left_side_only +
            (page != 0 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
            "Previous Page", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.left_side_only +
            (numpages > 1 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
            "Go To Page", "textures/ui/page");
        form.button(customFormUICodes.action.buttons.positions.left_side_only +
            (page < numpages - 1 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
            "Next Page", "textures/ui/arrow_right");
        // Padding
        form.button("");
        form.button("");
        // Entries
        let displayEntriesB = displayEntries.slice(page * maxentriesperpage, (page + 1) * maxentriesperpage);
        displayEntriesB.forEach((v) => {
            switch (true) {
                case v[1] === "id" && v[2] === "valid":
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${v[0].originalPlayerName ?? v[0].playerId}\nValid - ID Ban`, "textures/ui/online_id");
                    break;
                case v[1] === "id" && v[2] === "expired":
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${v[0].originalPlayerName ?? v[0].playerId}\nExpired - ID Ban`, "textures/ui/Ping_Offline_Red_id");
                    break;
                case v[1] === "name" && v[2] === "valid":
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${v[0].playerName}\nValid - Name Ban`, "textures/ui/online_name");
                    break;
                case v[1] === "name" && v[2] === "expired":
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${v[0].playerName}\nExpired - Name Ban`, "textures/ui/Ping_Offline_Red_name");
            }
            // form.button(customFormUICodes.action.buttons.positions.main_only + v[0].originalPlayerId, "loading_spinner");
        });
        form.button(customFormUICodes.action.buttons.positions.right_side_only + customFormUICodes.action.buttons.styles.display_icon_as_text + "Add ID Ban", "textures/ui/hammer_l_id_ban");
        form.button(customFormUICodes.action.buttons.positions.right_side_only + customFormUICodes.action.buttons.styles.display_icon_as_text + "Add Name Ban", "textures/ui/hammer_l_name_ban");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
        try {
            const r = await forceShow(form, player);
            if (r.canceled)
                return 1;
            switch (["search", "previous", "go", "next", "", ""][r.selection] ??
                (!!displayEntriesB[r.selection - 6] ? "entry" : undefined) ??
                ["addIDBan", "addNameBan", "back", "close", "refresh"][r.selection - displayEntriesB.length - 6]) {
                case "search":
                    {
                        const r = await tryget(async () => await new ModalFormData()
                            .title("Search")
                            .textField("", "Search", search?.value ?? "")
                            .toggle("Case Sensitive", search?.caseSensitive ?? false)
                            .toggle("Search Player Names", search?.searchNames ?? true)
                            .toggle("Search Player IDs", search?.searchIds ?? true)
                            .submitButton("Search")
                            .forceShow(player));
                        if (!!!r || r.canceled == true) {
                            continue;
                        }
                        currentParameters = {
                            player,
                            pagen: undefined,
                            maxentriesperpage,
                            search: {
                                value: r.formValues[0],
                                caseSensitive: r.formValues[1],
                                searchNames: r.formValues[2],
                                searchIds: r.formValues[3],
                            },
                            cachedEntries: undefined,
                        };
                    }
                    continue;
                case "previous":
                    currentParameters = { player, pagen: Math.max(0, page - 1), maxentriesperpage, search, cachedEntries };
                    continue;
                case "go": {
                    const r = await tryget(async () => await new ModalFormData()
                        .title("Go To Page")
                        .textField(`Current Page: ${page + 1}\nPage # (Between 1 and ${numpages})`, "Page #")
                        .submitButton("Go To Page")
                        .forceShow(player));
                    currentParameters = {
                        player,
                        pagen: Math.max(1, Math.min(numpages, r.formValues?.[0]?.toNumber() ?? page + 1)) - 1,
                        maxentriesperpage,
                        search,
                        cachedEntries: displayEntries,
                    };
                    continue;
                }
                case "next":
                    currentParameters = { player, pagen: Math.min(numpages - 1, page + 1), maxentriesperpage, search, cachedEntries: displayEntries };
                    continue;
                case "entry":
                    if ((await manageBan(player, displayEntriesB[r.selection - 6][0])) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: undefined };
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "addIDBan":
                    if ((await addIDBanOnPlayer(player, target)) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: undefined };
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "addNameBan":
                    if ((await addNameBanOnPlayer(player, target)) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: undefined };
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "refresh":
                    currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: undefined };
                    continue;
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    throw new Error(`Invalid selection: ${r.selection}`);
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
 * The menu for managing a ban on a player.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageBan(sourceEntity, ban) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            let form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.medium + "Manage Ban");
            const isPermanent = ban.isPermanent;
            const timeRemaining = isPermanent
                ? { days: Infinity, hours: Infinity, minutes: Infinity, seconds: Infinity, milliseconds: Infinity }
                : ban.timeRemainingString;
            const timeZone = player.timeZone;
            form.body(`§bFormat Version: §e${ban.format_version}\n§r§bBan Format Version: §e${ban.ban_format_version}\n§r§bBan Id: §6${ban.banId}\n§r§bType: §a${ban.type}\n§r§bBan Duration: §q${isPermanent ? "Permanent" : ban.banDate > ban.unbanDate ? "-" + moment(ban.banDate).preciseDiff(moment(ban.unbanDate)) : moment(ban.banDate).preciseDiff(moment(ban.unbanDate)) /* `${duration.days}d, ${duration.hours}h ${duration.minutes}m ${duration.seconds}s ${duration.milliseconds}ms` */}${isPermanent
                ? ""
                : `\n§r§bTime Remaining: §q${timeRemaining}`}\n§r§bBan Date: §q${formatDateTime(new Date(ban.banDate), timeZone) + " UTC" + (timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") + timeZone}${isPermanent
                ? ""
                : `\n§r§bUnban Date: §q${formatDateTime(new Date(ban.unbanDate), timeZone) + " UTC" + (timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") + timeZone}`}\n§r§b${ban.type == "id" ? "Player ID" : "Original Player ID"}: §6${ban.type == "id" ? ban.playerId : ban.originalPlayerId}\n§r§b${ban.type == "id" ? "Original Player Name" : "Player Name"}: §6${ban.type == "id" ? ban.originalPlayerName : ban.playerName}\n§r§bBanned By: §a${ban.bannedByName ?? "Unknown Name"}<${ban.bannedById ?? "Unknown ID"}>\n§r§bRemove After Ban Expires: §d${ban.removeAfterBanExpires}\n§r§bReason: §r§f${ban.reason}\n§r§b${
            /*JSON.stringify(banList[g.selection]).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")*/ ""}`);
            form.button(customFormUICodes.action.buttons.positions.main_only + "Unban", "textures/ui/trash_default");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch (["unban", "back", "close"][r.selection]) {
                case "unban":
                    switch (await unbanPlayer(player, ban)) {
                        case 0:
                            return 0;
                        case 1:
                            continue;
                        case 2:
                            return 1;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
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
 * Shows a UI for unbanning a player.
 *
 * This menu prompts players to confirm the unbanning of the specified player, and unbans they player if they confirm.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1 | 2>} A promise that resolves to `0` if the previous menu should be closed, `1` if the previous menu should be reopened, or `2` if the menu before the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function unbanPlayer(sourceEntity, selectedBan) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(player, "andexdb.unbanPlayers") == false) {
                const r = await showMessage(player, "Access Denied (403)", "You do not have permission to unban players. You need the following permission to unban players: andexdb.unbanPlayers", "Okay", "Cancel");
                if (r.canceled || r.selection === 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
        const r = await showMessage(player, "Are you sure?", `Are you sure you want to unban ${selectedBan.playerName ?? selectedBan.originalPlayerName ?? "Unknown Name"}<${selectedBan.playerId ?? selectedBan.originalPlayerId ?? "Unknown ID"}>?`, "Cancel", "Unban");
        if (r.canceled)
            return 1;
        switch (["cancel", "unban"][r.selection]) {
            case "cancel": {
                return ((await showMessage(player, "Unban Canceled", `The unban of ${selectedBan.playerName ?? selectedBan.originalPlayerName ?? "Unknown Name"}<${selectedBan.playerId ?? selectedBan.originalPlayerId ?? "Unknown ID"}> has been sucessfully canceled.`, "Back", "Close")).selection !== 1).toNumber();
            }
            case "unban": {
                selectedBan.remove();
                return ((await showMessage(player, "Player Unbanned", `${selectedBan.playerName ?? selectedBan.originalPlayerName ?? "Unknown Name"}<${selectedBan.playerId ?? selectedBan.originalPlayerId ?? "Unknown ID"}> has been sucessfully unbanned.`, "Back", "Close")).selection !== 1).toNumber() * 2;
            }
        }
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
export async function addIDBan(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    let defaultPlayerUUID = "";
    let defaultBanTime = "";
    let defaultReason = "";
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.banPlayers") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.banPlayers", "Okay", "Cancel");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            let form = new ModalFormData();
            form.title(`${customFormUICodes.modal.titles.formStyles.medium}Add ID Ban`);
            form.textField("Player UUID\nThis is the uuid of the player. ", "Integer", defaultPlayerUUID);
            form.textField("Ban Time (Time String, ex. 5y 7mo 6d 5h 3m 1s 17ms)\nLeave blank to make the ban duration permanent.", "permanent", defaultBanTime);
            form.textField("Reason", "§cYOU HAVE BEEN BANNED BY THE BAN HAMMER", defaultReason);
            form.submitButton("Ban");
            const r = await forceShow(form, player);
            if (r.canceled) {
                return 1;
            }
            defaultPlayerUUID = r.formValues[0];
            defaultBanTime = r.formValues[1];
            defaultReason = r.formValues[2];
            const banDate = Date.now();
            const unbanDate = r.formValues[1].trim() === "" ? Infinity : parseDurationRelative(r.formValues[1], banDate) + Date.now();
            if (Number.isNaN(unbanDate)) {
                if ((await showMessage(player, "Invalid Ban Time", "The ban time you entered is invalid. Please try again.\nHere is an example: 5y 7mo 6d 5h 3m 1s 17ms.", "Back", "Cancel")).selection !== 1) {
                    continue;
                }
                else {
                    return 1;
                }
            }
            ban.saveBan({
                removeAfterBanExpires: false,
                ban_format_version: ban_format_version,
                banDate,
                playerId: r.formValues[0],
                originalPlayerName: undefined,
                type: "id",
                bannedById: player.id,
                bannedByName: player.name ?? player.nameTag,
                banId: "banId:" + Date.now() + ":" + r.formValues[0],
                unbanDate,
                format_version: format_version,
                reason: r.formValues[2] === "" ? "§cYOU HAVE BEEN BANNED BY THE BAN HAMMER" : r.formValues[2],
                hasAdvancedReason: false,
            });
            ban.refreshBans();
            return 1;
        }
        catch (e) {
            if (e instanceof SyntaxError && e.message.startsWith("Unknown time unit: ")) {
                if ((await showMessage(player, "Syntax Error", `${e}${e?.stack}`, "Back", "Cancel")).selection !== 1) {
                    continue;
                }
                else {
                    return 1;
                }
            }
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
export async function addNameBan(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    let defaultPlayerName = "";
    let defaultBanTime = "";
    let defaultReason = "";
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.banPlayers") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.banPlayers", "Okay", "Cancel");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            let form = new ModalFormData();
            form.title(`${customFormUICodes.modal.titles.formStyles.medium}Add Name Ban`);
            form.textField("Player Name\nThis is the name of the player. ", "string", defaultPlayerName);
            form.textField("Ban Time (Time String, ex. 5y 7mo 6d 5h 3m 1s 17ms)\nLeave blank to make the ban duration permanent.", "permanent", defaultBanTime);
            form.textField("Reason", "§cYOU HAVE BEEN BANNED BY THE BAN HAMMER", defaultReason);
            form.submitButton("Ban");
            const r = await forceShow(form, player);
            if (r.canceled) {
                return 1;
            }
            defaultPlayerName = r.formValues[0];
            defaultBanTime = r.formValues[1];
            defaultReason = r.formValues[2];
            const banDate = Date.now();
            const unbanDate = r.formValues[1].trim() === "" ? Infinity : parseDurationRelative(r.formValues[1], banDate) + Date.now();
            if (Number.isNaN(unbanDate)) {
                if ((await showMessage(player, "Invalid Ban Time", "The ban time you entered is invalid. Please try again.\nHere is an example: 5y 7mo 6d 5h 3m 1s 17ms.", "Back", "Cancel")).selection !== 1) {
                    continue;
                }
                else {
                    return 1;
                }
            }
            ban.saveBan({
                removeAfterBanExpires: false,
                ban_format_version: ban_format_version,
                banDate,
                originalPlayerId: undefined,
                playerName: r.formValues[0],
                type: "name",
                bannedById: player.id,
                bannedByName: player.name ?? player.nameTag,
                banId: "ban:" + Date.now() + ":" + r.formValues[0],
                unbanDate,
                format_version: format_version,
                reason: r.formValues[2] === "" ? "§cYOU HAVE BEEN BANNED BY THE BAN HAMMER" : r.formValues[2],
                hasAdvancedReason: false,
            });
            ban.refreshBans();
            return 1;
        }
        catch (e) {
            if (e instanceof SyntaxError && e.message.startsWith("Unknown time unit: ")) {
                if ((await showMessage(player, "Syntax Error", `${e}${e?.stack}`, "Back", "Cancel")).selection !== 1) {
                    continue;
                }
                else {
                    return 1;
                }
            }
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
export async function addIDBanOnPlayer(sourceEntity, targetDetails) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    let defaultBanTime = "";
    let defaultReason = "";
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.banPlayers") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.banPlayers", "Okay", "Cancel");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            let form = new ModalFormData();
            form.title(`${customFormUICodes.modal.titles.formStyles.medium}Add ID Ban on ${targetDetails.name ?? targetDetails.id}`);
            form.textField("Ban Time (Time String, ex. 5y 7mo 6d 5h 3m 1s 17ms)\nLeave blank to make the ban duration permanent.", "permanent", defaultBanTime);
            form.textField("Reason", "§cYOU HAVE BEEN BANNED BY THE BAN HAMMER", defaultReason);
            form.submitButton("Ban");
            const r = await forceShow(form, player);
            if (r.canceled) {
                return 1;
            }
            defaultBanTime = r.formValues[0];
            defaultReason = r.formValues[1];
            const banDate = Date.now();
            const unbanDate = r.formValues[0].trim() === "" ? Infinity : parseDurationRelative(r.formValues[0], banDate) + Date.now();
            if (Number.isNaN(unbanDate)) {
                if ((await showMessage(player, "Invalid Ban Time", "The ban time you entered is invalid. Please try again.\nHere is an example: 5y 7mo 6d 5h 3m 1s 17ms.", "Back", "Cancel")).selection !== 1) {
                    continue;
                }
                else {
                    return 1;
                }
            }
            ban.saveBan({
                removeAfterBanExpires: false,
                ban_format_version: ban_format_version,
                banDate,
                playerId: targetDetails.id,
                originalPlayerName: targetDetails.name,
                type: "id",
                bannedById: player.id,
                bannedByName: player.name ?? player.nameTag,
                banId: "banId:" + Date.now() + ":" + targetDetails.id,
                unbanDate,
                format_version: format_version,
                reason: r.formValues[1] === "" ? "§cYOU HAVE BEEN BANNED BY THE BAN HAMMER" : r.formValues[1],
                hasAdvancedReason: false,
            });
            ban.refreshBans();
            return 1;
        }
        catch (e) {
            if (e instanceof SyntaxError && e.message.startsWith("Unknown time unit: ")) {
                if ((await showMessage(player, "Syntax Error", `${e}${e?.stack}`, "Back", "Cancel")).selection !== 1) {
                    continue;
                }
                else {
                    return 1;
                }
            }
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
export async function addNameBanOnPlayer(sourceEntity, targetDetails) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    let defaultBanTime = "";
    let defaultReason = "";
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.banPlayers") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.banPlayers", "Okay", "Cancel");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            let form = new ModalFormData();
            form.title(`${customFormUICodes.modal.titles.formStyles.medium}Add Name Ban on ${targetDetails.name ?? targetDetails.id}`);
            form.textField("Ban Time (Time String, ex. 5y 7mo 6d 5h 3m 1s 17ms)\nLeave blank to make the ban duration permanent.", "permanent", defaultBanTime);
            form.textField("Reason", "§cYOU HAVE BEEN BANNED BY THE BAN HAMMER", defaultReason);
            form.submitButton("Ban");
            const r = await forceShow(form, player);
            if (r.canceled) {
                return 1;
            }
            defaultBanTime = r.formValues[0];
            defaultReason = r.formValues[1];
            const banDate = Date.now();
            const unbanDate = r.formValues[0].trim() === "" ? Infinity : parseDurationRelative(r.formValues[0], banDate) + Date.now();
            if (Number.isNaN(unbanDate)) {
                if ((await showMessage(player, "Invalid Ban Time", "The ban time you entered is invalid. Please try again.\nHere is an example: 5y 7mo 6d 5h 3m 1s 17ms.", "Back", "Cancel")).selection !== 1) {
                    continue;
                }
                else {
                    return 1;
                }
            }
            ban.saveBan({
                removeAfterBanExpires: false,
                ban_format_version: ban_format_version,
                banDate,
                originalPlayerId: targetDetails.id,
                playerName: targetDetails.name,
                type: "name",
                bannedById: player.id,
                bannedByName: player.name ?? player.nameTag,
                banId: "ban:" + Date.now() + ":" + targetDetails.name,
                unbanDate,
                format_version: format_version,
                reason: r.formValues[1] === "" ? "§cYOU HAVE BEEN BANNED BY THE BAN HAMMER" : r.formValues[1],
                hasAdvancedReason: false,
            });
            ban.refreshBans();
            return 1;
        }
        catch (e) {
            if (e instanceof SyntaxError && e.message.startsWith("Unknown time unit: ")) {
                if ((await showMessage(player, "Syntax Error", `${e}${e?.stack}`, "Back", "Cancel")).selection !== 1) {
                    continue;
                }
                else {
                    return 1;
                }
            }
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
//# sourceMappingURL=manageBans.js.map