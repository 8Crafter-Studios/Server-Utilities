import { world } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithAnyOfTags } from "modules/commands/functions/getPlayersWithAnyOfTags";
subscribedEvents.afterEntitySpawn = world.afterEvents.entitySpawn.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entitySpawn")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("entitySpawnAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    try {
        getPlayersWithAnyOfTags([
            "getEntitySpawnNotifications",
            "getEntitySpawnNotificationsForType:" + event.entity.typeId,
            "getEntitySpawnNotificationsForId:" + event.entity.id,
            "getEntitySpawnNotificationsWithCause:" + event.cause,
        ])
            .filter((v) => event.entity.typeId ==
            "andexdb:player_inventory_save_storage"
            ? v.hasTag("getNotifiedOfPlayerInventorySaveStorageEntitySpawns")
            : true)
            .forEach((p) => {
            psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ?? ""}[§eentitySpawn§r] Entity of type ${event.entity.typeId} with the id ${event.entity.id} was spawned in ${dimensionTypeDisplayFormatting[event.entity?.dimension?.id]} at ${JSON.stringify(event.entity?.location)} with the cause "${event.cause}". `);
            let pn = new PlayerNotifications(p);
            srun(() => p.playSound(pn.getEntitySpawnNotificationsNotificationSound
                .soundId, {
                pitch: pn
                    .getEntitySpawnNotificationsNotificationSound
                    .pitch,
                volume: pn
                    .getEntitySpawnNotificationsNotificationSound
                    .volume,
            }));
        });
    }
    catch (e) {
        console.error(e, e.stack);
    }
});
//# sourceMappingURL=entitySpawn.js.map