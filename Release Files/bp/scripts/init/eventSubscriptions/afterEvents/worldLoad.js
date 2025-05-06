import { world, system } from "@minecraft/server";
import { checkIfCompatibleBlueModsAnticheatIsActive } from "modules/main/functions/checkIfCompatibleBlueModsAnticheatIsActive";
import { checkIfCompatibleEntityScaleIsActive } from "modules/main/functions/checkIfCompatibleEntityScaleIsActive";
subscribedEvents.afterWorldLoad =
    world.afterEvents.worldLoad.subscribe(async (event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:worldLoad")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("worldLoadAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:worldInitialize")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("worldInitializeAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
        try {
            if (world.scoreboard.getObjective("andexdbDebug") == undefined) {
                world.scoreboard.addObjective("andexdbDebug", "andexdbScriptDebuggingService");
            }
        }
        catch (e) { }
        try {
            if (world.scoreboard.getObjective("andexdb:money") == undefined) {
                world.scoreboard.addObjective("andexdb:money", "Money");
            }
        }
        catch (e) { }
        globalThis.initializeTick = system.currentTick;
        if (config.system.allowConnectingToEntityScale) {
            try {
                const r = await checkIfCompatibleEntityScaleIsActive(true, 5);
                if (r != false) {
                    if (entity_scale_format_version != null &&
                        r.trim() != entity_scale_format_version) {
                        globalThis.multipleEntityScaleVersionsDetected = true;
                    }
                    entity_scale_format_version = r.trim();
                }
                if (r == false && config.system.showEntityScaleNotFoundConsoleLog) {
                    system.waitTicks(100).then(() => {
                        if (entity_scale_format_version == null)
                            console.warn(`§r<§b8Crafter's Server Utilities§r[§gv${format_version}§r]> No compatible version of entity scale was detected, some features may not be available.`);
                    });
                }
                else if (r != false &&
                    config.system.showEntityScaleFoundConsoleLog) {
                    console.warn(`§r<§b8Crafter's Server Utilities§r[§gv${format_version}§r]> A compatible version of entity scale was detected: ${entity_scale_format_version}.`);
                }
                if (r == false && config.system.showEntityScaleNotFoundChatLog) {
                    system.waitTicks(100).then(() => {
                        if (entity_scale_format_version == null)
                            world.sendMessage(`§r<§b8Crafter's Server Utilities§r[§gv${format_version}§r]> No compatible version of entity scale was detected, some features may not be available.`);
                    });
                }
                else if (r != false &&
                    config.system.showEntityScaleFoundChatLog) {
                    world.sendMessage(`§r<§b8Crafter's Server Utilities§r[§gv${format_version}§r]> A compatible version of entity scale was detected: ${entity_scale_format_version}.`);
                }
            }
            catch (e) {
                console.error(e, e.stack);
            }
        }
        if (config.system.allowConnectingToBlueModsAnticheat) {
            try {
                const r = await checkIfCompatibleBlueModsAnticheatIsActive(true, 5);
                if (r != false) {
                    if (bluemods_anticheat_format_version != null &&
                        r.trim() != bluemods_anticheat_format_version) {
                        globalThis.multipleBlueModsAnticheatVersionsDetected = true;
                    }
                    bluemods_anticheat_format_version = r.trim();
                }
                if (r == false && config.system.showBlueModsAnticheatNotFoundConsoleLog) {
                    system.waitTicks(100).then(() => {
                        if (bluemods_anticheat_format_version == null)
                            console.warn(`§r<§b8Crafter's Server Utilities§r[§gv${format_version}§r]> No compatible version of BlueMods Anticheat was detected, some features may not be available.`);
                    });
                }
                else if (r != false &&
                    config.system.showBlueModsAnticheatFoundConsoleLog) {
                    console.warn(`§r<§b8Crafter's Server Utilities§r[§gv${format_version}§r]> A compatible version of BlueMods Anticheat was detected: ${bluemods_anticheat_format_version}.`);
                }
                if (r == false && config.system.showBlueModsAnticheatNotFoundChatLog) {
                    system.waitTicks(100).then(() => {
                        if (bluemods_anticheat_format_version == null)
                            world.sendMessage(`§r<§b8Crafter's Server Utilities§r[§gv${format_version}§r]> No compatible version of BlueMods Anticheat was detected, some features may not be available.`);
                    });
                }
                else if (r != false &&
                    config.system.showBlueModsAnticheatFoundChatLog) {
                    world.sendMessage(`§r<§b8Crafter's Server Utilities§r[§gv${format_version}§r]> A compatible version of BlueMods Anticheat was detected: ${bluemods_anticheat_format_version}.`);
                }
            }
            catch (e) {
                console.error(e, e.stack);
            }
        } /*
    try{DimensionTypes.getAll().forEach((dimensionType)=>{if (world.getDimension(dimensionType.typeId).getEntities({scoreOptions: [{objective: "andexdbDebug", exclude: true, minScore: -99999999, maxScore: 99999999}]}) !== undefined){world.getDimension(dimensionType.typeId).getEntities({scoreOptions: [{objective: "andexdbDebug", exclude: true, minScore: -99999999, maxScore: 99999999}]}).forEach((scoreboardEntity)=>{scoreboardEntity.runCommand("/scoreboard players @s set andexdbDebug 0")})}})}catch(e){}
    try{DimensionTypes.getAll().forEach((dimensionType)=>{world.getDimension(dimensionType.typeId).getEntities().forEach((scoreboardEntity)=>{if(world.getDimension(dimensionType.typeId).getEntities({scoreOptions: [{objective: "andexdbDebug", minScore: -99999999, maxScore: 99999999}]}).find((testEntity)=>(scoreboardEntity == testEntity)) == undefined){console.warn(scoreboardEntity.id)}})})}catch(e){}*/ /*
            const propertiesDefinition = new DynamicPropertiesDefinition();
            propertiesDefinition.defineString('blockTransferPreset0', 10000);
            event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinition, EntityTypes.get("player"));
            const propertiesDefinition1 = new DynamicPropertiesDefinition();
            propertiesDefinition1.defineString('blockTransferPreset1', 10000);
            event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinition1, EntityTypes.get("player"));
            const propertiesDefinition2 = new DynamicPropertiesDefinition();
            propertiesDefinition2.defineString('blockTransferPreset2', 10000);
            event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinition2, EntityTypes.get("player"));
            const propertiesDefinition3 = new DynamicPropertiesDefinition();
            propertiesDefinition3.defineString('blockTransferPreset3', 10000);
            event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinition3, EntityTypes.get("player"));
            const propertiesDefinition4 = new DynamicPropertiesDefinition();
            propertiesDefinition4.defineString('blockTransferPreset4', 10000);
            event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinition4, EntityTypes.get("player"));
            const propertiesDefinition5 = new DynamicPropertiesDefinition();
            propertiesDefinition5.defineString('blockTransferPreset5', 10000);
            event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinition5, EntityTypes.get("player"));
            const propertiesDefinitionWarpList = new DynamicPropertiesDefinition();
            propertiesDefinitionWarpList.defineString('warpList', 10000, "");
            event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinitionWarpList, EntityTypes.get("player"));
            const propertiesDefinitionDefaultBlockTransferPresetNum = new DynamicPropertiesDefinition();
            propertiesDefinitionDefaultBlockTransferPresetNum.defineNumber('blockTransferPresetTypeSelectionDefault', 0);
            event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinitionDefaultBlockTransferPresetNum, EntityTypes.get("player"));
            const propertiesDefinitionDefaultBlockTransferPresetNum2 = new DynamicPropertiesDefinition();
            propertiesDefinitionDefaultBlockTransferPresetNum2.defineNumber('blockTransferPresetTypeSelectionDefault2', 0);
            event.propertyRegistry.registerEntityTypeDynamicProperties(propertiesDefinitionDefaultBlockTransferPresetNum2, EntityTypes.get("player"));
            const propertiesDefinitionCustomSimulatedPlayerNameValue = new DynamicPropertiesDefinition();
            propertiesDefinitionCustomSimulatedPlayerNameValue.defineString('customSimulatedPlayerName', 10000, "Steve");
            event.propertyRegistry.registerWorldDynamicProperties(propertiesDefinitionCustomSimulatedPlayerNameValue);
            const propertiesDefinitionSpawnWithoutBehaviorsLocation = new DynamicPropertiesDefinition();
            propertiesDefinitionSpawnWithoutBehaviorsLocation.defineString('spawnWithoutBehaviorsLocation', 10000, "0, 0, 0");
            event.propertyRegistry.registerWorldDynamicProperties(propertiesDefinitionSpawnWithoutBehaviorsLocation);
            const propertiesDefinitionSpawnWithoutBehaviorsType = new DynamicPropertiesDefinition();
            propertiesDefinitionSpawnWithoutBehaviorsType.defineString('spawnWithoutBehaviorsType', 10000, "minecraft:sheep");
            event.propertyRegistry.registerWorldDynamicProperties(propertiesDefinitionSpawnWithoutBehaviorsType);
            const propertiesDefinitionWarpListGlobalValues = new DynamicPropertiesDefinition();
            propertiesDefinitionWarpListGlobalValues.defineString('globalWarpListValues', 10000);
            event.propertyRegistry.registerWorldDynamicProperties(propertiesDefinitionWarpListGlobalValues);*/
    });
//# sourceMappingURL=worldLoad.js.map