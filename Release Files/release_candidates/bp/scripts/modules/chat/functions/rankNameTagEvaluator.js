import { ButtonState, GameMode, InputMode, PlatformType, Player } from "@minecraft/server";
import "init/classes/config";
import { patternColors } from "modules/chat/constants/patternColors";
import { patternColorsMap } from "modules/chat/constants/patternColorsMap";
import { patternFunctionList } from "modules/chat/constants/patternFunctionList";
import { evaluateChatColorType } from "./evaluateChatColorType";
import { MoneySystem } from "ExtraFeatures/money";
export function rankNameTagEvaluator(displayName, options) {
    return rankNameTagEvaluator_players(rankNameTagEvaluator_prePlayers(displayName, options), options);
}
export function rankNameTagEvaluator_prePlayers(displayName, options) {
    const player = options?.player;
    let nameFormatting = options?.nameFormatting ?? "";
    let nameGradientMode = options?.nameGradientMode ?? undefined;
    let showHealth = options?.showHealth || config.chatRanks.showHealthOnPlayerNameTags;
    let currentHealth = (options?.currentHealth ?? player?.getComponent("health")?.currentValue)?.toFixed(config.chatRanks.playerNameTagHealthPrecision)?.toNumber();
    let maxHealth = (options?.maxHealth ?? player?.getComponent("health")?.effectiveMax)?.toFixed(config.chatRanks.playerNameTagHealthPrecision)?.toNumber();
    if (nameFormatting == "") {
        nameFormatting = options?.playerPersonalSettings?.defaultNameFormatting ?? config.chatRanks.defaultNameFormatting;
    }
    const ranksListWithDefault = (options?.ranks ?? []).length > 0 ? options?.ranks : config.chatRanks.defaultRank !== "" ? [config.chatRanks.defaultRank] : [];
    let rank = "";
    switch (config.chatRanks.rankEvaluatorMode_nameTags) {
        case "default":
            rank = ranksListWithDefault
                .map((rank) => (options?.playerPersonalSettings?.rankDisplayPrefix ?? config.chatRanks.rankDisplayPrefix) +
                rank +
                (options?.playerPersonalSettings?.rankDisplaySuffix ?? config.chatRanks.rankDisplaySuffix))
                .join(options?.playerPersonalSettings?.rankDisplaySeparator ?? config.chatRanks.rankDisplaySeparator);
            break;
        case "suffix_and_prefix_only_once":
            ranksListWithDefault.length > 0 &&
                (rank =
                    (options?.playerPersonalSettings?.rankDisplayPrefix ?? config.chatRanks.rankDisplayPrefix) +
                        ranksListWithDefault.join(options?.playerPersonalSettings?.rankDisplaySeparator ?? config.chatRanks.rankDisplaySeparator) +
                        (options?.playerPersonalSettings?.rankDisplaySuffix ?? config.chatRanks.rankDisplaySuffix));
            break;
    }
    let name = displayName.hidden ? "" : !!nameGradientMode ? evaluateChatColorType(displayName.value ?? "", nameGradientMode) : displayName.value ?? ""; /*
        let rankMode = 0
        for (let index in player.getTags()) {
                if (player.getTags()[Number(index)].startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:"))) { rank = (rank + String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "[") + player.getTags()[Number(index)].slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length) + String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "]")) }
                if (player.getTags()[Number(index)] == ("chatHideNameTag")) { name = ""; rankMode = 1 } else {
                if (player.getTags()[Number(index)].startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")) && rankMode !== 1) { name = String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "§r<") + player.getTags()[Number(index)].slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length) + String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r>") + String(player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "); rankMode = 2 } else {
                if (player.getTags()[Number(index)] == ("chatUseNameTag") && rankMode !== 1 && rankMode !== 2) { name = String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "<") + player.nameTag + String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? ">") + String(player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "); rankMode = 3 } } }
        }*/
    return {
        nameFormatting,
        nameGradientMode,
        showHealth,
        currentHealth,
        maxHealth,
        rank,
        ranksListWithDefault,
        displayName,
        name,
    };
}
export function rankNameTagEvaluator_players(prePlayersOutput, options) {
    let { nameFormatting, nameGradientMode, showHealth, currentHealth, maxHealth, rank, ranksListWithDefault, displayName, name } = prePlayersOutput;
    const isPlaceholderPlayer = options?.isPlaceholderPlayer ?? !!!options?.player;
    const player = options?.player ??
        {
            activeSlot: undefined,
            addEffect: () => undefined,
            addExperience: () => undefined,
            addLevels: () => undefined,
            addTag: () => undefined,
            applyDamage: () => undefined,
            applyImpulse: () => undefined,
            applyKnockback: () => undefined,
            camera: {
                clear: () => undefined,
                fade: () => undefined,
                setCamera: () => undefined,
                isValid: false,
            },
            chunkIndex: undefined,
            clearDynamicProperties: () => undefined,
            clearVelocity: () => undefined,
            clientSystemInfo: {
                maxRenderDistance: -1,
                memoryTier: 0,
                platformType: PlatformType.Desktop,
            },
            cursorInventory: undefined,
            dimension: overworld,
            deleteStringFromDynamicProperties: () => undefined,
            dimensionLocation: {
                x: 0,
                y: 0,
                z: 0,
                dimension: overworld,
            },
            directionvector: {
                x: 0,
                y: 0,
                z: 0,
            },
            eatItem: () => undefined,
            equippable: {
                get entity() {
                    return player;
                },
                getEquipment: () => undefined,
                getEquipmentSlot: () => undefined,
                isValid: false,
                setEquipment: () => undefined,
                typeId: "minecraft:equippable",
            },
            extinguishFire: () => undefined,
            getAimAssist: () => ({
                set: () => undefined,
                settings: undefined,
            }),
            getBlockFromViewDirection: () => undefined,
            getComponent: () => undefined,
            getDynamicProperty: () => undefined,
            getComponents: () => [],
            getDynamicPropertyIds: () => [],
            getDynamicPropertyTotalByteCount: () => 0,
            getEffect: () => undefined,
            getEffects: () => [],
            getEntitiesFromViewDirection: () => [],
            getGameMode: () => GameMode.survival,
            getHeadLocation: () => ({
                x: 0,
                y: 0,
                z: 0,
            }),
            getItemCooldown: () => 0,
            getProperty: () => undefined,
            getRotation: () => ({
                x: 0,
                y: 0,
            }),
            getSpawnPoint: undefined,
            getStringFromDynamicProperties: () => undefined,
            getTags: () => options?.tags ?? [],
            getVelocity: () => ({
                x: 0,
                y: 0,
                z: 0,
            }),
            getTotalXp: () => 0,
            getViewDirection: () => ({
                x: 0,
                y: 0,
                z: 0,
            }),
            hasComponent: () => false,
            hasTag: (tag) => options?.tags?.includes(tag) ?? false,
            heldItem: undefined,
            id: "0",
            inputInfo: {
                getButtonState: () => ButtonState.Released,
                getMovementVector: () => ({
                    x: 0,
                    y: 0,
                }),
                lastInputModeUsed: InputMode.KeyboardAndMouse,
                touchOnlyAffectsHotbar: false,
            },
            inputPermissions: {
                cameraEnabled: true,
                isPermissionCategoryEnabled: () => true,
                movementEnabled: true,
                setPermissionCategory: () => undefined,
            },
            inventory: {
                additionalSlotsPerStrength: 0,
                canBeSiphonedFrom: false,
                containerType: "NONE, THIS IS A PLACEHOLDER PLAYER!",
                get entity() {
                    return player;
                },
                inventorySize: 0,
                isValid: false,
                private: false,
                restrictToOwner: false,
                typeId: "minecraft:inventory",
                container: {
                    addItem: () => undefined,
                    clearAll: () => undefined,
                    emptySlotsCount: 0,
                    getItem: () => undefined,
                    getSlot: () => undefined,
                    isValid: false,
                    moveItem: () => undefined,
                    setItem: () => undefined,
                    size: 0,
                    swapItems: () => undefined,
                    transferItem: () => undefined,
                },
            },
            isClimbing: false,
            isEmoting: false,
            isFalling: false,
            isFlying: false,
            isGliding: false,
            isInWater: false,
            isJumping: false,
            isOnGround: false,
            isOp: () => false,
            isSleeping: false,
            isSneaking: false,
            isSprinting: false,
            isSwimming: false,
            isValid: true,
            kill: () => false,
            location: {
                x: 0,
                y: 0,
                z: 0,
            },
            level: 0,
            locationrotation: {
                rotX: 0,
                rotY: 0,
                x: 0,
                y: 0,
                z: 0,
            },
            locationstring: "0 0 0",
            lookAt: () => undefined,
            matches: () => false,
            moneySystem: new MoneySystem("0"),
            name: displayName.sourceType === "name" ? displayName.value : "Placeholder Player",
            nameTag: displayName.sourceType === "nameTag" ? displayName.value : "Placeholder Player",
            onScreenDisplay: undefined,
            playAnimation: () => undefined,
            playerNotifications: undefined,
            playerPermissions: undefined,
            playMusic: () => undefined,
            playSound: () => undefined,
            postClientMessage: () => undefined,
            queueMusic: () => undefined,
            remove: () => undefined,
            removeEffect: () => false,
            removeTag: () => false,
            resetLevel: () => undefined,
            resetProperty: () => undefined,
            rotationstring: "0 0",
            rotx: 0,
            roty: 0,
            runCommand: () => undefined,
            saveStringToDynamicProperties: () => undefined,
            scoreboardIdentity: undefined,
            selectedSlotIndex: 0,
            sendMessage: () => undefined,
            setDynamicProperties: () => undefined,
            setDynamicProperty: () => undefined,
            setGameMode: () => undefined,
            setOnFire: () => undefined,
            setOp: () => undefined,
            setProperty: () => undefined,
            setRotation: () => undefined,
            setSpawnPoint: () => undefined,
            spawnParticle: () => undefined,
            startItemCooldown: () => undefined,
            stopMusic: () => undefined,
            target: undefined,
            teleport: () => undefined,
            timeZone: 0,
            totalXpNeededForNextLevel: 0,
            triggerEvent: () => undefined,
            tryTeleport: () => false,
            typeId: "minecraft:player",
            worldEditSelection: undefined,
            x: 0,
            xpEarnedAtCurrentLevel: 0,
            xy: {
                x: 0,
                y: 0,
            },
            xz: {
                x: 0,
                z: 0,
            },
            y: 0,
            yz: {
                y: 0,
                z: 0,
            },
            z: 0,
        };
    let nameTagOutput = "";
    const ranks = rank;
    let nameb = name;
    let namec = name;
    nameTagOutput = eval(`\`${config.chatRanks.nameTagTemplateString}\``);
    return nameTagOutput;
}
export function rankNameTagEvaluator_getChatMessageFormatFromPlayerTags(player) {
    let nameFormatting = "";
    let nameGradientMode = undefined;
    let showHealth = false;
    if (player.hasTag("nameFormatting:r")) {
        nameFormatting += "§r";
    }
    if (player.hasTag("nameFormatting:o")) {
        nameFormatting += "§o";
    }
    if (player.hasTag("nameFormatting:l")) {
        nameFormatting += "§l";
    }
    if (player.hasTag("nameFormatting:k")) {
        nameFormatting += "§k";
    }
    if (player.hasTag("nameColor:0")) {
        nameFormatting += "§0";
    }
    else {
        if (player.hasTag("nameColor:1")) {
            nameFormatting += "§1";
        }
        else {
            if (player.hasTag("nameColor:2")) {
                nameFormatting += "§2";
            }
            else {
                if (player.hasTag("nameColor:3")) {
                    nameFormatting += "§3";
                }
                else {
                    if (player.hasTag("nameColor:4")) {
                        nameFormatting += "§4";
                    }
                    else {
                        if (player.hasTag("nameColor:5")) {
                            nameFormatting += "§5";
                        }
                        else {
                            if (player.hasTag("nameColor:6")) {
                                nameFormatting += "§6";
                            }
                            else {
                                if (player.hasTag("nameColor:7")) {
                                    nameFormatting += "§7";
                                }
                                else {
                                    if (player.hasTag("nameColor:8")) {
                                        nameFormatting += "§8";
                                    }
                                    else {
                                        if (player.hasTag("nameColor:9")) {
                                            nameFormatting += "§9";
                                        }
                                        else {
                                            if (player.hasTag("nameColor:a")) {
                                                nameFormatting += "§a";
                                            }
                                            else {
                                                if (player.hasTag("nameColor:b")) {
                                                    nameFormatting += "§b";
                                                }
                                                else {
                                                    if (player.hasTag("nameColor:c")) {
                                                        nameFormatting += "§c";
                                                    }
                                                    else {
                                                        if (player.hasTag("nameColor:d")) {
                                                            nameFormatting += "§d";
                                                        }
                                                        else {
                                                            if (player.hasTag("nameColor:e")) {
                                                                nameFormatting += "§e";
                                                            }
                                                            else {
                                                                if (player.hasTag("nameColor:f")) {
                                                                    nameFormatting += "§f";
                                                                }
                                                                else {
                                                                    if (player.hasTag("nameColor:g")) {
                                                                        nameFormatting += "§g";
                                                                    }
                                                                    else {
                                                                        if (player.hasTag("nameColor:h")) {
                                                                            nameFormatting += "§h";
                                                                        }
                                                                        else {
                                                                            if (player.hasTag("nameColor:i")) {
                                                                                nameFormatting += "§i";
                                                                            }
                                                                            else {
                                                                                if (player.hasTag("nameColor:j")) {
                                                                                    nameFormatting += "§j";
                                                                                }
                                                                                else {
                                                                                    if (player.hasTag("nameColor:m")) {
                                                                                        nameFormatting += "§m";
                                                                                    }
                                                                                    else {
                                                                                        if (player.hasTag("nameColor:n")) {
                                                                                            nameFormatting += "§n";
                                                                                        }
                                                                                        else {
                                                                                            if (player.hasTag("nameColor:p")) {
                                                                                                nameFormatting += "§p";
                                                                                            }
                                                                                            else {
                                                                                                if (player.hasTag("nameColor:q")) {
                                                                                                    nameFormatting += "§q";
                                                                                                }
                                                                                                else {
                                                                                                    if (player.hasTag("nameColor:s")) {
                                                                                                        nameFormatting += "§s";
                                                                                                    }
                                                                                                    else {
                                                                                                        if (player.hasTag("nameColor:t")) {
                                                                                                            nameFormatting += "§t";
                                                                                                        }
                                                                                                        else {
                                                                                                            if (player.hasTag("nameColor:u")) {
                                                                                                                nameFormatting += "§u";
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    player
        .getTags()
        .filter((v) => v.startsWith("nameColor:"))
        .forEach((v) => {
        if (patternColors.includes(v.slice(10).toLowerCase())) {
            nameFormatting += patternColorsMap[v.slice(10).toLowerCase()];
        }
        else if (Object.keys(patternFunctionList).includes(v.slice(10).toLowerCase())) {
            nameGradientMode = v.slice(10).toLowerCase();
        }
        else if ([
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "m",
            "n",
            "p",
            "q",
            "s",
            "t",
            "u",
        ].includes(v.slice(13).toLowerCase())) {
            undefined;
        }
    });
    player
        .getTags()
        .filter((v) => v.startsWith("nameFormatting:"))
        .forEach((v) => {
        if (["r", "o", "l", "k"].includes(v.slice(15).toLowerCase())) {
            undefined;
        }
        else {
            nameFormatting += v.slice(15).toLowerCase();
        }
    });
    if (player.hasTag("config:health")) {
        showHealth = true;
    }
    if (player.hasTag("config:nametaghealth")) {
        showHealth = true;
    }
    return {
        nameFormatting,
        nameGradientMode,
        showHealth: showHealth,
    };
}
export function rankNameTagEvaluator_getRanksFromPlayerTags(player, options) {
    const prefix = options?.playerPersonalSettings?.chatRankPrefix ?? config.chatRanks.chatRankPrefix;
    return player
        .getTags()
        .filter((t) => t.startsWith(prefix))
        .map((t) => t.slice(prefix.length));
}
export function rankNameTagEvaluator_getDisplayNameFromPlayer(player, options) {
    const prefix = options?.playerPersonalSettings?.chatSudoPrefix ?? config.chatRanks.chatSudoPrefix;
    if (player.hasTag("nameTagHideNameTag")) {
        return {
            value: "",
            hidden: true,
            sourceType: "hidden",
        };
    }
    let sudoTag = player
        .getTags()
        .find((t) => t.startsWith(prefix))
        ?.slice(prefix.length);
    sudoTag ??= player
        .getTags()
        .find((t) => t.startsWith("nameTagSudo:"))
        ?.slice(12);
    if (sudoTag !== undefined) {
        return {
            value: sudoTag,
            hidden: false,
            sourceType: "sudo",
        };
    }
    if (player.hasTag("nameTagUseNameTag")) {
        return {
            value: player.nameTag,
            hidden: false,
            sourceType: "nameTag",
        };
    }
    return {
        value: player.name,
        hidden: false,
        sourceType: "name",
    };
}
export function rankNameTagEvaluator_generatePartialPlayerTypeForRankNameTagEvaluatorEvaluationFunctions(player) {
    return player instanceof Player
        ? {
            name: player.name,
            nameTag: player.nameTag,
            tags: player.getTags(),
            hasTag(tag) {
                return this.tags.includes(tag);
            },
            getTags() {
                return this.tags;
            },
        }
        : {
            name: player.name,
            nameTag: player.nameTag,
            tags: player.tags ?? [],
            hasTag(tag) {
                return this.tags.includes(tag);
            },
            getTags() {
                return this.tags;
            },
        };
}
export function rankNameTagEvaluator_getPlayerPersonalSettings(player) {
    return {
        chatRankPrefix: player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix"),
        chatSudoPrefix: player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix"),
        defaultNameFormatting: player.getDynamicProperty("andexdbPersonalSettings:defaultNameFormatting"),
        rankDisplayPrefix: player.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix"),
        rankDisplaySuffix: player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix"),
        rankDisplaySeparator: player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySeparator"),
    };
}
//# sourceMappingURL=rankNameTagEvaluator.js.map