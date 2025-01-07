import { world } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithAnyOfTags } from "modules/commands/functions/getPlayersWithAnyOfTags";
import { vTStr } from "modules/commands/functions/vTStr";
subscribedEvents.afterEntityLoad = world.afterEvents.entityLoad.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityLoad")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("entityLoadAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    try {
        getPlayersWithAnyOfTags([
            "getEntityLoadNotifications",
            "getEntityLoadNotificationsForType:" + event.entity.typeId,
            "getEntityLoadNotificationsForId:" + event.entity.id,
        ]).forEach((p) => {
            psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ??
                ""}[§eentityLoad§r] Entity of type ${event.entity.typeId} with the ID ${event.entity.id}${event.entity.nameTag != ""
                ? ' and the name "' + event.entity.nameTag + '"'
                : ""} was loaded in ${dimensionTypeDisplayFormatting[event.entity.dimension.id]} at ${vTStr(event.entity.location)}. `);
            let pn = new PlayerNotifications(p);
            srun(() => p.playSound(pn.getEntityLoadNotificationsNotificationSound.soundId, {
                pitch: pn
                    .getEntityLoadNotificationsNotificationSound
                    .pitch,
                volume: pn
                    .getEntityLoadNotificationsNotificationSound
                    .volume,
            }));
        });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
//# sourceMappingURL=entityLoad.js.map