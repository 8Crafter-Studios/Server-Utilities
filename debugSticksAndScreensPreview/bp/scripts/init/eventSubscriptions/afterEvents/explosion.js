import { VECTOR3_ZERO, Vector3Utils } from "@minecraft/math.js";
import { world, Player } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithAnyOfTags } from "modules/commands/functions/getPlayersWithAnyOfTags";
import { vTStr } from "modules/commands/functions/vTStr";
subscribedEvents.afterExplosion = world.afterEvents.explosion.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:explosion")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("explosionAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    try {
        getPlayersWithAnyOfTags([
            "getExplosionNotifications",
            "getExplosionNotificationsForSourceType:" +
                (event.source?.typeId ?? "none"),
        ])
            .filter((p) => !p.hasTag("excludeExplosionNotificationsIn:" + event.dimension) &&
            (!!event.source
                ? !p.hasTag("excludeExplosionNotificationsBy:" +
                    (event.source?.name ??
                        tryget(() => event.source?.nameTag) ??
                        "undefined")) &&
                    !p.hasTag("excludeExplosionNotificationsById:" +
                        event.source?.id) &&
                    !p.hasTag("excludeExplosionNotificationsType:" +
                        event.source?.typeId)
                : !p.hasTag("excludeExplosionNotificationsWithNoSource")))
            .forEach((p) => {
            psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ?? ""}[§eexplosion§r]${!!event.source
                ? "[" +
                    (event.source?.name ??
                        tryget(() => event.source?.nameTag) ??
                        event.source?.typeId +
                            "<" +
                            event.source?.id +
                            ">") +
                    "]"
                : ""} ${!!event.source
                ? "Triggered explosion"
                : "Explosion occurred"} in ${dimensionTypeDisplayFormatting[event.dimension.id]}${event.getImpactedBlocks().length != 0
                ? " around "
                : ""}${event.getImpactedBlocks().length == 0
                ? ""
                : vTStr((() => {
                    let value = VECTOR3_ZERO;
                    event
                        .getImpactedBlocks()
                        .forEach((b) => {
                        value =
                            Vector3Utils.add(value, b.location);
                    });
                    return Vector3Utils.scale(value, 1 /
                        event.getImpactedBlocks()
                            .length);
                })())}. `);
            let pn = new PlayerNotifications(p);
            srun(() => p.playSound(pn.getExplosionNotificationsNotificationSound
                .soundId, {
                pitch: pn
                    .getExplosionNotificationsNotificationSound
                    .pitch,
                volume: pn
                    .getExplosionNotificationsNotificationSound
                    .volume,
            }));
        });
    }
    catch (e) {
        console.error(e, e.stack);
    }
    //console.warn(JSONStringify(event.getImpactedBlocks(), true))
});
//# sourceMappingURL=explosion.js.map