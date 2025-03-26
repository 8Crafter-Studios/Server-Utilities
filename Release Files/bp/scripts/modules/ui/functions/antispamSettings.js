import { ModalFormData } from "@minecraft/server-ui";
import "init/classes/config";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { customFormUICodes } from "../constants/customFormUICodes";
/**
 * Configures and displays the anti-spam settings form to the specified player.
 *
 * @async
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * @remarks
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled and if the player has the required permission to access the settings.
 * 2. If the player lacks permission, shows an access denied message.
 * 3. Creates and configures a modal form for anti-spam settings.
 * 4. Displays the form to the player and processes the form response.
 * 5. Updates the configuration based on the form input.
 *
 * The form includes the following settings:
 * - Toggle for enabling/disabling anti-spam.
 * - Toggle for resetting the anti-spam mute timer upon attempted message send while muted.
 * - Text field for setting the wait time before a player can send another chat message.
 * - Text field for setting the maximum time between messages to trigger anti-spam.
 * - Slider for setting the message count to trigger anti-spam.
 */
export async function antispamSettings(sourceEntity) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(player, "andexdb.accessSettings") == false) {
                const r = await showMessage(player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Okay", "Cancel");
                if (r.canceled || r.selection == 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
        let form = new ModalFormData();
        form.title(customFormUICodes.modal.titles.formStyles.medium + "Anti-Spam Settings [§cExperimental§r]");
        form.toggle("§l§fAnti-Spam Enabled§r§f", config.antiSpamSystem.antispamEnabled);
        form.toggle("§l§fReset Anti-Spam Mute Timer Upon Attempted Message Send While Muted§r§f", config.antiSpamSystem.restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute);
        form.textField("§l§fWait time before player can send another chat message in seconds§r§f", "60", String(config.antiSpamSystem.waitTimeAfterAntispamActivation));
        form.textField("§f(The anti-spam will only activate if the player sends a number of messages equal to (§bMessage count to trigger anti-spam§f) and those messages each had a delay of at most (§bMaximum time between messages§f) seconds between them)\n§lMaximum time between messages, §r§f", "5", String(config.antiSpamSystem.maxTimeBewteenMessagesToTriggerAntiSpam));
        form.slider("§l§fMessage count to trigger anti-spam, defaults to 4§r§f", 1, 100, 1, config.antiSpamSystem.antispamTriggerMessageCount);
        form.submitButton("Save");
        const r = await form.forceShow(player);
        if (r.canceled) {
            return 1;
        }
        let [antispamEnabled, restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute, waitTimeAfterAntispamActivation, maxTimeBewteenMessagesToTriggerAntiSpam, antispamTriggerMessageCount,] = r.formValues;
        config.antiSpamSystem.antispamEnabled = antispamEnabled;
        config.antiSpamSystem.restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute =
            restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute;
        config.antiSpamSystem.waitTimeAfterAntispamActivation = isNaN(Number(waitTimeAfterAntispamActivation)) ? 60 : Number(waitTimeAfterAntispamActivation);
        config.antiSpamSystem.maxTimeBewteenMessagesToTriggerAntiSpam = isNaN(Number(maxTimeBewteenMessagesToTriggerAntiSpam))
            ? 5
            : Number(maxTimeBewteenMessagesToTriggerAntiSpam);
        config.antiSpamSystem.antispamTriggerMessageCount = Number(antispamTriggerMessageCount);
        return 1;
    }
    catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
//# sourceMappingURL=antispamSettings.js.map