import { Player } from "@minecraft/server";
import { savedPlayer, type savedPlayerData } from "./player_save.js";
import * as bans from "./ban";
export declare const ban_format_version = "1.2.0";
export declare class ban {
    type: "name" | "id";
    playerName?: string;
    originalPlayerId?: string | number;
    playerId?: string | number;
    originalPlayerName?: string;
    removeAfterBanExpires: boolean;
    unbanDate: Date | number;
    banDate: Date | number;
    bannedById: string | number;
    bannedByName: string;
    reason?: string;
    format_version: string | number;
    ban_format_version: string | number;
    banId: string;
    constructor(ban: {
        type: "name" | "id";
        banId?: string;
        unbanDate: Date | number;
        banDate: Date | number;
        bannedById: string | number;
        bannedByName: string;
        reason?: string;
        removeAfterBanExpires?: boolean;
        playerName?: string;
        originalPlayerId?: string | number;
        playerId?: string | number;
        originalPlayerName?: string;
        format_version?: string | number;
        ban_format_version?: string | number;
    } | ban);
    get isExpired(): boolean;
    get isValid(): boolean;
    get timeRemainingRaw(): number;
    get timeRemaining(): {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        milliseconds: number;
    };
    save(): void;
    remove(): void;
    static getBanIds(banType?: string): string[];
    static getValidBanIds(banType?: string): string[];
    static getExpiredBanIds(banType?: string): string[];
    static saveBan(ban: {
        type: "name" | "id";
        unbanDate: Date | number;
        banDate: Date | number;
        bannedById: string | number;
        bannedByName: string;
        reason: string;
        removeAfterBanExpires?: boolean;
        playerName?: string;
        originalPlayerId?: string | number;
        playerId?: string | number;
        originalPlayerName?: string;
        format_version?: string | number;
        ban_format_version?: string | number;
        banId?: string;
    } | ban): void;
    static getBan(banId: string): bans.ban;
    static getBans(): {
        idBans: bans.ban[];
        nameBans: bans.ban[];
        allBans: bans.ban[];
    };
    static getValidBans(): {
        idBans: bans.ban[];
        nameBans: bans.ban[];
        allBans: bans.ban[];
    };
    static getExpiredBans(): {
        idBans: bans.ban[];
        nameBans: bans.ban[];
        allBans: bans.ban[];
    };
    static testForBannedPlayer(player: Player | savedPlayer | savedPlayerData): boolean;
    static testForNameBannedPlayer(player: Player | savedPlayer | savedPlayerData): boolean;
    static testForIdBannedPlayer(player: Player | savedPlayer | savedPlayerData): boolean;
    static executeOnBannedPlayers(callbackfn: (player: Player, index: number, array: any[]) => unknown): any[];
}
export declare function startCheckingForBannedPlayers(): Promise<void>;
export declare function stopCheckingForBannedPlayers(): Promise<0 | 1>;
