import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { PlayerNotifications } from "init/classes/PlayerNotifications";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
/**
 * Displays a notification settings form to the player and updates the player's notification settings based on their input.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `-2` if an error occurs,
 * - `0` if the player cancels the form,
 * - `1` if the settings are successfully updated.
 *
 * The form allows the player to configure various notification settings, including:
 * - Chat command notifications
 * - Chat message notifications
 * - Game rule change notifications
 * - Block explosion notifications
 * - Button push notifications
 * - Entity hurt notifications
 * - Entity load notifications
 * - Entity remove notifications
 * - Entity spawn notifications
 * - Explosion notifications
 * - Player dimension change notifications
 * - Pre-explosion notifications
 * - Pre-chat send notifications
 * - Player game mode change notifications
 * - Weather change notifications
 * - Lever action notifications
 * - Message receive notifications
 * - Block interaction-triggered explosion notifications
 * - Entity interaction-triggered explosion notifications
 *
 * Each notification setting includes options for enabling/disabling the notification and configuring the sound (sound ID, volume, and pitch).
 */
export async function notificationsSettings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessNotificationsSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessNotificationsSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form2 = new ModalFormData();
    const noti = new PlayerNotifications(sourceEntity);
    form2.title("Notifications Settings");
    form2.toggle("§l§fGet notified when players run chat commands§r§f", noti.getAllChatCommands);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getAllChatCommandsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getAllChatCommandsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getAllChatCommandsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when players send chat messages§r§f", noti.getAllChatMessages);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getAllChatMessagesNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getAllChatMessagesNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getAllChatMessagesNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a game rule is changed§r§f", noti.getGameRuleChangeNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getGameRuleChangeNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getGameRuleChangeNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getGameRuleChangeNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a block explodes§r§f", noti.getBlockExplodeNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getBlockExplodeNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getBlockExplodeNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getBlockExplodeNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a button is pushed§r§f", noti.getButtonPushNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getButtonPushNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getButtonPushNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getButtonPushNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when an entity takes damage§r§f", noti.getEntityHurtNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getEntityHurtNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getEntityHurtNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getEntityHurtNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when an entity is loaded§r§f", noti.getEntityLoadNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getEntityLoadNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getEntityLoadNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getEntityLoadNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when an entity is removed§r§f", noti.getEntityRemoveNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getEntityRemoveNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getEntityRemoveNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getEntityRemoveNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when an entity is spawned§r§f", noti.getEntitySpawnNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getEntitySpawnNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getEntitySpawnNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getEntitySpawnNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when an explosion occurs§r§f", noti.getExplosionNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getExplosionNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getExplosionNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getExplosionNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a player changes dimensions§r§f", noti.getPlayerDimensionChangeNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getPlayerDimensionChangeNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getPlayerDimensionChangeNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getPlayerDimensionChangeNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified the tick before an explosion occurs§r§f", noti.getBeforeExplosionNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getBeforeExplosionNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getBeforeExplosionNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getBeforeExplosionNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified the tick before a chat message is sent§r§f", noti.getBeforeChatSendNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getBeforeChatSendNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getBeforeChatSendNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getBeforeChatSendNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a player switches gamemodes§r§f", noti.getPlayerGameModeChangeNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getPlayerGameModeChangeNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getPlayerGameModeChangeNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getPlayerGameModeChangeNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when the weather changes§r§f", noti.getWeatherChangeNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getWeatherChangeNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getWeatherChangeNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getWeatherChangeNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a player interacts with a lever§r§f", noti.getLeverActionNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getLeverActionNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getLeverActionNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getLeverActionNotificationsNotificationSound.pitch));
    form2.toggle("§l§8Get notified when a message is received (Internal; Might not even do anything)§r§8", noti.getMessageRecieveNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getMessageRecieveNotificationsNotificationSound.soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getMessageRecieveNotificationsNotificationSound.volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getMessageRecieveNotificationsNotificationSound.pitch));
    form2.toggle("§l§fGet notified when a player interacts with an explosive block§r§f", noti.getBlockInteractTriggerExplosionNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getBlockInteractTriggerExplosionNotificationsNotificationSound
        .soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getBlockInteractTriggerExplosionNotificationsNotificationSound
        .volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getBlockInteractTriggerExplosionNotificationsNotificationSound
        .pitch));
    form2.toggle("§l§fGet notified when a player interacts with an explosive entity§r§f", noti.getEntityInteractTriggerExplosionNotifications);
    form2.textField("SoundID", "Sound ID, none=no sound", noti.getEntityInteractTriggerExplosionNotificationsNotificationSound
        .soundId);
    form2.textField("Volume", "float, between 0 and 1", String(noti.getEntityInteractTriggerExplosionNotificationsNotificationSound
        .volume));
    form2.textField("Pitch", "float, between 0 and 255", String(noti.getEntityInteractTriggerExplosionNotificationsNotificationSound
        .pitch));
    form2.submitButton("Save");
    return await forceShow(form2, sourceEntity)
        .then((to) => {
        let t = to;
        if (t.canceled) {
            return 1;
        } /*
GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
            ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/
        let [getAllChatCommands, getAllChatCommandsSoundID, getAllChatCommandsVolume, getAllChatCommandsPitch, getAllChatMessages, getAllChatMessagesSoundID, getAllChatMessagesVolume, getAllChatMessagesPitch, getGameRuleChangeNotifications, getGameRuleChangeNotificationsSoundID, getGameRuleChangeNotificationsVolume, getGameRuleChangeNotificationsPitch, getBlockExplodeNotifications, getBlockExplodeNotificationsSoundID, getBlockExplodeNotificationsVolume, getBlockExplodeNotificationsPitch, getButtonPushNotifications, getButtonPushNotificationsSoundID, getButtonPushNotificationsVolume, getButtonPushNotificationsPitch, getEntityHurtNotifications, getEntityHurtNotificationsSoundID, getEntityHurtNotificationsVolume, getEntityHurtNotificationsPitch, getEntityLoadNotifications, getEntityLoadNotificationsSoundID, getEntityLoadNotificationsVolume, getEntityLoadNotificationsPitch, getEntityRemoveNotifications, getEntityRemoveNotificationsSoundID, getEntityRemoveNotificationsVolume, getEntityRemoveNotificationsPitch, getEntitySpawnNotifications, getEntitySpawnNotificationsSoundID, getEntitySpawnNotificationsVolume, getEntitySpawnNotificationsPitch, getExplosionNotifications, getExplosionNotificationsSoundID, getExplosionNotificationsVolume, getExplosionNotificationsPitch, getPlayerDimensionChangeNotifications, getPlayerDimensionChangeNotificationsSoundID, getPlayerDimensionChangeNotificationsVolume, getPlayerDimensionChangeNotificationsPitch, getBeforeExplosionNotifications, getBeforeExplosionNotificationsSoundID, getBeforeExplosionNotificationsVolume, getBeforeExplosionNotificationsPitch, getBeforeChatSendNotifications, getBeforeChatSendNotificationsSoundID, getBeforeChatSendNotificationsVolume, getBeforeChatSendNotificationsPitch, getPlayerGameModeChangeNotifications, getPlayerGameModeChangeNotificationsSoundID, getPlayerGameModeChangeNotificationsVolume, getPlayerGameModeChangeNotificationsPitch, getWeatherChangeNotifications, getWeatherChangeNotificationsSoundID, getWeatherChangeNotificationsVolume, getWeatherChangeNotificationsPitch, getLeverActionNotifications, getLeverActionNotificationsSoundID, getLeverActionNotificationsVolume, getLeverActionNotificationsPitch, getMessageRecieveNotifications, getMessageRecieveNotificationsSoundID, getMessageRecieveNotificationsVolume, getMessageRecieveNotificationsPitch, getBlockInteractTriggerExplosionNotifications, getBlockInteractTriggerExplosionNotificationsSoundID, getBlockInteractTriggerExplosionNotificationsVolume, getBlockInteractTriggerExplosionNotificationsPitch, getEntityInteractTriggerExplosionNotifications, getEntityInteractTriggerExplosionNotificationsSoundID, getEntityInteractTriggerExplosionNotificationsVolume, getEntityInteractTriggerExplosionNotificationsPitch,] = t.formValues;
        noti.getAllChatCommands = Boolean(getAllChatCommands);
        noti.getAllChatCommandsNotificationSound = {
            soundId: String(getAllChatCommandsSoundID == ""
                ? "none"
                : getAllChatCommandsSoundID),
            volume: Number.isNaN(Number(getAllChatCommandsVolume))
                ? 1
                : Math.min(Math.max(Number(getAllChatCommandsVolume), 0), 1),
            pitch: Number.isNaN(Number(getAllChatCommandsPitch))
                ? 1
                : Math.min(Math.max(Number(getAllChatCommandsPitch), 0), 255),
        };
        noti.getAllChatMessages = Boolean(getAllChatMessages);
        noti.getAllChatMessagesNotificationSound = {
            soundId: String(getAllChatMessagesSoundID == ""
                ? "none"
                : getAllChatMessagesSoundID),
            volume: Number.isNaN(Number(getAllChatMessagesVolume))
                ? 1
                : Math.min(Math.max(Number(getAllChatMessagesVolume), 0), 1),
            pitch: Number.isNaN(Number(getAllChatMessagesPitch))
                ? 1
                : Math.min(Math.max(Number(getAllChatMessagesPitch), 0), 255),
        };
        noti.getGameRuleChangeNotifications = Boolean(getGameRuleChangeNotifications);
        noti.getGameRuleChangeNotificationsNotificationSound = {
            soundId: String(getGameRuleChangeNotificationsSoundID == ""
                ? "none"
                : getGameRuleChangeNotificationsSoundID),
            volume: Number.isNaN(Number(getGameRuleChangeNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getGameRuleChangeNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getGameRuleChangeNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getGameRuleChangeNotificationsPitch), 0), 255),
        };
        noti.getBlockExplodeNotifications = Boolean(getBlockExplodeNotifications);
        noti.getBlockExplodeNotificationsNotificationSound = {
            soundId: String(getBlockExplodeNotificationsSoundID == ""
                ? "none"
                : getBlockExplodeNotificationsSoundID),
            volume: Number.isNaN(Number(getBlockExplodeNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getBlockExplodeNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getBlockExplodeNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getBlockExplodeNotificationsPitch), 0), 255),
        };
        noti.getButtonPushNotifications = Boolean(getButtonPushNotifications);
        noti.getButtonPushNotificationsNotificationSound = {
            soundId: String(getButtonPushNotificationsSoundID == ""
                ? "none"
                : getButtonPushNotificationsSoundID),
            volume: Number.isNaN(Number(getButtonPushNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getButtonPushNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getButtonPushNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getButtonPushNotificationsPitch), 0), 255),
        };
        noti.getEntityHurtNotifications = Boolean(getEntityHurtNotifications);
        noti.getEntityHurtNotificationsNotificationSound = {
            soundId: String(getEntityHurtNotificationsSoundID == ""
                ? "none"
                : getEntityHurtNotificationsSoundID),
            volume: Number.isNaN(Number(getEntityHurtNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getEntityHurtNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getEntityHurtNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getEntityHurtNotificationsPitch), 0), 255),
        };
        noti.getEntityLoadNotifications = Boolean(getEntityLoadNotifications);
        noti.getEntityLoadNotificationsNotificationSound = {
            soundId: String(getEntityLoadNotificationsSoundID == ""
                ? "none"
                : getEntityLoadNotificationsSoundID),
            volume: Number.isNaN(Number(getEntityLoadNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getEntityLoadNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getEntityLoadNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getEntityLoadNotificationsPitch), 0), 255),
        };
        noti.getEntityRemoveNotifications = Boolean(getEntityRemoveNotifications);
        noti.getEntityRemoveNotificationsNotificationSound = {
            soundId: String(getEntityRemoveNotificationsSoundID == ""
                ? "none"
                : getEntityRemoveNotificationsSoundID),
            volume: Number.isNaN(Number(getEntityRemoveNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getEntityRemoveNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getEntityRemoveNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getEntityRemoveNotificationsPitch), 0), 255),
        };
        noti.getEntitySpawnNotifications = Boolean(getEntitySpawnNotifications);
        noti.getEntitySpawnNotificationsNotificationSound = {
            soundId: String(getEntitySpawnNotificationsSoundID == ""
                ? "none"
                : getEntitySpawnNotificationsSoundID),
            volume: Number.isNaN(Number(getEntitySpawnNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getEntitySpawnNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getEntitySpawnNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getEntitySpawnNotificationsPitch), 0), 255),
        };
        noti.getExplosionNotifications = Boolean(getExplosionNotifications);
        noti.getExplosionNotificationsNotificationSound = {
            soundId: String(getExplosionNotificationsSoundID == ""
                ? "none"
                : getExplosionNotificationsSoundID),
            volume: Number.isNaN(Number(getExplosionNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getExplosionNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getExplosionNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getExplosionNotificationsPitch), 0), 255),
        };
        noti.getPlayerDimensionChangeNotifications = Boolean(getPlayerDimensionChangeNotifications);
        noti.getPlayerDimensionChangeNotificationsNotificationSound = {
            soundId: String(getPlayerDimensionChangeNotificationsSoundID == ""
                ? "none"
                : getPlayerDimensionChangeNotificationsSoundID),
            volume: Number.isNaN(Number(getPlayerDimensionChangeNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getPlayerDimensionChangeNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getPlayerDimensionChangeNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getPlayerDimensionChangeNotificationsPitch), 0), 255),
        };
        noti.getBeforeExplosionNotifications = Boolean(getBeforeExplosionNotifications);
        noti.getBeforeExplosionNotificationsNotificationSound = {
            soundId: String(getBeforeExplosionNotificationsSoundID == ""
                ? "none"
                : getBeforeExplosionNotificationsSoundID),
            volume: Number.isNaN(Number(getBeforeExplosionNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getBeforeExplosionNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getBeforeExplosionNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getBeforeExplosionNotificationsPitch), 0), 255),
        };
        noti.getBeforeChatSendNotifications = Boolean(getBeforeChatSendNotifications);
        noti.getBeforeChatSendNotificationsNotificationSound = {
            soundId: String(getBeforeChatSendNotificationsSoundID == ""
                ? "none"
                : getBeforeChatSendNotificationsSoundID),
            volume: Number.isNaN(Number(getBeforeChatSendNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getBeforeChatSendNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getBeforeChatSendNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getBeforeChatSendNotificationsPitch), 0), 255),
        };
        noti.getPlayerGameModeChangeNotifications = Boolean(getPlayerGameModeChangeNotifications);
        noti.getPlayerGameModeChangeNotificationsNotificationSound = {
            soundId: String(getPlayerGameModeChangeNotificationsSoundID == ""
                ? "none"
                : getPlayerGameModeChangeNotificationsSoundID),
            volume: Number.isNaN(Number(getPlayerGameModeChangeNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getPlayerGameModeChangeNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getPlayerGameModeChangeNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getPlayerGameModeChangeNotificationsPitch), 0), 255),
        };
        noti.getWeatherChangeNotifications = Boolean(getWeatherChangeNotifications);
        noti.getWeatherChangeNotificationsNotificationSound = {
            soundId: String(getWeatherChangeNotificationsSoundID == ""
                ? "none"
                : getWeatherChangeNotificationsSoundID),
            volume: Number.isNaN(Number(getWeatherChangeNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getWeatherChangeNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getWeatherChangeNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getWeatherChangeNotificationsPitch), 0), 255),
        };
        noti.getLeverActionNotifications = Boolean(getLeverActionNotifications);
        noti.getLeverActionNotificationsNotificationSound = {
            soundId: String(getLeverActionNotificationsSoundID == ""
                ? "none"
                : getLeverActionNotificationsSoundID),
            volume: Number.isNaN(Number(getLeverActionNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getLeverActionNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getLeverActionNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getLeverActionNotificationsPitch), 0), 255),
        };
        noti.getMessageRecieveNotifications = Boolean(getMessageRecieveNotifications);
        noti.getMessageRecieveNotificationsNotificationSound = {
            soundId: String(getMessageRecieveNotificationsSoundID == ""
                ? "none"
                : getMessageRecieveNotificationsSoundID),
            volume: Number.isNaN(Number(getMessageRecieveNotificationsVolume))
                ? 1
                : Math.min(Math.max(Number(getMessageRecieveNotificationsVolume), 0), 1),
            pitch: Number.isNaN(Number(getMessageRecieveNotificationsPitch))
                ? 1
                : Math.min(Math.max(Number(getMessageRecieveNotificationsPitch), 0), 255),
        };
        noti.getBlockInteractTriggerExplosionNotifications = Boolean(getBlockInteractTriggerExplosionNotifications);
        noti.getBlockInteractTriggerExplosionNotificationsNotificationSound =
            {
                soundId: String(getBlockInteractTriggerExplosionNotificationsSoundID ==
                    ""
                    ? "none"
                    : getBlockInteractTriggerExplosionNotificationsSoundID),
                volume: Number.isNaN(Number(getBlockInteractTriggerExplosionNotificationsVolume))
                    ? 1
                    : Math.min(Math.max(Number(getBlockInteractTriggerExplosionNotificationsVolume), 0), 1),
                pitch: Number.isNaN(Number(getBlockInteractTriggerExplosionNotificationsPitch))
                    ? 1
                    : Math.min(Math.max(Number(getBlockInteractTriggerExplosionNotificationsPitch), 0), 255),
            };
        noti.getEntityInteractTriggerExplosionNotifications = Boolean(getEntityInteractTriggerExplosionNotifications);
        noti.getEntityInteractTriggerExplosionNotificationsNotificationSound =
            {
                soundId: String(getEntityInteractTriggerExplosionNotificationsSoundID ==
                    ""
                    ? "none"
                    : getEntityInteractTriggerExplosionNotificationsSoundID),
                volume: Number.isNaN(Number(getEntityInteractTriggerExplosionNotificationsVolume))
                    ? 1
                    : Math.min(Math.max(Number(getEntityInteractTriggerExplosionNotificationsVolume), 0), 1),
                pitch: Number.isNaN(Number(getEntityInteractTriggerExplosionNotificationsPitch))
                    ? 1
                    : Math.min(Math.max(Number(getEntityInteractTriggerExplosionNotificationsPitch), 0), 255),
            };
        return 1;
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=notificationsSettings.js.map