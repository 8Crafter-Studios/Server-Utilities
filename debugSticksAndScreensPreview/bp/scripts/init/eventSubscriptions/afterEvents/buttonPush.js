import { world, Player } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithAnyOfTags } from "modules/commands/functions/getPlayersWithAnyOfTags";
import { vTStr } from "modules/commands/functions/vTStr";
subscribedEvents.afterButtonPush = world.afterEvents.buttonPush.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:buttonPush")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("buttonPushAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    try {
        getPlayersWithAnyOfTags([
            "getButtonPushNotifications",
            "getButtonPushNotificationsForBlockAt:" +
                vTStr(event.block.location),
            "getButtonPushNotificationsForBlockAt:" +
                vTStr(event.block.location) +
                " " +
                event.block.dimension,
            "getButtonPushNotificationsForBlockAt:" +
                event.block.dimension +
                " " +
                vTStr(event.block.location),
            "getButtonPushNotificationsForBlockAt:" +
                JSONStringify(event.block.location),
            "getButtonPushNotificationsForBlockAt:" +
                JSONStringify(Object.assign(event.block.location, {
                    dimension: event.block.dimension,
                })),
            "getButtonPushNotificationsForBlock:" +
                JSONStringify(Object.assign(event.block.location, {
                    dimension: event.block.dimension,
                })),
            "getButtonPushNotificationsForBlock:" +
                JSONStringify(event.block.location),
        ])
            .filter((p) => !p.hasTag("excludeButtonPushNotificationsIn:" +
            event.dimension.id))
            .forEach((p) => {
            psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ?? ""}[§ebuttonPush§r] Button in ${dimensionTypeDisplayFormatting[event.dimension.id]} at ${vTStr(event.block.location)} was pressed by ${event.source?.name ??
                tryget(() => event.source?.nameTag == ""
                    ? undefined
                    : event.source?.nameTag +
                        "<" +
                        event.source.id +
                        ">") ??
                event.source?.typeId + "<" + event.source.id + ">"}. `);
            let pn = new PlayerNotifications(p);
            srun(() => p.playSound(pn.getButtonPushNotificationsNotificationSound
                .soundId, {
                pitch: pn
                    .getButtonPushNotificationsNotificationSound
                    .pitch,
                volume: pn
                    .getButtonPushNotificationsNotificationSound
                    .volume,
            }));
        });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
//# sourceMappingURL=buttonPush.js.map