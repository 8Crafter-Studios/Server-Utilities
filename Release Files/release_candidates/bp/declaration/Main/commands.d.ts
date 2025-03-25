import { Block, BlockPermutation, ChatSendBeforeEvent, Dimension, EntityInventoryComponent, ItemStack, Player, Entity, ContainerSlot, EntityEquippableComponent, type DimensionLocation, type Vector3, type Vector2, GameMode, type RawMessage, type MusicOptions, type PlayerSoundOptions, type EntityApplyDamageOptions, type EntityApplyDamageByProjectileOptions, MolangVariableMap, type BlockRaycastOptions, type EntityComponentTypeMap, EffectType, type EntityRaycastOptions, type EntityQueryOptions, type PlayAnimationOptions, type TeleportOptions, type BlockRaycastHit, type BlockComponentTypeMap, PlayerCursorInventoryComponent, type VectorXZ, type VectorYZ } from "@minecraft/server";
import { WorldPosition, type RotationLocation } from "./coordinates";
import { PlayerNotifications } from "./ui.js";
import * as mcServer from "@minecraft/server";
import * as cmds from "./commands";
import { MoneySystem } from "../ExtraFeatures/money";
export declare const cmdsmetaimport: ImportMeta;
export declare function cmdsEval(x: string, eventData?: any, bypassChatInputRequests?: any, runreturn?: any, returnBeforeChatSend?: any, returnBeforeChatCommandsOrChatSend?: any, event?: any, player?: any, sendToPlayers?: any, newMessage?: any, switchTest?: any, switchTestB?: any, commanda?: any): any;
export declare function indirectCmdsEval(x: string): any;
export declare function cmdsRun(x: (...args: any[]) => any, ...args: any[]): any;
export declare const disconnectingPlayers: string[];
export type commandCategory = "items" | "misc" | "invsee" | "players" | "containers/inventories" | "entities" | "warps" | "world" | "uis" | "shop_system" | "dangerous" | "Entity Scale Add-On" | "built-in" | "custom" | "all";
export declare let idGeneratorIndex: number;
export declare function idGenerator(): string;
export declare const commands_format_version = "33.12.17";
export type evaluateParametersArgumentTypes = "presetText" | "number" | "boolean" | "string" | "json";
export type command_formats_type_list = (string | string[] | command_formats_type_list | {
    format: string | command_formats_type_list;
    description?: string;
})[] | string | {
    format: string | command_formats_type_list;
    description?: string;
};
export declare class command {
    type: "built-in" | "custom" | "unknown";
    commandName: string;
    currentCommandName: string;
    parameters?: {
        name: string;
        internalType?: evaluateParametersArgumentTypes;
        type?: "string" | "integer" | "float" | "decimal" | "hexadecimal" | "binary" | "triary" | "base64" | "unicode" | "letter" | "regexp" | "text" | "message" | "any" | "customjson" | "escapablestring" | "boolean" | "array" | "number" | "object" | "javascript" | "json" | "identifier" | "targetselector" | "none" | string;
        displayType?: "string" | "str" | "integer" | "int" | "float" | "flt" | "decimal" | "dec" | "hexadecimal" | "hex" | "binary" | "bin" | "triary" | "tri" | "base64" | "b64" | "unicode" | "uni" | "letter" | "let" | "regexp" | "regex" | "text" | "txt" | "message" | "msg" | "anything" | "any" | "customJSON" | "cJSON" | "escapableString" | "escString" | "escStr" | "boolean" | "bool" | "array" | "arry" | "number" | "num" | "object" | "obj" | "JavaScript" | "JS" | "JavaScriptObjectNotation" | "JSON" | "identifier" | "id" | "uuid" | "UUID" | "xuid" | "XUID" | "cuid" | "CUID" | "targetSelector" | "target" | "" | "none" | string;
        evaluationType?: string;
    }[];
    escregexp?: {
        v: string;
        f?: string;
    };
    currentescregexp?: {
        v: string;
        f?: string;
    };
    selectedalias?: {
        index: number;
        alias: {
            commandName: string;
            escregexp?: {
                v: string;
                f?: string;
            };
            regexp: RegExp;
            aliasTo?: string;
        };
    };
    command_version?: string | number;
    formats: command_formats_type_list;
    description?: string;
    format_version: string | number;
    commands_format_version: string | number;
    customCommandId?: string;
    commandSettingsId: string;
    formatting_code: string;
    customCommandType?: "commands" | "javascript";
    customCommandPrefix?: string;
    customCommandParametersEnabled?: boolean;
    customCommandCodeLines?: number;
    customCommandParametersList?: evaluateParametersArgumentTypes[];
    category?: string | string[];
    categories?: string[];
    constructor(command: {
        type: "built-in" | "custom" | "unknown";
        formatting_code?: string;
        category?: string | string[];
        customCommandParametersList?: evaluateParametersArgumentTypes[];
        customCommandCodeLines?: number;
        customCommandParametersEnabled?: boolean;
        customCommandPrefix?: string;
        customCommandType?: "commands" | "javascript";
        customCommandId?: string;
        commandSettingsId?: string;
        command_version?: string | number;
        commandName: string;
        description?: string;
        escregexp?: {
            v: string;
            f?: string;
        };
        formats?: command_formats_type_list;
        format_version?: string | number;
        commands_format_version?: string | number;
    } | command);
    get isHidden(): boolean;
    get isDeprecated(): boolean;
    get isFunctional(): boolean;
    get releaseStage(): string;
    get regexp(): RegExp;
    get currentregexp(): RegExp;
    get aliases(): {
        commandName: string;
        escregexp?: {
            v: string;
            f?: string;
        };
        regexp: RegExp;
        aliasTo?: string;
    }[];
    get settings(): cmds.commandSettings;
    get code(): string[];
    save(): string;
    remove(): void;
    testCanPlayerUseCommand(player: Player | executeCommandPlayerW | Entity): boolean;
    run(commandstring: string, executor: Player | executeCommandPlayerW | mcServer.Entity | Dimension, player?: Player | executeCommandPlayerW, event?: Object): void;
    static get(commandName: string, type?: "built-in" | "custom" | "unknown"): cmds.command;
    static findBuiltIn(commandString: string, returnCommandInsteadOfAlias?: boolean): {
        type: "custom" | "unknown" | "built-in";
        requiredTags: string[];
        formatting_code: string;
        commandName: string;
        escregexp: {
            v: string;
            f?: string;
        };
        formats: cmds.command_formats_type_list;
        command_version: string;
        description: string;
        commandSettingsId: string;
        aliases?: {
            commandName: string;
            escregexp?: {
                v?: string;
                f?: string;
            };
        }[];
        category?: cmds.commandCategory | cmds.commandCategory[];
        deprecated?: boolean;
        functional?: boolean;
        hidden?: boolean;
        enabled?: boolean;
    } | {
        index: number;
        alias: {
            commandName: string;
            escregexp?: {
                v: string;
                f?: string;
            };
            regexp: RegExp;
            aliasTo?: string;
        };
        aliasTo: {
            type: "custom" | "unknown" | "built-in";
            requiredTags: string[];
            formatting_code: string;
            commandName: string;
            escregexp: {
                v: string;
                f?: string;
            };
            formats: cmds.command_formats_type_list;
            command_version: string;
            description: string;
            commandSettingsId: string;
            aliases?: {
                commandName: string;
                escregexp?: {
                    v?: string;
                    f?: string;
                };
            }[];
            category?: cmds.commandCategory | cmds.commandCategory[];
            deprecated?: boolean;
            functional?: boolean;
            hidden?: boolean;
            enabled?: boolean;
        };
    };
    static getDefaultCommands(noSort?: boolean): cmds.command[];
    static getDefaultCommandsOfCategory(category: commandCategory, noSort?: boolean): cmds.command[];
    static getDefaultCommandsOfCategory(category: string, noSort?: boolean): cmds.command[];
    static getCommandAliases(): {
        [k: string]: {
            commandName: string;
            escregexp?: {
                v: string;
                f?: string;
            };
            regexp: RegExp;
            aliasTo?: string;
        }[];
    };
    static getCustomCommands(noSort?: boolean): cmds.command[];
    static get defaultPrefix(): string;
    static get dp(): string;
}
export declare const command_settings_format_version = "2.0.0-beta.1";
export declare class commandSettings {
    type: "built-in" | "custom" | "unknown";
    commandName: string;
    customCommandId?: string;
    commandSettingsId: string;
    command?: command;
    defaultSettings?: {
        type: "built-in" | "custom" | "unknown";
        requiredTags: string[];
        formatting_code: string;
        commandName: string;
        escregexp: {
            v: string;
        };
        formats: command_formats_type_list;
        command_version: string;
        description: string;
        commandSettingsId: string;
        deprecated?: boolean;
        functional?: boolean;
        hidden?: boolean;
        enabled?: boolean;
    };
    constructor(commandSettingsId: string, command?: command);
    get parsed(): any;
    get enabled(): boolean;
    set enabled(enabled: boolean);
    get requiredTags(): string[];
    set requiredTags(requiredTags: string[]);
    get requiredPermissionLevel(): string | number | undefined;
    set requiredPermissionLevel(requiredPermissionLevel: string | number | undefined);
    get requiresOp(): boolean;
    set requiresOp(requiresOp: boolean);
    get settings_version(): any;
    get isSaved(): boolean;
    toJSON(): any;
    save(settings?: {
        type: "built-in" | "custom" | "unknown";
        commandName: string;
        customCommandId: string;
        commandSettingsId: string;
        enabled: boolean;
        requiredTags: string[];
        requiredPermissionLevel: string | number;
        requiresOp: boolean;
        settings_version: any;
    } | Object): void;
    remove(): void;
}
export type mergedExecuteCommandPlayer = executeCommandPlayerW & Player;
export type extendedExecuteCommandPlayerW = executeCommandPlayerW & {
    readonly id: string;
    readonly typeId: string;
    readonly name: string;
};
export declare class executeCommandPlayerW {
    player?: Player;
    sendErrorsTo?: Player | Console | Player[] | (() => Player | Player[] | Console) | null | undefined;
    modifiedlocation?: Vector3;
    modifieddimension?: Dimension;
    rotation?: Vector2;
    block?: Block;
    fromPlayer: boolean;
    fromEntity: boolean;
    isFromWorldPosition: boolean;
    fromPlayerWorldPosition: boolean;
    fromEntityWorldPosition: boolean;
    fromBlockWorldPosition: boolean;
    rawWorldPosition?: WorldPosition;
    raw?: any;
    constructor(player: Player | Entity | WorldPosition, sendErrorsTo?: Player | Console | null | number);
    toWorldPosition(): WorldPosition;
    run(command: string): void;
    sendError(error: any, sendErrorAsIs?: boolean, sendErrorsTo?: Player | Console | Player[] | (() => Player | Player[] | Console) | null | undefined): void;
    sendMessageB(message: string | RawMessage | (string | RawMessage)[], sendErrorsTo?: Player | Console | Player[] | (() => Player | Player[] | Console) | null | undefined): void;
    get inventory(): EntityInventoryComponent | undefined;
    get equippable(): EntityEquippableComponent | undefined;
    get cursorInventory(): PlayerCursorInventoryComponent | undefined;
    get heldItem(): ItemStack | undefined;
    get activeSlot(): ContainerSlot | undefined;
    get moneySystem(): MoneySystem;
    get playerNotifications(): PlayerNotifications;
    get dimensionLocation(): Vector3 & {
        dimension: Dimension;
    };
    get dimension(): Dimension;
    get location(): Vector3;
    get locationstring(): `${number} ${number} ${number}`;
    get rotationstring(): `${number} ${number}`;
    get locationrotation(): RotationLocation;
    get directionvector(): Vector3;
    get xy(): Vector2;
    get yz(): VectorYZ;
    get xz(): VectorXZ;
    get chunkIndex(): VectorXZ;
    get x(): number;
    get y(): number;
    get z(): number;
    get rotx(): number;
    get roty(): number;
    get timeZone(): number;
    set timeZone(timezone: number | string | boolean | null | undefined);
    get camera(): mcServer.Camera;
    get isEmoting(): boolean;
    get isFlying(): boolean;
    get isGliding(): boolean;
    get isJumping(): boolean;
    get isClimbing(): boolean;
    get isFalling(): boolean;
    get isInWater(): boolean;
    get isOnGround(): boolean;
    get isSleeping(): boolean;
    get isSprinting(): boolean;
    get isSwimming(): boolean;
    get scoreboardIdentity(): mcServer.ScoreboardIdentity;
    get level(): number;
    get onScreenDisplay(): mcServer.ScreenDisplay;
    get selectedSlotIndex(): number;
    set selectedSlotIndex(slotNumber: number);
    get totalXpNeededForNextLevel(): number;
    get xpEarnedAtCurrentLevel(): number;
    get isSneaking(): boolean;
    set isSneaking(isSneaking: boolean);
    get typeId(): string;
    get nameTag(): string | undefined | null;
    set nameTag(nameTag: string | undefined | null);
    get inputPermissions(): mcServer.PlayerInputPermissions;
    get clientSystemInfo(): mcServer.ClientSystemInfo;
    addEffect(effectType: string | mcServer.EffectType, duration: number, options?: mcServer.EntityEffectOptions): mcServer.Effect;
    addExperience(amount: number): number;
    getRotation(): Vector2;
    getViewDirection(): Vector3;
    addLevels(amount: number): number;
    eatItem(itemStack: ItemStack): void;
    getGameMode(): GameMode;
    getItemCooldown(itemCategory: string): number;
    getSpawnPoint(): DimensionLocation;
    getTotalXp(): number;
    isOp(): boolean;
    playMusic(trackId: string, musicOptions?: MusicOptions): void;
    playSound(soundId: string, soundOptions?: PlayerSoundOptions): void;
    postClientMessage(id: string, value: string): void;
    queueMusic(trackId: string, musicOptions?: MusicOptions): void;
    resetLevel(): void;
    sendMessage(message: string | RawMessage | (string | RawMessage)[]): void;
    setGameMode(gameMode?: GameMode): void;
    setOp(isOp: boolean): void;
    setSpawnPoint(spawnPoint?: DimensionLocation): void;
    spawnParticle(effectName: string, location: Vector3, molangVariables?: MolangVariableMap): void;
    startItemCooldown(itemCategory: string, tickDuration: number): void;
    stopMusic(): void;
    addTag(tag: string): boolean;
    applyDamage(amount: number, options?: EntityApplyDamageByProjectileOptions | EntityApplyDamageOptions): boolean;
    applyImpulse(vector: Vector3): void;
    applyKnockback(directionX: number, directionZ: number, horizontalStrength: number, verticalStrength: number): void;
    clearDynamicProperties(): void;
    clearVelocity(): void;
    extinguishFire(useEffects?: boolean): boolean;
    getBlockFromViewDirection(options?: BlockRaycastOptions): BlockRaycastHit;
    getComponent<T extends keyof EntityComponentTypeMap>(componentId: T): EntityComponentTypeMap[T] | undefined;
    getComponent<T extends keyof BlockComponentTypeMap>(componentId: T): BlockComponentTypeMap[T] | undefined;
    getComponents(): mcServer.EntityComponent[];
    getDynamicProperty(identifier: string): string | number | boolean | Vector3;
    getDynamicPropertyIds(): string[];
    getDynamicPropertyTotalByteCount(): number;
    getEffect(effectType: string | EffectType): mcServer.Effect;
    getEffects(): mcServer.Effect[];
    getEntitiesFromViewDirection(options?: EntityRaycastOptions): mcServer.EntityRaycastHit[];
    getHeadLocation(): Vector3;
    getProperty(identifier: string): string | number | boolean;
    getTags(): string[];
    getVelocity(): Vector3;
    hasComponent(componentId: string): boolean;
    hasTag(tag: string): boolean;
    isValid(): boolean;
    kill(): boolean;
    matches(options: EntityQueryOptions): boolean;
    playAnimation(animationName: string, options?: PlayAnimationOptions): void;
    remove(): void;
    removeEffect(effectType: string | EffectType): boolean;
    removeTag(tag: string): boolean;
    resetProperty(identifier: string): string | number | boolean;
    runCommand(commandString: string): mcServer.CommandResult;
    runCommandAsync(commandString: string): Promise<mcServer.CommandResult>;
    setDynamicProperty(identifier: string, value?: string | number | boolean | Vector3): void;
    setOnFire(seconds: number, useEffects?: boolean): boolean;
    setProperty(identifier: string, value: string | number | boolean): void;
    setRotation(rotation: Vector2): void;
    teleport(location: Vector3, teleportOptions?: TeleportOptions): void;
    triggerEvent(eventName: string): void;
    tryTeleport(location: Vector3, teleportOptions?: TeleportOptions): boolean;
}
export declare class executeCommandPlayer extends executeCommandPlayerW {
    get id(): string;
    get name(): string;
}
export declare class HomeSystem {
    constructor();
    static home_format_version: string;
    static getHomes(homeIds: string[]): cmds.Home[];
    static getAllHomes(): cmds.Home[];
    static getHomeIds(): string[];
    static getHomeIdsForPlayer(player: Player | extendedExecuteCommandPlayerW | string): string[];
    static getHomesForPlayer(player: Player | extendedExecuteCommandPlayerW | string): cmds.Home[];
    static testIfPlayerAtMaxHomes(player: Player | extendedExecuteCommandPlayerW | string): boolean;
    static get maxHomesPerPlayer(): number;
    static set maxHomesPerPlayer(maxHomes: number);
}
export declare class Home {
    location: DimensionLocation;
    name: string;
    ownerId: string;
    ownerName?: string;
    saveId: string;
    format_version?: string;
    home_format_version?: string;
    constructor(home: {
        location: DimensionLocation;
        name: string;
        owner?: Player;
        ownerId?: string;
        ownerName?: string;
        saveId: string;
        format_version?: string;
        home_format_version?: string;
    });
    get owner(): Player;
    get isOwnerOnline(): boolean;
    get isSaved(): boolean;
    toJSON(): {
        location: DimensionLocation & {
            dimension: string;
        };
        name: string;
        ownerId: string;
        ownerName: string;
        format_version: string;
        home_format_version: string;
    };
    save(otherDataToChange?: any, keepOldFormatVersion?: boolean): void;
    remove(): void;
    static get(homeId: string): cmds.Home;
    static delete(homeId: string): void;
}
export declare class LandClaimSystem {
    constructor();
    get warnAboutDeniedPermissions(): boolean | undefined;
    set warnAboutDeniedPermissions(warn: boolean | undefined);
    static land_claim_format_version: string;
    static getClaims(claimIds: string[]): cmds.LandClaim[];
    static getAllClaims(): cmds.LandClaim[];
    static getClaimIds(): string[];
    static getLandClaimIdsForPlayer(player: Player | string): string[];
    static getLandClaimsForPlayer(player: Player | string): cmds.LandClaim[];
    static testIfPlayerCanDoActionInArea(action: "BreakBlock" | "PlaceBlock" | "InteractWithBlock" | "EnterArea" | "CreateExplosion", player: any, location: any): void;
    static testIfClaimAreaIsAlreadyClaimed(area: {
        min: Vector3;
        max: Vector3;
    }): boolean;
}
export declare class LandClaim {
    area: {
        min: Vector3;
        max: Vector3;
    };
    dimension: Dimension;
    name: string;
    ownerId: string;
    ownerName?: string;
    saveId: string;
    format_version: string;
    land_claim_format_version: string;
    defaultPermissions: {
        breakBlocks: boolean;
        placeBlocks: boolean;
        interactWithBlocks: boolean;
        enterArea: boolean;
    };
    customPermissions: {
        [playerId: string]: {
            playerName?: string;
            breakBlocks: boolean;
            placeBlocks: boolean;
            interactWithBlocks: boolean;
            enterArea: boolean;
        };
    };
    constructor(claim: {
        saveId: string;
        area: {
            min: Vector3;
            max: Vector3;
        };
        dimension: string | Dimension;
        name: string;
        ownerId: string;
        format_version?: string;
        land_claim_format_version?: string;
        defaultPermissions?: {
            breakBlocks?: boolean;
            placeBlocks?: boolean;
            interactWithBlocks?: boolean;
            enterArea?: boolean;
        };
        customPermissions?: {
            [playerId: string]: {
                playerName?: string;
                breakBlocks: boolean;
                placeBlocks: boolean;
                interactWithBlocks: boolean;
                enterArea: boolean;
            };
        };
    });
    get owner(): Player;
    get isOwnerOnline(): boolean;
    get isSaved(): boolean;
    toJSON(): {
        area: {
            min: Vector3;
            max: Vector3;
        };
        dimension: string;
        name: string;
        ownerId: string;
        ownerName: string;
        defaultPermissions: {
            breakBlocks: boolean;
            placeBlocks: boolean;
            interactWithBlocks: boolean;
            enterArea: boolean;
        };
        customPermissions: {
            [playerId: string]: {
                playerName?: string;
                breakBlocks: boolean;
                placeBlocks: boolean;
                interactWithBlocks: boolean;
                enterArea: boolean;
            };
        };
        format_version: string;
        land_claim_format_version: string;
    };
    setPermissions(permissions: {
        playerName?: string;
        breakBlocks: boolean;
        placeBlocks: boolean;
        interactWithBlocks: boolean;
        enterArea: boolean;
    }, playerOrPlayerId: Player | string, playerName?: string): void;
    save(otherDataToChange: any, keepOldFormatVersion?: boolean): void;
    remove(): void;
    static get(claimId: string): cmds.LandClaim;
    static delete(claimId: string): void;
}
export declare class chunkLandClaim {
    chunks: Vector2[];
    dimension: Dimension;
    name: string;
    ownerId: string;
    ownerName?: string;
    saveId: string;
    format_version: string;
    land_claim_format_version: string;
    defaultPermissions: {
        breakBlocks: boolean;
        placeBlocks: boolean;
        interactWithBlocks: boolean;
        enterArea: boolean;
    };
    customPermissions: {
        [playerId: string]: {
            playerName?: string;
            breakBlocks: boolean;
            placeBlocks: boolean;
            interactWithBlocks: boolean;
            enterArea: boolean;
        };
    };
    constructor(claim: {
        saveId: string;
        chunks: Vector2[];
        dimension: string | Dimension;
        name: string;
        ownerId: string;
        format_version?: string;
        land_claim_format_version?: string;
        defaultPermissions?: {
            breakBlocks?: boolean;
            placeBlocks?: boolean;
            interactWithBlocks?: boolean;
            enterArea?: boolean;
        };
        customPermissions?: {
            [playerId: string]: {
                playerName?: string;
                breakBlocks: boolean;
                placeBlocks: boolean;
                interactWithBlocks: boolean;
                enterArea: boolean;
            };
        };
    });
    get owner(): Player;
    get isOwnerOnline(): boolean;
    get isSaved(): boolean;
    get areas(): {
        from: {
            x: number;
            y: number;
            z: number;
        };
        to: {
            x: number;
            y: number;
            z: number;
        };
    }[];
    toJSON(): {
        chunks: Vector2[];
        dimension: string;
        name: string;
        ownerId: string;
        ownerName: string;
        defaultPermissions: {
            breakBlocks: boolean;
            placeBlocks: boolean;
            interactWithBlocks: boolean;
            enterArea: boolean;
        };
        customPermissions: {
            [playerId: string]: {
                playerName?: string;
                breakBlocks: boolean;
                placeBlocks: boolean;
                interactWithBlocks: boolean;
                enterArea: boolean;
            };
        };
        format_version: string;
        land_claim_format_version: string;
    };
    setPermissions(permissions: {
        playerName?: string;
        breakBlocks: boolean;
        placeBlocks: boolean;
        interactWithBlocks: boolean;
        enterArea: boolean;
    }, playerOrPlayerId: Player | string, playerName?: string): void;
    save(otherDataToChange: any, keepOldFormatVersion?: boolean): void;
    remove(): void;
    static get(claimId: string): cmds.LandClaim;
    static delete(claimId: string): void;
}
export declare class BlockPattern {
    blocks: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
        weight?: number;
        get raw(): string;
        get rawns(): string;
    }[];
    type: "random" | "sequence";
    constructor(blocks?: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
        weight?: number;
    }[], type?: "random" | "sequence");
    generateBlock(generateIndex?: number | bigint, forceMode?: "random" | "sequence"): {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
        chance?: number;
    };
    generateBlockP(generateIndex?: number | bigint, forceMode?: "random" | "sequence"): BlockPermutation;
    push(...blocks: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
        weight?: number;
    }[]): number;
    static parse(): void;
    static extractRaw(str: string): string;
    static extract(str: string, mode?: "random" | "sequence"): BlockPattern;
    static extractWRaw(str: string, mode?: "random" | "sequence"): {
        raw: string;
        parsed: BlockPattern;
    };
    static extractAllRaw(str: string): string[];
    static extractAll(str: string, mode?: "random" | "sequence"): BlockPattern[];
    static extractAllWRaw(str: string, mode?: "random" | "sequence"): {
        raw: string[];
        parsed: BlockPattern[];
    };
}
export declare class BlockMask {
    private blocksList;
    private hasStates;
    private blockTypeIds;
    get blocks(): {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
        get raw(): string;
        get rawns(): string;
    }[];
    set blocks(blocks: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
    }[]);
    get includesStates(): boolean;
    get blockTypes(): string[];
    evaluateIds(): void;
    constructor(blocks?: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
    }[]);
    push(...blocks: {
        type: string;
        states?: {
            [id: string]: string | number | boolean;
        };
    }[]): number;
    static parse(): void;
    static extractRaw(str: string): string | null;
    static extract(str: string, extraIdParsingEnabled?: boolean): BlockMask;
    static extractWRaw(str: string, extraIdParsingEnabled?: boolean): {
        raw: string;
        parsed: BlockMask;
    };
    static extractAllRaw(str: string): string[] | null;
    static extractAll(str: string, extraIdParsingEnabled?: boolean): BlockMask[];
    static extractAllWRaw(str: string, extraIdParsingEnabled?: boolean): {
        raw: string[];
        parsed: BlockMask[];
    };
}
export declare function parseBlockMatcherType(matcher: string): {
    raw: string;
    block: {
        id: string;
        states: {
            [id: string]: string | number | boolean;
        };
    };
};
export declare function testBlockForMatch(block: Block, matches: {
    id: string;
    states?: {
        [id: string]: string | number | boolean;
    };
} | {
    id: string;
    states?: {
        [id: string]: string | number | boolean;
    };
}[]): boolean | (() => boolean);
export declare function testBlockForMatchToMask(block: Block, matches: {
    type: string;
    states?: {
        [id: string]: string | number | boolean;
    };
} | {
    type: string;
    states?: {
        [id: string]: string | number | boolean;
    };
}[]): boolean | (() => boolean);
export declare function selectWeightedElement(items: {
    [k: string]: any;
}[], weightProp?: string): {
    [k: string]: any;
};
export type playerobject = Player & executeCommandPlayer;
export declare function arryTV3(v3Array: [x: number, y: number, z: number]): {
    x: number;
    y: number;
    z: number;
};
export declare function parseNBTFile(nbt: {
    blocks: {
        pos: [x: number, y: number, z: number];
        state: number;
    }[];
    entities?: any;
    palette: {
        Name: string;
        properties?: {
            [stateName: string]: string | number | boolean;
        };
    }[];
    size: [x: number, y: number, z: number];
}): {
    pos: [x: number, y: number, z: number];
}[];
export declare function generateNBTFile(location: DimensionLocation, nbt: {
    blocks: {
        pos: [x: number, y: number, z: number];
        state: number;
    }[];
    entities?: any;
    palette: {
        Name: string;
        Properties?: {
            [stateName: string]: string | number | boolean;
        };
    }[];
    size: [x: number, y: number, z: number];
}): void;
export declare function generateNBTFileB(location: DimensionLocation, nbt: {
    blocks: {
        pos: [x: number, y: number, z: number];
        state: number;
    }[];
    entities?: any;
    palette: {
        Name: string;
        Properties?: {
            [stateName: string]: string | number | boolean;
        };
    }[];
    size: [x: number, y: number, z: number];
}): void;
export declare function generateNBTFileC(location: DimensionLocation, nbt: {
    block_indices: number[];
    block_palette: {
        name: string;
        states?: {
            [stateName: string]: string | number | boolean;
        };
    }[];
    size: [x: number, y: number, z: number];
    nbt_type: "cmprsnbt";
}): void;
export declare function generateNBTFileF(location: DimensionLocation, nbt: {
    block_indices: number[];
    block_palette: {
        name: string;
        states?: {
            [stateName: string]: string | number | boolean;
        };
    }[];
    size: [x: number, y: number, z: number];
    nbt_type: "cmprsnbt";
}): void;
export declare function generateNBTFileE(location: DimensionLocation, nbt: {
    block_indices: number[];
    block_palette: {
        name: string;
        states?: {
            [stateName: string]: string | number | boolean;
        };
    }[];
    size: [x: number, y: number, z: number];
    nbt_type: "cmprbnbt";
}): number;
export declare function generateNBTFileEGG(location: DimensionLocation, nbt: {
    block_indices: number[];
    block_palette: {
        name: string;
        states?: {
            [stateName: string]: string | number | boolean;
        };
    }[];
    size: [x: number, y: number, z: number];
    nbt_type: "cmprbnbt";
}): Generator<any, number, unknown>;
export declare function generateNBTFileEGGB(location: DimensionLocation, nbt: {
    block_indices: number[];
    block_palette: {
        name: string;
        states?: {
            [stateName: string]: string | number | boolean;
        };
    }[];
    size: [x: number, y: number, z: number];
    nbt_type: "cmprbnbt";
}): Generator<any, number, unknown>;
export declare function generateNBTFileD(location: DimensionLocation, nbt: any, player: Player): Promise<void>;
export declare function parseSNBT(snbt: string): any;
export declare function SNBTToJSONifiedNBTData(snbt: string): any;
export declare function parseJSONifiedNBTData(nbt: any): any;
export declare function convertToSNBTFormat(parsedNBT: any): {
    blocks: any[];
    palette: any;
    nbt_type: string;
    size: any;
};
export declare function compressBedrockNBTData(parsedNBT: any): {
    block_indices: any;
    block_palette: any;
    nbt_type: "cmprbnbt";
    size: any;
};
export declare function compressJavaNBTData(parsedNBT: any): {
    block_indices: number[];
    block_palette: any;
    nbt_type: "cmprsnbt";
    size: any;
};
export declare function unsuperCompress(nbt: any): any;
export declare function unsuperCompressG(nbt: any): Promise<any>;
export declare function unultraCompress(nbt: any): any;
export declare function fltToStr(float: number, radix?: number): string;
export declare function strToFlt(string: string, radix?: number): number;
export declare function superCompressBedrockNBTData(parsedNBT: any): {
    block_indices: string;
    block_palette: any;
    nbt_type: "supercmprbnbt";
    size: any;
};
export declare function superCompressJavaNBTData(parsedNBT: any): {
    block_indices: string;
    block_palette: any;
    nbt_type: "supercmprsnbt";
    size: any;
};
export declare function detectNBTDataType(NBTData: any): any;
export declare function setNBTDataType(NBTData: any): any;
export declare function stringifyJSONCompressed(NBTData: any): string;
export declare function compressIntArrayB(s: string, replacement?: string): string;
export declare function extractIntArrayB(s: string, revivement?: string): string;
export declare function extractIntArrayBGenerator(s: string, revivement?: string, maxTimePerTick?: number): Generator<string, string, unknown>;
export declare function compressIntArray(arry: number[], replacement?: string): string;
export declare function extractIntArray(arry: string, revivement?: string): number[];
export declare function extractIntArrayG(arry: string, revivement?: string, maxTimePerTick?: number): Promise<number[]>;
export declare function ultraCompressIntArrayB(s: string, replacement?: string): string;
export declare function ultraExtractIntArrayB(s: string, revivement?: string): string;
export declare function ultraCompressIntArray(arry: number[], replacement?: string): string;
export declare function ultraExtractIntArray(arry: string, revivement?: string): number[];
export declare function vTV3(vector: Vector3): Vector3;
export declare function sOSATSA(stringOrStringArray: string | string[]): string[];
export declare function vTStr(vector: Vector2 | Vector3): string;
export declare function getPlayer(playerName: string): Player;
export declare function getPlayerById(playerId: string | number): Player;
export declare function getAllEntities(): Entity[];
export declare function getEntityById(entityId: string | number): Entity;
export declare function getPlayersWithTags(tags: string | string[]): Player[];
export declare function getPlayersWithAnyOfTags(tags: string | string[]): Player[];
export declare function disconnectPlayers(targets: Entity[] | Player[], enableStrictErrorThrowing?: boolean, disableExtraErrorReporting?: boolean): void;
export declare function despawnEntities(targets: (Entity | Player)[], enableStrictErrorThrowing?: boolean, disableExtraErrorReporting?: boolean): void;
export declare const compareArrays: (array1: any[], array2: any[]) => boolean;
export declare const compareArraysB: (array1: any[], array2: any[]) => boolean;
export declare function cycleRGB(callback: (current: {
    r: number;
    g: number;
    b: number;
}) => any, cancel?: () => boolean, step?: number): Promise<void>;
export declare function chatCommands(params: {
    returnBeforeChatSend: boolean | undefined;
    player: Player | executeCommandPlayerW | undefined;
    eventData: ChatSendBeforeEvent;
    event: ChatSendBeforeEvent | undefined;
    newMessage: string | undefined;
    fromExecute?: boolean;
    silentCMD?: boolean;
    isBultIn?: boolean;
    isCustom?: boolean;
}): void;
export declare function evaluateSelectors(selector: string, options?: {
    source?: Block | Entity | Player;
    rotation?: Vector2;
    viewDirection?: Vector3;
    location?: Vector3 | DimensionLocation;
    dimension?: Dimension;
    indirect?: number | boolean;
    asDimension?: number | boolean;
    asWorld?: number | boolean;
    inAllDimensions?: number | boolean;
    enableJ?: boolean;
    enableI?: boolean;
}): any;
export declare function extractSelectors(str: string): string[];
type ZeroToNineCharacters = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type LowercaseLetter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";
type UppercaseLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
export type flagsMatcherTextA = ZeroToNineCharacters | LowercaseLetter | UppercaseLetter | "!" | "@" | "#" | "$" | "%" | "^" | "&" | "*" | "<" | ">" | "," | "." | "~";
export type flagsMatcherTextB<T extends string> = T extends flagsMatcherTextA ? T : T extends `${flagsMatcherTextA}${infer R}` ? flagsMatcherTextB<R> : never;
export type flagsMatcherTextC<T extends string> = T extends flagsMatcherTextA ? string : T extends `${flagsMatcherTextA}${infer R}` ? flagsMatcherTextC<R> : never;
export type evaluateParametersTypeMap = {
    presetText: string;
    number: number;
    boolean: boolean | undefined;
    neboolean: boolean | undefined;
    string: string | undefined;
    "non-booleanString": string | undefined;
    json: any;
    Vector: string | undefined;
    Vector1: string | undefined;
    Vector2: string | undefined;
    Vector3: string | undefined;
    Vector4: string | undefined;
    Vector5: string | undefined;
    Vector6: string | undefined;
    Vector7: string | undefined;
    Vector8: string | undefined;
    Vectors: string | undefined;
    targetSelector: string | undefined;
    blockStates: {
        [id: string]: string | number | boolean | undefined;
    } | undefined;
    blockPattern: BlockPattern | undefined;
    block: {
        id: string;
        states?: string;
    } | undefined;
};
export type evaluateParametersParameterTypes = "presetText" | "number" | "boolean" | "neboolean" | "string" | "non-booleanString" | "json" | "Vector" | "Vector1" | "Vector2" | "Vector3" | "Vector4" | "Vector5" | "Vector6" | "Vector7" | "Vector8" | "Vectors" | "targetSelector" | "blockStates" | "blockPattern" | "block" | "dimension" | `-${string}` | `f-${string}`;
export type evaluateParametersParameter = {
    type: "presetText" | "number" | "boolean" | "neboolean" | "string" | "non-booleanString" | "json" | "Vector" | "Vector1" | "Vector2" | "Vector3" | "Vector4" | "Vector5" | "Vector6" | "Vector7" | "Vector8" | "targetSelector" | "blockStates" | "blockPattern" | "block" | "blockMask" | "dimension" | `-${string}` | `f-${string}`;
    maxLength?: number;
} | {
    type: "Vectors";
    vectorCount?: number;
    maxLength?: number;
} | "presetText" | "number" | "boolean" | "neboolean" | "string" | "non-booleanString" | "json" | "Vector" | "Vector1" | "Vector2" | "Vector3" | "Vector4" | "Vector5" | "Vector6" | "Vector7" | "Vector8" | "targetSelector" | "blockStates" | "blockPattern" | "block" | "blockMask" | "dimension" | `-${string}` | `f-${string}`;
export declare function evaluateParameters<T extends evaluateParametersParameter[] | [evaluateParametersParameter]>(commandstring: string, parameters: T): {
    params: T;
    extra: string;
    args: {
        [Index in keyof T]: T[Index] extends "presetText" ? string | undefined : T[Index] extends "number" ? number | undefined : T[Index] extends "boolean" ? boolean | undefined : T[Index] extends "neboolean" ? boolean | undefined : T[Index] extends "string" ? string | undefined : T[Index] extends "non-booleanString" ? string | undefined : T[Index] extends "json" ? any | undefined : T[Index] extends "Vector" ? string | undefined : T[Index] extends "Vector1" ? string | undefined : T[Index] extends "Vector2" ? string | undefined : T[Index] extends "Vector3" ? string | undefined : T[Index] extends "Vector4" ? string | undefined : T[Index] extends "Vector5" ? string | undefined : T[Index] extends "Vector6" ? string | undefined : T[Index] extends "Vector7" ? string | undefined : T[Index] extends "Vector8" ? string | undefined : T[Index] extends "Vectors" ? string | undefined : T[Index] extends "targetSelector" ? string | undefined : T[Index] extends "blockStates" ? {
            [id: string]: string | number | boolean;
        } | undefined : T[Index] extends "blockPattern" ? BlockPattern | undefined : T[Index] extends "block" ? {
            id: string;
            states?: {
                [id: string]: string | number | boolean;
            };
        } | undefined : T[Index] extends "blockMask" ? BlockMask | undefined : T[Index] extends "dimension" ? Dimension | undefined : T[Index] extends `-${string}` ? string : T[Index] extends `f-${string}` ? {
            "0"?: boolean;
            "1"?: boolean;
            "2"?: boolean;
            "3"?: boolean;
            "4"?: boolean;
            "5"?: boolean;
            "6"?: boolean;
            "7"?: boolean;
            "8"?: boolean;
            "9"?: boolean;
            "a"?: boolean;
            "b"?: boolean;
            "c"?: boolean;
            "d"?: boolean;
            "e"?: boolean;
            "f"?: boolean;
            "g"?: boolean;
            "h"?: boolean;
            "i"?: boolean;
            "j"?: boolean;
            "k"?: boolean;
            "l"?: boolean;
            "m"?: boolean;
            "n"?: boolean;
            "o"?: boolean;
            "p"?: boolean;
            "q"?: boolean;
            "r"?: boolean;
            "s"?: boolean;
            "t"?: boolean;
            "u"?: boolean;
            "v"?: boolean;
            "w"?: boolean;
            "x"?: boolean;
            "y"?: boolean;
            "z"?: boolean;
            "A"?: boolean;
            "B"?: boolean;
            "C"?: boolean;
            "D"?: boolean;
            "E"?: boolean;
            "F"?: boolean;
            "G"?: boolean;
            "H"?: boolean;
            "I"?: boolean;
            "J"?: boolean;
            "K"?: boolean;
            "L"?: boolean;
            "M"?: boolean;
            "N"?: boolean;
            "O"?: boolean;
            "P"?: boolean;
            "Q"?: boolean;
            "R"?: boolean;
            "S"?: boolean;
            "T"?: boolean;
            "U"?: boolean;
            "V"?: boolean;
            "W"?: boolean;
            "X"?: boolean;
            "Y"?: boolean;
            "Z"?: boolean;
            "!"?: boolean;
            "@"?: boolean;
            "#"?: boolean;
            "$"?: boolean;
            "%"?: boolean;
            "^"?: boolean;
            "&"?: boolean;
            "*"?: boolean;
            "<"?: boolean;
            ">"?: boolean;
            ","?: boolean;
            "."?: boolean;
            "~"?: boolean;
        } : T[Index] extends {
            type: "number";
        } ? number | undefined : T[Index] extends {
            type: "boolean";
        } ? boolean | undefined : T[Index] extends {
            type: "neboolean";
        } ? boolean | undefined : T[Index] extends {
            type: "string";
        } ? string | undefined : T[Index] extends {
            type: "presetText";
        } ? string | undefined : T[Index] extends {
            type: "non-booleanString";
        } ? string | undefined : T[Index] extends {
            type: "json";
        } ? any | undefined : T[Index] extends {
            type: "Vector";
        } ? string | undefined : T[Index] extends {
            type: "Vector1";
        } ? string | undefined : T[Index] extends {
            type: "Vector2";
        } ? string | undefined : T[Index] extends {
            type: "Vector3";
        } ? string | undefined : T[Index] extends {
            type: "Vector4";
        } ? string | undefined : T[Index] extends {
            type: "Vector5";
        } ? string | undefined : T[Index] extends {
            type: "Vector6";
        } ? string | undefined : T[Index] extends {
            type: "Vector7";
        } ? string | undefined : T[Index] extends {
            type: "Vector8";
        } ? string | undefined : T[Index] extends {
            type: "Vectors";
        } ? string | undefined : T[Index] extends {
            type: "targetSelector";
        } ? string | undefined : T[Index] extends {
            type: "blockStates";
        } ? {
            [id: string]: string | number | boolean;
        } | undefined : T[Index] extends {
            type: "blockPattern";
        } ? BlockPattern | undefined : T[Index] extends {
            type: "block";
        } ? {
            id: string;
            states?: {
                [id: string]: string | number | boolean;
            };
        } | undefined : T[Index] extends {
            type: "blockMask";
        } ? BlockMask | undefined : T[Index] extends {
            type: "dimension";
        } ? Dimension | undefined : T[Index] extends {
            type: `-${string}`;
        } ? string : T[Index] extends {
            type: `f-${string}`;
        } ? {
            "0"?: boolean;
            "1"?: boolean;
            "2"?: boolean;
            "3"?: boolean;
            "4"?: boolean;
            "5"?: boolean;
            "6"?: boolean;
            "7"?: boolean;
            "8"?: boolean;
            "9"?: boolean;
            "a"?: boolean;
            "b"?: boolean;
            "c"?: boolean;
            "d"?: boolean;
            "e"?: boolean;
            "f"?: boolean;
            "g"?: boolean;
            "h"?: boolean;
            "i"?: boolean;
            "j"?: boolean;
            "k"?: boolean;
            "l"?: boolean;
            "m"?: boolean;
            "n"?: boolean;
            "o"?: boolean;
            "p"?: boolean;
            "q"?: boolean;
            "r"?: boolean;
            "s"?: boolean;
            "t"?: boolean;
            "u"?: boolean;
            "v"?: boolean;
            "w"?: boolean;
            "x"?: boolean;
            "y"?: boolean;
            "z"?: boolean;
            "A"?: boolean;
            "B"?: boolean;
            "C"?: boolean;
            "D"?: boolean;
            "E"?: boolean;
            "F"?: boolean;
            "G"?: boolean;
            "H"?: boolean;
            "I"?: boolean;
            "J"?: boolean;
            "K"?: boolean;
            "L"?: boolean;
            "M"?: boolean;
            "N"?: boolean;
            "O"?: boolean;
            "P"?: boolean;
            "Q"?: boolean;
            "R"?: boolean;
            "S"?: boolean;
            "T"?: boolean;
            "U"?: boolean;
            "V"?: boolean;
            "W"?: boolean;
            "X"?: boolean;
            "Y"?: boolean;
            "Z"?: boolean;
            "!"?: boolean;
            "@"?: boolean;
            "#"?: boolean;
            "$"?: boolean;
            "%"?: boolean;
            "^"?: boolean;
            "&"?: boolean;
            "*"?: boolean;
            "<"?: boolean;
            ">"?: boolean;
            ","?: boolean;
            "."?: boolean;
            "~"?: boolean;
        } : any | undefined;
    };
    err: [Error, any][];
};
/**
 * @deprecated
 */
export declare function evaluateParametersOldB<T extends evaluateParametersParameter[] | [evaluateParametersParameter]>(commandstring: string, parameters: T): {
    params: T;
    extra: string;
    args: {
        [Index in keyof T]: T[Index] extends "presetText" ? string | undefined : T[Index] extends "number" ? number | undefined : T[Index] extends "boolean" ? boolean | undefined : T[Index] extends "neboolean" ? boolean | undefined : T[Index] extends "string" ? string | undefined : T[Index] extends "non-booleanString" ? string | undefined : T[Index] extends "json" ? any | undefined : T[Index] extends "Vector" ? string | undefined : T[Index] extends "Vector1" ? string | undefined : T[Index] extends "Vector2" ? string | undefined : T[Index] extends "Vector3" ? string | undefined : T[Index] extends "Vector4" ? string | undefined : T[Index] extends "Vector5" ? string | undefined : T[Index] extends "Vector6" ? string | undefined : T[Index] extends "Vector7" ? string | undefined : T[Index] extends "Vector8" ? string | undefined : T[Index] extends "Vectors" ? string | undefined : T[Index] extends "targetSelector" ? string | undefined : T[Index] extends "blockStates" ? {
            [id: string]: string | number | boolean;
        } | undefined : T[Index] extends "blockPattern" ? BlockPattern | undefined : T[Index] extends "dimension" ? Dimension | undefined : T[Index] extends `-${string}` ? string : T[Index] extends `f-${string}` ? {
            "0"?: boolean;
            "1"?: boolean;
            "2"?: boolean;
            "3"?: boolean;
            "4"?: boolean;
            "5"?: boolean;
            "6"?: boolean;
            "7"?: boolean;
            "8"?: boolean;
            "9"?: boolean;
            "a"?: boolean;
            "b"?: boolean;
            "c"?: boolean;
            "d"?: boolean;
            "e"?: boolean;
            "f"?: boolean;
            "g"?: boolean;
            "h"?: boolean;
            "i"?: boolean;
            "j"?: boolean;
            "k"?: boolean;
            "l"?: boolean;
            "m"?: boolean;
            "n"?: boolean;
            "o"?: boolean;
            "p"?: boolean;
            "q"?: boolean;
            "r"?: boolean;
            "s"?: boolean;
            "t"?: boolean;
            "u"?: boolean;
            "v"?: boolean;
            "w"?: boolean;
            "x"?: boolean;
            "y"?: boolean;
            "z"?: boolean;
            "A"?: boolean;
            "B"?: boolean;
            "C"?: boolean;
            "D"?: boolean;
            "E"?: boolean;
            "F"?: boolean;
            "G"?: boolean;
            "H"?: boolean;
            "I"?: boolean;
            "J"?: boolean;
            "K"?: boolean;
            "L"?: boolean;
            "M"?: boolean;
            "N"?: boolean;
            "O"?: boolean;
            "P"?: boolean;
            "Q"?: boolean;
            "R"?: boolean;
            "S"?: boolean;
            "T"?: boolean;
            "U"?: boolean;
            "V"?: boolean;
            "W"?: boolean;
            "X"?: boolean;
            "Y"?: boolean;
            "Z"?: boolean;
            "!"?: boolean;
            "@"?: boolean;
            "#"?: boolean;
            "$"?: boolean;
            "%"?: boolean;
            "^"?: boolean;
            "&"?: boolean;
            "*"?: boolean;
            "<"?: boolean;
            ">"?: boolean;
            ","?: boolean;
            "."?: boolean;
            "~"?: boolean;
        } : T[Index] extends {
            type: "number";
        } ? number | undefined : T[Index] extends {
            type: "boolean";
        } ? boolean | undefined : T[Index] extends {
            type: "neboolean";
        } ? boolean | undefined : T[Index] extends {
            type: "string";
        } ? string | undefined : T[Index] extends {
            type: "presetText";
        } ? string | undefined : T[Index] extends {
            type: "non-booleanString";
        } ? string | undefined : T[Index] extends {
            type: "json";
        } ? any | undefined : T[Index] extends {
            type: "Vector";
        } ? string | undefined : T[Index] extends {
            type: "Vector1";
        } ? string | undefined : T[Index] extends {
            type: "Vector2";
        } ? string | undefined : T[Index] extends {
            type: "Vector3";
        } ? string | undefined : T[Index] extends {
            type: "Vector4";
        } ? string | undefined : T[Index] extends {
            type: "Vector5";
        } ? string | undefined : T[Index] extends {
            type: "Vector6";
        } ? string | undefined : T[Index] extends {
            type: "Vector7";
        } ? string | undefined : T[Index] extends {
            type: "Vector8";
        } ? string | undefined : T[Index] extends {
            type: "Vectors";
        } ? string | undefined : T[Index] extends {
            type: "targetSelector";
        } ? string | undefined : T[Index] extends {
            type: "blockStates";
        } ? {
            [id: string]: string | number | boolean;
        } | undefined : T[Index] extends {
            type: "blockPattern";
        } ? BlockPattern | undefined : T[Index] extends {
            type: "dimension";
        } ? Dimension | undefined : T[Index] extends {
            type: `-${string}`;
        } ? string : T[Index] extends {
            type: `f-${string}`;
        } ? {
            "0"?: boolean;
            "1"?: boolean;
            "2"?: boolean;
            "3"?: boolean;
            "4"?: boolean;
            "5"?: boolean;
            "6"?: boolean;
            "7"?: boolean;
            "8"?: boolean;
            "9"?: boolean;
            "a"?: boolean;
            "b"?: boolean;
            "c"?: boolean;
            "d"?: boolean;
            "e"?: boolean;
            "f"?: boolean;
            "g"?: boolean;
            "h"?: boolean;
            "i"?: boolean;
            "j"?: boolean;
            "k"?: boolean;
            "l"?: boolean;
            "m"?: boolean;
            "n"?: boolean;
            "o"?: boolean;
            "p"?: boolean;
            "q"?: boolean;
            "r"?: boolean;
            "s"?: boolean;
            "t"?: boolean;
            "u"?: boolean;
            "v"?: boolean;
            "w"?: boolean;
            "x"?: boolean;
            "y"?: boolean;
            "z"?: boolean;
            "A"?: boolean;
            "B"?: boolean;
            "C"?: boolean;
            "D"?: boolean;
            "E"?: boolean;
            "F"?: boolean;
            "G"?: boolean;
            "H"?: boolean;
            "I"?: boolean;
            "J"?: boolean;
            "K"?: boolean;
            "L"?: boolean;
            "M"?: boolean;
            "N"?: boolean;
            "O"?: boolean;
            "P"?: boolean;
            "Q"?: boolean;
            "R"?: boolean;
            "S"?: boolean;
            "T"?: boolean;
            "U"?: boolean;
            "V"?: boolean;
            "W"?: boolean;
            "X"?: boolean;
            "Y"?: boolean;
            "Z"?: boolean;
            "!"?: boolean;
            "@"?: boolean;
            "#"?: boolean;
            "$"?: boolean;
            "%"?: boolean;
            "^"?: boolean;
            "&"?: boolean;
            "*"?: boolean;
            "<"?: boolean;
            ">"?: boolean;
            ","?: boolean;
            "."?: boolean;
            "~"?: boolean;
        } : any | undefined;
    };
    err: [Error, any][];
};
/**
 * @deprecated
 */
export declare function evaluateParametersOld(parameters: string[], paramEvalA: string): {
    er: [Error, any][];
    erb: [string, any, number][];
    args: any[];
    paramEval: string;
    paramEvalA: string;
    parameters: string[];
};
export {};
