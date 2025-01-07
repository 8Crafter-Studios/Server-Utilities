import { Entity } from "@minecraft/server";
import type { savedPlayer } from "modules/player_save/classes/savedPlayer";
/**
 *
 * @todo Split each of the cases in the switch function into separate functions.
 * @param sourceEntity
 * @param player
 * @returns
 */
export declare function managePlayers_managePlayer(sourceEntity: Entity, player: savedPlayer): Promise<0 | 1>;
export declare function managePlayers_managePlayer_viewData(sourceEntity: Entity, player: savedPlayer): Promise<0 | 1>;
export declare function managePlayers_managePlayer_managePermissions(sourceEntity: Entity, player: savedPlayer): Promise<0 | 1>;
