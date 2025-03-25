import { world, Player } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithAnyOfTags } from "modules/commands/functions/getPlayersWithAnyOfTags";
subscribedEvents.afterEffectAdd = world.afterEvents.effectAdd.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:effectAdd")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("effectAddAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    try {
        getPlayersWithAnyOfTags([
            "getEffectAddNotifications",
            "getEffectAddNotificationsForEntityType:" + event.entity.typeId,
            "getEntitySpawnNotificationsForEntityId:" + event.entity.id,
            "getEntitySpawnNotificationsWithEffectType:" +
                event.effect.typeId,
            "getEntitySpawnNotificationsWithEffectName:" +
                event.effect.displayName,
            "getEntitySpawnNotificationsWithAmplifier:" +
                event.effect.amplifier,
            "getEntitySpawnNotificationsWithEffectDuration:" +
                event.effect.duration,
        ]).forEach((p) => {
            psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ??
                ""}[§eeffectAdd§r] The effect ${event.effect.displayName} with the amplifier ${event.effect.amplifier} and the duration ${event.effect.duration} was added to ${event.entity.typeId == "minecraft:player"
                ? event.entity?.name
                : `an entity of type ${event.entity.typeId} with the id ${event.entity.id} in ${dimensionTypeDisplayFormatting[event.entity.dimension.id]} at ${event.entity.location}`}. `);
            let pn = new PlayerNotifications(p);
            srun(() => p.playSound(pn.getEffectAddNotificationsNotificationSound.soundId, {
                pitch: pn.getEffectAddNotificationsNotificationSound
                    .pitch,
                volume: pn
                    .getEffectAddNotificationsNotificationSound
                    .volume,
            }));
        });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
//# sourceMappingURL=effectAdd.js.map