import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
/**
 * Configures and displays the anti-spam settings form to the specified player or entity.
 *
 * @param sourceEntitya - The entity or player requesting the anti-spam settings. Can be of type `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the form was successfully shown and handled.
 * - `0` if the user canceled the form.
 * - `-2` if an error occurred.
 *
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
export async function antispamSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Okay", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form2 = new ModalFormData();
    form2.title("Anti-Spam Settings [§cExperimental§r]");
    form2.toggle("§l§fAnti-Spam Enabled§r§f", config.antiSpamSystem.antispamEnabled);
    form2.toggle("§l§fReset Anti-Spam Mute Timer Upon Attempted Message Send While Muted§r§f", config.antiSpamSystem
        .restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute);
    form2.textField("§l§fWait time before player can send another chat message in seconds§r§f", "60", String(config.antiSpamSystem.waitTimeAfterAntispamActivation));
    form2.textField("§f(The anti-spam will only activate if the player sends a number of messages equal to (§bMessage count to trigger anti-spam§f) and those messages each had a delay of at most (§bMaximum time between messages§f) seconds between them)\n§lMaximum time between messages, §r§f", "5", String(config.antiSpamSystem.maxTimeBewteenMessagesToTriggerAntiSpam));
    form2.slider("§l§fMessage count to trigger anti-spam, defaults to 4§r§f", 1, 100, 1, config.antiSpamSystem.antispamTriggerMessageCount);
    form2.submitButton("Save");
    return await forceShow(form2, sourceEntity)
        .then((to) => {
        let t = to;
        if (t.canceled) {
            return 1;
        } /*
GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
            ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
        let [antispamEnabled, restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute, waitTimeAfterAntispamActivation, maxTimeBewteenMessagesToTriggerAntiSpam, antispamTriggerMessageCount,] = t.formValues;
        config.antiSpamSystem.antispamEnabled = antispamEnabled;
        config.antiSpamSystem.restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute =
            restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute;
        config.antiSpamSystem.waitTimeAfterAntispamActivation = isNaN(Number(waitTimeAfterAntispamActivation))
            ? 60
            : Number(waitTimeAfterAntispamActivation);
        config.antiSpamSystem.maxTimeBewteenMessagesToTriggerAntiSpam =
            isNaN(Number(maxTimeBewteenMessagesToTriggerAntiSpam))
                ? 5
                : Number(maxTimeBewteenMessagesToTriggerAntiSpam);
        config.antiSpamSystem.antispamTriggerMessageCount = Number(antispamTriggerMessageCount);
        return 1;
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=antispamSettings.js.map