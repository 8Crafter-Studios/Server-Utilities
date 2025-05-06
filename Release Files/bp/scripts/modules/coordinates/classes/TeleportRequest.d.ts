import { Player } from "@minecraft/server";
/**
 * The TeleportRequest class, it is used to handle teleport requests.
 */
export declare class TeleportRequest {
    /**
     * The unique identifier of this teleport request.
     */
    readonly id: bigint;
    /**
     * The player who sent this teleport request.
     */
    player: Player;
    /**
     * The player this teleport request was sent to.
     */
    target: Player;
    /**
     * When this teleport request was sent.
     */
    sendTime: number;
    /**
     * Whether or not this teleport request is valid.
     */
    valid: boolean;
    /**
     * Whether or not this teleport request has been accepted.
     */
    accepted: boolean;
    private constructor();
    private init;
    delete(): boolean;
    cancel(): boolean;
    timeOut(): boolean;
    deny(): boolean;
    accept(): Promise<boolean>;
    cancelSequence(): void;
    timeOutSequence(): void;
    denySequence(): void;
    teleportSequence(): Promise<number>;
    static send(fromPlayer: Player, toPlayer: Player, sendTime?: number): void;
    static getRequestsFromPlayer(fromPlayer: Player): TeleportRequest[];
    static getRequestsToPlayer(toPlayer: Player): TeleportRequest[];
    static getAllRequests(): TeleportRequest[];
}
