import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { Bounty } from "modules/main/classes/Bounty";
export declare function playerMenu_bounty_from_individual(sourceEntitya: Entity | executeCommandPlayerW | Player, bounty: Bounty, targetPlayer?: savedPlayer): Promise<0 | 1>;
