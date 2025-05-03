import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import type { playerMenuLeaderboardStatistic } from "../types/playerMenuLeaderboardStatistic";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
export declare function playerMenu_leaderboard_player(sourceEntitya: Entity | executeCommandPlayerW | Player, leaderboard: playerMenuLeaderboardStatistic<"built-in" | "custom" | "customAdvanced">, player: savedPlayer): Promise<0 | 1>;
