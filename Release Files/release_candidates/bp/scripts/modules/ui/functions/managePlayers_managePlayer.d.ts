import type { savedPlayer } from "modules/player_save/classes/savedPlayer";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 * Shows the player a menu for managing a player.
 *
 * This menu is the menu that is opened when the player clicks on a player in the manage players menu.
 *
 * @todo Split each of the cases in the switch function into separate functions.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @param {savedPlayer} targetPlayer - The player to manage.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function managePlayers_managePlayer(sourceEntity: loosePlayerType, targetPlayer: savedPlayer): Promise<0 | 1>;
export declare function managePlayers_managePlayer_viewData(sourceEntity: loosePlayerType, targetPlayer: savedPlayer): Promise<0 | 1>;
export declare function managePlayers_managePlayer_managePermissions(sourceEntity: loosePlayerType, targetPlayer: savedPlayer): Promise<0 | 1>;
