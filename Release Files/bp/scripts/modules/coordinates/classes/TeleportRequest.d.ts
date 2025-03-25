import { Player } from "@minecraft/server";
export declare class TeleportRequest {
    readonly id: bigint;
    player: Player;
    target: Player;
    sendTime: number;
    valid: boolean;
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
