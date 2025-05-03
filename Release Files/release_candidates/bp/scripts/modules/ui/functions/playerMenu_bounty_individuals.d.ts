import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { Bounty, TotalBounty } from "modules/main/classes/Bounty";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
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
export declare function playerMenu_bounty_individuals(sourceEntity: loosePlayerType, totalBounty: TotalBounty, targetPlayer?: savedPlayer, pagen?: number, maxentriesperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
}, cachedEntries?: [bounty: Bounty, source: savedPlayer][]): Promise<0 | 1>;
