import { EquipmentSlot, type Enchantment, type Vector3, Dimension, type Vector2, type DimensionLocation, GameMode, Player } from "@minecraft/server";
import { ban } from "./ban";
import * as playersave from "Main/player_save";
export declare const player_save_format_version = "1.1.0";
export interface savedItem {
    id?: string;
    count: number;
    slot?: number | EquipmentSlot | string;
    name?: string;
    lore?: string[];
    enchants?: Enchantment[];
    properties?: [id: string, value: string | number | Boolean | Vector3 | undefined][];
}
export interface savedPlayerData {
    name: string;
    id: string | number;
    nameTag?: string;
    tags?: string[];
    items?: {
        inventory: savedItem[] | undefined;
        equipment: savedItem[] | undefined;
        ender_chest: savedItem[] | undefined;
    };
    properties?: [id: string | undefined, value: string | number | Boolean | Vector3 | undefined][];
    lastOnline: Date | number;
    location?: Vector3;
    dimension?: Dimension | string;
    rotation?: Vector2;
    isOp?: boolean;
    spawnPoint?: DimensionLocation;
    gameMode?: GameMode | string;
    selectedSlot?: number;
    format_version?: string | number;
    player_save_format_version?: string | number;
    saveId?: string;
}
export declare class savedPlayer {
    name: string;
    id: string | number;
    nameTag?: string;
    tags?: string[];
    items?: {
        inventory: savedItem[] | undefined;
        equipment: savedItem[] | undefined;
        ender_chest: savedItem[] | undefined;
    };
    properties?: [id: string | undefined, value: string | number | Boolean | Vector3 | undefined][];
    lastOnline: Date | number;
    location?: Vector3;
    dimension?: Dimension | string;
    rotation?: Vector2;
    isOp?: boolean;
    spawnPoint?: DimensionLocation;
    gameMode?: GameMode | string;
    selectedSlot?: number;
    scoreboardIdentity?: number;
    format_version: string | number;
    player_save_format_version: string | number;
    saveId: string;
    constructor(data: savedPlayerData);
    save(): void;
    remove(): void;
    get isOnline(): boolean;
    get isBanned(): boolean;
    get isNameBanned(): boolean;
    get isIdBanned(): boolean;
    get bans(): {
        all: ban[];
        valid: ban[];
        expired: ban[];
    };
    get nameBans(): {
        all: ban[];
        valid: ban[];
        expired: ban[];
    };
    get idBans(): {
        all: ban[];
        valid: ban[];
        expired: ban[];
    };
    static getSavedPlayerIds(): string[];
    static savePlayerData(savedPlayerData: savedPlayerData): string;
    static savePlayer(player: Player): string;
    static getSavedPlayer(savedPlayerId: string): playersave.savedPlayer;
    static getSavedPlayers(): playersave.savedPlayer[];
    static getSavedPlayersAlphabeticalOrder(): playersave.savedPlayer[];
}
