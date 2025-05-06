import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { numberFormatter_compact } from "modules/utilities/functions/numberFormatter";
import { Bounty, TotalBounty } from "modules/main/classes/Bounty";
import { playerMenu_bounty_individual } from "./playerMenu_bounty_individual";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { customFormUICodes } from "../constants/customFormUICodes";
/**
 *
 *
 * @param {loosePlayerType} sourceEntity - The player accessing the menu.
 * @param {TotalBounty} totalBounty - The total bounty object.
 * @param {savedPlayer} [targetPlayer] - The player the bountieis are on.
 * @param {number} [pagen] - The page of the menu to go to. Defaults to 0.
 * @param {number} [maxentriesperpage] - How many entries to show per page. Defaults to the value of {@linkcode config.ui.pages.maxPlayersPerManagePlayersPage}.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function playerMenu_bounty_individuals(sourceEntity, totalBounty, targetPlayer, pagen = 0, maxentriesperpage = config.ui.pages.maxPlayersPerManagePlayersPage ?? 9, search, cachedEntries) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    const target = targetPlayer ?? totalBounty.getLinkedTargetSavedPlayer();
    var currentParameters = {
        player,
        pagen,
        maxentriesperpage,
        search,
        cachedEntries,
    };
    while (true) {
        const { player, pagen, maxentriesperpage, search, cachedEntries } = currentParameters;
        if (!config.bountySystem.enabled) {
            const r = await showMessage(player, "Bounty System Disabled", "The bounty system is disabled. It must be enabled in Main Menu > Settings > Bounty System.", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
        const form = new ActionFormData();
        const page = Math.max(0, pagen);
        let displayEntries = cachedEntries ?? [];
        if (cachedEntries === undefined) {
            let bounties = totalBounty.getBounties().map(b => [b, b.getLinkedSourceSavedPlayer()])
                .filter(b => !b[1].isBanned);
            displayEntries = bounties
                .filter((p) => !!search
                ? search.caseSensitive == true
                    ? p[1].name.includes(search.value)
                    : p[1].name.toLowerCase().includes(search.value.toLowerCase())
                : true).sort(((a, b) => (a[0].value > b[0].value ? -1 : a[0].value < b[0].value ? 1 : a[1].name > b[1].name ? -1 : a[1].name < b[1].name ? 1 : 0)));
        }
        const numentries = displayEntries.length;
        form.title(`${customFormUICodes.action.titles.formStyles.gridMenu}${!!search ? "Search Results" : "Individual Bounties"} ${Math.min(numentries, page * maxentriesperpage + 1)}-${Math.min(numentries, (page + 1) * maxentriesperpage)} of ${numentries}`);
        const numpages = Math.ceil(numentries / maxentriesperpage);
        if (!!search) {
            form.body(`There ${numentries === 1 ? "is" : "are"} ${numentries} bount${numentries === 1 ? "y" : "ies"} placed on ${target.name}.\nSearching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive ?? false)}`);
        }
        else {
            form.body(`There ${numentries === 1 ? "is" : "are"} ${numentries} bount${numentries === 1 ? "y" : "ies"} placed on ${target.name}.`);
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
            let text = `${numberFormatter_compact(v[0].value, true)}\n${v[1].name}`;
            form.button(customFormUICodes.action.buttons.positions.main_only + text, v[1].isOnline
                ? "textures/ui/online"
                : v[1].isBanned
                    ? "textures/ui/Ping_Offline_Red_Dark"
                    : "textures/ui/offline");
        });
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
        try {
            const r = await forceShow(form, player);
            if (r.canceled)
                return 1;
            switch (["search", "previous", "go", "next", "", ""][r.selection] ??
                (!!displayEntriesB[r.selection - 6] ? "entry" : undefined) ??
                ["back", "close", "refresh"][r.selection - displayEntriesB.length - 6]) {
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
                    if ((await playerMenu_bounty_individual(sourceEntity, displayEntries[r.selection - 6][0], target, displayEntries[r.selection - 6][1])) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: displayEntries };
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
//# sourceMappingURL=playerMenu_bounty_individuals.js.map