import { Entity, ObjectiveSortOrder, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { playerMenu_leaderboard_player } from "./playerMenu_leaderboard_player";
import { numberFormatter_compact_lite } from "modules/utilities/functions/numberFormatter";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function playerMenu_leaderboard(sourceEntitya, leaderboard, pagen = 0, maxplayersperpage = config.ui.pages.maxPlayersPerManagePlayersPage ?? 9, search, cachedPlayers) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
            (typeof sourceEntity == "object"
                ? sourceEntity === null
                    ? "object[null]"
                    : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]"
                : typeof sourceEntity) +
            ".");
    }
    if (!config.ui.menus.playerMenu.enabled) {
        const r = await showMessage(sourceEntity, "Menu Disabled", "The player menu is disabled. It must be enabled in Main Menu > Settings > Player Menu.", "Back", "Cancel");
        if (r.canceled || r.selection == 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
    const menuConfig = config.ui.menus.playerMenu_leaderboards;
    // menuConfig.buttons.map(k=>[k, menuButtonIds.mainMenu.buttons[k]])
    let form = new ActionFormData();
    const page = Math.max(0, pagen);
    let displayPlayers = cachedPlayers ?? [];
    if (cachedPlayers === undefined) {
        // let t1 = Date.now();
        let savedPlayers = savedPlayer.getSavedPlayersAlphabeticalOrder();
        // let t2 = Date.now();
        if (!menuConfig.showBannedPlayersInLeaderboards) {
            savedPlayers = savedPlayers.filter((p) => !p.isBanned);
        }
        // let t3 = Date.now();
        if (!!search) {
            savedPlayers = savedPlayers.filter((p) => search.caseSensitive == true ? p.name.includes(search.value) : p.name.toLowerCase().includes(search.value.toLowerCase()));
        }
        // let t4 = Date.now();
        const sorterFunction = ((typeof leaderboard.sorter == "function"
            ? (a, b) => leaderboard.sorter(a[1], b[1])
            : undefined) ?? leaderboard.valueType === "bigint")
            ? (typeof leaderboard.sorter == "number" ? leaderboard.sorter : ObjectiveSortOrder.Descending) == ObjectiveSortOrder.Descending
                ? (a, b) => (BigInt(a[1]) > BigInt(b[1]) ? -1 : BigInt(a[1]) < BigInt(b[1]) ? 1 : 0)
                : (a, b) => (a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0)
            : leaderboard.valueType === "number"
                ? (typeof leaderboard.sorter == "number" ? leaderboard.sorter : ObjectiveSortOrder.Descending) == ObjectiveSortOrder.Descending
                    ? (a, b) => (Number(a[1]) > Number(b[1]) ? -1 : Number(a[1]) < Number(b[1]) ? 1 : 0)
                    : (a, b) => (a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0)
                : (typeof leaderboard.sorter == "number" ? leaderboard.sorter : ObjectiveSortOrder.Descending) == ObjectiveSortOrder.Descending
                    ? (a, b) => (a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0)
                    : (a, b) => (a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0);
        const leaderboardObjective = leaderboard.getterFunction != undefined ? undefined : world.scoreboard.getObjective(leaderboard.scoreboardObjective);
        const participants = leaderboard.getterFunction != undefined ? undefined : world.scoreboard.getParticipants();
        const getterFunction = leaderboard.getterFunction != undefined
            ? leaderboard.getterFunction
            : (p) => tryget(() => leaderboardObjective?.getScore(participants?.find((v) => v.id == p.scoreboardIdentity)
                ?? participants?.find((v) => tryget(() => v.getEntity()?.id) == p.id)))?.toString();
        displayPlayers = savedPlayers
            .map((p) => [p, getterFunction(p)])
            .filter((p) => p[1] !== undefined)
            .sort(sorterFunction);
        // let t5 = Date.now();
        // console.log("Time taken to get players: " + (t2 - t1) + "ms"); // Debugging
        // console.log("Time taken to filter out banned players: " + (t3 - t2) + "ms"); // Debugging
        // console.log("Time taken to filter players based on search filter: " + (t4 - t3) + "ms"); // Debugging
        // console.log(
        // "Time taken to get scores, filter out players with undefined scores, and sort players: " + (t5 - t4) + "ms"
        // ); // Debugging
    }
    const numsavedplayers = displayPlayers.length;
    form.title(`${customFormUICodes.action.titles.formStyles.gridMenu}${!!search ? "Search Results" : leaderboard.menuTitle} ${Math.min(numsavedplayers, page * maxplayersperpage + 1)}-${Math.min(numsavedplayers, (page + 1) * maxplayersperpage)} of ${numsavedplayers}`);
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
    // let t6 = Date.now();
    const displayPlayersB = displayPlayers.slice(page * maxplayersperpage, (page + 1) * maxplayersperpage);
    if (leaderboard.valueType === "bigint" || leaderboard.valueType === "number") {
        if (leaderboard.displayOptions.valueDisplayTransformer_button !== undefined) {
            displayPlayersB.forEach((p, i) => {
                form.button(customFormUICodes.action.buttons.positions.main_only +
                    leaderboard.displayOptions.valueDisplayTransformer_button(`${numberFormatter_compact_lite(p[1], leaderboard.displayOptions.currencyPrefix ?? "", { 3: 0, 2: 1, 1: 2 })}\n#${i + 1 + page * maxplayersperpage}: ${p[0].name}`), p[0].isOnline ? "textures/ui/online" : p[0].isBanned ? "textures/ui/Ping_Offline_Red_Dark" : "textures/ui/offline");
            });
        }
        else {
            displayPlayersB.forEach((p, i) => {
                form.button(customFormUICodes.action.buttons.positions.main_only +
                    `${numberFormatter_compact_lite(p[1], leaderboard.displayOptions.currencyPrefix ?? "")}\n#${i + 1 + page * maxplayersperpage}: ${p[0].name}`, p[0].isOnline ? "textures/ui/online" : p[0].isBanned ? "textures/ui/Ping_Offline_Red_Dark" : "textures/ui/offline");
            });
        }
    }
    else {
        if (leaderboard.displayOptions.valueDisplayTransformer_button !== undefined) {
            displayPlayersB.forEach((p, i) => {
                form.button(customFormUICodes.action.buttons.positions.main_only +
                    leaderboard.displayOptions.valueDisplayTransformer_button(`${p[1]}\n#${i + 1 + page * maxplayersperpage}: ${p[0].name}`), p[0].isOnline ? "textures/ui/online" : p[0].isBanned ? "textures/ui/Ping_Offline_Red_Dark" : "textures/ui/offline");
            });
        }
        else {
            displayPlayersB.forEach((p, i) => {
                form.button(customFormUICodes.action.buttons.positions.main_only + `${p[1]}\n#${i + 1 + page * maxplayersperpage}: ${p[0].name}`, p[0].isOnline ? "textures/ui/online" : p[0].isBanned ? "textures/ui/Ping_Offline_Red_Dark" : "textures/ui/offline");
            });
        }
    }
    // let t7 = Date.now();
    // console.log("Time taken to display players: " + (t7 - t6) + "ms"); // Debugging
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
    // form.button(customFormUICodes.action.buttons.positions.status_bar_only + customFormUICodes.action.buttons.styles.plain_text + " test status bar text ", "textures/ui/bookshelf_flat");
    // form.button(customFormUICodes.action.buttons.positions.status_bar_only + "test status bar button", "textures/ui/bookshelf_flat");
    // form.button(customFormUICodes.action.buttons.positions.status_bar_left_only + "left button 1", "textures/ui/chat_keyboard");
    // form.button(customFormUICodes.action.buttons.positions.status_bar_left_only + customFormUICodes.action.buttons.styles.plain_text + " left text ", "textures/ui/Caution");
    // form.button(customFormUICodes.action.buttons.positions.status_bar_left_only + "left button 2", "textures/ui/Caution");
    // form.button(customFormUICodes.action.buttons.positions.status_bar_right_only + customFormUICodes.action.buttons.styles.plain_text + " right text ", "textures/ui/broadcast_glyph_color");
    // form.button(customFormUICodes.action.buttons.positions.status_bar_right_only + "right button", "textures/ui/broadcast_glyph_color");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch (["search", "previous", "go", "next", "", ""][r.selection] ??
            (!!displayPlayersB[r.selection - 6] ? "player" : undefined) ??
            ["back", "close", "refresh"][r.selection - displayPlayersB.length - 6]) {
            case "search":
                {
                    const rb = await tryget(async () => await new ModalFormData()
                        .title("Search")
                        .textField("", "Search", { defaultValue: search?.value ?? "" })
                        .toggle("Case Sensitive", { defaultValue: search?.caseSensitive ?? false })
                        .submitButton("Search")
                        .forceShow(sourceEntity));
                    if (!!!rb || rb?.canceled == true) {
                        return await playerMenu_leaderboard(sourceEntity, leaderboard, page, maxplayersperpage, search, displayPlayers);
                    }
                    return await playerMenu_leaderboard(sourceEntity, leaderboard, undefined, maxplayersperpage, {
                        value: rb.formValues[0],
                        caseSensitive: rb.formValues[1],
                    }, undefined); /*
        return await showMessage(sourceEntity as Player, undefined, "§cSorry, the search feature has not been implemented yet.", "Back", "Close").then(async r=>{
            if(r.selection==0){
                return await managePlayers(sourceEntity, page, maxplayersperpage, search, displayPlayers);
            }else{
                return 0;
            }
        })*/
                }
                break;
            case "previous":
                return await playerMenu_leaderboard(sourceEntity, leaderboard, Math.max(0, page - 1), maxplayersperpage, search, displayPlayers);
                break;
            case "go": {
                const rb = await tryget(async () => await new ModalFormData()
                    .title("Go To Page")
                    .textField(`Current Page: ${page + 1}\nPage # (Between 1 and ${numpages})`, "Page #")
                    .submitButton("Go To Page")
                    .forceShow(sourceEntity));
                return await playerMenu_leaderboard(sourceEntity, leaderboard, Math.max(1, Math.min(numpages, rb.formValues?.[0]?.toNumber() ?? page + 1)) - 1, maxplayersperpage, search, displayPlayers);
            }
            case "next":
                return await playerMenu_leaderboard(sourceEntity, leaderboard, Math.min(numpages - 1, page + 1), maxplayersperpage, search, displayPlayers);
                break;
            case "player":
                if ((await playerMenu_leaderboard_player(sourceEntity, leaderboard, displayPlayers[r.selection - 6][0])) == 1) {
                    return await playerMenu_leaderboard(sourceEntity, leaderboard, page, maxplayersperpage, search, displayPlayers);
                }
                else {
                    return 0;
                }
            case "refresh":
                return await playerMenu_leaderboard(sourceEntity, leaderboard, page, maxplayersperpage, search, undefined);
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
//# sourceMappingURL=playerMenu_leaderboard.js.map