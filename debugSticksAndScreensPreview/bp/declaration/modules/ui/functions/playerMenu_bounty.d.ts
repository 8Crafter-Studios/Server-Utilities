import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import type { TotalBounty } from "modules/main/classes/Bounty";
export declare function playerMenu_bounty(sourceEntitya: Entity | executeCommandPlayerW | Player, totalBounty: TotalBounty, targetPlayer?: savedPlayer): Promise<0 | 1>;
