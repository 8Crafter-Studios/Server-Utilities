import { world } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithAnyOfTags } from "modules/commands/functions/getPlayersWithAnyOfTags";
subscribedEvents.afterEntityRemove = world.afterEvents.entityRemove.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityRemove")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("entityRemoveAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    try {
        getPlayersWithAnyOfTags([
            "getEntityRemoveNotifications",
            "getEntityRemoveNotificationsForType:" + event.typeId,
            "getEntityRemoveNotificationsForId:" + event.removedEntityId,
        ]).forEach((p) => {
            psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ??
                ""}[§eentityRemove§r] Entity of type ${event.typeId} with the id ${event.removedEntityId} was removed. `);
            let pn = new PlayerNotifications(p);
            srun(() => p.playSound(pn.getEntityRemoveNotificationsNotificationSound
                .soundId, {
                pitch: pn
                    .getEntityRemoveNotificationsNotificationSound
                    .pitch,
                volume: pn
                    .getEntityRemoveNotificationsNotificationSound
                    .volume,
            }));
        });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
//# sourceMappingURL=entityRemove.js.map