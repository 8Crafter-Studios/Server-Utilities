import { Player } from "@minecraft/server";
/**
 * Checks if a player is in PvP.
 *
 * @param {Player} player The player to check.
 * @returns {boolean} `true` if the player is in PvP, `false` otherwise.
 */
export declare function checkIfPlayerIsInPvP(player: Player): boolean;
/**
 * Gets the number of seconds left in PvP for a player.
 *
 * @param {Player} player The player to check.
 * @returns {number} The number of seconds left in PvP for the player.
 */
export declare function getSecondsLeftInPvP(player: Player): number;
