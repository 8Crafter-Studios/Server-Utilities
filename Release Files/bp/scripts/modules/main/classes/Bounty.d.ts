import { Player } from "@minecraft/server";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
/**
 * Represents a bounty.
 */
export declare class Bounty {
    /**
     * The unique identifier of this bounty.
     *
     * @type {bigint}
     */
    readonly id: bigint;
    /**
     * The UUID of the player who placed this bounty.
     *
     * @type {string}
     */
    playerId: string;
    /**
     * The UUID of the target of this bounty.
     *
     * @type {string}
     */
    targetId: string;
    /**
     * The value of this bounty.
     *
     * @type {bigint}
     */
    value: bigint;
    /**
     * The creation time of this bounty.
     *
     * @type {number}
     */
    creationTime: number;
    /**
     * Whether this bounty is valid.
     *
     * @type {boolean}
     *
     * @default true
     */
    valid: boolean;
    /**
     * The status of this bounty.
     *
     * @type {"none" | "deleted" | "claimed" | "canceled"}
     *
     * @default "none"
     */
    status: "none" | "deleted" | "claimed" | "canceled";
    /**
     * Creates a new bounty.
     *
     * @param {object} properties - The properties of the bounty.
     * @param {string} properties.playerId - The UUID of the player who placed this bounty.
     * @param {string} properties.targetId - The UUID of the target of this bounty.
     * @param {bigint} properties.value - The value of this bounty.
     * @param {number} [properties.creationTime] - The creation time of this bounty. Defaults to the current time.
     * @param {boolean} [properties.new] - Whether this bounty is new. Defaults to true.
     * @param {boolean} [properties.valid] - Whether this bounty is valid. Defaults to undefined.
     * @param {"none" | "deleted" | "claimed" | "canceled"} [properties.status] - The status of this bounty. Defaults to undefined.
     * @param {bigint} [properties.id] - The unique identifier of this bounty.
     */
    private constructor();
    /**
     * Initializes this bounty.
     */
    private init;
    /**
     * Deletes this bounty.
     *
     * @returns {boolean} Whether this bounty was deleted.
     */
    delete(): boolean;
    /**
     * Cancels this bounty.
     *
     * @returns {boolean} Whether this bounty was canceled.
     */
    cancel(): boolean;
    /**
     * Claims this bounty.
     *
     * @param {Player} claimer The player who claimed this bounty.
     * @returns {boolean} Whether this bounty was claimed.
     */
    claim(claimer: Player): boolean;
    /**
     * Gets a {@link savedPlayer} instance for the {@link targetId | target} of this bounty.
     *
     * @returns {savedPlayer | undefined} The saved player instance for the target of this bounty, or undefined if the target of this bounty has not been saved.
     */
    getLinkedTargetSavedPlayer(): savedPlayer | undefined;
    /**
     * Gets a {@link savedPlayer} instance for the {@link playerId | source} of this bounty.
     *
     * @returns {savedPlayer | undefined} The saved player instance for the source of this bounty, or undefined if the source of this bounty has not been saved.
     */
    getLinkedSourceSavedPlayer(): savedPlayer | undefined;
    /**
     * Converts this bounty to a {@link JSONB} serializable object.
     */
    toJSONB(): {
        readonly id: bigint;
        playerId: string;
        targetId: string;
        value: bigint;
        creationTime: number;
        valid: boolean;
        status: "none" | "deleted" | "claimed" | "canceled";
    };
    /**
     * Loads all saved bounties.
     *
     * @throws {SyntaxError} If the saved bounties are not valid stringified {@link JSONB}.
     */
    static loadBounties(): void;
    /**
     * Saves all loaded bounties.
     */
    static saveBounties(): void;
    /**
     * Places a bounty on the specified player.
     *
     * @param {bigint} value The bounty value.
     * @param {string} playerId The player's UUID.
     * @param {string} targetId The target's UUID.
     * @param {string} [playerDisplayName] The player's display name.
     * @param {string} [targetDisplayName] The target's display name.
     * @param {boolean} [silent=false] If set to true, will not notify all online players of the bounty. Defaults to false.
     * @param {boolean} [chargePlayer=true] Whether to charge the player for the bounty. Defaults to true.
     * @param {number} [creationTime=Date.now()] The creation time of the bounty. Defaults to the current time.
     * @returns {Bounty} The created bounty.
     *
     * @throws {Error} If the player has already placed a bounty on the target.
     * @throws {Error} If {@link chargePlayer} is `true` and the player does not have enough money to place the bounty.
     */
    static placeBountyOnPlayer(value: bigint, playerId: string, targetId: string, playerDisplayName?: string, targetDisplayName?: string, silent?: boolean, chargePlayer?: boolean, creationTime?: number): Bounty;
    /**
     * Retrieves all bounties placed by the specified player.
     *
     * @param {string} playerId The player's UUID.
     * @returns {Bounty[]} An array of bounties placed by the player.
     */
    static getBountiesFromPlayer(playerId: string): Bounty[];
    /**
     * Retrieves all bounties placed on the specified player.
     *
     * @param {string} targetId The target's UUID.
     * @returns {Bounty[]} An array of bounties placed on the target.
     */
    static getBountiesOnPlayer(targetId: string): Bounty[];
    /**
     * @todo Make this method functional.
     */
    static getMergedBounties(): Bounty[];
    /**
     * Retrieves all active bounties.
     *
     * @returns {Bounty[]} An array of active bounties.
     */
    static getAllBounties(): Bounty[];
}
/**
 * Represents a total bounty on a player.
 */
export declare class TotalBounty {
    /**
     * The target's UUID.
     */
    readonly targetId: string;
    constructor(targetId: string);
    get totalValue(): bigint;
    getLinkedTargetSavedPlayer(): savedPlayer | undefined;
    getBounties(): Bounty[];
    static getTotalBountyOnPlayer(player: {
        id: string;
        [k: string | number | symbol]: any;
    }): TotalBounty;
    static getAll(): TotalBounty[];
    static claimBounty(claimer: Player, targetId: string): void;
}
