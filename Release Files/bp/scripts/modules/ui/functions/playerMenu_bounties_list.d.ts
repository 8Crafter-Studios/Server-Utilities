import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { TotalBounty } from "modules/main/classes/Bounty";
export declare function playerMenu_bounties_list(sourceEntitya: Entity | executeCommandPlayerW | Player, pagen?: number, maxbountiesperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
}, cachedBounties?: [totalBounty: TotalBounty, player: savedPlayer][]): Promise<0 | 1>;
