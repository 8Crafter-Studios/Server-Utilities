import { world } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithTags } from "modules/commands/functions/getPlayersWithTags";
import { vTStr } from "modules/commands/functions/vTStr";
subscribedEvents.afterLeverAction = world.afterEvents.leverAction.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:leverAction")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("leverActionAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    try {
        getPlayersWithTags("getLeverActionNotifications")
            .filter((p) => !p.hasTag("excludeLeverActionNotificationsTo:" +
            event.isPowered) &&
            !p.hasTag("excludeLeverActionNotificationsIn:" +
                event.dimension) &&
            !p.hasTag("excludeLeverActionNotificationsBy:" +
                event.player.name) &&
            !p.hasTag("excludeLeverActionNotificationsAt:" +
                Object.values(event.block.location).join(",")))
            .forEach((p) => {
            psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ?? ""}[§eleverAction§r][${event.player.name}] Lever in ${dimensionTypeDisplayFormatting[event.dimension.id]} at ${vTStr(event.block.location)} turned ${event.isPowered ? "ON" : "OFF"}. `);
            let pn = new PlayerNotifications(p);
            srun(() => p.playSound(pn.getLeverActionNotificationsNotificationSound
                .soundId, {
                pitch: pn
                    .getLeverActionNotificationsNotificationSound
                    .pitch,
                volume: pn
                    .getLeverActionNotificationsNotificationSound
                    .volume,
            }));
        });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
//# sourceMappingURL=leverAction.js.map