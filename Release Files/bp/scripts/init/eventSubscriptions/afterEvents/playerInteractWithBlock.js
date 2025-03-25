import { world } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithTags } from "modules/commands/functions/getPlayersWithTags";
import { vTStr } from "modules/commands/functions/vTStr";
subscribedEvents.afterPlayerInteractWithBlock =
    world.afterEvents.playerInteractWithBlock.subscribe((event) => {
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:playerInteractWithBlock")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("playerInteractWithBlockAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
        try {
            if ((["minecraft:respawn_anchor", "minecraft:tnt"].includes(event.block.typeId) &&
                event.block.dimension.id == "minecraft:overworld") ||
                (["minecraft:bed", "minecraft:tnt"].includes(event.block.typeId) &&
                    event.block.dimension.id == "minecraft:nether") ||
                ([
                    "minecraft:respawn_anchor",
                    "minecraft:tnt",
                    "minecraft:bed",
                ].includes(event.block.typeId) &&
                    event.block.dimension.id == "minecraft:overworld")) {
                getPlayersWithTags("getBlockInteractTriggerExplosionNotifications")
                    .filter((p) => !p.hasTag("excludeBlockInteractTriggerExplosionNotificationsIn:" +
                    event.block.dimension) &&
                    (!!event.player
                        ? !p.hasTag("excludeBlockInteractTriggerExplosionNotificationsBy:" +
                            event.player?.name) &&
                            !p.hasTag("excludeBlockInteractTriggerExplosionNotificationsById:" +
                                event.player.id)
                        : !p.hasTag("excludeBlockInteractTriggerExplosionNotificationsWithNoSource")) &&
                    !p.hasTag("excludeBlockInteractTriggerExplosionNotificationsBlockType:" +
                        event.block.typeId))
                    .forEach((p) => {
                    psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ?? ""}[§eexplosiveBlockInteraction§r] ${!!event.player
                        ? `${event.player.name ??
                            event.player.nameTag} interacted with explosive block of type "${event.block.typeId}"`
                        : `Explosive block of type "${event.block.typeId}" was interacted with`} in ${dimensionTypeDisplayFormatting[event.block.dimension.id]} at ${vTStr(event.block.location)}${!!event.itemStack
                        ? ` using ${event.itemStack?.typeId}`
                        : ""}. `);
                    let pn = new PlayerNotifications(p);
                    srun(() => p.playSound(pn
                        .getBlockInteractTriggerExplosionNotificationsNotificationSound
                        .soundId, {
                        pitch: pn
                            .getBlockInteractTriggerExplosionNotificationsNotificationSound
                            .pitch,
                        volume: pn
                            .getBlockInteractTriggerExplosionNotificationsNotificationSound
                            .volume,
                    }));
                });
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    });
//# sourceMappingURL=playerInteractWithBlock.js.map