import { Player, Dimension, Block, Entity, EntityInventoryComponent, EntityEquippableComponent, PlayerCursorInventoryComponent, ItemStack, EquipmentSlot, ContainerSlot, EffectType, GameMode, MolangVariableMap, InputInfo, GraphicsMode, } from "@minecraft/server";
import { MoneySystem } from "ExtraFeatures/money";
import { PlayerNotifications } from "init/classes/PlayerNotifications";
import { PlayerPermissions } from "init/classes/PlayerPermissions";
import { WorldEditSelection } from "init/classes/WorldEditSelection";
import "init/classes/config";
import { chatCommands } from "modules/commands/functions/chatCommands";
import { WorldPosition } from "modules/coordinates/classes/WorldPosition";
import { anglesToDirectionVectorDeg } from "modules/coordinates/functions/anglesToDirectionVectorDeg";
import { getChunkIndexD } from "modules/coordinates/functions/getChunkIndexD";
import { deleteStringFromEntityDynamicProperties } from "modules/utilities/functions/deleteStringFromEntityDynamicProperties";
import { getStringFromEntityDynamicProperties } from "modules/utilities/functions/getStringFromEntityDynamicProperties";
import { saveStringToEntityDynamicProperties } from "modules/utilities/functions/saveStringToEntityDynamicProperties";
export class executeCommandPlayerW {
    player;
    sendErrorsTo;
    modifiedlocation;
    modifieddimension;
    rotation;
    block;
    fromPlayer;
    fromEntity;
    isFromWorldPosition;
    fromPlayerWorldPosition;
    fromEntityWorldPosition;
    fromBlockWorldPosition;
    rawWorldPosition;
    raw;
    constructor(player, sendErrorsTo) {
        if (player instanceof WorldPosition) {
            this.modifiedlocation = player.location;
            this.modifieddimension = player.dimension;
            this.rotation = player.rotation;
            this.player = (player.entity ?? player.block);
            this.sendErrorsTo =
                sendErrorsTo === null || Number.isNaN(sendErrorsTo)
                    ? null
                    : sendErrorsTo ??
                        (player.entity instanceof Player ? player.entity : console);
            this.block = player.block;
            this.isFromWorldPosition = true;
            this.fromPlayerWorldPosition = player.entity instanceof Player;
            this.fromEntityWorldPosition = !!player.entity;
            this.fromBlockWorldPosition = !!player.block;
            this.rawWorldPosition = player;
            this.fromPlayer = false;
            this.fromEntity = false;
            this.raw = player;
        }
        else if (player instanceof Entity) {
            this.player = player;
            this.sendErrorsTo =
                sendErrorsTo === null || Number.isNaN(sendErrorsTo)
                    ? null
                    : sendErrorsTo ?? (player instanceof Player ? player : console);
            this.modifiedlocation = player.location;
            this.modifieddimension = player.dimension;
            this.rotation = player.getRotation();
            this.isFromWorldPosition = false;
            this.fromEntityWorldPosition = false;
            this.fromBlockWorldPosition = false;
            this.fromPlayer = player instanceof Player;
            this.fromEntity = true;
            this.raw = player;
        }
        else {
            throw new TypeError(`Unsupported type ${JSON.stringify(typeof player == "object"
                ? (tryget(() => player?.constructor) ?? {
                    name: typeof player,
                }).name
                : typeof player)} passed into parameter [0]. `);
        }
    }
    toWorldPosition() {
        return new WorldPosition(this.location, this.getRotation(), this.dimension, this.player, this.block);
    }
    run(command) {
        chatCommands({
            returnBeforeChatSend: false,
            event: {
                cancel: false,
                message: command,
                sender: this.player,
            },
            eventData: {
                cancel: false,
                message: command,
                sender: this.player,
            },
            newMessage: command,
            player: this.player,
        });
    }
    sendError(error, sendErrorAsIs = false, sendErrorsTo) {
        const sest = sendErrorsTo ?? this.sendErrorsTo;
        if (!!sest) {
            if (sendErrorAsIs) {
                if (sest instanceof Player) {
                    sest.sendMessage(error);
                }
                else if (sest instanceof Array) {
                    sest.forEach((v) => {
                        if (v instanceof Player) {
                            v.sendMessage(error);
                        }
                        else if ("warn" in v) {
                            v.error(error);
                        }
                    });
                }
                else if ("warn" in sest) {
                    sest.error(error);
                }
                else if (typeof sest == "function") {
                    this.sendError(error, true, sest());
                }
            }
            else {
                if (sest instanceof Player) {
                    sest.sendMessage(typeof error == "string"
                        ? error
                        : "rawtext" in error
                            ? error
                            : typeof error == "object"
                                ? tryget(() => JSONStringify(error)) ?? tryget(() => JSON.stringify(error)) ?? String(error)
                                : String(error));
                }
                else if (sest instanceof Array) {
                    sest.forEach((v) => {
                        if (v instanceof Player) {
                            v.sendMessage(typeof error == "string"
                                ? error
                                : "rawtext" in error
                                    ? error
                                    : typeof error == "object"
                                        ? tryget(() => JSONStringify(error)) ?? tryget(() => JSON.stringify(error)) ?? String(error)
                                        : String(error));
                        }
                        else if ("warn" in v) {
                            v.error(typeof error == "string"
                                ? error
                                : "rawtext" in error
                                    ? error
                                    : error instanceof Array
                                        ? error
                                        : typeof error == "object"
                                            ? tryget(() => JSONStringify(error)) ?? tryget(() => JSON.stringify(error)) ?? String(error)
                                            : String(error));
                        }
                    });
                }
                else if ("warn" in sest) {
                    sest.error(typeof error == "string"
                        ? error
                        : "rawtext" in error
                            ? error
                            : error instanceof Array
                                ? error
                                : typeof error == "object"
                                    ? tryget(() => JSONStringify(error)) ?? tryget(() => JSON.stringify(error)) ?? String(error)
                                    : String(error));
                }
                else if (typeof sest == "function") {
                    this.sendError(error, true, sest());
                }
            }
        }
    }
    sendMessageB(message, sendErrorsTo) {
        const sest = sendErrorsTo ?? this.sendErrorsTo;
        if (!!sest) {
            if (sest instanceof Player) {
                sest.sendMessage(message);
            }
            else if (sest instanceof Array) {
                sest.forEach((v) => {
                    if (v instanceof Player) {
                        v.sendMessage(message);
                    }
                    else if ("warn" in v) {
                        v.error(message);
                    }
                });
            }
            else if ("warn" in sest) {
                sest.error(message);
            }
            else if (typeof sest == "function") {
                this.sendMessageB(message, sest());
            }
        }
    }
    get inventory() {
        return this.getComponent("inventory");
    }
    get equippable() {
        return this.getComponent("equippable");
    }
    get cursorInventory() {
        return this.getComponent("cursor_inventory");
    }
    get heldItem() {
        if (!!!this.getComponent("equippable")) {
            return undefined;
        }
        else {
            return this.getComponent("equippable").getEquipment(EquipmentSlot.Mainhand);
        }
    }
    get activeSlot() {
        if (!!!this.getComponent("equippable")) {
            return undefined;
        }
        else {
            return this.getComponent("equippable").getEquipmentSlot(EquipmentSlot.Mainhand);
        }
    }
    get moneySystem() {
        return MoneySystem.get(this.player.id);
    }
    get playerNotifications() {
        return new PlayerNotifications(this.player);
    }
    get playerPermissions() {
        return new PlayerPermissions(this.player);
    }
    get worldEditSelection() {
        return new WorldEditSelection(this.player);
    }
    get dimensionLocation() {
        return Object.assign(this.location, { dimension: this.dimension });
    }
    get dimension() {
        return this.modifieddimension ?? this.player?.dimension;
    }
    get location() {
        return this.modifiedlocation ?? this.player?.location;
    }
    get locationstring() {
        return (this.x + " " + this.y + " " + this.z);
    }
    get rotationstring() {
        return (this.rotx + " " + this.roty);
    }
    get locationrotation() {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
            rotX: this.rotx,
            rotY: this.roty,
        };
    }
    get directionvector() {
        return anglesToDirectionVectorDeg(this.rotx, this.roty);
    }
    get xy() {
        return { x: this.x, y: this.y };
    }
    get yz() {
        return { y: this.y, z: this.z };
    }
    get xz() {
        return { x: this.x, z: this.z };
    }
    get chunkIndex() {
        return getChunkIndexD(this.xz);
    }
    get x() {
        return this.modifiedlocation?.x ?? this.player?.location?.x;
    }
    get y() {
        return this.modifiedlocation?.y ?? this.player?.location?.y;
    }
    get z() {
        return this.modifiedlocation?.z ?? this.player?.location?.z;
    }
    get rotx() {
        return this.rotation?.x ?? this.player?.getRotation?.()?.x;
    }
    get roty() {
        return this.rotation?.y ?? this.player?.getRotation?.()?.y;
    }
    get timeZone() {
        return (this.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? config.system.timeZone).toString().toNumber();
    }
    set timeZone(timezone) {
        this.setDynamicProperty("andexdbPersonalSettings:timeZone", !!timezone ? timezone.toString() : undefined);
    }
    get camera() {
        return this.player?.camera;
    }
    get isEmoting() {
        return this.player?.isEmoting;
    }
    get isFlying() {
        return this.player?.isFlying;
    }
    get isGliding() {
        return this.player?.isGliding;
    }
    get isJumping() {
        return this.player?.isJumping;
    }
    get isClimbing() {
        return this.player?.isClimbing;
    }
    get isFalling() {
        return this.player?.isFalling;
    }
    get isInWater() {
        return this.player?.isInWater;
    }
    get isOnGround() {
        return this.player?.isOnGround;
    }
    get isSleeping() {
        return this.player?.isSleeping;
    }
    get isSprinting() {
        return this.player?.isSprinting;
    }
    get isSwimming() {
        return this.player?.isSwimming;
    }
    //get fallDistance(){return this.player?.fallDistance} Removed in 1.21.20 sadly. >:(
    get scoreboardIdentity() {
        return this.player?.scoreboardIdentity;
    }
    //get lifetimeState(){return this.player?.lifetimeState} Removed in 1.21.20 sadly. >:(
    get level() {
        return this.player?.level;
    }
    get onScreenDisplay() {
        return this.player?.onScreenDisplay;
    }
    get selectedSlotIndex() {
        return this.player?.selectedSlotIndex;
    }
    set selectedSlotIndex(slotNumber) {
        this.player.selectedSlotIndex = slotNumber;
    }
    get totalXpNeededForNextLevel() {
        return this.player?.totalXpNeededForNextLevel;
    }
    get xpEarnedAtCurrentLevel() {
        return this.player?.xpEarnedAtCurrentLevel;
    }
    get isSneaking() {
        return this.player?.isSneaking;
    }
    set isSneaking(isSneaking) {
        this.player.isSneaking = isSneaking;
    }
    get typeId() {
        return this.player?.typeId;
    }
    get nameTag() {
        return this.player?.nameTag;
    }
    set nameTag(nameTag) {
        this.player.nameTag = nameTag;
    }
    get inputPermissions() {
        return this.player?.inputPermissions;
    }
    get clientSystemInfo() {
        return this.player?.clientSystemInfo;
    }
    get inputInfo() {
        return this.player?.inputInfo;
    }
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
    get graphicsMode() {
        return this.player?.graphicsMode;
    }
    get isValid() {
        return this.player?.isValid;
    }
    get localizationKey() {
        return this.player?.localizationKey;
    }
    addEffect(effectType, duration, options) {
        return this.player?.addEffect(effectType, duration, options);
    }
    addExperience(amount) {
        return this.player?.addExperience(amount);
    }
    getRotation() {
        return this.rotation ?? this.player?.getRotation();
    }
    getViewDirection() {
        return !!this.rotation ? anglesToDirectionVectorDeg(this.rotation.x, this.rotation.y) : this.player?.getViewDirection();
    }
    addLevels(amount) {
        return this.player?.addLevels(amount);
    }
    eatItem(itemStack) {
        return this.player?.eatItem(itemStack);
    }
    getGameMode() {
        return this.player?.getGameMode();
    }
    getItemCooldown(itemCategory) {
        return this.player?.getItemCooldown(itemCategory);
    }
    getSpawnPoint() {
        return this.player?.getSpawnPoint();
    }
    getTotalXp() {
        return this.player?.getTotalXp();
    }
    isOp() {
        return this.player?.isOp();
    }
    lookAt(targetLocation) {
        return this.player?.lookAt(targetLocation);
    }
    playMusic(trackId, musicOptions) {
        return this.player?.playMusic(trackId, musicOptions);
    }
    playSound(soundId, soundOptions) {
        return this.player?.playSound(soundId, soundOptions);
    }
    postClientMessage(id, value) {
        return this.player?.postClientMessage(id, value);
    }
    queueMusic(trackId, musicOptions) {
        return this.player?.queueMusic(trackId, musicOptions);
    }
    resetLevel() {
        return this.player?.resetLevel();
    }
    sendMessage(message) {
        return this.player?.sendMessage(message);
    }
    setGameMode(gameMode) {
        return this.player?.setGameMode(gameMode);
    }
    setOp(isOp) {
        return this.player?.setOp(isOp);
    }
    setSpawnPoint(spawnPoint) {
        return this.player?.setSpawnPoint(spawnPoint);
    }
    spawnParticle(effectName, location, molangVariables) {
        return this.player?.spawnParticle(effectName, location, molangVariables);
    }
    startItemCooldown(itemCategory, tickDuration) {
        return this.player?.startItemCooldown(itemCategory, tickDuration);
    }
    stopMusic() {
        return this.player?.stopMusic();
    }
    addTag(tag) {
        return this.player?.addTag(tag);
    }
    applyDamage(amount, options) {
        return this.player?.applyDamage(amount, options);
    }
    applyImpulse(vector) {
        return this.player?.applyImpulse(vector);
    }
    applyKnockback(horizontalForce, verticalStrength) {
        return this.player?.applyKnockback(horizontalForce, verticalStrength);
    }
    clearDynamicProperties() {
        return this.player?.clearDynamicProperties();
    }
    clearVelocity() {
        return this.player?.clearVelocity();
    }
    extinguishFire(useEffects) {
        return this.player?.extinguishFire(useEffects);
    }
    getAimAssist() {
        return this.player?.getAimAssist();
    }
    getBlockFromViewDirection(options) {
        return this.player?.getBlockFromViewDirection(options);
    }
    getComponent(componentId) {
        return (tryget(() => this.player?.getComponent(componentId)) ??
            tryget(() => this.block?.getComponent(componentId)));
    }
    getComponents() {
        return this.player?.getComponents();
    }
    getDynamicProperty(identifier) {
        return this.player?.getDynamicProperty(identifier);
    }
    getDynamicPropertyIds() {
        return this.player?.getDynamicPropertyIds();
    }
    getDynamicPropertyTotalByteCount() {
        return this.player?.getDynamicPropertyTotalByteCount();
    }
    getEffect(effectType) {
        return this.player?.getEffect(effectType);
    }
    getEffects() {
        return this.player?.getEffects();
    }
    getEntitiesFromViewDirection(options) {
        return this.player?.getEntitiesFromViewDirection(options);
    }
    getHeadLocation() {
        return this.player?.getHeadLocation();
    }
    getProperty(identifier) {
        return this.player?.getProperty(identifier);
    }
    getTags() {
        return this.player?.getTags();
    }
    getVelocity() {
        return this.player?.getVelocity();
    }
    hasComponent(componentId) {
        return this.player?.hasComponent(componentId);
    }
    hasTag(tag) {
        return this.player?.hasTag(tag);
    }
    kill() {
        return this.player?.kill();
    }
    matches(options) {
        return this.player?.matches(options);
    }
    playAnimation(animationName, options) {
        return this.player?.playAnimation(animationName, options);
    }
    remove() {
        return this.player?.remove();
    }
    removeEffect(effectType) {
        return this.player?.removeEffect(effectType);
    }
    removeTag(tag) {
        return this.player?.removeTag(tag);
    }
    resetProperty(identifier) {
        return this.player?.resetProperty(identifier);
    }
    runCommand(commandString) {
        return this.player?.runCommand(commandString);
    }
    setDynamicProperty(identifier, value) {
        return this.player?.setDynamicProperty(identifier, value);
    }
    setDynamicProperties(values) {
        return this.player?.setDynamicProperties(values);
    }
    setOnFire(seconds, useEffects) {
        return this.player?.setOnFire(seconds, useEffects);
    }
    setProperty(identifier, value) {
        return this.player?.setProperty(identifier, value);
    }
    setRotation(rotation) {
        return this.player?.setRotation(rotation);
    }
    teleport(location, teleportOptions) {
        return this.player?.teleport(location, teleportOptions);
    }
    triggerEvent(eventName) {
        return this.player?.triggerEvent(eventName);
    }
    tryTeleport(location, teleportOptions) {
        return this.player?.tryTeleport(location, teleportOptions);
    }
    setPropertyOverrideForEntity(targetEntity, identifier, value) {
        return this.player?.setPropertyOverrideForEntity(targetEntity, identifier, value);
    }
    removePropertyOverrideForEntity(targetEntity, identifier) {
        return this.player?.removePropertyOverrideForEntity(targetEntity, identifier);
    }
    clearPropertyOverridesForEntity(targetEntity) {
        return this.player?.clearPropertyOverridesForEntity(targetEntity);
    }
    saveStringToDynamicProperties(string, propertyName, clearOldProperties = true, chunkSize = 32760) {
        saveStringToEntityDynamicProperties(this.player, string, propertyName, clearOldProperties, chunkSize);
    }
    getStringFromDynamicProperties(propertyName, zeroLengthPlaceholder = "") {
        return getStringFromEntityDynamicProperties(this.player, propertyName, zeroLengthPlaceholder);
    }
    deleteStringFromDynamicProperties(propertyName) {
        deleteStringFromEntityDynamicProperties(this.player, propertyName);
    }
}
//# sourceMappingURL=executeCommandPlayerW.js.map