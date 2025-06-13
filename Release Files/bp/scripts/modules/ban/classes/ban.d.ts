import { Player } from "@minecraft/server";
import type { savedPlayer, savedPlayerData } from "modules/player_save/classes/savedPlayer";
export declare class ban {
    type: "name" | "id";
    playerName?: string;
    originalPlayerId?: string;
    playerId?: string;
    originalPlayerName?: string;
    removeAfterBanExpires: boolean;
    unbanDate: number;
    banDate: number;
    bannedById: string;
    bannedByName: string;
    reason?: string;
    format_version: string;
    ban_format_version: string;
    banId: string;
    hasAdvancedReason: boolean;
    constructor(ban: {
        type: "name" | "id";
        banId?: string;
        unbanDate: number;
        banDate: number;
        bannedById: string;
        bannedByName: string;
        reason?: string;
        removeAfterBanExpires?: boolean;
        playerName?: string;
        originalPlayerId?: string;
        playerId?: string;
        originalPlayerName?: string;
        format_version?: string;
        ban_format_version?: string;
        hasAdvancedReason?: boolean;
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
    get timeRemainingString(): string;
    get duration(): {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        milliseconds: number;
    };
    get durationString(): string;
    get isTemporary(): boolean;
    get isPermanent(): boolean;
    get kickMessage(): string | undefined;
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
    static getBan(banId: string): ban | undefined;
    static getBans(): {
        idBans: ban[];
        nameBans: ban[];
        allBans: ban[];
    };
    static getValidBans(): {
        idBans: ban[];
        nameBans: ban[];
        allBans: ban[];
    };
    static getExpiredBans(): {
        idBans: ban[];
        nameBans: ban[];
        allBans: ban[];
    };
    static getBansAutoRefresh(): {
        idBans: ban[];
        nameBans: ban[];
        allBans: ban[];
    };
    static getValidBansAutoRefresh(): {
        idBans: ban[];
        nameBans: ban[];
        allBans: ban[];
    };
    static getExpiredBansAutoRefresh(): {
        idBans: ban[];
        nameBans: ban[];
        allBans: ban[];
    };
    static getBansNoRefresh(): {
        idBans: ban[];
        nameBans: ban[];
        allBans: ban[];
    };
    static getValidBansNoRefresh(): {
        idBans: ban[];
        nameBans: ban[];
        allBans: ban[];
    };
    static getExpiredBansNoRefresh(): {
        idBans: ban[];
        nameBans: ban[];
        allBans: ban[];
    };
    static testForBannedPlayer(player: Player | savedPlayer | savedPlayerData): boolean;
    static testForNameBannedPlayer(player: Player | savedPlayer | savedPlayerData): boolean;
    static testForIdBannedPlayer(player: Player | savedPlayer | savedPlayerData): boolean;
    static executeOnBannedPlayers(callbackfn: (player: Player, index: number, array: any[]) => unknown): any[];
    static refreshBans(): void;
}
