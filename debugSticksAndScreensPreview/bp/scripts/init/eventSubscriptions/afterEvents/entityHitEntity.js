import { Vector3Utils } from "@minecraft/math.js";
import { world, Player } from "@minecraft/server";
import { getPlayersWithTags } from "modules/commands/functions/getPlayersWithTags";
import { vTStr } from "modules/commands/functions/vTStr";
subscribedEvents.afterEntityHitEntity =
    world.afterEvents.entityHitEntity.subscribe((event) => {
        //if(event.damagingEntity.typeId=="minecraft:player"){if(event.damagingEntity.getComponent("inventory").container.getItem(event.damagingEntity.selectedSlotIndex).getLore().join(",").includes("Sweeping Edge")){event.damagingEntity.dimension.getEntities({location: event.damagingEntity.location, maxDistance: 2}).filter(v=>v.id!=event.damagingEntity.id).forEach(v=>v.applyDamage(3, {cause: EntityDamageCause.entityAttack, damagingEntity: event.damagingEntity}))}}
        try {
            eval(String(world.getDynamicProperty("evalAfterEvents:entityHitEntity")));
        }
        catch (e) {
            console.error(e, e.stack);
            world.getAllPlayers().forEach((currentplayer) => {
                if (currentplayer.hasTag("entityHitEntityAfterEventDebugErrors")) {
                    currentplayer.sendMessage(e + e.stack);
                }
            });
        }
        try {
            if (["minecraft:ender_crystal"].includes(event.hitEntity?.typeId)) {
                getPlayersWithTags("getHitEntityTriggerExplosionNotifications")
                    .filter((p) => !p.hasTag("excludeHitEntityTriggerExplosionNotificationsIn:" +
                    (tryget(() => event.hitEntity?.dimension) ??
                        "unknown")) &&
                    (!!event.damagingEntity &&
                        (event.damagingEntity?.isValid() ?? true)
                        ? !p.hasTag("excludeHitEntityTriggerExplosionNotificationsBy:" +
                            (event.damagingEntity
                                ?.name ??
                                event.damagingEntity?.nameTag)) &&
                            !p.hasTag("excludeHitEntityTriggerExplosionNotificationsById:" +
                                event.damagingEntity?.id) &&
                            !p.hasTag("excludeHitEntityTriggerExplosionNotificationsByType:" +
                                event.damagingEntity?.typeId)
                        : !p.hasTag("excludeHitEntityTriggerExplosionNotificationsWithNoSource")) &&
                    !p.hasTag("excludeHitEntityTriggerExplosionNotificationsCauseType:" +
                        event.hitEntity?.typeId))
                    .forEach((p) => psend(p, `§r§f[§l§dServer§r§f]${world.getDynamicProperty("serverNotificationSpacer") ?? ""}[§eexplosiveEntityTriggeredByHit§r] ${!!event.damagingEntity
                    ? `${event.damagingEntity
                        ?.name ??
                        event.damagingEntity?.nameTag ??
                        event.damagingEntity?.typeId} hit exploding entity of type "${event.hitEntity?.typeId}"`
                    : `Exploding entity of type "${event.hitEntity?.typeId}" was hit`}${!!tryget(() => event.hitEntity?.dimension) &&
                    (event.hitEntity?.isValid() ?? true)
                    ? ` in ${dimensionTypeDisplayFormatting[tryget(() => event.hitEntity?.dimension
                        ?.id)] ?? "an unknown dimension"} at ${!!tryget(() => event.hitEntity?.location) &&
                        (event.hitEntity?.isValid() ?? true)
                        ? vTStr(event.hitEntity?.location)
                        : "an unknwon location"}`
                    : !!event.damagingEntity.dimension &&
                        (event.damagingEntity?.isValid() ?? true)
                        ? `, the entity/player who hit the explosive entity is in ${dimensionTypeDisplayFormatting[tryget(() => event.damagingEntity
                            ?.dimension?.id)] ?? "an unknown dimension"} at ${!!tryget(() => event.damagingEntity?.location) &&
                            (event.damagingEntity?.isValid() ??
                                true)
                            ? vTStr(Vector3Utils.floor(event.damagingEntity
                                ?.location))
                            : "an unknwon location"}`
                        : ""}. `));
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    });
//# sourceMappingURL=entityHitEntity.js.map