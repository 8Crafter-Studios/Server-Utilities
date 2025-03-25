import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { TotalBounty } from "modules/main/classes/Bounty";
/**
 * @todo Make this function use the better style from {@link modules.uis.playerMenu_bounties_list}.
 */
export declare function playerMenu_bounty_individuals(sourceEntitya: Entity | executeCommandPlayerW | Player, totalBounty: TotalBounty, targetPlayer?: savedPlayer, pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
}): Promise<0 | 1>;
