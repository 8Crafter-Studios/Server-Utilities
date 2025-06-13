import { Player } from "@minecraft/server";
import type { extendedExecuteCommandPlayerW } from "modules/commands/types/extendedExecuteCommandPlayerW";
import { Home } from "./Home";
/**
 * This class is used for managing homes for the home system.
 *
 * @hideconstructor
 */
export declare class HomeSystem {
    /**
     * The format version of the home system.
     */
    static home_format_version: "0.7.0-beta.72";
    /**
     * Gets the homes for the given home IDs.
     *
     * @param {string[]} homeIds The list of home IDs to get the homes for.
     * @returns {Home[]} The homes for the given home IDs.
     */
    static getHomes(homeIds: string[]): Home[];
    /**
     * Gets all homes.
     *
     * @returns {Home[]} A list of all homes.
     */
    static getAllHomes(): Home[];
    /**
     * Gets all home IDs.
     *
     * @returns {string[]} A list of all home IDs.
     */
    static getHomeIds(): string[];
    /**
     * Gets the home IDs for the given player.
     *
     * @param {Player | extendedExecuteCommandPlayerW | string} player The player to get the home IDs for. Can be a player object, or a player ID.
     * @returns {string[]} A list of home IDs for the given player.
     */
    static getHomeIdsForPlayer(player: Player | extendedExecuteCommandPlayerW | string): string[];
    /**
     * Gets the homes for the given player.
     *
     * @param {Player | extendedExecuteCommandPlayerW | string} player The player to get the homes for. Can be a player object, or a player ID.
     * @returns {Home[]} A list of homes for the given player.
     */
    static getHomesForPlayer(player: Player | extendedExecuteCommandPlayerW | string): Home[];
    /**
     * Checks if the given player has reached the maximum number of homes.
     *
     * @param {Player | extendedExecuteCommandPlayerW | string} player The player to check.
     * @returns {boolean} True if the player has reached the maximum number of homes, false otherwise.
     */
    static testIfPlayerAtMaxHomes(player: Player | extendedExecuteCommandPlayerW | string): boolean;
    /**
     * The maximum number of homes per player.
     *
     * Dynamic Property ID: `homeSystemSettings:maxHomesPerPlayer`
     *
     * @default Infinity
     */
    static get maxHomesPerPlayer(): number;
    static set maxHomesPerPlayer(maxHomes: number);
}
