import { Vector3Utils } from "@minecraft/math.js";
import { system, world, ItemStack, EntityInventoryComponent, EnchantmentTypes, ItemEnchantableComponent, Player, Entity, EquipmentSlot, EntityEquippableComponent, ItemDurabilityComponent, ItemLockMode, BlockInventoryComponent, BlockPermutation, SignSide, DyeColor, BlockTypes, Block, WeatherType, EntityMarkVariantComponent, EntityPushThroughComponent, EntityScaleComponent, EntitySkinIdComponent, EntityTameableComponent, EntityBreathableComponent, EntityColorComponent, EntityFlyingSpeedComponent, EntityFrictionModifierComponent, 
// EntityGroundOffsetComponent,
EntityHealthComponent, ScriptEventSource, MolangVariableMap, Effect, } from "@minecraft/server";
import { ModalFormData, ActionFormData, ModalFormResponse } from "@minecraft/server-ui";
import { chatMessage } from "modules/chat/functions/chatMessage";
import { chatSend } from "modules/chat/functions/chatSend";
import { targetSelectorAllListC } from "modules/command_utilities/functions/targetSelectorAllListC";
import { targetSelectorAllListE } from "modules/command_utilities/functions/targetSelectorAllListE";
import { targetSelectorB } from "modules/command_utilities/functions/targetSelectorB";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { chatCommands } from "modules/commands/functions/chatCommands";
import { vTStr } from "modules/commands/functions/vTStr";
import { WorldPosition } from "modules/coordinates/classes/WorldPosition";
import { coordinates } from "modules/coordinates/functions/coordinates";
import { evaluateCoordinates } from "modules/coordinates/functions/evaluateCoordinates";
import { customElementTypeIds } from "modules/ui/functions/customElementTypeIds";
import { customFormListSelectionMenu } from "modules/ui/functions/customFormListSelectionMenu";
import { editCustomFormUI } from "modules/ui/functions/editCustomFormUI";
import { editorStick } from "modules/ui/functions/editorStick";
import { editorStickB } from "modules/ui/functions/editorStickB";
import { editorStickMenuB } from "modules/ui/functions/editorStickMenuB";
import { evalAutoScriptSettings } from "modules/ui/functions/evalAutoScriptSettings";
import { forceShow } from "modules/ui/functions/forceShow";
import { generalSettings } from "modules/ui/functions/generalSettings";
import { mainMenu } from "modules/ui/functions/mainMenu";
import { personalSettings } from "modules/ui/functions/personalSettings";
import { settings } from "modules/ui/functions/settings";
import { showCustomFormUI } from "modules/ui/functions/showCustomFormUI";
subscribedEvents.afterScriptEventReceive = system.afterEvents.scriptEventReceive.subscribe((event) => {
    const { id, // returns string (wiki:test)
    initiator, // returns Entity
    message, // returns string (Hello World)
    sourceBlock, // returns Block
    sourceEntity, // returns Entity
    sourceType, // returns MessageSourceType
     } = event;
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:scriptEventRecieve")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("scriptEventRecieveAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    if (id.startsWith("andexsa:") || id.startsWith("bluemods:")) {
        return;
    }
    if (id == "andexdb:entityScaleInitSignal") {
        world.getDimension("overworld").runCommand(`/scriptevent andexsa:entityScaleInitSignalReceivedByDebugSticks ${format_version}`);
        if (entity_scale_format_version != null && message.trim() != entity_scale_format_version) {
            globalThis.multipleEntityScaleVersionsDetected = true;
        }
        entity_scale_format_version = message.trim();
        return;
    }
    else if (id == "andexdb:entityScaleTestSignal") {
        world.getDimension("overworld").runCommand(`/scriptevent andexsa:entityScaleTestSignalReceivedByDebugSticks ${format_version}`);
        if (entity_scale_format_version != null && message.trim() != entity_scale_format_version) {
            globalThis.multipleEntityScaleVersionsDetected = true;
        }
        entity_scale_format_version = message.trim();
        return;
    }
    if (id == "andexdb:blueModsInitSignal") {
        world.getDimension("overworld").runCommand(`/scriptevent bluemods:blueModsInitSignalReceivedByDebugSticks ${format_version}`);
        if (bluemods_anticheat_format_version != null && message.trim() != entity_scale_format_version) {
            globalThis.multipleBlueModsAnticheatVersionsDetected = true;
        }
        entity_scale_format_version = message.trim();
        return;
    }
    else if (id == "andexdb:blueModsTestSignal") {
        world.getDimension("overworld").runCommand(`/scriptevent bluemods:blueModsTestSignalReceivedByDebugSticks ${format_version}`);
        if (bluemods_anticheat_format_version != null && message.trim() != entity_scale_format_version) {
            globalThis.multipleBlueModsAnticheatVersionsDetected = true;
        }
        entity_scale_format_version = message.trim();
        return;
    }
    else if (id == "andexdb:blueModsAnticheatConfig") {
        blueModsAnticheatConfig = JSON.parse(message.trim());
        return;
    }
    if (id == "andexdb:scriptevent") {
        const diamondAwesomeSword = new ItemStack("minecraft:diamond_sword", 1);
        let players = world.getAllPlayers();
        diamondAwesomeSword.setLore(["§c§lDiamond Sword of Awesome§r", "+10 coolness", "§p+4 shiny§r"]);
        // hover over/select the item in your inventory to see the lore.
        const inventory = players[0].getComponent("inventory");
        inventory.container.setItem(0, diamondAwesomeSword);
        let item = inventory.container.getItem(0);
        let enchants = item.getComponent("enchantable");
        let knockbackEnchant = {
            type: EnchantmentTypes.get("knockback"),
            level: 2,
        };
        enchants.addEnchantment(knockbackEnchant);
        inventory.container.setItem(0, item);
        const ironFireSword = new ItemStack("minecraft:iron_sword", 1); /*
          let players = world.getAllPlayers();*/
        let fireAspectEnchant = { type: "fire_aspect", level: 1 };
        let enchants2 = ironFireSword.getComponent("enchantable");
        let addedFire = enchants2.addEnchantment({
            type: EnchantmentTypes.get("fire_aspect"),
            level: 0,
        });
        console.warn(ironFireSword);
        console.warn(ironFireSword.getComponent("enchantable"));
        console.warn(fireAspectEnchant);
        console.warn(enchants);
        console.warn(addedFire);
        if (!(Boolean(addedFire) ?? false)) {
            console.warn("Could not add fire aspect.");
            return -1;
        }
        const inventory2 = players[0].getComponent("inventory");
        let itemb = inventory.container.getItem(0);
        console.warn(String(Array(item.getComponent("enchantable").getEnchantments()[0])));
        console.warn(item.getComponent("enchantable").isValid);
        console.warn(item.getComponent("enchantable").getEnchantments()[0]);
        item.setLore(["§c§lDiamond Sword of Awesome§r", "+10 coolness", "§p+4 shiny§r"]);
        console.warn(item.getComponent("enchantable"));
        console.warn(item);
        inventory.container.setItem(0, item);
        let itema = inventory2.container.getItem(0);
        let enchants3 = itema.getComponent("enchantable");
        let knockbackEnchant2 = {
            type: EnchantmentTypes.get("knockback"),
            level: 1,
        };
        enchants3.addEnchantment(knockbackEnchant2); /*
          inventory2.container.setItem(0, itema);*/
    }
    if (id == "andexdb:chatMessage") {
        chatMessage({
            cancel: false,
            message: message.replaceAll("\\@\\", "@"),
            sender: sourceEntity,
        }, false);
    }
    if (id == "andexdb:chatMessageB") {
        chatMessage({
            cancel: false,
            message: message.replaceAll("\\@\\", "@"),
            sender: sourceEntity,
        }, true);
    }
    if (id == "andexdb:chatSend") {
        chatSend({
            returnBeforeChatSend: false,
            event: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@"),
                sender: sourceEntity,
            },
            eventData: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@"),
                sender: sourceEntity,
            },
            newMessage: message.replaceAll("\\@\\", "@"),
            player: sourceEntity,
        });
    }
    if (id == "andexdb:chatCommands") {
        chatCommands({
            returnBeforeChatSend: false,
            event: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"),
                sender: sourceEntity,
            },
            eventData: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"),
                sender: sourceEntity,
            },
            newMessage: message.replaceAll("\\@\\", "@"),
            player: sourceEntity,
        });
    }
    if (id == "andexdb:cmd") {
        chatCommands({
            returnBeforeChatSend: false,
            event: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"),
                sender: (initiator ?? sourceEntity ?? sourceBlock),
            },
            eventData: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"),
                sender: (initiator ?? sourceEntity ?? sourceBlock),
            },
            newMessage: message.replaceAll("\\@\\", "@"),
            player: new executeCommandPlayerW(new WorldPosition(tryget(() => (initiator ?? sourceEntity ?? sourceBlock).location) ?? { x: 0, y: 0, z: 0 }, tryget(() => (initiator ?? sourceEntity).getRotation()) ?? { x: 0, y: 0 }, tryget(() => (initiator ?? sourceEntity ?? sourceBlock).dimension) ?? overworld, (initiator ?? sourceEntity), sourceBlock)),
        });
    }
    if (id == "andexdb:silentCmd") {
        chatCommands({
            silentCMD: true,
            returnBeforeChatSend: false,
            event: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"),
                sender: (initiator ?? sourceEntity ?? sourceBlock),
            },
            eventData: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"),
                sender: (initiator ?? sourceEntity ?? sourceBlock),
            },
            newMessage: message.replaceAll("\\@\\", "@"),
            player: new executeCommandPlayerW(new WorldPosition(tryget(() => (initiator ?? sourceEntity ?? sourceBlock).location) ?? { x: 0, y: 0, z: 0 }, tryget(() => (initiator ?? sourceEntity).getRotation()) ?? { x: 0, y: 0 }, tryget(() => (initiator ?? sourceEntity ?? sourceBlock).dimension) ?? overworld, (initiator ?? sourceEntity), sourceBlock)),
        });
    }
    if (id == "andexdb:silentBuiltInCmd") {
        chatCommands({
            silentCMD: true,
            isBultIn: true,
            isCustom: false,
            returnBeforeChatSend: false,
            event: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"),
                sender: (initiator ?? sourceEntity ?? sourceBlock),
            },
            eventData: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"),
                sender: (initiator ?? sourceEntity ?? sourceBlock),
            },
            newMessage: message.replaceAll("\\@\\", "@"),
            player: new executeCommandPlayerW(new WorldPosition(tryget(() => (initiator ?? sourceEntity ?? sourceBlock).location) ?? { x: 0, y: 0, z: 0 }, tryget(() => (initiator ?? sourceEntity).getRotation()) ?? { x: 0, y: 0 }, tryget(() => (initiator ?? sourceEntity ?? sourceBlock).dimension) ?? overworld, (initiator ?? sourceEntity), sourceBlock)),
        });
    }
    if (id == "andexdb:builtInCmd") {
        chatCommands({
            silentCMD: false,
            isBultIn: true,
            isCustom: false,
            returnBeforeChatSend: false,
            event: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"),
                sender: (initiator ?? sourceEntity ?? sourceBlock),
            },
            eventData: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"),
                sender: (initiator ?? sourceEntity ?? sourceBlock),
            },
            newMessage: message.replaceAll("\\@\\", "@"),
            player: new executeCommandPlayerW(new WorldPosition(tryget(() => (initiator ?? sourceEntity ?? sourceBlock).location) ?? { x: 0, y: 0, z: 0 }, tryget(() => (initiator ?? sourceEntity).getRotation()) ?? { x: 0, y: 0 }, tryget(() => (initiator ?? sourceEntity ?? sourceBlock).dimension) ?? overworld, (initiator ?? sourceEntity), sourceBlock)),
        });
    }
    if (id == "andexdb:silentCustomCmd") {
        chatCommands({
            silentCMD: true,
            isBultIn: false,
            isCustom: true,
            returnBeforeChatSend: false,
            event: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"),
                sender: (initiator ?? sourceEntity ?? sourceBlock),
            },
            eventData: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"),
                sender: (initiator ?? sourceEntity ?? sourceBlock),
            },
            newMessage: message.replaceAll("\\@\\", "@"),
            player: new executeCommandPlayerW(new WorldPosition(tryget(() => (initiator ?? sourceEntity ?? sourceBlock).location) ?? { x: 0, y: 0, z: 0 }, tryget(() => (initiator ?? sourceEntity).getRotation()) ?? { x: 0, y: 0 }, tryget(() => (initiator ?? sourceEntity ?? sourceBlock).dimension) ?? overworld, (initiator ?? sourceEntity), sourceBlock)),
        });
    }
    if (id == "andexdb:customCmd") {
        chatCommands({
            silentCMD: false,
            isBultIn: false,
            isCustom: true,
            returnBeforeChatSend: false,
            event: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"),
                sender: (initiator ?? sourceEntity ?? sourceBlock),
            },
            eventData: {
                cancel: false,
                message: message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"),
                sender: (initiator ?? sourceEntity ?? sourceBlock),
            },
            newMessage: message.replaceAll("\\@\\", "@"),
            player: new executeCommandPlayerW(new WorldPosition(tryget(() => (initiator ?? sourceEntity ?? sourceBlock).location) ?? { x: 0, y: 0, z: 0 }, tryget(() => (initiator ?? sourceEntity).getRotation()) ?? { x: 0, y: 0 }, tryget(() => (initiator ?? sourceEntity ?? sourceBlock).dimension) ?? overworld, (initiator ?? sourceEntity), sourceBlock)),
        });
    }
    if (id == "andexdb:blockExplosion") {
        const overworld = world.getDimension(String(message.split("|")[0]));
        let explosionOptions = message.split("|");
        let posx = Number(explosionOptions[1]);
        let posy = Number(explosionOptions[2]);
        let posz = Number(explosionOptions[3]);
        let radius = Number(explosionOptions[4]);
        let allowUnderwater = explosionOptions[5];
        let breaksBlocks = explosionOptions[6];
        let causesFire = explosionOptions[7];
        let sources = targetSelectorAllListE(explosionOptions[8], "0, 0, 0");
        overworld.createExplosion({ x: posx, y: posy, z: posz }, radius, {
            allowUnderwater: Boolean(allowUnderwater?.toLowerCase().replaceAll("0", "").replaceAll("0.0", "").replaceAll("no", "").replaceAll("false", "")),
            breaksBlocks: Boolean(breaksBlocks?.toLowerCase().replaceAll("0", "").replaceAll("0.0", "").replaceAll("no", "").replaceAll("false", "")),
            causesFire: Boolean(causesFire?.toLowerCase().replaceAll("0", "").replaceAll("0.0", "").replaceAll("no", "").replaceAll("false", "")),
            source: sources[0],
        });
    }
    if (id == "andexdb:playerDebug") {
        let form2 = new ModalFormData();
        let players = world.getPlayers();
        let entityViewedEntityType;
        let entityViewedEntityName;
        let entityViewedEntityDistance;
        let blockViewedBlockType;
        let spawnPointAllCoordinates;
        entityViewedEntityType = "None";
        entityViewedEntityName = "None";
        entityViewedEntityDistance = "None";
        let player = players[0]; /*
        player.getComponent("minecraft:inventory").container.addItem(player.getBlockFromViewDirection({includePassableBlocks: true, includeLiquidBlocks: true}).block.getItemStack())*/
        blockViewedBlockType = "None";
        spawnPointAllCoordinates = "None";
        let targetList = [players[0].nameTag];
        let scoreboardIdentity = "§4None§a";
        let scoreboardIdentityDisplayName = "§4None§a";
        let scoreboardIdentityType = "§4None§a";
        for (const index in players) {
            /*
            console.warn(index);*/
            if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
            } /*
            console.warn(targetList);*/
        }
        if (message.startsWith("players:") &&
            "0123456789".includes(message.charAt(8)) &&
            "0123456789".includes(message.charAt(message.length)) &&
            message.includes("|")) {
            let message2 = message.slice(8, message.length);
            let message3 = message.split("|");
            let playerTargetB = Number(message3[0]);
            let playerViewerB = Number(message3[1]);
        }
        else {
            form2.title("Player Debug");
            form2.dropdown("Player Target", String(targetList).split(","), { defaultValueIndex: 0 });
            form2.dropdown("Player Viewer", String(targetList).split(","), { defaultValueIndex: 0 });
            form2
                .show(players[players.findIndex((x) => x == sourceEntity)])
                .then((t) => {
                if (t.canceled)
                    return;
                let [playerTarget, playerViewer] = t.formValues;
                let playerTargetB = Number(playerTarget);
                let playerViewerB = Number(playerViewer);
                let blockProperties;
                let componentList;
                let effectsList;
                blockProperties = "";
                componentList = [];
                try {
                    componentList = [players[playerTargetB].getComponents()[0].typeId];
                }
                catch (e) {
                    componentList = "§4None§a";
                }
                effectsList = [];
                try {
                    effectsList = [
                        "§9{ §stypeId§a: §u" +
                            players[playerTargetB].getEffects()[0].typeId +
                            "§a, §sdisplayName§a: §u" +
                            players[playerTargetB].getEffects()[0].displayName +
                            "§a, §sduration§a: §c" +
                            players[playerTargetB].getEffects()[0].duration +
                            "§a, §samplifier§a: §c" +
                            players[playerTargetB].getEffects()[0].amplifier +
                            "§9 }§a",
                    ];
                }
                catch (e) {
                    effectsList = "§4None§a";
                }
                try {
                    blockProperties = [players[playerTargetB].getBlockFromViewDirection().block.permutation.getAllStates()[0]];
                }
                catch (e) {
                    blockProperties = "§4None§a";
                } /*
        let effectsList = [players[playerTargetB].getComponents[0]]*/
                let distance = Vector3Utils.distance(players[playerViewerB].location, players[playerTargetB].location);
                try {
                    entityViewedEntityType = players[playerTargetB].getEntitiesFromViewDirection()[0].entity.typeId;
                }
                catch (e) {
                    entityViewedEntityType = "§4None§a";
                }
                try {
                    entityViewedEntityName = players[playerTargetB].getEntitiesFromViewDirection()[0].entity.typeId;
                }
                catch (e) {
                    entityViewedEntityName = "§4None§a";
                }
                try {
                    entityViewedEntityDistance = players[playerTargetB].getEntitiesFromViewDirection()[0].distance;
                }
                catch (e) {
                    entityViewedEntityDistance = "§4None§a";
                }
                try {
                    scoreboardIdentity = String(players[playerTargetB].scoreboardIdentity.id);
                }
                catch (e) {
                    scoreboardIdentity = "§4None§a";
                }
                try {
                    scoreboardIdentityDisplayName = players[playerTargetB].scoreboardIdentity.displayName;
                }
                catch (e) {
                    scoreboardIdentityDisplayName = "§4None§a";
                }
                try {
                    scoreboardIdentityType = players[playerTargetB].scoreboardIdentity.type;
                }
                catch (e) {
                    scoreboardIdentityType = "§4None§a";
                }
                try {
                    blockViewedBlockType =
                        "§9{ §btypeId§a: §u" +
                            players[playerTargetB].getBlockFromViewDirection().block.typeId +
                            "§a, §bcanBeWaterlogged§a: §u" +
                            players[playerTargetB].getBlockFromViewDirection().block.canContainLiquid(modules.mcServer.LiquidType.Water) +
                            "§9 }§a";
                }
                catch (e) {
                    blockViewedBlockType = "§4None§a";
                }
                try {
                    spawnPointAllCoordinates =
                        "§a, §bgetSpawnPoint§a: §9{ §sdimension§a: §u" +
                            players[playerTargetB].getSpawnPoint().dimension +
                            "§a, §sx§a: §c" +
                            players[playerTargetB].getSpawnPoint().x +
                            "§a, §sy§a: §c" +
                            players[playerTargetB].getSpawnPoint().y +
                            "§a, §sz§a: §c" +
                            players[playerTargetB].getSpawnPoint().z +
                            "§9 }§a";
                }
                catch (e) {
                    spawnPointAllCoordinates = "§4None§a";
                }
                for (const index in players[playerTargetB].getComponents()) {
                    /*
                console.warn(index);*/
                    if (Number(index) != 0) {
                        componentList = String([String(componentList), players[playerTargetB].getComponents()[index].typeId]).split(",");
                    } /*
            console.warn(targetList);*/
                }
                for (const index in players[playerTargetB].getEffects()) {
                    /*
                console.warn(index);*/
                    if (Number(index) != 0) {
                        try {
                            effectsList = String([
                                String(effectsList),
                                "§9{ §stypeId§a: §u" +
                                    players[playerTargetB].getEffects()[index].typeId +
                                    "§a, §sdisplayName§a: §u" +
                                    players[playerTargetB].getEffects()[index].displayName +
                                    ", §sduration§a: §c" +
                                    players[playerTargetB].getEffects()[index].duration +
                                    "§a, §samplifier§a: §c" +
                                    players[playerTargetB].getEffects()[index].amplifier +
                                    "§9 }§a",
                            ]).split(",");
                        }
                        catch (e) {
                            effectsList = ["§4None§a"];
                        }
                    } /*
            console.warn(targetList);*/
                }
                players[playerViewerB].sendMessage("§bname§a: §u" +
                    players[playerTargetB].name +
                    "§a, §bnameTag§a: §u" +
                    players[playerTargetB].nameTag +
                    "§a, §bUUID§a: §u" +
                    players[playerTargetB].id +
                    "§a, §bdistance§a: §u" +
                    distance +
                    "§a, §bLocation§a: §9{ §c" +
                    players[playerTargetB].location.x +
                    "§a, §c" +
                    players[playerTargetB].location.y +
                    "§a, §c" +
                    players[playerTargetB].location.z +
                    "§9 }§a, §bisSneaking§a: §g" +
                    players[playerTargetB].isSneaking +
                    "§a, §bscoreboardIdentity§a: §u" +
                    scoreboardIdentity +
                    "§a, §bscoreboardIdentityDisplayName§a: §u" +
                    scoreboardIdentityDisplayName +
                    "§a, §bscoreboardIdentityType§a: §u" +
                    scoreboardIdentityType +
                    "§a, §bgetTotalXP§a: §c" +
                    players[playerTargetB].getTotalXp() +
                    "§a, §bxpEarnedAtCurrentLevel§a: §c" +
                    players[playerTargetB].xpEarnedAtCurrentLevel +
                    "§a, §blevel§a: §c" +
                    players[playerTargetB].level +
                    "§a, §btotalXpNeededForNextLevel§a: §c" +
                    players[playerTargetB].totalXpNeededForNextLevel +
                    "§a, §bisOp§a: §g" +
                    players[playerTargetB].isOp() +
                    "§a, §bgetBlockFromViewDirection§a: " +
                    blockViewedBlockType +
                    ", §bgetEntitiesFromViewDirection§a: §9{ §sEntity§a: " +
                    entityViewedEntityType +
                    ", §sDistance§a: " +
                    entityViewedEntityDistance +
                    " §9}§a, §bgetComponents§a: §n[§u" +
                    componentList +
                    "§n]§a, §bgetEffects§a: §n[§a" +
                    effectsList +
                    "§n]§a, §bgetTags§a: [" +
                    players[playerTargetB].getTags() +
                    "], §bgetVelocity§a: §9{ §c" +
                    (players[playerTargetB].getVelocity().x +
                        "§a, §c" +
                        players[playerTargetB].getVelocity().y +
                        "§a, §c" +
                        players[playerTargetB].getVelocity().z) +
                    "§9 }§a, §bgetViewDirection§a: §9{ §bx: §c" +
                    (players[playerTargetB].getViewDirection().x +
                        "§a, §by: §c" +
                        players[playerTargetB].getViewDirection().y +
                        "§a, §bz: §c" +
                        players[playerTargetB].getViewDirection().z) +
                    "§9 }§a, §bselectedSlotIndex§a: " +
                    players[playerTargetB].selectedSlotIndex +
                    "§a, §bspawnPoint§a: " +
                    spawnPointAllCoordinates);
            })
                .catch((e) => {
                console.error(e, e.stack);
            });
        }
    }
    if (id == "andexdb:entityDebug") {
        let form2 = new ModalFormData();
        let players = world.getPlayers();
        let entityViewedEntityType;
        let entityViewedEntityName;
        let entityViewedEntityDistance;
        let blockViewedBlockType;
        let spawnPointAllCoordinates;
        entityViewedEntityType = "None";
        entityViewedEntityName = "None";
        entityViewedEntityDistance = "None";
        blockViewedBlockType = "None";
        spawnPointAllCoordinates = "None";
        let targetList = [players[0].nameTag];
        let scoreboardIdentity = undefined;
        let scoreboardIdentityDisplayName = undefined;
        let scoreboardIdentityType = undefined;
        for (const index in players) {
            /*
            console.warn(index);*/
            if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
            } /*
            console.warn(targetList);*/
        }
        if (message.startsWith("players:") &&
            "0123456789".includes(message.charAt(8)) &&
            "0123456789".includes(message.charAt(message.length)) &&
            message.includes("|")) {
            let message2 = message.slice(8, message.length).split("|");
            let playerViewerB = Number(message2[0]);
            let selectionType = 0;
            try {
                selectionType = Number(message2[1]);
            }
            catch (e) { }
            let UUID;
            try {
                UUID = Number(message2[2]);
            }
            catch (e) { }
        }
        else {
            form2.title("Entity Debugger");
            form2.dropdown("Player Viewer", String(targetList).split(","), { defaultValueIndex: 0 });
            form2.dropdown("Selection Type", ["Facing", "UUID", "§4Closest", "§4Name Tag", "Block Location"], { defaultValueIndex: 0 });
            form2.textField("Entity UUID", "Entity UUID", { defaultValue: "0" });
            form2.textField("Entity Block Location Index", "0", { defaultValue: "0" });
            form2.textField("Entity Block Location Coordinates", "overworld, 0, 0, 0", { defaultValue: "0" });
            form2
                .show(players[players.findIndex((x) => x == sourceEntity)])
                .then((t) => {
                if (t.canceled)
                    return;
                let [playerViewer, selectionType, entityUUID, blockLocationIndex, blockLocationCoordinates] = t.formValues;
                let playerViewerB = Number(playerViewer);
                let playerTargetB;
                let blockLocation = String(blockLocationCoordinates).split(", ");
                if (selectionType == 0) {
                    playerTargetB = players[playerViewerB].getEntitiesFromViewDirection()[0].entity;
                }
                if (selectionType == 1) {
                    playerTargetB = world
                        .getDimension("overworld")
                        .getEntities()
                        .concat(world.getDimension("nether").getEntities().concat(world.getDimension("the_end").getEntities()))
                        .find((entityValue) => entityValue.id == entityUUID);
                }
                if (selectionType == 4) {
                    playerTargetB = world.getDimension(blockLocation[0]).getEntitiesAtBlockLocation({
                        x: Number(blockLocation[1]),
                        y: Number(blockLocation[2]),
                        z: Number(blockLocation[3]),
                    })[Number(blockLocationIndex)];
                }
                let distance = Vector3Utils.distance(players[playerViewerB].location, playerTargetB.location);
                try {
                    entityViewedEntityType = playerTargetB.getEntitiesFromViewDirection()[0].entity.typeId;
                }
                catch (e) {
                    entityViewedEntityType = "§4None§a";
                }
                try {
                    entityViewedEntityName = playerTargetB.getEntitiesFromViewDirection()[0].entity.typeId;
                }
                catch (e) {
                    entityViewedEntityName = "§4None§a";
                }
                try {
                    entityViewedEntityDistance = playerTargetB.getEntitiesFromViewDirection()[0].distance;
                }
                catch (e) {
                    entityViewedEntityDistance = "§4None§a";
                }
                let componentList;
                componentList = [];
                try {
                    componentList = [playerTargetB.getComponents()[0].typeId];
                }
                catch (e) {
                    console.error(e, e.stack);
                    componentList = "§4None§a";
                }
                let effectsList = [];
                try {
                    effectsList = [
                        "§9{ §stypeId§a: §u" +
                            playerTargetB.getEffects()[0].typeId +
                            "§a, §sdisplayName§a: §u" +
                            playerTargetB.getEffects()[0].displayName +
                            "§a, §sduration§a: §c" +
                            playerTargetB.getEffects()[0].duration +
                            "§a, §samplifier§a: §c" +
                            playerTargetB.getEffects()[0].amplifier +
                            "§9 }§a",
                    ];
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                let blockProperties = [];
                try {
                    blockProperties = [playerTargetB.getBlockFromViewDirection().block.permutation.getAllStates()[0]];
                }
                catch (e) {
                    console.error(e, e.stack);
                } /*
        let effectsList = [players[playerTargetB].getComponents[0]]*/
                try {
                    scoreboardIdentity = playerTargetB.scoreboardIdentity.id;
                }
                catch (e) {
                    scoreboardIdentity = "§4None§a";
                }
                try {
                    scoreboardIdentityDisplayName = playerTargetB.scoreboardIdentity.displayName;
                }
                catch (e) {
                    scoreboardIdentityDisplayName = "§4None§a";
                }
                try {
                    scoreboardIdentityType = playerTargetB.scoreboardIdentity.type;
                }
                catch (e) {
                    scoreboardIdentityType = "§4None§a";
                }
                try {
                    blockViewedBlockType =
                        "§9{ §btypeId§a: §u" +
                            playerTargetB.getBlockFromViewDirection().block.typeId +
                            "§a, §bcanBeWaterlogged§a: §u" +
                            playerTargetB.getBlockFromViewDirection().block.canContainLiquid(modules.mcServer.LiquidType.Water) +
                            "§9 }§a";
                }
                catch (e) {
                    blockViewedBlockType = "§4None§a";
                }
                for (const index in playerTargetB.getComponents()) {
                    /*
                console.warn(index);*/
                    if (Number(index) != 0) {
                        componentList = String([String(componentList), playerTargetB.getComponents()[index].typeId]).split(",");
                    } /*
            console.warn(targetList);*/
                }
                for (const index in playerTargetB.getEffects()) {
                    /*
                console.warn(index);*/
                    if (Number(index) != 0) {
                        effectsList = String([
                            String(effectsList),
                            "§9{ §stypeId§a: §u" +
                                playerTargetB.getEffects()[index].typeId +
                                "§a, §sdisplayName§a: §u" +
                                playerTargetB.getEffects()[index].displayName +
                                ", §sduration§a: §c" +
                                playerTargetB.getEffects()[index].duration +
                                "§a, §samplifier§a: §c" +
                                playerTargetB.getEffects()[index].amplifier +
                                "§9 }§a",
                        ]).split(",");
                    } /*
            console.warn(targetList);*/
                }
                players[playerViewerB].sendMessage("§btypeId§a: §u" +
                    playerTargetB.typeId +
                    "§a, §bUUID§a: §u" +
                    playerTargetB.id +
                    "§a, §bnameTag§a: §u" +
                    playerTargetB.nameTag +
                    "§a, §bdistance§a: §u" +
                    distance +
                    "§a, §bLocation§a: §9{ §c" +
                    playerTargetB.location.x +
                    "§a, §c" +
                    playerTargetB.location.y +
                    "§a, §c" +
                    playerTargetB.location.z +
                    "§9 }§a, §bisSneaking§a: §g" +
                    playerTargetB.isSneaking +
                    "§a, §bscoreboardIdentityId§a: §u" +
                    scoreboardIdentity +
                    "§a, §bscoreboardIdentityDisplayName§a: §u" +
                    scoreboardIdentityDisplayName +
                    "§a, §bscoreboardIdentityType§a: §u" +
                    scoreboardIdentityType +
                    "§a, §bgetBlockFromViewDirection§a: " +
                    blockViewedBlockType +
                    ", §bgetEntitiesFromViewDirection§a: { §sEntity§a: " +
                    entityViewedEntityType +
                    ", §sDistance§a: " +
                    entityViewedEntityDistance +
                    " }, §bgetComponents§a: §n[§u" +
                    componentList +
                    "§n]§a, §bgetEffects§a: §n[§a" +
                    effectsList +
                    "§n]§a, §bgetTags§a: [" +
                    playerTargetB.getTags() +
                    "], §bgetVelocity§a: §9{ §c" +
                    (playerTargetB.getVelocity().x + "§a, §c" + playerTargetB.getVelocity().y + "§a, §c" + playerTargetB.getVelocity().z) +
                    "§9 }§a, §bgetViewDirection§a: { " +
                    (playerTargetB.getViewDirection().x, playerTargetB.getViewDirection().y, playerTargetB.getViewDirection().z) +
                    ", §bselectedSlotIndex§a: " +
                    playerTargetB.selectedSlotIndex +
                    spawnPointAllCoordinates);
            })
                .catch((e) => {
                console.error(e, e.stack);
            });
        }
    }
    if (id == "andexdb:editorMenusAndLists" || id == "andexdb:mainMenu") {
        /*
        let form = new ActionFormData();
        let players = world.getPlayers();
    form.title("Main Menu");
    form.body("Choose menu to open. ");
    form.button("Editor Stick", "textures/items/stick");
    form.button("Editor Stick Menu B", "textures/items/stick");
    form.button("Editor Stick Menu C", "textures/items/stick");
    form.button("§8Debug Screen§f(§cUnused§f)§b", "textures/ui/ui_debug_glyph_color");
    form.button("Inventory Controller", "textures/ui/inventory_icon.png");
    form.button("Player Debug", "textures/ui/debug_glyph_color");
    form.button("Entity Debug§b", "textures/ui/debug_glyph_color");*/ /*
                        form.button("Entity Debugger", "textures/ui/debug_glyph_color");*/ /*
form.button("Player Controller", "textures/ui/controller_glyph_color");
form.button("Entity Controller", "textures/ui/controller_glyph_color_switch");
form.button("World Options§b", "textures/ui/settings_glyph_color_2x");
form.button("§4Dimension Options§f(§cComing Soon!§f)§b", "textures/ui/icon_setting");
form.button("§4Create Explosion(§cComing Soon!§f)§b", "textures/blocks/tnt_side");
form.button("§4Fill Blocks(§cComing Soon!§f)§b", "textures/blocks/stone");
form.button("§4World Debug§f(§cComing Soon!§f)§b", "textures/ui/xyz_axis.png");
form.button("§4Dimension Debug§f(§cComing Soon!§f)§b", "textures/ui/NetherPortal");
form.button("Inventory Transfer", "textures/ui/NetherPortal");
form.button("Run Command", "textures/ui/ImpulseSquare.png");
form.button("Script Eval", "textures/ui/RepeatSquare.png");
form.button("Mange Restricted Areas", "textures/ui/xyz_axis.png");
form.button("Manage Custom UIs", "textures/ui/feedIcon");
form.button("Settings", "textures/ui/settings_glyph_color_2x");
forceShow(form, players[players.findIndex((x) => x == sourceEntity)] as any).then(ra => {let r = (ra as ActionFormResponse);
    // This will stop the code when the player closes the form
    if (r.canceled) return;

    let response = r.selection;
    switch (response) {
        case 0:
            
        try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugStick saqw")); }
        // Do something
    catch(e) {
        console.error(e, e.stack);
    };
            // Do something when button 1 is pressed
            // Don't forget "break" for every case
            break;

        case 1:
            try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuB saqw")); }
            // Do something
        catch(e) {
            console.error(e, e.stack);
        };
            // Do something when button 2 is pressed
            break;

        case 2:
            try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuC saqw")); }
            // Do something
        catch(e) {
            console.error(e, e.stack);
        };
            // Do something when button 2 is pressed
            break;

        case 3:
            try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugScreen saqw")); }
            // Do something
        catch(e) {
            console.error(e, e.stack);
        };
            // Do something when button 2 is pressed
            break;

        case 4:
            try { (sourceEntity).runCommand(String("/scriptevent andexdb:itemLoreInventoryModifier hisw")); }
            // Do something
        catch(e) {
            console.error(e, e.stack);
        };
            // Do something when button 2 is pressed
            break;

        case 5:
            try { (sourceEntity).runCommand(String("/scriptevent andexdb:playerDebug saqw")); }
            // Do something
        catch(e) {
            console.error(e, e.stack);
        };
            // Do something when button 2 is pressed
            break;

        case 6:
            try { (sourceEntity).runCommand(String("/scriptevent andexdb:entityDebug saqw")); }
            // Do something
        catch(e) {
            console.error(e, e.stack);
        };
            // Do something when button 2 is pressed
            break;*/ /*

case 4:
try { (sourceEntity).runCommand(String("/scriptevent andexdb:entityDebuger saqw")); }
// Do something
catch(e) {
console.error(e, e.stack);
};
// Do something when button 2 is pressed
break;*/ /*
        
                case 7:
                    try { (sourceEntity).runCommand(String("/scriptevent andexdb:playerController saqw")); }
                    // Do something
                catch(e) {
                    console.error(e, e.stack);
                };
                    // Do something when button 2 is pressed
                    break;
        
                case 8:
                    try { (sourceEntity).runCommand(String("/scriptevent andexdb:entityController saqw")); }
                    // Do something
                catch(e) {
                    console.error(e, e.stack);
                };
                    // Do something when button 2 is pressed
                    break;
        
                case 9:
                    try { (sourceEntity).runCommand(String("/scriptevent andexdb:worldOptions saqw")); }
                    // Do something
                catch(e) {
                    console.error(e, e.stack);
                };
                    // Do something when button 2 is pressed
                    break;
        
                case 10:
                    try { (sourceEntity).runCommand(String("/scriptevent andexdb:dimensionOptions saqw")); }
                    // Do something
                catch(e) {
                    console.error(e, e.stack);
                };
                    // Do something when button 2 is pressed
                    break;
        
                case 11:
                    try { (sourceEntity).runCommand(String("/scriptevent andexdb:createExplosion saqw")); }
                    // Do something
                catch(e) {
                    console.error(e, e.stack);
                };
                    // Do something when button 2 is pressed
                    break;
        
                case 12:
                    try { (sourceEntity).runCommand(String("/scriptevent andexdb:fillBlocks saqw")); }
                    // Do something
                catch(e) {
                    console.error(e, e.stack);
                };
                    // Do something when button 2 is pressed
                    break;
        
                case 15:
                    try { (sourceEntity).runCommand(String("/scriptevent andexdb:inventoryTransfer saih")); }
                    // Do something
                catch(e) {
                    console.error(e, e.stack);
                };
                    // Do something when button 2 is pressed
                    break;
        
                case 16:
                    system.run(() => {
                        let form = new ModalFormData();
                        form.title("Command Runner / Terminal");
                        form.textField("Run Command", "Run Command");
                        form.textField("Run Delay", "Run Delay");
                        form.toggle("Debug", {defaultValue: false});
                        form.show(sourceEntity as Player).then(r => {
                            // This will stop the code when the player closes the form
                            if (r.canceled)
                                return;
                            // This will assign every input their own variable
                            let [commandId, commandDelay, debug] = r.formValues; /*
                            console.warn(r.formValues);*/ /*
system.runTimeout(() => {console.warn(
(sourceEntity).runCommand(String(commandId)).successCount);}, Number(commandDelay))
// Do something
}).catch(e => {
console.error(e, e.stack);
});})*/ /*
                    try { (sourceEntity).runCommand(String("/scriptevent andexdb:commandRunner hisa")); }
                    // Do something
                catch(e) {
                    console.error(e, e.stack);
                };*/ /*
                        // Do something when button 2 is pressed
                        break;
            
                    case 17:
                        try { (sourceEntity).runCommand(String("/scriptevent andexdb:scriptEvalRunWindow hisa")); }
                        // Do something
                    catch(e) {
                        console.error(e, e.stack);
                    };
                        // Do something when button 2 is pressed
                        break;
            
                    case 18:
                        let form = new ActionFormData();
                        let players = world.getPlayers();
                    form.title("Area Selector");
                    form.body("Choose area type to edit. ");
                    const menuList = [*/ /*"noPistonExtensionArea:", */ /*"noExplosionArea:", "noInteractArea:", "noBlockInteractArea:", "noBlockBreakArea:", "protectedArea:", "noBlockPlaceArea:"]
menuList.forEach((s)=>{form.button(s, "textures/ui/xyz_axis");})
forceShow(form, (sourceEntity as Player)).then(la => {let l = (la as ActionFormResponse);
    try {editAreas((sourceEntity as Player), menuList[l.selection]); }catch(e){console.error(e, e.stack);};})
    // Do something when button 2 is pressed
    break;

case 19:
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:customUISelector hisa")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};
    // Do something when button 2 is pressed
    break;

case 20:
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:settings hisa")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};
    // Do something when button 2 is pressed
    break;

    // You can add cases for each button
default:
    // Use this when your button doesn't have a function yet
    // You don't need to use "break" on default case
    // Remember to place the default on very bottom
}
}).catch(e => {
console.error(e, e.stack);
});*/
        mainMenu(sourceEntity);
    }
    if (id == "andexdb:itemLoreInventoryModifier" || id == "andexdb:inventoryController" || id == "andexdb:itemModifier") {
        let form2 = new ModalFormData();
        let players = world.getAllPlayers();
        let targetList = [players[0].nameTag];
        for (const index in players) {
            if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
            }
        }
        form2.textField("Slot Number", "Slot Number", { defaultValue: "0" });
        form2.dropdown("Slot Type", ["Inventory", "Equipment"], { defaultValueIndex: 0 });
        form2.dropdown("Player Target", String(targetList).split(","), { defaultValueIndex: 0 });
        form2.dropdown("Player Viewer", String(targetList).split(","), { defaultValueIndex: 0 });
        form2.toggle("Debug2", { defaultValue: false });
        form2
            .show(event.sourceEntity)
            .then((t) => {
            if (t.canceled)
                return;
            let [slotNumber, slotType, playerTarget, playerViewer, debug2] = t.formValues;
            let playerTargetB = Number(playerTarget);
            let playerViewerB = Number(playerViewer);
            let inventory;
            inventory = players[playerTargetB].getComponent("inventory"); /*
try{inventory = players[playerTargetB].getComponent("equipment_inventory") as EntityEquipmentInventoryComponent;} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }};*/
            let item = inventory.container.getItem(Number(slotNumber));
            let equipmentPlayerSlotsList = [
                EquipmentSlot.Head,
                EquipmentSlot.Chest,
                EquipmentSlot.Legs,
                EquipmentSlot.Feet,
                EquipmentSlot.Mainhand,
                EquipmentSlot.Offhand,
            ];
            if (Number(slotType) == 1) {
                try {
                    let a = players[playerTargetB].getComponent("equippable");
                    item = a.getEquipmentSlot(equipmentPlayerSlotsList[Number(slotNumber)]);
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                }
            }
            function getDurability() {
                try {
                    return item.getComponent("minecraft:durability");
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    return undefined;
                }
            }
            function getEnchantments() {
                try {
                    return item.getComponent("minecraft:enchantments");
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    return undefined;
                }
            }
            const durability = getDurability();
            function itemNameTextCalculator() {
                try {
                    if (item.nameTag == undefined) {
                        return undefined;
                    }
                    else {
                        if (item.nameTag != undefined) {
                            return item.nameTag;
                        }
                    }
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    return undefined;
                }
            }
            let itemNameTextField = itemNameTextCalculator(); /*
console.warn(itemNameTextCalculator());*/
            function itemLoreTextCalculator() {
                try {
                    if (item.getLore() == undefined) {
                        return undefined;
                    }
                    else {
                        if (item.getLore() != undefined) {
                            return Array(item.getLore().toString()).join("");
                        }
                    }
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    return undefined;
                }
            }
            let itemLoreTextField = itemLoreTextCalculator();
            let currentValueItemAmount = 0;
            try {
                currentValueItemAmount = item.amount;
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                } /* return 0*/
            }
            let currentValueItemType = undefined;
            try {
                currentValueItemType = item.typeId;
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                } /* return 0*/
            }
            let itemKeepOnDeath = false;
            try {
                itemKeepOnDeath = item.keepOnDeath;
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                } /* return false*/
            }
            let form = new ModalFormData(); /*
console.warn(item.nameTag);*/ /*
                        console.warn(Array(item.getLore().toString()).join(""));*/
            form.title("Item Modifier / Lore");
            form.textField("Item Type: " +
                currentValueItemType +
                "\nItem Name\nTo type multiple lines just put \\\\newline in between each line. \nTo clear item name just leave field blank. ", "Item Name", itemNameTextField /*(String(item.nameTag))*/);
            form.textField("Item Lore\nTo type multiple lines just put \\\\newline in between each line. ", "Item Lore", {
                defaultValue: itemLoreTextField,
            });
            form.textField("Can Destroy", "Can Destroy", { defaultValue: "" /*(String(item.getCanDestroy()))*/ });
            form.textField("Can Place On", "Can Place On", { defaultValue: "" /*(String(item.getCanPlaceOn()))*/ });
            form.textField("Trigger Event", "Trigger Event", { defaultValue: "" });
            form.toggle("Set Count", { defaultValue: false });
            form.slider("Count", 0, 255, { valueStep: 1, defaultValue: currentValueItemAmount });
            form.toggle("keepOnDeath", { defaultValue: itemKeepOnDeath });
            function getItemLockMode(mode, input) {
                try {
                    if (mode == 1) {
                        try {
                            if (item.lockMode == "inventory") {
                                return 0;
                            }
                            else {
                                if (item.lockMode == "none") {
                                    return 1;
                                }
                                else {
                                    if (item.lockMode == "slot") {
                                        return 2;
                                    }
                                }
                            }
                        }
                        catch (e) {
                            if (Boolean(debug2) == true) {
                                console.error(e, e.stack);
                            }
                            return 1;
                        }
                    }
                    else {
                        if (mode == 0) {
                            if (input == 0) {
                                return ItemLockMode.inventory;
                            }
                            else {
                                if (input == 1) {
                                    return ItemLockMode.none;
                                }
                                else {
                                    if (input == 2) {
                                        return ItemLockMode.slot;
                                    }
                                }
                            }
                        }
                    }
                }
                catch (e) {
                    console.error(e, e.stack);
                    return undefined;
                }
            }
            let itemLockModeIndex = Number(getItemLockMode(1));
            form.dropdown("lockMode", ["inventory", "none", "slot"], { defaultValueIndex: Number(itemLockModeIndex) });
            form.toggle("setLore", { defaultValue: false });
            form.toggle("clearLore", { defaultValue: false });
            form.toggle("New Item", { defaultValue: false });
            form.textField("Item Type", "Item Type", { defaultValue: "" });
            form.textField("Item Count", "Item Count", { defaultValue: "1" }); /*
form.textField("Item Data", "Trigger Event", {defaultValue: ""});*/
            form.toggle("Move Item", { defaultValue: false });
            form.textField("From Slot", "From Slot", { defaultValue: "0" });
            form.textField("To Slot", "To Slot", { defaultValue: "1" });
            form.dropdown("From Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
                defaultValueIndex: 0,
            });
            form.dropdown("From Contriner Player", String(targetList).split(","), { defaultValueIndex: 0 });
            form.textField("From Container Block", "overworld, 500, 60, 500", {
                defaultValue: players[playerTargetB].dimension.id +
                    ", " +
                    players[playerTargetB].location.x +
                    ", " +
                    players[playerTargetB].location.y +
                    ", " +
                    players[playerTargetB].location.z,
            });
            form.dropdown("To Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
                defaultValueIndex: 0,
            });
            form.dropdown("To Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
            form.textField("To Container Block", "overworld, 500, 60, 500", {
                defaultValue: players[playerTargetB].dimension.id +
                    ", " +
                    players[playerTargetB].location.x +
                    ", " +
                    players[playerTargetB].location.y +
                    ", " +
                    players[playerTargetB].location.z,
            });
            form.toggle("Swap Items", { defaultValue: false });
            form.textField("Slot", "Slot", { defaultValue: "0" });
            form.textField("Other Slot", "Other Slot", { defaultValue: "1" });
            form.dropdown("Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
                defaultValueIndex: 0,
            });
            form.dropdown("Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
            form.textField("Container Block", "overworld, 500, 60, 500", {
                defaultValue: players[playerTargetB].dimension.id +
                    ", " +
                    players[playerTargetB].location.x +
                    ", " +
                    players[playerTargetB].location.y +
                    ", " +
                    players[playerTargetB].location.z,
            });
            form.dropdown("Other Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], { defaultValueIndex: 0 });
            form.dropdown("Other Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
            form.textField("Other Container Block", "overworld, 500, 60, 500", {
                defaultValue: players[playerTargetB].dimension.id +
                    ", " +
                    players[playerTargetB].location.x +
                    ", " +
                    players[playerTargetB].location.y +
                    ", " +
                    players[playerTargetB].location.z,
            });
            form.toggle("Transfer Item", { defaultValue: false });
            form.textField("From Slot", "From Slot", { defaultValue: "0" });
            form.dropdown("From Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
                defaultValueIndex: 0,
            });
            form.dropdown("From Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
            form.textField("From Container Block", "overworld, 500, 60, 500", {
                defaultValue: players[playerTargetB].dimension.id +
                    ", " +
                    players[playerTargetB].location.x +
                    ", " +
                    players[playerTargetB].location.y +
                    ", " +
                    players[playerTargetB].location.z,
            });
            form.dropdown("To Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
                defaultValueIndex: 0,
            });
            form.dropdown("To Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
            form.textField("To Container Block", "overworld, 500, 60, 500", {
                defaultValue: players[playerTargetB].dimension.id +
                    ", " +
                    players[playerTargetB].location.x +
                    ", " +
                    players[playerTargetB].location.y +
                    ", " +
                    players[playerTargetB].location.z,
            });
            form.toggle("Debug", { defaultValue: false });
            form.show(players[playerViewerB])
                .then((r) => {
                // This will stop the code when the player closes the form
                if (r.canceled)
                    return;
                // This will assign every input their own variable
                let [itemName, itemLore, canDestroy, canPlaceOn, triggerEvent, setAmount, amount, keepOnDeath, lockMode, setLore, clearLore, newItem, newItemType, newItemCount /*, newItemData*/, moveItem, moveFromSlot, moveToSlot, moveFromContainerType, moveFromContainer, moveFromContainerBlock, moveToContainerType, moveToContainer, moveToContainerBlock, swapItems, swapSlot, swapOtherSlot, swapContainerType, swapContainer, swapContainerBlock, swapOtherContainerType, swapOtherContainer, swapOtherContainerBlock, transferItem, transferFromSlot, transferFromContainerType, transferFromContainer, transferFromContainerBlock, transferToContainerType, transferToContainer, transferToContainerBlock, debug,] = r.formValues; /*
console.warn(r.formValues);*/
                /*let item = inventory.container.getItem(Number(slotNumber));
    if (Number(slotType) == 1) { try{let a = players[playerTargetB].getComponent("equipment_inventory") as EntityEquipmentInventoryComponent; item = a.getEquipmentSlot(equipmentPlayerSlotsList[Number(slotNumber)])} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack); }};};*/
                let transferFromContainerBlockB = world.getDimension(String(transferFromContainerBlock).split(", ")[0]).getBlock({
                    x: Number(String(transferFromContainerBlock).split(", ")[1]),
                    y: Number(String(transferFromContainerBlock).split(", ")[2]),
                    z: Number(String(transferFromContainerBlock).split(", ")[3]),
                });
                let transferToContainerBlockB = world.getDimension(String(transferToContainerBlock).split(", ")[0]).getBlock({
                    x: Number(String(transferToContainerBlock).split(", ")[1]),
                    y: Number(String(transferToContainerBlock).split(", ")[2]),
                    z: Number(String(transferToContainerBlock).split(", ")[3]),
                });
                let moveFromContainerBlockB = world.getDimension(String(moveFromContainerBlock).split(", ")[0]).getBlock({
                    x: Number(String(moveFromContainerBlock).split(", ")[1]),
                    y: Number(String(moveFromContainerBlock).split(", ")[2]),
                    z: Number(String(moveFromContainerBlock).split(", ")[3]),
                });
                let moveToContainerBlockB = world.getDimension(String(moveToContainerBlock).split(", ")[0]).getBlock({
                    x: Number(String(moveToContainerBlock).split(", ")[1]),
                    y: Number(String(moveToContainerBlock).split(", ")[2]),
                    z: Number(String(moveToContainerBlock).split(", ")[3]),
                });
                let swapContainerBlockB = world.getDimension(String(swapContainerBlock).split(", ")[0]).getBlock({
                    x: Number(String(swapContainerBlock).split(", ")[1]),
                    y: Number(String(swapContainerBlock).split(", ")[2]),
                    z: Number(String(swapContainerBlock).split(", ")[3]),
                });
                let swapOtherContainerBlockB = world.getDimension(String(swapOtherContainerBlock).split(", ")[0]).getBlock({
                    x: Number(String(swapOtherContainerBlock).split(", ")[1]),
                    y: Number(String(swapOtherContainerBlock).split(", ")[2]),
                    z: Number(String(swapOtherContainerBlock).split(", ")[3]),
                });
                let durability2 = getDurability();
                let enchantments2 = getEnchantments(); /*
for (const index in inventory.) {
if (Number(index) != 0) {
targetList = String([String(targetList), players[index].nameTag]).split(",");
}
}*/
                let newItemNameTag = String(itemName).split("\\\\newline");
                try {
                    item.nameTag = newItemNameTag.join("\n");
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setLore) == true) {
                    try {
                        item.setLore(String(itemLore).split("\\\\newline"));
                    }
                    catch (e) {
                        if (Boolean(debug2) == true) {
                            console.error(e, e.stack);
                        }
                    }
                }
                if (Boolean(clearLore) == true) {
                    try {
                        item.setLore();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                try {
                    item.lockMode = String(getItemLockMode(0, Number(lockMode)));
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                }
                try {
                    item.keepOnDeath = Boolean(keepOnDeath);
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setAmount) == true) {
                    try {
                        item.amount = Number(amount);
                    }
                    catch (e) {
                        if (Boolean(debug2) == true) {
                            console.error(e, e.stack);
                        }
                    }
                }
                if (String(canDestroy) !== "") {
                    try {
                        item.setCanDestroy(String(canDestroy).split(", "));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    } /*String[String(canDestroy)]*/
                }
                if (String(canPlaceOn) !== "") {
                    try {
                        item.setCanPlaceOn(String(canPlaceOn).split(", "));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (String(triggerEvent) !== "") {
                    try {
                        item.triggerEvent(String(triggerEvent));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                } /*
try{ durability2.damage = Number(10); } catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*/ /*
                                let enchantment = new Enchantment("fire_aspect", 4)
                                enchantment.level = 5
                                try{ const enchantments3 = enchantments2.enchantments; enchantments3.addEnchantment(enchantment); enchantments2.enchantments = enchantments3} catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*/
                if (Boolean(newItem) == true) {
                    try {
                        item = new ItemStack(String(newItemType), Number(newItemCount));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (event.sourceEntity.hasTag("scriptDebugger")) {
                    console.warn(item.typeId);
                }
                if (Number(slotType) == 1) {
                    try {
                        let a = players[playerTargetB].getComponent("equippable");
                        a.setEquipment(equipmentPlayerSlotsList[Number(slotNumber)], item.clone());
                    }
                    catch (e) {
                        if (Boolean(debug2) == true) {
                            console.error(e, e.stack);
                        }
                    }
                }
                else {
                    try {
                        inventory.container.setItem(Number(slotNumber), item);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                } /*
try{ durability2.damage = Number(10); } catch(e){if (Boolean(debug2) == true) { console.error(e, e.stack)}; }*/
                if (Boolean(moveItem) == true) {
                    /*
        let moveFromSlotB: any
        moveFromSlotB = undefined*/
                    let moveFromContainerB;
                    moveFromContainerB = players[Number(moveFromContainer)].getComponent("inventory");
                    switch (moveFromContainerType) {
                        case 4:
                            moveFromContainerB = moveFromContainerBlockB.getComponent("inventory");
                            break;
                    }
                    let moveToContainerB;
                    moveToContainerB = players[Number(moveToContainer)].getComponent("inventory");
                    switch (moveToContainerType) {
                        case 4:
                            moveToContainerB = moveToContainerBlockB.getComponent("inventory");
                            break;
                    }
                    try {
                        moveFromContainerB.container.moveItem(Number(moveFromSlot), Number(moveToSlot), moveToContainerB.container);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(swapItems) == true) {
                    /*
        let moveFromSlotB: any
        moveFromSlotB = undefined*/
                    let swapContainerB;
                    let mode = 0;
                    swapContainerB = players[Number(swapContainer)].getComponent("inventory");
                    let itemA;
                    itemA = undefined;
                    if (Number(swapSlot) > 35 && Number(swapContainerType) == 0) {
                        try {
                            swapContainerB = players[playerTargetB].getComponent("equippable");
                            swapSlot = Number(swapSlot) - 36;
                            mode = 1;
                            itemA = swapContainerB.getEquipment(equipmentPlayerSlotsList[Number(swapSlot)]).clone();
                        }
                        catch (e) {
                            if (Boolean(debug2) == true) {
                                console.error(e, e.stack);
                            }
                        }
                    }
                    switch (swapContainerType) {
                        case 4:
                            swapContainerB = swapContainerBlockB.getComponent("inventory");
                            break;
                    }
                    let swapOtherContainerB;
                    swapOtherContainerB = players[Number(swapOtherContainer)].getComponent("inventory");
                    let itemB;
                    itemB = undefined;
                    if (Number(swapOtherSlot) > 35) {
                        try {
                            swapOtherContainerB = players[playerTargetB].getComponent("equippable");
                            swapOtherSlot = Number(swapOtherSlot) - 36;
                            if (mode == 1) {
                                mode = 2;
                            }
                            else {
                                mode = 3;
                            }
                            itemB = swapOtherContainerB.getEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)]).clone();
                        }
                        catch (e) {
                            if (Boolean(debug2) == true) {
                                console.error(e, e.stack);
                            }
                        }
                    }
                    switch (swapOtherContainerType) {
                        case 4:
                            swapOtherContainerB = swapOtherContainerBlockB.getComponent("inventory");
                            break;
                    }
                    try {
                        if (itemB == undefined) {
                            itemB = swapOtherContainerB.container.getItem(Number(swapOtherSlot)).clone();
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    try {
                        if (itemA == undefined) {
                            itemA = swapContainerB.container.getItem(Number(swapSlot)).clone();
                        }
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    switch (mode) {
                        case 0:
                            console.warn("Mode: 0");
                            try {
                                swapContainerB.container.swapItems(Number(swapSlot), Number(swapOtherSlot), swapOtherContainerB);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case 1:
                            console.warn("Mode: 1");
                            try {
                                swapContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemB);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            try {
                                swapOtherContainerB.container.setItem(Number(swapOtherSlot), itemA);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case 3:
                            console.warn("Mode: 3");
                            try {
                                swapOtherContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemA);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            try {
                                swapContainerB.container.setItem(Number(swapSlot), itemB);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case 2:
                            console.warn("Mode: 2");
                            try {
                                swapContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapSlot)], itemA);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            try {
                                swapOtherContainerB.setEquipment(equipmentPlayerSlotsList[Number(swapOtherSlot)], itemB);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                    }
                }
                if (Boolean(transferItem) == true) {
                    /*
        let moveFromSlotB: any
        moveFromSlotB = undefined*/
                    let transferFromContainerB;
                    transferFromContainerB = players[Number(transferFromContainer)].getComponent("inventory");
                    switch (transferFromContainerType) {
                        case 4:
                            transferFromContainerB = transferFromContainerBlockB.getComponent("inventory");
                            break;
                    }
                    let transferToContainerB;
                    transferToContainerB = players[Number(transferToContainer)].getComponent("inventory");
                    switch (transferToContainerType) {
                        case 4:
                            transferToContainerB = transferToContainerBlockB.getComponent("inventory");
                            break;
                    }
                    try {
                        transferFromContainerB.container.transferItem(Number(transferFromSlot), transferToContainerB.container);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(debug) == true) {
                    console.warn("Form Values", r.formValues);
                    console.warn(["Item Components: ", item.getComponents()]);
                    console.warn(item.getTags());
                    console.warn(players);
                    console.warn(players[0]);
                    console.warn(players[1]); /*
try {console.warn(item.getCanDestroy());} catch(e){
    console.error(e, e.stack)};
try {console.warn(item.getCanPlaceOn());} catch(e){
    console.error(e, e.stack)};*/
                    console.warn(item.isStackable);
                    console.warn(item.maxAmount);
                    console.warn(item.type);
                    console.warn(item.typeId);
                    console.warn(item.nameTag);
                    console.warn(item.getLore());
                    try {
                        console.warn(["Damage: ", durability.damage]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    try {
                        console.warn(["Damage Chance: ", durability.getDamageChance()]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    try {
                        console.warn(["Damage Range: ", durability.getDamageChanceRange()]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    try {
                        console.warn(["Max Durability: ", durability.maxDurability]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    let componentList = [item.getComponents()[0].typeId];
                    for (const index in players) {
                        if (Number(index) != 0) {
                            componentList = String([String(componentList), item.getComponents()[index].typeId]).split(",");
                        }
                    }
                    console.warn(String(["Item Components: " + String(componentList)]));
                }
                // Do something
            })
                .catch((e) => {
                console.error(e, e.stack);
            });
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:inventoryTransfer") {
        let form = new ActionFormData();
        let players = world.getPlayers();
        let callerPlayer = players[players.findIndex((x) => x == sourceEntity)];
        form.title("Inventory Transfer");
        form.body("Choose menu to open. ");
        form.button("Inventory", "textures/items/stick");
        form.button("Hotbar", "textures/items/stick");
        form.button("Full Inventory + Hotbar", "textures/items/stick");
        form.button("Inventory Row", "textures/ui/ui_debug_glyph_color");
        form.button("§4Edit The Block Presets", "textures/ui/ui_debug_glyph_color");
        form.show(players[players.findIndex((x) => x == sourceEntity)])
            .then((r) => {
            // This will stop the code when the player closes the form
            if (r.canceled)
                return;
            let response = r.selection;
            switch (response) {
                case 0:
                    let form2 = new ActionFormData();
                    form2.title("Inventory Transfer");
                    form2.body("Choose menu to open. ");
                    form2.button("Block & Block", "textures/items/stick");
                    form2.button("Player & Player", "textures/ui/switch_accounts");
                    form2.button("Block & Player", "textures/items/stick");
                    form2
                        .show(players[players.findIndex((x) => x == sourceEntity)])
                        .then((s) => {
                        // This will stop the code when the player closes the form
                        if (s.canceled)
                            return;
                        let response = s.selection;
                        switch (response) {
                            case 0 /*
        let form3 = new ActionFormData();
        form3.title("Inventory Transfer");
        form3.body("Choose First Block Preset. ");
        form3.button("Use Coordinates And Dimension Instead", "textures/items/stick");
        form3.button("Preset 1", "textures/items/stick");
        form3.button("Edit Presets", "textures/items/stick");
        form3.show(players[players.findIndex((x) => x == sourceEntity)] as any).then(s => {
        // This will stop the code when the player closes the form
            if (s.canceled) return;

            let response = s.selection;
            switch (response) {
                case 0:
                    
                try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugStick saqw")); }
                // Do something
            catch(e) {
                console.error(e, e.stack);
            };
                    // Do something when button 1 is pressed
                    // Don't forget "break" for every case
                    break;

                case 1:
                    try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuB saqw")); }
                    // Do something
                catch(e) {
                    console.error(e, e.stack);
                };
                    // Do something when button 2 is pressed
                    break; }
                }).catch(e => {
                    console.error(e, e.stack);
                });
                    // Do something when button 1 is pressed
                    // Don't forget "break" for every case
                    break;*/:
                                let form3 = new ModalFormData(); /*Z
    let targetList = [players[0].nameTag]
    for (const index in players) {
        if (Number(index) != 0) {
        targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }*/
                                form3.dropdown("Transfer Type", ["Swap", "Transfer", "Move"], { defaultValueIndex: 0 });
                                form3.dropdown("Block", ["Position", "Preset 1", "Preset 2", "Preset 3"], { defaultValueIndex: 0 });
                                form3.textField("From Block", "dimension, x, y, z", {
                                    defaultValue: callerPlayer.dimension.id +
                                        ", " +
                                        Math.floor(callerPlayer.location.x) +
                                        ", " +
                                        Math.floor(callerPlayer.location.y) +
                                        ", " +
                                        Math.floor(callerPlayer.location.z),
                                });
                                form3.dropdown("Block", ["Position", "Preset 1", "Preset 2", "Preset 3"], { defaultValueIndex: 0 });
                                form3.textField("To Block", "dimension, x, y, z", {
                                    defaultValue: callerPlayer.dimension.id +
                                        ", " +
                                        Math.floor(callerPlayer.location.x) +
                                        ", " +
                                        Math.floor(callerPlayer.location.y) +
                                        ", " +
                                        Math.floor(callerPlayer.location.z),
                                });
                                form3.toggle("Debug2", { defaultValue: false });
                                form3
                                    .show(event.sourceEntity)
                                    .then((t) => {
                                    if (t.canceled)
                                        return;
                                    let [transferType, fromBlockSelectionMode, fromBlockPosition, toBlockSelectionMode, toBlockPosition, debug2] = t.formValues;
                                    let fromBlockPositionB = world.getDimension(String(fromBlockPosition).split(", ")[0]).getBlock({
                                        x: Number(String(fromBlockPosition).split(", ")[1]),
                                        y: Number(String(fromBlockPosition).split(", ")[2]),
                                        z: Number(String(fromBlockPosition).split(", ")[3]),
                                    });
                                    let toBlockPositionB = world.getDimension(String(toBlockPosition).split(", ")[0]).getBlock({
                                        x: Number(String(toBlockPosition).split(", ")[1]),
                                        y: Number(String(toBlockPosition).split(", ")[2]),
                                        z: Number(String(toBlockPosition).split(", ")[3]),
                                    });
                                    let fromBlockPositionC = fromBlockPositionB.getComponent("inventory");
                                    let toBlockPositionC = toBlockPositionB.getComponent("inventory");
                                    if (Number(fromBlockSelectionMode) > 0) {
                                        let fromPresetValues = undefined;
                                        try {
                                            fromPresetValues = callerPlayer.getDynamicProperty("blockTransferPreset" + String(Number(fromBlockSelectionMode) - 1));
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                        try {
                                            fromBlockPositionC = world
                                                .getDimension(String(fromPresetValues).split(", ")[0])
                                                .getBlock({
                                                x: Number(String(fromPresetValues).split(", ")[1]),
                                                y: Number(String(fromPresetValues).split(", ")[2]),
                                                z: Number(String(fromPresetValues).split(", ")[3]),
                                            })
                                                .getComponent("inventory");
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                    }
                                    if (Number(toBlockSelectionMode) > 0) {
                                        let toPresetValues = undefined;
                                        try {
                                            toPresetValues = callerPlayer.getDynamicProperty("blockTransferPreset" + String(Number(toBlockSelectionMode) - 1));
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                        try {
                                            toBlockPositionC = world
                                                .getDimension(String(toPresetValues).split(", ")[0])
                                                .getBlock({
                                                x: Number(String(toPresetValues).split(", ")[1]),
                                                y: Number(String(toPresetValues).split(", ")[2]),
                                                z: Number(String(toPresetValues).split(", ")[3]),
                                            })
                                                .getComponent("inventory");
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                    }
                                    switch (transferType) {
                                        case 0:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    fromBlockPositionC.container.swapItems(Number(index), Number(index), toBlockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 1:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    fromBlockPositionC.container.transferItem(Number(index), toBlockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 2:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    fromBlockPositionC.container.moveItem(Number(index), Number(index), toBlockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        // You can add cases for each button
                                        default:
                                        // Use this when your button doesn't have a function yet
                                        // You don't need to use "break" on default case
                                        // Remember to place the default on very bottom
                                    }
                                })
                                    .catch((e) => {
                                    console.error(e, e.stack);
                                });
                                // Do something when button 2 is pressed
                                break;
                            case 1:
                                let form2 = new ModalFormData();
                                let targetList = [players[0].nameTag];
                                for (const index in players) {
                                    if (Number(index) != 0) {
                                        targetList = String([String(targetList), players[index].nameTag]).split(",");
                                    }
                                }
                                form2.dropdown("Transfer Type", ["Swap", "Transfer", "Move"], { defaultValueIndex: 0 });
                                form2.dropdown("From Player", String(targetList).split(","), { defaultValueIndex: 0 });
                                form2.dropdown("To Player", String(targetList).split(","), { defaultValueIndex: 0 });
                                form2.toggle("Debug2", { defaultValue: false });
                                form2
                                    .show(event.sourceEntity)
                                    .then((t) => {
                                    if (t.canceled)
                                        return;
                                    let [transferType, playerTarget, playerViewer, debug2] = t.formValues;
                                    let playerTargetB = Number(playerTarget);
                                    let playerViewerB = Number(playerViewer);
                                    const fromInventory = players[playerTargetB].getComponent("inventory");
                                    const toInventory = players[playerViewerB].getComponent("inventory");
                                    switch (transferType) {
                                        case 0:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    fromInventory.container.swapItems(Number(index + 9), Number(index + 9), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 1:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    fromInventory.container.transferItem(Number(index + 9), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 2:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    fromInventory.container.moveItem(Number(index + 9), Number(index + 9), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        // You can add cases for each button
                                        default:
                                        // Use this when your button doesn't have a function yet
                                        // You don't need to use "break" on default case
                                        // Remember to place the default on very bottom
                                    }
                                })
                                    .catch((e) => {
                                    console.error(e, e.stack);
                                });
                                // Do something when button 2 is pressed
                                break;
                            case 2 /*
        let form3 = new ActionFormData();
        form3.title("Inventory Transfer");
        form3.body("Choose First Block Preset. ");
        form3.button("Use Coordinates And Dimension Instead", "textures/items/stick");
        form3.button("Preset 1", "textures/items/stick");
        form3.button("Edit Presets", "textures/items/stick");
        form3.show(players[players.findIndex((x) => x == sourceEntity)] as any).then(s => {
        // This will stop the code when the player closes the form
            if (s.canceled) return;

            let response = s.selection;
            switch (response) {
                case 0:
                    
                try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugStick saqw")); }
                // Do something
            catch(e) {
                console.error(e, e.stack);
            };
                    // Do something when button 1 is pressed
                    // Don't forget "break" for every case
                    break;

                case 1:
                    try { (sourceEntity).runCommand(String("/scriptevent andexdb:debugStickMenuB saqw")); }
                    // Do something
                catch(e) {
                    console.error(e, e.stack);
                };
                    // Do something when button 2 is pressed
                    break; }
                }).catch(e => {
                    console.error(e, e.stack);
                });
                    // Do something when button 1 is pressed
                    // Don't forget "break" for every case
                    break;*/:
                                let form4 = new ModalFormData();
                                let targetList2 = [players[0].nameTag];
                                for (const index in players) {
                                    if (Number(index) != 0) {
                                        targetList2 = String([String(targetList2), players[index].nameTag]).split(",");
                                    }
                                }
                                form4.dropdown("Transfer Type", ["Swap", "Transfer To Block", "Transfer To Player", "Move To Block", "Move To Player"], { defaultValueIndex: 0 });
                                form4.dropdown("Block", ["Position", "Preset 1", "Preset 2", "Preset 3"], { defaultValueIndex: 0 });
                                form4.textField("Block", "dimension, x, y, z", {
                                    defaultValue: callerPlayer.dimension.id +
                                        ", " +
                                        Math.floor(callerPlayer.location.x) +
                                        ", " +
                                        Math.floor(callerPlayer.location.y) +
                                        ", " +
                                        Math.floor(callerPlayer.location.z),
                                }); /*
    form4.dropdown("Block", ["Position", "Preset 1", "Preset 2", "Preset 3"], 0)
    form4.textField("To Block", "dimension, x, y, z", callerPlayer.dimension.id + ", " + Math.floor(callerPlayer.location.x) + ", " + Math.floor(callerPlayer.location.y) + ", " + Math.floor(callerPlayer.location.z))*/
                                form4.dropdown("Player", String(targetList2).split(","), { defaultValueIndex: 0 });
                                form4.toggle("Debug2", { defaultValue: false });
                                form4
                                    .show(event.sourceEntity)
                                    .then((t) => {
                                    if (t.canceled)
                                        return;
                                    let [transferType, blockSelectionMode, fromBlockPosition, playerTarget, debug2] = t.formValues;
                                    let blockPositionB = world.getDimension(String(fromBlockPosition).split(", ")[0]).getBlock({
                                        x: Number(String(fromBlockPosition).split(", ")[1]),
                                        y: Number(String(fromBlockPosition).split(", ")[2]),
                                        z: Number(String(fromBlockPosition).split(", ")[3]),
                                    });
                                    let blockPositionC = blockPositionB.getComponent("inventory");
                                    let playerTargetB = Number(playerTarget);
                                    const toInventory = players[playerTargetB].getComponent("inventory");
                                    if (Number(blockSelectionMode) > 0) {
                                        let presetValues = undefined;
                                        try {
                                            presetValues = callerPlayer.getDynamicProperty("blockTransferPreset" + String(Number(blockSelectionMode) - 1));
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                        try {
                                            blockPositionC = world
                                                .getDimension(String(presetValues).split(", ")[0])
                                                .getBlock({
                                                x: Number(String(presetValues).split(", ")[1]),
                                                y: Number(String(presetValues).split(", ")[2]),
                                                z: Number(String(presetValues).split(", ")[3]),
                                            })
                                                .getComponent("inventory");
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                    }
                                    switch (transferType) {
                                        case 0:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    blockPositionC.container.swapItems(Number(index), Number(index + 9), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 1:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    toInventory.container.transferItem(Number(index + 9), blockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 2:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    blockPositionC.container.transferItem(Number(index), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 3:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    toInventory.container.moveItem(Number(index + 9), Number(index), blockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 4:
                                            for (let index = 0; index < 27; index++) {
                                                try {
                                                    blockPositionC.container.moveItem(Number(index), Number(index + 9), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        // You can add cases for each button
                                        default:
                                        // Use this when your button doesn't have a function yet
                                        // You don't need to use "break" on default case
                                        // Remember to place the default on very bottom
                                    }
                                })
                                    .catch((e) => {
                                    console.error(e, e.stack);
                                });
                                // Do something when button 2 is pressed
                                break;
                        }
                    })
                        .catch((e) => {
                        console.error(e, e.stack);
                    });
                    // Do something when button 1 is pressed
                    // Don't forget "break" for every case
                    break;
                case 1:
                    let form3 = new ActionFormData();
                    form3.title("Inventory Transfer");
                    form3.body("Choose menu to open. ");
                    form3.button("Player & Player", "textures/ui/switch_accounts.png");
                    form3.button("Block & Player", "textures/items/stick");
                    form3
                        .show(players[players.findIndex((x) => x == sourceEntity)])
                        .then((u) => {
                        // This will stop the code when the player closes the form
                        if (u.canceled)
                            return;
                        let response = u.selection;
                        switch (response) {
                            case 0:
                                let form2 = new ModalFormData();
                                let targetList = [players[0].nameTag];
                                for (const index in players) {
                                    if (Number(index) != 0) {
                                        targetList = String([String(targetList), players[index].nameTag]).split(",");
                                    }
                                }
                                form2.dropdown("Transfer Type", ["Swap", "Transfer", "Move"], { defaultValueIndex: 0 });
                                form2.dropdown("From Player", String(targetList).split(","), { defaultValueIndex: 0 });
                                form2.dropdown("To Player", String(targetList).split(","), { defaultValueIndex: 0 });
                                form2.toggle("Debug2", { defaultValue: false });
                                form2
                                    .show(event.sourceEntity)
                                    .then((t) => {
                                    if (t.canceled)
                                        return;
                                    let [transferType, playerTarget, playerViewer, debug2] = t.formValues;
                                    let playerTargetB = Number(playerTarget);
                                    let playerViewerB = Number(playerViewer);
                                    const fromInventory = players[playerTargetB].getComponent("inventory");
                                    const toInventory = players[playerViewerB].getComponent("inventory");
                                    switch (transferType) {
                                        case 0:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromInventory.container.swapItems(Number(index), Number(index), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 1:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromInventory.container.transferItem(Number(index), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 2:
                                            try {
                                                sourceEntity.runCommand(String("/scriptevent andexdb:debugScreen saqw"));
                                            }
                                            catch (e) {
                                                // Do something
                                                console.error(e, e.stack);
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        // You can add cases for each button
                                        default:
                                        // Use this when your button doesn't have a function yet
                                        // You don't need to use "break" on default case
                                        // Remember to place the default on very bottom
                                    }
                                })
                                    .catch((e) => {
                                    console.error(e, e.stack);
                                });
                                // Do something when button 2 is pressed
                                break;
                        }
                    })
                        .catch((e) => {
                        console.error(e, e.stack);
                    });
                    // Do something when button 2 is pressed
                    break;
                case 2:
                    let form5 = new ActionFormData();
                    form5.title("Inventory Transfer");
                    form5.body("Choose menu to open. ");
                    form5.button("Player & Player", "textures/ui/switch_accounts");
                    form5.button("Block & Player", "textures/items/stick");
                    form5
                        .show(players[players.findIndex((x) => x == sourceEntity)])
                        .then((s) => {
                        // This will stop the code when the player closes the form
                        if (s.canceled)
                            return;
                        let response = s.selection;
                        switch (response) {
                            case 0:
                                let form2 = new ModalFormData();
                                let targetList = [players[0].nameTag];
                                for (const index in players) {
                                    if (Number(index) != 0) {
                                        targetList = String([String(targetList), players[index].nameTag]).split(",");
                                    }
                                }
                                form2.dropdown("Transfer Type", ["Swap", "Transfer", "Move"], { defaultValueIndex: 0 });
                                form2.dropdown("From Player", String(targetList).split(","), { defaultValueIndex: 0 });
                                form2.dropdown("To Player", String(targetList).split(","), { defaultValueIndex: 0 });
                                form2.toggle("Debug2", { defaultValue: false });
                                form2
                                    .show(event.sourceEntity)
                                    .then((t) => {
                                    if (t.canceled)
                                        return;
                                    let [transferType, playerTarget, playerViewer, debug2] = t.formValues;
                                    let playerTargetB = Number(playerTarget);
                                    let playerViewerB = Number(playerViewer);
                                    const fromInventory = players[playerTargetB].getComponent("inventory");
                                    const toInventory = players[playerViewerB].getComponent("inventory");
                                    switch (transferType) {
                                        case 0:
                                            for (let index = 0; index < 36; index++) {
                                                try {
                                                    fromInventory.container.swapItems(Number(index), Number(index), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 1:
                                            for (let index = 0; index < 36; index++) {
                                                try {
                                                    fromInventory.container.transferItem(Number(index), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 2:
                                            for (let index = 0; index < 36; index++) {
                                                try {
                                                    fromInventory.container.moveItem(Number(index), Number(index), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        // You can add cases for each button
                                        default:
                                        // Use this when your button doesn't have a function yet
                                        // You don't need to use "break" on default case
                                        // Remember to place the default on very bottom
                                    }
                                })
                                    .catch((e) => {
                                    console.error(e, e.stack);
                                });
                                // Do something when button 2 is pressed
                                break;
                        }
                    })
                        .catch((e) => {
                        console.error(e, e.stack);
                    });
                    // Do something when button 1 is pressed
                    // Don't forget "break" for every case
                    break;
                    // Do something when button 2 is pressed
                    break;
                case 3:
                    let form4 = new ActionFormData();
                    form4.title("Inventory Transfer");
                    form4.body("Choose menu to open. ");
                    form4.button("Block & Block", "textures/ui/train");
                    form4.button("Player & Player", "textures/ui/switch_accounts");
                    form4.button("Block & Player", "textures/ui/upload_glyph");
                    form4
                        .show(players[players.findIndex((x) => x == sourceEntity)])
                        .then((s) => {
                        // This will stop the code when the player closes the form
                        if (s.canceled)
                            return;
                        let response = s.selection;
                        switch (response) {
                            case 0:
                                let form3 = new ModalFormData(); /*Z
    let targetList = [players[0].nameTag]
    for (const index in players) {
        if (Number(index) != 0) {
        targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }*/
                                form3.dropdown("Transfer Type", ["Swap", "Transfer", "Move"], { defaultValueIndex: 0 });
                                form3.slider("Inventory Row", 0, 4, { valueStep: 1 / 9 });
                                form3.dropdown("Block", ["Position", "Preset 1", "Preset 2", "Preset 3"], { defaultValueIndex: 0 });
                                form3.textField("From Block", "dimension, x, y, z", {
                                    defaultValue: callerPlayer.dimension.id +
                                        ", " +
                                        Math.floor(callerPlayer.location.x) +
                                        ", " +
                                        Math.floor(callerPlayer.location.y) +
                                        ", " +
                                        Math.floor(callerPlayer.location.z),
                                });
                                form3.dropdown("Block", ["Position", "Preset 1", "Preset 2", "Preset 3"], { defaultValueIndex: 0 });
                                form3.textField("To Player", "dimension, x, y, z", {
                                    defaultValue: callerPlayer.dimension.id +
                                        ", " +
                                        Math.floor(callerPlayer.location.x) +
                                        ", " +
                                        Math.floor(callerPlayer.location.y) +
                                        ", " +
                                        Math.floor(callerPlayer.location.z),
                                });
                                form3.toggle("Debug2", { defaultValue: false });
                                form3
                                    .show(event.sourceEntity)
                                    .then((t) => {
                                    if (t.canceled)
                                        return;
                                    let [transferType, inventoryRow, fromBlockSelectionMode, fromBlockPosition, toBlockSelectionMode, toBlockPosition, debug2,] = t.formValues;
                                    let fromBlockPositionB = world.getDimension(String(fromBlockPosition).split(", ")[0]).getBlock({
                                        x: Number(String(fromBlockPosition).split(", ")[1]),
                                        y: Number(String(fromBlockPosition).split(", ")[2]),
                                        z: Number(String(fromBlockPosition).split(", ")[3]),
                                    });
                                    let toBlockPositionB = world.getDimension(String(toBlockPosition).split(", ")[0]).getBlock({
                                        x: Number(String(toBlockPosition).split(", ")[1]),
                                        y: Number(String(toBlockPosition).split(", ")[2]),
                                        z: Number(String(toBlockPosition).split(", ")[3]),
                                    });
                                    let fromBlockPositionC = fromBlockPositionB.getComponent("inventory");
                                    let toBlockPositionC = toBlockPositionB.getComponent("inventory");
                                    if (Number(fromBlockSelectionMode) > 0) {
                                        let fromPresetValues = undefined;
                                        try {
                                            fromPresetValues = callerPlayer.getDynamicProperty("blockTransferPreset" + String(Number(fromBlockSelectionMode) - 1));
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                        try {
                                            fromBlockPositionC = world
                                                .getDimension(String(fromPresetValues).split(", ")[0])
                                                .getBlock({
                                                x: Number(String(fromPresetValues).split(", ")[1]),
                                                y: Number(String(fromPresetValues).split(", ")[2]),
                                                z: Number(String(fromPresetValues).split(", ")[3]),
                                            })
                                                .getComponent("inventory");
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                    }
                                    if (Number(toBlockSelectionMode) > 0) {
                                        let toPresetValues = undefined;
                                        try {
                                            toPresetValues = callerPlayer.getDynamicProperty("blockTransferPreset" + String(Number(toBlockSelectionMode) - 1));
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                        try {
                                            toBlockPositionC = world
                                                .getDimension(String(toPresetValues).split(", ")[0])
                                                .getBlock({
                                                x: Number(String(toPresetValues).split(", ")[1]),
                                                y: Number(String(toPresetValues).split(", ")[2]),
                                                z: Number(String(toPresetValues).split(", ")[3]),
                                            })
                                                .getComponent("inventory");
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                    }
                                    switch (transferType) {
                                        case 0:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromBlockPositionC.container.swapItems(Number(index + Number(inventoryRow) * 9), Number(index + Number(inventoryRow) * 9), toBlockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 1:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromBlockPositionC.container.transferItem(Number(index + Number(inventoryRow) * 9), toBlockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 2:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromBlockPositionC.container.moveItem(Number(index + Number(inventoryRow) * 9), Number(index + Number(inventoryRow) * 9), toBlockPositionC.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        // You can add cases for each button
                                        default:
                                        // Use this when your button doesn't have a function yet
                                        // You don't need to use "break" on default case
                                        // Remember to place the default on very bottom
                                    }
                                })
                                    .catch((e) => {
                                    console.error(e, e.stack);
                                });
                                // Do something when button 2 is pressed
                                break;
                            case 1:
                                let form2 = new ModalFormData();
                                let targetList = [players[0].nameTag];
                                for (const index in players) {
                                    if (Number(index) != 0) {
                                        targetList = String([String(targetList), players[index].nameTag]).split(",");
                                    }
                                }
                                form2.dropdown("Transfer Type", ["Swap", "Transfer", "Move"], { defaultValueIndex: 0 });
                                form2.slider("Inventory Row", 0, 4, { valueStep: 1 / 9 });
                                form2.dropdown("From Player", String(targetList).split(","), { defaultValueIndex: 0 });
                                form2.dropdown("To Player", String(targetList).split(","), { defaultValueIndex: 0 });
                                form2.toggle("Debug2", { defaultValue: false });
                                form2
                                    .show(event.sourceEntity)
                                    .then((t) => {
                                    if (t.canceled)
                                        return;
                                    let [transferType, inventoryRow, playerTarget, playerViewer, debug2] = t.formValues;
                                    let playerTargetB = Number(playerTarget);
                                    let playerViewerB = Number(playerViewer);
                                    const fromInventory = players[playerTargetB].getComponent("inventory");
                                    const toInventory = players[playerViewerB].getComponent("inventory");
                                    switch (transferType) {
                                        case 0:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromInventory.container.swapItems(Number(index + Number(inventoryRow) * 9), Number(index + Number(inventoryRow) * 9), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 1:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromInventory.container.transferItem(Number(index + Number(inventoryRow) * 9), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        case 2:
                                            for (let index = 0; index < 9; index++) {
                                                try {
                                                    fromInventory.container.moveItem(Number(index + Number(inventoryRow) * 9), Number(index + Number(inventoryRow) * 9), toInventory.container);
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            // Do something when button 2 is pressed
                                            break;
                                        // You can add cases for each button
                                        default:
                                        // Use this when your button doesn't have a function yet
                                        // You don't need to use "break" on default case
                                        // Remember to place the default on very bottom
                                    }
                                })
                                    .catch((e) => {
                                    console.error(e, e.stack);
                                });
                                // Do something when button 2 is pressed
                                break;
                        }
                    })
                        .catch((e) => {
                        console.error(e, e.stack);
                    });
                    // Do something when button 1 is pressed
                    // Don't forget "break" for every case
                    break;
                    // Do something when button 2 is pressed
                    break;
                case 4:
                    let form6 = new ModalFormData();
                    form6.title("Inventory Transfer");
                    form6.dropdown("Preset Name", ["Preset 1", "Preset 2", "Preset 3", "Preset 4", "Preset 5", "Preset 6"], { defaultValueIndex: 0 });
                    form6.textField("From Block", "dimension, x, y, z", {
                        defaultValue: callerPlayer.dimension.id +
                            ", " +
                            Math.floor(callerPlayer.location.x) +
                            ", " +
                            Math.floor(callerPlayer.location.y) +
                            ", " +
                            Math.floor(callerPlayer.location.z),
                    });
                    form6.toggle("Debug2", { defaultValue: false });
                    form6
                        .show(players[players.findIndex((x) => x == sourceEntity)])
                        .then((s) => {
                        // This will stop the code when the player closes the form
                        if (s.canceled)
                            return;
                        let [presetName, debug2] = s.formValues;
                        let form3 = new ModalFormData();
                        let presetValues = undefined;
                        try {
                            presetValues = callerPlayer.getDynamicProperty("blockTransferPreset" + String(Number(presetName)));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        if (presetValues == undefined) {
                            form3.textField("Block Location", "dimension, x, y, z", {
                                defaultValue: callerPlayer.dimension.id +
                                    ", " +
                                    Math.floor(callerPlayer.location.x) +
                                    ", " +
                                    Math.floor(callerPlayer.location.y) +
                                    ", " +
                                    Math.floor(callerPlayer.location.z),
                            });
                        }
                        else {
                            form3.textField("Block Location", "dimension, x, y, z", { defaultValue: presetValues });
                        }
                        form3.toggle("Debug2", { defaultValue: false });
                        form3
                            .show(event.sourceEntity)
                            .then((t) => {
                            if (t.canceled)
                                return;
                            let [newBlockPresetValues, debug2] = t.formValues;
                            callerPlayer.setDynamicProperty("blockTransferPreset" + String(Number(presetName)), String(newBlockPresetValues));
                        })
                            .catch((e) => {
                            console.error(e, e.stack);
                        });
                    })
                        .catch((e) => {
                        console.error(e, e.stack);
                    });
                    // Do something when button 1 is pressed
                    // Don't forget "break" for every case
                    break;
                // You can add cases for each button
                default:
                // Use this when your button doesn't have a function yet
                // You don't need to use "break" on default case
                // Remember to place the default on very bottom
            }
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:inventoryTransferB") {
        let form2 = new ModalFormData();
        let players = world.getAllPlayers();
        let targetList = [players[0].nameTag];
        for (const index in players) {
            if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
            }
        }
        form2.textField("Slot Number", "Slot Number", { defaultValue: "0" });
        form2.dropdown("Player Target", String(targetList).split(","), { defaultValueIndex: 0 });
        form2.dropdown("Player Viewer", String(targetList).split(","), { defaultValueIndex: 0 });
        form2.toggle("Debug2", { defaultValue: false });
        form2
            .show(event.sourceEntity)
            .then((t) => {
            if (t.canceled)
                return;
            let [slotNumber, playerTarget, playerViewer, debug2] = t.formValues;
            let playerTargetB = Number(playerTarget);
            let playerViewerB = Number(playerViewer);
            const inventory = players[playerTargetB].getComponent("inventory");
            let item = inventory.container.getItem(Number(slotNumber));
            function getDurability() {
                try {
                    return item.getComponent("minecraft:durability");
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    return undefined;
                }
            }
            const durability = getDurability();
            function itemNameTextCalculator() {
                try {
                    if (item.nameTag == undefined) {
                        return undefined;
                    }
                    else {
                        if (item.nameTag != undefined) {
                            return item.nameTag;
                        }
                    }
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    return undefined;
                }
            }
            let itemNameTextField = itemNameTextCalculator(); /*
console.warn(itemNameTextCalculator());*/
            function itemLoreTextCalculator() {
                try {
                    if (item.getLore() == undefined) {
                        return undefined;
                    }
                    else {
                        if (item.getLore() != undefined) {
                            return Array(item.getLore().toString()).join("");
                        }
                    }
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                    return undefined;
                }
            }
            let itemLoreTextField = itemLoreTextCalculator();
            let currentValueItemAmount = 0;
            try {
                currentValueItemAmount = item.amount;
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                } /* return 0*/
            }
            let currentValueItemType = undefined;
            try {
                currentValueItemType = item.typeId;
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                } /* return 0*/
            }
            let itemKeepOnDeath = false;
            try {
                itemKeepOnDeath = item.keepOnDeath;
            }
            catch (e) {
                if (Boolean(debug2) == true) {
                    console.error(e, e.stack);
                } /* return false*/
            }
            let form = new ModalFormData(); /*
console.warn(item.nameTag);*/ /*
                        console.warn(Array(item.getLore().toString()).join(""));*/
            form.title("Item Modifier / Lore");
            form.textField("Item Type: " +
                currentValueItemType +
                "\nItem Name\nTo type multiple lines just put \\\\newline in between each line. \nTo clear item name just leave field blank. ", "Item Name", { defaultValue: itemNameTextField /*(String(item.nameTag))*/ });
            form.textField("Item Lore\nTo type multiple lines just put \\\\newline in between each line. ", "Item Lore", {
                defaultValue: itemLoreTextField,
            });
            form.textField("Can Destroy", "Can Destroy", { defaultValue: "" /*(String(item.getCanDestroy()))*/ });
            form.textField("Can Place On", "Can Place On", { defaultValue: "" /*(String(item.getCanPlaceOn()))*/ });
            form.textField("§cTrigger Event (Removed in 1.20.70.71)", "§cTrigger Event (Removed in 1.20.70.71)", { defaultValue: "" });
            form.slider("Count", 0, 255, { valueStep: 1, defaultValue: currentValueItemAmount });
            form.toggle("keepOnDeath", { defaultValue: itemKeepOnDeath });
            function getItemLockMode(mode, input) {
                try {
                    if (mode == 1) {
                        try {
                            if (item.lockMode == "inventory") {
                                return 0;
                            }
                            else {
                                if (item.lockMode == "none") {
                                    return 1;
                                }
                                else {
                                    if (item.lockMode == "slot") {
                                        return 2;
                                    }
                                }
                            }
                        }
                        catch (e) {
                            if (Boolean(debug2) == true) {
                                console.error(e, e.stack);
                            }
                            return 1;
                        }
                    }
                    else {
                        if (mode == 0) {
                            if (input == 0) {
                                return ItemLockMode.inventory;
                            }
                            else {
                                if (input == 1) {
                                    return ItemLockMode.none;
                                }
                                else {
                                    if (input == 2) {
                                        return ItemLockMode.slot;
                                    }
                                }
                            }
                        }
                    }
                }
                catch (e) {
                    console.error(e, e.stack);
                    return undefined;
                }
            }
            let itemLockModeIndex = Number(getItemLockMode(1));
            form.dropdown("lockMode", ["inventory", "none", "slot"], { defaultValueIndex: Number(itemLockModeIndex) });
            form.toggle("setLore", { defaultValue: false });
            form.toggle("clearLore", { defaultValue: false });
            form.toggle("New Item", { defaultValue: false });
            form.textField("Item Type", "Item Type", { defaultValue: "" });
            form.textField("Item Count", "Item Count", { defaultValue: "1" }); /*
form.textField("Item Data", "Trigger Event", {defaultValue: ""});*/
            form.toggle("Move Item", { defaultValue: false });
            form.textField("From Slot", "From Slot", { defaultValue: "0" });
            form.textField("To Slot", "To Slot", { defaultValue: "1" });
            form.dropdown("From Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
                defaultValueIndex: 0,
            });
            form.dropdown("From Contriner Player", String(targetList).split(","), { defaultValueIndex: 0 });
            form.textField("From Container Block", "overworld, 500, 60, 500", {
                defaultValue: players[playerTargetB].dimension.id +
                    ", " +
                    players[playerTargetB].location.x +
                    ", " +
                    players[playerTargetB].location.y +
                    ", " +
                    players[playerTargetB].location.z,
            });
            form.dropdown("To Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
                defaultValueIndex: 0,
            });
            form.dropdown("To Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
            form.textField("To Container Block", "overworld, 500, 60, 500", {
                defaultValue: players[playerTargetB].dimension.id +
                    ", " +
                    players[playerTargetB].location.x +
                    ", " +
                    players[playerTargetB].location.y +
                    ", " +
                    players[playerTargetB].location.z,
            });
            form.toggle("Swap Items", { defaultValue: false });
            form.textField("Slot", "Slot", { defaultValue: "0" });
            form.textField("Other Slot", "Other Slot", { defaultValue: "1" });
            form.dropdown("Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
                defaultValueIndex: 0,
            });
            form.dropdown("Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
            form.textField("Container Block", "overworld, 500, 60, 500", {
                defaultValue: players[playerTargetB].dimension.id +
                    ", " +
                    players[playerTargetB].location.x +
                    ", " +
                    players[playerTargetB].location.y +
                    ", " +
                    players[playerTargetB].location.z,
            });
            form.dropdown("Other Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], { defaultValueIndex: 0 });
            form.dropdown("Other Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
            form.textField("Other Container Block", "overworld, 500, 60, 500", {
                defaultValue: players[playerTargetB].dimension.id +
                    ", " +
                    players[playerTargetB].location.x +
                    ", " +
                    players[playerTargetB].location.y +
                    ", " +
                    players[playerTargetB].location.z,
            });
            form.toggle("Transfer Item", { defaultValue: false });
            form.textField("From Slot", "From Slot", { defaultValue: "0" });
            form.dropdown("From Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
                defaultValueIndex: 0,
            });
            form.dropdown("From Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
            form.textField("From Container Block", "overworld, 500, 60, 500", {
                defaultValue: players[playerTargetB].dimension.id +
                    ", " +
                    players[playerTargetB].location.x +
                    ", " +
                    players[playerTargetB].location.y +
                    ", " +
                    players[playerTargetB].location.z,
            });
            form.dropdown("To Container Type", ["Player", "§4Facing Entity", "§4Entity At Block Location", "§4Facing Block", "Block At Block Location"], {
                defaultValueIndex: 0,
            });
            form.dropdown("To Container Player", String(targetList).split(","), { defaultValueIndex: 0 });
            form.textField("To Container Block", "overworld, 500, 60, 500", {
                defaultValue: players[playerTargetB].dimension.id +
                    ", " +
                    players[playerTargetB].location.x +
                    ", " +
                    players[playerTargetB].location.y +
                    ", " +
                    players[playerTargetB].location.z,
            });
            form.toggle("Debug", { defaultValue: false });
            form.show(players[playerViewerB])
                .then((r) => {
                // This will stop the code when the player closes the form
                if (r.canceled)
                    return;
                // This will assign every input their own variable
                let [itemName, itemLore, canDestroy, canPlaceOn, triggerEvent, amount, keepOnDeath, lockMode, setLore, clearLore, newItem, newItemType, newItemCount /*, newItemData*/, moveItem, moveFromSlot, moveToSlot, moveFromContainerType, moveFromContainer, moveFromContainerBlock, moveToContainerType, moveToContainer, moveToContainerBlock, swapItems, swapSlot, swapOtherSlot, swapContainerType, swapContainer, swapContainerBlock, swapOtherContainerType, swapOtherContainer, swapOtherContainerBlock, transferItem, transferFromSlot, transferFromContainerType, transferFromContainer, transferFromContainerBlock, transferToContainerType, transferToContainer, transferToContainerBlock, debug,] = r.formValues; /*
console.warn(r.formValues);*/
                let item = inventory.container.getItem(Number(slotNumber));
                let transferFromContainerBlockB = world.getDimension(String(transferFromContainerBlock).split(", ")[0]).getBlock({
                    x: Number(String(transferFromContainerBlock).split(", ")[1]),
                    y: Number(String(transferFromContainerBlock).split(", ")[2]),
                    z: Number(String(transferFromContainerBlock).split(", ")[3]),
                });
                let transferToContainerBlockB = world.getDimension(String(transferToContainerBlock).split(", ")[0]).getBlock({
                    x: Number(String(transferToContainerBlock).split(", ")[1]),
                    y: Number(String(transferToContainerBlock).split(", ")[2]),
                    z: Number(String(transferToContainerBlock).split(", ")[3]),
                });
                let moveFromContainerBlockB = world.getDimension(String(moveFromContainerBlock).split(", ")[0]).getBlock({
                    x: Number(String(moveFromContainerBlock).split(", ")[1]),
                    y: Number(String(moveFromContainerBlock).split(", ")[2]),
                    z: Number(String(moveFromContainerBlock).split(", ")[3]),
                });
                let moveToContainerBlockB = world.getDimension(String(moveToContainerBlock).split(", ")[0]).getBlock({
                    x: Number(String(moveToContainerBlock).split(", ")[1]),
                    y: Number(String(moveToContainerBlock).split(", ")[2]),
                    z: Number(String(moveToContainerBlock).split(", ")[3]),
                });
                let swapContainerBlockB = world.getDimension(String(swapContainerBlock).split(", ")[0]).getBlock({
                    x: Number(String(swapContainerBlock).split(", ")[1]),
                    y: Number(String(swapContainerBlock).split(", ")[2]),
                    z: Number(String(swapContainerBlock).split(", ")[3]),
                });
                let swapOtherContainerBlockB = world.getDimension(String(swapOtherContainerBlock).split(", ")[0]).getBlock({
                    x: Number(String(swapOtherContainerBlock).split(", ")[1]),
                    y: Number(String(swapOtherContainerBlock).split(", ")[2]),
                    z: Number(String(swapOtherContainerBlock).split(", ")[3]),
                });
                let durability2 = getDurability(); /*
for (const index in inventory.) {
if (Number(index) != 0) {
targetList = String([String(targetList), players[index].nameTag]).split(",");
}
}*/
                let newItemNameTag = String(itemName).split("\\\\newline");
                try {
                    item.nameTag = newItemNameTag.join("\n");
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setLore) == true) {
                    try {
                        item.setLore(String(itemLore).split("\\\\newline"));
                    }
                    catch (e) {
                        if (Boolean(debug2) == true) {
                            console.error(e, e.stack);
                        }
                    }
                }
                if (Boolean(clearLore) == true) {
                    try {
                        item.setLore();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                try {
                    item.lockMode = String(getItemLockMode(0, Number(lockMode)));
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                }
                try {
                    item.keepOnDeath = Boolean(keepOnDeath);
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                }
                try {
                    item.amount = Number(amount);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                try {
                    item.setCanDestroy(String(canDestroy).split(", "));
                }
                catch (e) {
                    console.error(e, e.stack);
                } /*String[String(canDestroy)]*/
                try {
                    item.setCanPlaceOn(String(canPlaceOn).split(", "));
                }
                catch (e) {
                    console.error(e, e.stack);
                } /*
try{item.triggerEvent(String(triggerEvent));} catch(e){console.error(e, e.stack);}*/ //removed in 1.20.70.21
                try {
                    durability2.damage = Number(10);
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(newItem) == true) {
                    try {
                        item = new ItemStack(String(newItemType), Number(newItemCount));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                try {
                    inventory.container.setItem(Number(slotNumber), item);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
                try {
                    durability2.damage = Number(10);
                }
                catch (e) {
                    if (Boolean(debug2) == true) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(moveItem) == true) {
                    /*
        let moveFromSlotB: any
        moveFromSlotB = undefined*/
                    let moveFromContainerB;
                    moveFromContainerB = players[Number(moveFromContainer)].getComponent("inventory");
                    switch (moveFromContainerType) {
                        case 4:
                            moveFromContainerB = moveFromContainerBlockB.getComponent("inventory");
                            break;
                    }
                    let moveToContainerB;
                    moveToContainerB = players[Number(moveToContainer)].getComponent("inventory");
                    switch (moveToContainerType) {
                        case 4:
                            moveToContainerB = moveToContainerBlockB.getComponent("inventory");
                            break;
                    }
                    try {
                        moveFromContainerB.container.moveItem(Number(moveFromSlot), Number(moveToSlot), moveToContainerB.container);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(swapItems) == true) {
                    /*
        let moveFromSlotB: any
        moveFromSlotB = undefined*/
                    let swapContainerB;
                    swapContainerB = players[Number(swapContainer)].getComponent("inventory");
                    switch (swapContainerType) {
                        case 4:
                            swapContainerB = swapContainerBlockB.getComponent("inventory");
                            break;
                    }
                    let swapOtherContainerB;
                    swapOtherContainerB = players[Number(swapOtherContainer)].getComponent("inventory");
                    switch (swapOtherContainerType) {
                        case 4:
                            swapOtherContainerB = swapOtherContainerBlockB.getComponent("inventory");
                            break;
                    }
                    try {
                        swapContainerB.container.swapItems(Number(swapSlot), Number(swapOtherSlot), swapOtherContainerB.container);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(transferItem) == true) {
                    /*
        let moveFromSlotB: any
        moveFromSlotB = undefined*/
                    let transferFromContainerB;
                    transferFromContainerB = players[Number(transferFromContainer)].getComponent("inventory");
                    switch (transferFromContainerType) {
                        case 4:
                            transferFromContainerB = transferFromContainerBlockB.getComponent("inventory");
                            break;
                    }
                    let transferToContainerB;
                    transferToContainerB = players[Number(transferToContainer)].getComponent("inventory");
                    switch (transferToContainerType) {
                        case 4:
                            transferToContainerB = transferToContainerBlockB.getComponent("inventory");
                            break;
                    }
                    try {
                        transferFromContainerB.container.transferItem(Number(transferFromSlot), transferToContainerB.container);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(debug) == true) {
                    console.warn("Form Values", r.formValues);
                    console.warn(["Item Components: ", item.getComponents()]);
                    console.warn(item.getTags());
                    console.warn(players);
                    console.warn(players[0]);
                    console.warn(players[1]); /*
try {console.warn(item.getCanDestroy());} catch(e){
    console.error(e, e.stack)};
try {console.warn(item.getCanPlaceOn());} catch(e){
    console.error(e, e.stack)};*/
                    console.warn(item.isStackable);
                    console.warn(item.maxAmount);
                    console.warn(item.type);
                    console.warn(item.typeId);
                    console.warn(item.nameTag);
                    console.warn(item.getLore());
                    try {
                        console.warn(["Damage: ", durability.damage]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    try {
                        console.warn(["Damage Chance: ", durability.getDamageChance()]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    try {
                        console.warn(["Damage Range: ", durability.getDamageChanceRange()]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    try {
                        console.warn(["Max Durability: ", durability.maxDurability]);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                    let componentList = [item.getComponents()[0].typeId];
                    for (const index in players) {
                        if (Number(index) != 0) {
                            componentList = String([String(componentList), item.getComponents()[index].typeId]).split(",");
                        }
                    }
                    console.warn(String(["Item Components: " + String(componentList)]));
                }
                // Do something
            })
                .catch((e) => {
                console.error(e, e.stack);
            });
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:playerController") {
        let form2 = new ModalFormData();
        let playerList = world.getPlayers();
        let targetList = [playerList[0].nameTag];
        let componentList = [playerList[0].getComponents()[0]];
        let dimension = "";
        let spawnXPosition = "";
        let spawnYPosition = "";
        let spawnZPosition = "";
        for (const index in playerList) {
            /*
            console.warn(index);*/
            if (Number(index) != 0) {
                targetList = String([String(targetList), playerList[index].nameTag]).split(","); /*
            targetList = String([String(targetList), playerList[index].nameTag]).split(",");*/
            } /*
            console.warn(targetList);*/
        } /*
        console.warn(targetList);
        console.warn(String(targetList).split(","));
        console.warn(String(targetList));
        console.warn([String(targetList)]);*/
        function playerControllerFormPopup(playerTargetB, playerViewerB) {
            let form = new ModalFormData();
            try {
                dimension = String(playerList[playerTargetB].getSpawnPoint().dimension.id);
            }
            catch (e) {
                dimension = "";
            }
            try {
                spawnXPosition = String(playerList[playerTargetB].getSpawnPoint().x);
            }
            catch (e) {
                spawnXPosition = "";
            }
            try {
                spawnYPosition = String(playerList[playerTargetB].getSpawnPoint().y);
            }
            catch (e) {
                spawnYPosition = "";
            }
            try {
                spawnZPosition = String(playerList[playerTargetB].getSpawnPoint().z);
            }
            catch (e) {
                spawnZPosition = "";
            }
            let playerCurrentNameTag = "";
            try {
                playerCurrentNameTag = String(playerList[playerTargetB].nameTag);
            }
            catch (e) {
                playerCurrentNameTag = "";
            }
            form.title("Player Controller");
            form.toggle("Change Name Tag", { defaultValue: false });
            form.toggle("Multiline Name Tag", { defaultValue: false });
            form.textField("Name Tag", "Name Tag", { defaultValue: playerCurrentNameTag });
            form.textField("Trigger Event", "Trigger Event");
            form.textField("addExperience", "Experience Amount");
            form.textField("addLevels", "Level Amount");
            form.slider("Selected Slot", 0, 56, { valueStep: 1, defaultValue: playerList[playerTargetB].selectedSlotIndex });
            form.slider("§4Scale", 0, 10, { valueStep: 0.5 });
            form.toggle("Is Sneaking", { defaultValue: playerList[playerTargetB].isSneaking });
            form.toggle("Clear Velocity", { defaultValue: false });
            form.toggle("Extinguish Fire", { defaultValue: false });
            form.toggle("Kill", { defaultValue: false });
            form.toggle("§4Remove (Unavailable Until Future Minecraft Update)", { defaultValue: false });
            form.toggle("Set On Fire", { defaultValue: false });
            form.textField("Set On Fire - Seconds", "Time To Set On Fire For");
            form.toggle("Set On Fire - Use Effects", { defaultValue: false });
            form.toggle("Add Effect", { defaultValue: false });
            form.textField("Effect To Add", "Effect To Add");
            form.textField("Ticks Of Effect", "Ticks Of Effect");
            form.textField("Effect Amplifier", "Effect Amplifier");
            form.toggle("Show Particles Of Effect", { defaultValue: true });
            form.toggle("Add tag", { defaultValue: false });
            form.textField("Tag To Add", "Tag To Add");
            form.toggle("Remove Effect", { defaultValue: false });
            form.textField("Effect To Remove", "Effect To Remove");
            form.toggle("Remove tag", { defaultValue: false });
            form.textField("Tag To Remove", "Tag To Remove"); /*
            form2.dropdown("damageType", ["entity", "projectile"], 0)
            form2.dropdown("damageCause", ["anvil", "none"], 0)*/
            form.toggle("§eapplyImpulse", { defaultValue: false });
            form.textField("§eX Velocity", "§eX Velocity" /*, String(playerList[playerTargetB].getVelocity().x)*/);
            form.textField("§eY Velocity", "§eY Velocity" /*, String(playerList[playerTargetB].getVelocity().y)*/);
            form.textField("§eZ Velocity", "§eZ Velocity" /*, String(playerList[playerTargetB].getVelocity().z)*/);
            form.toggle("applyKnockback", { defaultValue: false });
            form.textField("directionX", "directionX");
            form.textField("directionZ", "directionZ");
            form.textField("horizontalStrength", "horizontalStrength");
            form.textField("verticalStrength", "verticalStrength");
            form.toggle("Set Rotation", { defaultValue: false });
            form.textField("X Rotation", "X Rotation", { defaultValue: String(playerList[playerTargetB].getRotation().x) });
            form.textField("Y Rotation", "Y Rotation", { defaultValue: String(playerList[playerTargetB].getRotation().y) });
            form.toggle("Teleport", { defaultValue: false });
            form.textField("Teleport Dimension", "Dimension", { defaultValue: playerList[playerTargetB].dimension.id });
            form.textField("Teleport X Coordinate", "X Coordinate", { defaultValue: String(playerList[playerTargetB].location.x) });
            form.textField("Teleport Y Coordinate", "Y Coordinate", { defaultValue: String(playerList[playerTargetB].location.y) });
            form.textField("Teleport Z Coordinate", "Z Coordinate", { defaultValue: String(playerList[playerTargetB].location.z) });
            form.textField("Teleport X Rotation", "X Rotation", { defaultValue: String(playerList[playerTargetB].getRotation().x) });
            form.textField("Teleport Y Rotation", "Y Rotation", { defaultValue: String(playerList[playerTargetB].getRotation().y) });
            form.dropdown("§eTeleport Rotation Type Mode", ["Rotation", "§4Facing"], { defaultValueIndex: 0 });
            form.toggle("Teleport - checkForBlocks", { defaultValue: false });
            form.toggle("Teleport - keepVelocity", { defaultValue: false });
            form.toggle("Try Teleport", { defaultValue: false });
            form.textField("Try Teleport Dimension", "§4Dimension", { defaultValue: playerList[playerTargetB].dimension.id });
            form.textField("Try Teleport X Coordinate", "§4X Coordinate", { defaultValue: String(playerList[playerTargetB].location.x) });
            form.textField("Try Teleport Y Coordinate", "§4Y Coordinate", { defaultValue: String(playerList[playerTargetB].location.y) });
            form.textField("Try Teleport Z Coordinate", "§4Z Coordinate", { defaultValue: String(playerList[playerTargetB].location.z) });
            form.toggle("Try Teleport - checkForBlocks", { defaultValue: false });
            form.toggle("Try Teleport - keepVelocity", { defaultValue: false });
            form.toggle("Set Operator", { defaultValue: playerList[playerTargetB].isOp() });
            form.toggle("Set Spawn Point", { defaultValue: false });
            form.textField("Spawn Dimension", "Spawn Dimension", { defaultValue: dimension });
            form.textField("Spawn X Coordinate", "Spawn X Coordinate", { defaultValue: spawnXPosition });
            form.textField("Spawn Y Coordinate", "Spawn Y Coordinate", { defaultValue: spawnYPosition });
            form.textField("Spawn Z Coordinate", "Spawn Z Coordinate", { defaultValue: spawnZPosition });
            form.toggle("Start Item Cooldown", { defaultValue: false });
            form.textField("Item Category", "Item Category");
            form.textField("Tick Duration", "Tick Duration");
            form.toggle("Send Message", { defaultValue: false });
            form.textField("Message To Send", "Message To Send");
            form.toggle("§4Open The Item Modification Form Afterwards", { defaultValue: false });
            form.toggle("resetLevel", { defaultValue: false });
            form.toggle("§4Debug", { defaultValue: false });
            form.show(playerList[playerViewerB])
                .then((r) => {
                if (r.canceled)
                    return;
                let [changeNameTag, multilineNameTag, nameTag, triggerEvent, addExperience, addLevels, selectedSlotIndex, scaleValue, isSneaking, clearVelocity, extinguishFire, kill, remove, setOnFire, setOnFireSeconds, setOnFireRemoveEffects, addEffect, effectToAdd, secondsOfEffect, effectAmplifier, effectShowEffectParticles, addTag, tagToAdd, removeEffect, effectToRemove, removeTag, tagToRemove, applyImpulse, velocityX, velocityY, velocityZ, applyKnockback, kockbackDirectionX, knockbackDirectionZ, knockbackHorizontalStrength, knockbackVerticalStrength, setRot, rotX, rotY, teleport, teleportDimension, teleportX, teleportY, teleportZ, teleportRotX, teleportRotY, teleportRotationType, teleportCheckForBlocks, teleportKeepVelocity, tryTeleport, tryTeleportDimension, tryTeleportX, tryTeleportY, tryTeleportZ, tryTeleportCheckForBlocks, tryTeleportKeepVelocity, setOp, setSpawnPoint, spawnDimension, spawnX, spawnY, spawnZ, setItemCooldown, itemCategory, tickDuration, sendMessage, messageToSend, openTheItemModificationFormAfterwards, resetLevel, debug,] = r.formValues;
                let newNameTag = String(nameTag);
                if (Boolean(multilineNameTag) == true) {
                    newNameTag = String(nameTag).split("\\\\newline").join("\n");
                }
                /*
            let scale = playerList[0].getComponent("scale") as EntityScaleComponent;
            scale.value = Number(scaleValue);*/ /**/
                if (Boolean(changeNameTag) == true) {
                    try {
                        playerList[playerTargetB].setOp(Boolean(setOp));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                } /**/
                if (Boolean(changeNameTag) == true) {
                    try {
                        playerList[playerTargetB].nameTag = String(newNameTag);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                playerList[playerTargetB].isSneaking = Boolean(isSneaking);
                playerList[playerTargetB].selectedSlotIndex = Number(selectedSlotIndex);
                if (Boolean(addEffect) == true) {
                    try {
                        playerList[playerTargetB].addEffect(String(effectToAdd), Number(secondsOfEffect), {
                            amplifier: Number(effectAmplifier),
                            showParticles: Boolean(effectShowEffectParticles),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(applyImpulse) == true) {
                    try {
                        playerList[playerTargetB].applyImpulse({
                            x: Number(velocityX),
                            y: Number(velocityY),
                            z: Number(velocityZ),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(applyKnockback) == true) {
                    try {
                        playerList[playerTargetB].applyKnockback({
                            x: Number(kockbackDirectionX) * Number(knockbackHorizontalStrength),
                            z: Number(knockbackDirectionZ) * Number(knockbackHorizontalStrength),
                        }, Number(knockbackVerticalStrength));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(addTag) == true) {
                    try {
                        playerList[playerTargetB].addTag(String(tagToAdd));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(removeTag) == true) {
                    try {
                        playerList[playerTargetB].removeTag(String(tagToRemove));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(removeEffect) == true) {
                    try {
                        playerList[playerTargetB].removeEffect(String(effectToRemove));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setSpawnPoint) == true) {
                    try {
                        playerList[playerTargetB].setSpawnPoint({
                            dimension: world.getDimension(String(spawnDimension)),
                            x: Number(spawnX),
                            y: Number(spawnY),
                            z: Number(spawnZ),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(teleport) == true) {
                    try {
                        playerList[playerTargetB].teleport({
                            x: Number(teleportX),
                            y: Number(teleportY),
                            z: Number(teleportZ),
                        }, {
                            checkForBlocks: Boolean(teleportCheckForBlocks),
                            dimension: world.getDimension(String(teleportDimension)),
                            keepVelocity: Boolean(teleportKeepVelocity),
                            rotation: {
                                x: Number(teleportRotX),
                                y: Number(teleportRotY),
                            },
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(tryTeleport) == true) {
                    try {
                        playerList[playerTargetB].tryTeleport({
                            x: Number(tryTeleportX),
                            y: Number(tryTeleportY),
                            z: Number(tryTeleportZ),
                        }, {
                            checkForBlocks: Boolean(tryTeleportCheckForBlocks),
                            dimension: world.getDimension(String(tryTeleportDimension)),
                            keepVelocity: Boolean(tryTeleportKeepVelocity),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setOnFire) == true) {
                    try {
                        playerList[playerTargetB].setOnFire(Number(setOnFireSeconds), Boolean(setOnFireRemoveEffects));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setRot) == true) {
                    try {
                        playerList[playerTargetB].setRotation({
                            x: Number(rotX),
                            y: Number(rotY),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(resetLevel) == true) {
                    try {
                        playerList[playerTargetB].resetLevel();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(kill) == true) {
                    try {
                        playerList[playerTargetB].kill();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(remove) == true) {
                    try {
                        playerList[playerTargetB].remove();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(clearVelocity) == true) {
                    try {
                        playerList[playerTargetB].clearVelocity();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(extinguishFire) == true) {
                    try {
                        playerList[playerTargetB].extinguishFire();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (triggerEvent !== undefined) {
                    try {
                        playerList[playerTargetB].triggerEvent(String(triggerEvent));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (addExperience !== undefined) {
                    try {
                        playerList[playerTargetB].addExperience(Number(addExperience));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (setItemCooldown !== undefined) {
                    try {
                        playerList[playerTargetB].startItemCooldown(String(itemCategory), Number(tickDuration));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (addLevels !== undefined) {
                    try {
                        playerList[playerTargetB].addExperience(Number(addLevels));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(sendMessage) == true) {
                    try {
                        playerList[playerTargetB].sendMessage(String(messageToSend));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(isSneaking) == true) {
                    playerList[playerTargetB].isSneaking = true;
                    try {
                        playerList[playerTargetB].addTag("isSneaking");
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    } /*
            if (playerList[playerTargetB].hasTag("isSneaking")) {
              system.runInterval( () => {
              playerList[playerTargetB].isSneaking == true
              if (playerList[playerTargetB].hasTag("isSneaking") == false) {
              return
              }
              }, 2)
            }*/
                }
                else {
                    try {
                        playerList[playerTargetB].removeTag("isSneaking");
                        playerList[playerTargetB].isSneaking = false;
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
            })
                .catch((e) => {
                console.error(e, e.stack);
            });
        }
        let showMenuForm2 = sourceEntity;
        if (message.startsWith("players:") &&
            "0123456789".includes(message.charAt(8)) &&
            "0123456789".includes(message.charAt(message.length)) &&
            message.includes("|")) {
            let message2 = message.slice(8, message.length);
            let message3 = message2.split("|");
            let playerTargetB = Number(message3[0]);
            let playerViewerB = Number(message3[1]);
            playerControllerFormPopup(playerTargetB, playerViewerB);
            showMenuForm2 = playerList[playerViewerB];
        }
        else {
            form2.title("Player Controller");
            form2.dropdown("Player Target", String(targetList).split(","), { defaultValueIndex: 0 });
            form2.dropdown("Player Viewer", String(targetList).split(","), { defaultValueIndex: 0 });
            form2
                .show(playerList[playerList.findIndex((x) => x == sourceEntity)])
                .then((t) => {
                if (t.canceled)
                    return;
                let [playerTarget, playerViewer] = t.formValues;
                let playerTargetB = Number(playerTarget);
                let playerViewerB = Number(playerViewer);
                playerControllerFormPopup(playerTargetB, playerViewerB);
            })
                .catch((e) => {
                console.error(e, e.stack);
            });
        }
    }
    if (id == "andexdb:playerControllerForAdnexter8AdminsOnlyDoNotUseThisUnlessYouAreAndexter8") {
        let form2 = new ModalFormData();
        let playerList = world.getPlayers();
        let targetList = [playerList[0].nameTag];
        let componentList = [playerList[0].getComponents()[0]];
        let dimension = "";
        let spawnXPosition = "";
        let spawnYPosition = "";
        let spawnZPosition = "";
        for (const index in playerList) {
            /*
        console.warn(index);*/
            if (Number(index) != 0) {
                targetList = String([String(targetList), playerList[index].nameTag]).split(","); /*
        targetList = String([String(targetList), playerList[index].nameTag]).split(",");*/
            } /*
        console.warn(targetList);*/
        } /*
    console.warn(targetList);
    console.warn(String(targetList).split(","));
    console.warn(String(targetList));
    console.warn([String(targetList)]);*/
        function playerControllerFormPopup(playerTargetB, playerViewerB) {
            let form = new ModalFormData();
            try {
                dimension = String(playerList[playerTargetB].getSpawnPoint().dimension);
            }
            catch (e) {
                dimension = "";
            }
            try {
                spawnXPosition = String(playerList[playerTargetB].getSpawnPoint().x);
            }
            catch (e) {
                spawnXPosition = "";
            }
            try {
                spawnYPosition = String(playerList[playerTargetB].getSpawnPoint().y);
            }
            catch (e) {
                spawnYPosition = "";
            }
            try {
                spawnZPosition = String(playerList[playerTargetB].getSpawnPoint().z);
            }
            catch (e) {
                spawnZPosition = "";
            }
            let playerCurrentNameTag = "";
            try {
                playerCurrentNameTag = String(playerList[playerTargetB].nameTag);
            }
            catch (e) {
                playerCurrentNameTag = "";
            }
            form.title("Player Controller");
            form.toggle("Change Name Tag", { defaultValue: false });
            form.toggle("Multiline Name Tag", { defaultValue: false });
            form.textField("Name Tag", "Name Tag", { defaultValue: playerCurrentNameTag });
            form.textField("Trigger Event", "Trigger Event");
            form.textField("addExperience", "Experience Amount");
            form.textField("addLevels", "Level Amount");
            form.slider("Selected Slot", 0, 56, { valueStep: 1, defaultValue: playerList[playerTargetB].selectedSlotIndex });
            form.slider("§4Scale", 0, 10, { valueStep: 0.5 });
            form.toggle("Is Sneaking", { defaultValue: playerList[playerTargetB].isSneaking });
            form.toggle("Clear Velocity", { defaultValue: false });
            form.toggle("Extinguish Fire", { defaultValue: false });
            form.toggle("Kill", { defaultValue: false });
            form.toggle("§4Remove (Unavailable Until Future Minecraft Update)", { defaultValue: false });
            form.toggle("Set On Fire", { defaultValue: false });
            form.textField("Set On Fire - Seconds", "Time To Set On Fire For");
            form.toggle("Set On Fire - Use Effects", { defaultValue: false });
            form.toggle("Add Effect", { defaultValue: false });
            form.textField("Effect To Add", "Effect To Add");
            form.textField("Ticks Of Effect", "Ticks Of Effect");
            form.textField("Effect Amplifier", "Effect Amplifier");
            form.toggle("Show Particles Of Effect", { defaultValue: true });
            form.toggle("Add tag", { defaultValue: false });
            form.textField("Tag To Add", "Tag To Add");
            form.toggle("Remove Effect", { defaultValue: false });
            form.textField("Effect To Remove", "Effect To Remove");
            form.toggle("Remove tag", { defaultValue: false });
            form.textField("Tag To Remove", "Tag To Remove"); /*
        form2.dropdown("damageType", ["entity", "projectile"], 0)
        form2.dropdown("damageCause", ["anvil", "none"], 0)*/
            form.toggle("§eapplyImpulse", { defaultValue: false });
            form.textField("§eX Velocity", "§eX Velocity" /*, String(playerList[playerTargetB].getVelocity().x)*/);
            form.textField("§eY Velocity", "§eY Velocity" /*, String(playerList[playerTargetB].getVelocity().y)*/);
            form.textField("§eZ Velocity", "§eZ Velocity" /*, String(playerList[playerTargetB].getVelocity().z)*/);
            form.toggle("applyKnockback", { defaultValue: false });
            form.textField("directionX", "directionX");
            form.textField("directionZ", "directionZ");
            form.textField("horizontalStrength", "horizontalStrength");
            form.textField("verticalStrength", "verticalStrength");
            form.toggle("Set Rotation", { defaultValue: false });
            form.textField("X Rotation", "X Rotation", { defaultValue: String(playerList[playerTargetB].getRotation().x) });
            form.textField("Y Rotation", "Y Rotation", { defaultValue: String(playerList[playerTargetB].getRotation().y) });
            form.toggle("Teleport", { defaultValue: false });
            form.textField("Teleport Dimension", "Dimension", { defaultValue: playerList[playerTargetB].dimension.id });
            form.textField("Teleport X Coordinate", "X Coordinate", { defaultValue: String(playerList[playerTargetB].location.x) });
            form.textField("Teleport Y Coordinate", "Y Coordinate", { defaultValue: String(playerList[playerTargetB].location.y) });
            form.textField("Teleport Z Coordinate", "Z Coordinate", { defaultValue: String(playerList[playerTargetB].location.z) });
            form.textField("Teleport X Rotation", "X Rotation", { defaultValue: String(playerList[playerTargetB].getRotation().x) });
            form.textField("Teleport Y Rotation", "Y Rotation", { defaultValue: String(playerList[playerTargetB].getRotation().y) });
            form.dropdown("§eTeleport Rotation Type Mode", ["Rotation", "§4Facing"], { defaultValueIndex: 0 });
            form.toggle("Teleport - checkForBlocks", { defaultValue: false });
            form.toggle("Teleport - keepVelocity", { defaultValue: false });
            form.toggle("Try Teleport", { defaultValue: false });
            form.textField("Try Teleport Dimension", "§4Dimension", { defaultValue: playerList[playerTargetB].dimension.id });
            form.textField("Try Teleport X Coordinate", "§4X Coordinate", { defaultValue: String(playerList[playerTargetB].location.x) });
            form.textField("Try Teleport Y Coordinate", "§4Y Coordinate", { defaultValue: String(playerList[playerTargetB].location.y) });
            form.textField("Try Teleport Z Coordinate", "§4Z Coordinate", { defaultValue: String(playerList[playerTargetB].location.z) });
            form.toggle("Try Teleport - checkForBlocks", { defaultValue: false });
            form.toggle("Try Teleport - keepVelocity", { defaultValue: false });
            form.toggle("Set Operator", { defaultValue: playerList[playerTargetB].isOp() });
            form.toggle("Set Spawn Point", { defaultValue: false });
            form.textField("Spawn Dimension", "Spawn Dimension", { defaultValue: dimension });
            form.textField("Spawn X Coordinate", "Spawn X Coordinate", { defaultValue: spawnXPosition });
            form.textField("Spawn Y Coordinate", "Spawn Y Coordinate", { defaultValue: spawnYPosition });
            form.textField("Spawn Z Coordinate", "Spawn Z Coordinate", { defaultValue: spawnZPosition });
            form.toggle("Start Item Cooldown", { defaultValue: false });
            form.textField("Item Category", "Item Category");
            form.textField("Tick Duration", "Tick Duration");
            form.toggle("Send Message", { defaultValue: false });
            form.textField("Message To Send", "Message To Send");
            form.toggle("§4Open The Item Modification Form Afterwards", { defaultValue: false });
            form.toggle("resetLevel", { defaultValue: false });
            form.toggle("§4Debug", { defaultValue: false });
            form.show(playerList[playerViewerB])
                .then((r) => {
                if (r.canceled)
                    return;
                let [changeNameTag, multilineNameTag, nameTag, triggerEvent, addExperience, addLevels, selectedSlotIndex, scaleValue, isSneaking, clearVelocity, extinguishFire, kill, remove, setOnFire, setOnFireSeconds, setOnFireRemoveEffects, addEffect, effectToAdd, secondsOfEffect, effectAmplifier, effectShowEffectParticles, addTag, tagToAdd, removeEffect, effectToRemove, removeTag, tagToRemove, applyImpulse, velocityX, velocityY, velocityZ, applyKnockback, kockbackDirectionX, knockbackDirectionZ, knockbackHorizontalStrength, knockbackVerticalStrength, setRot, rotX, rotY, teleport, teleportDimension, teleportX, teleportY, teleportZ, teleportRotX, teleportRotY, teleportRotationType, teleportCheckForBlocks, teleportKeepVelocity, tryTeleport, tryTeleportDimension, tryTeleportX, tryTeleportY, tryTeleportZ, tryTeleportCheckForBlocks, tryTeleportKeepVelocity, setOp, setSpawnPoint, spawnDimension, spawnX, spawnY, spawnZ, setItemCooldown, itemCategory, tickDuration, sendMessage, messageToSend, openTheItemModificationFormAfterwards, resetLevel, debug,] = r.formValues;
                let newNameTag = String(nameTag);
                if (Boolean(multilineNameTag) == true) {
                    newNameTag = String(nameTag).split("\\\\newline").join("\n");
                }
                /*
        let scale = playerList[0].getComponent("scale") as EntityScaleComponent;
        scale.value = Number(scaleValue);*/
                playerList[playerTargetB].setOp(Boolean(setOp));
                if (Boolean(changeNameTag) == true) {
                    try {
                        playerList[playerTargetB].nameTag = String(newNameTag);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                playerList[playerTargetB].isSneaking = Boolean(isSneaking);
                playerList[playerTargetB].selectedSlotIndex = Number(selectedSlotIndex);
                if (Boolean(addEffect) == true) {
                    try {
                        playerList[playerTargetB].addEffect(String(effectToAdd), Number(secondsOfEffect), {
                            amplifier: Number(effectAmplifier),
                            showParticles: Boolean(effectShowEffectParticles),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(applyImpulse) == true) {
                    try {
                        playerList[playerTargetB].applyImpulse({
                            x: Number(velocityX),
                            y: Number(velocityY),
                            z: Number(velocityZ),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(applyKnockback) == true) {
                    try {
                        playerList[playerTargetB].applyKnockback({
                            x: Number(kockbackDirectionX) * Number(knockbackHorizontalStrength),
                            z: Number(knockbackDirectionZ) * Number(knockbackHorizontalStrength),
                        }, Number(knockbackVerticalStrength));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(addTag) == true) {
                    try {
                        playerList[playerTargetB].addTag(String(tagToAdd));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(removeTag) == true) {
                    try {
                        playerList[playerTargetB].removeTag(String(tagToRemove));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(removeEffect) == true) {
                    try {
                        playerList[playerTargetB].removeEffect(String(effectToRemove));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setSpawnPoint) == true) {
                    try {
                        playerList[playerTargetB].setSpawnPoint({
                            dimension: world.getDimension(String(spawnDimension)),
                            x: Number(spawnX),
                            y: Number(spawnY),
                            z: Number(spawnZ),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(teleport) == true) {
                    try {
                        playerList[playerTargetB].teleport({
                            x: Number(teleportX),
                            y: Number(teleportY),
                            z: Number(teleportZ),
                        }, {
                            checkForBlocks: Boolean(teleportCheckForBlocks),
                            dimension: world.getDimension(String(teleportDimension)),
                            keepVelocity: Boolean(teleportKeepVelocity),
                            rotation: {
                                x: Number(teleportRotX),
                                y: Number(teleportRotY),
                            },
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(tryTeleport) == true) {
                    try {
                        playerList[playerTargetB].tryTeleport({
                            x: Number(tryTeleportX),
                            y: Number(tryTeleportY),
                            z: Number(tryTeleportZ),
                        }, {
                            checkForBlocks: Boolean(tryTeleportCheckForBlocks),
                            dimension: world.getDimension(String(tryTeleportDimension)),
                            keepVelocity: Boolean(tryTeleportKeepVelocity),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setOnFire) == true) {
                    try {
                        playerList[playerTargetB].setOnFire(Number(setOnFireSeconds), Boolean(setOnFireRemoveEffects));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setRot) == true) {
                    try {
                        playerList[playerTargetB].setRotation({
                            x: Number(rotX),
                            y: Number(rotY),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(resetLevel) == true) {
                    try {
                        playerList[playerTargetB].resetLevel();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(kill) == true) {
                    try {
                        playerList[playerTargetB].kill();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(remove) == true) {
                    try {
                        playerList[playerTargetB].remove();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(clearVelocity) == true) {
                    try {
                        playerList[playerTargetB].clearVelocity();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(extinguishFire) == true) {
                    try {
                        playerList[playerTargetB].extinguishFire();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (triggerEvent !== undefined) {
                    try {
                        playerList[playerTargetB].triggerEvent(String(triggerEvent));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (addExperience !== undefined) {
                    try {
                        playerList[playerTargetB].addExperience(Number(addExperience));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (setItemCooldown !== undefined) {
                    try {
                        playerList[playerTargetB].startItemCooldown(String(itemCategory), Number(tickDuration));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (addLevels !== undefined) {
                    try {
                        playerList[playerTargetB].addLevels(Number(addLevels));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(sendMessage) == true) {
                    try {
                        playerList[playerTargetB].sendMessage(String(messageToSend));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(isSneaking) == true) {
                    playerList[playerTargetB].isSneaking = true;
                    try {
                        playerList[playerTargetB].addTag("isSneaking");
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    } /*
        if (playerList[playerTargetB].hasTag("isSneaking")) {
          system.runInterval( () => {
          playerList[playerTargetB].isSneaking == true
          if (playerList[playerTargetB].hasTag("isSneaking") == false) {
          return
          }
          }, 2)
        }*/
                }
                else {
                    try {
                        playerList[playerTargetB].isSneaking = false;
                        playerList[playerTargetB].removeTag("isSneaking");
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
            })
                .catch((e) => {
                console.error(e, e.stack);
            });
        }
        let showMenuForm2 = sourceEntity;
        if (message.startsWith("players:") &&
            "0123456789".includes(message.charAt(8)) &&
            "0123456789".includes(message.charAt(message.length)) &&
            message.includes("|")) {
            let message2 = message.slice(8, message.length);
            let message3 = message2.split("|");
            let playerTargetB = Number(message3[0]);
            let playerViewerB = Number(message3[1]);
            playerControllerFormPopup(playerTargetB, playerViewerB);
            showMenuForm2 = playerList[playerViewerB];
        }
        else {
            form2.title("Player Controller");
            form2.dropdown("Player Target", String(targetList).split(","), { defaultValueIndex: 0 });
            form2.dropdown("Player Viewer", String(targetList).split(","), { defaultValueIndex: 0 });
            form2
                .show(playerList[playerList.findIndex((x) => x == sourceEntity)])
                .then((t) => {
                if (t.canceled)
                    return;
                let [playerTarget, playerViewer] = t.formValues;
                let playerTargetB = Number(playerTarget);
                let playerViewerB = Number(playerViewer);
                playerControllerFormPopup(playerTargetB, playerViewerB);
            })
                .catch((e) => {
                console.error(e, e.stack);
            });
        }
    }
    if (id == "andexdb:scriptEvalRunWindow") {
        let form = new ModalFormData();
        let playerList = world.getPlayers();
        let allCoordinates = [];
        form.title("Script Evaluate Run Window");
        form.textField("Script", "JavaScript");
        form.textField("Script", "JavaScript");
        form.textField("Script", "JavaScript");
        form.textField("Script", "JavaScript");
        form.textField("Script", "JavaScript");
        form.textField("Script", "JavaScript");
        form.textField("Script", "JavaScript");
        form.textField("Script", "JavaScript");
        forceShow(form, sourceEntity)
            .then((ro) => {
            let r = ro;
            if (r.canceled)
                return;
            let runScriptForEval = r.formValues;
            eval(String(runScriptForEval.join("\n")));
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:editEntityDynamicProperty") {
        let form = new ModalFormData();
        let playerList = world.getPlayers();
        let allCoordinates = [];
        form.title("Edit Entity Dynamic Property");
        form.textField("Target Selector", "Target Selector");
        form.textField("Dynamic Property Id", "Dynamic Property Id");
        forceShow(form, sourceEntity)
            .then((ro) => {
            let r = ro;
            if (r.canceled)
                return;
            let [ts, dpi] = r.formValues;
            let form2 = new ModalFormData();
            form2.title("Edit Entity Dynamic Property");
            form2.textField("New Value", "New Value", {
                defaultValue: String(targetSelectorB(String(ts), "", Number(world.getAllPlayers()[0].id) ??
                    Number(world.getDimension("overworld").getEntities()[0].id) ??
                    Number(world.getDimension("nether").getEntities()[0].id) ??
                    Number(world.getDimension("the_end").getEntities()[0].id)).getDynamicProperty(String(dpi))),
            });
            forceShow(form2, sourceEntity)
                .then((ro2) => {
                let r2 = ro2;
                if (r2.canceled)
                    return;
                let [newValue] = r.formValues;
                String(targetSelectorB(String(ts), "", Number(world.getAllPlayers()[0].id) ??
                    Number(world.getDimension("overworld").getEntities()[0].id) ??
                    Number(world.getDimension("nether").getEntities()[0].id) ??
                    Number(world.getDimension("the_end").getEntities()[0].id)).setDynamicProperty(String(dpi), String(newValue)));
            })
                .catch((e) => {
                console.error(e, e.stack);
            });
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:editWorldDynamicProperty") {
        let form = new ModalFormData();
        let playerList = world.getPlayers();
        let allCoordinates = [];
        form.title("Edit World Dynamic Property");
        form.textField("Dynamic Property Id", "Dynamic Property Id");
        forceShow(form, sourceEntity)
            .then((ro) => {
            let r = ro;
            if (r.canceled)
                return;
            let [dpi] = r.formValues;
            let form2 = new ModalFormData();
            form2.title("Edit World Dynamic Property");
            form2.textField("New Value", "New Value", { defaultValue: String(world.getDynamicProperty(String(dpi))) });
            forceShow(form2, sourceEntity)
                .then((ro2) => {
                let r2 = ro2;
                if (r2.canceled)
                    return;
                let [newValue] = r.formValues;
                world.setDynamicProperty(String(dpi), String(newValue));
            })
                .catch((e) => {
                console.error(e, e.stack);
            });
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:debugStick" || id == "andexdb:editorStick") {
        editorStick(sourceEntity, message);
    }
    if (id == "andexdb:evalAutoScriptSettings") {
        evalAutoScriptSettings(sourceEntity);
    }
    if (id == "andexdb:settings") {
        settings(sourceEntity);
    }
    if (id == "andexdb:generalSettings") {
        generalSettings(sourceEntity);
    }
    if (id == "andexdb:personalSettings") {
        personalSettings(sourceEntity);
    }
    if (id == "andexdb:customFormUIEditor") {
        let form2 = new ModalFormData();
        let players = world.getAllPlayers();
        let targetList = [players[0].nameTag];
        for (const index in players) {
            if (Number(index) != 0) {
                targetList = String([String(targetList), players[index].nameTag]).split(",");
            }
        }
        let formId = event.message ?? "test1234";
        let form = editCustomFormUI(formId);
        forceShow(form.form, event.sourceEntity)
            .then((to) => {
            let t = to;
            if (t.canceled)
                return;
            world.setDynamicProperty(`customUI:${formId}`, `${t.formValues[0]}|${t.formValues[1]}`);
            let elementValues = t.formValues.slice(2, -2);
            console.warn(elementValues);
            elementValues.forEach((v, i) => {
                switch (i % 5) {
                    case 0:
                        world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`, `${customElementTypeIds[Number(elementValues[i])]}|${elementValues.slice(i + 1, i + 4).join("|")}`);
                        break;
                    case 4:
                        if (Boolean(v) == true) {
                            world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`);
                        }
                        break;
                }
            });
            if (t.formValues[t.formValues.length - 2]) {
                world.setDynamicProperty(`customUIElement:${formId}|${Number(t.formValues[t.formValues.length - 1]) ?? (form.indexList[form.indexList.length - 1] ?? -1) + 1}`, "");
            }
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:customUISelector") {
        customFormListSelectionMenu(event.sourceEntity);
    }
    if (id == "andexdb:showCustomUI") {
        showCustomFormUI(event.message, event.sourceEntity);
    }
    if (id == "andexdb:debugStickMenuB" || id == "andexdb:editorStickMenuB") {
        /*
        let form = new ModalFormData();
        let playerList = world.getPlayers()
        form.textField("Block Dimension", "Block Dimension", String(sourceEntity.dimension.id))
        form.textField("Block X", "Block X", String(sourceEntity.location.x))
        form.textField("Block Y", "Block Y", String(sourceEntity.location.y))
        form.textField("Block Z", "Block Z", String(sourceEntity.location.z))
  
    form.show(sourceEntity as Player).then(r => {
        if (r.canceled) return;
    
        let [ blockDimension, blockX, blockY, blockZ ] = r.formValues;
        let blockPropertyValue2: any
        event.sourceEntity.runCommand("/scriptevent andexdb:debugStickB coordinates:"*/ /*"aslk"*/ /* + blockDimension + "|" + blockX + "|" + blockY + "|" + blockZ)
          }).catch(e => {
              console.error(e, e.stack);
          });*/
        editorStickMenuB(sourceEntity);
    }
    if (id == "andexdb:debugStickMenuC" || id == "andexdb:editorStickMenuC") {
        let form = new ModalFormData();
        let playerList = world.getPlayers();
        form.toggle("includeLiquidBlocks", { defaultValue: true });
        form.toggle("includePassableBlocks", { defaultValue: true });
        form.textField("maxDistance ( Optional )", "maxDistance ( Optional )");
        form.show(playerList[playerList.findIndex((x) => x == sourceEntity)])
            .then((r) => {
            if (r.canceled)
                return;
            let [includeLiquidBlocks, includePassableBlocks, maxDistance] = r.formValues;
            let blockPropertyValue2;
            console.warn(maxDistance);
            if (maxDistance !== "") {
                console.warn("/scriptevent andexdb:debugStickC options:" /*"aslk"*/ +
                    String(includeLiquidBlocks) +
                    "|" +
                    String(includePassableBlocks) +
                    "|" +
                    String(maxDistance));
                event.sourceEntity.runCommand("/scriptevent andexdb:debugStickC options:" /*"aslk"*/ +
                    String(includeLiquidBlocks) +
                    "|" +
                    String(includePassableBlocks) +
                    "|" +
                    String(maxDistance));
            }
            else {
                event.sourceEntity.runCommand("/scriptevent andexdb:debugStickC options:" /*"aslk"*/ + String(includeLiquidBlocks) + "|" + String(includePassableBlocks));
            }
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:debugStickB" || id == "andexdb:editorStickB") {
        /*
        let form = new ModalFormData();
        let playerList = world.getPlayers()*/ /*
                let block = sourceEntity.getBlockFromViewDirection({includeLiquidBlocks: true, includePassableBlocks: true})*/ /*
    let block2: Block*/ /* = block.block*/ /*
        let allCoordinates = []
        if (message.startsWith("coordinates:") && message.includes("|") && message.slice(12).split("|").length == 4) { allCoordinates = message.slice(12).split("|");  block2 = world.getDimension(String(allCoordinates[0])).getBlock({x: Number(allCoordinates[1]), y: Number(allCoordinates[2]), z: Number(allCoordinates[3])})}
        form.title("Editor Stick B");
        let blockStatesFullList: any*/ /*
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/ /*
        try {BlockPermutation.resolve("minecraft:bedrock", block2.permutation.getAllStates()); } catch(e){if (String(e).includes("Error: Failed to resolve block \"minecraft:bedrock\" with properties")) {blockStatesFullList = "§r§b" + String(e).slice(68, String(e).length - 2).split(",").join("\n§b").split("\":").join("\": §a") + "§r§f";} else  {blockStatesFullList = "§r§cThis block has no block states. §f";}}*/ /*
        for (const index in block.block.permutation.getAllStates()) {*/ /*
            console.warn(index);*/ /*
if (Number(index) != 0) {*/ /*
                try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()[index]]).split(","); } catch(e){console.error(e, e.stack);}
                try {blockStatesFullList } catch(e){console.error(e, e.stack);}*/ /*
}*/ /*
                    console.warn(targetList);*/ /*
}*/ /*
                try { form.textField("x: " + block2.x + "\ny: " + block2.y + "\nz: " + block2.z + "\ndimension: " + block2.dimension.id + "\ndistance: " + Vector.distance(sourceEntity.location, block2.location) + "\ngetRedstonePower: " + block2.getRedstonePower() + "\nsetType", "Block Type", {defaultValue: block2.typeId) } catch(e){console.error(e, e.stack}); form.textField("setType\nERROR: NO BLOCK SELECTED", "Block Type", {defaultValue: "minecraft:air"});}*/ /*Error: Failed To resolve block "minecraft:bedrock" with properties */ /*
    form.toggle("setType Enabled", false)
    try {form.textField("List Of Block Properties: " + blockStatesFullList*/ /*(BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates()))*/ /* + "\nBlock Property Identifier", "bool_state, num_state, str_state") } catch(e){console.error(e, e.type*/ /*e.stack*/ /*); console.warn("test: " + String(e).slice(67)*/ /*e.stack*/ /*); form.textField("Block Property Identifier", {defaultValue: "bool_state, num_state, str_state"});}
        form.textField("Block Property Value", "true, 1, \"North\"")
        form.toggle("setProperty Enabled", false)*/ /*
        try {console.warn(block.block.permutation.getAllStates()) } catch(e){console.error(e, e.stack);}
        try {console.warn(block.block.permutation.getAllStates()[0]) } catch(e){console.error(e, e.stack);}
        try {console.warn(block.block.permutation.getAllStates()[0][0]) } catch(e){console.error(e, e.stack);}*/
        /*form.dropdown("Block Permutation To Set", block.getTags())*/ /*
        form.slider("Selected Slot", 0, 56, 1)*/ /*
                form.toggle("isWaterlogged", block2.isWaterlogged)*/ /*
    form.toggle("Clear Velocity", false)*/ /*
        form.toggle("Debug", false)
        form.toggle("setWaterContainerProperties Enabled", false)
        try{if(block2.getComponent("waterContainer") != undefined){form.textField(`Cauldron Water RGBA Color/Fill Level\n§cRed: §g${block2.getComponent("waterContainer").getCustomColor().red}\n§aGreen: §g${block2.getComponent("waterContainer").getCustomColor().green}\n§bBlue: §g${block2.getComponent("waterContainer").getCustomColor().blue}\n§dAlpha: §g${block2.getComponent("waterContainer").getCustomColor().alpha}\nFill Level: §g${block2.getComponent("waterContainer").fillLevel}`, `red, green, blue, alpha, fill level`, `${block2.getComponent("waterContainer").getCustomColor().red}, ${block2.getComponent("waterContainer").getCustomColor().green}, ${block2.getComponent("waterContainer").getCustomColor().blue}, ${block2.getComponent("waterContainer").getCustomColor().alpha}, ${block2.getComponent("waterContainer").fillLevel}`)}else{form.textField(`§4Cauldron Water RGBA Color`, `§4Unavailable`)}}catch{form.textField(`§4Cauldron Water RGBA Color/Fill Level`, `§4Unavailable`)}
        form.toggle("setSnowContainerProperties Enabled", false)
        if(block2.getComponent("snowContainer") != undefined){form.textField(`Cauldron Snow Fill Level\nFill Level: §g${block2.getComponent("snowContainer").fillLevel}`, `${block2.getComponent("snowContainer").fillLevel}`, `${block2.getComponent("snowContainer").fillLevel}`)}else{form.textField(`§4Cauldron Snow Fill Level`, `§r§4Unavailable`)}
        form.toggle("setLavaContainerProperties Enabled", false)
        if(block2.getComponent("lavaContainer") != undefined){form.textField(`Cauldron Lava Fill Level\nFill Level: §g${block2.getComponent("lavaContainer").fillLevel}`, `${block2.getComponent("lavaContainer").fillLevel}`, `${block2.getComponent("lavaContainer").fillLevel}`)}else{form.textField(`§4Cauldron Lava Fill Level`, `§r§4Unavailable`)}
        form.toggle("setPotionContainerProperties Enabled", false)
        if(block2.getComponent("potionContainer") != undefined){form.textField(`Cauldron Potion Type Contents/Fill Level\nFill Level: §g${block2.getComponent("potionContainer").fillLevel}`, `item type, fill level`, `item type, ${block2.getComponent("potionContainer").fillLevel}`)}else{form.textField(`§4Cauldron Potion Type Contents/Fill Level`, `§r§4Unavailable`)}
        form.toggle("setSignFrontRawText Enabled", false)
        if(block2.getComponent("sign") != undefined){form.textField(`Sign Front RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front)))}else{form.textField(`§4Sign Front RawText`, `§r§4Unavailable`)}
        form.toggle("setSignBackRawText Enabled", false)
        if(block2.getComponent("sign") != undefined){form.textField(`Sign Back RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back)))}else{form.textField(`§4Sign Back RawText`, `§r§4Unavailable`)}
        form.toggle("setSignFrontText Enabled", false)
        if(block2.getComponent("sign") != undefined){form.textField(`Sign Front Text\nRawText: §g${block2.getComponent("sign").getText(SignSide.Front)}`, `text`, block2.getComponent("sign").getText(SignSide.Front))}else{form.textField(`§4Sign Front Text`, `§r§4Unavailable`)}
        form.toggle("setSignBackText Enabled", false)
        if(block2.getComponent("sign") != undefined){form.textField(`Sign Back Text\Text: §g${block2.getComponent("sign").getText(SignSide.Back)}`, `text`, block2.getComponent("sign").getText(SignSide.Back))}else{form.textField(`§4Sign Back Text`, `§r§4Unavailable`)}
        form.toggle("setSignFrontTextColor Enabled", false)
        if(block2.getComponent("sign") != undefined){form.textField(`Sign Front Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Front)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Front))}else{form.textField(`§4Sign Front Text Color`, `§r§4Unavailable`)}
        form.toggle("setSignBackTextColor Enabled", false)
        if(block2.getComponent("sign") != undefined){form.textField(`Sign Back Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Back)}`, `dye color`, block2.getComponent("sign").getTextDyeColor(SignSide.Back))}else{form.textField(`§4Sign Back Text Color`, `§r§4Unavailable`)}
        form.toggle("setSignIsWaxed", block2.getComponent("sign")?.isWaxed)
  
    form.show(playerList[playerList.findIndex((x) => x == sourceEntity)]).then(r => {
        if (r.canceled) return;
    
        let [ setType, setTypeEnabled, blockPropertyIdentifier, blockPropertyValue, setPropertyEnabled*/ /*, selectedSlotIndex*/ /*, isWaterlogged/*, clearVelocity*/ //, debug, waterContainerEnabled, waterContainer, snowContainerEnabled, snowContainer, lavaContainerEnabled, lavaContainer, potionContainerEnabled, potionContainer, signFrontRawTextEnabled, signFrontRawText, signBackRawTextEnabled, signBackRawText, signFrontTextEnabled, signFrontText, signBackTextEnabled, signBackText, signFrontTextColorEnabled, signFrontTextColor, signBackTextColorEnabled, signBackTextColor, setSignIsWaxed ] = r.formValues;
        /*let blockPropertyValue2: any
        blockPropertyValue2 = ""
        let blockPropertyValueArray: Array<any>
        blockPropertyValueArray = String(blockPropertyValue).split(", ")
        let blockPropertyValueLength = String(blockPropertyIdentifier).split(", ").length
        if(waterContainerEnabled && block2.getComponent("waterContainer") != undefined){block2.getComponent("waterContainer").setCustomColor({red: Number(String(waterContainer).split(", ")[0]), green: Number(String(waterContainer).split(", ")[1]), blue: Number(String(waterContainer).split(", ")[2]), alpha: Number(String(waterContainer).split(", ")[3])}); block2.getComponent("waterContainer").fillLevel = Number(String(waterContainer).split(", ")[4]); }
        if(snowContainerEnabled && block2.getComponent("snowContainer") != undefined){block2.getComponent("snowContainer").fillLevel = Number(String(snowContainer).split(", ")[0]); }
        if(lavaContainerEnabled && block2.getComponent("lavaContainer") != undefined){block2.getComponent("lavaContainer").fillLevel = Number(String(lavaContainer).split(", ")[0]); }
        if(potionContainerEnabled && block2.getComponent("potionContainer") != undefined){block2.getComponent("potionContainer").fillLevel = Number(String(potionContainer).split(", ")[1]); block2.getComponent("potionContainer").setPotionType(new ItemStack(String(String(potionContainer).split(", ")[0]), 255)); }
        if(signFrontRawTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/ //){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*///block2.getComponent("sign").setText(JSON.parse(String(signFrontRawText)), SignSide.Front); }
        //if(signBackRawTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*///block2.getComponent("sign").setText(JSON.parse(String(signBackRawText)), SignSide.Back); }
        //if(signFrontTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*///block2.getComponent("sign").setText(String(signFrontText).replaceAll("\\n", "\n"), SignSide.Front); }
        //if(signBackTextEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*///block2.getComponent("sign").setText(String(signBackText).replaceAll("\\n", "\n"), SignSide.Back); }
        //if(block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setWaxed(Boolean(setSignIsWaxed)); }
        /*DyeColor.Blue//make it save this DyeColor in the imports from @minecraft/server.
        if(signFrontTextColorEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/ //){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*///block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signFrontTextColor}`), SignSide.Back); }
        //if(signBackTextColorEnabled && block2.getComponent("sign") != undefined/*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/){/*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/block2.getComponent("sign").setTextDyeColor(eval(`DyeColor.${signBackTextColor}`), SignSide.Front); }
        /*for (let index in blockPropertyValueArray) {
        if (String(blockPropertyValueArray[index]).startsWith("\"") && String(blockPropertyValueArray[index]).endsWith("\"")) {
            blockPropertyValueArray[index] = String(blockPropertyValueArray[index]).slice(1, (String(blockPropertyValueArray[index]).length - 1))
        } else {
        if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValueArray[index]).charAt(0)))) {
            blockPropertyValueArray[index] = Number(blockPropertyValueArray[index])
        } else {
        if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true"))) {
            blockPropertyValueArray[index] = Boolean(blockPropertyValueArray[index])
        } else {
            if ((String(blockPropertyValueArray[index]).startsWith("\"") == false) && (String(blockPropertyValueArray[index]).endsWith("\"") == false) && ((String(blockPropertyValueArray[index]) == "false") || (String(blockPropertyValueArray[index]) == "true") || (blockPropertyValueArray[index] == false) || (blockPropertyValueArray[index] == true))) {
                blockPropertyValueArray[index] = String(blockPropertyValueArray[index])
            }}}} };
        if (setTypeEnabled == true) { try { block2.setType(BlockTypes.get(String(setType))/*String(setType)*/ //) } catch(e){console.error(e, e.stack)} };
        /*if (setPropertyEnabled == true) { switch(blockPropertyValueLength) {
            case 1:
                try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0] })/*block2.permutation.clone().withState(String(blockPropertyIdentifier), blockPropertyValue2).clone().getAllStates()*/ // ) } catch ( e ) { console.error(e, e.stack) }
        /*break;
            case 2:
                try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1] }) ) } catch ( e ) { console.error(e, e.stack) }
            break;
            case 3:
                try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2] }) ) } catch ( e ) { console.error(e, e.stack) }
            break;
            case 4:
                try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3] }) ) } catch ( e ) { console.error(e, e.stack) }
            break;
            case 5:
                try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4] }) ) } catch ( e ) { console.error(e, e.stack) }
            break;
            case 6:
                try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5] }) ) } catch ( e ) { console.error(e, e.stack) }
            break;
            case 7:
                try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6] }) ) } catch ( e ) { console.error(e, e.stack) }
            break;
            case 8:
                try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7] }) ) } catch ( e ) { console.error(e, e.stack) }
            break;
            case 9:
                try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8] }) ) } catch ( e ) { console.error(e, e.stack) }
            break;
            case 10:
                try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0], [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1], [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2], [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3], [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4], [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5], [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6], [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7], [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8], [String(blockPropertyIdentifier).split(", ")[9]]: blockPropertyValueArray[9] }) ) } catch ( e ) { console.error(e, e.stack) }
            break;
            default:
            break;/*
            break;*/
        /*} };
        try { block2.setWaterlogged(Boolean(isWaterlogged)) } catch ( e ) { console.error(e, e.stack) }/*
        GameTest.register("StarterTests", "simpleMobTest", (test: GameTest.Test) => {
          
            test.setBlockType("minecraft:redstone_repeater", test.relativeBlockLocation({ x: 2313, y: 64, z: 10944}));
          
          })
            .maxTicks(400)
            .structureName("gametests:mediumglass");*/ /*
    sourceEntity.runCommand("/gametest run gametests:mediumglass")*/
        /*BlockType.arguments({id: "minecraft:grass"})*/
        // Do something
        /*}).catch(e => {
      console.error(e, e.stack);
  });*/
        let block2; /* = block.block*/
        let allCoordinates = [];
        if (message.startsWith("coordinates:") && message.includes("|") && message.slice(12).split("|").length == 4) {
            allCoordinates = message.slice(12).split("|");
            block2 = world.getDimension(String(allCoordinates[0])).getBlock({
                x: Number(allCoordinates[1]),
                y: Number(allCoordinates[2]),
                z: Number(allCoordinates[3]),
            });
        }
        else {
            try {
                block2 = sourceEntity.getBlockFromViewDirection({
                    includeLiquidBlocks: true,
                    includePassableBlocks: true,
                }).block;
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        editorStickB(sourceEntity, block2);
    }
    if (id == "andexdb:debugStickC" || id == "andexdb:editorStickC") {
        let form = new ModalFormData();
        let includeLiquidBlocks = false;
        let includePassableBlocks = false;
        let maxDistance = undefined;
        let allSettings = [];
        if (message.startsWith("options:") && message.includes("|") && (message.slice(8).split("|").length == 3 || message.slice(8).split("|").length == 2)) {
            allSettings = message.slice(8).split("|"); /*
            console.warn(allSettings)*/
            includeLiquidBlocks = Boolean(allSettings[0]);
            includePassableBlocks = Boolean(allSettings[1]);
            if (allSettings.length == 3) {
                try {
                    maxDistance = Number(allSettings[2]);
                }
                catch (e) {
                    maxDistance = undefined;
                }
            }
        } /*
        console.warn(maxDistance)*/
        let playerList = world.getPlayers();
        let block = sourceEntity.getBlockFromViewDirection({
            includeLiquidBlocks: includeLiquidBlocks,
            includePassableBlocks: includePassableBlocks,
            maxDistance: maxDistance,
        });
        let block2 = block.block;
        form.title("Editor Stick C");
        let blockStatesFullList; /*
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
        try {
            BlockPermutation.resolve("minecraft:bedrock", block2.permutation.getAllStates());
        }
        catch (e) {
            if (String(e).includes('Error: Failed to resolve block "minecraft:bedrock" with properties')) {
                blockStatesFullList =
                    "§r§b" +
                        String(e)
                            .slice(68, String(e).length - 2)
                            .split(",")
                            .join("\n§b")
                            .split('":')
                            .join('": §a') +
                        "§r§f";
            }
            else {
                blockStatesFullList = "§r§cThis block has no block states. §f";
            }
        } /*
        for (const index in block.block.permutation.getAllStates()) {*/ /*
                console.warn(index);*/ /*
    if (Number(index) != 0) {*/ /*
            try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()[index]]).split(","); } catch(e){console.error(e, e.stack);}
            try {blockStatesFullList } catch(e){console.error(e, e.stack);}*/ /*
}*/ /*
            console.warn(targetList);*/ /*
    }*/
        try {
            form.textField("x: " +
                block2.x +
                "\ny: " +
                block2.y +
                "\nz: " +
                block2.z +
                "\ndimension: " +
                block2.dimension.id +
                "\ndistance: " +
                Vector3Utils.distance(sourceEntity.location, block2.location) +
                "\ngetRedstonePower: " +
                block2.getRedstonePower() +
                "\nblockFace: " +
                block.face +
                "\nblockFaceLocation: { x: " +
                block.faceLocation.x +
                ", y: " +
                block.faceLocation.y +
                ", z: " +
                block.faceLocation.z +
                " }\nsetType", "Block Type", { defaultValue: block2.typeId });
        }
        catch (e) {
            console.error(e, e.stack);
            form.textField("setType\nERROR: NO BLOCK SELECTED", "Block Type", { defaultValue: "minecraft:air" });
        } /*Error: Failed To resolve block "minecraft:bedrock" with properties */
        form.toggle("setType Enabled", { defaultValue: false });
        try {
            form.textField("List Of Block Properties: " +
                blockStatesFullList /*(BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates()))*/ +
                "\nBlock Property Identifier", "bool_state, num_state, str_state");
        }
        catch (e) {
            console.error(e, e.type /*e.stack*/);
            console.warn("test: " + String(e).slice(67) /*e.stack*/);
            form.textField("Block Property Identifier", "bool_state, num_state, str_state");
        }
        form.textField("Block Property Value", 'true, 1, "North"');
        form.toggle("setProperty Enabled", { defaultValue: false }); /*
        try {console.warn(block.block.permutation.getAllStates()) } catch(e){console.error(e, e.stack);}
        try {console.warn(block.block.permutation.getAllStates()[0]) } catch(e){console.error(e, e.stack);}
        try {console.warn(block.block.permutation.getAllStates()[0][0]) } catch(e){console.error(e, e.stack);}*/
        /*form.dropdown("Block Permutation To Set", block.getTags())*/ /*
        form.slider("Selected Slot", 0, 56, 1)*/
        form.toggle("isWaterlogged", { defaultValue: block2.isWaterlogged }); /*
        form.toggle("Clear Velocity", false)*/
        form.toggle("Debug", { defaultValue: false });
        form.toggle("setWaterContainerProperties Enabled", { defaultValue: false });
        try {
            if (block2.getComponent("fluid_container") != undefined) {
                form.textField(`Cauldron Water RGBA Color/Fill Level\n§cRed: §g${block2.getComponent("fluid_container").fluidColor.red}\n§aGreen: §g${block2.getComponent("fluid_container").fluidColor.green}\n§bBlue: §g${block2.getComponent("fluid_container").fluidColor.blue}\n§dAlpha: §g${block2.getComponent("fluid_container").fluidColor.alpha}`, `red: 0-1, green: 0-1, blue: 0-1, alpha: 0-1`, {
                    defaultValue: `${block2.getComponent("fluid_container").fluidColor.red}, ${block2.getComponent("fluid_container").fluidColor.green}, ${block2.getComponent("fluid_container").fluidColor.blue}, ${block2.getComponent("fluid_container").fluidColor.alpha}`,
                });
                form.slider(`Cauldron Fill Level\nFill Level: §g${block2.getComponent("fluid_container").fillLevel}`, 0, 6, {
                    valueStep: 1,
                    defaultValue: block2.getComponent("fluid_container").fillLevel,
                });
                form.textField(`Cauldron Potion Type Contents\nHas Potion: §g${block2.getComponent("fluid_container").getFluidType() == "Potion"}`, `item type`);
            }
            else {
                form.textField(`§4Cauldron RGBA Color`, `§4Unavailable`);
                form.slider(`§4Cauldron Fill Level (Unavailable)`, 0, 0, { valueStep: 0, defaultValue: 0 });
                form.textField(`§4Cauldron Potion Type Contents`, `§r§4Unavailable`);
            }
        }
        catch {
            form.textField(`§4Cauldron RGBA Color`, `§4Unavailable`);
            form.slider(`§4Cauldron Fill Level (Unavailable)`, 0, 0, { valueStep: 0, defaultValue: 0 });
            form.textField(`§4Cauldron Potion Type Contents`, `§r§4Unavailable`);
        }
        form.toggle("setSignFrontRawText Enabled", { defaultValue: false });
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Front RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, { defaultValue: JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Front)) });
        }
        else {
            form.textField(`§4Sign Front RawText`, `§r§4Unavailable`);
        }
        form.toggle("setSignBackRawText Enabled", { defaultValue: false });
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Back RawText\nRawText: §g${JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back))}`, `{rawtext: [{text|translate|rawtext|score|with: value, ...}]}`, { defaultValue: JSON.stringify(block2.getComponent("sign").getRawText(SignSide.Back)) });
        }
        else {
            form.textField(`§4Sign Back RawText`, `§r§4Unavailable`);
        }
        form.toggle("setSignFrontText Enabled", { defaultValue: false });
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Front Text\nRawText: §g${block2.getComponent("sign").getText(SignSide.Front)}`, `text`, {
                defaultValue: block2.getComponent("sign").getText(SignSide.Front),
            });
        }
        else {
            form.textField(`§4Sign Front Text`, `§r§4Unavailable`);
        }
        form.toggle("setSignBackText Enabled", { defaultValue: false });
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Back Text\Text: §g${block2.getComponent("sign").getText(SignSide.Back)}`, `text`, {
                defaultValue: block2.getComponent("sign").getText(SignSide.Back),
            });
        }
        else {
            form.textField(`§4Sign Back Text`, `§r§4Unavailable`);
        }
        form.toggle("setSignFrontTextColor Enabled", { defaultValue: false });
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Front Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Front)}`, `dye color`, {
                defaultValue: block2.getComponent("sign").getTextDyeColor(SignSide.Front),
            });
        }
        else {
            form.textField(`§4Sign Front Text Color`, `§r§4Unavailable`);
        }
        form.toggle("setSignBackTextColor Enabled", { defaultValue: false });
        if (block2.getComponent("sign") != undefined) {
            form.textField(`Sign Back Text Color\Text: §g${block2.getComponent("sign").getTextDyeColor(SignSide.Back)}`, `dye color`, {
                defaultValue: block2.getComponent("sign").getTextDyeColor(SignSide.Back),
            });
        }
        else {
            form.textField(`§4Sign Back Text Color`, `§r§4Unavailable`);
        }
        form.toggle("setSignIsWaxed", { defaultValue: block2.getComponent("sign")?.isWaxed });
        form.show(playerList[playerList.findIndex((x) => x == sourceEntity)])
            .then((r) => {
            if (r.canceled)
                return;
            let [setType, setTypeEnabled, blockPropertyIdentifier, blockPropertyValue, setPropertyEnabled /*,
selectedSlotIndex*/, isWaterlogged /*,
clearVelocity*/, debug, fluidContainerColor, fluidContainerFillLevel, potionType, signFrontRawTextEnabled, signFrontRawText, signBackRawTextEnabled, signBackRawText, signFrontTextEnabled, signFrontText, signBackTextEnabled, signBackText, signFrontTextColorEnabled, signFrontTextColor, signBackTextColorEnabled, signBackTextColor, setSignIsWaxed,] = r.formValues;
            let blockPropertyValue2;
            blockPropertyValue2 = "";
            let blockPropertyValueArray;
            blockPropertyValueArray = String(blockPropertyValue).split(", ");
            let blockPropertyValueLength = String(blockPropertyIdentifier).split(", ").length;
            if (block2.getComponent("fluid_container") != undefined) {
                if (((c) => `${c.red},${c.green},${c.blue},${c.alpha}`)(block2.getComponent("fluid_container").fluidColor) !=
                    fluidContainerColor
                        .split(",")
                        .map((v) => v.trim())
                        .join()) {
                    block2.getComponent("fluid_container").fluidColor = {
                        red: fluidContainerColor.split(",")[0].toNumber(),
                        green: fluidContainerColor.split(",")[1].toNumber(),
                        blue: fluidContainerColor.split(",")[2].toNumber(),
                        alpha: fluidContainerColor.split(",")[3].toNumber(),
                    };
                }
                if (fluidContainerFillLevel != block2.getComponent("fluid_container").fillLevel) {
                    block2.getComponent("fluid_container").fillLevel = fluidContainerFillLevel;
                }
                if (potionType != "") {
                    block2.getComponent("fluid_container").setPotion(new ItemStack(potionType, 255));
                }
            }
            if (signFrontRawTextEnabled &&
                block2.getComponent("sign") !=
                    undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) {
                /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/ block2
                    .getComponent("sign")
                    .setText(JSON.parse(String(signFrontRawText)), SignSide.Front);
            }
            if (signBackRawTextEnabled &&
                block2.getComponent("sign") !=
                    undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) {
                /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/ block2
                    .getComponent("sign")
                    .setText(JSON.parse(String(signBackRawText)), SignSide.Back);
            }
            if (signFrontTextEnabled &&
                block2.getComponent("sign") !=
                    undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) {
                /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/ block2
                    .getComponent("sign")
                    .setText(String(signFrontText).replaceAll("\\n", "\n"), SignSide.Front);
            }
            if (signBackTextEnabled &&
                block2.getComponent("sign") !=
                    undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) {
                /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/ block2
                    .getComponent("sign")
                    .setText(String(signBackText).replaceAll("\\n", "\n"), SignSide.Back);
            }
            if (block2.getComponent("sign") !=
                undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) {
                /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/ block2
                    .getComponent("sign")
                    .setWaxed(Boolean(setSignIsWaxed));
            }
            DyeColor.Blue; //make it save this DyeColor in the imports from @minecraft/server.
            if (signFrontTextColorEnabled &&
                block2.getComponent("sign") !=
                    undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) {
                /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/ block2
                    .getComponent("sign")
                    .setTextDyeColor(eval(`DyeColor.${signFrontTextColor}`), SignSide.Back);
            }
            if (signBackTextColorEnabled &&
                block2.getComponent("sign") !=
                    undefined /*&&/^{(rawtext|score|text|translate|with):/.test((String(signText)))&&/}$/.test((String(signText)))*/) {
                /*{ translate: "accessibility.list.or.two", with: ["Player 1", "Player 2"] }*/ block2
                    .getComponent("sign")
                    .setTextDyeColor(eval(`DyeColor.${signBackTextColor}`), SignSide.Front);
            }
            for (let index in blockPropertyValueArray) {
                /*
        console.warn(blockPropertyValueArray)*/ /*
                                        console.warn(blockPropertyValueArray[index])*/
                if (String(blockPropertyValueArray[index]).startsWith('"') && String(blockPropertyValueArray[index]).endsWith('"')) {
                    console.warn("string");
                    blockPropertyValueArray[index] = String(blockPropertyValueArray[index]).slice(1, String(blockPropertyValueArray[index]).length - 1); /*
    console.warn(blockPropertyValueArray[index])*/
                }
                else {
                    if (String(blockPropertyValueArray[index]).startsWith('"') == false &&
                        String(blockPropertyValueArray[index]).endsWith('"') == false &&
                        "0123456789.".includes(String(blockPropertyValueArray[index]).charAt(0))) {
                        blockPropertyValueArray[index] = Number(blockPropertyValueArray[index]);
                    }
                    else {
                        if (String(blockPropertyValueArray[index]).startsWith('"') == false &&
                            String(blockPropertyValueArray[index]).endsWith('"') == false &&
                            (String(blockPropertyValueArray[index]) == "false" || String(blockPropertyValueArray[index]) == "true")) {
                            blockPropertyValueArray[index] = Boolean(blockPropertyValueArray[index]);
                        }
                        else {
                            if (String(blockPropertyValueArray[index]).startsWith('"') == false &&
                                String(blockPropertyValueArray[index]).endsWith('"') == false &&
                                (String(blockPropertyValueArray[index]) == "false" ||
                                    String(blockPropertyValueArray[index]) == "true" ||
                                    blockPropertyValueArray[index] == false ||
                                    blockPropertyValueArray[index] == true)) {
                                blockPropertyValueArray[index] = String(blockPropertyValueArray[index]); /*
        console.warn("other")*/
                            }
                        }
                    }
                }
            } /*
if (String(blockPropertyValue).startsWith("\"") && String(blockPropertyValue).endsWith("\"")) {
    blockPropertyValue2 = String(blockPropertyValue).slice(2, (String(blockPropertyValue).length - 3))
} else {
if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ("0123456789.".includes(String(blockPropertyValue).charAt(0)))) {
    blockPropertyValue2 = Number(blockPropertyValue)
} else {
if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ((String(blockPropertyValue) == "false") || (String(blockPropertyValue) == "true"))) {
    blockPropertyValue2 = Boolean(blockPropertyValue)
} else {
    if ((String(blockPropertyValue).startsWith("\"") == false) && (String(blockPropertyValue).endsWith("\"") == false) && ((String(blockPropertyValue) == "false") || (String(blockPropertyValue) == "true") || (blockPropertyValue == false) || (blockPropertyValue == true))) {
        blockPropertyValue2 = String(blockPropertyValue)
    }}}}*/
            if (setTypeEnabled == true) {
                try {
                    block2.setType(BlockTypes.get(String(setType)) /*String(setType)*/);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            } /*
try { block2.setPermutation(BlockPermutation.resolve(block2.typeId, { [String(blockPropertyIdentifier)]: blockPropertyValue2 })) } catch ( e ) { console.error(e, e.stack) }*/
            if (setPropertyEnabled == true) {
                switch (blockPropertyValueLength) {
                    case 1:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                                [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                            }) /*block2.permutation.clone().withState(String(blockPropertyIdentifier), blockPropertyValue2).clone().getAllStates()*/);
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 2:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                                [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                                [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                            }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 3:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                                [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                                [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                                [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                            }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 4:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                                [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                                [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                                [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                                [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3],
                            }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 5:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                                [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                                [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                                [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                                [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3],
                                [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4],
                            }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 6:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                                [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                                [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                                [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                                [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3],
                                [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4],
                                [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5],
                            }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 7:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                                [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                                [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                                [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                                [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3],
                                [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4],
                                [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5],
                                [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6],
                            }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 8:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                                [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                                [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                                [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                                [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3],
                                [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4],
                                [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5],
                                [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6],
                                [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7],
                            }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 9:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                                [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                                [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                                [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                                [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3],
                                [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4],
                                [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5],
                                [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6],
                                [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7],
                                [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8],
                            }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case 10:
                        try {
                            block2.setPermutation(BlockPermutation.resolve(block2.typeId, {
                                [String(blockPropertyIdentifier).split(", ")[0]]: blockPropertyValueArray[0],
                                [String(blockPropertyIdentifier).split(", ")[1]]: blockPropertyValueArray[1],
                                [String(blockPropertyIdentifier).split(", ")[2]]: blockPropertyValueArray[2],
                                [String(blockPropertyIdentifier).split(", ")[3]]: blockPropertyValueArray[3],
                                [String(blockPropertyIdentifier).split(", ")[4]]: blockPropertyValueArray[4],
                                [String(blockPropertyIdentifier).split(", ")[5]]: blockPropertyValueArray[5],
                                [String(blockPropertyIdentifier).split(", ")[6]]: blockPropertyValueArray[6],
                                [String(blockPropertyIdentifier).split(", ")[7]]: blockPropertyValueArray[7],
                                [String(blockPropertyIdentifier).split(", ")[8]]: blockPropertyValueArray[8],
                                [String(blockPropertyIdentifier).split(", ")[9]]: blockPropertyValueArray[9],
                            }));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    default:
                        break; /*
break;*/
                }
            }
            try {
                block2.setWaterlogged(Boolean(isWaterlogged));
            }
            catch (e) {
                console.error(e, e.stack);
            } /*
GameTest.register("StarterTests", "simpleMobTest", (test: GameTest.Test) => {
  
    test.setBlockType("minecraft:redstone_repeater", test.relativeBlockLocation({ x: 2313, y: 64, z: 10944}));
  
  })
    .maxTicks(400)
    .structureName("gametests:mediumglass");*/ /*
                sourceEntity.runCommand("/gametest run gametests:mediumglass")*/
            /*BlockType.arguments({id: "minecraft:grass"})*/
            // Do something
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:debugScreen") {
        let form = new ModalFormData();
        let players = world.getPlayers();
        let block = sourceEntity.getBlockFromViewDirection();
        let entity = sourceEntity.getEntitiesFromViewDirection();
        form.title("Debug Screen");
        form.textField("setType", "Block Type");
        form.textField("Block Property Identifier", "Trigger Event");
        form.textField("Block Property Value", "Trigger Event");
        /*form.dropdown("Block Permutation To Set", block.getTags())*/
        form.slider("Selected Slot", 0, 56, { valueStep: 1 });
        form.toggle("isWaterlogged", { defaultValue: false });
        form.toggle("Clear Velocity", { defaultValue: false });
        form.toggle("Debug", { defaultValue: false });
        form.show(players[players.findIndex((x) => x == sourceEntity)])
            .then((r) => {
            if (r.canceled)
                return;
            let [setType, blockPropertyIdentifier, blockPropertyValue, toggle] = r.formValues;
            players[players.findIndex((x) => x == sourceEntity)].onScreenDisplay.setActionBar("");
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:entityController") {
        let form2 = new ModalFormData();
        let playerList = world.getPlayers();
        let targetList = [playerList[0].nameTag];
        let componentList = [playerList[0].getComponents()[0]];
        let entity2;
        try {
            entity2 = playerList[0].getEntitiesFromViewDirection();
        }
        catch (e) { }
        let dimension = "";
        let spawnXPosition = "";
        let spawnYPosition = "";
        let spawnZPosition = "";
        for (const index in playerList) {
            /*
            console.warn(index);*/
            if (Number(index) != 0) {
                targetList = String([String(targetList), playerList[index].nameTag]).split(","); /*
            targetList = String([String(targetList), playerList[index].nameTag]).split(",");*/
            } /*
            console.warn(targetList);*/
        } /*
        console.warn(targetList);
        console.warn(String(targetList).split(","));
        console.warn(String(targetList));
        console.warn([String(targetList)]);*/
        function playerControllerFormPopup(playerTargetB, playerTargetB2, playerViewerB) {
            let form = new ModalFormData(); /*
            try {dimension = String(playerTargetB.getSpawnPoint().dimension);} catch(e){dimension = ""}
            try {spawnXPosition = String(playerTargetB.getSpawnPoint().x);} catch(e){spawnXPosition = ""}
            try {spawnYPosition = String(playerTargetB.getSpawnPoint().y);} catch(e){spawnYPosition = ""}
            try {spawnZPosition = String(playerTargetB.getSpawnPoint().z);} catch(e){spawnZPosition = ""}*/
            form.title("Entity Controller");
            form.toggle("TypeId: " +
                playerTargetB.typeId +
                "\nId: " +
                playerTargetB.id +
                "\nIsFalling: " +
                playerTargetB.isFalling +
                "\nIsValid: " +
                playerTargetB.isValid +
                "\nTarget: " +
                playerTargetB.target +
                "\nX: " +
                "\nDimension: " +
                playerTargetB.dimension +
                "\nX: " +
                playerTargetB.location.x +
                "\nY: " +
                playerTargetB.location.y +
                "\nZ: " +
                playerTargetB.location.z +
                "\nChange Name Tag", { defaultValue: false });
            form.textField("Name Tag", "Name Tag", { defaultValue: playerTargetB.nameTag });
            form.textField("Trigger Event", "Trigger Event");
            form.toggle("Set Property", { defaultValue: false });
            form.textField("Property Identifier", "Property Identifier");
            form.textField("Property Value", "Property Value");
            form.toggle("Reset Property", { defaultValue: false });
            form.textField("Property Identifier", "Property Identifier");
            form.toggle("Set Dynamic Property", { defaultValue: false });
            form.textField("Dynamic Property Identifier", "Dynamic Property Identifier");
            form.textField("Dynamic Property Value", "Dynamic Property Value");
            form.toggle("Remove Dynamic Property", { defaultValue: false });
            form.textField("Dynamic Property Identifier", "Dynamic Property Identifier");
            form.slider("§4Scale", 0, 10, { valueStep: 0.5 });
            form.toggle("Is Sneaking", { defaultValue: playerTargetB.isSneaking });
            form.toggle("Clear Velocity", { defaultValue: false });
            form.toggle("Extinguish Fire", { defaultValue: false });
            form.toggle("Kill", { defaultValue: false });
            form.toggle("Remove", { defaultValue: false });
            form.toggle("Set On Fire", { defaultValue: false });
            form.textField("Set On Fire - Seconds", "Time To Set On Fire For");
            form.toggle("Set On Fire - Use Effects", { defaultValue: false });
            form.toggle("Add Effect", { defaultValue: false });
            form.textField("Effect To Add", "Effect To Add");
            form.textField("Ticks Of Effect", "Ticks Of Effect");
            form.textField("Effect Amplifier", "Effect Amplifier");
            form.toggle("Show Particles Of Effect", { defaultValue: true });
            form.toggle("Add tag", { defaultValue: false });
            form.textField("Tag To Add", "Tag To Add");
            form.toggle("Remove Effect", { defaultValue: false });
            form.textField("Effect To Remove", "Effect To Remove");
            form.toggle("Remove tag", { defaultValue: false });
            form.textField("Tag To Remove", "Tag To Remove"); /*
            form2.dropdown("damageType", ["entity", "projectile"], 0)
            form2.dropdown("damageCause", ["anvil", "none"], 0)*/
            form.toggle("§eapplyImpulse", { defaultValue: false });
            form.textField("§eX Velocity", "§eX Velocity" /*, String(playerTargetB.getVelocity().x)*/);
            form.textField("§eY Velocity", "§eY Velocity" /*, String(playerTargetB.getVelocity().y)*/);
            form.textField("§eZ Velocity", "§eZ Velocity" /*, String(playerTargetB.getVelocity().z)*/);
            form.toggle("applyKnockback", { defaultValue: false });
            form.textField("directionX", "directionX");
            form.textField("directionZ", "directionZ");
            form.textField("horizontalStrength", "horizontalStrength");
            form.textField("verticalStrength", "verticalStrength");
            form.toggle("Set Rotation", { defaultValue: false });
            form.textField("X Rotation", "X Rotation", { defaultValue: String(playerTargetB.getRotation().x) });
            form.textField("Y Rotation", "Y Rotation", { defaultValue: String(playerTargetB.getRotation().y) });
            form.toggle("Teleport", { defaultValue: false });
            form.textField("Teleport Dimension", "Dimension", { defaultValue: playerTargetB.dimension.id });
            form.textField("Teleport X Coordinate", "X Coordinate", { defaultValue: String(playerTargetB.location.x) });
            form.textField("Teleport Y Coordinate", "Y Coordinate", { defaultValue: String(playerTargetB.location.y) });
            form.textField("Teleport Z Coordinate", "Z Coordinate", { defaultValue: String(playerTargetB.location.z) });
            form.textField("Teleport X Rotation", "X Rotation", { defaultValue: String(playerTargetB.getRotation().x) });
            form.textField("Teleport Y Rotation", "Y Rotation", { defaultValue: String(playerTargetB.getRotation().y) });
            form.toggle("Teleport - checkForBlocks", { defaultValue: false });
            form.toggle("Teleport - keepVelocity", { defaultValue: false });
            form.toggle("§4Try Teleport", { defaultValue: false });
            form.textField("§4Try Teleport Dimension", "§4Dimension", { defaultValue: playerTargetB.dimension.id });
            form.textField("§4Try Teleport X Coordinate", "§4X Coordinate", { defaultValue: String(playerTargetB.location.x) });
            form.textField("§4Try Teleport Y Coordinate", "§4Y Coordinate", { defaultValue: String(playerTargetB.location.y) });
            form.textField("§4Try Teleport Z Coordinate", "§4Z Coordinate", { defaultValue: String(playerTargetB.location.z) });
            form.toggle("§4Try Teleport - checkForBlocks", { defaultValue: false });
            form.toggle("§4Try Teleport - keepVelocity", { defaultValue: false });
            form.toggle("Send Message", { defaultValue: false });
            form.textField("Message To Send", "Message To Send");
            form.toggle("§4Open The Item Modification Form Afterwards", { defaultValue: false });
            form.toggle("§4Debug", { defaultValue: false });
            form.show(playerList[playerViewerB])
                .then((r) => {
                if (r.canceled)
                    return;
                let [changeNameTag, nameTag, triggerEvent, setProperty, propertyIdentifier, propertyValue, resetProperty, resetPropertyIdentifier, setDynamicProperty, dynamicPropertyIdentifier, dynamicPropertyValue, removeDynamicProperty, removeDynamicPropertyIdentifier, scaleValue, isSneaking, clearVelocity, extinguishFire, kill, remove, setOnFire, setOnFireSeconds, setOnFireRemoveEffects, addEffect, effectToAdd, secondsOfEffect, effectAmplifier, effectShowEffectParticles, addTag, tagToAdd, removeEffect, effectToRemove, removeTag, tagToRemove, applyImpulse, velocityX, velocityY, velocityZ, applyKnockback, kockbackDirectionX, knockbackDirectionZ, knockbackHorizontalStrength, knockbackVerticalStrength, setRot, rotX, rotY, teleport, teleportDimension, teleportX, teleportY, teleportZ, teleportRotX, teleportRotY, teleportCheckForBlocks, teleportKeepVelocity, tryTeleport, tryTeleportDimension, tryTeleportX, tryTeleportY, tryTeleportZ, tryTeleportCheckForBlocks, tryTeleportKeepVelocity, sendMessage, messageToSend, openTheItemModificationFormAfterwards, debug,] = r.formValues;
                /*
            let scale = playerList[0].getComponent("scale") as EntityScaleComponent;
            scale.value = Number(scaleValue);*/
                if (Boolean(changeNameTag) == true) {
                    try {
                        playerTargetB.nameTag = String(nameTag);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                playerTargetB.isSneaking = Boolean(isSneaking);
                if (Boolean(addEffect) == true) {
                    try {
                        playerTargetB.addEffect(String(effectToAdd), Number(secondsOfEffect), {
                            amplifier: Number(effectAmplifier),
                            showParticles: Boolean(effectShowEffectParticles),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(applyImpulse) == true) {
                    try {
                        playerTargetB.applyImpulse({
                            x: Number(velocityX),
                            y: Number(velocityY),
                            z: Number(velocityZ),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(applyKnockback) == true) {
                    try {
                        playerTargetB.applyKnockback({
                            x: Number(kockbackDirectionX) * Number(knockbackHorizontalStrength),
                            z: Number(knockbackDirectionZ) * Number(knockbackHorizontalStrength),
                        }, Number(knockbackVerticalStrength));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(addTag) == true) {
                    try {
                        playerTargetB.addTag(String(tagToAdd));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(removeTag) == true) {
                    try {
                        playerTargetB.removeTag(String(tagToRemove));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(removeEffect) == true) {
                    try {
                        playerTargetB.removeEffect(String(effectToRemove));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setProperty) == true) {
                    try {
                        playerTargetB.setProperty(String(propertyIdentifier), String(propertyValue));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(resetProperty) == true) {
                    try {
                        playerTargetB.resetProperty(String(resetPropertyIdentifier));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setDynamicProperty) == true) {
                    try {
                        playerTargetB.setDynamicProperty(String(dynamicPropertyIdentifier), String(dynamicPropertyValue));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(removeDynamicProperty) == true) {
                    try {
                        playerTargetB.setDynamicProperty(String(removeDynamicPropertyIdentifier), undefined);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(teleport) == true) {
                    try {
                        playerTargetB.teleport({
                            x: Number(teleportX),
                            y: Number(teleportY),
                            z: Number(teleportZ),
                        }, {
                            checkForBlocks: Boolean(teleportCheckForBlocks),
                            dimension: world.getDimension(String(teleportDimension)),
                            keepVelocity: Boolean(teleportKeepVelocity),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(tryTeleport) == true) {
                    try {
                        playerTargetB.tryTeleport({
                            x: Number(tryTeleportX),
                            y: Number(tryTeleportY),
                            z: Number(tryTeleportZ),
                        }, {
                            checkForBlocks: Boolean(tryTeleportCheckForBlocks),
                            dimension: world.getDimension(String(tryTeleportDimension)),
                            keepVelocity: Boolean(tryTeleportKeepVelocity),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setOnFire) == true) {
                    try {
                        playerTargetB.setOnFire(Number(setOnFireSeconds), Boolean(setOnFireRemoveEffects));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(setRot) == true) {
                    try {
                        playerTargetB.setRotation({
                            x: Number(rotX),
                            y: Number(rotY),
                        });
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(kill) == true) {
                    try {
                        playerTargetB.kill();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(remove) == true) {
                    try {
                        playerTargetB.remove();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(clearVelocity) == true) {
                    try {
                        playerTargetB.clearVelocity();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(extinguishFire) == true) {
                    try {
                        playerTargetB.extinguishFire();
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (triggerEvent !== undefined) {
                    try {
                        playerTargetB.triggerEvent(String(triggerEvent));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                if (Boolean(isSneaking) == true) {
                    playerTargetB.isSneaking = true;
                    try {
                        playerTargetB.addTag("isSneaking");
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    } /*
            if (playerTargetB.hasTag("isSneaking")) {
              system.runInterval( () => {
              playerTargetB.isSneaking == true
              if (playerTargetB.hasTag("isSneaking") == false) {
              return
              }
              }, 2)
            }*/
                }
                else {
                    try {
                        playerTargetB.removeTag("isSneaking");
                        playerTargetB.isSneaking = false;
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
            })
                .catch((e) => {
                console.error(e, e.stack);
            });
        }
        let showMenuForm2 = sourceEntity;
        if (message.startsWith("players:") && "0123456789".includes(message.charAt(8))) {
            let message2 = message.slice(8, message.length);
            let playerTargetB = undefined;
            try {
                entity2[0] /*.entity*/;
            }
            catch (e) {
                console.error(e, e.stack);
            }
            let playerTargetB2 = entity2[0];
            let playerViewerB = Number(message2);
            playerControllerFormPopup(playerTargetB, playerTargetB2, playerViewerB);
            showMenuForm2 = playerList[playerViewerB];
        }
        else {
            form2.title("Entity Controller");
            form2.dropdown("Player Viewer", String(targetList).split(","), { defaultValueIndex: 0 });
            form2.dropdown("Selection Type", ["Facing", "Nearest", "§4Block§r§f", "§4UUID"], { defaultValueIndex: 0 });
            form2.textField("§4Entity UUID", "§4Entity UUID", { defaultValue: "0" });
            form2
                .show(playerList[playerList.findIndex((x) => x == sourceEntity)])
                .then((t) => {
                if (t.canceled)
                    return;
                let [playerViewer, selectionType, entityUUID] = t.formValues;
                let entity3;
                if (Number(selectionType) == 1) {
                    entity3 = playerList[Number(playerViewer)].dimension.getEntities({
                        excludeTypes: ["minecraft:player"],
                        closest: 1,
                        location: playerList[0].location,
                    })[0];
                    entity2 = playerList[Number(playerViewer)].dimension.getEntitiesFromRay({
                        x: entity3.location.x,
                        y: entity3.location.y + 1.0,
                        z: entity3.location.z,
                    }, { x: 0, y: -0.999999999999999, z: 0 });
                }
                else {
                    try {
                        entity2 = playerList[Number(playerViewer)].getEntitiesFromViewDirection();
                        entity3 = playerList[Number(playerViewer)].getEntitiesFromViewDirection()[0].entity;
                    }
                    catch (e) { }
                }
                let playerTargetB;
                try {
                    playerTargetB = entity3;
                }
                catch { }
                let playerTargetB2;
                try {
                    playerTargetB2 = entity2[0];
                }
                catch { }
                let playerViewerB = Number(playerViewer);
                playerControllerFormPopup(playerTargetB, playerTargetB2, playerViewerB);
            })
                .catch((e) => {
                console.error(e, e.stack);
            });
        } /*
      let form = new ModalFormData();
      let players = world.getPlayers()
      let block = sourceEntity.getBlockFromViewDirection()
      let entity = players[0].getEntitiesFromViewDirection()
      form.title("Entity Controller");
      form.textField("Name Tag", "Name Tag", entity[0].entity.nameTag)
      form.textField("Trigger Event", "Trigger Event")*/ /*
              form.dropdown("Player Target", playerList)*/ /*
        form.slider("Selected Slot", 0, 56, 1)
        form.slider("Scale", 0, 10, 0.5)
        form.toggle("Is Sneaking", false)
        form.toggle("Clear Velocity", false)
        form.toggle("Extinguish Fire", false)
        form.toggle("Kill", false)
        form.toggle("Remove", false)
        form.toggle("Set On Fire", false)
        form.textField("Set On Fire - Seconds", "Name Tag")
        form.toggle("Set On Fire - Use Effects", false)
        form.toggle("Remove Effect", false)
        form.textField("Effect To Remove", "Effect To Remove")
        form.toggle("Remove tag", false)
        form.textField("Tag To Remove", "Tag To Remove")
        form.toggle("Set Rotation", false)
        form.textField("X Rotation", "X Rotation")
        form.textField("Y Rotation", "Y Rotation")
        form.toggle("Teleport", false)
        form.textField("X Coordinate", "X Coordinate")
        form.textField("Y Coordinate", "Y Coordinate")
        form.textField("Z Coordinate", "Z Coordinate")
        form.toggle("Try Teleport", false)
        form.textField("X Coordinate", "X Coordinate")
        form.textField("Y Coordinate", "Y Coordinate")
        form.textField("Z Coordinate", "Z Coordinate")
        form.toggle("Open The Item Modification Form Afterwards", false)
        form.toggle("Debug", false)
    
    
    form.show(players[players.findIndex((x) => x == sourceEntity)] as any).then(r => {
        if (r.canceled) return;
    
        let [ nameTag, triggerEvent, selectedSlotIndex, scaleValue, isSneaking, clearVelocity, extinguishFire, kill, remove, setOnFire, setOnFireSeconds, setOnFireRemoveEffects, removeEffect, effectToRemove, removeTag, tagToRemove, setRot, rotX, rotY, teleport, teleportX, teleportY, teleportZ, tryTeleport, tryTeleportX, tryTeleportY, tryTeleportZ, openTheItemModificationFormAfterwards, debug ] = r.formValues;
    
        let scale = sourceEntity.getComponent("scale") as EntityScaleComponent;*/ /*
        scale.value = Number(scaleValue);*/ /*
        
        try {entity[0].entity.nameTag = String(nameTag);} catch(e){console.error(e, e.stack);}
        try {entity[0].entity.isSneaking = Boolean(isSneaking);} catch(e){console.error(e, e.stack);}
        try {(entity[0].entity as Player).selectedSlotIndex = Number(selectedSlotIndex);} catch(e){console.error(e, e.stack);}
        if (Boolean(setRot) == true) {
            try {entity[0].entity.setRotation({ x: Number(rotX), y: Number(rotY) });} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(kill) == true) {
            try {entity[0].entity.kill();} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(remove) == true) {
            try {entity[0].entity.remove();} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(clearVelocity) == true) {
            try {entity[0].entity.clearVelocity();} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(extinguishFire) == true) {
            try {entity[0].entity.extinguishFire();} catch(e){console.error(e, e.stack);}
        }
        if (triggerEvent !== undefined) {
            try {entity[0].entity.triggerEvent(String(triggerEvent));} catch(e){console.error(e, e.stack);}
        }
    
    if (players[players.findIndex((x) => x == sourceEntity)] as any.hasTag("showDebug")) {
      system.runInterval( () => {
      players[0].onScreenDisplay.setActionBar("dimension: " + entity[0].entity.dimension + "\nfallDistance: " + entity[0].entity.fallDistance + "\nid: entity[0].entity.id: " + entity[0].entity.id + "\nisClimbing: " + entity[0].entity.isClimbing + "\nisFalling: " + entity[0].entity.isFalling + "\nisInWater: " + entity[0].entity.isInWater + "\nisOnGround: " + entity[0].entity.isOnGround + "\nisSleeping: " + entity[0].entity.isSleeping + "\nisSneaking: " + entity[0].entity.isSneaking + "\nisSprinting: " + entity[0].entity.isSprinting + "\nisSwimming: " + entity[0].entity.isSwimming + "\nlifetimeState: " + entity[0].entity.lifetimeState + "\nlocation: " + entity[0].entity.location + "\nnameTag: " + entity[0].entity.nameTag + "\nscoreboardIdentity(or_the_actor_id_very_long_complicated_number): " + entity[0].entity.scoreboardIdentity + "\ntarget: " + entity[0].entity.target + "\ntypeId: " + entity[0].entity.typeId + "\ngetBlockFromViewDirection(): " + entity[0].entity.getBlockFromViewDirection() + "\ngetComponents(): " + entity[0].entity.getComponents() + "\ngetEffects(): " + entity[0].entity.getEffects() + "\ngetEntitiesFromViewDirection(): " + entity[0].entity.getEntitiesFromViewDirection() + "\ngetHeadLocation(): " + entity[0].entity.getHeadLocation() + "\ngetRotation(): " + entity[0].entity.getRotation() + "\ngetTags(): " + entity[0].entity.getTags() + "\ngetVelocity(): " + entity[0].entity.getVelocity() + "\ngetViewDirection(): " + entity[0].entity.getViewDirection + "\nisValid(): " + entity[0].entity.isValid);
      if (players[players.findIndex((x) => x == sourceEntity)] as any.hasTag("showDebug") == false) {
      return
      }
      }, 2)
    }
    }).catch(e => {
        console.error(e, e.stack);
    });*/
    }
    if (id == "andexdb:worldOptions") {
        let form2 = new ModalFormData();
        let playerList = world.getPlayers();
        let targetList = [playerList[0].nameTag];
        let componentList = [playerList[0].getComponents()[0]];
        let entity2 = playerList[0].getEntitiesFromViewDirection();
        let entity3 = undefined;
        try {
            entity3 = entity2[0].entity.id;
        }
        catch (e) {
            /*console.error(e, e.stack);*/
        }
        let dimension = "";
        let spawnXPosition = "";
        let spawnYPosition = "";
        let spawnZPosition = "";
        let playerTargetB = undefined;
        let playerViewer = playerList[playerList.findIndex((x) => x == sourceEntity)];
        for (const index in playerList) {
            /*
            console.warn(index);*/
            if (Number(index) != 0) {
                targetList = String([String(targetList), playerList[index].nameTag]).split(","); /*
            targetList = String([String(targetList), playerList[index].nameTag]).split(",");*/
            } /*
            console.warn(targetList);*/
        } /*
        console.warn(targetList);
        console.warn(String(targetList).split(","));
        console.warn(String(targetList));
        console.warn([String(targetList)]);*/
        let form = new ModalFormData(); /*
            try {dimension = String(playerTargetB.getSpawnPoint().dimension);} catch(e){dimension = ""}
            try {spawnXPosition = String(playerTargetB.getSpawnPoint().x);} catch(e){spawnXPosition = ""}
            try {spawnYPosition = String(playerTargetB.getSpawnPoint().y);} catch(e){spawnYPosition = ""}
            try {spawnZPosition = String(playerTargetB.getSpawnPoint().z);} catch(e){spawnZPosition = ""}*/
        playerList.findIndex((x) => x == sourceEntity);
        form.title("World Options\nhi\nhi\nhi\nhi. . . . ");
        form.toggle("getAbsoluteTime: " +
            world.getAbsoluteTime() +
            "\ngetDay: " +
            world.getDay() +
            "\ngetDefaultSpawnLocation: { x: " +
            world.getDefaultSpawnLocation().x +
            ", y: " +
            world.getDefaultSpawnLocation().y +
            ", z: " +
            world.getDefaultSpawnLocation().z +
            " }\ngetMoonPhase: " +
            world.getMoonPhase() +
            "\ngetTimeOfDay: " +
            world.getTimeOfDay() +
            "\nX: " +
            "\n§4Set Weather", { defaultValue: false }); /*
            form.toggle("§4Set Weather", false)*/
        form.textField("Weather Type", "Name Tag", { defaultValue: WeatherType.Clear });
        form.textField("Dimension To Set Weather In", "Dimension To Set Weather In");
        form.textField("Weather Duration Ticks ( Optional )", "Weather Duration In Ticks"); /*
            form.slider("§4Scale", 0, 10, 0.5)*/
        form.toggle("brodcastClientMessage", { defaultValue: false });
        form.textField("brodcastClientMessage - Id", "Id Of Client Message To Brodcast");
        form.textField("brodcastClientMessage - Value", "Value Of Client Message To Brodcast");
        form.toggle("sendMessage", { defaultValue: false });
        form.textField("sendMessage - Message", "Message To Send");
        form.toggle("setAbsoluteTime", { defaultValue: false });
        form.textField("setAbsoluteTime - Value", "Value Of The New Absolute Time");
        form.toggle("setDefaultSpawnLocation", { defaultValue: false });
        form.textField("World Spawn X Coordinate", "World Spawn X Coordinate", { defaultValue: String(world.getDefaultSpawnLocation().x) });
        form.textField("World Spawn Y Coordinate", "World Spawn Y Coordinate", { defaultValue: String(world.getDefaultSpawnLocation().y) });
        form.textField("World Spawn Z Coordinate", "World Spawn Z Coordinate", { defaultValue: String(world.getDefaultSpawnLocation().z) });
        form.toggle("setDynamicProperty", { defaultValue: false });
        form.textField("setDynamicProperty - Id", "Id Of Client Message To Brodcast");
        form.textField("setDynamicProperty - Value", "Value Of Client Message To Brodcast");
        form.toggle("setTimeOfDay", { defaultValue: false });
        form.textField("setTimeOfDay - Value", "Value Of The New Time Of Day", { defaultValue: undefined });
        form.toggle("spawnEntity", { defaultValue: false });
        form.textField("Entity Identifier", "Entity Identifier", { defaultValue: /*String(*/ entity3 /*)*/ });
        form.textField("X Coordinate", "X Coordinate", { defaultValue: String(playerViewer.location.x) });
        form.textField("Y Coordinate", "Y Coordinate", { defaultValue: String(playerViewer.location.y) });
        form.textField("Z Coordinate", "Z Coordinate", { defaultValue: String(playerViewer.location.z) });
        form.dropdown("Dimension", ["Overworld", "Nether", "The End"], { defaultValueIndex: 0 }); /*
            form2.dropdown("damageType", ["entity", "projectile"], 0)
            form2.dropdown("damageCause", ["anvil", "none"], 0)*/
        form.toggle("§4Debug", { defaultValue: false });
        let dimensionList2 = ["overworld", "nether", "the_end"];
        let dimensionList3 = [world.getDimension("overworld"), world.getDimension("nether"), world.getDimension("the_end")];
        let weatherList2 = ["Clear", "Rain", "Thunder"];
        let weatherList3 = [WeatherType.Clear, WeatherType.Rain, WeatherType.Thunder];
        form.show(playerList[playerList.findIndex((x) => x == sourceEntity)])
            .then((r) => {
            if (r.canceled)
                return;
            let [setWeather, weatherType, weatherDimension, weatherDuration, brodcastClientMessage, clientMessageId, clientMessageValue, sendMessage, messageMessage, setAbsoluteTime, newAbsoluteTime, setDefaultSpawnLocation, spawnX, spawnY, spawnZ, setDynamicProperty, dynamicPropertyId, dynamicPropertyValue, setTimeOfDay, newTimeOfDay, spawnEntity, entityIdentifier, entityX, entityY, entityZ, entityDimension, debug,] = r.formValues;
            /*
            let scale = playerList[0].getComponent("scale") as EntityScaleComponent;
            scale.value = Number(scaleValue);*/
            if (Boolean(setWeather) == true && weatherDuration == "") {
                try {
                    world.getDimension(String(weatherDimension)).setWeather(weatherList3[weatherList2.indexOf(String(weatherType))]);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            else {
                if (Boolean(setWeather) == true && weatherDuration !== "") {
                    try {
                        world
                            .getDimension(String(weatherDimension))
                            .setWeather(weatherList3[weatherList2.indexOf(String(weatherType))], Number(1) /* This one comes in a later update lols. // BUGBUG */);
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
            }
            if (Boolean(brodcastClientMessage) == true) {
                try {
                    world.broadcastClientMessage(String(clientMessageId), String(clientMessageValue));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(sendMessage) == true) {
                try {
                    world.sendMessage(String(messageMessage).split("\\newline"));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setAbsoluteTime) == true) {
                try {
                    world.setAbsoluteTime(Number(newAbsoluteTime));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setDefaultSpawnLocation) == true) {
                try {
                    world.setDefaultSpawnLocation({
                        x: Number(spawnX),
                        y: Number(spawnY),
                        z: Number(spawnZ),
                    });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setDynamicProperty) == true) {
                try {
                    world.setDynamicProperty(String(dynamicPropertyId), dynamicPropertyValue);
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            }
            if (Boolean(setTimeOfDay) == true) {
                try {
                    world.setTimeOfDay(Number(newTimeOfDay));
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            } /*
        if (Boolean(playMusic) == true) {
            try {playerTargetB.setRotation({ x: Number(rotX), y: Number(rotY) });} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(playSound) == true) {
            try {playerTargetB.kill();} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(queueMusic) == true) {
            try {playerTargetB.remove();} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(removeDynamicProperty) == true) {
            try {playerTargetB.clearVelocity();} catch(e){console.error(e, e.stack);}
        }*/
            if (Boolean(spawnEntity) == true) {
                try {
                    world.getDimension(dimensionList2[Number(entityDimension)]).spawnEntity(String(entityIdentifier), {
                        x: Number(entityX),
                        y: Number(entityY),
                        z: Number(entityZ),
                    });
                }
                catch (e) {
                    console.error(e, e.stack);
                }
            } /*
        if (Boolean(spawnItem) == true) {
            try {playerTargetB.extinguishFire();} catch(e){console.error(e, e.stack);}
        }
        if (Boolean(spawnParticle) == true) {
            try {playerTargetB.extinguishFire();} catch(e){console.error(e, e.stack);}
        }*/
        })
            .catch((e) => {
            console.error(e, e.stack);
        });
    }
    if (id == "andexdb:scriptEval") {
        let dynamicProperty = message;
        try {
            eval(dynamicProperty);
        }
        catch (e) {
            console.error(e, e.stack);
        }
        //console.log(eval('2 + 2'))
    }
    if (id == "andexdb:indirectScriptEval") {
        let dynamicProperty = message;
        try {
            eval?.(dynamicProperty);
        }
        catch (e) {
            console.error(e, e.stack);
        }
        //console.log(eval?.('2 + 2'))
    }
    if (id == "andexdb:scripteval") {
        let dynamicProperty = message;
        try {
            eval(dynamicProperty);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:indirectscripteval") {
        let dynamicProperty = message;
        try {
            eval?.(dynamicProperty);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "s:e") {
        let player = sourceEntity;
        try {
            eval(message);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "s:eb") {
        let player = sourceEntity;
        try {
            eval(message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "is:e") {
        let player = sourceEntity;
        try {
            eval?.(message);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "is:eb") {
        let player = sourceEntity;
        try {
            eval?.(message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "s:elc") {
        let player = sourceEntity;
        try {
            eval(message);
        }
        catch (e) {
            psend(player, e + " " + e.stack);
        }
    }
    if (id == "s:elcb") {
        let player = sourceEntity;
        try {
            eval(message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"));
        }
        catch (e) {
            psend(player, e + " " + e.stack);
        }
    }
    if (id == "is:elc") {
        let player = sourceEntity;
        try {
            eval?.(message);
        }
        catch (e) {
            psend(player, e + " " + e.stack);
        }
    }
    if (id == "is:elcb") {
        let player = sourceEntity;
        try {
            eval?.(message.replaceAll("\\@\\", "@").replaceAll("\\>\\", ">").replaceAll("\\<\\", "<"));
        }
        catch (e) {
            psend(player, e + " " + e.stack);
        }
    }
    if (id == "andexdb:se") {
        let dynamicProperty = message;
        try {
            eval(dynamicProperty);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:ise") {
        let dynamicProperty = message;
        try {
            eval?.(dynamicProperty);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:selc") {
        let player = sourceEntity;
        try {
            eval(message);
        }
        catch (e) {
            psend(player, e + " " + e.stack);
        }
    }
    if (id == "andexdb:iselc") {
        let player = sourceEntity;
        try {
            eval?.(message);
        }
        catch (e) {
            psend(player, e + " " + e.stack);
        }
    }
    if (id == "andexdb:sendGlobalWorldMessage") {
        let dynamicProperty = message;
        try {
            world.sendMessage(dynamicProperty.escapeCharacters(false, true, 1, true, true, true, true, true, false));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:sendGlobalWorldMessageB") {
        let dynamicProperty = message;
        try {
            world.sendMessage(dynamicProperty.escapeCharacters(true, false, 0, false, false, false, false, false, false));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:setWorldDynamicProperty") {
        let dynamicProperty = message.split("|");
        try {
            world.setDynamicProperty(String(dynamicProperty[0]), dynamicProperty[1].replaceAll("\\s", "|"));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:setEntityDynamicProperty") {
        let playerName = message.split("|");
        for (let i in playerName) {
            playerName[i] = playerName[i].replaceAll("\\l", "|").replaceAll("\\n", "\n").replaceAll("\\x", "");
        }
        if (playerName.length == 1) {
            try {
                sourceEntity.sendMessage(
                /*"§r§fplayerControllerCommandForm Command Format: <playerName: string>|<setPlayerNameTag: boolean>|<multilineNameTag: boolean>|<newPlayerNameTag: string>|<triggerEvent: boolean>|<eventId: string>|<addExperience: boolean>|<experienceAmount: int>|<>|<>"*/ "§r§fplayerControllerCommandForm Command Format: <targets: quotedTargetSelector>|<option: optionName>:<optionValue: optionValue>{list: list; listObject: |[<option: optionName>:<optionValue: optionValue>]}\nOptions: triggerEvent, setProperty, setPropertyInt, setPropertyBool, setDynamicProperty, setDynamicPropertyInt, setDynamicPropertyBool, setDynamicPropertyVector3");
            }
            catch (e) { }
        }
        else {
            let playerList = world.getPlayers();
            if (playerName[0].startsWith('"') && playerName[0].endsWith('"')) {
                playerName[0] = playerName[0].slice(1, playerName[0].length - 1);
            }
            let targetList = [playerList[0].name];
            let position;
            let entity = undefined; /*
        console.warn(playerName[0])*/
            if (sourceType == "Entity") {
                position = String(sourceEntity.location.x) + " " + sourceEntity.location.y + " " + sourceEntity.location.z;
                entity = sourceEntity;
            }
            else {
                position = String(sourceBlock.location.x) + " " + sourceBlock.location.y + " " + sourceBlock.location.z;
            }
            let targets = targetSelectorAllListC(playerName[0], "", position, entity); /*
        console.warn(targets[0].nameTag)*/
            for (const index in playerList) {
                /*
            console.warn(index);*/
                if (Number(index) != 0) {
                    targetList = String([String(targetList), playerList[index].name]).split(","); /*
            targetList = String([String(targetList), playerList[index].name]).split(",");*/
                } /*
            console.warn(targetList);*/
            }
            for (let i in playerName.slice(1)) {
                for (let l in targets) {
                    switch (playerName.slice(1)[i].split(":")[0]) {
                        case "triggerEvent":
                            try {
                                targets[l].triggerEvent(playerName.slice(1)[i].split(":").slice(1).join(":").replaceAll("\\c", ":"));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setProperty":
                            try {
                                targets[l].setProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), playerName.slice(1)[i].split(":").slice(2).join(":").replaceAll("\\c", ":"));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setPropertyInt":
                            try {
                                targets[l].setProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), Number(playerName.slice(1)[i].split(":").slice(2).join(":").replaceAll("\\c", ":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setPropertyBool":
                            try {
                                targets[l].setProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), Boolean(playerName.slice(1)[i].split(":").slice(2).join(":").replaceAll("\\c", ":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break; /*
    case "setPropertyVector3":
    try {targets[l].setProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), Boolean(playerName.slice(1)[i].split(":").slice(2).join(":").replaceAll("\\c", ":")));} catch(e){console.error(e, e.stack);}
    break; */
                        case "setDynamicProperty":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), playerName.slice(1)[i].split(":").slice(2).join(":").replaceAll("\\c", ":"));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setDynamicPropertyInt":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), Number(playerName.slice(1)[i].split(":").slice(2).join(":").replaceAll("\\c", ":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setDynamicPropertyBool":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), Boolean(playerName.slice(1)[i].split(":").slice(2).join(":").replaceAll("\\c", ":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setDynamicPropertyVector3":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1].replaceAll("\\c", ":"), {
                                    x: Number(playerName.slice(1)[i].split(":")[2]),
                                    y: Number(playerName.slice(1)[i].split(":")[3]),
                                    z: Number(playerName.slice(1)[i].split(":")[4]),
                                });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break; /*
    case "setVariant":
    try {(targets[l].getComponent("minecraft:variant") as EntityVariantComponent).value = Number(playerName.slice(1)[i].split(":")[1]);} catch(e){console.error(e, e.stack);}
    break; */
                        // case "setMarkVariant": // Broke in 1.21.80, switch to use entiiy scale.
                        //     try {
                        //         (targets[l].getComponent("minecraft:mark_variant") as EntityMarkVariantComponent).value = Number(
                        //             playerName.slice(1)[i].split(":")[1]
                        //         );
                        //     } catch (e) {
                        //         console.error(e, e.stack);
                        //     }
                        //     break;
                        // case "setPushThrough": // Broke in 1.21.80, switch to use entiiy scale.
                        //     try {
                        //         (targets[l].getComponent("minecraft:push_through") as EntityPushThroughComponent).value = Number(
                        //             playerName.slice(1)[i].split(":")[1]
                        //         );
                        //     } catch (e) {
                        //         console.error(e, e.stack);
                        //     }
                        //     break;
                        case "setScale":
                            if (entity_scale_format_version === null) {
                                throw new Error("8Crafter's Entity Scale Add-On v1.18.0 or newer is required to use setScale.");
                            }
                            try {
                                targets[l].runCommand("/scriptevent andexsa:setScale " + playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        // case "setSkinId": // Broke in 1.21.80, switch to use entiiy scale.
                        //     try {
                        //         (targets[l].getComponent("minecraft:skin_id") as EntitySkinIdComponent).value = Number(playerName.slice(1)[i].split(":")[1]);
                        //     } catch (e) {
                        //         console.error(e, e.stack);
                        //     }
                        //     break;
                        case "setTame":
                            try {
                                targets[l].getComponent("minecraft:tameable").tame(sourceEntity);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setAirSupply":
                            try {
                                targets[l].getComponent("minecraft:breathable").airSupply = Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setColor":
                            try {
                                targets[l].getComponent("minecraft:color").value = Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setFlyingSpeed":
                            try {
                                targets[l].getComponent("minecraft:flying_speed").value = Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        // case "setFrictionModifier": // Broke in 1.21.80, switch to use entiiy scale.
                        //     try {
                        //         (targets[l].getComponent("minecraft:friction_modifier") as EntityFrictionModifierComponent).value = Number(
                        //             playerName.slice(1)[i].split(":")[1]
                        //         );
                        //     } catch (e) {
                        //         console.error(e, e.stack);
                        //     }
                        //     break;
                        // case "setGroundOffset": // Broke in 1.21.80, switch to use entiiy scale.
                        //     try {
                        //         (targets[l].getComponent("minecraft:ground_offset") as EntityGroundOffsetComponent).value = Number(
                        //             playerName.slice(1)[i].split(":")[1]
                        //         );
                        //     } catch (e) {
                        //         console.error(e, e.stack);
                        //     }
                        //     break;
                        case "setHealth":
                            try {
                                targets[l].getComponent("minecraft:health").setCurrentValue(Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setMovement":
                            try {
                                targets[l].getComponent("minecraft:health").setCurrentValue(Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setUnderwaterMovement":
                            try {
                                targets[l].getComponent("minecraft:health").setCurrentValue(Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setLavaMovement":
                            try {
                                targets[l].getComponent("minecraft:health").setCurrentValue(Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                    }
                }
            }
        }
    }
    if (id == "andexdb:getEntityDynamicProperty") {
        let playerName = message.split("|");
        for (let i in playerName) {
            playerName[i] = playerName[i].replaceAll("\\l", "|").replaceAll("\\n", "\n").replaceAll("\\x", "");
        }
        if (playerName.length == 1) {
            try {
                sourceEntity.sendMessage(
                /*"§r§fplayerControllerCommandForm Command Format: <playerName: string>|<setPlayerNameTag: boolean>|<multilineNameTag: boolean>|<newPlayerNameTag: string>|<triggerEvent: boolean>|<eventId: string>|<addExperience: boolean>|<experienceAmount: int>|<>|<>"*/ "§r§fplayerControllerCommandForm Command Format: <targets: quotedTargetSelector>|<option: optionName>:<optionValue: optionValue>{list: list; listObject: |[<option: optionName>:<optionValue: optionValue>]}\nOptions: triggerEvent, setProperty, setPropertyInt, setPropertyBool, setDynamicProperty, setDynamicPropertyInt, setDynamicPropertyBool, setDynamicPropertyVector3");
            }
            catch (e) { }
        }
        else {
            let playerList = world.getPlayers();
            if (playerName[0].startsWith('"') && playerName[0].endsWith('"')) {
                playerName[0] = playerName[0].slice(1, playerName[0].length - 1);
            }
            let targetList = [playerList[0].name];
            let position;
            let entity = undefined; /*
        console.warn(playerName[0])*/
            if (sourceType == "Entity") {
                position = String(sourceEntity.location.x) + " " + sourceEntity.location.y + " " + sourceEntity.location.z;
                entity = sourceEntity;
            }
            else {
                position = String(sourceBlock.location.x) + " " + sourceBlock.location.y + " " + sourceBlock.location.z;
            }
            let targets = targetSelectorAllListC(playerName[0], "", position, entity); /*
        console.warn(targets[0].nameTag)*/
            for (const index in playerList) {
                /*
            console.warn(index);*/
                if (Number(index) != 0) {
                    targetList = String([String(targetList), playerList[index].name]).split(","); /*
            targetList = String([String(targetList), playerList[index].name]).split(",");*/
                } /*
            console.warn(targetList);*/
            }
            for (let i in playerName.slice(1)) {
                for (let l in targets) {
                    try {
                        sourceEntity.sendMessage("" + targets[l].id + ": " + targets[l].getDynamicProperty(playerName.slice(1)[i].replaceAll("\\c", ":")));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
            }
        }
    }
    if (id == "andexdb:getWorldDynamicProperty") {
        let dynamicProperty = message.split("|");
        try {
            sourceEntity.sendMessage("a" + String(world.getDynamicProperty(String(dynamicProperty[0]))));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:setWorldDynamicPropertyInt") {
        let dynamicProperty = message.split("|");
        try {
            world.setDynamicProperty(String(dynamicProperty[0]), Number(dynamicProperty[1]));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:setWorldDynamicPropertyBoolean") {
        let dynamicProperty = message.split("|");
        try {
            world.setDynamicProperty(String(dynamicProperty[0]), Boolean(dynamicProperty[1]));
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:setWorldDynamicPropertyB") {
        let dynamicProperty = message.split("|");
        try {
            world.setDynamicProperty(String(dynamicProperty[0]), dynamicProperty[1].replaceAll("\\s", "|"));
        }
        catch (e) {
            sourceEntity.sendMessage("§c" + e + e.stack);
        }
    }
    if (id == "andexdb:setPlayerNameTag") {
        let playerName = message.split("|");
        for (let i in playerName) {
            playerName[i] = playerName[i].replaceAll("\\l", "|").replaceAll("\\n", "\n").replaceAll("\\x", "");
        }
        if (playerName.length == 1) {
            try {
                sourceEntity.sendMessage("§r§fsetPlayerNameTag Command Format: playerName|newPlayerNameTag");
            }
            catch (e) { }
        }
        else {
            let playerList = world.getPlayers();
            if (playerName[0].startsWith('"') && playerName[0].endsWith('"')) {
                playerName[0] = playerName[0].slice(1, playerName[0].length - 1);
            }
            let targetList = [playerList[0].name];
            for (const index in playerList) {
                /*
            console.warn(index);*/
                if (Number(index) != 0) {
                    targetList = String([String(targetList), playerList[index].name]).split(","); /*
            targetList = String([String(targetList), playerList[index].name]).split(",");*/
                } /*
            console.warn(targetList);*/
            }
            try {
                playerList[targetList.indexOf(String(playerName[0]))].nameTag = playerName[1];
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
    }
    if (id == "andexdb:playerControllerCommandForm") {
        let playerName = message.split("|");
        if (playerName.length == 1) {
            try {
                sourceEntity.sendMessage(
                /*"§r§fplayerControllerCommandForm Command Format: <playerName: string>|<setPlayerNameTag: boolean>|<multilineNameTag: boolean>|<newPlayerNameTag: string>|<triggerEvent: boolean>|<eventId: string>|<addExperience: boolean>|<experienceAmount: int>|<>|<>"*/ "§r§fplayerControllerCommandForm Command Format: <playerName: string>|<option: optionName>:<optionValue: optionValue>{list: list; listObject: |[<option: optionName>:<optionValue: optionValue>]}");
            }
            catch (e) { }
        }
        else {
            let playerList = world.getPlayers();
            let targetList = [playerList[0].name];
            for (const index in playerList) {
                /*
            console.warn(index);*/
                if (Number(index) != 0) {
                    targetList = String([String(targetList), playerList[index].name]).split(","); /*
            targetList = String([String(targetList), playerList[index].name]).split(",");*/
                } /*
            console.warn(targetList);*/
            }
            for (let i in playerName.slice(1)) {
                switch (playerName[i].split(":")[0]) {
                    case "nameTag":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].nameTag = playerName[i].split(":").slice(1).join(":");
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "nameTagMultiline":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].nameTag = playerName[i].split(":").slice(1).join(":").replaceAll("\\n", "\n");
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "triggerEvent":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].triggerEvent(playerName[i].split(":").slice(1).join(":"));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "setProperty":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].triggerEvent(playerName[i].split(":").slice(1).join(":"));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "setProperty":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].triggerEvent(playerName[i].split(":").slice(1).join(":"));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                }
            }
            try {
                playerList[targetList.indexOf(String(playerName[0]))].nameTag = playerName[3];
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
    }
    if (id == "andexdb:playerControllerCommandForm") {
        let playerName = message.split("|");
        if (playerName.length == 1) {
            try {
                sourceEntity.sendMessage(
                /*"§r§fplayerControllerCommandForm Command Format: <playerName: string>|<setPlayerNameTag: boolean>|<multilineNameTag: boolean>|<newPlayerNameTag: string>|<triggerEvent: boolean>|<eventId: string>|<addExperience: boolean>|<experienceAmount: int>|<>|<>"*/ "§r§fplayerControllerCommandForm Command Format: <playerName: string>|<option: optionName>:<optionValue: optionValue>{list: list; listObject: |[<option: optionName>:<optionValue: optionValue>]}");
            }
            catch (e) { }
        }
        else {
            let playerList = world.getPlayers();
            let targetList = [playerList[0].name];
            for (const index in playerList) {
                /*
            console.warn(index);*/
                if (Number(index) != 0) {
                    targetList = String([String(targetList), playerList[index].name]).split(","); /*
            targetList = String([String(targetList), playerList[index].name]).split(",");*/
                } /*
            console.warn(targetList);*/
            }
            for (let i in playerName.slice(1)) {
                switch (playerName[i].split(":")[0]) {
                    case "nameTag":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].nameTag = playerName[i].split(":").slice(1).join(":");
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "nameTagMultiline":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].nameTag = playerName[i].split(":").slice(1).join(":").replaceAll("\\n", "\n");
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "triggerEvent":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].triggerEvent(playerName[i].split(":").slice(1).join(":"));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "setProperty":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].triggerEvent(playerName[i].split(":").slice(1).join(":"));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "setProperty":
                        try {
                            playerList[targetList.indexOf(String(playerName[0]))].triggerEvent(playerName[i].split(":").slice(1).join(":"));
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                        break;
                    case "clearVelocity":
                        if (playerName[i].split(":")[1]?.toLowerCase() == "true")
                            try {
                                playerList[targetList.indexOf(String(playerName[0]))].triggerEvent(playerName[i].split(":").slice(1).join(":"));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                        break;
                }
            }
            try {
                playerList[targetList.indexOf(String(playerName[0]))].nameTag = playerName[3];
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
    }
    if (id == "andexdb:entityControllerCommandForm") {
        let playerName = message.split("|");
        for (let i in playerName) {
            playerName[i] = playerName[i].replaceAll("\\l", "|").replaceAll("\\n", "\n").replaceAll("\\x", "");
        }
        if (playerName.length == 1) {
            try {
                sourceEntity.sendMessage(
                /*"§r§fplayerControllerCommandForm Command Format: <playerName: string>|<setPlayerNameTag: boolean>|<multilineNameTag: boolean>|<newPlayerNameTag: string>|<triggerEvent: boolean>|<eventId: string>|<addExperience: boolean>|<experienceAmount: int>|<>|<>"*/ "§r§fplayerControllerCommandForm Command Format: <targets: quotedTargetSelector>|<option: optionName>:<optionValue: optionValue>{list: list; listObject: |[<option: optionName>:<optionValue: optionValue>]}");
            }
            catch (e) { }
        }
        else {
            let playerList = world.getPlayers();
            if (playerName[0].startsWith('"') && playerName[0].endsWith('"')) {
                playerName[0] = playerName[0].slice(1, playerName[0].length - 1);
            }
            let targetList = [playerList[0].name];
            let position;
            let entity = undefined; /*
        console.warn(playerName[0])*/
            if (sourceType == "Entity") {
                position = String(sourceEntity.location.x) + " " + sourceEntity.location.y + " " + sourceEntity.location.z;
                entity = sourceEntity;
            }
            else {
                position = String(sourceBlock.location.x) + " " + sourceBlock.location.y + " " + sourceBlock.location.z;
            }
            let targets = targetSelectorAllListE(playerName[0], position); /*
        console.warn(targets[0].nameTag)*/
            for (const index in playerList) {
                /*
            console.warn(index);*/
                if (Number(index) != 0) {
                    targetList = String([String(targetList), playerList[index].name]).split(","); /*
            targetList = String([String(targetList), playerList[index].name]).split(",");*/
                } /*
            console.warn(targetList);*/
            }
            for (let i in playerName.slice(1)) {
                for (let l in targets) {
                    switch (playerName.slice(1)[i].split(":")[0]) {
                        case "nameTag":
                            try {
                                targets[l].nameTag = playerName.slice(1)[i].split(":").slice(1).join(":");
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "nameTagMultiline":
                            try {
                                targets[l].nameTag = playerName.slice(1)[i].split(":").slice(1).join(":").replaceAll("\\n", "\n");
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "triggerEvent":
                            try {
                                targets[l].triggerEvent(playerName.slice(1)[i].split(":").slice(1).join(":"));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setProperty":
                            try {
                                targets[l].setProperty(playerName.slice(1)[i].split(":")[1], playerName.slice(1)[i].split(":").slice(2).join(":"));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setPropertyInt":
                            try {
                                targets[l].setProperty(playerName.slice(1)[i].split(":")[1], Number(playerName.slice(1)[i].split(":").slice(2).join(":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setPropertyBool":
                            try {
                                targets[l].setProperty(playerName.slice(1)[i].split(":")[1], Boolean(playerName.slice(1)[i].split(":").slice(2).join(":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break; /*
    case "setPropertyVector3":
    try {targets[l].setProperty(playerName.slice(1)[i].split(":")[1], Boolean(playerName.slice(1)[i].split(":").slice(2).join(":")));} catch(e){console.error(e, e.stack);}
    break; */
                        case "setDynamicProperty":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1], playerName.slice(1)[i].split(":").slice(2).join(":"));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setDynamicPropertyInt":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1], Number(playerName.slice(1)[i].split(":").slice(2).join(":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setDynamicPropertyBool":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1], Boolean(playerName.slice(1)[i].split(":").slice(2).join(":")));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setDynamicPropertyVector3":
                            try {
                                targets[l].setDynamicProperty(playerName.slice(1)[i].split(":")[1], {
                                    x: Number(playerName.slice(1)[i].split(":")[2]),
                                    y: Number(playerName.slice(1)[i].split(":")[3]),
                                    z: Number(playerName.slice(1)[i].split(":")[4]),
                                });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "clearVelocity" /*
            if(playerName.slice(1)[i].split(":")[1].toLowerCase() == "true"){*/:
                            try {
                                targets[l].clearVelocity();
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            } /*
            }*/
                            break;
                        case "isSneaking":
                            try {
                                targets[l].isSneaking = Boolean(playerName.slice(1)[i].split(":")[1]?.toLowerCase());
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "addEffect":
                            try {
                                targets[l].addEffect(playerName.slice(1)[i].split(":")[1], Number(playerName.slice(1)[i].split(":")[2]), {
                                    amplifier: Number(playerName.slice(1)[i].split(":")[3]),
                                    showParticles: Boolean(playerName.slice(1)[i].split(":")[4]?.toLowerCase()),
                                });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "applyImpulse":
                            try {
                                targets[l].applyImpulse({
                                    x: Number(playerName.slice(1)[i].split(":")[1]),
                                    y: Number(playerName.slice(1)[i].split(":")[2]),
                                    z: Number(playerName.slice(1)[i].split(":")[3]),
                                });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "applyKnockback":
                            try {
                                targets[l].applyKnockback({
                                    x: Number(playerName.slice(1)[i].split(":")[1]) * Number(playerName.slice(1)[i].split(":")[3]),
                                    z: Number(playerName.slice(1)[i].split(":")[2]) * Number(playerName.slice(1)[i].split(":")[3]),
                                }, Number(playerName.slice(1)[i].split(":")[4]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "addTag":
                            try {
                                targets[l].addTag(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "removeTag":
                            try {
                                targets[l].removeTag(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "removeEffect":
                            try {
                                targets[l].removeEffect(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "kill":
                            try {
                                targets[l].kill();
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "remove":
                            try {
                                targets[l].remove();
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "teleport":
                            try {
                                targets[l].teleport({
                                    x: Number(playerName.slice(1)[i].split(":")[1]),
                                    y: Number(playerName.slice(1)[i].split(":")[2]),
                                    z: Number(playerName.slice(1)[i].split(":")[3]),
                                }, {
                                    checkForBlocks: Boolean(playerName.slice(1)[i].split(":")[7]),
                                    rotation: {
                                        x: Number(playerName.slice(1)[i].split(":")[5]),
                                        y: Number(playerName.slice(1)[i].split(":")[6]),
                                    },
                                    dimension: world.getDimension(playerName.slice(1)[i].split(":")[4]),
                                    keepVelocity: Boolean(playerName.slice(1)[i].split(":")[8]),
                                });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "teleportFacingLocation":
                            try {
                                targets[l].teleport({
                                    x: Number(playerName.slice(1)[i].split(":")[1]),
                                    y: Number(playerName.slice(1)[i].split(":")[2]),
                                    z: Number(playerName.slice(1)[i].split(":")[3]),
                                }, {
                                    checkForBlocks: Boolean(playerName.slice(1)[i].split(":")[8]),
                                    facingLocation: {
                                        x: Number(playerName.slice(1)[i].split(":")[5]),
                                        y: Number(playerName.slice(1)[i].split(":")[6]),
                                        z: Number(playerName.slice(1)[i].split(":")[7]),
                                    },
                                    dimension: world.getDimension(playerName.slice(1)[i].split(":")[4]),
                                    keepVelocity: Boolean(playerName.slice(1)[i].split(":")[9]),
                                });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "tryTeleport":
                            try {
                                targets[l].tryTeleport({
                                    x: Number(playerName.slice(1)[i].split(":")[1]),
                                    y: Number(playerName.slice(1)[i].split(":")[2]),
                                    z: Number(playerName.slice(1)[i].split(":")[3]),
                                }, {
                                    checkForBlocks: Boolean(playerName.slice(1)[i].split(":")[7]),
                                    rotation: {
                                        x: Number(playerName.slice(1)[i].split(":")[5]),
                                        y: Number(playerName.slice(1)[i].split(":")[6]),
                                    },
                                    dimension: world.getDimension(playerName.slice(1)[i].split(":")[4]),
                                    keepVelocity: Boolean(playerName.slice(1)[i].split(":")[8]),
                                });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "tryTeleportFacingLocation":
                            try {
                                targets[l].tryTeleport({
                                    x: Number(playerName.slice(1)[i].split(":")[1]),
                                    y: Number(playerName.slice(1)[i].split(":")[2]),
                                    z: Number(playerName.slice(1)[i].split(":")[3]),
                                }, {
                                    checkForBlocks: Boolean(playerName.slice(1)[i].split(":")[8]),
                                    facingLocation: {
                                        x: Number(playerName.slice(1)[i].split(":")[5]),
                                        y: Number(playerName.slice(1)[i].split(":")[6]),
                                        z: Number(playerName.slice(1)[i].split(":")[7]),
                                    },
                                    dimension: world.getDimension(playerName.slice(1)[i].split(":")[4]),
                                    keepVelocity: Boolean(playerName.slice(1)[i].split(":")[9]),
                                });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setOnFire":
                            try {
                                targets[l].setOnFire(Number(playerName.slice(1)[i].split(":")[1]), Boolean(playerName.slice(1)[i].split(":")[2]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setRot":
                            try {
                                targets[l].setRotation({
                                    x: Number(playerName.slice(1)[i].split(":")[1]),
                                    y: Number(playerName.slice(1)[i].split(":")[2]),
                                });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "extinguishFire":
                            try {
                                targets[l].extinguishFire(Boolean(playerName.slice(1)[i].split(":")[1]?.toLowerCase()));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "addLevels":
                            try {
                                targets[l].addLevels(Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "addExperience":
                            try {
                                targets[l].addExperience(Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "sendMessage":
                            try {
                                targets[l].sendMessage(String(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "startItemcooldown":
                            try {
                                targets[l].startItemCooldown(String(playerName.slice(1)[i].split(":")[1]), Number(playerName.slice(1)[i].split(":")[1]));
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "slectedSlot":
                            try {
                                (targets[l].selectedSlotIndex = Number(playerName.slice(1)[i].split(":")[1])),
                                    Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "resetLevel":
                            try {
                                targets[l].resetLevel(), Number(playerName.slice(1)[i].split(":")[1]);
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                        case "setSpawnPoint":
                            try {
                                targets[l].setSpawnPoint({
                                    x: Number(playerName.slice(1)[i].split(":")[1]),
                                    y: Number(playerName.slice(1)[i].split(":")[2]),
                                    z: Number(playerName.slice(1)[i].split(":")[3]),
                                    dimension: world.getDimension(playerName.slice(1)[i].split(":")[4]),
                                });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            }
                            break;
                    }
                }
            }
        }
    }
    if (id == "andexdb:getRedstone") {
        let dynamicProperty = message.split("|");
        let block;
        block = undefined;
        try {
            block = sourceEntity.getBlockFromViewDirection({
                includePassableBlocks: true,
            });
        }
        catch (e) { }
        try {
            event.sourceEntity.onScreenDisplay.setActionBar("§cRedstone Power: §a" + block.block.getRedstonePower());
        }
        catch (e) { }
    }
    if (id == "andexdb:getRedstoneAndLiquid") {
        let dynamicProperty = message.split("|");
        let block;
        block = undefined;
        try {
            block = sourceEntity.getBlockFromViewDirection({
                includePassableBlocks: true,
                includeLiquidBlocks: true,
            });
        }
        catch (e) { }
        try {
            event.sourceEntity.onScreenDisplay.setActionBar("§cRedstone Power: §a" + block.block.getRedstonePower());
        }
        catch (e) { }
    }
    if (id == "andexdb:getBlockStates") {
        let dynamicProperty = message.split("|");
        let block;
        block = undefined;
        let blockStatesFullList; /*
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
        try {
            block = sourceEntity.getBlockFromViewDirection({
                includePassableBlocks: true,
                includeLiquidBlocks: true,
            });
        }
        catch (e) { }
        try {
            BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates());
        }
        catch (e) {
            if (String(e).includes('Error: Failed to resolve block "minecraft:bedrock" with properties')) {
                blockStatesFullList =
                    "§r§b" +
                        String(e)
                            .slice(68, String(e).length - 2)
                            .split(",")
                            .join("\n§b")
                            .split('":')
                            .join('": §a') +
                        "§r§f";
            }
            else {
                blockStatesFullList = "§r§cThis block has no block states. §f";
            }
        }
        try {
            event.sourceEntity.onScreenDisplay.setActionBar("§eBlock States For §c" + block.block.typeId + "§e: §a\n" + blockStatesFullList);
        }
        catch (e) { }
    }
    if (id == "andexdb:getBlockStatesNoLiquid") {
        let dynamicProperty = message.split("|");
        let block;
        block = undefined;
        let blockStatesFullList; /*
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
        try {
            block = sourceEntity.getBlockFromViewDirection({
                includePassableBlocks: true,
            });
        }
        catch (e) { }
        try {
            BlockPermutation.resolve("minecraft:bedrock", block.block.permutation.getAllStates());
        }
        catch (e) {
            if (String(e).includes('Error: Failed to resolve block "minecraft:bedrock" with properties')) {
                blockStatesFullList =
                    "§r§b" +
                        String(e)
                            .slice(68, String(e).length - 2)
                            .split(",")
                            .join("\n§b")
                            .split('":')
                            .join('": §a') +
                        "§r§f";
            }
            else {
                blockStatesFullList = "§r§cThis block has no block states. §f";
            }
        }
        try {
            event.sourceEntity.onScreenDisplay.setActionBar("§eBlock States For §c" + block.block.typeId + "§e: §a\n" + blockStatesFullList);
        }
        catch (e) { }
    }
    if (id == "andexdb:spawnWithNoAI") {
        let parameters = message.split("|"); /*
        console.warn(JSON.parse("{hisa: 1}"))*/
        /* if ((world.getDynamicProperty(
                "andexdbSettings:gametestStructureDefaultSpawnLocation"
            ) == undefined ||
                (
                    world.getDynamicProperty(
                        "andexdbSettings:gametestStructureDefaultSpawnLocation"
                    ) as Vector3
                )?.x == undefined) &&
                String(parameters[3]) == "") {
                if ((initiator ?? sourceEntity) == undefined) {
                    if (sourceType == ScriptEventSource.Server) {
                        console.error(
                            '§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at "Main Menu>Settings>General Settings" or specify a location in the fourth parameter. '
                        );
                    } else {
                        console.error(
                            '§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at "Main Menu>Settings>General Settings" or specify a location in the fourth parameter. Block Location: ' +
                            JSON.stringify(sourceBlock.location) +
                            ", Block Dimension: " +
                            sourceBlock.dimension
                        );
                    }
                } else {
                    ((initiator ?? sourceEntity) as Player).sendMessage(
                        '§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at "Main Menu>Settings>General Settings" or specify a location in the fourth parameter. '
                    );
                }
                return;
            } */
        let location = (initiator ?? sourceEntity ?? sourceBlock)?.location ?? { x: 0, y: 0, z: 0 };
        let location2;
        try {
            location2 = vTStr(config.gametestStructureDefaultSpawnLocation);
        }
        catch { }
        try {
            location = evaluateCoordinates(parameters[1]
                .split("~")
                .join(" ~")
                .split("^")
                .join(" ^")
                .split("*")
                .join(" *")
                .replaceAll("  ", " ")
                .trimStart()
                .split(" ")[0]
                .replaceAll(" ", ""), parameters[1]
                .split("~")
                .join(" ~")
                .split("^")
                .join(" ^")
                .split("*")
                .join(" *")
                .replaceAll("  ", " ")
                .trimStart()
                .split(" ")[1]
                .replaceAll(" ", ""), parameters[1]
                .split("~")
                .join(" ~")
                .split("^")
                .join(" ^")
                .split("*")
                .join(" *")
                .replaceAll("  ", " ")
                .trimStart()
                .split(" ")[2]
                .replaceAll(" ", ""), (initiator ?? sourceEntity ?? sourceBlock)?.location ?? {
                x: 0,
                y: 0,
                z: 0,
            }, (initiator ?? sourceEntity)?.getRotation() ?? { x: 0, y: 0 });
        }
        catch (e) {
            console.error(e, e.stack);
        }
        if (parameters[3] !== "") {
            try {
                location2 = Object.values(evaluateCoordinates(parameters[3]
                    .split("~")
                    .join(" ~")
                    .split("^")
                    .join(" ^")
                    .split("*")
                    .join(" *")
                    .replaceAll("  ", " ")
                    .trimStart()
                    .split(" ")[0]
                    .replaceAll(" ", ""), parameters[3]
                    .split("~")
                    .join(" ~")
                    .split("^")
                    .join(" ^")
                    .split("*")
                    .join(" *")
                    .replaceAll("  ", " ")
                    .trimStart()
                    .split(" ")[1]
                    .replaceAll(" ", ""), parameters[3]
                    .split("~")
                    .join(" ~")
                    .split("^")
                    .join(" ^")
                    .split("*")
                    .join(" *")
                    .replaceAll("  ", " ")
                    .trimStart()
                    .split(" ")[2]
                    .replaceAll(" ", ""), (initiator ?? sourceEntity ?? sourceBlock)?.location ?? { x: 0, y: 0, z: 0 }, (initiator ?? sourceEntity)?.getRotation() ?? {
                    x: 0,
                    y: 0,
                })).join(" ");
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        world.setDynamicProperty("andexdbGametest:spawnWithoutBehaviorsInternalLocation", location);
        world.setDynamicProperty("andexdbGametest:spawnWithoutBehaviorsInternalType", parameters[0]);
        // console.warn(location2);
        try {
            world
                .getDimension(parameters[2] ?? (initiator ?? sourceEntity ?? sourceBlock)?.dimension.id ?? "overworld")
                .runCommand(`/execute positioned ${location2} run /gametest run andexdbinternaltests:spawn_without_behaviors_internal`);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdbHelp:spawnWithNoAI") {
        if ((initiator ?? sourceEntity) == undefined) {
            console.warn("andexdb:spawnWithNoAI /scriptevent command format: /scriptevent andexdb:spawnWithNoAI <entityType: string>|[location: location]|[dimensionId: string]|[gametestStructureSpawnLocation: location]");
        }
        else {
            (initiator ?? sourceEntity).sendMessage("andexdb:spawnWithNoAI /scriptevent command format: /scriptevent andexdb:spawnWithNoAI <entityType: string>|[location: location]|[dimensionId: string]|[gametestStructureSpawnLocation: location]");
        }
    }
    if (id == "andexdb:spawnSimulatedPlayer") {
        let parameters = message.split("|"); /*
        console.warn(JSON.parse("{hisa: 1}"))*/
        /* if ((world.getDynamicProperty(
                "andexdbSettings:gametestStructureDefaultSpawnLocation"
            ) == undefined ||
                (
                    world.getDynamicProperty(
                        "andexdbSettings:gametestStructureDefaultSpawnLocation"
                    ) as Vector3
                )?.x == undefined) &&
                String(parameters[3]) == "") {
                if ((initiator ?? sourceEntity) == undefined) {
                    if (sourceType == ScriptEventSource.Server) {
                        console.error(
                            '§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at "Main Menu>Settings>General Settings" or specify a location in the fourth parameter. '
                        );
                    } else {
                        console.error(
                            '§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at "Main Menu>Settings>General Settings" or specify a location in the fourth parameter. Block Location: ' +
                            JSON.stringify(sourceBlock.location) +
                            ", Block Dimension: " +
                            sourceBlock.dimension
                        );
                    }
                } else {
                    ((initiator ?? sourceEntity) as Player).sendMessage(
                        '§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at "Main Menu>Settings>General Settings" or specify a location in the fourth parameter. '
                    );
                }
                return;
            } */
        let location = (initiator ?? sourceEntity ?? sourceBlock)?.location ?? { x: 0, y: 0, z: 0 };
        let location2;
        try {
            location2 = vTStr(config.gametestStructureDefaultSpawnLocation);
        }
        catch { }
        try {
            location = evaluateCoordinates(parameters[1]
                .split("~")
                .join(" ~")
                .split("^")
                .join(" ^")
                .split("*")
                .join(" *")
                .replaceAll("  ", " ")
                .trimStart()
                .split(" ")[0]
                .replaceAll(" ", ""), parameters[1]
                .split("~")
                .join(" ~")
                .split("^")
                .join(" ^")
                .split("*")
                .join(" *")
                .replaceAll("  ", " ")
                .trimStart()
                .split(" ")[1]
                .replaceAll(" ", ""), parameters[1]
                .split("~")
                .join(" ~")
                .split("^")
                .join(" ^")
                .split("*")
                .join(" *")
                .replaceAll("  ", " ")
                .trimStart()
                .split(" ")[2]
                .replaceAll(" ", ""), (initiator ?? sourceEntity ?? sourceBlock)?.location ?? {
                x: 0,
                y: 0,
                z: 0,
            }, (initiator ?? sourceEntity)?.getRotation() ?? { x: 0, y: 0 });
        }
        catch (e) {
            console.error(e, e.stack);
        }
        if (parameters[3] !== "") {
            try {
                location2 = Object.values(evaluateCoordinates(parameters[3]
                    .split("~")
                    .join(" ~")
                    .split("^")
                    .join(" ^")
                    .split("*")
                    .join(" *")
                    .replaceAll("  ", " ")
                    .trimStart()
                    .split(" ")[0]
                    .replaceAll(" ", ""), parameters[3]
                    .split("~")
                    .join(" ~")
                    .split("^")
                    .join(" ^")
                    .split("*")
                    .join(" *")
                    .replaceAll("  ", " ")
                    .trimStart()
                    .split(" ")[1]
                    .replaceAll(" ", ""), parameters[3]
                    .split("~")
                    .join(" ~")
                    .split("^")
                    .join(" ^")
                    .split("*")
                    .join(" *")
                    .replaceAll("  ", " ")
                    .trimStart()
                    .split(" ")[2]
                    .replaceAll(" ", ""), (initiator ?? sourceEntity ?? sourceBlock)?.location ?? { x: 0, y: 0, z: 0 }, (initiator ?? sourceEntity)?.getRotation() ?? {
                    x: 0,
                    y: 0,
                })).join(" ");
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        world.setDynamicProperty("andexdbGametest:spawnSimulatedPlayerInternalLocation", location);
        world.setDynamicProperty("andexdbGametest:customSimulatedPlayerInternalName", parameters[0]);
        // console.warn(location2);
        try {
            world
                .getDimension(parameters[2] ?? (initiator ?? sourceEntity ?? sourceBlock)?.dimension.id ?? "overworld")
                .runCommand(`/execute positioned ${location2} run /gametest run andexdbinternaltests:spawn_simulated_player_custom_internal`);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdbHelp:spawnSimulatedPlayer") {
        if ((initiator ?? sourceEntity) == undefined) {
            console.warn("andexdb:spawnSimulatedPlayer /scriptevent command format: /scriptevent andexdb:spawnSimulatedPlayer [playerName: string]|[location: location]|[dimensionId: string]|[gametestStructureSpawnLocation: location]");
        }
        else {
            (initiator ?? sourceEntity).sendMessage("andexdb:spawnSimulatedPlayer /scriptevent command format: /scriptevent andexdb:spawnSimulatedPlayer [playerName: string]|[location: location]|[dimensionId: string]|[gametestStructureSpawnLocation: location]");
        }
    }
    if (id == "andexdb:scriptEvalWithGameTest") {
        let parameters = message.split("|"); /*
        console.warn(JSON.parse("{hisa: 1}"))*/
        /* if ((world.getDynamicProperty(
                "andexdbSettings:gametestStructureDefaultSpawnLocation"
            ) == undefined ||
                (
                    world.getDynamicProperty(
                        "andexdbSettings:gametestStructureDefaultSpawnLocation"
                    ) as Vector3
                )?.x == undefined) &&
                String(parameters[3]) == "") {
                if ((initiator ?? sourceEntity) == undefined) {
                    if (sourceType == ScriptEventSource.Server) {
                        console.error(
                            '§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at "Main Menu>Settings>General Settings" or specify a location in the fourth parameter. '
                        );
                    } else {
                        console.error(
                            '§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at "Main Menu>Settings>General Settings" or specify a location in the fourth parameter. Block Location: ' +
                            JSON.stringify(sourceBlock.location) +
                            ", Block Dimension: " +
                            sourceBlock.dimension
                        );
                    }
                } else {
                    ((initiator ?? sourceEntity) as Player).sendMessage(
                        '§cERROR: Default GameTest structure spawn location is currently not set or is invalid, please set it with the spawn_without_behaviors_internal option at "Main Menu>Settings>General Settings" or specify a location in the fourth parameter. '
                    );
                }
                return;
            } */
        let location2;
        try {
            location2 = vTStr(config.gametestStructureDefaultSpawnLocation);
        }
        catch { }
        if (parameters[1] !== undefined) {
            try {
                location2 = Object.values(evaluateCoordinates(parameters[1]
                    .split("~")
                    .join(" ~")
                    .split("^")
                    .join(" ^")
                    .split("*")
                    .join(" *")
                    .replaceAll("  ", " ")
                    .trimStart()
                    .split(" ")[0]
                    .replaceAll(" ", ""), parameters[1]
                    .split("~")
                    .join(" ~")
                    .split("^")
                    .join(" ^")
                    .split("*")
                    .join(" *")
                    .replaceAll("  ", " ")
                    .trimStart()
                    .split(" ")[1]
                    .replaceAll(" ", ""), parameters[1]
                    .split("~")
                    .join(" ~")
                    .split("^")
                    .join(" ^")
                    .split("*")
                    .join(" *")
                    .replaceAll("  ", " ")
                    .trimStart()
                    .split(" ")[2]
                    .replaceAll(" ", ""), (initiator ?? sourceEntity ?? sourceBlock)?.location ?? { x: 0, y: 0, z: 0 }, (initiator ?? sourceEntity)?.getRotation() ?? {
                    x: 0,
                    y: 0,
                })).join(" ");
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        world.setDynamicProperty("andexdbGametest:scriptEvalInternalCode", parameters[0].replaceAll("\\vl", "|"));
        console.warn(location2);
        try {
            world
                .getDimension(parameters[2] ?? (initiator ?? sourceEntity ?? sourceBlock)?.dimension.id ?? "overworld")
                .runCommand(`/execute positioned ${location2} run /gametest run andexdbinternaltests:script_eval_internal`);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    if (id == "andexdb:createParticle") {
        let message2 = message.split("|");
        let message3;
        if (sourceType == "Entity") {
            message3 = coordinates(message2[1].split(";")[0].replaceAll(", ", " "), {
                x: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("pos:"))
                    ?.split(":")[1] ?? sourceEntity.location.x),
                y: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("pos:"))
                    ?.split(":")[2] ?? sourceEntity.location.y),
                z: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("pos:"))
                    ?.split(":")[3] ?? sourceEntity.location.z),
            }, {
                x: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("rot:"))
                    ?.split(":")[1] ?? sourceEntity.getRotation().x),
                y: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("rot:"))
                    ?.split(":")[2] ?? sourceEntity.getRotation().y),
            });
        }
        if (sourceType == "NPCDialogue") {
            message3 = coordinates(message2[1].split(";")[0].replaceAll(", ", " "), {
                x: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("pos:"))
                    ?.split(":")[1] ?? sourceEntity.location.x),
                y: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("pos:"))
                    ?.split(":")[2] ?? sourceEntity.location.y),
                z: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("pos:"))
                    ?.split(":")[3] ?? sourceEntity.location.z),
            }, {
                x: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("rot:"))
                    ?.split(":")[1] ?? sourceEntity.getRotation().x),
                y: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("rot:"))
                    ?.split(":")[2] ?? sourceEntity.getRotation().y),
            });
        }
        if (sourceType == "Server") {
            message3 = coordinates(message2[1].split(";")[0].replaceAll(", ", " "), {
                x: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("pos:"))
                    ?.split(":")[1] ?? 0),
                y: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("pos:"))
                    ?.split(":")[2] ?? 0),
                z: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("pos:"))
                    ?.split(":")[3] ?? 0),
            }, {
                x: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("rot:"))
                    ?.split(":")[1] ?? 0),
                y: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("rot:"))
                    ?.split(":")[2] ?? 0),
            });
        }
        if (sourceType == "Block") {
            message3 = coordinates(message2[1].split(";")[0].replaceAll(", ", " "), {
                x: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("pos:"))
                    ?.split(":")[1] ?? sourceBlock.location.x),
                y: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("pos:"))
                    ?.split(":")[2] ?? sourceBlock.location.y),
                z: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("pos:"))
                    ?.split(":")[3] ?? sourceBlock.location.z),
            }, {
                x: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("rot:"))
                    ?.split(":")[1] ?? 0),
                y: Number(message2[1]
                    .split(";")
                    .find((v) => v.startsWith("rot:"))
                    ?.split(":")[2] ?? 0),
            });
        } /*
        if (String(message2[1]).includes("~")) {
        if (sourceType == "Entity") {message3 = Vector.add(sourceEntity.location, {x: Number(message2[1].split("~")[1]), y: Number(message2[1].split("~")[2]), z: Number(message2[1].split("~")[3])})} else { message3 = Vector.add(sourceBlock.location, {x: Number(message2[1].split("~")[1]), y: Number(message2[1].split("~")[2]), z: Number(message2[1].split("~")[3])}) }
        } else {message3 = {x: Number(message2[1].split(",")[0]), y: Number(message2[1].split(",")[1]), z: Number(message2[1].split(",")[2])}}*/
        let currentMolangVariableMap = new MolangVariableMap();
        for (let index in message2) {
            if (Number(index) < 3) {
            }
            else {
                if (String(message2[index]).startsWith("setFloat:")) {
                    /*
            console.warn("Float")*/
                    try {
                        currentMolangVariableMap.setFloat(message2[index].slice(9).split(":")[0], Number(message2[index].slice(9).split(":")[1]));
                    }
                    catch (e) {
                        console.error(e, e.stack);
                    }
                }
                else {
                    if (String(message2[index]).startsWith("setColorRGB:")) {
                        /*
            console.warn("RGB")*/
                        try {
                            currentMolangVariableMap.setColorRGB(message2[index].slice(12).split(":")[0], {
                                blue: Number(message2[index].slice(12).split(":")[3]),
                                green: Number(message2[index].slice(12).split(":")[2]),
                                red: Number(message2[index].slice(12).split(":")[1]),
                            });
                        }
                        catch (e) {
                            console.error(e, e.stack);
                        }
                    }
                    else {
                        if (String(message2[index]).startsWith("setColorRGBA:")) {
                            /*
            console.warn("RGBA")*/
                            try {
                                currentMolangVariableMap.setColorRGBA(message2[index].slice(13).split(":")[0], {
                                    alpha: Number(message2[index].slice(13).split(":")[4]),
                                    blue: Number(message2[index].slice(13).split(":")[3]),
                                    green: Number(message2[index].slice(13).split(":")[2]),
                                    red: Number(message2[index].slice(13).split(":")[1]),
                                });
                            }
                            catch (e) {
                                console.error(e, e.stack);
                            } /*
            console.warn(message2[index].slice(13).split(":")[0], {alpha: Number(message2[index].slice(13).split(":")[4]), blue: Number(message2[index].slice(13).split(":")[3]), green: Number(message2[index].slice(13).split(":")[2]), red: Number(message2[index].slice(13).split(":")[1])})
            console.warn(message2[index].slice(13).split(":")[0] + "," + Number(message2[index].slice(13).split(":")[4]) + "," + Number(message2[index].slice(13).split(":")[3]) + "," + Number(message2[index].slice(13).split(":")[2]) + "," + Number(message2[index].slice(13).split(":")[1]))*/
                        }
                        else {
                            if (String(message2[index]).startsWith("setVector3:")) {
                                /*
                console.warn("Vector3")*/
                                try {
                                    currentMolangVariableMap.setVector3(message2[index].slice(11).split(":")[0], {
                                        z: Number(message2[index].slice(11).split(":")[3]),
                                        y: Number(message2[index].slice(11).split(":")[2]),
                                        x: Number(message2[index].slice(11).split(":")[1]),
                                    });
                                }
                                catch (e) {
                                    console.error(e, e.stack);
                                }
                            }
                            else {
                                /* console.warn("Other") */
                                if (String(message2[index]).startsWith("f:")) {
                                    /*
                console.warn("Float")*/
                                    try {
                                        currentMolangVariableMap.setFloat(message2[index].slice(2).split(":")[0], Number(message2[index].slice(2).split(":")[1]));
                                    }
                                    catch (e) {
                                        console.error(e, e.stack);
                                    }
                                }
                                else {
                                    if (String(message2[index]).startsWith("rgb:")) {
                                        /*
                console.warn("RGB")*/
                                        try {
                                            currentMolangVariableMap.setColorRGB(message2[index].slice(4).split(":")[0], {
                                                blue: Number(message2[index].slice(4).split(":")[3]),
                                                green: Number(message2[index].slice(4).split(":")[2]),
                                                red: Number(message2[index].slice(4).split(":")[1]),
                                            });
                                        }
                                        catch (e) {
                                            console.error(e, e.stack);
                                        }
                                    }
                                    else {
                                        if (String(message2[index]).startsWith("rgba:")) {
                                            /*
                console.warn("RGBA")*/
                                            try {
                                                currentMolangVariableMap.setColorRGBA(message2[index].slice(5).split(":")[0], {
                                                    alpha: Number(message2[index].slice(5).split(":")[4]),
                                                    blue: Number(message2[index].slice(5).split(":")[3]),
                                                    green: Number(message2[index].slice(5).split(":")[2]),
                                                    red: Number(message2[index].slice(13).split(":")[1]),
                                                });
                                            }
                                            catch (e) {
                                                console.error(e, e.stack);
                                            } /*
                console.warn(message2[index].slice(13).split(":")[0], {alpha: Number(message2[index].slice(13).split(":")[4]), blue: Number(message2[index].slice(13).split(":")[3]), green: Number(message2[index].slice(13).split(":")[2]), red: Number(message2[index].slice(13).split(":")[1])})
                console.warn(message2[index].slice(13).split(":")[0] + "," + Number(message2[index].slice(13).split(":")[4]) + "," + Number(message2[index].slice(13).split(":")[3]) + "," + Number(message2[index].slice(13).split(":")[2]) + "," + Number(message2[index].slice(13).split(":")[1]))*/
                                        }
                                        else {
                                            if (String(message2[index]).startsWith("v3:")) {
                                                /*
                    console.warn("Vector3")*/
                                                try {
                                                    currentMolangVariableMap.setVector3(message2[index].slice(3).split(":")[0], {
                                                        z: Number(message2[index].slice(3).split(":")[3]),
                                                        y: Number(message2[index].slice(3).split(":")[2]),
                                                        x: Number(message2[index].slice(3).split(":")[1]),
                                                    });
                                                }
                                                catch (e) {
                                                    console.error(e, e.stack);
                                                }
                                            }
                                            else {
                                                /* console.warn("Other") */
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } /*
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]); } catch(e){console.error(e, e.stack);}
        try {blockStatesFullList = String([String(blockStatesFullList), block.block.permutation.getAllStates()]).split(","); } catch(e){console.error(e, e.stack);}*/
        try {
            world.getDimension(message2[2]).spawnParticle(message2[0], message3, currentMolangVariableMap);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
});
//# sourceMappingURL=scriptEventReceive.js.map