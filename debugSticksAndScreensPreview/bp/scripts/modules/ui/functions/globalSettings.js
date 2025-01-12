import { Entity, Player, world } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { settings } from "./settings";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
export async function globalSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form2 = new ModalFormData();
    ("andexdbSettings:autoEscapeChatMessages");
    ("andexdbSettings:autoURIEscapeChatMessages");
    ("andexdbSettings:allowChatEscapeCodes");
    form2.title("Global Settings");
    form2.textField("§l§fchatCommandPrefix§r§f\nThis is what you type before a chat command, the default is \\. ", "string", String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\"));
    form2.textField("§l§fvalidChatCommandPrefixes§r§f\nList of valid prefixes for chat commands, use this if you have other add-ons with chat commands in them active, messages that start with any of these will not be sent and will not be modified by this add-on so it will work for you other packs, default is blank", "Comma-Separated List of Strings", String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? ""));
    form2.textField("§l§fchatRankPrefix§r§f\nPrefix for chat ranks, default is rank:", "string", String(world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:"));
    form2.textField("§l§fchatSudoPrefix§r§f\nPrefix for custom chat names, default is sudo:", "string", String(world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:")); /*
    form2.textField("§l§frankDisplayPrefix§r§f\nPrefix that appears before chat ranks in chat messages, default is \"[\"", "string", String(world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "["));
    form2.textField("§l§frankDisplaySuffix§r§f\nSuffix that appears after chat ranks in chat messages, default is \"\uF019r]\"", "string", String(world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "§r§f]"));
    form2.textField("§l§frankDisplaySeparator§r§f\nSeparator that appears between ranks, default is \" \"", "string", String(world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ?? " "));
    form2.textField("§l§fnameDisplayPrefix§r§f\nPrefix that appears before player's names in chat messages, default is \"<\"", "string", String(world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "<"));
    form2.textField("§l§fnameDisplaySuffix§r§f\nSuffix that appears after player's names in chat messages, default is \"\uF019r>\"", "string", String(world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r§f>"));
    form2.textField("§l§fchatNameAndMessageSeparator§r§f\nSeparator that appears between player's names and player's chat messages, default is \" \"", "string", String(world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "));*/
    form2.textField("§l§fgametestStructureDefaultSpawnLocation§r§f\nThe default spawn location for the gametest structures, this is used when spawning in no ai entities or spawning in simulated players", "x y z", cullEmpty([
        (world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") ?? {})["x"],
        (world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") ?? {})["y"],
        (world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") ?? {})["z"],
    ]).join(" "));
    form2.textField("§l§fspawnCommandLocation§r§f\nThe location to teleport players when they use the \\spawn command, it is a list of coordinates separated by spaces, leaving it blank will disable the spawn command", "x y z", cullEmpty([config.spawnCommandLocation.x, config.spawnCommandLocation.y, config.spawnCommandLocation.z]).join(" "));
    form2.dropdown("§l§fspawnCommandDimension§r§f\nThe dimension to teleport players when they use the \\spawn command, it is a list of coordinates separated by spaces, the default is overworld", ["§aOverworld", "§cNether", "§dThe End"], dimensionsd.indexOf(config.spawnCommandLocation.dimension.id));
    form2.textField("§l§fpvpCooldownToTeleport§r§f\nHow long in seconds after getting damaged by another player that the player has to wait before they can teleport with commands such as \\spawn, \\home, \\gohome, \\tpa, and \\rtp, the default is 0", "x y z", config.pvpCooldownToTeleport.toString());
    form2.dropdown("§l§finvalidChatCommandAction§r§f\nWhat to do when a chat command is typed that does not exist, or that the player does not have permission to use. ", ["Do Nothing", "Send Message", "Cancel Message", "Warn Player"], Number(world.getDynamicProperty("andexdbSettings:invalidChatCommandAction") ?? 3));
    form2.toggle("§l§fchatCommandsEnbaled§r§f\nSets whether or not to enable the chat commands, default is true", config.chatCommandsEnabled); /*
    form2.toggle("§l§fautoEscapeChatMessages§r§f\nEvaluates escape codes in the chat automatically, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false));
    form2.toggle("§l§fautoURIEscapeChatMessages§r§f\nSets whether or not to automatically escape URI % escape codes, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false));
    form2.toggle("§l§fallowChatEscapeCodes§r§f\nSets whether or not to allow for escape codes in chat, default is true", Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? true));
    form2.toggle("§l§fchatDisplayTimeStamp§r§f\nSets whether or not to put a timestamp before every chat message, default is false", config.chatRanks.chatDisplayTimeStamp);*/
    form2.toggle("§l§fautoSavePlayerData§r§f\nSets whether or not to automatically save player data, default is true", Boolean(world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ?? true));
    form2.toggle("§l§fplayerInventoryDataSaveSystemEnabled§r\nWhether or not to save the player's inventory data when saving player data, disabling this will result in being unable to check the inventories of offline players, this only applies when §bautoSavePlayerData§r is enabled, the default is true", config.system.playerInventoryDataSaveSystemEnabled);
    form2.toggle("§l§fuseLegacyPlayerInventoryDataSaveSystem§r\nWhether or not to use the pre-1.26 player inventory data save system, enabling this will result in only being able to see general details about the items that were in an offline player's inventory, as well as increasing lag, this only applies when §bautoSavePlayerData§r and §bplayerInventoryDataSaveSystemEnabled§r are enabled, the default is false", config.system.useLegacyPlayerInventoryDataSaveSystem);
    form2.submitButton("Save");
    return await forceShow(form2, sourceEntity)
        .then((to) => {
        let t = to;
        if (t.canceled) {
            return 1;
        } /*
GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
            ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
        let [chatCommandPrefix, validChatCommandPrefixes, chatRankPrefix, chatSudoPrefix /*, rankDisplayPrefix, rankDisplaySuffix, rankDisplaySeparator, nameDisplayPrefix, nameDisplaySuffix, chatNameAndMessageSeparator*/, gametestStructureDefaultSpawnLocation, spawnCommandLocation, spawnCommandDimension, pvpCooldownToTeleport, invalidChatCommandAction, chatCommandsEnbaled /*, disableCustomChatMessages, allowCustomChatMessagesMuting*/ /*, autoEscapeChatMessages, autoURIEscapeChatMessages, allowChatEscapeCodes*/ /*, chatDisplayTimeStamp*/, autoSavePlayerData, playerInventoryDataSaveSystemEnabled, useLegacyPlayerInventoryDataSaveSystem, bepl, beppb, aebe, aepl,] = t.formValues;
        world.setDynamicProperty("andexdbSettings:chatCommandPrefix", chatCommandPrefix);
        world.setDynamicProperty("andexdbSettings:validChatCommandPrefixes", validChatCommandPrefixes);
        world.setDynamicProperty("andexdbSettings:chatRankPrefix", chatRankPrefix);
        world.setDynamicProperty("andexdbSettings:chatSudoPrefix", chatSudoPrefix); /*
world.setDynamicProperty("andexdbSettings:rankDisplayPrefix", rankDisplayPrefix)
world.setDynamicProperty("andexdbSettings:rankDisplaySuffix", rankDisplaySuffix)
world.setDynamicProperty("andexdbSettings:rankDisplaySeparator", rankDisplaySeparator)
world.setDynamicProperty("andexdbSettings:nameDisplayPrefix", nameDisplayPrefix)
world.setDynamicProperty("andexdbSettings:nameDisplaySuffix", nameDisplaySuffix)
world.setDynamicProperty("andexdbSettings:chatNameAndMessageSeparator", chatNameAndMessageSeparator)*/
        if (String(gametestStructureDefaultSpawnLocation) != "") {
            world.setDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation", {
                x: Number(String(gametestStructureDefaultSpawnLocation).split(" ")[0]),
                y: Number(String(gametestStructureDefaultSpawnLocation).split(" ")[1]),
                z: Number(String(gametestStructureDefaultSpawnLocation).split(" ")[2]),
            });
        }
        config.spawnCommandLocation = {
            x: spawnCommandLocation.split(" ")[0] == "" || !!!spawnCommandLocation.split(" ")[0]
                ? null
                : Number(spawnCommandLocation.split(" ")[0]),
            y: spawnCommandLocation.split(" ")[1] == "" || !!!spawnCommandLocation.split(" ")[1]
                ? null
                : Number(spawnCommandLocation.split(" ")[1]),
            z: spawnCommandLocation.split(" ")[2] == "" || !!!spawnCommandLocation.split(" ")[2]
                ? null
                : Number(spawnCommandLocation.split(" ")[2]),
            dimension: dimensions[spawnCommandDimension],
        };
        config.pvpCooldownToTeleport = pvpCooldownToTeleport == "" ? 0 : pvpCooldownToTeleport.toNumber() ?? 0;
        config.chatCommandsEnabled = chatCommandsEnbaled; /*
world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages)*/
        world.setDynamicProperty("andexdbSettings:invalidChatCommandAction", invalidChatCommandAction); /*
world.setDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting", allowCustomChatMessagesMuting)
world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages)
world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages)
world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes)
world.setDynamicProperty("andexdbSettings:chatDisplayTimeStamp", chatDisplayTimeStamp)*/
        world.setDynamicProperty("andexdbSettings:autoSavePlayerData", autoSavePlayerData);
        config.system.playerInventoryDataSaveSystemEnabled = playerInventoryDataSaveSystemEnabled;
        config.system.useLegacyPlayerInventoryDataSaveSystem = useLegacyPlayerInventoryDataSaveSystem;
        return 1;
    })
        .catch((e) => {
        console.error(e, e.stack);
        return 0;
    });
}
//# sourceMappingURL=globalSettings.js.map