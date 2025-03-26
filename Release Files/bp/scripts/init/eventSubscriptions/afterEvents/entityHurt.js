import { world, Player } from "@minecraft/server";
import { srun } from "init/functions/srun";
import { getPlayersWithAnyOfTags } from "modules/commands/functions/getPlayersWithAnyOfTags";
import { vTStr } from "modules/commands/functions/vTStr";
subscribedEvents.afterEntityHurt = world.afterEvents.entityHurt.subscribe((event) => {
    try {
        eval(String(world.getDynamicProperty("evalAfterEvents:entityHurt")));
    }
    catch (e) {
        console.error(e, e.stack);
        world.getAllPlayers().forEach((currentplayer) => {
            if (currentplayer.hasTag("entityHurtAfterEventDebugErrors")) {
                currentplayer.sendMessage(e + e.stack);
            }
        });
    }
    try {
        getPlayersWithAnyOfTags([
            "getEntityHurtNotifications",
            "getEntityHurtNotificationsForType:" + event.hurtEntity?.typeId,
            "getEntityHurtNotificationsForId:" + event.hurtEntity?.id,
            "getEntityHurtNotificationsWithCause:" +
                event.damageSource?.cause,
            "getEntityHurtNotificationsWithDamage:" + event.damage,
            "getEntityHurtNotificationsWithDamagingEntityOfType:" +
                event.damageSource?.damagingEntity?.typeId,
            "getEntityHurtNotificationsWithDamagingEntityWithId:" +
                event.damageSource?.damagingEntity?.id,
            "getEntityHurtNotificationsWithDamagingProjectileOfType:" +
                event.damageSource?.damagingProjectile?.typeId,
            "getEntityHurtNotificationsWithDamagingProjectileWithId:" +
                event.damageSource?.damagingProjectile?.id,
        ]).forEach((p) => {
            psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ??
                ""}[§eentityHurt§r] Entity of type ${event.hurtEntity?.typeId} with the id ${event.hurtEntity?.id} took ${event.damage} damage of type "${event.damageSource?.cause}" in ${tryget(() => dimensionTypeDisplayFormatting[event.hurtEntity?.dimension?.id]) ?? "an unknown dimension"} at ${(event.hurtEntity?.isValid ?? false)
                ? vTStr(event.hurtEntity?.location)
                : "an unknown location"}${!!event.damageSource?.damagingEntity
                ? `, the entity was damaged by ${event.damageSource?.damagingEntity?.typeId ==
                    "minecraft:player"
                    ? event.damageSource
                        ?.damagingEntity?.name
                    : `an entity of type ${event.damageSource?.damagingEntity
                        ?.typeId} with the ID ${event.damageSource?.damagingEntity
                        ?.id}${tryget(() => event.damageSource.damagingEntity
                        ?.nameTag != ""
                        ? ' and the name tag "' +
                            event.damageSource
                                .damagingEntity?.nameTag +
                            '"'
                        : "")}`}${tryget(() => " in " +
                    dimensionTypeDisplayFormatting[event.damageSource.damagingEntity
                        ?.dimension.id] +
                    " at " +
                    vTStr(event.damageSource.damagingEntity
                        .location))}`
                : ""}${!!event.damageSource?.damagingProjectile
                ? `, the projectile that damaged the entity was ${`a projectile of type ${event.damageSource?.damagingProjectile?.typeId} with the ID ${event.damageSource?.damagingProjectile?.id}${tryget(() => event.damageSource.damagingProjectile
                    .nameTag != ""
                    ? ' and the name tag "' +
                        event.damageSource.damagingProjectile
                            .nameTag +
                        '"'
                    : "")}`}${tryget(() => " in " +
                    dimensionTypeDisplayFormatting[event.damageSource.damagingProjectile
                        .dimension.id] +
                    " at " +
                    vTStr(event.damageSource.damagingProjectile
                        .location))}`
                : ""}. The current velocity of the damaged entity is: ${tryget(() => JSON.stringify(event.hurtEntity.getVelocity())) ?? "§cError: Unable to get velocity.§r"}`);
            let pn = new PlayerNotifications(p);
            srun(() => p.playSound(pn.getEntityHurtNotificationsNotificationSound.soundId, {
                pitch: pn
                    .getEntityHurtNotificationsNotificationSound
                    .pitch,
                volume: pn
                    .getEntityHurtNotificationsNotificationSound
                    .volume,
            }));
        });
    }
    catch (e) {
        console.error(e, e.stack);
    }
    if (event.hurtEntity instanceof Player && event.damageSource.damagingEntity instanceof Player && event.hurtEntity != event.damageSource.damagingEntity) {
        event.hurtEntity.setDynamicProperty("lastHurtByPlayerTime", Date.now());
    }
});
//# sourceMappingURL=entityHurt.js.map