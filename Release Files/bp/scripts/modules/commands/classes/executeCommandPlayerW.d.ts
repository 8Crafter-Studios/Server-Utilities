import type { GetBlocksStandingOnOptions, PlayerPermissionLevel } from "@minecraft/server";
import { Player, type Vector3, Dimension, type Vector2, Block, Entity, type RawMessage, EntityInventoryComponent, EntityEquippableComponent, PlayerCursorInventoryComponent, ItemStack, ContainerSlot, type VectorYZ, type VectorXZ, EffectType, type EntityEffectOptions, type MusicOptions, type PlayerSoundOptions, GameMode, type DimensionLocation, MolangVariableMap, type EntityApplyDamageByProjectileOptions, type EntityApplyDamageOptions, type BlockRaycastOptions, type EntityComponentTypeMap, type BlockComponentTypeMap, type EntityRaycastOptions, type EntityQueryOptions, type PlayAnimationOptions, type TeleportOptions, InputInfo, type EntityComponentReturnType, GraphicsMode, CommandPermissionLevel } from "@minecraft/server";
import { MoneySystem } from "ExtraFeatures/money";
import { PlayerNotifications } from "init/classes/PlayerNotifications";
import { PlayerPermissions } from "init/classes/PlayerPermissions";
import { WorldEditSelection } from "init/classes/WorldEditSelection";
import "init/classes/config";
import { WorldPosition } from "modules/coordinates/classes/WorldPosition";
import type { RotationLocation } from "modules/coordinates/interfaces/RotationLocation";
/**
 * Represents a player to be used for the `\execute` command without the `name` and `id` properties.
 */
export declare class executeCommandPlayerW implements Omit<Player, "name" | "id"> {
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
    get inventory(): EntityInventoryComponent;
    get equippable(): EntityEquippableComponent;
    get cursorInventory(): PlayerCursorInventoryComponent;
    get heldItem(): ItemStack | undefined;
    get activeSlot(): ContainerSlot;
    /**
     * Returns an instance of the {@link MoneySystem} class that is associated with this entity.
     *
     * @author 8Crafter
     *
     * @throws {ReferenceError} If the executeCommandPlayerW instance does not have a linked player.
     */
    get moneySystem(): MoneySystem;
    /**
     * Returns an instance of the {@link PlayerNotifications} class that is associated with this entity.
     *
     * @author 8Crafter
     *
     * @throws {ReferenceError} If the executeCommandPlayerW instance does not have a linked player.
     */
    get playerNotifications(): PlayerNotifications;
    /**
     * Returns an instance of the {@link PlayerPermissions} class that is associated with this entity.
     *
     * @author 8Crafter
     *
     * @throws {ReferenceError} If the executeCommandPlayerW instance does not have a linked player.
     */
    get playerPermissions(): PlayerPermissions;
    /**
     * Returns an instance of the {@link WorldEditSelection} class that is associated with this entity.
     *
     * @author 8Crafter
     *
     * @throws {ReferenceError} If the executeCommandPlayerW instance does not have a linked player.
     */
    get worldEditSelection(): WorldEditSelection;
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
    get camera(): import("@minecraft/server").Camera;
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
    get scoreboardIdentity(): import("@minecraft/server").ScoreboardIdentity | undefined;
    get level(): number;
    get onScreenDisplay(): import("@minecraft/server").ScreenDisplay;
    /**
     * @remarks
     * This property can't be edited in read-only mode.
     *
     * @throws {ReferenceError} If the executeCommandPlayerW instance does not have a linked player when using the setter.
     */
    get selectedSlotIndex(): number;
    set selectedSlotIndex(slotNumber: number);
    get totalXpNeededForNextLevel(): number;
    get xpEarnedAtCurrentLevel(): number;
    /**
     * @remarks
     * Whether the entity is sneaking - that is, moving more slowly
     * and more quietly.
     *
     * This property can't be edited in read-only mode.
     *
     * @throws {ReferenceError} If the executeCommandPlayerW instance does not have a linked player when using the setter.
     */
    get isSneaking(): boolean;
    set isSneaking(isSneaking: boolean);
    get typeId(): string;
    get nameTag(): string;
    set nameTag(nameTag: string);
    get inputPermissions(): import("@minecraft/server").PlayerInputPermissions;
    get clientSystemInfo(): import("@minecraft/server").ClientSystemInfo;
    get inputInfo(): InputInfo;
    /**
     * @beta
     * @remarks
     * Gets the current graphics mode of the player's client. This
     * can be changed in the Video section of the settings menu
     * based on what hardware is available.
     *
     * This property can return undefined if the {@link executeCommandPlayerW} instance does not have a linked player.
     *
     * @throws This property can throw when used.
     *
     * {@link InvalidEntityError}
     */
    get graphicsMode(): GraphicsMode;
    get isValid(): boolean;
    get localizationKey(): string;
    get commandPermissionLevel(): CommandPermissionLevel;
    get playerPermissionLevel(): PlayerPermissionLevel;
    get target(): Entity | undefined;
    addEffect(effectType: string | EffectType, duration: number, options?: EntityEffectOptions): import("@minecraft/server").Effect | undefined;
    addExperience(amount: number): number;
    getRotation(): Vector2;
    getViewDirection(): Vector3;
    addLevels(amount: number): number;
    eatItem(itemStack: ItemStack): void | undefined;
    getGameMode(): GameMode;
    getItemCooldown(itemCategory: string): number;
    getSpawnPoint(): DimensionLocation;
    getTotalXp(): number;
    lookAt(targetLocation: Vector3): void | undefined;
    playMusic(trackId: string, musicOptions?: MusicOptions): void | undefined;
    playSound(soundId: string, soundOptions?: PlayerSoundOptions): void | undefined;
    postClientMessage(id: string, value: string): void | undefined;
    queueMusic(trackId: string, musicOptions?: MusicOptions): void | undefined;
    resetLevel(): never;
    sendMessage(message: string | RawMessage | (string | RawMessage)[]): void | undefined;
    setGameMode(gameMode?: GameMode | number): void | undefined;
    setSpawnPoint(spawnPoint?: DimensionLocation): void | undefined;
    spawnParticle(effectName: string, location: Vector3, molangVariables?: MolangVariableMap): void | undefined;
    startItemCooldown(itemCategory: string, tickDuration: number): void | undefined;
    stopMusic(): never;
    addTag(tag: string): boolean;
    applyDamage(amount: number, options?: EntityApplyDamageByProjectileOptions | EntityApplyDamageOptions): boolean;
    applyImpulse(vector: Vector3): void;
    applyKnockback(horizontalForce: VectorXZ, verticalStrength: number): void | undefined;
    clearDynamicProperties(): never;
    clearVelocity(): never;
    extinguishFire(useEffects?: boolean): boolean;
    getAimAssist(): import("@minecraft/server").PlayerAimAssist;
    getBlockFromViewDirection(options?: BlockRaycastOptions): import("@minecraft/server").BlockRaycastHit | undefined;
    getComponent<T extends keyof EntityComponentTypeMap>(componentId: T): EntityComponentTypeMap[T] | undefined;
    getComponent<T extends keyof BlockComponentTypeMap>(componentId: T): BlockComponentTypeMap[T] | undefined;
    getComponent<T extends string>(componentId: T): EntityComponentReturnType<T> | undefined;
    getComponents(): import("@minecraft/server").EntityComponent[];
    getDynamicProperty(identifier: string): string | number | boolean | Vector3 | undefined;
    getDynamicPropertyIds(): string[];
    getDynamicPropertyTotalByteCount(): number;
    getEffect(effectType: string | EffectType): import("@minecraft/server").Effect | undefined;
    getEffects(): import("@minecraft/server").Effect[];
    getEntitiesFromViewDirection(options?: EntityRaycastOptions): import("@minecraft/server").EntityRaycastHit[];
    getHeadLocation(): Vector3;
    getProperty(identifier: string): string | number | boolean | undefined;
    getTags(): string[];
    getVelocity(): Vector3;
    hasComponent(componentId: string): boolean;
    hasTag(tag: string): boolean;
    kill(): boolean;
    matches(options: EntityQueryOptions): boolean;
    playAnimation(animationName: string, options?: PlayAnimationOptions): void | undefined;
    remove(): never;
    removeEffect(effectType: string | EffectType): boolean;
    removeTag(tag: string): boolean;
    resetProperty(identifier: string): string | number | boolean;
    runCommand(commandString: string): import("@minecraft/server").CommandResult;
    setDynamicProperty(identifier: string, value?: string | number | boolean | Vector3): void | undefined;
    setDynamicProperties(values: Record<string, boolean | number | string | Vector3>): void | undefined;
    setOnFire(seconds: number, useEffects?: boolean): boolean;
    setProperty(identifier: string, value: string | number | boolean): void | undefined;
    setRotation(rotation: Vector2): void | undefined;
    teleport(location: Vector3, teleportOptions?: TeleportOptions): void | undefined;
    triggerEvent(eventName: string): void | undefined;
    tryTeleport(location: Vector3, teleportOptions?: TeleportOptions): boolean;
    setPropertyOverrideForEntity(targetEntity: Entity, identifier: string, value: boolean | number | string): void | undefined;
    removePropertyOverrideForEntity(targetEntity: Entity, identifier: string): void | undefined;
    clearPropertyOverridesForEntity(targetEntity: Entity): void | undefined;
    stopSound(soundId: string): void;
    stopAllSounds(): void;
    getAllBlocksStandingOn(options?: GetBlocksStandingOnOptions): Block[];
    getBlockStandingOn(options?: GetBlocksStandingOnOptions): Block | undefined;
    saveStringToDynamicProperties(string: string, propertyName: string, clearOldProperties?: boolean, chunkSize?: number | bigint): void;
    getStringFromDynamicProperties(propertyName: string, zeroLengthPlaceholder?: string): string;
    deleteStringFromDynamicProperties(propertyName: string): void;
}
