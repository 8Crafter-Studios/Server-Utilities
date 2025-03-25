import type { savedPlayer } from "modules/player_save/classes/savedPlayer";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
/**
 *
 * @todo Split each of the cases in the switch function into separate functions.
 * @param player
 * @param targetPlayer
 * @returns
 */
export declare function managePlayers_managePlayer(sourceEntity: loosePlayerType, targetPlayer: savedPlayer): Promise<0 | 1>;
export declare function managePlayers_managePlayer_viewData(sourceEntity: loosePlayerType, targetPlayer: savedPlayer): Promise<0 | 1>;
export declare function managePlayers_managePlayer_managePermissions(sourceEntity: loosePlayerType, targetPlayer: savedPlayer): Promise<0 | 1>;
