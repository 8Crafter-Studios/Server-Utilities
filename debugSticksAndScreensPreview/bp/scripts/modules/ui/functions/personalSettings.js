import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
/**
 * Displays and handles the personal settings form for a player.
 *
 * @param sourceEntitya - The entity or player invoking the settings. Can be of type `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `-2` if an error occurs,
 * - `0` if the user cancels the form,
 * - `1` if the form is successfully submitted.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled and if the player has the necessary permissions to access the settings.
 * 2. Displays a modal form with various personal settings fields.
 * 3. Handles the form submission, updating the player's dynamic properties based on the form values.
 * 4. Returns the appropriate status code based on the outcome.
 */
export async function personalSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessPersonalSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessPersonalSettings", "Back", "Cancel");
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
    form2.title("Personal Settings");
    form2.textField("§l§fTime Zone§r§f\nTime zone as hour for difference from UTC (decimals are allowed), the default is 0. ", "number", String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? 0));
    form2.textField("§l§fchatRankPrefix§r§f\nPrefix for your chat ranks, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix")
        ? undefined
        : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatRankPrefix") ?? "rank:"));
    form2.textField("§l§fchatSudoPrefix§r§f\nPrefix for your custom chat names, default is undefined:", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix")
        ? undefined
        : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatSudoPrefix") ?? "sudo:"));
    form2.textField("§l§frankDisplayPrefix§r§f\nPrefix that appears before your chat ranks in your chat messages, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix")
        ? undefined
        : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix") ?? "["));
    form2.textField("§l§frankDisplaySuffix§r§f\nSuffix that appears after your chat ranks in your chat messages, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix")
        ? undefined
        : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix") ?? "§r§f]"));
    form2.textField("§l§frankDisplaySeparator§r§f\nSeparator that appears between your ranks, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplaySeparator")
        ? undefined
        : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:rankDisplaySeparator") ?? " "));
    form2.textField("§l§fnameDisplayPrefix§r§f\nPrefix that appears before your names in your chat messages, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix")
        ? undefined
        : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix") ?? "<"));
    form2.textField("§l§fnameDisplaySuffix§r§f\nSuffix that appears after your names in your chat messages, default is undefined", "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix")
        ? undefined
        : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix") ?? "§r§f>"));
    form2.textField('§l§fchatNameAndMessageSeparator§r§f\nSeparator that appears between your name and and your chat message, default is " "', "string", !!!sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator")
        ? undefined
        : String(sourceEntity.getDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator") ?? " "));
    form2.toggle("§l§fdoNotSetNameTag§r§f\nStops your name tag from having chat ranks added to it, this is usefull if you want to change your name tag, since otherwise it would keep resetting your name tag, default is false", sourceEntity.hasTag("doNotSetNameTag"));
    form2.textField("§l§fdebugStickUseCooldown§r§f\nCooldown between changing the block state of a block with a debug stick after you have just changed that state on the same block, default is 4", "number; default: 4", !!!sourceEntity.getDynamicProperty("debugStickUseCooldown")
        ? undefined
        : String(sourceEntity.getDynamicProperty("debugStickUseCooldown") ?? 4));
    form2.textField("§l§fdebugStickHoldDuration§r§f\nTime after the actionbar for changing a block state with the debug stick appears before the actionbar can be changed again, default is 10", "number; default: 10", !!!sourceEntity.getDynamicProperty("debugStickHoldDuration")
        ? undefined
        : String(sourceEntity.getDynamicProperty("debugStickHoldDuration") ??
            10)); /*
    form2.textField("§l§fvalidChatCommandPrefixes§r§f\nList of valid prefixes for chat commands, use this if you have other add-ons with chat commands in them active, messages that start with any of these will not be sent and will not be modified by this add-on so it will work for you other packs, default is blank", "Comma-Separated List of Strings", String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? ""));
    form2.textField("§l§fchatRankPrefix§r§f\nPrefix for chat ranks, default is rank:", "string", String(world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:"));
    form2.textField("§l§fchatSudoPrefix§r§f\nPrefix for custom chat names, default is sudo:", "string", String(world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:"));
    form2.textField("§l§fgametestStructureDefaultSpawnLocation§r§f\nThe default spawn locations for the gametest structure, this is used when spawning in no ai entities or spawning in simulated player", "x, y, z", Object.values(world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") ?? {}).join(", "));
    form2.toggle("§l§fchatCommandsEnbaled§r§f\nSets whether or not to enable the chat commands, default is true", Boolean(world.getDynamicProperty("andexdbSettings:chatCommandsEnbaled") ?? true));
    form2.toggle("§l§fdisableCustomChatMessages§r§f\nDisables the chat ranks and custom chat names, default is false", Boolean(world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false));
    form2.toggle("§l§fsendMessageOnInvalidChatCommand§r§f\nMakes the chat command still send as a chat message if that specific chat command does not exist, default is false", Boolean(world.getDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand") ?? false));
    form2.toggle("§l§fallowCustomChatMessagesMuting§r§f\nAllows the chat mute button to work on the custom chat messages by using the /tellraw command instead of the world.sendMessage() function, a side-effect of this is that it will cause a 1 tick delay in chat messages, default is false", Boolean(world.getDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting") ?? false));
    form2.toggle("§l§fautoEscapeChatMessages§r§f\nEvaluates escape codes in the chat automatically, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false));
    form2.toggle("§l§fautoURIEscapeChatMessages§r§f\nSets whether or not to automatically escape URI % escape codes, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false));
    form2.toggle("§l§fallowChatEscapeCodes§r§f\nSets whether or not to allow for escape codes in chat, default is true", Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? true));
    form2.toggle("§l§fautoSavePlayerData§r§f\nSets whether or not to automatically save player data, default is true", Boolean(world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ?? true));*/
    form2.submitButton("Save");
    return await forceShow(form2, sourceEntity)
        .then((to) => {
        let t = to;
        if (t.canceled) {
            return 1;
        } /*
GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
            ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
        let [timeZone, chatRankPrefix, chatSudoPrefix, rankDisplayPrefix, rankDisplaySuffix, rankDisplaySeparator, nameDisplayPrefix, nameDisplaySuffix, chatNameAndMessageSeparator, doNotSetNameTag, debugStickUseCooldown, debugStickHoldDuration,] = t.formValues;
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:timeZone", timeZone == "" ? undefined : timeZone);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:chatRankPrefix", chatRankPrefix == "" ? undefined : chatRankPrefix);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:chatSudoPrefix", chatSudoPrefix == "" ? undefined : chatSudoPrefix);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:rankDisplayPrefix", rankDisplayPrefix == "" ? undefined : rankDisplayPrefix);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:rankDisplaySuffix", rankDisplaySuffix == "" ? undefined : rankDisplaySuffix);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:rankDisplaySeparator", rankDisplaySeparator == "" ? undefined : rankDisplaySeparator);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:nameDisplayPrefix", nameDisplayPrefix == "" ? undefined : nameDisplayPrefix);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:nameDisplaySuffix", nameDisplaySuffix == "" ? undefined : nameDisplaySuffix);
        sourceEntity.setDynamicProperty("andexdbPersonalSettings:chatNameAndMessageSeparator", chatNameAndMessageSeparator == ""
            ? undefined
            : chatNameAndMessageSeparator);
        doNotSetNameTag
            ? tryrun(() => {
                sourceEntity.removeTag("doNotSetNameTag");
            })
            : tryrun(() => {
                sourceEntity.addTag("doNotSetNameTag");
            });
        sourceEntity.setDynamicProperty("debugStickUseCooldown", debugStickUseCooldown == "" ? undefined : debugStickUseCooldown);
        sourceEntity.setDynamicProperty("debugStickHoldDuration", debugStickHoldDuration == ""
            ? undefined
            : debugStickHoldDuration); /*
world.setDynamicProperty("andexdbSettings:validChatCommandPrefixes", validChatCommandPrefixes)
world.setDynamicProperty("andexdbSettings:chatRankPrefix", chatRankPrefix)
world.setDynamicProperty("andexdbSettings:chatSudoPrefix", chatSudoPrefix)
if(String(gametestStructureDefaultSpawnLocation) != ""){world.setDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation", {x: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[0]), y: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[1]), z: Number(String(gametestStructureDefaultSpawnLocation).split(", ")[2])})}
world.setDynamicProperty("andexdbSettings:chatCommandsEnbaled", chatCommandsEnbaled)
world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages)
world.setDynamicProperty("andexdbSettings:sendMessageOnInvalidChatCommand", sendMessageOnInvalidChatCommand)
world.setDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting", allowCustomChatMessagesMuting)
world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages)
world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages)
world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes)
world.setDynamicProperty("andexdbSettings:autoSavePlayerData", autoSavePlayerData)*/
        return 1;
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=personalSettings.js.map