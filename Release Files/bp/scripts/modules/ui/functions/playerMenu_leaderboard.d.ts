import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import type { playerMenuLeaderboardStatistic } from "../types/playerMenuLeaderboardStatistic";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
export declare function playerMenu_leaderboard(sourceEntitya: Entity | executeCommandPlayerW | Player, leaderboard: playerMenuLeaderboardStatistic<"built-in" | "custom" | "customAdvanced">, pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
}, cachedPlayers?: [player: savedPlayer, score: string][]): Promise<0 | 1>;
