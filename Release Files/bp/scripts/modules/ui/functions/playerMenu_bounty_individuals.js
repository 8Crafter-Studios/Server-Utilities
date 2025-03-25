import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { numberFormatter_compact } from "modules/utilities/functions/numberFormatter";
import { Bounty, TotalBounty } from "modules/main/classes/Bounty";
import { playerMenu_bounty_individual } from "./playerMenu_bounty_individual";
/**
 * @todo Make this function use the better style from {@link modules.uis.playerMenu_bounties_list}.
 */
export async function playerMenu_bounty_individuals(sourceEntitya, totalBounty, targetPlayer, pagen = 0, maxplayersperpage = config.ui.pages
    .maxPlayersPerManagePlayersPage ?? 9, search) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " + (typeof sourceEntity == "object" ? sourceEntity === null ? "object[null]" : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]" : typeof sourceEntity) + ".");
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
    const target = targetPlayer ?? totalBounty.getLinkedTargetSavedPlayer();
    let form = new ActionFormData();
    const page = Math.max(0, pagen);
    let bounties = totalBounty.getBounties().map(b => [b, b.getLinkedSourceSavedPlayer()])
        .filter(b => !b[1].isBanned);
    let displayPlayers = bounties
        .filter((p) => !!search
        ? search.caseSensitive == true
            ? p[1].name.includes(search.value)
            : p[1].name.toLowerCase().includes(search.value.toLowerCase())
        : true).sort(((a, b) => (a[0].value > b[0].value ? -1 : a[0].value < b[0].value ? 1 : a[1].name > b[1].name ? -1 : a[1].name < b[1].name ? 1 : 0)));
    const numsavedplayers = displayPlayers.length;
    form.title(`${!!search ? "Search Results" : "Individual Bounties"} ${Math.min(numsavedplayers, page * maxplayersperpage + 1)}-${Math.min(numsavedplayers, (page + 1) * maxplayersperpage)} of ${numsavedplayers}`);
    const numpages = Math.ceil(numsavedplayers / maxplayersperpage);
    if (!!search) {
        form.body(`Searching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive ?? false)}`);
    }
    else {
        form.body(`There ${numsavedplayers === 1 ? "is" : "are"} ${numsavedplayers} bount${numsavedplayers === 1 ? "y" : "ies"} placed on ${target.name}.`);
    }
    form.button("Search", "textures/ui/spyglass_flat");
    form.button((page != 0 ? "§0" : "§8") + "Previous Page", "textures/ui/arrow_left");
    form.button((page < numpages - 1 ? "§0" : "§8") + "Next Page", "textures/ui/arrow_right");
    displayPlayers.slice(page * maxplayersperpage, (page + 1) * maxplayersperpage).forEach((p, i) => {
        let text = `${numberFormatter_compact(p[0].value, true)}\n${p[1].name}`;
        form.button(text, p[1].isOnline
            ? "textures/ui/online"
            : p[1].isBanned
                ? "textures/ui/Ping_Offline_Red_Dark"
                : "textures/ui/offline");
    });
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        switch (["search", "previous", "next"][r.selection] ?? (!!displayPlayers[r.selection - 3] ? "bounty" : undefined) ?? ["back", "close"][r.selection - displayPlayers.length - 3]) {
            case "search":
                {
                    const rb = await tryget(async () => await new ModalFormData()
                        .title("Search")
                        .textField("", "Search", search?.value ?? "")
                        .toggle("Case Sensitive", search?.caseSensitive ?? false)
                        .submitButton("Search")
                        .forceShow(sourceEntity));
                    if (!!!rb || rb?.canceled == true) {
                        return await playerMenu_bounty_individuals(sourceEntity, totalBounty, target, page, maxplayersperpage, search);
                    }
                    return await playerMenu_bounty_individuals(sourceEntity, totalBounty, target, undefined, maxplayersperpage, {
                        value: rb.formValues[0],
                        caseSensitive: rb.formValues[1],
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
            case "previous":
                return await playerMenu_bounty_individuals(sourceEntity, totalBounty, target, Math.max(0, page - 1), maxplayersperpage, search);
                break;
            case "next":
                return await playerMenu_bounty_individuals(sourceEntity, totalBounty, target, Math.min(numpages - 1, page + 1), maxplayersperpage, search);
                break;
            case "bounty":
                if ((await playerMenu_bounty_individual(sourceEntity, bounties[r.selection - 3][0], target, bounties[r.selection - 3][1])) == 1) {
                    return await playerMenu_bounty_individuals(sourceEntity, totalBounty, target, page, maxplayersperpage, search);
                }
                else {
                    return 0;
                }
            case "back":
                return 1;
            case "close":
                return 0;
            default:
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return 0;
    });
}
//# sourceMappingURL=playerMenu_bounty_individuals.js.map