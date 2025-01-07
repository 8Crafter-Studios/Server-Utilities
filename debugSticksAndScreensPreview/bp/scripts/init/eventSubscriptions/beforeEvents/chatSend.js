import { world } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { chatMessage } from "modules/chat/functions/chatMessage";
import { getPlayersWithAnyOfTags } from "modules/commands/functions/getPlayersWithAnyOfTags";
subscribedEvents.beforeChatSend = world.beforeEvents.chatSend.subscribe((eventData) => {
    try {
        getPlayersWithAnyOfTags([
            "getBeforeChatSendNotifications",
            "includeBeforeChatSendNotificationsBy:" + eventData.sender.name,
            "includeBeforeChatSendNotificationsById:" +
                eventData.sender.name,
        ])
            .filter((p) => !p.hasTag("excludeBeforeChatSendNotificationsById:" +
            eventData.sender.id) &&
            !p.hasTag("excludeBeforeChatSendNotificationsBy:" +
                eventData.sender.name))
            .forEach((p) => {
            psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ?? ""}[§ebeforeChatSend§r][${eventData.sender.name}] Chat message sent${!!eventData.targets
                ? " with targets " +
                    eventData.targets.map((p) => p.name).join()
                : ""} with the message ${JSONStringify(eventData.message)}. `);
            let pn = new PlayerNotifications(p);
            srun(() => p.playSound(pn.getBeforeChatSendNotificationsNotificationSound
                .soundId, {
                pitch: pn
                    .getBeforeChatSendNotificationsNotificationSound
                    .pitch,
                volume: pn
                    .getBeforeChatSendNotificationsNotificationSound
                    .volume,
            }));
        });
    }
    catch (e) {
        console.error(e, e.stack);
    }
    chatMessage(eventData);
});
//# sourceMappingURL=chatSend.js.map