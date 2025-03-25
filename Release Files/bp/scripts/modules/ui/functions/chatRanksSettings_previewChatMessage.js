import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { rankModes } from "../../chat/constants/rankModes";
import { rankModesArray } from "../../chat/constants/rankModesArray";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { customFormUICodes } from "../constants/customFormUICodes";
import { chatSend_generatePartialPlayerTypeForChatSendEvaluationFunctions, chatSend_getChatMessageFormatFromPlayerTags, chatSend_getTargetPlayerSettings, chatSendMessageEvaluator, } from "modules/chat/functions/chatSendMessageEvaluator";
/**
 * Displays and handles the preview chat message form for a given player or entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function chatRanksSettings_previewChatMessage(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        // No permissions check needed here.
        const form = new ActionFormData();
        form.title(customFormUICodes.action.titles.formStyles.fullscreen + "Preview Chat Message");
        const chatSendMessageEvaluatorBaseOptions = {
            isPlaceholderPlayer: undefined,
            player: undefined,
            isPlaceholderTargetPlayer: false,
            targetPlayer: player,
            allowEval: false,
            dimension: player.dimension.id,
            // messageFormatting,
            // messageGradientMode,
            // nameFormatting,
            // nameGradientMode,
            playerPersonalSettings: undefined,
            // separatorFormatting,
            // separatorGradientMode,
            // showDimension,
            targetPlayerSettings: chatSend_getTargetPlayerSettings(player),
            time: Date.now(),
        };
        form.body(`§r${chatSendMessageEvaluator("this is a preview message, I have 2 ranks!", { hidden: false, sourceType: "name", value: "Steve 1238" }, {
            ...chatSendMessageEvaluatorBaseOptions,
            ranks: ["§bRank", "§cOther Rank"],
            tags: ["rank:§bRank", "rank:§cOther Rank"],
            ...chatSend_getChatMessageFormatFromPlayerTags(chatSend_generatePartialPlayerTypeForChatSendEvaluationFunctions({
                tags: ["rank:§bRank", "rank:§cOther Rank"],
                nameTag: "Steve 1238",
                name: "Steve 1238",
            })),
        })}\n§r${chatSendMessageEvaluator("this is a another preview message, I have no ranks!", { hidden: false, sourceType: "name", value: "Herobrine" }, {
            ...chatSendMessageEvaluatorBaseOptions,
            ranks: [],
            tags: [],
            ...chatSend_getChatMessageFormatFromPlayerTags(chatSend_generatePartialPlayerTypeForChatSendEvaluationFunctions({
                tags: [],
                nameTag: "Herobrine",
                name: "Herobrine",
            })),
        })}\n§r${chatSendMessageEvaluator("I have the nameColor:red tag!", { hidden: false, sourceType: "name", value: "Alex" }, {
            ...chatSendMessageEvaluatorBaseOptions,
            ranks: [],
            tags: ["nameColor:red"],
            ...chatSend_getChatMessageFormatFromPlayerTags(chatSend_generatePartialPlayerTypeForChatSendEvaluationFunctions({
                tags: ["nameColor:red"],
                nameTag: "Alex",
                name: "Alex",
            })),
        })}\n§r${chatSendMessageEvaluator("I have the nameColor:randompurplegradient and rank:§dOwner§r tags!", { hidden: false, sourceType: "name", value: "Steve" }, {
            ...chatSendMessageEvaluatorBaseOptions,
            ranks: ["§dOwner§r"],
            tags: ["nameColor:randomPurpleGradient", "rank:§dOwner§r"],
            ...chatSend_getChatMessageFormatFromPlayerTags(chatSend_generatePartialPlayerTypeForChatSendEvaluationFunctions({
                tags: ["nameColor:randomPurpleGradient", "rank:§dOwner§r"],
                nameTag: "Steve",
                name: "Steve",
            })),
        })}\n§r${chatSendMessageEvaluator("I have the messageColor:shuffledBlueGradient and rank:§9Admin§r tags!", { hidden: false, sourceType: "name", value: "Player" }, {
            ...chatSendMessageEvaluatorBaseOptions,
            ranks: ["§9Admin§r"],
            tags: ["messageColor:shuffledBlueGradient", "rank:§9Admin§r"],
            ...chatSend_getChatMessageFormatFromPlayerTags(chatSend_generatePartialPlayerTypeForChatSendEvaluationFunctions({
                tags: ["messageColor:shuffledBlueGradient", "rank:§9Admin§r"],
                nameTag: "Player",
                name: "Player",
            })),
        })}`);
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        const r = await form.forceShow(player);
        if (r.canceled) {
            return 1;
        }
        switch (["back", "close"][r.selection]) {
            case "back":
                return 1;
            case "close":
                return 0;
        }
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
//# sourceMappingURL=chatRanksSettings_previewChatMessage.js.map