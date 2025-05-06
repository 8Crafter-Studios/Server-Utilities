import { ban } from "modules/ban/classes/ban";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
import type { savedPlayer } from "modules/player_save/classes/savedPlayer";
/**
 * Displays a UI for managing bans on players.
 *
 * @param {loosePlayerType} sourceEntity - The player accessing the menu.
 * @param {number} [pagen] - The page of the menu to go to. Defaults to 0.
 * @param {number} [maxentriesperpage] - How many entries to show per page. Defaults to the value of {@linkcode config.ui.pages.maxBansPerManageBansPage}.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageBans(sourceEntity: loosePlayerType, pagen?: number, maxentriesperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
    searchNames?: boolean;
    searchIds?: boolean;
}, cachedEntries?: [ban, "id" | "name", "valid" | "expired"][]): Promise<0 | 1>;
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
export declare function manageBansOnPlayer(sourceEntity: loosePlayerType, target: savedPlayer, pagen?: number, maxentriesperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
    searchNames?: boolean;
    searchIds?: boolean;
}, cachedEntries?: [ban, "id" | "name", "valid" | "expired"][]): Promise<0 | 1>;
/**
 * The menu for managing a ban on a player.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageBan(sourceEntity: loosePlayerType, ban: ban): Promise<0 | 1>;
/**
 * Shows a UI for unbanning a player.
 *
 * This menu prompts players to confirm the unbanning of the specified player, and unbans they player if they confirm.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1 | 2>} A promise that resolves to `0` if the previous menu should be closed, `1` if the previous menu should be reopened, or `2` if the menu before the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function unbanPlayer(sourceEntity: loosePlayerType, selectedBan: ban): Promise<0 | 1 | 2>;
export declare function addIDBan(sourceEntity: loosePlayerType): Promise<0 | 1>;
export declare function addNameBan(sourceEntity: loosePlayerType): Promise<0 | 1>;
export declare function addIDBanOnPlayer(sourceEntity: loosePlayerType, targetDetails: {
    id: string;
    name?: string;
}): Promise<0 | 1>;
export declare function addNameBanOnPlayer(sourceEntity: loosePlayerType, targetDetails: {
    id?: string;
    name: string;
}): Promise<0 | 1>;
