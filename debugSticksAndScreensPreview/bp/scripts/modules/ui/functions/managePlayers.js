import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { managePlayers_managePlayer } from "./managePlayers_managePlayer";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { customFormUICodes } from "../constants/customFormUICodes";
import { manageBans } from "./manageBans";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
export async function managePlayers(sourceEntity, pagen = 0, maxplayersperpage = config.ui.pages.maxPlayersPerManagePlayersPage ?? 9, search, cachedPlayers) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(player, "andexdb.accessManagePlayersUI") == false) {
            const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessManagePlayersUI", "Okay", "Cancel");
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
    let displayPlayers = cachedPlayers ?? [[], [], []];
    if (cachedPlayers === undefined) {
        let savedPlayers = savedPlayer.getSavedPlayersAlphabeticalOrder();
        if (!!search) {
            if (search.caseSensitive) {
                savedPlayers = savedPlayers.filter((p) => `${search.searchNames ?? true ? p.name + "\n" : ""}${search.searchIds ?? true ? p.id + "\n" : ""}${p.isOnline
                    ? ""
                    : (search.searchLastOnlineDates ?? false) || (search.searchLastOnlineTimes ?? false)
                        ? new Date(p.lastOnline)
                            .toTimezone(player.timeZone)[search.searchLastOnlineDates && search.searchLastOnlineTimes
                            ? "toTimezoneDateTime"
                            : search.searchLastOnlineDates
                                ? "toTimezoneDate"
                                : search.searchLastOnlineTimes
                                    ? "toTimezoneTime"
                                    : "toTimezoneDateTime"]()
                        : ""}`.includes(search.value));
            }
            else {
                savedPlayers = savedPlayers.filter((p) => `${search.searchNames ?? true ? p.name + "\n" : ""}${search.searchIds ?? true ? p.id + "\n" : ""}${p.isOnline
                    ? ""
                    : (search.searchLastOnlineDates ?? false) || (search.searchLastOnlineTimes ?? false)
                        ? new Date(p.lastOnline)
                            .toTimezone(player.timeZone)[search.searchLastOnlineDates && search.searchLastOnlineTimes
                            ? "toTimezoneDateTime"
                            : search.searchLastOnlineDates
                                ? "toTimezoneDate"
                                : search.searchLastOnlineTimes
                                    ? "toTimezoneTime"
                                    : "toTimezoneDateTime"]()
                        : ""}`
                    .toLowerCase()
                    .includes(search.value.toLowerCase()));
            }
        }
        // Players
        displayPlayers = [
            savedPlayers.filter((_) => _.isOnline),
            savedPlayers.filter((_) => !_.isOnline && !_.isBanned).sort((a, b) => b.lastOnline - a.lastOnline),
            savedPlayers.filter((_) => !_.isOnline && _.isBanned).sort((a, b) => b.lastOnline - a.lastOnline),
        ];
    }
    const displayPlayersB = [[], [], []];
    displayPlayersB[0] = displayPlayers[0].slice(page * maxplayersperpage, (page + 1) * maxplayersperpage);
    displayPlayersB[1] = displayPlayers[1].slice(page * maxplayersperpage, Math.max(0, ((page + 1) * maxplayersperpage) - displayPlayersB[0].length));
    displayPlayersB[2] = displayPlayers[2].slice(page * maxplayersperpage, Math.max(0, (page + 1) * maxplayersperpage - (displayPlayersB[0].length + displayPlayersB[1].length)));
    const numsavedplayers = displayPlayers[0].length + displayPlayers[1].length + displayPlayers[2].length;
    const numonlinesavedplayers = displayPlayers[0].length;
    const numofflinesavedplayers = displayPlayers[1].length;
    form.title(`${customFormUICodes.action.titles.formStyles.gridMenu}${!!search ? "Search Results" : "Manage Players"} ${Math.min(numsavedplayers, page * maxplayersperpage + 1)}-${Math.min(numsavedplayers, (page + 1) * maxplayersperpage)} of ${numsavedplayers}`);
    const numpages = Math.ceil(numsavedplayers / maxplayersperpage);
    if (!!search) {
        form.body(`Searching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive ?? false)}`);
    }
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
    // Players
    displayPlayersB[0].forEach((p) => {
        form.button(`${customFormUICodes.action.buttons.positions.main_only}${p.name}\nOnline`, "textures/ui/online");
    });
    displayPlayersB[1].forEach((p) => {
        form.button(`${customFormUICodes.action.buttons.positions.main_only}${p.name}\n${new Date(p.lastOnline).formatDateTime(player.timeZone)}`, "textures/ui/offline");
    });
    displayPlayersB[2].forEach((p) => {
        form.button(`${customFormUICodes.action.buttons.positions.main_only}${p.name}\nBanned`, "textures/ui/Ping_Offline_Red_Dark");
    });
    const numplayersonpage = displayPlayersB[0].length + displayPlayersB[1].length + displayPlayersB[2].length;
    let players = displayPlayersB.flat();
    form.button(customFormUICodes.action.buttons.positions.right_side_only + "Manage Bans", "textures/ui/hammer_l");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh_hover");
    return await form.forceShow(player)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
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
                        .forceShow(player));
                    if (!!!rb || rb?.canceled == true) {
                        return await managePlayers(player, page, maxplayersperpage, search, displayPlayers);
                    }
                    return await managePlayers(player, undefined, maxplayersperpage, {
                        value: rb.formValues[0],
                        caseSensitive: rb.formValues[1],
                        searchNames: rb.formValues[2],
                        searchIds: rb.formValues[3],
                        searchLastOnlineDates: rb.formValues[4],
                        searchLastOnlineTimes: rb.formValues[5],
                    }, undefined); /*
        return await showMessage(player, undefined, "§cSorry, the search feature has not been implemented yet.", "Back", "Close").then(async r=>{
            if(r.selection==0){
                return await managePlayers(player, page, maxplayersperpage, search, displayPlayers);
            }else{
                return 0;
            }
        })*/
                }
            case 1:
                return await managePlayers(player, Math.max(0, page - 1), maxplayersperpage, search, displayPlayers);
            case 2: {
                const rb = await tryget(async () => await new ModalFormData()
                    .title("Go To Page")
                    .textField(`Current Page: ${page + 1}\nPage # (Between 1 and ${numpages})`, "Page #")
                    .submitButton("Go To Page")
                    .forceShow(player));
                return await managePlayers(player, Math.max(1, Math.min(numpages, rb.formValues?.[0]?.toNumber() ?? page + 1)) - 1, maxplayersperpage, search, displayPlayers);
            }
            case 3:
                return await managePlayers(player, Math.min(numpages - 1, page + 1), maxplayersperpage, search, displayPlayers);
            case numplayersonpage + 6:
                if ((await manageBans(player)) === 1) {
                    return await managePlayers(player, page, maxplayersperpage, search, displayPlayers);
                }
                else {
                    return 0;
                }
            case numplayersonpage + 7:
                return 1;
            case numplayersonpage + 8:
                return 0;
            case numplayersonpage + 9:
                return await managePlayers(player, page, maxplayersperpage, search, undefined);
            default:
                if ((await managePlayers_managePlayer(player, players[r.selection - 6])) === 1) {
                    return await managePlayers(player, page, maxplayersperpage, search, displayPlayers);
                }
                else {
                    return 0;
                }
        }
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
//# sourceMappingURL=managePlayers.js.map