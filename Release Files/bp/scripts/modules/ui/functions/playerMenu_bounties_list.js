import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { numberFormatter_compact } from "modules/utilities/functions/numberFormatter";
import { TotalBounty } from "modules/main/classes/Bounty";
import { playerMenu_bounty } from "./playerMenu_bounty";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function playerMenu_bounties_list(sourceEntitya, pagen = 0, maxbountiesperpage = config.ui.pages.maxPlayersPerManagePlayersPage ?? 9, search, cachedBounties) {
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
    // menuConfig.buttons.map(k=>[k, menuButtonIds.mainMenu.buttons[k]])
    let form = new ActionFormData();
    const page = Math.max(0, pagen);
    let displayBounties = cachedBounties ?? [];
    if (cachedBounties === undefined) {
        let bounties = TotalBounty.getAll()
            .map((b) => [b, savedPlayer.getSavedPlayer("player:" + b.targetId)])
            .filter((b) => !b[1].isBanned);
        displayBounties = bounties
            .filter((p) => !!search
            ? search.caseSensitive == true
                ? p[1].name.includes(search.value)
                : p[1].name.toLowerCase().includes(search.value.toLowerCase())
            : true)
            .sort((a, b) => a[0].totalValue > b[0].totalValue ? -1 : a[0].totalValue < b[0].totalValue ? 1 : a[1].name > b[1].name ? -1 : a[1].name < b[1].name ? 1 : 0);
    }
    const numsavedplayers = displayBounties.length;
    form.title(`${customFormUICodes.action.titles.formStyles.gridMenu}${!!search ? "Search Results" : "Bounties"} ${Math.min(numsavedplayers, page * maxbountiesperpage + 1)}-${Math.min(numsavedplayers, (page + 1) * maxbountiesperpage)} of ${numsavedplayers}`);
    const numpages = Math.ceil(numsavedplayers / maxbountiesperpage);
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
    let displayBountiesB = displayBounties.slice(page * maxbountiesperpage, (page + 1) * maxbountiesperpage);
    displayBountiesB.forEach((p, i) => {
        let text = `${numberFormatter_compact(p[0].totalValue, true)}\n${p[1].name}`;
        form.button(customFormUICodes.action.buttons.positions.main_only + text, p[1].isOnline ? "textures/ui/online" : p[1].isBanned ? "textures/ui/Ping_Offline_Red_Dark" : "textures/ui/offline");
    });
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        switch (["search", "previous", "go", "next", "", ""][r.selection] ??
            (!!displayBountiesB[r.selection - 6] ? "bounty" : undefined) ??
            ["back", "close", "refresh"][r.selection - displayBountiesB.length - 6]) {
            case "search":
                {
                    const rb = await tryget(async () => await new ModalFormData()
                        .title("Search")
                        .textField("", "Search", search?.value ?? "")
                        .toggle("Case Sensitive", search?.caseSensitive ?? false)
                        .submitButton("Search")
                        .forceShow(sourceEntity));
                    if (!!!rb || rb?.canceled == true) {
                        return await playerMenu_bounties_list(sourceEntity, page, maxbountiesperpage, search);
                    }
                    return await playerMenu_bounties_list(sourceEntity, undefined, maxbountiesperpage, {
                        value: rb.formValues[0],
                        caseSensitive: rb.formValues[1],
                    }); /*
        return await showMessage(sourceEntity as Player, undefined, "§cSorry, the search feature has not been implemented yet.", "Back", "Close").then(async r=>{
            if(r.selection==0){
                return await managePlayers(sourceEntity, page, maxbountiesperpage, search);
            }else{
                return 0;
            }
        })*/
                }
                break;
            case "previous":
                return await playerMenu_bounties_list(sourceEntity, Math.max(0, page - 1), maxbountiesperpage, search, cachedBounties);
                break;
            case "go": {
                const rb = await tryget(async () => await new ModalFormData()
                    .title("Go To Page")
                    .textField(`Current Page: ${page + 1}\nPage # (Between 1 and ${numpages})`, "Page #")
                    .submitButton("Go To Page")
                    .forceShow(sourceEntity));
                return await playerMenu_bounties_list(sourceEntity, Math.max(1, Math.min(numpages, rb.formValues?.[0]?.toNumber() ?? page + 1)) - 1, maxbountiesperpage, search, displayBounties);
            }
            case "next":
                return await playerMenu_bounties_list(sourceEntity, Math.min(numpages - 1, page + 1), maxbountiesperpage, search, displayBounties);
                break;
            case "bounty":
                if ((await playerMenu_bounty(sourceEntity, displayBountiesB[r.selection - 6][0], displayBountiesB[r.selection - 6][1])) == 1) {
                    return await playerMenu_bounties_list(sourceEntity, page, maxbountiesperpage, search, displayBounties);
                }
                else {
                    return 0;
                }
            case "refresh":
                return await playerMenu_bounties_list(sourceEntity, page, maxbountiesperpage, search, undefined);
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
//# sourceMappingURL=playerMenu_bounties_list.js.map