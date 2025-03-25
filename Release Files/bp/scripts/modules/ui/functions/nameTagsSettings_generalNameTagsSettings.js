import { Player, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import "init/classes/config";
import { rankModes } from "../../chat/constants/rankModes";
import { rankModesArray } from "../../chat/constants/rankModesArray";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { customFormUICodes } from "../constants/customFormUICodes";
import { rankEvaluatorModes, rankEvaluatorModesDisplayMap } from "modules/chat/constants/rankEvaluatorModes";
/**
 * Displays and handles the general name tags settings form for a given player or entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function nameTagsSettings_generalNameTagsSettings(sourceEntity) {
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
        const includedOptions = cullUndefined([
            // "rankMode",
            // "rankEvaluatorMode_chat",
            "rankEvaluatorMode_nameTags",
            // "rankDisplayPrefix",
            // "rankDisplaySuffix",
            // "nameDisplayPrefix",
            // "nameDisplaySuffix",
            // "chatNameAndMessageSeparator",
            // "rankDisplaySeparator",
            // "rankTemplateString",
            // "messageTemplateString",
            // "defaultRank",
            // "defaultMessageFormatting",
            // "defaultNameFormatting",
            // "defaultSeparatorFormatting",
            // "disableCustomChatMessages",
            // "allowCustomChatMessagesMuting",
            // "autoEscapeChatMessages",
            // "autoURIEscapeChatMessages",
            // "allowChatEscapeCodes",
            // "chatDisplayTimeStamp",
            "nameTagTemplateString",
            "showHealthOnPlayerNameTags",
            // "showRanksOnPlayerNameTags",
        ]);
        const form = new ModalFormData();
        form.title(customFormUICodes.modal.titles.formStyles.medium + "Chat Ranks Settings");
        const formOptionsMap = {
            rankMode: () => form.dropdown('§l§fRank Style/Mode§r§f\nCustom(Simple): Allows for simple customizations to the rank and message formatting.\nCustom(Advanced): Allows for complete control over the rank and message formatting.\nStyle 1: "§r§f[10:09:00 AM] [§bRank§f] [§cOther Rank§f] <Steve> Hi\nStyle 2: "§r§8[§f10:09:00 AM§8] [§bRank§8] [§cOther Rank§8] §fSteve§8 » §fHi\nStyle 3: "§r§8[§f10:09:00 AM§8] [§bRank§8] [§cOther Rank§8] §fSteve >> Hi\nStyle 4: "§r§7[10:09:00 AM] [§bRank§7] [§cOther Rank§7] §7Steve§l > §r§fHi"\nStyle 5: "§r§f[10:09:00 AM] [§bRank§f,§cOther Rank§f] §7Steve: §fHi"\nDefault is Custom(Simple).', rankModesArray, rankModesArray.indexOf(rankModes[String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple")])),
            rankEvaluatorMode_chat: () => form.dropdown('§l§fChat Rank Evaluator Mode§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\nThe way that the chat ranks are evaluated in the chat.\nDefaults: The default mode for rank evaluation.\nSuffix and Prefix Only Once: A mode where the suffix and prefix are added to the begginning and end of the joined ranks, instead of being added to each rank. So, instead of [rank1] [rank2] [rank3], it will be [rank1 rank2 rank3], or instead of [rank1],[rank2],[rank3], it will be [rank1,rank2,rank3].', rankEvaluatorModes.map(m => rankEvaluatorModesDisplayMap[m]), rankEvaluatorModes.indexOf(config.chatRanks.rankEvaluatorMode_chat)),
            rankEvaluatorMode_nameTags: () => form.dropdown('§l§fName Tags Rank Evaluator Mode§r§f\nThe way that the chat ranks are evaluated in the chat.\nDefaults: The default mode for rank evaluation.\nSuffix and Prefix Only Once: A mode where the suffix and prefix are added to the begginning and end of the joined ranks, instead of being added to each rank. So, instead of [rank1] [rank2] [rank3], it will be [rank1 rank2 rank3], or instead of [rank1],[rank2],[rank3], it will be [rank1,rank2,rank3].', rankEvaluatorModes.map(m => rankEvaluatorModesDisplayMap[m]), rankEvaluatorModes.indexOf(config.chatRanks.rankEvaluatorMode_chat)),
            rankDisplayPrefix: () => form.textField('§l§fRank Display Prefix§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fPrefix that appears before chat ranks in chat messages, default is "["', "string", config.chatRanks.rankDisplayPrefix),
            rankDisplaySuffix: () => form.textField('§l§fRank Display Suffix§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fSuffix that appears after chat ranks in chat messages, default is "\uF019r]"', "string", config.chatRanks.rankDisplaySuffix),
            nameDisplayPrefix: () => form.textField('§l§fName Display Prefix§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fPrefix that appears before player\'s names in chat messages, default is "<"', "string", config.chatRanks.nameDisplayPrefix),
            nameDisplaySuffix: () => form.textField('§l§fName Display Suffix§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fSuffix that appears after player\'s names in chat messages, default is "\uF019r>"', "string", config.chatRanks.nameDisplaySuffix),
            chatNameAndMessageSeparator: () => form.textField("§l§fChat Name And Message Separator§r§f\n§r§o§sOnly applies to Custom(Simple) mode.\n§r§fSeparator that appears between player's names and player's chat messages, default is \" \"", "string", config.chatRanks.chatNameAndMessageSeparator),
            rankDisplaySeparator: () => form.textField('§l§fRank Display Separator§r§f\n§r§o§qOnly applies to Custom(Simple) and Custom(Advanced) mode.\n§r§fSeparator that appears between ranks, default is " "', "string", config.chatRanks.rankDisplaySeparator),
            rankTemplateString: () => form.textField('§l§fRank Template String§r§f\n§r§o§2Only applies to Custom(Advanced) mode.\n§r§fThe format for the chat ranks, it is a javascript template string, for example "[${rank}\uF019r]"\nLeave this text box blank to reset this option to its default value.', "JavaScript template string", config.chatRanks.rankTemplateString),
            messageTemplateString: () => form.textField('§l§fMessage Template String§r§f\n§r§o§2Only applies to Custom(Advanced) mode.\n§r§fThe format for the chat message, it is a javascript template string, for example "\uF019r${timestampenabled?`[${timestamp}] `:""}${ranks}\uF019r${(ranks!="")?" ":""}<${name}\uF019r> "\nLeave this text box blank to reset this option to its default value.', "JavaScript template string", config.chatRanks.messageTemplateString),
            defaultRank: () => form.textField('§l§fDefault Rank For Players With No Rank§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fThe default chat rank for players who do not have any chat ranks, for example "\uF019bMember\uF019r", default is "\uF019bMember\uF019r"\nLeave this text box blank to have no default rank.', "string", config.chatRanks.defaultRank),
            defaultMessageFormatting: () => form.textField('§l§fDefault Message Formatting§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fThe default format for the message portion of the chat message to use when the player does not have any messageFormatting: or messageColor: tags, it is just a string of format codes, such as "\uF019r\uF019l\uF019b", leaving this empty will make the message use the default message formatting of the selected rank style/mode, default is ""', "string", config.chatRanks.defaultMessageFormatting),
            defaultNameFormatting: () => form.textField('§l§fDefault Name Formatting§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fThe default format for the name of the player sending the chat message to use when the player does not have any nameFormatting: or nameColor: tags, it is just a string of format codes, such as "\uF019r\uF019l\uF019b", leaving this empty will make the message use the default name formatting of the selected rank style/mode, default is ""', "string", config.chatRanks.defaultNameFormatting),
            defaultSeparatorFormatting: () => form.textField('§l§fDefault Separator Formatting§r§f\n§r§o§9Only applies to rank styles 2-4.\n§r§fThe default format for the separator between the name of the player and the message portion of the chat message to use when the player does not have any separatorFormatting: or separatorColor: tags, it is just a string of format codes, such as "\uF019r\uF019l\uF019b", leaving this empty will make the message use the default separator formatting of the selected rank style/mode, default is ""', "string", config.chatRanks.defaultSeparatorFormatting),
            disableCustomChatMessages: () => form.toggle("§l§fDisable Chat Message Modifications§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fDisables the chat ranks and custom chat names, default is false", config.chatRanks.disableCustomChatMessages),
            allowCustomChatMessagesMuting: () => form.toggle("§l§fAllow Muting Messages§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fAllows the chat mute toggle to work on the custom chat messages by using the /tellraw command instead of the world.sendMessage() function, a side-effect of this is that it will cause a 1 tick delay in chat messages, default is false", config.chatRanks.allowCustomChatMessagesMuting),
            autoEscapeChatMessages: () => form.toggle('§l§fAuto Escape Chat Messages§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fEvaluates escape codes in the chat automatically, for example if someone put "\\n" it would turn into a newline character, or if they put "\\uE069" it would turn into "\uE069", default is false', config.chatRanks.autoEscapeChatMessages),
            autoURIEscapeChatMessages: () => form.toggle('§l§fAuto URI Escape Chat Messages§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fSets whether or not to automatically escape URI % escape codes, for example if they put "a%bba" it would turn into "a»a", or if they put "a%20a" it would turn into "a a", default is false', config.chatRanks.autoURIEscapeChatMessages),
            allowChatEscapeCodes: () => form.toggle('§l§fAllow Chat Escape Codes§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fSets whether or not to allow for escape codes in chat, this will allow for players to put things like "\\n" or "\\uE069" in the chat and have them turn into a newline character or an emoji as long as they include "${ea}" somewhere in their chat message, default is true', config.chatRanks.allowChatEscapeCodes),
            chatDisplayTimeStamp: () => form.toggle("§l§fShow Timestamp Before Chat Messages§r§f\n§r§o§5Applies to all rank modes/styles.\n§r§fSets whether or not to put a timestamp before every chat message, default is false", config.chatRanks.chatDisplayTimeStamp),
            nameTagTemplateString: () => form.textField('§l§fName Tag Template String§r§f\n§r§fThe format for the name tags, it is a javascript template string, for example "${rank} ${nameFormatting}${name}${(showHealth ? `§r§f [${currentHealth}/${maxHealth}]` : "")}"\nLeave this text box blank to reset this option to its default value.', "JavaScript template string", config.chatRanks.nameTagTemplateString),
            showHealthOnPlayerNameTags: () => form.toggle("§l§fShow Health On Player Name Tags§r§f\nSets whether or not to show players health on their name tags, default is false", config.chatRanks.showHealthOnPlayerNameTags),
            showRanksOnPlayerNameTags: () => form.toggle("§l§fShow Ranks On Player Name Tags§r§f\nSets whether or not to show players ranks on their name tags, default is false", config.chatRanks.showRanksOnPlayerNameTags),
            playerNameTagHealthPrecision: () => form.slider("§l§fPlayer Name Tag Health Precision§r§f\nThe maximum number of decimal places to display on the health display on player name tags. Must be between 0 and 20 (inclusive), default is 1", 0, 20, 1, config.chatRanks.playerNameTagHealthPrecision),
        };
        includedOptions.forEach((o) => formOptionsMap[o]());
        //⌠⌡÷≈≡±≥≤»
        form.submitButton("Save");
        const r = await form.forceShow(player);
        if (r.canceled) {
            return 1;
        }
        const options = Object.fromEntries(includedOptions.map((o, i) => [o, r.formValues[i]]));
        includedOptions.forEach((v) => {
            switch (v) {
                case "allowChatEscapeCodes":
                    config.chatRanks.allowChatEscapeCodes = options[v];
                    break;
                case "allowCustomChatMessagesMuting":
                    config.chatRanks.allowCustomChatMessagesMuting = options[v];
                    break;
                case "autoEscapeChatMessages":
                    config.chatRanks.autoEscapeChatMessages = options[v];
                    break;
                case "autoURIEscapeChatMessages":
                    config.chatRanks.autoURIEscapeChatMessages = options[v];
                    break;
                case "chatDisplayTimeStamp":
                    config.chatRanks.chatDisplayTimeStamp = options[v];
                    break;
                case "chatNameAndMessageSeparator":
                    config.chatRanks.chatNameAndMessageSeparator = options[v];
                    break;
                case "defaultMessageFormatting":
                    config.chatRanks.defaultMessageFormatting = options[v];
                    break;
                case "defaultNameFormatting":
                    config.chatRanks.defaultNameFormatting = options[v];
                    break;
                case "defaultRank":
                    config.chatRanks.defaultRank = options[v];
                    break;
                case "defaultSeparatorFormatting":
                    config.chatRanks.defaultSeparatorFormatting = options[v];
                    break;
                case "disableCustomChatMessages":
                    config.chatRanks.disableCustomChatMessages = options[v];
                    break;
                case "messageTemplateString":
                    config.chatRanks.messageTemplateString = options[v] === "" ? undefined : options[v];
                    break;
                case "nameDisplayPrefix":
                    config.chatRanks.nameDisplayPrefix = options[v];
                    break;
                case "nameDisplaySuffix":
                    config.chatRanks.nameDisplaySuffix = options[v];
                    break;
                case "rankDisplayPrefix":
                    config.chatRanks.rankDisplayPrefix = options[v];
                    break;
                case "rankDisplaySeparator":
                    config.chatRanks.rankDisplaySeparator = options[v];
                    break;
                case "rankDisplaySuffix":
                    config.chatRanks.rankDisplaySuffix = options[v];
                    break;
                case "rankEvaluatorMode_chat":
                    config.chatRanks.rankEvaluatorMode_chat = rankEvaluatorModes[options[v]];
                    break;
                case "rankEvaluatorMode_nameTags":
                    config.chatRanks.rankEvaluatorMode_nameTags = rankEvaluatorModes[options[v]];
                    break;
                case "rankMode":
                    config.chatRanks.rankMode = Object.entries(rankModes).find((m) => m[1] === rankModesArray[options[v]])[0];
                    break;
                case "rankTemplateString":
                    config.chatRanks.rankTemplateString = options[v] === "" ? undefined : options[v];
                    break;
                case "nameTagTemplateString":
                    config.chatRanks.nameTagTemplateString = options[v] === "" ? undefined : options[v];
                    break;
                case "showHealthOnPlayerNameTags":
                    config.chatRanks.showHealthOnPlayerNameTags = options[v];
                    break;
                case "showRanksOnPlayerNameTags":
                    config.chatRanks.showRanksOnPlayerNameTags = options[v];
                    break;
                case "playerNameTagHealthPrecision":
                    config.chatRanks.playerNameTagHealthPrecision = options[v];
                    break;
                default:
                    throw new Error(`Save action for setting ${JSON.stringify(v)} was not defined.`);
            }
        });
        return 1;
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
//# sourceMappingURL=nameTagsSettings_generalNameTagsSettings.js.map