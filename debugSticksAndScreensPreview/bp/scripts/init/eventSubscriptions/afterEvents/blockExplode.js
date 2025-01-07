import { world, Player } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithAnyOfTags } from "modules/commands/functions/getPlayersWithAnyOfTags";
import { vTStr } from "modules/commands/functions/vTStr";
subscribedEvents.afterBlockExplode = world.afterEvents.blockExplode.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:blockExplode")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("blockExplodeAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    try {
        getPlayersWithAnyOfTags([
            "getBlockExplodeNotifications",
            "getBlockExplodeNotificationsIn:" + event.dimension,
            "getBlockExplodeNotificationsForExplodedBlockType:" +
                event.explodedBlockPermutation.type.id,
        ]).forEach((p) => {
            psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ??
                ""}[§eblockExplode§r] Block of type ${event.explodedBlockPermutation.type.id} in ${dimensionTypeDisplayFormatting[event.dimension.id]} at ${vTStr(event.block.location)} was blown up${!!event.source
                ? ` by ${event.source?.name ??
                    tryget(() => event.source?.nameTag == ""
                        ? undefined
                        : event.source?.nameTag +
                            "<" +
                            event.source.id +
                            ">") ??
                    event.source?.typeId +
                        "<" +
                        event.source.id +
                        ">"}`
                : ""}. `);
            let pn = new PlayerNotifications(p);
            srun(() => p.playSound(pn.getBlockExplodeNotificationsNotificationSound
                .soundId, {
                pitch: pn
                    .getBlockExplodeNotificationsNotificationSound
                    .pitch,
                volume: pn
                    .getBlockExplodeNotificationsNotificationSound
                    .volume,
            }));
        });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
//# sourceMappingURL=blockExplode.js.map