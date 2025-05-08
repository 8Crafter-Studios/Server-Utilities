/**
 * ExtraFeatures/money.ts
 * @module
 * @description This file contains classes related to the money system.
 */
import { Entity, ScoreboardObjective } from "@minecraft/server";
/**
 * Represents the money system.
 */
export declare class MoneySystem {
    /**
     * Returns the player ID.
     *
     * @type {string}
     */
    readonly playerID: `${number}`;
    /**
     * Returns the amount of money a player has.
     *
     * @type {bigint}
     */
    get money(): bigint;
    /**
     * Adds money to a player.
     *
     * @param {number | bigint} amount The amount of money to add to the player, should be a number or a bigint, can be negative.
     * @returns {boolean} Returns true if the operation was successful. (Only returns false if {@link config.moneySystem.useScoreboardBasedMoneySystem} is true and the player's scoreboard identity is unable to be obtained)
     */
    addMoney(amount: number | bigint): boolean;
    /**
     * Removes money from a player.
     *
     * @param {number | bigint} amount The amount of money to remove from the player, should be a number or a bigint, can be negative.
     * @returns {boolean} Returns true if the operation was successful. (Only returns false if {@link config.moneySystem.useScoreboardBasedMoneySystem} is true and the player's scoreboard identity is unable to be obtained)
     */
    removeMoney(amount: number | bigint): boolean;
    /**
     * Sets the amount of money a player has.
     *
     * @param {number | bigint} amount The amount of money to set the player to, should be a number or a bigint, can be negative.
     * @returns {boolean} Returns true if the operation was successful. (Only returns false if {@link config.moneySystem.useScoreboardBasedMoneySystem} is true and the player's scoreboard identity is unable to be obtained)
     */
    setMoney(amount?: number | bigint): boolean;
    /**
     * Transfers a players money from a scorboard to the current money system.
     *
     * @param {ScoreboardObjective} scoreboard The scoreboard to transfer from.
     * @returns {boolean} Returns true if the operation was successful.
     */
    transferFromScoreboard(scoreboard: ScoreboardObjective): boolean;
    /**
     * Creates a new MoneySystem object.
     *
     * @param {`${number}`} playerID The ID of the player.
     */
    constructor(playerID: `${number}`);
    /**
     * Gets a MoneySystem object for a given player.
     *
     * @param {`${number}` | Entity | { id: string | `${number}` } | number | bigint | string} player The player to get the MoneySystem object for.
     * @returns {MoneySystem} The MoneySystem object for the given player.
     */
    static get(player: `${number}` | Entity | {
        id: string | `${number}`;
    } | number | bigint | string): MoneySystem;
    /**
     * Transfers money from a scoreboard to the current money system, runs for all saved players with a saved scoreboard identity.
     *
     * @param {ScoreboardObjective} scoreboard The scoreboard to transfer from.
     */
    static transferFromScoreboard(scoreboard: ScoreboardObjective): void;
}
