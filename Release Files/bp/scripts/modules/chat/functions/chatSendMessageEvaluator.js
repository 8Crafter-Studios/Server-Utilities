import { ButtonState, GameMode, InputMode, PlatformType, Player, world } from "@minecraft/server";
import "init/classes/config";
import { patternColors } from "modules/chat/constants/patternColors";
import { patternColorsMap } from "modules/chat/constants/patternColorsMap";
import { patternFunctionList } from "modules/chat/constants/patternFunctionList";
import { evaluateChatColorType } from "./evaluateChatColorType";
import { MoneySystem } from "ExtraFeatures/money";
export function chatSendMessageEvaluator(message, displayName, options) {
    return chatSendMessageEvaluator_players(chatSendMessageEvaluator_prePlayers(message, displayName, options), options);
}
export function chatSendMessageEvaluator_prePlayers(message, displayName, options) {
    const player = options?.player;
    let messageFormatting = options?.messageFormatting ?? "";
    let messageGradientMode = options?.messageGradientMode ?? undefined;
    let nameFormatting = options?.nameFormatting ?? "";
    let nameGradientMode = options?.nameGradientMode ?? undefined;
    let separatorFormatting = options?.separatorFormatting ?? "";
    let separatorGradientMode = options?.separatorGradientMode ?? undefined;
    let showDimension = options?.showDimension ?? false;
    //    let showHealth = options?.showHealth;
    if (messageFormatting == "") {
        messageFormatting = options?.playerPersonalSettings?.defaultMessageFormatting ?? config.chatRanks.defaultMessageFormatting;
    }
    if (nameFormatting == "") {
        nameFormatting = options?.playerPersonalSettings?.defaultNameFormatting ?? config.chatRanks.defaultNameFormatting;
    }
    if (separatorFormatting == "") {
        separatorFormatting = options?.playerPersonalSettings?.defaultSeparatorFormatting ?? config.chatRanks.defaultSeparatorFormatting;
    }
    const ranksListWithDefault = (options?.ranks ?? []).length > 0 ? options?.ranks : config.chatRanks.defaultRank !== "" ? [config.chatRanks.defaultRank] : [];
    let rank = "";
    switch (config.chatRanks.rankEvaluatorMode_chat) {
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
    let name = displayName.hidden
        ? ""
        : (options?.playerPersonalSettings?.nameDisplayPrefix ?? config.chatRanks.nameDisplayPrefix) +
            nameFormatting +
            (!!nameGradientMode ? evaluateChatColorType(displayName.value ?? "", nameGradientMode) : displayName.value ?? "") +
            (options?.playerPersonalSettings?.nameDisplaySuffix ?? config.chatRanks.nameDisplaySuffix);
    let nameb = displayName.hidden ? "" : !!nameGradientMode ? evaluateChatColorType(displayName.value ?? "", nameGradientMode) : displayName.value ?? "";
    name.length != 0 ? (name += options?.playerPersonalSettings?.chatNameAndMessageSeparator ?? config.chatRanks.chatNameAndMessageSeparator) : undefined; /*
        let rankMode = 0
        for (let index in player.getTags()) {
                if (player.getTags()[Number(index)].startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:"))) { rank = (rank + String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "[") + player.getTags()[Number(index)].slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:").length) + String(player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "]")) }
                if (player.getTags()[Number(index)] == ("chatHideNameTag")) { name = ""; rankMode = 1 } else {
                if (player.getTags()[Number(index)].startsWith(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")) && rankMode !== 1) { name = String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "§r<") + player.getTags()[Number(index)].slice(String(player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:").length) + String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r>") + String(player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "); rankMode = 2 } else {
                if (player.getTags()[Number(index)] == ("chatUseNameTag") && rankMode !== 1 && rankMode !== 2) { name = String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "<") + player.nameTag + String(player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? ">") + String(player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "); rankMode = 3 } } }
        }*/
    if (options?.allowEval) {
        try {
            eval(String(world.getDynamicProperty("evalBeforeEvents:chatSendBeforeModifiedMessageEval")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("chatSendBeforeEventDebugErrors")) {
                    currentplayer.sendMessage(e + " " + e.stack);
                }
            });
        }
    }
    let dimension = dimensionTypeDisplayFormatting[options?.dimension];
    let namec = name;
    if (!!messageGradientMode) {
        message = evaluateChatColorType(message, messageGradientMode);
    }
    return {
        messageFormatting,
        messageGradientMode,
        nameFormatting,
        nameGradientMode,
        separatorFormatting,
        separatorGradientMode,
        showDimension,
        //        showHealth,
        rank,
        ranksListWithDefault,
        displayName,
        name,
        nameb,
        namec,
        message,
        dimension,
    };
}
export function chatSendMessageEvaluator_players(prePlayersOutput, options) {
    let { dimension, messageFormatting, messageGradientMode, nameFormatting, nameGradientMode, separatorFormatting, separatorGradientMode, showDimension, 
    //        showHealth,
    rank, ranksListWithDefault, displayName, name, nameb, namec, message, } = prePlayersOutput;
    const isPlaceholderPlayer = options?.isPlaceholderPlayer ?? !!!options?.player;
    const isPlaceholderTargetPlayer = options?.isPlaceholderTargetPlayer ?? !!!options?.targetPlayer;
    const dimensionObject = dimensionsf[Object.entries(dimensionTypeDisplayFormatting).find((v) => v[1] === dimension)?.[0]];
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
                setDefaultCamera: () => undefined,
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
                totalArmor: 0,
                totalToughness: 0,
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
            getGameMode: () => GameMode.Survival,
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
                    contains: () => false,
                    find: () => -1,
                    firstEmptySlot: () => -1,
                    firstItem: () => -1,
                    reverseFind: () => -1,
                    findLast: () => -1,
                    weight: 0,
                    containerRules: undefined,
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
    const targetPlayer = options?.targetPlayer ??
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
                setDefaultCamera: () => undefined,
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
            dimension: dimensionObject,
            deleteStringFromDynamicProperties: () => undefined,
            dimensionLocation: {
                x: 0,
                y: 0,
                z: 0,
                dimension: dimensionObject,
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
                totalArmor: 0,
                totalToughness: 0,
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
            getGameMode: () => GameMode.Survival,
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
                containerType: "NONE, THIS IS A PLACEHOLDER TARGET PLAYER!",
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
                    contains: () => false,
                    find: () => -1,
                    firstEmptySlot: () => -1,
                    firstItem: () => -1,
                    reverseFind: () => -1,
                    findLast: () => -1,
                    weight: 0,
                    containerRules: undefined,
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
            name: displayName.sourceType === "name" ? displayName.value : "Placeholder Target Player",
            nameTag: displayName.sourceType === "nameTag" ? displayName.value : "Placeholder Target Player",
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
    const p = targetPlayer;
    let messageTimeStampEnabled = options?.messageTimeStampEnabled ||
        options?.targetPlayerSettings?.messageTimeStampEnabled ||
        (config.chatRanks.chatDisplayTimeStamp &&
            !options?.playerPersonalSettings?.hideChatDisplayTimeStamp &&
            !options?.targetPlayerSettings?.hideChatDisplayTimeStamps);
    let timestampenabled = messageTimeStampEnabled;
    let timestamp = messageTimeStampEnabled
        ? formatTime(new Date((options?.time ?? Date.now()) + (options?.targetPlayerSettings?.timeZone ?? config.system.timeZone) * 3600000))
        : "";
    let messageOutput = "";
    if (config.chatRanks.rankMode === "custom_simple") {
        messageOutput =
            (showDimension ? "[" + dimension + "§r] " : "") +
                (timestampenabled ? "[" + timestamp + "] " : "") +
                (rank !== "" ? rank + " " : "") +
                nameFormatting +
                name +
                messageFormatting +
                message;
    }
    else if (config.chatRanks.rankMode === "custom_advanced") {
        rank = ranksListWithDefault
            .map((t, index, array) => {
            let rank = t;
            let tags = options?.tags ?? [];
            return eval(`\`${config.chatRanks.rankTemplateString}\``); /*Function("rank, tags", `return ${String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r]")}`)(rank, player.getTags())*/
        })
            .join(String(options?.playerPersonalSettings?.rankDisplaySeparator ?? config.chatRanks.rankDisplaySeparator));
        const ranks = rank;
        let name = nameb;
        messageOutput = eval(`\`${config.chatRanks.messageTemplateString}\``);
    }
    else if (config.chatRanks.rankMode === "style_1") {
        rank = ranksListWithDefault.map((t) => "[§r" + t + "§r]").join(" ");
        messageOutput = `§r${showDimension ? `[${dimension}§r] ` : ""}${timestamp != "" ? `[${timestamp}] ` : ""}${rank != "" ? `${rank}§r ` : ""}${name != "" ? `<${nameFormatting}${nameb}§r> ` : ""}${messageFormatting}${message}`;
    }
    else if (config.chatRanks.rankMode === "style_2") {
        rank = ranksListWithDefault.map((t) => "[§r" + t + "§r§8]").join(" ");
        messageOutput = `§r§8${showDimension ? `[${dimension}§r] ` : ""}${timestamp != "" ? `[${timestamp}] ` : ""}${rank != "" ? `${rank}§r ` : ""}${name != "" ? `§r${nameFormatting}${nameb}§r§8 ${separatorFormatting}` : `§r§8${separatorFormatting}`}»§r §f${messageFormatting}${message}`;
    }
    else if (config.chatRanks.rankMode === "style_3") {
        rank = ranksListWithDefault.map((t) => "[§r" + t + "§r§8]").join(" ");
        messageOutput = `§r§8${showDimension ? `[${dimension}§r] ` : ""}${timestamp != "" ? `[${timestamp}] ` : ""}${rank != "" ? `${rank}§r ` : ""}§r${name != "" ? `${nameFormatting}${nameb}§r ${separatorFormatting}` : `${separatorFormatting}`}>>§r §f${messageFormatting}${message}`;
    }
    else if (config.chatRanks.rankMode === "style_4") {
        rank = ranksListWithDefault.map((t) => "[§r" + t + "§r§7]").join(" ");
        messageOutput = `§r§7${showDimension ? `[${dimension}§r] ` : ""}${timestamp != "" ? `[${timestamp}]` : ""}${rank != "" ? ` ${rank}` : ""}§r§7${name != "" ? ` ${nameFormatting}${nameb}§r§7` : ""}§l ${separatorFormatting}>§r§l §r${messageFormatting}${message}`;
    }
    else if (config.chatRanks.rankMode === "style_5") {
        rank = "[§r" + ranksListWithDefault.join("§r,") + "§r]";
        messageOutput = `§r${showDimension ? `[${dimension}§r] ` : ""}${timestamp != "" ? `[${timestamp}] ` : ""}${rank != "" ? `${rank}` : ""}§r§7${name != "" ? ` ${nameFormatting}${nameb}§r§7` : ""}${separatorFormatting}:§r §f${messageFormatting}${message}`;
    }
    return messageOutput;
}
export function chatSend_getChatMessageFormatFromPlayerTags(player) {
    let messageFormatting = "";
    let messageGradientMode = undefined;
    let nameFormatting = "";
    let nameGradientMode = undefined;
    let separatorFormatting = "";
    let separatorGradientMode = undefined;
    let showDimension = false;
    //    let showHealth = false
    if (player.hasTag("messageFormatting:r")) {
        messageFormatting += "§r";
    }
    if (player.hasTag("messageFormatting:o")) {
        messageFormatting += "§o";
    }
    if (player.hasTag("messageFormatting:l")) {
        messageFormatting += "§l";
    }
    if (player.hasTag("messageFormatting:k")) {
        messageFormatting += "§k";
    }
    if (player.hasTag("messageColor:0")) {
        messageFormatting += "§0";
    }
    else {
        if (player.hasTag("messageColor:1")) {
            messageFormatting += "§1";
        }
        else {
            if (player.hasTag("messageColor:2")) {
                messageFormatting += "§2";
            }
            else {
                if (player.hasTag("messageColor:3")) {
                    messageFormatting += "§3";
                }
                else {
                    if (player.hasTag("messageColor:4")) {
                        messageFormatting += "§4";
                    }
                    else {
                        if (player.hasTag("messageColor:5")) {
                            messageFormatting += "§5";
                        }
                        else {
                            if (player.hasTag("messageColor:6")) {
                                messageFormatting += "§6";
                            }
                            else {
                                if (player.hasTag("messageColor:7")) {
                                    messageFormatting += "§7";
                                }
                                else {
                                    if (player.hasTag("messageColor:8")) {
                                        messageFormatting += "§8";
                                    }
                                    else {
                                        if (player.hasTag("messageColor:9")) {
                                            messageFormatting += "§9";
                                        }
                                        else {
                                            if (player.hasTag("messageColor:a")) {
                                                messageFormatting += "§a";
                                            }
                                            else {
                                                if (player.hasTag("messageColor:b")) {
                                                    messageFormatting += "§b";
                                                }
                                                else {
                                                    if (player.hasTag("messageColor:c")) {
                                                        messageFormatting += "§c";
                                                    }
                                                    else {
                                                        if (player.hasTag("messageColor:d")) {
                                                            messageFormatting += "§d";
                                                        }
                                                        else {
                                                            if (player.hasTag("messageColor:e")) {
                                                                messageFormatting += "§e";
                                                            }
                                                            else {
                                                                if (player.hasTag("messageColor:f")) {
                                                                    messageFormatting += "§f";
                                                                }
                                                                else {
                                                                    if (player.hasTag("messageColor:g")) {
                                                                        messageFormatting += "§g";
                                                                    }
                                                                    else {
                                                                        if (player.hasTag("messageColor:h")) {
                                                                            messageFormatting += "§h";
                                                                        }
                                                                        else {
                                                                            if (player.hasTag("messageColor:i")) {
                                                                                messageFormatting += "§i";
                                                                            }
                                                                            else {
                                                                                if (player.hasTag("messageColor:j")) {
                                                                                    messageFormatting += "§j";
                                                                                }
                                                                                else {
                                                                                    if (player.hasTag("messageColor:m")) {
                                                                                        messageFormatting += "§m";
                                                                                    }
                                                                                    else {
                                                                                        if (player.hasTag("messageColor:n")) {
                                                                                            messageFormatting += "§n";
                                                                                        }
                                                                                        else {
                                                                                            if (player.hasTag("messageColor:p")) {
                                                                                                messageFormatting += "§p";
                                                                                            }
                                                                                            else {
                                                                                                if (player.hasTag("messageColor:q")) {
                                                                                                    messageFormatting += "§q";
                                                                                                }
                                                                                                else {
                                                                                                    if (player.hasTag("messageColor:s")) {
                                                                                                        messageFormatting += "§s";
                                                                                                    }
                                                                                                    else {
                                                                                                        if (player.hasTag("messageColor:t")) {
                                                                                                            messageFormatting += "§t";
                                                                                                        }
                                                                                                        else {
                                                                                                            if (player.hasTag("messageColor:u")) {
                                                                                                                messageFormatting += "§u";
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
        .filter((v) => v.startsWith("messageColor:"))
        .forEach((v) => {
        if (patternColors.includes(v.slice(13).toLowerCase())) {
            messageFormatting += patternColorsMap[v.slice(13).toLowerCase()];
        }
        else if (Object.keys(patternFunctionList).includes(v.slice(13).toLowerCase())) {
            messageGradientMode = v.slice(13).toLowerCase();
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
        .filter((v) => v.startsWith("messageFormatting:"))
        .forEach((v) => {
        if (["r", "o", "l", "k"].includes(v.slice(18).toLowerCase())) {
            undefined;
        }
        else {
            messageFormatting += v.slice(18).toLowerCase();
        }
    });
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
    if (player.hasTag("separatorFormatting:r")) {
        separatorFormatting += "§r";
    }
    if (player.hasTag("separatorFormatting:o")) {
        separatorFormatting += "§o";
    }
    if (player.hasTag("separatorFormatting:l")) {
        separatorFormatting += "§l";
    }
    if (player.hasTag("separatorFormatting:k")) {
        separatorFormatting += "§k";
    }
    if (player.hasTag("separatorColor:0")) {
        separatorFormatting += "§0";
    }
    else {
        if (player.hasTag("separatorColor:1")) {
            separatorFormatting += "§1";
        }
        else {
            if (player.hasTag("separatorColor:2")) {
                separatorFormatting += "§2";
            }
            else {
                if (player.hasTag("separatorColor:3")) {
                    separatorFormatting += "§3";
                }
                else {
                    if (player.hasTag("separatorColor:4")) {
                        separatorFormatting += "§4";
                    }
                    else {
                        if (player.hasTag("separatorColor:5")) {
                            separatorFormatting += "§5";
                        }
                        else {
                            if (player.hasTag("separatorColor:6")) {
                                separatorFormatting += "§6";
                            }
                            else {
                                if (player.hasTag("separatorColor:7")) {
                                    separatorFormatting += "§7";
                                }
                                else {
                                    if (player.hasTag("separatorColor:8")) {
                                        separatorFormatting += "§8";
                                    }
                                    else {
                                        if (player.hasTag("separatorColor:9")) {
                                            separatorFormatting += "§9";
                                        }
                                        else {
                                            if (player.hasTag("separatorColor:a")) {
                                                separatorFormatting += "§a";
                                            }
                                            else {
                                                if (player.hasTag("separatorColor:b")) {
                                                    separatorFormatting += "§b";
                                                }
                                                else {
                                                    if (player.hasTag("separatorColor:c")) {
                                                        separatorFormatting += "§c";
                                                    }
                                                    else {
                                                        if (player.hasTag("separatorColor:d")) {
                                                            separatorFormatting += "§d";
                                                        }
                                                        else {
                                                            if (player.hasTag("separatorColor:e")) {
                                                                separatorFormatting += "§e";
                                                            }
                                                            else {
                                                                if (player.hasTag("separatorColor:f")) {
                                                                    separatorFormatting += "§f";
                                                                }
                                                                else {
                                                                    if (player.hasTag("separatorColor:g")) {
                                                                        separatorFormatting += "§g";
                                                                    }
                                                                    else {
                                                                        if (player.hasTag("separatorColor:h")) {
                                                                            separatorFormatting += "§h";
                                                                        }
                                                                        else {
                                                                            if (player.hasTag("separatorColor:i")) {
                                                                                separatorFormatting += "§i";
                                                                            }
                                                                            else {
                                                                                if (player.hasTag("separatorColor:j")) {
                                                                                    separatorFormatting += "§j";
                                                                                }
                                                                                else {
                                                                                    if (player.hasTag("separatorColor:m")) {
                                                                                        separatorFormatting += "§m";
                                                                                    }
                                                                                    else {
                                                                                        if (player.hasTag("separatorColor:n")) {
                                                                                            separatorFormatting += "§n";
                                                                                        }
                                                                                        else {
                                                                                            if (player.hasTag("separatorColor:p")) {
                                                                                                separatorFormatting += "§p";
                                                                                            }
                                                                                            else {
                                                                                                if (player.hasTag("separatorColor:q")) {
                                                                                                    separatorFormatting += "§q";
                                                                                                }
                                                                                                else {
                                                                                                    if (player.hasTag("separatorColor:s")) {
                                                                                                        separatorFormatting += "§s";
                                                                                                    }
                                                                                                    else {
                                                                                                        if (player.hasTag("separatorColor:t")) {
                                                                                                            separatorFormatting += "§t";
                                                                                                        }
                                                                                                        else {
                                                                                                            if (player.hasTag("separatorColor:u")) {
                                                                                                                separatorFormatting += "§u";
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
        .filter((v) => v.startsWith("separatorColor:"))
        .forEach((v) => {
        if (patternColors.includes(v.slice(15).toLowerCase())) {
            separatorFormatting += patternColorsMap[v.slice(15).toLowerCase()];
        }
        else if (Object.keys(patternFunctionList).includes(v.slice(15).toLowerCase())) {
            separatorGradientMode = v.slice(15).toLowerCase();
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
        .filter((v) => v.startsWith("separatorFormatting:"))
        .forEach((v) => {
        if (["r", "o", "l", "k"].includes(v.slice(20).toLowerCase())) {
            undefined;
        }
        else {
            separatorFormatting += v.slice(20).toLowerCase();
        }
    });
    if (player.hasTag("config:dimension")) {
        showDimension = true;
    }
    if (player.hasTag("config:chatdimension")) {
        showDimension = true;
    }
    return {
        messageFormatting,
        messageGradientMode,
        nameFormatting,
        nameGradientMode,
        separatorFormatting,
        separatorGradientMode,
        showDimension,
    };
}
export function chatSend_getRanksFromPlayerTags(player, options) {
    const prefix = options?.playerPersonalSettings?.chatRankPrefix ?? config.chatRanks.chatRankPrefix;
    return player
        .getTags()
        .filter((t) => t.startsWith(prefix))
        .map((t) => t.slice(prefix.length));
}
export function chatSend_getDisplayNameFromPlayer(player, options) {
    const prefix = options?.playerPersonalSettings?.chatSudoPrefix ?? config.chatRanks.chatSudoPrefix;
    if (player.hasTag("chatHideNameTag")) {
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
        .find((t) => t.startsWith("chatSudo:"))
        ?.slice(9);
    if (sudoTag !== undefined) {
        return {
            value: sudoTag,
            hidden: false,
            sourceType: "sudo",
        };
    }
    if (player.hasTag("chatUseNameTag")) {
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
export function chatSend_generatePartialPlayerTypeForChatSendEvaluationFunctions(player) {
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
export function chatSend_getPlayerPersonalSettings(player) {
    return {
        chatNameAndMessageSeparator: player.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator"),
        chatRankPrefix: player.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix"),
        chatSudoPrefix: player.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix"),
        defaultMessageFormatting: player.getDynamicProperty("andexdbPersonalSettings:defaultMessageFormatting"),
        defaultNameFormatting: player.getDynamicProperty("andexdbPersonalSettings:defaultNameFormatting"),
        defaultSeparatorFormatting: player.getDynamicProperty("andexdbPersonalSettings:defaultSeparatorFormatting"),
        nameDisplayPrefix: player.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix"),
        nameDisplaySuffix: player.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix"),
        rankDisplayPrefix: player.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix"),
        rankDisplaySuffix: player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix"),
        rankDisplaySeparator: player.getDynamicProperty("andexdbPersonalSettings:rankDisplaySeparator"),
        hideChatDisplayTimeStamp: player.hasTag("hideChatDisplayTimeStamp"),
    };
}
export function chatSend_getTargetPlayerSettings(player) {
    return {
        hideChatDisplayTimeStamps: player.hasTag("hideChatDisplayTimeStamps"),
        messageTimeStampEnabled: player.hasTag("chatDisplayTimeStamps"),
        timeZone: player.timeZone,
    };
}
//# sourceMappingURL=chatSendMessageEvaluator.js.map