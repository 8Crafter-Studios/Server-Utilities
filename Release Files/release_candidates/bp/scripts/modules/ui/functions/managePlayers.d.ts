import "init/classes/config";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 * Displays a UI for managing bans on players.
 *
 * @param {loosePlayerType} sourceEntity - The player accessing the menu.
 * @param {number} [pagen] - The page of the menu to go to. Defaults to 0.
 * @param {number} [maxplayersperpage] - How many players to show per page. Defaults to the value of {@linkcode config.ui.pages.maxPlayersPerManagePlayersPage}.
 * @param {{value: string, caseSensitive?: boolean, searchLastOnlineDates?: boolean, searchLastOnlineTimes?: boolean, searchNames?: boolean, searchIds?: boolean}} [search] - The search query and options.
 * @param {string} search.value - The search query.
 * @param {boolean} [search.caseSensitive] - Whether to search case sensitively.
 * @param {boolean} [search.searchLastOnlineDates] - Whether to search by last online date.
 * @param {boolean} [search.searchLastOnlineTimes] - Whether to search by last online time.
 * @param {boolean} [search.searchNames] - Whether to search by name.
 * @param {boolean} [search.searchIds] - Whether to search by UUID.
 * @param {[online: savedPlayer[], offline: savedPlayer[], banned: savedPlayer[]]} [cachedPlayers] - The cached players.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function managePlayers(sourceEntity: loosePlayerType, pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
    searchLastOnlineDates?: boolean;
    searchLastOnlineTimes?: boolean;
    searchNames?: boolean;
    searchIds?: boolean;
}, cachedPlayers?: [online: savedPlayer[], offline: savedPlayer[], banned: savedPlayer[]]): Promise<0 | 1>;
