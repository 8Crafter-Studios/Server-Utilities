import { Player } from "@minecraft/server";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
export declare class Bounty {
    readonly id: bigint;
    playerId: string;
    targetId: string;
    value: bigint;
    creationTime: number;
    valid: boolean;
    status: "none" | "deleted" | "claimed" | "canceled";
    private constructor();
    private init;
    delete(): boolean;
    cancel(): boolean;
    claim(claimer: Player): boolean;
    getLinkedTargetSavedPlayer(): savedPlayer | undefined;
    getLinkedSourceSavedPlayer(): savedPlayer | undefined;
    toJSONB(): {
        readonly id: bigint;
        playerId: string;
        targetId: string;
        value: bigint;
        creationTime: number;
        valid: boolean;
        status: "none" | "deleted" | "claimed" | "canceled";
    };
    static loadBounties(): void;
    static saveBounties(): void;
    static placeBountyOnPlayer(value: bigint, playerId: string, targetId: string, playerDisplayName?: string, targetDisplayName?: string, silent?: boolean, chargePlayer?: boolean, creationTime?: number): void;
    static getBountiesFromPlayer(playerId: string): Bounty[];
    static getBountiesOnPlayer(targetId: string): Bounty[];
    static getMergedBounties(): Bounty[];
    static getAllBounties(): Bounty[];
}
export declare class TotalBounty {
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
