import { Player } from "@minecraft/server";
import { protectedAreaCategories } from "init/variables/protectedAreaVariables";
/**
 *
 * @todo Make this menu have pages.
 * @param player
 * @param prefix
 * @returns
 */
export declare function editAreas(player: Player, prefix: typeof protectedAreaCategories[number]): Promise<0 | 1>;
