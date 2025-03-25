import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { Bounty } from "modules/main/classes/Bounty";
export declare function playerMenu_bounties_list_from(sourceEntitya: Entity | executeCommandPlayerW | Player, pagen?: number, maxbountiesperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
}, cachedBounties?: [bounty: Bounty, target: savedPlayer][]): Promise<0 | 1>;
