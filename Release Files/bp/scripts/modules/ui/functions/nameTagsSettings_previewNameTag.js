import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import "init/classes/config";
import { rankModes } from "../../chat/constants/rankModes";
import { rankModesArray } from "../../chat/constants/rankModesArray";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { customFormUICodes } from "../constants/customFormUICodes";
import { rankNameTagEvaluator, rankNameTagEvaluator_generatePartialPlayerTypeForRankNameTagEvaluatorEvaluationFunctions, rankNameTagEvaluator_getChatMessageFormatFromPlayerTags } from "modules/chat/functions/rankNameTagEvaluator";
/**
 * Displays and handles the preview name tag form for a given player or entity.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function nameTagsSettings_previewNameTag(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        // No permissions check needed here.
        const form = new ActionFormData();
        form.title(customFormUICodes.action.titles.formStyles.fullscreen + "Preview Name Tag");
        const rankNameTagEvaluatorBaseOptions = {
            isPlaceholderPlayer: undefined,
            player: undefined,
            // messageFormatting,
            // messageGradientMode,
            // nameFormatting,
            // nameGradientMode,
            playerPersonalSettings: undefined,
            // separatorFormatting,
            // separatorGradientMode,
            // showDimension,
        };
        form.body(`§r${rankNameTagEvaluator({ hidden: false, sourceType: "name", value: "Steve 1238" }, {
            ...rankNameTagEvaluatorBaseOptions,
            currentHealth: 15,
            maxHealth: 20,
            ranks: ["§bRank", "§cOther Rank"],
            tags: ["rank:§bRank", "rank:§cOther Rank"],
            ...rankNameTagEvaluator_getChatMessageFormatFromPlayerTags(rankNameTagEvaluator_generatePartialPlayerTypeForRankNameTagEvaluatorEvaluationFunctions({
                tags: ["rank:§bRank", "rank:§cOther Rank"],
                nameTag: "Steve 1238",
                name: "Steve 1238",
            })),
        })}\n§r${rankNameTagEvaluator({ hidden: false, sourceType: "name", value: "Herobrine" }, {
            ...rankNameTagEvaluatorBaseOptions,
            currentHealth: 20,
            maxHealth: 20,
            ranks: [],
            tags: [],
            ...rankNameTagEvaluator_getChatMessageFormatFromPlayerTags(rankNameTagEvaluator_generatePartialPlayerTypeForRankNameTagEvaluatorEvaluationFunctions({
                tags: [],
                nameTag: "Herobrine",
                name: "Herobrine",
            })),
        })}\n§r${rankNameTagEvaluator({ hidden: false, sourceType: "name", value: "Alex" }, {
            ...rankNameTagEvaluatorBaseOptions,
            ranks: [],
            tags: ["nameColor:red"],
            ...rankNameTagEvaluator_getChatMessageFormatFromPlayerTags(rankNameTagEvaluator_generatePartialPlayerTypeForRankNameTagEvaluatorEvaluationFunctions({
                tags: ["nameColor:red"],
                nameTag: "Alex",
                name: "Alex",
            })),
        })}\n§r${rankNameTagEvaluator({ hidden: false, sourceType: "name", value: "Steve" }, {
            ...rankNameTagEvaluatorBaseOptions,
            currentHealth: -30,
            maxHealth: 20,
            ranks: ["§dOwner§r"],
            tags: ["nameColor:randomPurpleGradient", "rank:§dOwner§r"],
            ...rankNameTagEvaluator_getChatMessageFormatFromPlayerTags(rankNameTagEvaluator_generatePartialPlayerTypeForRankNameTagEvaluatorEvaluationFunctions({
                tags: ["nameColor:randomPurpleGradient", "rank:§dOwner§r"],
                nameTag: "Steve",
                name: "Steve",
            })),
        })}\n§r${rankNameTagEvaluator({ hidden: false, sourceType: "name", value: "Player" }, {
            ...rankNameTagEvaluatorBaseOptions,
            currentHealth: 127,
            maxHealth: 526,
            ranks: ["§9Admin§r"],
            tags: ["messageColor:shuffledBlueGradient", "rank:§9Admin§r"],
            ...rankNameTagEvaluator_getChatMessageFormatFromPlayerTags(rankNameTagEvaluator_generatePartialPlayerTypeForRankNameTagEvaluatorEvaluationFunctions({
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
//# sourceMappingURL=nameTagsSettings_previewNameTag.js.map