import { world } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { ModerationActions } from "modules/moderation/classes/ModerationActions";
import { showMessage } from "modules/utilities/functions/showMessage";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { parseDurationRelative } from "modules/utilities/functions/parseDuration";
import moment from "moment";
/**
 * Displays a UI for managing mutes on players.
 *
 * @param {loosePlayerType} sourceEntity - The player accessing the menu.
 * @param {number} [pagen] - The page of the menu to go to. Defaults to 0.
 * @param {number} [maxentriesperpage] - How many entries to show per page. Defaults to the value of {@linkcode config.ui.pages.maxPlayersPerManagePlayersPage}.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageMutes(sourceEntity, pagen = 0, maxentriesperpage = config.ui.pages.maxPlayersPerManagePlayersPage ?? 9, search, cachedEntries) {
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
            if (securityVariables.testPlayerForPermission(player, "andexdb.accessManageMutesUI") == false) {
                const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessManageMutesUI", "Okay", "Cancel");
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
            const onlinePlayerNames = world.getAllPlayers().map((v) => v.name);
            displayEntries = Object.keys(ModerationActions.getAllMutes())
                .map((v) => [v, onlinePlayerNames.includes(v) ? "online" : "offline"])
                .filter((v) => !!search ? (search.caseSensitive == true ? v[0].includes(search.value) : v[0].toLowerCase().includes(search.value.toLowerCase())) : true)
                .sort((a, b) => {
                return a[1] == "online" ? -1 : b[1] == "online" ? 1 : a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
            });
        }
        const numentries = displayEntries.length;
        form.title(`${customFormUICodes.action.titles.formStyles.gridMenu}${!!search ? "Search Results" : "Manage Mutes"} ${Math.min(numentries, page * maxentriesperpage + 1)}-${Math.min(numentries, (page + 1) * maxentriesperpage)} of ${numentries}`);
        const numpages = Math.ceil(numentries / maxentriesperpage);
        if (!!search) {
            form.body(`${numentries === 0 ? "No results." : ""}\nSearching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive ?? false)}`);
        }
        else {
            form.body(`${numentries === 0 ? "There are currently no mutes." : ""}`);
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
            if (v[1] == "online") {
                form.button(`${customFormUICodes.action.buttons.positions.main_only}${v[0]}\nOnline`, "textures/ui/online");
            }
            else {
                form.button(`${customFormUICodes.action.buttons.positions.main_only}${v[0]}\nOffline`, "textures/ui/offline");
            }
        });
        form.button(customFormUICodes.action.buttons.positions.right_side_only + "Mute Player", "textures/ui/mute_on");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
        try {
            const r = await forceShow(form, player);
            if (r.canceled)
                return 1;
            switch (["search", "previous", "go", "next", "", ""][r.selection] ??
                (!!displayEntriesB[r.selection - 6] ? "entry" : undefined) ??
                ["mutePlayer", "back", "close", "refresh"][r.selection - displayEntriesB.length - 6]) {
                case "search":
                    {
                        const r = await tryget(async () => await new ModalFormData()
                            .title("Search")
                            .textField("", "Search", search?.value ?? "")
                            .toggle("Case Sensitive", search?.caseSensitive ?? false)
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
                    if ((await manageMute(player, [
                        displayEntriesB[r.selection - 6][0],
                        ModerationActions.getMuteData(displayEntriesB[r.selection - 6][0]),
                    ])) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: undefined };
                        continue;
                    }
                    else {
                        return 0;
                    }
                case "mutePlayer":
                    if ((await addMute(player)) === 1) {
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
 * The menu for managing a mute on a player.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageMute(sourceEntity, mute) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            let form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.medium + "Manage Mute");
            const isPermanent = mute[1].unmuteDate === null;
            const timeRemaining = isPermanent
                ? { days: Infinity, hours: Infinity, minutes: Infinity, seconds: Infinity, milliseconds: Infinity }
                : ModerationActions.playerTimeUntilUnmuteFormatted(mute[0]);
            const timeZone = player.timeZone;
            form.body(`§bPlayer Name: §a${mute[0]}\n§r§bMute Duration: §q${isPermanent
                ? "Permanent"
                : mute[1].muteDate > mute[1].unmuteDate
                    ? "-" + moment(mute[1].muteDate).preciseDiff(moment(mute[1].unmuteDate))
                    : moment(mute[1].muteDate).preciseDiff(moment(mute[1].unmuteDate)) /* `${duration.days}d, ${duration.hours}h ${duration.minutes}m ${duration.seconds}s ${duration.milliseconds}ms` */}${isPermanent ? "" : `\n§r§bTime Remaining: §q${timeRemaining}`}\n§r§bMute Date: §q${formatDateTime(new Date(mute[1].muteDate), timeZone) + " UTC" + (timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") + timeZone}${isPermanent
                ? ""
                : `\n§r§bUnmute Date: §q${formatDateTime(new Date(mute[1].unmuteDate), timeZone) + " UTC" + (timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") + timeZone}`}\n§r§bMuted By: §a${mute[1].mutedByName ?? "Unknown Name"}<${mute[1].mutedById ?? "Unknown ID"}>\n§r§bReason: §r§f${mute[1].reason ?? "No reason provided."}`);
            form.button(customFormUICodes.action.buttons.positions.main_only + "Unmute", "textures/ui/trash_default");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled)
                return 1;
            switch (["unmute", "back", "close"][r.selection]) {
                case "unmute":
                    switch (await unmutePlayer(player, mute[0])) {
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
 * Shows a UI for unmuting a player.
 *
 * This menu prompts players to confirm the unmuting of the specified player, and unmutes they player if they confirm.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1 | 2>} A promise that resolves to `0` if the previous menu should be closed, `1` if the previous menu should be reopened, or `2` if the menu before the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function unmutePlayer(sourceEntity, playerName) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(player, "andexdb.unmutePlayers") == false) {
                const r = await showMessage(player, "Access Denied (403)", "You do not have permission to unmute players. You need the following permission to unmute players: andexdb.unmutePlayers", "Okay", "Cancel");
                if (r.canceled || r.selection === 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
        const r = await showMessage(player, "Are you sure?", `Are you sure you want to unmute ${playerName}?`, "Cancel", "Unmute");
        if (r.canceled)
            return 1;
        switch (["cancel", "unmute"][r.selection]) {
            case "cancel": {
                return ((await showMessage(player, "Unmute Canceled", `The unmute of ${playerName} has been sucessfully canceled.`, "Back", "Close")).selection !== 1).toNumber();
            }
            case "unmute": {
                ModerationActions.unmutePlayer(playerName);
                return (((await showMessage(player, "Player Unmuted", `${playerName} has been sucessfully unmuted.`, "Back", "Close")).selection !== 1).toNumber() * 2);
            }
        }
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
export async function addMute(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    let defaultPlayerName = "";
    let defaultMuteDuration = "";
    let defaultReason = "";
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.mutePlayers") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.mutePlayers", "Okay", "Cancel");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            let form = new ModalFormData();
            form.title(`${customFormUICodes.modal.titles.formStyles.medium}Mute Player`);
            form.textField("Player Name\nThis is the name of the player. ", "string", defaultPlayerName);
            form.textField("Mute Duration (Time String, ex. 5y 7mo 6d 5h 3m 1s 17ms)\nLeave blank to make the mute duration permanent.", "permanent", defaultMuteDuration);
            form.textField("Reason", "Reason", defaultReason);
            form.submitButton("Mute");
            const r = await forceShow(form, player);
            if (r.canceled) {
                return 1;
            }
            defaultPlayerName = r.formValues[0];
            defaultMuteDuration = r.formValues[1];
            defaultReason = r.formValues[2];
            const muteDate = Date.now();
            const unmuteDate = r.formValues[1].trim() === "" ? null : parseDurationRelative(r.formValues[1], muteDate) + Date.now();
            if (Number.isNaN(unmuteDate)) {
                if ((await showMessage(player, "Invalid Mute Duration", "The mute duration you entered is invalid. Please try again.\nHere is an example: 5y 7mo 6d 5h 3m 1s 17ms.", "Back", "Cancel")).selection !== 1) {
                    continue;
                }
                else {
                    return 1;
                }
            }
            ModerationActions.mutePlayer(r.formValues[0], {
                muteDate,
                mutedById: player.id,
                mutedByName: player.name ?? player.nameTag,
                unmuteDate,
                reason: r.formValues[2] === "" ? null : r.formValues[2],
            });
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
export async function addMuteOnPlayer(sourceEntity, targetName) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    let defaultMuteDuration = "";
    let defaultReason = "";
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.mutePlayers") == false) {
                    const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.mutePlayers", "Okay", "Cancel");
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            let form = new ModalFormData();
            form.title(`${customFormUICodes.modal.titles.formStyles.medium}Mute ${targetName}`);
            form.textField("Mute Duration (Time String, ex. 5y 7mo 6d 5h 3m 1s 17ms)\nLeave blank to make the mute duration permanent.", "permanent", defaultMuteDuration);
            form.textField("Reason", "Reason", defaultReason);
            form.submitButton("Mute");
            const r = await forceShow(form, player);
            if (r.canceled) {
                return 1;
            }
            defaultMuteDuration = r.formValues[0];
            defaultReason = r.formValues[1];
            const muteDate = Date.now();
            const unmuteDate = r.formValues[0].trim() === "" ? Infinity : parseDurationRelative(r.formValues[0], muteDate) + Date.now();
            if (Number.isNaN(unmuteDate)) {
                if ((await showMessage(player, "Invalid Mute Duration", "The mute duration you entered is invalid. Please try again.\nHere is an example: 5y 7mo 6d 5h 3m 1s 17ms.", "Back", "Cancel")).selection !== 1) {
                    continue;
                }
                else {
                    return 1;
                }
            }
            ModerationActions.mutePlayer(targetName, {
                muteDate,
                mutedById: player.id,
                mutedByName: player.name ?? player.nameTag,
                unmuteDate,
                reason: r.formValues[1] === "" ? null : r.formValues[1],
            });
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
//# sourceMappingURL=manageMutes.js.map