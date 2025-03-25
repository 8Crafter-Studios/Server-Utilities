import { ModalFormData } from "@minecraft/server-ui";
import "init/classes/config";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { vTStr } from "modules/commands/functions/vTStr";
import { customFormUICodes } from "../constants/customFormUICodes";
/**
 * Displays and handles the general settings form for a given entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export async function generalSettings(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(player, "andexdb.accessSettings") == false) {
                const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
                if (r.canceled || r.selection == 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
        const debugModeEnabled = config.system.debugMode;
        const includedOptions = cullUndefined([
            "chatCommandPrefix",
            "validChatCommandPrefixes",
            "chatRankPrefix",
            "chatSudoPrefix",
            "gametestStructureDefaultSpawnLocation",
            "spawnCommandLocation",
            "spawnCommandDimension",
            "invalidChatCommandAction",
            "chatCommandsEnabled",
            "autoSavePlayerData",
            "playerInventoryDataSaveSystemEnabled",
            debugModeEnabled ? "useLegacyPlayerInventoryDataSaveSystem" : undefined,
        ]);
        const form = new ModalFormData();
        form.title(customFormUICodes.modal.titles.formStyles.medium + "General Settings");
        const formOptionsMap = {
            chatCommandPrefix: () => form.textField("§l§fchatCommandPrefix§r§f\nThis is what you type before a chat command, the default is \\. ", "string", config.chatCommandPrefix),
            validChatCommandPrefixes: () => form.textField("§l§fvalidChatCommandPrefixes§r§f\nList of valid prefixes for chat commands, use this if you have other add-ons with chat commands in them active, messages that start with any of these will not be sent and will not be modified by this add-on so it will work for you other packs, default is blank", "Comma-Separated List of Strings", config.validChatCommandPrefixes),
            chatRankPrefix: () => form.textField("§l§fchatRankPrefix§r§f\nPrefix for chat ranks, default is rank:", "string", config.chatRanks.chatRankPrefix),
            chatSudoPrefix: () => form.textField("§l§fchatSudoPrefix§r§f\nPrefix for custom chat names, default is sudo:", "string", config.chatRanks.chatSudoPrefix),
            gametestStructureDefaultSpawnLocation: () => form.textField("§l§fgametestStructureDefaultSpawnLocation§r§f\nThe default spawn location for the gametest structures, this is used when spawning in no AI entities and simulated players", "x y z", vTStr(config.gametestStructureDefaultSpawnLocation)),
            spawnCommandLocation: () => form.textField("§l§fspawnCommandLocation§r§f\nThe location to teleport players when they use the \\spawn command, it is a list of coordinates separated by spaces, leaving it blank will disable the spawn command", "x y z", cullEmpty([config.spawnCommandLocation.x, config.spawnCommandLocation.y, config.spawnCommandLocation.z]).join(" ")),
            spawnCommandDimension: () => form.dropdown("§l§fspawnCommandDimension§r§f\nThe dimension to teleport players when they use the \\spawn command, it is a list of coordinates separated by spaces, the default is overworld", ["§aOverworld", "§cNether", "§dThe End"], dimensionsd.indexOf(config.spawnCommandLocation.dimension.id)),
            invalidChatCommandAction: () => form.dropdown("§l§finvalidChatCommandAction§r§f\nWhat to do when a chat command is typed that does not exist, or that the player does not have permission to use. ", ["Do Nothing", "Send Message", "Cancel Message", "Warn Player"], config.invalidChatCommandAction),
            chatCommandsEnabled: () => form.toggle("§l§fchatCommandsEnabled§r§f\nSets whether or not to enable the chat commands, default is true", config.chatCommandsEnabled),
            autoSavePlayerData: () => form.toggle("§l§fautoSavePlayerData§r§f\nSets whether or not to automatically save player data, if playerInventoryDataSaveSystemEnabled is disabled then disabling this will have little to no performance improvement, so it is recommended to leave this enabled, if you need better performance just disable the playerInventoryDataSaveSystemEnabled option, default is true", config.system.autoSavePlayerData),
            playerInventoryDataSaveSystemEnabled: () => form.toggle("§l§fplayerInventoryDataSaveSystemEnabled§r\nWhether or not to save the player's inventory data when saving player data, disabling this will improve performance but will result in being unable to check the inventories of offline players, this only applies when §bautoSavePlayerData§r is enabled, the default is true", config.system.playerInventoryDataSaveSystemEnabled),
            useLegacyPlayerInventoryDataSaveSystem: () => form.toggle("§l§cuseLegacyPlayerInventoryDataSaveSystem§r§c (Only visible in debug mode)\nWhether or not to use the pre-1.26 player inventory data save system, enabling this will result in only being able to see general details about the items that were in an offline player's inventory, as well as increasing lag, this only applies when §bautoSavePlayerData§r and §bplayerInventoryDataSaveSystemEnabled§r are enabled, the default is false", config.system.useLegacyPlayerInventoryDataSaveSystem),
        };
        includedOptions.forEach((o) => formOptionsMap[o]());
        // ("andexdbSettings:autoEscapeChatMessages");
        // ("andexdbSettings:autoURIEscapeChatMessages");
        // ("andexdbSettings:allowChatEscapeCodes");
        /* form2.textField("§l§frankDisplayPrefix§r§f\nPrefix that appears before chat ranks in chat messages, default is \"[\"", "string", String(world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "["));
        form2.textField("§l§frankDisplaySuffix§r§f\nSuffix that appears after chat ranks in chat messages, default is \"\uF019r]\"", "string", String(world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "§r§f]"));
        form2.textField("§l§frankDisplaySeparator§r§f\nSeparator that appears between ranks, default is \" \"", "string", String(world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ?? " "));
        form2.textField("§l§fnameDisplayPrefix§r§f\nPrefix that appears before player's names in chat messages, default is \"<\"", "string", String(world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "<"));
        form2.textField("§l§fnameDisplaySuffix§r§f\nSuffix that appears after player's names in chat messages, default is \"\uF019r>\"", "string", String(world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r§f>"));
        form2.textField("§l§fchatNameAndMessageSeparator§r§f\nSeparator that appears between player's names and player's chat messages, default is \" \"", "string", String(world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "));*/
        /*
        form2.toggle("§l§fautoEscapeChatMessages§r§f\nEvaluates escape codes in the chat automatically, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false));
        form2.toggle("§l§fautoURIEscapeChatMessages§r§f\nSets whether or not to automatically escape URI % escape codes, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false));
        form2.toggle("§l§fallowChatEscapeCodes§r§f\nSets whether or not to allow for escape codes in chat, default is true", Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? true));
        form2.toggle("§l§fchatDisplayTimeStamp§r§f\nSets whether or not to put a timestamp before every chat message, default is false", config.chatRanks.chatDisplayTimeStamp);*/
        form.submitButton("Save");
        const r = await form.forceShow(player);
        if (r.canceled) {
            return 1;
        }
        const optionsRequiringRestartToApplyProperly = [];
        const options = Object.fromEntries(includedOptions.map((o, i) => [o, r.formValues[i]]));
        includedOptions.forEach((v) => {
            switch (v) {
                case "autoSavePlayerData":
                    if (options[v] !== config.system.autoSavePlayerData) {
                        optionsRequiringRestartToApplyProperly.push("autoSavePlayerData");
                    }
                    config.system.autoSavePlayerData = options[v];
                    break;
                case "chatCommandPrefix":
                    config.chatCommandPrefix = options[v];
                    break;
                case "chatCommandsEnabled":
                    config.chatCommandsEnabled = options[v];
                    break;
                case "chatRankPrefix":
                    config.chatRanks.chatRankPrefix = options[v];
                    break;
                case "chatSudoPrefix":
                    config.chatRanks.chatSudoPrefix = options[v];
                    break;
                case "gametestStructureDefaultSpawnLocation":
                    config.gametestStructureDefaultSpawnLocation = {
                        x: options[v].split(" ")[0]?.toNumber(),
                        y: options[v].split(" ")[1]?.toNumber(),
                        z: options[v].split(" ")[2]?.toNumber(),
                    };
                    break;
                case "invalidChatCommandAction":
                    config.invalidChatCommandAction = options[v];
                    break;
                case "playerInventoryDataSaveSystemEnabled":
                    config.system.playerInventoryDataSaveSystemEnabled = options[v];
                    break;
                case "spawnCommandDimension":
                    config.spawnCommandLocation = { ...config.spawnCommandLocation, dimension: dimensions[options[v]] };
                    break;
                case "spawnCommandLocation":
                    config.spawnCommandLocation = {
                        ...config.spawnCommandLocation,
                        x: options[v].split(" ")[0]?.toNumber(),
                        y: options[v].split(" ")[1]?.toNumber(),
                        z: options[v].split(" ")[2]?.toNumber(),
                    };
                    break;
                case "useLegacyPlayerInventoryDataSaveSystem":
                    if (debugModeEnabled) {
                        config.system.useLegacyPlayerInventoryDataSaveSystem = options[v];
                        optionsRequiringRestartToApplyProperly.push("useLegacyPlayerInventoryDataSaveSystem");
                    }
                    else {
                        throw new Error(`The useLegacyPlayerInventoryDataSaveSystem setting can is only supposed to be changed in debug mode.`);
                    }
                    break;
                case "validChatCommandPrefixes":
                    config.validChatCommandPrefixes = options[v];
                    break;
                default:
                    throw new Error(`Save action for setting ${JSON.stringify(v)} was not defined.`);
            }
        });
        if (optionsRequiringRestartToApplyProperly.length > 0) {
            const r = await showMessage(player, "Restart Required", `The following settings require a restart of this world/server/realm to apply properly: ${optionsRequiringRestartToApplyProperly.join(", ")}.\nIf you are on a realm or do not have access to the /reload command, please click the restart button below. Otherwise, run the /reload command.`, "Cancel", "Restart");
            if (r.selection === 1) {
                let buffer = new ArrayBuffer(250000000); // Uses all of the currently available scripting memory, forcefully shutting down the world/realm/server.
            }
        }
        return 1;
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
//# sourceMappingURL=generalSettings.js.map