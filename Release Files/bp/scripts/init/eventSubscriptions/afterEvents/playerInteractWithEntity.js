import { world } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithTags } from "modules/commands/functions/getPlayersWithTags";
import { vTStr } from "modules/commands/functions/vTStr";
subscribedEvents.afterPlayerInteractWithEntity =
    world.afterEvents.playerInteractWithEntity.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:playerInteractWithEntity")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("playerInteractWithEntityAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
        try {
            if (["minecraft:creeper"].includes(event.target.typeId) &&
                !!event.itemStack) {
                getPlayersWithTags("getEntityInteractTriggerExplosionNotifications")
                    .filter((p) => !p.hasTag("excludeEntityInteractTriggerExplosionNotificationsIn:" +
                    event.target.dimension) &&
                    (!!event.player
                        ? !p.hasTag("excludeEntityInteractTriggerExplosionNotificationsBy:" +
                            event.player?.name) &&
                            !p.hasTag("excludeEntityInteractTriggerExplosionNotificationsById:" +
                                event.player.id)
                        : !p.hasTag("excludeEntityInteractTriggerExplosionNotificationsWithNoSource")) &&
                    !p.hasTag("excludeEntityInteractTriggerExplosionNotificationsEntityType:" +
                        event.target.typeId))
                    .forEach((p) => {
                    psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ?? ""}[§eexplosiveEntityInteraction§r] ${!!event.player
                        ? `${event.player.name ??
                            event.player.nameTag} interacted with explosive entity of type "${event.target.typeId}"`
                        : `Explosive entity of type "${event.target.typeId}" was interacted with`} in ${dimensionTypeDisplayFormatting[event.target.dimension.id]} at ${vTStr(event.target.location)}${!!event.itemStack
                        ? ` using ${event.itemStack?.typeId}`
                        : ""}. `);
                    let pn = new PlayerNotifications(p);
                    srun(() => p.playSound(pn
                        .getEntityInteractTriggerExplosionNotificationsNotificationSound
                        .soundId, {
                        pitch: pn
                            .getEntityInteractTriggerExplosionNotificationsNotificationSound
                            .pitch,
                        volume: pn
                            .getEntityInteractTriggerExplosionNotificationsNotificationSound
                            .volume,
                    }));
                });
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    });
//# sourceMappingURL=playerInteractWithEntity.js.map