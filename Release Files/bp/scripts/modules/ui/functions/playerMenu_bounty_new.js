import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { numberFormatter } from "modules/utilities/functions/numberFormatter";
import { Bounty } from "modules/main/classes/Bounty";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function playerMenu_bounty_new(sourceEntitya, pagen = 0, maxplayersperpage = config.ui.pages.maxPlayersPerManagePlayersPage ?? 9, search, cachedPlayers) {
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
    if (!config.bountySystem.enabled) {
        const r = await showMessage(sourceEntity, "Bounty System Disabled", "The bounty system is disabled. It must be enabled in Main Menu > Settings > Bounty System.", "Back", "Cancel");
        if (r.canceled || r.selection == 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
    // menuConfig.buttons.map(k=>[k, menuButtonIds.mainMenu.buttons[k]]
    let form = new ActionFormData();
    const page = Math.max(0, pagen);
    let displayPlayers = cachedPlayers ?? [];
    if (cachedPlayers === undefined) {
        let savedPlayers = savedPlayer.getSavedPlayersAlphabeticalOrder().filter((p) => !p.isBanned);
        displayPlayers = [
            ...savedPlayers.filter((_) => _.isOnline),
            ...savedPlayers.filter((_) => !_.isOnline).sort((a, b) => b.lastOnline - a.lastOnline),
        ].filter((p) => !!search ? (search.caseSensitive == true ? p.name.includes(search.value) : p.name.toLowerCase().includes(search.value.toLowerCase())) : true);
    }
    const numsavedplayers = displayPlayers.length;
    form.title(`${customFormUICodes.action.titles.formStyles.gridMenu}${!!search ? "Search Results" : "Select Player"} ${Math.min(numsavedplayers, page * maxplayersperpage + 1)}-${Math.min(numsavedplayers, (page + 1) * maxplayersperpage)} of ${numsavedplayers}`);
    const numpages = Math.ceil(numsavedplayers / maxplayersperpage);
    if (!!search) {
        form.body(`Searching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive ?? false)}\n\nPlease select a player to put a bounty on.`);
    }
    else {
        form.body("Please select a player to put a bounty on.");
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
    const displayPlayersB = displayPlayers.slice(page * maxplayersperpage, (page + 1) * maxplayersperpage);
    displayPlayersB.forEach((p, i) => {
        form.button(customFormUICodes.action.buttons.positions.main_only + p.name, p.isOnline ? "textures/ui/online" : p.isBanned ? "textures/ui/Ping_Offline_Red_Dark" : "textures/ui/offline");
    });
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
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
                        .textField("", "Search", search?.value ?? "")
                        .toggle("Case Sensitive", search?.caseSensitive ?? false)
                        .submitButton("Search")
                        .forceShow(sourceEntity));
                    if (!!!rb || rb?.canceled == true) {
                        return await playerMenu_bounty_new(sourceEntity, page, maxplayersperpage, search, displayPlayers);
                    }
                    return await playerMenu_bounty_new(sourceEntity, undefined, maxplayersperpage, {
                        value: rb.formValues[0],
                        caseSensitive: rb.formValues[1],
                    }, undefined); /*
        return await showMessage(sourceEntity as Player, undefined, "§cSorry, the search feature has not been implemented yet.", "Back", "Close").then(async r=>{
            if(r.selection==0){
                return await managePlayers(sourceEntity, page, maxplayersperpage, search);
            }else{
                return 0;
            }
        })*/
                }
                break;
            case "previous":
                return await playerMenu_bounty_new(sourceEntity, Math.max(0, page - 1), maxplayersperpage, search, displayPlayers);
                break;
            case "go": {
                const rb = await tryget(async () => await new ModalFormData()
                    .title("Go To Page")
                    .textField(`Current Page: ${page + 1}\nPage # (Between 1 and ${numpages})`, "Page #")
                    .submitButton("Go To Page")
                    .forceShow(sourceEntity));
                return await playerMenu_bounty_new(sourceEntity, Math.max(1, Math.min(numpages, rb.formValues?.[0]?.toNumber() ?? page + 1)) - 1, maxplayersperpage, search, displayPlayers);
            }
            case "next":
                return await playerMenu_bounty_new(sourceEntity, Math.min(numpages - 1, page + 1), maxplayersperpage, search, displayPlayers);
                break;
            case "player": {
                const player = displayPlayersB[r.selection - 6];
                const ra = await new ModalFormData()
                    .title(customFormUICodes.modal.titles.formStyles.medium + "Place Bounty")
                    .textField(`§6--------------------------------
§aMoney: ${numberFormatter(sourceEntity.moneySystem.money, {
                    addCommaSeparators: true,
                    currencyPrefix: config.ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix,
                }, 0)}
§6--------------------------------
§rBounty Target: ${player.name}

§r§lAmount§r
Please enter the amount of money you would like to place on the bounty below.`, "Money Amount")
                    .submitButton("Place Bounty")
                    .forceShow(sourceEntity);
                if (ra.canceled) {
                    return await playerMenu_bounty_new(sourceEntity, Math.min(numpages - 1, page + 1), maxplayersperpage, search);
                }
                if (ra.formValues?.[0] === "") {
                    return ((await showMessage(sourceEntity, "Reward Not Specified", "You did not specify how much money to place on the bounty.", "Back", "Close")).selection !== 1).toNumber();
                }
                if (!/^\d+(?:\.\d+)?(?:[eE?][+\-]?\d+)?$/.test(ra.formValues?.[0])) {
                    return ((await showMessage(sourceEntity, "Invalid Money Amount", `${JSON.stringify(ra.formValues?.[0])} is not a valid amount of money.`, "Back", "Close")).selection !== 1).toNumber();
                }
                if (!/^\d+$/.test(ra.formValues?.[0])) {
                    return ((await showMessage(sourceEntity, "Invalid Money Amount", `${JSON.stringify(ra.formValues?.[0])} is not a valid amount of money, the amount of money must be a whole number.`, "Back", "Close")).selection !== 1).toNumber();
                }
                const amount = ra.formValues?.[0]?.toBigInt() ?? 0n;
                if (amount < 0n) {
                    return ((await showMessage(sourceEntity, "Invalid Money Amount", "You may not place a negative value bounty, as that would steal someone's money.", "Back", "Close")).selection !== 1).toNumber();
                }
                if (amount === 0n) {
                    return ((await showMessage(sourceEntity, "Invalid Money Amount", "You may not place a $0 bounty.", "Back", "Close")).selection !== 1).toNumber();
                }
                if (amount > sourceEntity.moneySystem.money) {
                    return ((await showMessage(sourceEntity, "Insufficient Funds", `You do not have ${numberFormatter(amount, {
                        addCommaSeparators: true,
                        currencyPrefix: config.ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix,
                    })}.`, "Back", "Close")).selection !== 1).toNumber();
                }
                if (((await showMessage(sourceEntity, "Are you sure?", `Are you sure you want to place a ${numberFormatter(amount, {
                    addCommaSeparators: true,
                    currencyPrefix: config.ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix,
                })} bounty on ${player.name}`, "Cancel", "Confirm")).selection === 1).toNumber()) {
                    Bounty.placeBountyOnPlayer(BigInt(ra.formValues[0]), sourceEntity.id, player.id, sourceEntity.name, player.name);
                    return ((await showMessage(sourceEntity, "Bounty Placed", `Successfully placed a ${numberFormatter(amount, {
                        addCommaSeparators: true,
                        currencyPrefix: config.ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix,
                    })} bounty on ${player.name}.`, "Okay", "Close")).selection !== 1).toNumber();
                }
                else {
                    return ((await showMessage(sourceEntity, "Bounty Canceled", `Your ${numberFormatter(amount, {
                        addCommaSeparators: true,
                        currencyPrefix: config.ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix,
                    })} bounty on ${player.name} has been canceled.`, "Okay", "Close")).selection !== 1).toNumber();
                }
            }
            case "refresh":
                return await playerMenu_bounty_new(sourceEntity, page, maxplayersperpage, search, undefined);
            case "back":
                return 1;
            case "close":
                return 0;
            default:
        }
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
//# sourceMappingURL=playerMenu_bounty_new.js.map