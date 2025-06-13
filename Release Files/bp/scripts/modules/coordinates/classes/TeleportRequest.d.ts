import { Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * The TeleportRequest class, it is used to handle teleport requests.
 */
export declare class TeleportRequest {
    /**
     * The unique identifier of this teleport request.
     *
     * @type {bigint}
     */
    readonly id: bigint;
    /**
     * The player who sent this teleport request.
     *
     * @type {Player}
     */
    player: Player;
    /**
     * The player this teleport request was sent to.
     *
     * @type {Player}
     */
    target: Player;
    /**
     * When this teleport request was sent.
     *
     * @type {number}
     */
    sendTime: number;
    /**
     * Whether or not this teleport request is valid.
     *
     * @type {boolean}
     *
     * @default true
     */
    valid: boolean;
    /**
     * Whether or not this teleport request has been accepted.
     *
     * @type {boolean}
     *
     * @default false
     */
    accepted: boolean;
    /**
     * Creates a new teleport request.
     *
     * @param {Player} player The player who sent this teleport request.
     * @param {Player} target The player this teleport request was sent to.
     * @param {number} [sendTime=Date.now()] When this teleport request was sent.
     */
    private constructor();
    /**
     * Initializes this teleport request.
     *
     * @returns {Promise<void>} A promise that resolves when this teleport request is accepted, denied, made invalid, or timed out.
     */
    private init;
    /**
     * Deletes this teleport request.
     *
     * @returns {boolean} Whether or not this teleport request was deleted.
     */
    delete(): boolean;
    /**
     * Cancels this teleport request.
     *
     * @returns {boolean} Whether or not this teleport request was canceled.
     */
    cancel(): boolean;
    /**
     * Times out this teleport request.
     *
     * @returns {boolean} Whether or not this teleport request was timed out.
     */
    timeOut(): boolean;
    /**
     * Denies this teleport request.
     *
     * @returns {boolean} Whether or not this teleport request was denied.
     */
    deny(): boolean;
    /**
     * Accepts this teleport request.
     *
     * @returns {Promise<boolean>} Whether or not this teleport request was accepted.
     */
    accept(): Promise<boolean>;
    /**
     * Runs the cancel sequence for this teleport request.
     */
    cancelSequence(): void;
    /**
     * Runs the time out sequence for this teleport request.
     */
    timeOutSequence(): void;
    /**
     * Runs the deny sequence for this teleport request.
     */
    denySequence(): void;
    /**
     * Runs the teleport sequence for this teleport request.
     *
     * @returns {Promise<0 | 1>} A promise that resolves with `1` when the teleport sequence is complete, or `0` if the teleport sequence fails.
     */
    teleportSequence(): Promise<0 | 1>;
    /**
     * Sends a teleport request from one player to another.
     *
     * @param {Player | executeCommandPlayerW} fromPlayer The player who sent this teleport request.
     * @param {Player | executeCommandPlayerW} toPlayer The player this teleport request was sent to.
     * @param {number} [sendTime=Date.now()] When this teleport request was sent. Defaults to the current time.
     * @returns {TeleportRequest} The teleport request that was sent.
     *
     * @throws {TypeError} If the {@link fromPlayer} or {@link toPlayer} parameter is not an instance of the {@link Player} class, or an instance of the {@link executeCommandPlayerW} class with a {@link Player} linked to it.
     * @throws {Error} If there is already a teleport request from the {@link fromPlayer} to the {@link toPlayer}.
     */
    static send(fromPlayer: Player | executeCommandPlayerW, toPlayer: Player | executeCommandPlayerW, sendTime?: number): TeleportRequest;
    /**
     * Gets all teleport requests from a player.
     *
     * @param {Player | executeCommandPlayerW} fromPlayer The player to get the teleport requests from.
     * @returns {TeleportRequest[]} The array of teleport requests sent by the player.
     *
     * @throws {TypeError} If the player is not an instance of the {@link Player} class, or an instance of the {@link executeCommandPlayerW} class with a {@link Player} linked to it.
     */
    static getRequestsFromPlayer(fromPlayer: Player): TeleportRequest[];
    /**
     * Gets all teleport requests to a player.
     *
     * @param {Player | executeCommandPlayerW} toPlayer The player to get the teleport requests to.
     * @returns {TeleportRequest[]} The array of teleport requests sent to the player.
     *
     * @throws {TypeError} If the player is not an instance of the {@link Player} class, or an instance of the {@link executeCommandPlayerW} class with a {@link Player} linked to it.
     */
    static getRequestsToPlayer(toPlayer: Player): TeleportRequest[];
    /**
     * Gets all active teleport requests.
     *
     * @returns {TeleportRequest[]} The array of active teleport requests.
     */
    static getAllRequests(): TeleportRequest[];
}
