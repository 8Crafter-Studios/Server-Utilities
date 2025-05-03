import { world } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithTags } from "modules/commands/functions/getPlayersWithTags";
subscribedEvents.afterMessageReceive =
    world.afterEvents.messageReceive.subscribe((event) => {
        //console.warn(event.id, event.message, event.player?.name, event.player?.id)
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:messageReceive")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("messageReceiveAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
        try {
            getPlayersWithTags("getMessageReceiveNotifications")
                .filter((p) => !p.hasTag("excludeMessageReceiveNotificationsWithId:" +
                event.id) &&
                !p.hasTag("excludeMessageReceiveNotificationsWithMessage:" +
                    event.message) &&
                !p.hasTag("excludeMessageReceiveNotificationsBy:" +
                    event.player.name))
                .forEach((p) => {
                psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ?? ""}[§emessageReceive§r][${event.player.name}] Message received with ID ${event.id} and value "${event.message}". `);
                let pn = new PlayerNotifications(p);
                srun(() => p.playSound(pn.getMessageRecieveNotificationsNotificationSound
                    .soundId, {
                    pitch: pn
                        .getMessageRecieveNotificationsNotificationSound
                        .pitch,
                    volume: pn
                        .getMessageRecieveNotificationsNotificationSound
                        .volume,
                }));
            });
        }
        catch (e) {
            console.error(e, e.stack);
        }
    });
//# sourceMappingURL=messageReceive.js.map