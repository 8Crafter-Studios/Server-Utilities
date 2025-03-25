import { EquipmentSlot, type Enchantment, type Vector3, Dimension, type Vector2, type DimensionLocation, GameMode, MemoryTier, PlatformType, Player, ItemStack } from "@minecraft/server";
import type { PlayerPermissions } from "init/classes/PlayerPermissions";
import { ban } from "modules/ban/classes/ban";
export type PlayerDataSaveMode = "full" | "medium" | "lite";
export type SavedPlayerOnJoinAction = SavedPlayerOnJoinAction_add_tag | SavedPlayerOnJoinAction_remove_tag | SavedPlayerOnJoinAction_add_tags | SavedPlayerOnJoinAction_remove_tags | SavedPlayerOnJoinAction_remove_item_in_slot | SavedPlayerOnJoinAction_clear_inventory | SavedPlayerOnJoinAction_set_permission<keyof ReturnType<PlayerPermissions["toJSON"]>> | SavedPlayerOnJoinAction_send_message;
export interface SavedPlayerOnJoinAction_add_tag {
    type: "add_tag";
    tag: string;
}
export interface SavedPlayerOnJoinAction_remove_tag {
    type: "remove_tag";
    tag: string;
}
export interface SavedPlayerOnJoinAction_add_tags {
    type: "add_tags";
    tags: string[];
}
export interface SavedPlayerOnJoinAction_remove_tags {
    type: "remove_tags";
    tags: string[];
}
export interface SavedPlayerOnJoinAction_remove_item_in_slot {
    type: "remove_item_in_slot";
    slot: number | EquipmentSlot | "~" | "cursor";
}
export interface SavedPlayerOnJoinAction_clear_inventory {
    type: "clear_inventory";
}
export interface SavedPlayerOnJoinAction_set_permission<P extends keyof ReturnType<PlayerPermissions["toJSON"]>> {
    type: "set_permission";
    permission: P;
    value: ReturnType<PlayerPermissions["toJSON"]>[P];
}
export interface SavedPlayerOnJoinAction_send_message {
    type: "send_message";
    message: string;
}
export type SavedPlayerOnJoinActions = SavedPlayerOnJoinAction[];
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
    id: string;
    nameTag?: string;
    tags?: string[];
    items?: {
        inventory: savedItem[] | undefined;
        equipment: savedItem[] | undefined;
        ender_chest: savedItem[] | undefined;
    };
    properties?: [id: string | undefined, value: string | number | Boolean | Vector3 | undefined][];
    lastOnline: number;
    firstJoined?: number;
    location?: Vector3;
    dimension?: Dimension | string;
    rotation?: Vector2;
    isOp?: boolean;
    spawnPoint?: DimensionLocation;
    gameMode?: GameMode | string;
    selectedSlotIndex?: number;
    scoreboardIdentity?: number;
    format_version?: string;
    player_save_format_version?: string;
    saveId?: string;
    memoryTier?: MemoryTier;
    maxRenderDistance?: number;
    platformType?: PlatformType;
    inputPermissions?: {
        /**
         * @deprecated Only exists in format versions below `1.6.0`.
         * @deprecated Supercceeded by `Camera`.
         */
        cameraEnabled?: boolean;
        /**
         * @deprecated Only exists in format versions below `1.6.0`.
         * @deprecated Supercceeded by `Movement`.
         */
        movementEnabled?: boolean;
        Camera?: boolean;
        Movement?: boolean;
        LateralMovement?: boolean;
        Sneak?: boolean;
        Jump?: boolean;
        Mount?: boolean;
        Dismount?: boolean;
        MoveForward?: boolean;
        MoveBackward?: boolean;
        MoveLeft?: boolean;
        MoveRight?: boolean;
    };
    /**
     * @since format version 1.6.0
     * @since v1.28.0-preview.20+BUILD.1
     */
    inputInfo?: {
        lastInputModeUsed: Player["inputInfo"]["lastInputModeUsed"];
        touchOnlyAffectsHotbar: Player["inputInfo"]["touchOnlyAffectsHotbar"];
    };
    /**
     * @since format version 1.6.0
     * @since v1.28.0-preview.20+BUILD.1
     */
    playerPermissions?: ReturnType<PlayerPermissions["toJSON"]>;
    /**
     * @since format version 1.6.0
     * @since v1.28.0-preview.20+BUILD.1
     */
    onJoinActions?: SavedPlayerOnJoinActions;
    /**
     * @since format version 1.6.0
     * @since v1.33.0-preview.20+BUILD.4
     */
    saveMode?: PlayerDataSaveMode;
}
export declare class savedPlayer {
    name: string;
    id: string;
    nameTag?: string;
    tags?: string[];
    items?: {
        inventory: savedItem[] | undefined;
        equipment: savedItem[] | undefined;
        ender_chest: savedItem[] | undefined;
    };
    properties?: [id: string | undefined, value: string | number | Boolean | Vector3 | undefined][];
    lastOnline: number;
    firstJoined: number;
    location?: Vector3;
    dimension?: Dimension | string;
    rotation?: Vector2;
    isOp?: boolean;
    spawnPoint?: DimensionLocation;
    gameMode?: GameMode | string;
    selectedSlotIndex?: number;
    scoreboardIdentity?: number;
    format_version: string;
    player_save_format_version: string;
    saveId: string;
    memoryTier?: MemoryTier;
    maxRenderDistance?: number;
    platformType?: PlatformType;
    inputPermissions?: savedPlayerData["inputPermissions"];
    /**
     * @since format version 1.6.0
     * @since v1.28.0-preview.20+BUILD.1
     */
    inputInfo?: {
        lastInputModeUsed: Player["inputInfo"]["lastInputModeUsed"];
        touchOnlyAffectsHotbar: Player["inputInfo"]["touchOnlyAffectsHotbar"];
    };
    /**
     * @since format version 1.6.0
     * @since v1.28.0-preview.20+BUILD.1
     */
    playerPermissions?: ReturnType<PlayerPermissions["toJSON"]>;
    /**
     * @since format version 1.6.0
     * @since v1.28.0-preview.20+BUILD.1
     */
    onJoinActions: SavedPlayerOnJoinActions;
    saveMode: PlayerDataSaveMode;
    constructor(data: savedPlayerData);
    save(): void;
    remove(): void;
    getItems(sourceLoc: DimensionLocation): {
        Head?: ItemStack | undefined;
        Chest?: ItemStack | undefined;
        Legs?: ItemStack | undefined;
        Feet?: ItemStack | undefined;
        Mainhand?: ItemStack | undefined;
        Offhand?: ItemStack | undefined;
        Cursor?: ItemStack | undefined;
        0?: ItemStack | undefined;
        1?: ItemStack | undefined;
        2?: ItemStack | undefined;
        3?: ItemStack | undefined;
        4?: ItemStack | undefined;
        5?: ItemStack | undefined;
        6?: ItemStack | undefined;
        7?: ItemStack | undefined;
        8?: ItemStack | undefined;
        9?: ItemStack | undefined;
        10?: ItemStack | undefined;
        11?: ItemStack | undefined;
        12?: ItemStack | undefined;
        13?: ItemStack | undefined;
        14?: ItemStack | undefined;
        15?: ItemStack | undefined;
        16?: ItemStack | undefined;
        17?: ItemStack | undefined;
        18?: ItemStack | undefined;
        19?: ItemStack | undefined;
        20?: ItemStack | undefined;
        21?: ItemStack | undefined;
        22?: ItemStack | undefined;
        23?: ItemStack | undefined;
        24?: ItemStack | undefined;
        25?: ItemStack | undefined;
        26?: ItemStack | undefined;
        27?: ItemStack | undefined;
        28?: ItemStack | undefined;
        29?: ItemStack | undefined;
        30?: ItemStack | undefined;
        31?: ItemStack | undefined;
        32?: ItemStack | undefined;
        33?: ItemStack | undefined;
        34?: ItemStack | undefined;
        35?: ItemStack | undefined;
    };
    addOnJoinAction(action: SavedPlayerOnJoinAction): this;
    addOnJoinActions(actions: SavedPlayerOnJoinActions): this;
    removeOnJoinActionsOfType(type: SavedPlayerOnJoinAction["type"]): this;
    executeOnJoinActions(): Promise<void>;
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
    /**
     * Returns true if the player's saved inventory data is using the legacy pre-1.5.0 format, this would be the case if the player's inventory was saved before the 1.5.0 player save format version, or the {@linkcode config.system.useLegacyPlayerInventoryDataSaveSystem} option was set to true when the player's inventory was saved.
     */
    get hasLegacyInventorySave(): boolean;
    get hasModernInventorySave(): boolean;
    static getSavedPlayerIds(): string[];
    static savePlayerData(savedPlayerData: savedPlayerData): string;
    static saveInventoryAsync(player: Player, options?: {
        rethrowErrorInFinally?: boolean;
        bypassParameterTypeChecks?: boolean;
    }): Promise<void>;
    static saveInventory(player: Player, options?: {
        rethrowErrorInFinally?: boolean;
        bypassParameterTypeChecks?: boolean;
    }): void;
    static getSavedInventory(playerId: string, sourceLoc: DimensionLocation, options?: {
        rethrowErrorInFinally?: boolean;
        bypassParameterTypeChecks?: boolean;
    }): {
        Head?: ItemStack | undefined;
        Chest?: ItemStack | undefined;
        Legs?: ItemStack | undefined;
        Feet?: ItemStack | undefined;
        Mainhand?: ItemStack | undefined;
        Offhand?: ItemStack | undefined;
        Cursor?: ItemStack | undefined;
        0?: ItemStack | undefined;
        1?: ItemStack | undefined;
        2?: ItemStack | undefined;
        3?: ItemStack | undefined;
        4?: ItemStack | undefined;
        5?: ItemStack | undefined;
        6?: ItemStack | undefined;
        7?: ItemStack | undefined;
        8?: ItemStack | undefined;
        9?: ItemStack | undefined;
        10?: ItemStack | undefined;
        11?: ItemStack | undefined;
        12?: ItemStack | undefined;
        13?: ItemStack | undefined;
        14?: ItemStack | undefined;
        15?: ItemStack | undefined;
        16?: ItemStack | undefined;
        17?: ItemStack | undefined;
        18?: ItemStack | undefined;
        19?: ItemStack | undefined;
        20?: ItemStack | undefined;
        21?: ItemStack | undefined;
        22?: ItemStack | undefined;
        23?: ItemStack | undefined;
        24?: ItemStack | undefined;
        25?: ItemStack | undefined;
        26?: ItemStack | undefined;
        27?: ItemStack | undefined;
        28?: ItemStack | undefined;
        29?: ItemStack | undefined;
        30?: ItemStack | undefined;
        31?: ItemStack | undefined;
        32?: ItemStack | undefined;
        33?: ItemStack | undefined;
        34?: ItemStack | undefined;
        35?: ItemStack | undefined;
    };
    static savePlayer(player: Player): string | undefined;
    static savePlayerAsync(player: Player): Promise<string | undefined>;
    static getSavedPlayer(savedPlayerId: string): savedPlayer | undefined;
    static getSavedPlayers(): savedPlayer[];
    static getSavedPlayersAlphabeticalOrder(): savedPlayer[];
}
