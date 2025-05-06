import { type muteData } from "modules/moderation/classes/ModerationActions";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 * Displays a UI for managing mutes on players.
 *
 * @param {loosePlayerType} sourceEntity - The player accessing the menu.
 * @param {number} [pagen] - The page of the menu to go to. Defaults to 0.
 * @param {number} [maxentriesperpage] - How many entries to show per page. Defaults to the value of {@linkcode config.ui.pages.maxPlayersPerManagePlayersPage}.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageMutes(sourceEntity: loosePlayerType, pagen?: number, maxentriesperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
}, cachedEntries?: [playerName: string, status: "online" | "offline"][]): Promise<0 | 1>;
/**
 * The menu for managing a mute on a player.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function manageMute(sourceEntity: loosePlayerType, mute: [playerName: string, mute: muteData]): Promise<0 | 1>;
/**
 * Shows a UI for unmuting a player.
 *
 * This menu prompts players to confirm the unmuting of the specified player, and unmutes they player if they confirm.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1 | 2>} A promise that resolves to `0` if the previous menu should be closed, `1` if the previous menu should be reopened, or `2` if the menu before the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function unmutePlayer(sourceEntity: loosePlayerType, playerName: string): Promise<0 | 1 | 2>;
export declare function addMute(sourceEntity: loosePlayerType): Promise<0 | 1>;
export declare function addMuteOnPlayer(sourceEntity: loosePlayerType, targetName: string): Promise<0 | 1>;
