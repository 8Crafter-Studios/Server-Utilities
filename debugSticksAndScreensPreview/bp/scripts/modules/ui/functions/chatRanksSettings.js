import { Entity, Player, world } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { rankModes } from "./rankModes";
import { rankModesArray } from "./rankModesArray";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
/**
 * Displays and handles the chat ranks settings form for a given player or entity.
 *
 * @param sourceEntitya - The entity or player to display the form to. Can be of type `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `-2` if an error occurs,
 * - `0` if the player cancels the form,
 * - `1` if the form is successfully submitted.
 *
 * The form allows the user to configure various chat rank settings such as:
 * - Rank style/mode
 * - Rank display prefix and suffix
 * - Name display prefix and suffix
 * - Chat name and message separator
 * - Rank display separator
 * - Rank template string
 * - Message template string
 * - Default rank template string for players with no rank
 * - Default message formatting
 * - Default name formatting
 * - Default separator formatting
 * - Disabling custom chat messages
 * - Allowing custom chat messages muting
 * - Auto escaping chat messages
 * - Auto URI escaping chat messages
 * - Allowing chat escape codes
 * - Displaying timestamps in chat
 * - Showing ranks on player name tags
 *
 * If `ultraSecurityModeEnabled` is true, the function checks if the player has the required permission to access the settings. If not, an access denied message is shown.
 *
 * The function uses `world.getDynamicProperty` to get the current settings and `world.setDynamicProperty` to save the updated settings.
 *
 * @throws Will log an error and return `-2` if an exception occurs during form submission.
 */
export async function chatRanksSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
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
    form2.title("Chat Ranks Settings");
    //⌠⌡÷≈≡±≥≤»
    form2.dropdown('§l§fRank Style/Mode§r§f\nCustom(Simple): Allows for simple customizations to the rank and message formatting.\nCustom(Advanced): Allows for complete control over the rank and message formatting.\nStyle 1: "§r§f[10:09:00 AM] [§bRank§f] [§cOther Rank§f] <Steve> Hi\nStyle 2: "§r§8[§f10:09:00 AM§8] [§bRank§8] [§cOther Rank§8] §fSteve§8 » §fHi\nStyle 3: "§r§8[§f10:09:00 AM§8] [§bRank§8] [§cOther Rank§8] §fSteve >> Hi\nStyle 4: "§r§7[10:09:00 AM] [§bRank§7] [§cOther Rank§7] §7Steve§l > §r§fHi"\nStyle 5: "§r§f[10:09:00 AM] [§bRank§f,§cOther Rank§f] §7Steve: §fHi"\nDefault is Custom(Simple).', rankModesArray, rankModesArray.indexOf(rankModes[String(world.getDynamicProperty("andexdbSettings:rankMode") ??
        "custom_simple")]));
    form2.textField('§l§frankDisplayPrefix§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fPrefix that appears before chat ranks in chat messages, default is "["', "string", String(world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "["));
    form2.textField('§l§frankDisplaySuffix§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fSuffix that appears after chat ranks in chat messages, default is "\uF019r]"', "string", String(world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ??
        "§r§f]"));
    form2.textField('§l§fnameDisplayPrefix§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fPrefix that appears before player\'s names in chat messages, default is "<"', "string", String(world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "<"));
    form2.textField('§l§fnameDisplaySuffix§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fSuffix that appears after player\'s names in chat messages, default is "\uF019r>"', "string", String(world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ??
        "§r§f>"));
    form2.textField("§l§fchatNameAndMessageSeparator§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fSeparator that appears between player's names and player's chat messages, default is \" \"", "string", String(world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " "));
    form2.textField('§l§frankDisplaySeparator§r§f\n§r§o§qOnly applies to Custom(Simple) and Custom(Advanced) mode.\n§r§fSeparator that appears between ranks, default is " "', "string", String(world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ??
        " "));
    form2.textField('§l§fRank Template String§r§f\n§r§o§2Only applies to Custom(Advanced) mode.\n§r§fThe format for the chat ranks, it is a javascript template string, for example "[${rank}\uF019r]", default is "[${rank}\uF019r]"', "javascript template string", String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ??
        "[${rank}§r§f]"));
    form2.textField('§l§fMessage Template String§r§f\n§r§o§2Only applies to Custom(Advanced) mode.\n§r§fThe format for the chat message, it is a javascript template string, for example "\uF019r${timestampenabled?`[${timestamp}]`:""}${ranks}\uF019r${(ranks!="")?" ":""}<${name}\uF019r> ", default is "\uF019r${timestampenabled?`[${timestamp}]`:""}${ranks}\uF019r${(ranks!="")?" ":""}<${name}\uF019r> "', "javascript template string", String(world.getDynamicProperty("andexdbSettings:messageTemplateString") ??
        '§r${timestampenabled?`[${timestamp}]`:""}${ranks}§r${(ranks!="")?" ":""}<${name}§r> ${message}'));
    form2.textField('§l§fDefault Rank Template String For Players With No Rank§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fThe default chat rank for players who do not have any chat ranks, it is a javascript template string, for example "[\uF019bMember\uF019r]", default is ""', "javascript template string", String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? ""));
    form2.textField('§l§fDefault Message Formatting§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fThe default format for the message portion of the chat message to use when the player does not have any messageFormatting: or messageColor: tags, it is just a string of format codes, such as "\uF019r\uF019l\uF019b", leaving this empty will make the message use the default message formatting of the selected rank style/mode, default is ""', "string", String(world.getDynamicProperty("andexdbSettings:defaultMessageFormatting") ?? ""));
    form2.textField('§l§fDefault Name Formatting§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fThe default format for the name of the player sending the chat message to use when the player does not have any nameFormatting: or nameColor: tags, it is just a string of format codes, such as "\uF019r\uF019l\uF019b", leaving this empty will make the message use the default name formatting of the selected rank style/mode, default is ""', "string", String(world.getDynamicProperty("andexdbSettings:defaultNameFormatting") ??
        ""));
    form2.textField('§l§fDefault Separator Formatting§r§f\n§r§o§9Only applies to rank styles 2-4.\n§r§fThe default format for the separator between the name of the player and the message portion of the chat message to use when the player does not have any separatorFormatting: or separatorColor: tags, it is just a string of format codes, such as "\uF019r\uF019l\uF019b", leaving this empty will make the message use the default separator formatting of the selected rank style/mode, default is ""', "string", String(world.getDynamicProperty("andexdbSettings:defaultSeparatorFormatting") ?? ""));
    form2.toggle("§l§fdisableCustomChatMessages§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fDisables the chat ranks and custom chat names, default is false", Boolean(world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false));
    form2.toggle("§l§fallowCustomChatMessagesMuting§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fAllows the chat mute button to work on the custom chat messages by using the /tellraw command instead of the world.sendMessage() function, a side-effect of this is that it will cause a 1 tick delay in chat messages, default is false", Boolean(world.getDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting") ?? false));
    form2.toggle("§l§fautoEscapeChatMessages§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fEvaluates escape codes in the chat automatically, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false));
    form2.toggle("§l§fautoURIEscapeChatMessages§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fSets whether or not to automatically escape URI % escape codes, default is false", Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false));
    form2.toggle("§l§fallowChatEscapeCodes§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fSets whether or not to allow for escape codes in chat, default is true", Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ??
        true));
    form2.toggle("§l§fchatDisplayTimeStamp§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fSets whether or not to put a timestamp before every chat message, default is false", config.chatRanks.chatDisplayTimeStamp);
    form2.toggle("§l§fshowRanksOnPlayerNameTags§r§f\nSets whether or not to show player's ranks on their name tag, default is false", config.chatRanks.showRanksOnPlayerNameTags);
    form2.submitButton("Save");
    return await forceShow(form2, sourceEntity)
        .then((to) => {
        let t = to;
        if (t.canceled) {
            return 1;
        } /*
GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
            ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
        let [rankMode, rankDisplayPrefix, rankDisplaySuffix, nameDisplayPrefix, nameDisplaySuffix, chatNameAndMessageSeparator, rankDisplaySeparator, rankTemplateString, messageTemplateString, defaultRankTemplateString, defaultMessageFormatting, defaultNameFormatting, defaultSeparatorFormatting, disableCustomChatMessages, allowCustomChatMessagesMuting, autoEscapeChatMessages, autoURIEscapeChatMessages, allowChatEscapeCodes, chatDisplayTimeStamp, showRanksOnPlayerNameTags,] = t.formValues;
        world.setDynamicProperty("andexdbSettings:rankMode", Object.entries(rankModes).find((v) => v[1] == rankModesArray[rankMode])[0]);
        world.setDynamicProperty("andexdbSettings:rankDisplayPrefix", rankDisplayPrefix);
        world.setDynamicProperty("andexdbSettings:rankDisplaySuffix", rankDisplaySuffix);
        world.setDynamicProperty("andexdbSettings:nameDisplayPrefix", nameDisplayPrefix);
        world.setDynamicProperty("andexdbSettings:nameDisplaySuffix", nameDisplaySuffix);
        world.setDynamicProperty("andexdbSettings:chatNameAndMessageSeparator", chatNameAndMessageSeparator);
        world.setDynamicProperty("andexdbSettings:rankDisplaySeparator", rankDisplaySeparator);
        world.setDynamicProperty("andexdbSettings:rankTemplateString", rankTemplateString);
        world.setDynamicProperty("andexdbSettings:messageTemplateString", messageTemplateString);
        world.setDynamicProperty("andexdbSettings:defaultRankTemplateString", defaultRankTemplateString);
        world.setDynamicProperty("andexdbSettings:defaultMessageFormatting", defaultMessageFormatting);
        world.setDynamicProperty("andexdbSettings:defaultNameFormatting", defaultNameFormatting);
        world.setDynamicProperty("andexdbSettings:defaultSeparatorFormatting", defaultSeparatorFormatting);
        world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages);
        world.setDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting", allowCustomChatMessagesMuting);
        world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages);
        world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages);
        world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes);
        world.setDynamicProperty("andexdbSettings:chatDisplayTimeStamp", chatDisplayTimeStamp);
        config.chatRanks.showRanksOnPlayerNameTags =
            showRanksOnPlayerNameTags;
        return 1;
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=chatRanksSettings.js.map